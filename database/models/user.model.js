const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    validate(value) {
      if (!value.match(/(?=.*[0-9])/g)) {
        throw new Error(
          "The password must contain at least 1 numeric character"
        );
      }
    },
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  // //? callback
  // bcrypt.hash(user.password, 10, (err, hash) => {
  //   if (err) return next();
  //   user.password = hash;
  //   console.log(user);
  //   next();
  // });

  // //? try catch && async/await
  // try {
  //   const hashPass = await bcrypt.hash(user.password, 10);
  //   this.password = hashPass;
  //   next();
  // } catch (err) {
  //   console.log(err);
  // }

  // //? try catch sync mode
  // try {
  //   const hashPass = bcrypt.hashSync(user.username, 10);
  //   user.password = hashPass;
  //   next();
  // } catch (err) {
  //   next();
  // }

  //  //? promise mode
  bcrypt
    .hash(user.password, 10)
    .then((hashPass) => {
      console.log(hashPass);
      user.password = hashPass;
      console.log(user);
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

module.exports = mongoose.model("User", userSchema);
