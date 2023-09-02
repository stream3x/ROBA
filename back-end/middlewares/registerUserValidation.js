import { body, validationResult } from 'express-validator';

const validateUserRegister = [
  body('name')
    .notEmpty()
    .withMessage("Il campo NOME non può essere vuoto."),

  body('surname')
    .notEmpty()
    .withMessage("Il campo cognome non può essere vuoto."),

  body('email')
    .notEmpty()
    .withMessage("Il campo email non può essere vuoto.")
    .isEmail()
    .withMessage("L'indirizzo email non è valido."),

  body('password')
    .notEmpty()
    .withMessage("Il campo password non può essere vuoto.")
    .isLength({ min: 8 })
    .withMessage("La password deve contenere almeno 8 caratteri."),

  body('repeatPassword')
    .notEmpty()
    .withMessage("Il campo ripeti password non puà essere vuoto")
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error("Le password non coincidono.");
      }
      return true;
    }),

  body('birthdate')
    .notEmpty()
    .withMessage("Il campo data di nascita non può essere vuoto")

  body()



  body('')
]
