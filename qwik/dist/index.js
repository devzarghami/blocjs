import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
export const useBloc = (subject, initialValue) => {
    const data = useSignal(initialValue || null);
    const loading = useSignal(initialValue === undefined);
    const error = useSignal(null);
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
