import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";

interface BlocState<T, E> {
	data: T | null;
	loading: boolean;
	error: E | null;
}

interface BlocBuilderProps<T, E> {
	subject: Observable<T>;
	initialValue?: T;
	builder: (state: BlocState<T, E>) => React.ReactNode;
}

const BlocBuilder = <T, E>({ subject, initialValue, builder }: BlocBuilderProps<T, E>) => {
	const [state, setState] = useState<BlocState<T, E>>({
		data: initialValue || null,
		loading: initialValue === undefined,
		error: null,
	});

	useEffect(() => {
		const subscription = subject.subscribe({
			next: (data: T) => setState({ data, loading: false, error: null }),
			error: (error: E) => setState({ data: null, loading: false, error }),
			complete: () => setState((prev: any) => ({ ...prev, loading: false })),
		});

		return () => subscription.unsubscribe();
	}, [subject]);

	return (
		<>
			{builder(state)}
		</>
	);

};

export default BlocBuilder;
