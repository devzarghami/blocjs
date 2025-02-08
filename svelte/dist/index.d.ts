import { Observable } from "rxjs";
/**
 * Creates a Svelte store that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the store.
 */
export declare function createBlocStore<D, E>(subject: Observable<D>, initialValue?: D): {
    dataStore: import("svelte/store").Writable<D | null>;
    loadingStore: import("svelte/store").Writable<boolean>;
    errorStore: import("svelte/store").Writable<E | null>;
};
export declare function subscribeOnMount<T>(input: Observable<T>): void;
export declare function subscribeOnCreate<T>(input: Observable<T>): void;
