import { Observable } from "rxjs";
export interface ErrorInterface {
    code: string | number;
    stack?: string;
    message: string;
    errors: Record<string, any>;
}
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
    private dataSubject;
    private errorSubject;
    private loadingSubject;
    /**
     * Initializes the BlocState with optional data.
     * If `initValue` is a function returning a promise, it initializes asynchronously.
     *
     * @param initValue - Initial data or an async initializer function.
     */
    constructor(initValue?: D | (() => Promise<D>));
    /**
     * Retrieves the current data value synchronously.
     */
    get data(): D | null;
    /**
     * An Observable stream for the data.
     */
    get data$(): Observable<D | null>;
    /**
     * Retrieves the loading state synchronously.
     */
    get loading(): boolean;
    /**
     * An Observable stream for the loading state.
     */
    get loading$(): Observable<boolean>;
    /**
     * Retrieves the current error state synchronously.
     */
    get errors(): E | null;
    /**
     * An Observable stream for errors.
     */
    get errors$(): Observable<E | null>;
    /**
     * Updates the loading state.
     *
     * @param loading - The new loading state.
     */
    setLoading(loading: boolean): void;
    /**
     * Updates the data and clears any existing errors.
     *
     * @param data - The new data to set.
     */
    setData(data: D): void;
    /**
     * Partially updates the current data state.
     *
     * @param partialData - Partial data to merge with the existing state.
     */
    updateData(partialData: Partial<D>): void;
    /**
     * Updates the error state.
     * Supports plain errors, `Error` objects, and structured errors.
     *
     * @param error - The error to set (or null to clear).
     */
    setError(error: E | Error | null): void;
    /**
     * Partially updates the current error state.
     *
     * @param partialError - Partial error to merge with the existing error state.
     */
    updateError(partialError: Partial<E>): void;
    /**
     * Resets all states (data, errors, and loading) to their initial values.
     */
    dispose(): void;
}
export {};
