export const setindicator = async (req, res) => {
  try {
    const indicator = req.body;
    res.send(indicator);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// {
//       indicator1: "",
//       indicator2: "",
//       indicator3: "",
//       indicator4: "",
//       indicator5: "",
//       indicator6: "",
//       timepre : "",
//       amount: "",
// }
