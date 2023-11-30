import jwt from "jsonwebtoken";

const secretKey = "your-secret-key";

interface PropUser {
  name?: string;
  email?: string;
  password?: string;
  surname?: string;
}

export const generateToken = (user: PropUser) => {
  return jwt.sign(user, secretKey, {
    expiresIn: "8h",
  });
};

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
