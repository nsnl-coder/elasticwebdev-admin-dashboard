import { string, boolean, object, InferType } from 'yup';

const userSchema = object({
  email: string().email().max(150).lowercase().label('email').required(),
  isPinned: boolean().label('isPinned'),
  fullname: string().min(6).max(255).lowercase().label('fullname'),
  phone: string()
    .matches(/^[0-9]{9,16}$/, 'Please provide valid phone number')
    .label('Phone number'),
  shippingAddress: string().max(255),
  password: string().min(8).max(255).label('password').required(),
  profileImage: string().max(255).label('profileImage'),
});

interface IUser extends InferType<typeof userSchema> {
  _id?: string;
  role?: string;
}

export default userSchema;
export type { IUser };
