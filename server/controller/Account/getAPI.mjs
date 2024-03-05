import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");
const api = async (req, res) => {
  try {
    const { API_KEY, API_SECRET } = req.body;
    localStorage.setItem("API_KEY", API_KEY);
    localStorage.setItem("API_SECRET", API_SECRET);
    res.send({ api_key: API_KEY, api_secret: API_SECRET });
  } catch (error) {
    console.log(error);
  }
};
export { api };
