import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AntdProvider } from "./ant-providers";
import { AuthProvider } from "./context/auth-context";
import { store } from "../app/store";

export const BaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AntdProvider>
            {children}
          </AntdProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
}
