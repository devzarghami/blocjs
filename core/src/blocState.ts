import { BehaviorSubject, Observable } from "rxjs";

// Interface for error structure
export interface ErrorInterface {
    code: string | number;
    stack?: string;
    message: string;
    errors: Record<string, any>;
}

// Interface for data structure
interface DataInterface {
    [key: string]: any;
}

/**
 * A class that manages state for data, loading, and errors using RxJS.
 *
 * @template D - The type of data being managed.
 * @template E - The type of error being managed.
 */
export default class BlocState<D = DataInterface, E = ErrorInterface> {
    private dataSubject = new BehaviorSubject<D | null>(null);
    private errorSubject = new BehaviorSubject<E | null>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    /**
     * Initializes the BlocState with optional data.
     * If `initValue` is a function returning a promise, it initializes asynchronously.
     *
     * @param initValue - Initial data or an async initializer function.
     */
    constructor(initValue?: D | (() => Promise<D>)) {
        if (typeof initValue === "function") {
            this.setLoading(true);
            (initValue as () => Promise<D>)()
              .then((value: D) => this.setData(value))
              .catch((error: E) => this.setError(error))
              .finally(() => this.setLoading(false));
        } else if (initValue !== undefined) {
            this.setData(initValue);
        }
    }

    /**
     * Retrieves the current data value synchronously.
     */
    get data(): D | null {
        return this.dataSubject.getValue();
    }

    /**
     * An Observable stream for the data.
     */
    get data$(): Observable<D | null> {
        return this.dataSubject.asObservable();
    }

    /**
     * Retrieves the loading state synchronously.
     */
    get loading(): boolean {
        return this.loadingSubject.getValue();
    }

    /**
     * An Observable stream for the loading state.
     */
    get loading$(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    /**
     * Retrieves the current error state synchronously.
     */
    get errors(): E | null {
        return this.errorSubject.getValue();
    }

    /**
     * An Observable stream for errors.
     */
    get errors$(): Observable<E | null> {
        return this.errorSubject.asObservable();
    }

    /**
     * Updates the loading state.
     *
     * @param loading - The new loading state.
     */
    public setLoading(loading: boolean): void {
        this.loadingSubject.next(loading);
    }

    /**
     * Updates the data and clears any existing errors.
     *
     * @param data - The new data to set.
     */
    public setData(data: D): void {
        this.dataSubject.next(data);
        this.errorSubject.next(null); // Clear errors when data is updated
    }

    /**
     * Partially updates the current data state.
     *
     * @param partialData - Partial data to merge with the existing state.
     */
    public updateData(partialData: Partial<D>): void {
        const currentData = this.dataSubject.getValue();
        this.dataSubject.next({ ...currentData, ...partialData } as D);
    }

    /**
     * Updates the error state.
     * Supports plain errors, `Error` objects, and structured errors.
     *
     * @param error - The error to set (or null to clear).
     */
    public setError(error: E | Error | null): void {
        if (!error) {
            this.errorSubject.next(null);
        } else if (error instanceof Error) {
            this.errorSubject.next({
                code: "APP_EXCEPTION",
                stack: error.stack,
                message: error.message,
                errors: { [error.name]: error.message },
            } as E);
        } else {
            this.errorSubject.next(error);
        }
    }

    /**
     * Partially updates the current error state.
     *
     * @param partialError - Partial error to merge with the existing error state.
     */
    public updateError(partialError: Partial<E>): void {
        const currentError = this.errorSubject.getValue();
        this.errorSubject.next(currentError ? { ...currentError, ...partialError } : (partialError as E));
    }

    /**
     * Resets all states (data, errors, and loading) to their initial values.
     */
    public dispose(): void {
        this.dataSubject.next(null);
        this.errorSubject.next(null);
        this.loadingSubject.next(false);
    }
}
