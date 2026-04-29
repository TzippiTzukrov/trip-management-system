import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || "student";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  return (
    <UserContext.Provider value={{ user, setUser, userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}