const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
  
      createUser(newUser, callback){
   
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
   
        return User.create({
          image: newUser.image,
          username: newUser.username,
          email: newUser.email,
          password: hashedPassword
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        })
      },

      getUser(id, callback){
        return User.findById(id)
        .then((user)=>{
          callback(null, user);
        })
        .catch((err)=>{
          callback(err);
        })
      },

     

    
    
    }