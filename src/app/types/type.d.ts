type Address = {
  [city: string]: {
    [district: string]: string[];
  };
};

type SignUpForm = {
  shopName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  province: string;
  district: string;
  wards: string;
  acceptTerm: boolean;
};

type UserInformation = {
  success: boolean;
  error: string;
  errorCode: number;
  content?: {
    userName: string;
    shopName: string;
    email: string;
    phoneNumber: string;
    address: string;
    wards: string;
    district: string;
    province: string;
    role: string;
  };
};

type OtpResponse = {
  success: boolean;
  content: boolean;
  errorCode: number;
  error: string;
};

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

type RegisterData = {
  userName: string;
  shopName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  email: string;
  address: string;
  wards: string;
  district: string;
  province: string;
  acceptTerm: boolean;
};
