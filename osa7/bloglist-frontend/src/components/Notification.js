import { useMessageValue } from "../Context";
import { Alert } from "@mui/material";

const Notification = () => {
  const message = useMessageValue();

  if (!message) {
    // Return null when there is no message
    return null;
  }

  if (message && message.includes("error")) {
    return (
      <div>
        {message && <Alert severity="error">{message.substring(5)}</Alert>}
      </div>
    );
  }

  return <div>{message && <Alert severity="success">{message}</Alert>}</div>;
};

export default Notification;
