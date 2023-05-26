const extraErrorReducer = (state, {payload}) => {
    state.isLoading = false;
    state.error = payload;
}

export default extraErrorReducer;