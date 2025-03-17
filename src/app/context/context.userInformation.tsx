"use client";
import { createContext, useContext, useState } from "react";

interface UserInformationContextType {
  userInformation: UserInformation | null;
  setUserInformation: React.Dispatch<
    React.SetStateAction<UserInformation | null>
  >;
}

// Tạo context
const UserInformationContext = createContext<
  UserInformationContextType | undefined
>(undefined);

export const UserInformationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);

  return (
    <UserInformationContext.Provider
      value={{ userInformation, setUserInformation }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};
export const useUserInformation = () => {
  const context = useContext(UserInformationContext);
  if (!context) {
    throw new Error(
      "useUserInformation must be used within a UserInformationProvider"
    );
  }
  return context;
};
