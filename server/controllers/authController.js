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
          if (user) return res.status(400).json({ msg: 'User already exists' })

          const salt = await GenerateSalt()
          user = new User({ name, email, password ,salt})
          user.password = await GeneratePassword(password, salt)
          await user.save()

          const token = await GenerateSignature(res, {
               email: email,
               _id: user._id,
          })
          return res.status(200).json({ name: user.name, email: user.email, _id: user._id })
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
}

const loginUser = async (req, res) => {
     const { email, password } = req.body
     try {
          let user = await User.findOne({ email })
          if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

          const isMatch = await ValidatePassword(password, user.salt, user.password)
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

          const token = await GenerateSignature(res, {
               email: email,
               _id: user._id,
          })
          return res.status(200).json({ name: user.name, email: user.email, _id: user._id })
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
}

const adminLogin = async (req, res) => {
     const { email, password } = req.body
     try {
          let admin = await Admin.findOne({ email })
          if (!admin) return res.status(400).json({ msg: 'Invalid credentials' })

          const isMatch = await ValidatePassword(password, admin.salt, admin.password)
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

          const token = await GenerateSignatureAdmin(res, {
               email: email,
               _id: admin._id,
          })
          return res.status(200).json({ name: admin.name, email: admin.email, _id: admin._id })
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
}
const registerAdmin = async (req, res) => {
     const { name, email, password } = req.body
     try {
          let admin = await Admin.findOne({ email })
          if (admin) return res.status(400).json({ msg: 'Admin already exists' })

          admin = new admin({ name, email, password })
          const salt = await GenerateSalt()
          admin.password = await GeneratePassword(password, salt)
          await admin.save()

          const token = await GenerateSignatureAdmin(res, {
               email: email,
               _id: admin._id,
          })
          return res.status(200).json({ name: admin.name, email: admin.email, _id: admin._id })
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
}
export { registerUser, loginUser, registerAdmin, adminLogin }
