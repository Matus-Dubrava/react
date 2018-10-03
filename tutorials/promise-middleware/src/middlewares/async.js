// first argument is the actual redux store object, which has a 
// dispatch property on it that we are destructuring here
export default ({ dispatch }) => (next) => (action) => {
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    // dispath the action instead of passing it to the next method,
    // so that the it flows through the whole middleware 
    // stact again, otherwise it would continue to the next 
    // middleware or reducer if there is no next middleware
    // function left in the middleware stack
    action.payload.then((response) => {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    });
}