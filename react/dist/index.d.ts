import React from "react";
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
declare const BlocBuilder: <T, E>({ subject, initialValue, builder }: BlocBuilderProps<T, E>) => import("react/jsx-runtime").JSX.Element;
export default BlocBuilder;
