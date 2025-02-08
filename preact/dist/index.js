import { useEffect, useState } from 'preact/hooks';
const BlocBuilder = ({ subject, initialValue, builder }) => {
    const [state, setState] = useState({
        data: initialValue || null,
        loading: initialValue === undefined,
        error: null,
    });
    useEffect(() => {
        const subscription = subject.subscribe({
            next: (data) => setState({ data, loading: false, error: null }),
            error: (error) => setState({ data: null, loading: false, error }),
            complete: () => setState((prev) => ({ ...prev, loading: false })),
        });
        return () => subscription.unsubscribe();
    }, [subject]);
    return builder(state);
};
export default BlocBuilder;
