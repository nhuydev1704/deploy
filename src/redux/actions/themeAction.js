export const THEME = {
    THEME: 'THEME',
}

export const toggleTheme = (theme) => (dispatch) => {
    try {
        dispatch({ type: THEME.THEME, payload: theme })

    } catch (err) {
        console.log(err);
    }
}