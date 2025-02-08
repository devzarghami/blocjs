import { createSignal, createEffect, onCleanup } from "solid-js";
import { Observable, Subscription } from "rxjs";

/**
 * Creates a Solid.js hook that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the state.
 */
export function useBloc<D, E>(subject: Observable<D>, initialValue?: D) {
	const [data, setData] = createSignal<D | null>(initialValue || null);
	const [loading, setLoading] = createSignal<boolean>(initialValue === undefined);
	const [error, setError] = createSignal<E | null>(null);

	let subscription: Subscription;

	createEffect(() => {
		subscription = subject.subscribe({
			next: (newData: D) => {
				setData(() => newData as Exclude<D, Function>);
				setLoading(false);
				setError(null);
			},
			error: (err: E) => {
				setData(null);
				setLoading(false);
				setError(() => err as Exclude<E, Function>);
			},
			complete: () => {
				setLoading(false);
			}
		});
	});

	onCleanup(() => {
		subscription.unsubscribe();
	});

	return { data, loading, error };
}
