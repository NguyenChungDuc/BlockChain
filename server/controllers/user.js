const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    const user = await User.findOne({ email, phone })
    if (user) {
        throw new Error('User has existed')
    }
    if (req.body.role) {
        throw new Error('Can not create account')
    }
    const newUser = await User.create(req.body)
    return res.status(200).json({
        success: newUser ? true : false,
        mes: newUser ? 'Register is successfully. Please go login' : 'Something went wrong'
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    const response = await User.findOne({ email })
    if (response && await response?.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = 'Bearer ' + generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
            role: role,
            refreshToken: newRefreshToken,
        })
    }
    else {
        throw new Error('Invalid credentials')
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        throw new Error('No refreshToken')
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
            return res.status(401).json({
                success: false,
                mes: 'Invalid refresh token'
            })
        }
        const response = await User.findOne({ _id: decode._id, refreshToken: refreshToken })
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ?
                'Bearer ' + generateAccessToken(response.id, response.role) : 'Refresh token not matched'
        })
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken, -password')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        throw new Error('Missing inputs')
    }
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `User with email ${response.email} delete` : 'No user delete'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs')
    }
    if (req.body.role) {
        throw new Error('Can not update role')
    }
    const isEmail = await User.findOne({ email: req.body.email })
    const isPhone = await User.findOne({ phone: req.body.phone })
    if (isEmail || isPhone) {
        throw new Error('Email or phone has existed')
    }
    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10)
        const password = await bcrypt.hash(req.body.password, salt)
        req.body.password = password
    }
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs')
    }
    if (req.body.role) {
        throw new Error('Can not update role')
    }
    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10)
        const password = await bcrypt.hash(req.body.password, salt)
        req.body.password = password
    }
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-refreshToken -password')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
}