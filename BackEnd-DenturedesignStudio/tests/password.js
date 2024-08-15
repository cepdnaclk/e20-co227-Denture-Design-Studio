const bcrypt = require("bcryptjs");

const hash = "$2a$10$0sQO10XL0BjqI4rVqCgneeWyLhk0YP78Vc5WhU7yTTecio95RD8lW";
const password = "1234";

bcrypt.compare(password, hash, function (err, res) {
  if (res) {
    console.log("Password matches", res.valueOf(password));
  } else {
    console.log("Password does not match");
  }
});
