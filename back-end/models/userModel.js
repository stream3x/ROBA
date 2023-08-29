import mongoose from 'mongoose';

const UserModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  roba: {
    type: Array,
    required: false,
    default: []
  },
  exchange: {
    //Exchange
  }
  rating: {

  }

})
