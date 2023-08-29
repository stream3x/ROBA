import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const addNewUser = async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new UserModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: hashedPassword,
    birthdate: req.body.birthdate,
    position: req.body.position, // da sostituire con geolocalizzazione
    avatar: req.body.avatar,
  });

    try {
      const user = await newUser.save();

      res.status(201).send({
        statusCode: 201,
        message: 'Nuovo utente inserito correttamente.',
        payload: user
      })
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: 'Internal Server Error!',
        error
      })
    }
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
    const userById = await UserModel.findById(userId);

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
