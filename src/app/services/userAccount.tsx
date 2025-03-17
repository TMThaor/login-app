export const loginRequest = async (
  input_username: string,
  input_password: string
): Promise<UserInformation | null> => {
  const url: string = "https://dev-fe-exam.viajsc.com/ExamUser/login";
  const data = {
    username: input_username,
    password: input_password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result: UserInformation = await response.json();
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please try again.");
    return null;
  }
};

export const getOtpChangePassword = async (
  input_username: string
): Promise<OtpResponse | null> => {
  try {
    const url: string = `https://dev-fe-exam.viajsc.com/ExamUser/get-otp-change-password?userName=${input_username}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error!!");
    }
    const data: OtpResponse = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const validateOTP = async (
  username: string,
  otp: string
): Promise<OtpResponse | null> => {
  try {
    const url: string = `https://dev-fe-exam.viajsc.com/ExamUser/validate-otp-change-password?userName=${username}&otpCode=${otp}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error!!");
    }
    const data: OtpResponse = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const changePassword = async (
  username: string,
  otp: string,
  password: string,
  confirmPassword: string
) => {
  const url = "https://dev-fe-exam.viajsc.com/ExamUser/change-password";
  const dataChangePassword = {
    userName: username,
    otpCode: otp,
    password: password,
    confirmPassword: confirmPassword,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataChangePassword),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result: UserInformation = await response.json();
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please try again.");
    return null;
  }
};

export const registerUser = async (registerData: RegisterData) => {
  const url = "https://dev-fe-exam.viajsc.com/ExamUser/register-user";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result: UserInformation = await response.json();
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Register failed. Please try again.");
    return null;
  }
};
