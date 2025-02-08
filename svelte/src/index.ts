import { onDestroy } from "svelte";
import { writable } from "svelte/store";
import { Observable, Subscription } from "rxjs";

/**
 * Creates a Svelte store that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the store.
 */
export function createBlocStore<D, E>(subject: Observable<D>, initialValue?: D) {
	const dataStore = writable<D | null>(initialValue || null);
	const loadingStore = writable<boolean>(initialValue === undefined);
	const errorStore = writable<E | null>(null);

	const subscription: Subscription = subject.subscribe({
		next: (data: D) => {
			dataStore.set(data);
			loadingStore.set(false);
			errorStore.set(null);
		},
		error: (err: E) => {
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


export function subscribeOnMount<T>(input: Observable<T>) {
}

export function subscribeOnCreate<T>(input: Observable<T>) {
}