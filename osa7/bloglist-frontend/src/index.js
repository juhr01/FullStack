import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { MessageContextProvider, AuthContextProvider } from "./Context";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MessageContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MessageContextProvider>
  </QueryClientProvider>,
);
