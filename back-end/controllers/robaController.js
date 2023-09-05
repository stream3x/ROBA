import { RobaModel } from '../models/robaModel.js';
import { UserModel } from '../models/userModel.js';
import cloudinary from '../utils/cloudinary.js';

// export const addNewRobaCloud = async (req, res) => {
//
//   try {
//
//     const image = req.body.photo;
// 
//     if(image) {
//       const uploadResponse = await cloudinary.uploader.upload(image, {
//         upload_preset: 'roba-products'
//       });
//       console.log('uploadResponse: ', uploadResponse);
//
//       if(uploadResponse) {
//         const newRoba = new RobaModel({
//           robaName: req.body.robaName,
//           supplier: req.body.supplier,
//           category: req.body.category,
//           description: req.body.description,
//           photo: uploadResponse,
//           status: req.body.status,
//           dismantled: req.body.dismantled,
//           stuffThought: req.body.stuffThought
//         })
//
//         const savedRoba = await newRoba.save();
//
//           // Aggiorno l'oggetto dell'autore alla voce roba
//           const robaId = roba._id;
//           const robaSupplier = await UserModel.findOne({ _id: req.body.supplier });
//           robaSupplier.roba.push(robaId);
//           await robaSupplier.save();
//           //
//
//         res.status(200).send({
//           statusCode: 200,
//           message: 'Nuovo oggetto inserito correttamente.',
//           payload: savedRoba
//         })
//       }
//     }
//
//   } catch (error) {
//     console.log('Error: ', error);
//     res.status(500).send({
//       statusCode: 500,
//       message: 'Internal Server Error!',
//       error
//     })
//   }
// }
//
// export const getAllRobaCloud = async (req, res) => {
//
//   try {
//     const robaData = await robaModel.find()
//     .populate('supplier');
//
//     res.status(200).send({
//       statusCode: 200,
//       payload: robaData
//     })
//   } catch (error) {
//     console.log('Error: ', error);
//     res.status(500).send({
//       statusCode: 500,
//       message: 'Internal Server Error!',
//       error
//     })
//   }
//
// }

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

export const getAllRoba = async (req, res) => {

  try {
    const robaData = await RobaModel.find()
    .populate('supplier');

    res.status(200).send({
      statusCode: 200,
      payload: robaData
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}

export const getRobaById = async (req, res) => {
  const { robaId } = req.params;

  try {
    const robaById = await RobaModel.findById(robaId)
    .populate('supplier');

    if(!robaById) {
      return res.status(404).send({
        statusCode: 404,
        message: `Roba con id ${robaId} non trovato.`
      })
    }

    res.status(200).send({
      statusCode: 200,
      payload: robaById
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}
