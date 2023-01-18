import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const verifyToken = (token: string) => {
  if(!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET);
};
