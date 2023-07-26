import { createContext, useReducer, useContext, useEffect } from "react";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return `error Wrong credentials`;
    case "BLOG_CREATE":
      return `Blog ${action.title} added by ${action.author}`;
    case "BLOG_LIKE":
      return `Blog ${action.title} liked`;
    case "BLOG_REMOVE":
      return `Blog ${action.title} removed`;
    case "CLEAR":
      return null;
    case "MISC_ERROR":
      return `error ${action.error}`;
    default:
      return state;
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const MessageContext = createContext();
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, null);

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        messageDispatch({ type: "CLEAR" });
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export const useMessageValue = () => {
  const messageAndDispatch = useContext(MessageContext);
  return messageAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(MessageContext);
  return messageAndDispatch[1];
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, null);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export default MessageContext;
