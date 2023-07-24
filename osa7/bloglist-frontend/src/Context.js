import { createContext, useReducer, useContext, useEffect } from 'react'

const messageReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_ERROR':
        return `error Wrong credentials`
        case 'BLOG_CREATE':
        return `Blog ${action.title} added by ${action.author}`
        case 'BLOG_LIKE':
          return `Blog ${action.title} liked`
        case 'BLOG_REMOVE':
          return `Blog ${action.title} removed`
        case 'CLEAR':
          return null
        case 'MISC_ERROR':
          return `error ${action.error}`
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
                messageDispatch({type: 'CLEAR'})
            }, 3000)
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