const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.post('/refreshtoken', ctrls.refreshAccessToken)

// phải đăng nhập mới thực hiện được
router.use(verifyAccessToken)
router.get('/', ctrls.getUsers)
router.get('/current', ctrls.getCurrent)
router.put('/current', ctrls.updateUser)

// phải có quyền admin mới thực hiện được
router.use(isAdmin)
router.delete('/', ctrls.deleteUser)
router.put('/:uid', ctrls.updateUserByAdmin)

module.exports = router

//CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// POST + PUT | body
// GET + DELETE | query // ?...&...