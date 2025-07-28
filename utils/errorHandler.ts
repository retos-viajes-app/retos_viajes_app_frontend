import i18n from "@/i18n";
import axios from "axios";

export const handleApiError = ( error: unknown, defaultMessageKey: string = "errorsBackend.genericError") => {
  if (axios.isAxiosError(error)) {
    const backendMessage = error.response?.data?.detail || error.response?.data?.message;
    if(backendMessage){
      return backendMessage;
    }
  }
  return i18n.t(defaultMessageKey);
};


// const backendToFrontendErrorMap: { [key: string]: string } = {
//   "Username or password is incorrect": "errorsBackend.invalidCredentials",
//   "User not verified": "errorsBackend.userNotVerified",
//   "Email already registered": "errorsBackend.emailAlreadyRegistered",
//   "User not found": "errorsBackend.userNotFound",
//   "User already verified": "errorsBackend.userAlreadyVerified",
//   "Email not valid": "errorsBackend.invalidEmail",
//   "Error sending the confirmation code": "errorsBackend.sendingCodeError",
//   "Invalid or expired refresh token": "errorsBackend.invalidRefreshToken",
//   "Invalid token": "errorsBackend.invalidToken",
//   "No available destinations": "errorsBackend.noDestinations",
//   "Trip not found": "errorsBackend.tripNotFound",
//   "You cannot connect to yourself": "errorsBackend.notConnectYourself",
//   "There is already a pending connection request": "errorsBackend.pendingConnectionRequest",
//   "You are already connected with this user": "errorsBackend.alreadyConnected",
//   "Connection request not found": "errorsBackend.connectionRequestNotFound",
//   "You cannot cancel an accepted connection": "errorsBackend.cancelAcceptedConnection",
//   "Invalid or expired confirmation code": "errorsBackend.invalidConfirmationCode",
//   "Incorrect confirmation code": "errorsBackend.incorrectConfirmationCode",
//   "Username already exists": "errorsBackend.usernameExists",
// };

// export const getFrontendErrorMessage = (backendMessage: string): string => {
//   const translationKey = backendToFrontendErrorMap[backendMessage] || "errors.genericError";
//   return i18n.t(translationKey);
// };