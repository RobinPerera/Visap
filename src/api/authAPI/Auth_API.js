const USER_NAME = "robin";
const PASSWARD = "1234";

export async function User_Auth() {
  const user_details = new Promise((resolve, reject) => {
    const data = {
      username: USER_NAME,
      password: PASSWARD,
    };
    resolve(data);
    reject(new Error("user name is not present"));
  });
  return user_details;
}
