// eslint-disable-next-line no-unused-vars
import {
  required,
  email,
  max,
  min_value,
  numeric,
  oneOf,
  min,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field can't be empty!",
});

extend("username", {
  ...required,
  message: "Username can't be empty!",
});

extend("pass", {
  ...required,
  message: "Password can't be empty!",
});

extend("max", {
  ...max,
  message: "This field can containy only {length} characters!",
});

extend("email", {
  ...email,
  message: "Email address is not correct!",
});

extend("numeric", {
  ...numeric,
  message: "This field can contain only digits!",
});

extend("min_value", {
  ...min_value,
  message: "Min value for this field is: {min}!",
});
extend("min", {
  ...min,
  message: "This field must contain atleast {length} characters!",
});

extend("checkbox", {
  ...required,
  validate(value) {
    return value === true;
  },
  message: "Click the checkbox!",
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Passwords must be identical!",
});

extend("oneOf", {
  ...oneOf,
});
