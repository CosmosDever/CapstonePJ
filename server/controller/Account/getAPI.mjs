let API_KEY;
let API_SECRET;
const api = async (req, res) => {
  try {
    API_KEY = req.body.API_KEY;
    API_SECRET = req.body.API_SECRET;
    res.send({ api_key: API_KEY, api_secret: API_SECRET });
  } catch (error) {
    console.log(error);
  }
};
export { api, API_KEY, API_SECRET };
