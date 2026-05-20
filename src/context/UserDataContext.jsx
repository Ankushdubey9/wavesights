import { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    background: "",
    customBackground: "",
    interests: [],
    customInterest: "",
    goal: "",
    skillLevel: "",
    timeCommitment: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};