import React, { useState, useContext } from "react";
import { createContext } from "react";

interface ForgotPasswordContextProps {
  step: number;
  setStep: (step: number) => void;
  username: string;
  setUsername: (username: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}

const ForgotPasswordContext = createContext<ForgotPasswordContextProps | null>(
  null
);

export const ForgotPasswordProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  return (
    <ForgotPasswordContext.Provider
      value={{ step, setStep, username, setUsername, otp, setOtp }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};
export const useForgotPassword = () => {
  const context = useContext(ForgotPasswordContext);
  if (!context) {
    throw new Error(
      "useForgotPassword must be used within a ForgotPasswordProvider"
    );
  }
  return context;
};
