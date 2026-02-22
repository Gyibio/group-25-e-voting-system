"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type userT = {
  id: string;
  name: string;
};

interface LC {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // current authenticated user (null when signed out)
  user: userT | null;
  setUser: (user: userT | null) => void;
  login: boolean;
}

const LoginContext = createContext<undefined | LC>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // persist user state and keep it in sync with localStorage
  // start as null to match server render; populate client-side
  const [user, setUser] = useState<userT | null>(null);

  // read storage once on client after hydration
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      if (stored) {
        // defer to avoid synchronous state update warning
        setTimeout(() => setUser(stored), 0);
      }
    } catch {
      // ignore
    }
  }, []);

  // whenever user changes, mirror it to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  const login = Boolean(user && user.id);

  return (
    <LoginContext.Provider value={{ isOpen, setIsOpen, user, setUser, login }}>
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
