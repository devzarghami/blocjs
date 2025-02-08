import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Observable } from 'rxjs';

export const useBloc = <D, E>(subject: Observable<D>, initialValue?: D) => {
	const data = useSignal<D | null>(initialValue || null);
	const loading = useSignal<boolean>(initialValue === undefined);
	const error = useSignal<E | null>(null);

	useVisibleTask$(() => {
		const subscription = subject.subscribe({
			next: (newData) => {
				data.value = newData;
				loading.value = false;
				error.value = null;
			},
			error: (err) => {
				data.value = null;
				loading.value = false;
				error.value = err;
			},
			complete: () => {
				loading.value = false;
			},
		});

		return () => subscription.unsubscribe();
	});

	return { data, loading, error };
};
