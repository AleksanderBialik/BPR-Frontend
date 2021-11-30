const errorHandler = (text, errorCode) => {
  let message = "";
  switch (errorCode) {
    case "001":
      message = "User not found";
      break;
    case "002":
      message = "Email already in use!";
      break;
    default:
      message = text;
      break;
  }
  return message;
};
export default errorHandler;
