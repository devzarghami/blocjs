import { finalize, catchError, map, Observable, of, Subject } from 'rxjs';
export class DispatchOptions {
    constructor() {
        this.keepAlive = false;
        this.multiple = false;
        this.timeout = 120; // Timeout in milliseconds, default is 5000ms
        this.autoExec = true; // Added autoExec option to control immediate execution
    }
}
export default class Bloc {
    constructor() {
        this.logicSubscriptions = {};
        this.inlineSubscriptions = {};
        this.abortControllers = {}; // Store abort controllers for each event
    }
    // Dispatch method with autoExec support
    dispatch(eventName, data = {}, options = new DispatchOptions()) {
        const uniqueKey = options.multiple
            ? `${eventName}-${Date.now()}`
            : eventName; // Unique key if `multiple` is true, otherwise use eventName.
        // If not multiple and already an active subscription for the event, return early.
        if (!options.multiple && this.logicSubscriptions[uniqueKey]?.closed === false) {
            return {
                subscribe: () => {
                },
                abort: () => {
                },
                exec: () => {
                }
            };
        }
        const subject = new Subject();
        const abortController = new AbortController(); // Create a new AbortController for this event
        this.abortControllers[uniqueKey] = abortController; // Store it for later use
        const timeoutId = setTimeout(() => {
            if (abortController.signal.aborted)
                return;
            subject.error({ error: 'Event timed out', errors: {} });
            this.cleanupSubscription(uniqueKey);
        }, options.timeout);
        const dispatcher = this.handleEventLogic({
            eventName, data,
            signal: abortController.signal // Pass the signal to the event logic
        })
            .pipe(map((value) => {
            subject.next(value);
            return value;
        }), catchError((error) => {
            this.processError(error, subject);
            return of(error);
        }), finalize(() => {
            clearTimeout(timeoutId); // Clear timeout when event completes
            if (!options.keepAlive) {
                this.cleanupSubscription(uniqueKey);
            }
        }));
        // If autoExec is true (default behavior), execute immediately
        if (options.autoExec) {
            this.logicSubscriptions[uniqueKey] = dispatcher.subscribe();
        }
        return {
            subscribe: (input) => {
                this.inlineSubscriptions[uniqueKey] = subject.subscribe({
                    next: (value) => this.handleNext(input, value, subject, uniqueKey),
                    error: (err) => this.handleError(input, err, subject, uniqueKey)
                });
            },
            abort: () => {
                abortController.abort(); // Abort the event when called
                subject.error({ error: 'Event was aborted', errors: {} });
                this.cleanupSubscription(uniqueKey);
            },
            exec: () => {
                // Manually execute the dispatcher if autoExec is false
                if (options.autoExec === false) {
                    this.logicSubscriptions[uniqueKey] = dispatcher.subscribe();
                }
            }
        };
    }
    dispose() {
        this.cleanupAllSubscriptions(this.logicSubscriptions);
        this.cleanupAllSubscriptions(this.inlineSubscriptions);
        Object.keys(this.abortControllers).forEach((key) => {
            this.abortControllers[key].abort(); // Abort any active event
        });
    }
    handleEventLogic(event) {
        return new Observable((observer) => {
            const signal = event.signal;
            // Simulate a network request or logic here
            setTimeout(() => {
                if (signal.aborted)
                    return;
                observer.next('Fetched data successfully');
                observer.complete();
            }, 3000); // Simulating a 3-second delay for the operation
        });
    }
    processError(error, subject) {
        if (!error) {
            subject.error(null);
        }
        else if (error instanceof Error) {
            subject.error({ error: error.message, errors: {} });
        }
        else if (!error?.error &&
            error?.errors &&
            typeof error.errors === 'object' &&
            Object.values(error.errors).length) {
            subject.error({
                error: Object.values(error.errors)[0],
                errors: error.errors
            });
        }
        else if (error.error && error.errors) {
            subject.error(error);
        }
    }
    handleNext(input, value, subject, uniqueKey) {
        if (input?.next) {
            try {
                input.next(value);
            }
            catch (e) {
                console.error(e);
                subject.error(e);
            }
            finally {
                this.completeAndCleanup(subject, uniqueKey);
            }
        }
    }
    handleError(input, err, subject, uniqueKey) {
        if (input?.error) {
            try {
                input.error(err);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.completeAndCleanup(subject, uniqueKey);
            }
        }
    }
    completeAndCleanup(subject, uniqueKey) {
        subject.complete();
        subject.unsubscribe();
        this.cleanupInlineSubscription(uniqueKey);
    }
    cleanupSubscription(uniqueKey) {
        if (this.logicSubscriptions[uniqueKey]) {
            this.logicSubscriptions[uniqueKey].unsubscribe();
            delete this.logicSubscriptions[uniqueKey];
        }
        if (this.abortControllers[uniqueKey]) {
            this.abortControllers[uniqueKey].abort();
            delete this.abortControllers[uniqueKey];
        }
    }
    cleanupInlineSubscription(uniqueKey) {
        if (this.inlineSubscriptions[uniqueKey]) {
            this.inlineSubscriptions[uniqueKey].unsubscribe();
            delete this.inlineSubscriptions[uniqueKey];
        }
    }
    cleanupAllSubscriptions(subscriptions) {
        Object.keys(subscriptions).forEach((key) => {
            subscriptions[key]?.unsubscribe();
            delete subscriptions[key];
        });
    }
}
