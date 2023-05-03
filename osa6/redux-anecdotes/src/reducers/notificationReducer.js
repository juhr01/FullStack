import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state) {
            return null
        }
    }
})

export const showNotification = (message, time) => {
    return dispatch => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer