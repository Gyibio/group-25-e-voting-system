"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

interface LC {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  login: boolean;
  loading: boolean;
}

const LoginContext = createContext<undefined | LC>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // derive login state from next-auth session
  const { status } = useSession();
  const login = status === "authenticated";
  const loading = status === "loading";

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <LoginContext.Provider value={{ isOpen, setIsOpen, login, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLC = (): LC => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLC must be used within a LoginProvider");
  }
  return context;
};
