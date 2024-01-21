import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({message: 'Please enter all fields'})
    }
    const user = await User.findOne({email})

    if(user) {
        return res.status(400).json({message: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({username, email, password:hashedPassword})

    res.send('Signup Successful')

}

