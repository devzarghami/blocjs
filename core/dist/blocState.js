import { BehaviorSubject } from "rxjs";
/**
 * A class that manages state for data, loading, and errors using RxJS.
 *
 * @template D - The type of data being managed.
 * @template E - The type of error being managed.
 */
export default class BlocState {
    /**
     * Initializes the BlocState with optional data.
     * If `initValue` is a function returning a promise, it initializes asynchronously.
     *
     * @param initValue - Initial data or an async initializer function.
     */
    constructor(initValue) {
        this.dataSubject = new BehaviorSubject(null);
        this.errorSubject = new BehaviorSubject(null);
        this.loadingSubject = new BehaviorSubject(false);
        if (typeof initValue === "function") {
            this.setLoading(true);
            initValue()
                .then((value) => this.setData(value))
                .catch((error) => this.setError(error))
                .finally(() => this.setLoading(false));
        }
        else if (initValue !== undefined) {
            this.setData(initValue);
        }
    }
    /**
     * Retrieves the current data value synchronously.
     */
    get data() {
        return this.dataSubject.getValue();
    }
    /**
     * An Observable stream for the data.
     */
    get data$() {
        return this.dataSubject.asObservable();
    }
    /**
     * Retrieves the loading state synchronously.
     */
    get loading() {
        return this.loadingSubject.getValue();
    }
    /**
     * An Observable stream for the loading state.
     */
    get loading$() {
        return this.loadingSubject.asObservable();
    }
    /**
     * Retrieves the current error state synchronously.
     */
    get errors() {
        return this.errorSubject.getValue();
    }
    /**
     * An Observable stream for errors.
     */
    get errors$() {
        return this.errorSubject.asObservable();
    }
    /**
     * Updates the loading state.
     *
     * @param loading - The new loading state.
     */
    setLoading(loading) {
        this.loadingSubject.next(loading);
    }
    /**
     * Updates the data and clears any existing errors.
     *
     * @param data - The new data to set.
     */
    setData(data) {
        this.dataSubject.next(data);
        this.errorSubject.next(null); // Clear errors when data is updated
    }
    /**
     * Partially updates the current data state.
     *
     * @param partialData - Partial data to merge with the existing state.
     */
    updateData(partialData) {
        const currentData = this.dataSubject.getValue();
        this.dataSubject.next({ ...currentData, ...partialData });
    }
    /**
     * Updates the error state.
     * Supports plain errors, `Error` objects, and structured errors.
     *
     * @param error - The error to set (or null to clear).
     */
    setError(error) {
        if (!error) {
            this.errorSubject.next(null);
        }
        else if (error instanceof Error) {
            this.errorSubject.next({
                code: "APP_EXCEPTION",
                stack: error.stack,
                message: error.message,
                errors: { [error.name]: error.message },
            });
        }
        else {
            this.errorSubject.next(error);
        }
    }
    /**
     * Partially updates the current error state.
     *
     * @param partialError - Partial error to merge with the existing error state.
     */
    updateError(partialError) {
        const currentError = this.errorSubject.getValue();
        this.errorSubject.next(currentError ? { ...currentError, ...partialError } : partialError);
    }
    /**
     * Resets all states (data, errors, and loading) to their initial values.
     */
    dispose() {
        this.dataSubject.next(null);
        this.errorSubject.next(null);
        this.loadingSubject.next(false);
    }
}
