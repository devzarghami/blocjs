import { Observable } from 'rxjs';
interface BlocState<T, E> {
    data: T | null;
    loading: boolean;
    error: E | null;
}
interface BlocBuilderProps<T, E> {
    subject: Observable<T>;
    initialValue?: T;
    builder: (state: BlocState<T, E>) => preact.JSX.Element;
}
declare const BlocBuilder: <T, E>({ subject, initialValue, builder }: BlocBuilderProps<T, E>) => import("preact").JSX.Element;
export default BlocBuilder;
