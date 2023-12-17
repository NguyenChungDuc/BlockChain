const userRouter = require('./user')
const patientRouter = require('./patient')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRouter = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/patient', patientRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRouter