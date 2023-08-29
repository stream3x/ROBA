import { RobaModel } from '../models/robaModel.js';
import { UserModel } from '../models/userModel.js'

export const addNewRoba = async (req, res) => {

  const newRoba = new RobaModel({
    robaName: req.body.robaName,
    supplier: req.body.supplier,
    category: req.body.category,
    description: req.body.description,
    photos: req.body.photos,
    status: req.body.status,
    dismantled: req.body.dismantled,
    stuffThought: req.body.stuffThought,
  });

  try {
    const roba = await newRoba.save();

      // Aggiorno l'oggetto dell'autore alla voce roba
      const robaId = roba._id;
      const robaSupplier = await UserModel.findOne({ _id: req.body.supplier });
      robaSupplier.roba.push(robaId);
      await robaSupplier.save();
      //

    res.status(200).send({
      statusCode: 200,
      message: 'Nuovo oggetto inserito correttamente.',
      payload: roba
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}
