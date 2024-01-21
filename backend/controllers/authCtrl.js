import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"
import asyncHandler from './../middleware/asyncHandler.js';

export const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password || username === '' || email === '' || password === '') {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const user = await User.findOne({email})

    if(user) {
        res.status(400)
        throw new Error('User already exists')
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({username, email, password:hashedPassword})

    res.send('Signup Successful')

}
)
