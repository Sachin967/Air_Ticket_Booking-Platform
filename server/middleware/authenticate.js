import jwt from 'jsonwebtoken'

export const validateSignatureUser = async (req, res, next) => {
     try {
          const token = req.cookies.userJwt
          console.log(req.cookies)
          if (!token) {
               return res.status(401).json({ message: 'No token provided' })
          }
          const payload = await jwt.verify(token, process.env.APP_SECRET)
          req.user = payload
          next()
     } catch (error) {
          console.log(error)
          return res.status(401).json({ message: 'Unauthorized' })
     }
}

export const validateSignatureAdmin = async (req, res, next) => {
     try {
          const token = req.cookies.adminJwt
          if (!token) {
               return res.status(401).json({ message: 'No token provided' })
          }
          const payload = await jwt.verify(token, process.env.APP_SECRET)
          req.user = payload
          next()
     } catch (error) {
          console.log(error)
          return res.status(401).json({ message: 'Unauthorized' })
     }
}
