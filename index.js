const run = require("./lib/cli");
const figlet = require("figlet");
figlet("Employee Manager", (err, data) => {
  if (err) {
    console.log("Sorry, something went wrong");
    return;
  }
  console.log(data);
  run();
});
