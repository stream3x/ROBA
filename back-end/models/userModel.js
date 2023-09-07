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
    type: Object,
    required: true
  },
  roba: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RobaModel',
    default: []
  }],
  exchange: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ExchangeModel',
    default: []
  }],
  score: {
    gainScore: {
      type: Number,
      required: false,
      default: 0
    },
    givenScore: {
      type: Number,
      required: false,
      default: 0
    }
  },
  rating: {
    reviews: {
      type: Array,
      required: false,
      default: []
    },
    rate: {
      type: Number,
      required:false,
      default: 0
    }
  }
}, { timestamps: true, strict: true})

export const UserModel = mongoose.model('UserModel', UserModelSchema, 'Users');
