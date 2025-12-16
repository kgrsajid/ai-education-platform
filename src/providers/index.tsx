import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AntdProvider } from "./ant-providers";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./context/auth-context";

export const BaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AntdProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AntdProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}