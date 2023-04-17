const { request } = require("http");
const app = require("./app");
const cors = require("cors");
const port = 3000;
const db = require("./config/db");
const UserModel = require("./model/user.model");
const ExerciseModel = require("./model/exercise.model");
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
