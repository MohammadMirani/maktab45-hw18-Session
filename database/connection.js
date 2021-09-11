const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/hw18StartWithExpress",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("[!] Connection failed!");
    return console.log("[+] Server connected successfully. ");
  }
);
