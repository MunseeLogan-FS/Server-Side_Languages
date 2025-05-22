require("dotenv").config();
const app = require("./app");
const connectDB = require("./app/db/config");

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
