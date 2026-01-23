import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { AlertInitializer, AlertProvider } from "./components/ui/alert";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AlertProvider>
        <AlertInitializer />
        {children}
      </AlertProvider>
    </Provider>
  );
}

export default Providers;
