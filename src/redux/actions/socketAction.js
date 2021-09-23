
export const SOCKET = {
    SOCKET: 'SOCKET',
}

export const setSocketGlobal = (socket) => async (dispatch) => {
    try {
        await dispatch({ type: SOCKET.SOCKET, payload: socket })
    } catch (err) {
        console.log(err);
    }
}