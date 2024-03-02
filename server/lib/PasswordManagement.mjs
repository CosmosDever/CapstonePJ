import bcrypt from "bcrypt";

const saltRounds = 10;

export const matchPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

export const hashPassword = async (password) => {
  try {
    if (!password) {
      throw new Error("Password cannot be null or undefined.");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};
