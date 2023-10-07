import bcrypt from "bcrypt";

bcrypt.hash("%Admin%", 10, (error, hash) => {
  console.log(hash);
});
