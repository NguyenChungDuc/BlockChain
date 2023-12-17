const router = require('express').Router();
const ctrls = require('../controllers/patient');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.use(verifyAccessToken);
router.get('/profile/:pid', ctrls.getOneProfile);
router.get('/', ctrls.getProfiles);
router.use(isAdmin);
router.post('/', ctrls.createNewProfile);
router.put('/:uid', ctrls.updateProfile);
router.delete('/', ctrls.deleteProfile);
// router.get('/', ctrls)

module.exports = router;

//CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// POST + PUT | body
// GET + DELETE | query // ?...&...
