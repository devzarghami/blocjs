import { Observable } from 'rxjs';
import { type ErrorInterface } from './blocState';
export declare class DispatchOptions {
    keepAlive: boolean;
    multiple: boolean;
    timeout: number;
    autoExec: boolean;
    [key: string]: any;
}
export type DispatchOptionsProps = DispatchOptions;
export interface EventLogicProps<D = Record<string, any>> {
    eventName: string;
    signal: AbortSignal;
    data: D;
}
export default class Bloc {
    private logicSubscriptions;
    private inlineSubscriptions;
    private abortControllers;
    dispatch<T>(eventName: string, data?: Record<string, any>, options?: Partial<DispatchOptionsProps>): {
        subscribe: (input: {
            next?: (value: T) => void;
            error?: (err: ErrorInterface | null) => void;
        }) => void;
        abort: () => void;
        exec: () => void;
    };
    dispose(): void;
    protected handleEventLogic(event: EventLogicProps): Observable<any>;
    private processError;
    private handleNext;
    private handleError;
    private completeAndCleanup;
    private cleanupSubscription;
    private cleanupInlineSubscription;
    private cleanupAllSubscriptions;
}
