import { Observable } from "rxjs";
/**
 * Creates a Solid.js hook that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the state.
 */
export declare function useBloc<D, E>(subject: Observable<D>, initialValue?: D): {
    data: import("solid-js").Accessor<D | null>;
    loading: import("solid-js").Accessor<boolean>;
    error: import("solid-js").Accessor<E | null>;
};
