import { createSignal, createEffect, onCleanup } from "solid-js";
/**
 * Creates a Solid.js hook that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the state.
 */
export function useBloc(subject, initialValue) {
    const [data, setData] = createSignal(initialValue || null);
    const [loading, setLoading] = createSignal(initialValue === undefined);
    const [error, setError] = createSignal(null);
    let subscription;
    createEffect(() => {
        subscription = subject.subscribe({
            next: (newData) => {
                setData(() => newData);
                setLoading(false);
                setError(null);
            },
            error: (err) => {
                setData(null);
                setLoading(false);
                setError(() => err);
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
