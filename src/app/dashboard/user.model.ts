export interface LogoutRequest {
  refresh: string;
}

export interface LogoutResponse {
  Refresh : string;
}

// user--->Settings
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}
export interface ChangePasswordResponse {
  message: string;
}
