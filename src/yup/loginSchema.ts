const { string, boolean, object } = require('yup');

const loginSchema = object({
  email: string().email().max(150).required(),
  password: string().min(8).max(255),
});

export default loginSchema;
