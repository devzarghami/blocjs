import {useEffect, useState} from 'preact/hooks';
import {Observable} from 'rxjs';

// Define the state interface
interface BlocState<T, E> {
    data: T | null;
    loading: boolean;
    error: E | null;
}

// Define the props interface
interface BlocBuilderProps<T, E> {
    subject: Observable<T>;
    initialValue?: T;
    builder: (state: BlocState<T, E>) => preact.JSX.Element;
}

const BlocBuilder = <T, E>({subject, initialValue, builder}: BlocBuilderProps<T, E>) => {
    const [state, setState] = useState<BlocState<T, E>>({
        data: initialValue || null,
        loading: initialValue === undefined,
        error: null,
    });

    useEffect(() => {
        const subscription = subject.subscribe({
            next: (data: T) => setState({data, loading: false, error: null}),
            error: (error: E) => setState({data: null, loading: false, error}),
            complete: () => setState((prev) => ({...prev, loading: false})),
        });

        return () => subscription.unsubscribe();
    }, [subject]);

    return builder(state);
};

export default BlocBuilder;
