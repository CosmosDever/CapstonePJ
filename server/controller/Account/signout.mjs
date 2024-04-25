export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "signout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
