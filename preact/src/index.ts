import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Observable } from 'rxjs';

const BlocBuilder = ({ subject, initialValue, builder }) => {
	const [data, setData] = useState(initialValue || null);
	const [loading, setLoading] = useState(initialValue === undefined);
	const [error, setError] = useState(null);

	useEffect(() => {
		const subscription = subject.subscribe({
			next: (newData) => {
				setData(newData);
				setLoading(false);
				setError(null);
			},
			error: (err) => {
				setData(null);
				setLoading(false);
				setError(err);
			},
			complete: () => setLoading(false),
		});

		return () => subscription.unsubscribe();
	}, [subject]);

	return builder({ data, loading, error });
};

export default BlocBuilder;
