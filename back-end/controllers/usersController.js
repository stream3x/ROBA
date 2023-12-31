import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../utils/cloudinary.js';

export const addNewUser = async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const avatar = req.body.avatar;

  try {

  if(avatar) {
    const uploadResponse = await cloudinary.uploader.upload(avatar, {
      upload_preset: 'roba-users-avatar'
    });

    if(uploadResponse) {
      const newUser = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
        birthdate: req.body.birthdate,
        position: req.body.position,
        avatar: uploadResponse,
      });

        const user = await newUser.save();

        res.status(201).send({
          statusCode: 201,
          message: 'Nuovo utente inserito correttamente.',
          payload: user
        })

      }
    }
      } catch (error) {
        console.log('Catch error: ', error);
        res.status(500).send({
          statusCode: 500,
          message: 'Internal Server Error!',
          error: error
        })

      }


}

export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if(!user) {
    return res.status(404).send({
      sendCode: 404,
      message:'Utente o password non validi.'
    })
  }

  if (await bcrypt.compare(req.body.password, user.password)) {

    const token = jwt.sign({
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      birthdate: user.birthdate,
      position: user.position,
      avatar: user.avatar
    }, process.env.JWT_SECRET, { expiresIn: '1h'});

    return res.header('Authorization', token).status(200).send({
      statusCode: 200,
      token: token
    })

  }

  res.status(401).send({
    statusCode: 401,
    message: 'Utente o password non validi.'
  })
}

export const getAllUsers = async (req, res) => {

  try {
    const usersData = await UserModel.find()
    .populate("roba");
    res.status(200).send({
      statusCode: 200,
      payload: usersData
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const userById = await UserModel.findById(userId).
    populate('roba');

    if(!userById) {
      return res.status(404).send({
        statusCode: 404,
        message: `Utente con id ${userId} non trovato.`
      })
    }

    res.status(200).send({
      statusCode: 200,
      userById
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}

export const getUserByEmail = async (req, res) => {
  const { userEmail } = req.params;


  console.log(userEmail);

  try {
    const userByEmail = await UserModel.findOne({ email: userEmail })
    .populate('roba')

      if(!userByEmail) {
        return res.status(404).send({
          statusCode: 404,
          message: `Utente con indirizzo email ${userEmail} non trovato.`
        })
      }

    res.status(200).send({
      statusCode: 200,
      userByEmail
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}

export const getUsersByName = async (req, res) => {
  const { usersName } = req.query;

  try {
    const usersByName = await UserModel.find({ name: {
      $regex: usersName,
      $options: 'i'
    } }).populate('roba');

    if(usersByName.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Nessun utente trovato.'
      })
    }

    res.status(200).send({
      statusCode: 200,
      usersByName
    })
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: 'Internal Server Error!',
      error
    })
  }
}
