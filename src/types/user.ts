interface User {
  _id: string;
  email: string;
  fullname: string;
  isVerified: boolean;
  phone?: string;
  profileImage?: string;
  role?: 'admin' | 'user' | 'customer';
}

export default User;
