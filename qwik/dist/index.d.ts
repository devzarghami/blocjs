import { Observable } from 'rxjs';
export declare const useBloc: <D, E>(subject: Observable<D>, initialValue?: D) => {
    data: import("@builder.io/qwik").Signal<D | null>;
    loading: import("@builder.io/qwik").Signal<boolean>;
    error: import("@builder.io/qwik").Signal<E | null>;
};
