const app = require("./app.js");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;

/*
console.log(process.env);
console.log(process.env.PORT);
*/


// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});