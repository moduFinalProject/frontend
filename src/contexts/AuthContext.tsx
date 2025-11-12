import { createContext, useContext, useState, ReactNode } from "react";
import { isLoggedIn } from "@/services/auth";

interface AuthContextType {
  loginToken: boolean;
  setLoginToken: (token: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loginToken, setLoginToken] = useState<boolean>(isLoggedIn());

  return (
    <AuthContext.Provider value={{ loginToken, setLoginToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
