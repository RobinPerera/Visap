import axios from "axios";
import { App_url } from "../../config/Config";

//calling App_url from config
const url = App_url();

// Sign in URL from the app_url
const app_url = url.sign_in
export async function User_Auth(inputUsername, inputPassword) {
  try {
    // Make the POST request using Axios
    const response = await axios.post(app_url, {
      username: inputUsername,
      password: inputPassword,
    });

    const { userName, userToken, userid, userRole } = response.data;

    // Store necessary values securely in localStorage
    localStorage.setItem("user_name", userName);
    localStorage.setItem("auth_token", userToken);
    localStorage.setItem("token_expiry", userid);
    localStorage.setItem("token_expiry", userRole);


    // If the response is successful
    return {
      status: "success",
      message: "Login successful",
      data: response.data,
    };
  } catch (error) {
    // Handle errors (both server and network)
    if (error.response) {
      // Server responded with a status outside 2xx
      return {
        status: "error",
        message: error.response.data.message || "Login failed",
      };
    } else if (error.request) {
      // Request was made but no response was received
      return {
        status: "error",
        message: "No response from the server. Please try again.",
      };
    } else {
      // Something else caused the error
      return {
        status: "error",
        message: "An error occurred: " + error.message,
      };
    }
  }
}


export function Auth_info() {
  // Retrieve user details from localStorage
  const user_details = {
    username: localStorage.getItem("user_name") || "",
    token: localStorage.getItem("auth_token") || "",
    exp: localStorage.getItem("token_expiry") || "",
  };

  return user_details;
}