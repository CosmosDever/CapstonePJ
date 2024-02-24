export const setindicator = async (req, res) => {
  try {
    const indicator = {
      indicator1: req.body.indicator1,
      indicator2: req.body.indicator2,
      indicator3: req.body.indicator3,
      indicator4: req.body.indicator4,
      indicator5: req.body.indicator5,
      indicator6: req.body.indicator6,
    };
    res.send(indicator);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
