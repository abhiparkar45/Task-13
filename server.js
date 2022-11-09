const app = require("./app");
const env = require("dotenv");
const db = require("./models/index");

env.config({ path: "./config/config.env" });

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(`db synced !`);
  })
  .catch((err) => {
    console.log(`connection with database failed due to ${err}`);
  });

app.listen(process.env.PORT, () => {
  console.log(`server started on port : ${process.env.PORT}`);
});
