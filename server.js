const app = require("./app.js");
// const dotenv = require("dotenv")

require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
