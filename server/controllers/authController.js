import User from '../db/models/User.js'
import Admin from '../db/models/Admin.js'
import {
     GeneratePassword,
     GenerateSalt,
     GenerateSignature,
     GenerateSignatureAdmin,
     ValidatePassword,
} from '../utils/index.js'

const registerUser = async (req, res) => {
     const { name, email, password } = req.body
     try {
          let user = await User.findOne({ email })
          if (user) return res.status(400).json({ error: 'User already exists' })

          const salt = await GenerateSalt()
          user = new User({ name, email, password, salt })
          user.password = await GeneratePassword(password, salt)
          await user.save()

          const token = await GenerateSignature(res, {
               email: email,
               _id: user._id,
          })
          return res.status(201).json({ name: user.name, email: user.email, _id: user._id })
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Server error' })
     }
}

const loginUser = async (req, res) => {
     const { email, password } = req.body
     try {
          let user = await User.findOne({ email })
          if (!user || !(await ValidatePassword(password, user.salt, user.password))) {
               return res.status(400).json({ error: 'Invalid credentials' })
          }

          const token = await GenerateSignature(res, {
               email: email,
               _id: user._id,
          })
          return res.status(200).json({ name: user.name, email: user.email, _id: user._id })
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Server error' })
     }
}

const adminLogin = async (req, res) => {
     const { email, password } = req.body
     try {
          let admin = await Admin.findOne({ email })
          if (!admin || !(await ValidatePassword(password, admin.salt, admin.password))) {
               return res.status(400).json({ error: 'Invalid credentials' }) // Changed the error message for invalid credentials during admin login.
          }
          const token = await GenerateSignatureAdmin(res, {
               email: email,
               _id: admin._id,
          })
          return res.status(200).json({ name: admin.name, email: admin.email, _id: admin._id })
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Server error' })
     }
}
const registerAdmin = async (req, res) => {
     const { email, password } = req.body
     try {
          let admin = await Admin.findOne({ email })
          if (admin) return res.status(400).json({ error: 'Admin already exists' })

          const salt = await GenerateSalt()
          admin = new Admin({ email, password, salt })
          admin.password = await GeneratePassword(password, salt)
          await admin.save()

          const token = await GenerateSignatureAdmin(res, {
               email: email,
               _id: admin._id,
          })
          return res.status(201).json({ name: admin.name, email: admin.email, _id: admin._id })
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Server error' })
     }
}

const logout = async (req, res) => {
     try {
          res.cookie('userJwt', '', {
               httpOnly: true,
               expires: new Date(0),
          })
          res.status(200).json({ status: true, message: 'Logged out' })
          return
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Server error' })
     }
}

const adminLogout = async (req, res) => {
     try {
          res.cookie('adminJwt', '', {
               httpOnly: true,
               expires: new Date(0),
          })
          res.status(200).json({ status: true, message: 'Logged out' })
          return
     } catch (error) {
          console.error(error.message)
          res.status(500).json({ error: 'Server error' })
     }
}
export { registerUser, loginUser, registerAdmin, adminLogin, logout, adminLogout }
