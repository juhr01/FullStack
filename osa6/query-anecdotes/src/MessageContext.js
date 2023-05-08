import { createContext, useReducer, useContext, useEffect } from 'react'

const messageReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            console.log(action.type)
            return `You voted ${action.name}`
        case 'CREATE':
            return `Created ${action.name}`
        case 'SHORT':
            return 'Anecdote must be over 5 characters'
        case 'RESET':
            return null
        default:
            return state
    }
}

const MessageContext = createContext()

export const MessageContextProvider = props => {
    const [message, messageDispatch] = useReducer(messageReducer, null)

    useEffect(() => {
        let timer
        if (message) {
            timer = setTimeout(() => {
                messageDispatch({type: 'RESET'})
            }, 5000)
        }
        return () => {
            clearTimeout(timer)
        }
    })

    return (
        <MessageContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </MessageContext.Provider>
    )
}

export const useMessageValue = () => {
    const messageAndDispatch = useContext(MessageContext)
    return messageAndDispatch[0]
}

export const useMessageDispatch = () => {
    const messageAndDispatch = useContext(MessageContext)
    return messageAndDispatch[1]
}

export default MessageContext