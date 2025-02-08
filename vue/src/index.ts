import { ref, onMounted, onUnmounted } from "vue";
import { Observable, Subscription } from "rxjs";

/**
 * Creates a Vue composable that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the state.
 */
export function useBloc<D, E>(subject: Observable<D>, initialValue?: D) {
	const data = ref<D | null>(initialValue || null);
	const loading = ref<boolean>(initialValue === undefined);
	const error = ref<E | null>(null);

	let subscription: Subscription;

	onMounted(() => {
		subscription = subject.subscribe({
			next: (newData: D) => {
				data.value = newData;
				loading.value = false;
				error.value = null;
			},
			error: (err: E) => {
				data.value = null;
				loading.value = false;
				error.value = err;
			},
			complete: () => {
				loading.value = false;
			}
		});
	});

	onUnmounted(() => {
		subscription.unsubscribe();
	});

	return { data, loading, error };
}
