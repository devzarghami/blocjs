import { Observable } from "rxjs";
/**
 * Creates a Vue composable that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the state.
 */
export declare function useBloc<D, E>(subject: Observable<D>, initialValue?: D): {
    data: [D | null] extends [import("vue").Ref<any, any>] ? import("@vue/shared").IfAny<import("vue").Ref<any, any> & D, import("vue").Ref<import("vue").Ref<any, any> & D, import("vue").Ref<any, any> & D>, import("vue").Ref<any, any> & D> : import("vue").Ref<import("vue").UnwrapRef<D> | null, D | import("vue").UnwrapRef<D> | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: [E | null] extends [import("vue").Ref<any, any>] ? import("@vue/shared").IfAny<import("vue").Ref<any, any> & E, import("vue").Ref<import("vue").Ref<any, any> & E, import("vue").Ref<any, any> & E>, import("vue").Ref<any, any> & E> : import("vue").Ref<import("vue").UnwrapRef<E> | null, E | import("vue").UnwrapRef<E> | null>;
};
