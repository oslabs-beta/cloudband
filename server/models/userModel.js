const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  RoleArn: { type: String, required: true },
  region: { type: String, required: true },
});

const SALT_WORK_FACTOR = 10;
const password = 'password';
// console.log('salt', salt);

userSchema.pre('save', async function (next) {
  try {
    if (this.password) {
      await bcrypt.genSaltSync(SALT_WORK_FACTOR, function (err, salt) {
        bcrypt.hash(this.password, salt, function (err, hash) {
          if (err) return next(err);
          console.log('hash', hash);
          this.password = hash;
          return next();
        });
      });
    }
  } catch (err) {
    return next('Error hashing password: ' + JSON.stringify(err));
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    await bcrypt.compare(candidatePassword, this.password);
    return next();
  } catch (err) {
    return next('Passwords do not match: ' + JSON.stringify(err));
  }
};

module.exports = mongoose.model('User', userSchema);
