export default (store) => (next) => (action) => {
    console.log('inside of a middleware');

    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    action.payload.then((res) => {
        const newAction = {
            ...action,
            payload: res.data
        };

        return store.dispatch(newAction);
    })
};
