"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBloc = useBloc;
const vue_1 = require("vue");
/**
 * Creates a Vue composable that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the state.
 */
function useBloc(subject, initialValue) {
    const data = (0, vue_1.ref)(initialValue || null);
    const loading = (0, vue_1.ref)(initialValue === undefined);
    const error = (0, vue_1.ref)(null);
    let subscription;
    (0, vue_1.onMounted)(() => {
        subscription = subject.subscribe({
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
            }
        });
    });
    (0, vue_1.onUnmounted)(() => {
        subscription.unsubscribe();
    });
    return { data, loading, error };
}
