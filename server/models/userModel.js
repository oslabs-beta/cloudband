const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  RoleARN: { type: String, required: true },
  region: { type: String, required: true },
});

const SALT_WORK_FACTOR = 10;
const password = 'password';
// console.log('salt', salt);
userSchema.pre('save', function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      console.log('user.password', user.password);
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
// any time we save a document to our users collection (by calling User.save(...))
// run this function BEFORE saving the document
// userSchema.pre('save', async function (next) {
//   // try {
//   //   console.log('inside userSchema');
//   //   if (this.password) {
//   //     await bcrypt.genSaltSync(SALT_WORK_FACTOR, function (err, salt) {
//   //       bcrypt.hash(this.password, salt, function (err, hash) {
//   //         if (err) return next(err);
//   //         this.password = hash;
//   //         console.log('hashedPW ', hash);
//   //         return next();
//   //       });
//   //     });
//   //   }
//   // } catch (err) {
//   //   return next('Error hashing password: ' + JSON.stringify(err));
//   // }
// });

//MOVED THIS LOGIC TO THE USER CONTROLLER
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     await bcrypt.compare(candidatePassword, this.password);
//     return next();
//   } catch (err) {
//     return next('Passwords do not match: ' + JSON.stringify(err));
//   }
// };

module.exports = mongoose.model('User', userSchema);
