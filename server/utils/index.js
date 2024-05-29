import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const GenerateSalt = async () => {
     return await bcrypt.genSalt()
}

export const GeneratePassword = async (password, salt) => {
     return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword, salt, savedPassword) => {
     return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateSignature = async (res, payload) => {
     try {
          const token = await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '30d' })
          res.cookie('userJwt', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'Strict',
               maxAge: 30 * 24 * 60 * 60 * 1000,
          })

          return token
     } catch (error) {
          console.log(error)
          return error
     }
}

export const GenerateSignatureAdmin = async (res, payload) => {
     try {
        
          const token = await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '30d' })
          res.cookie('adminJwt', token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'Strict',
               maxAge: 30 * 24 * 60 * 60 * 1000,
          })

          return token
     } catch (error) {
          console.log(error)
          return error
     }
}

