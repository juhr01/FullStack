import { useContext } from "react";
import { useMessageValue } from "../Context";

const Notification = () => {
  const message = useMessageValue();

  if (!message) {
    // Return null when there is no message
    return null;
  }

  if (message && message.includes("error")) {
    return <div className="error">{message.substring(5)}</div>;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
