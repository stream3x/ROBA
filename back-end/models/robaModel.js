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
  photo: {
    type: Object,
    required: true,
  },
  status: { // Impostare enum
    type: String,
    enum: ['Nuovo', 'In buono stato', 'In stato accettabile', 'Con parti mancanti', 'Da riparare'],
    required: true
  },
  dismantled: { // Spunta casella (Smontato/Imballato)
    type: Boolean,
    required: true
  },
  stuffThought: {
    type: String,
    required: false,
    default: ''
  },
  picked: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true, strict: true })

export const RobaModel = mongoose.model('RobaModel', RobaModelSchema, 'Roba');
