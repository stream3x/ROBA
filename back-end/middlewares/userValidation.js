import jwt from 'jsonwebtoken';

export const authenticationToken =  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).send({
        errorType: "Token non presente.",
        statusCode: 401,
        message: "Per poter accedere all'endpoint è necessario un token di autenticazione"
    })
  }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {

        if(error) {
          console.log('Error: ', error)
          console.log('Token: ', token);

          return res.status(403).send({
            errorType: 'Token error',
            statusCode: 403,
            token: token,
            message: 'Il token fornito non è valido o è scaduto',
        }      )



      }

        req.user = user

        next()
    })

}
