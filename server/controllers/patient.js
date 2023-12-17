const Patient = require('../models/patient')
const asyncHandler = require('express-async-handler')

const getOneProfile = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const patient = await Patient.findById(pid)
    return res.status(200).json({
        success: patient ? true : false,
        rs: patient ? patient : 'Profile not found'
    })
})

const getProfiles = asyncHandler(async (req, res) => {
    const response = await Patient.find()
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const createNewProfile = asyncHandler(async (req, res) => {
    const { name, phone, address, age, card, diagnosis, doctor } = req.body
    if (!name || !phone || !address || !age || !card || !diagnosis || !doctor) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    else {
        const newPatient = await Patient.create(req.body)
        return res.status(200).json({
            success: newPatient ? true : false,
            mes: newPatient ? 'Create is success' : 'Something went wrong',
        })
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs')
    }
    const response = await Patient.findByIdAndUpdate(uid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const deleteProfile = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        throw new Error('Missing inputs')
    }
    const response = await Patient.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Profile has been deleted` : 'No profile delete'
    })
})

module.exports = {
    getOneProfile,
    getProfiles,
    createNewProfile,
    updateProfile,
    deleteProfile,
}