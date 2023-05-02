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

export const showNotification = message => {
    return dispatch => {
        dispatch(notificationSlice.actions.setNotification(message))

        setTimeout(() => {
            dispatch(notificationSlice.actions.clearNotification())
        }, 5000)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer