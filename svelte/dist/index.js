import { onDestroy } from "svelte";
import { writable } from "svelte/store";
/**
 * Creates a Svelte store that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the store.
 */
export function createBlocStore(subject, initialValue) {
    const dataStore = writable(initialValue || null);
    const loadingStore = writable(initialValue === undefined);
    const errorStore = writable(null);
    const subscription = subject.subscribe({
        next: (data) => {
            dataStore.set(data);
            loadingStore.set(false);
            errorStore.set(null);
        },
        error: (err) => {
            dataStore.set(null);
            loadingStore.set(false);
            errorStore.set(err);
        },
        complete: () => {
            loadingStore.set(false);
        }
    });
    onDestroy(() => {
        subscription.unsubscribe();
    });
    return { dataStore, loadingStore, errorStore };
}
export function subscribeOnMount(input) {
}
export function subscribeOnCreate(input) {
}
