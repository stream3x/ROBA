import mongoose from 'mongoose';

const RobaModelSchema = new mongoose.Schema({
  robaName: {
    type: String,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  category: { // Impostare enum
    type: String,
    enum: ['Arredamento', 'Soprammobili', 'Elettrodomestici', 'Giochi', 'Vestiti', 'Libri', 'Attrezzi sportivi', 'Attrezzi da lavoro', 'Altro'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true,
  },
  status: { // Impostare enum
    type: String,
    enum: ['Da riparare', 'Con parti mancanti', 'Buono stato', 'Praticamente nuovo'],
    required: true
  },
  dismantled: {
    type: Boolean,
    required: true
  },
  stuffThought: {
    type: String,
    required: false,
    default: ''
  },
  request: {
    isRequired: {
      type: Boolean,
      required: false
    },
    takerId: {
      type: String,
      required: false
    }
  }
}, { timestamps: true, strict: true })

export const RobaModel = mongoose.model('RobaModel', RobaModelSchema, 'Roba');
