import jwt from "jsonwebtoken";

export const getToken = async (userId) => {
  try {
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
    console.log(token);

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
