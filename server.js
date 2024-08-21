import express from "express";
import config from "./config/config.js";
import db from "./config/db.js";
import countryModel from "./model/country.model.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use("/user",userRouter);

//country part
app.post("/register", async (req, res) => {
  const register = await countryModel.create(req.body);
  res.json(register);
});

app.get("/list", async (req, res) => {
  const getCountrylist = await countryModel.find();
  res.json(getCountrylist);
});

app.delete("/delete/:id", async (req, res) => {
  const deleteCountry = await countryModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.json(deleteCountry);
});

app.patch("/update/:id", async (req, res) => {
  const updateCountry = await countryModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },
    {new:true}
  );
  res.json(updateCountry);
});





db.then(() => {
  console.log("database connected..");
}).catch((err) => {
  console.log("error in db");
});

app.listen(config.port, () => {
  console.log(`server running at port${config.port}`);
});
