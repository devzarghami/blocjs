"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BlocBuilder = ({ subject, initialValue, builder }) => {
    const [state, setState] = (0, react_1.useState)({
        data: initialValue || null,
        loading: initialValue === undefined,
        error: null,
    });
    (0, react_1.useEffect)(() => {
        const subscription = subject.subscribe({
            next: (data) => setState({ data, loading: false, error: null }),
            error: (error) => setState({ data: null, loading: false, error }),
            complete: () => setState((prev) => ({ ...prev, loading: false })),
        });
        return () => subscription.unsubscribe();
    }, [subject]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: builder(state) }));
};
exports.default = BlocBuilder;
