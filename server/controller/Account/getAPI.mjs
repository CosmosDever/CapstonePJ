import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
const api = async (req, res) => {
  try {
    const { API_KEY, API_SECRET } = req.body;
    localStorage.setItem("API_KEY", API_KEY);
    localStorage.setItem("API_SECRET", API_SECRET);
    if (
      localStorage.getItem("API_KEY") === null ||
      localStorage.getItem("API_SECRET") === null
    ) {
      res.send("Please set API_KEY");
      return false;
    }
    res.send({
      api_key: localStorage.getItem("API_KEY"),
      api_secret: localStorage.getItem("API_SECRET"),
    });
  } catch (error) {
    console.log(error);
  }
};
export { api };
