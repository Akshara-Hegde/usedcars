const express = require('express')
const router = express.Router()

const validateToken = require('../middlewares/validatetoken')
const {view,add,viewSingle,deleteCar,edit} = require('../controller/controller')

router.use(validateToken)
console.log("route");

router.route('/').post(add)
router.route("/:search").get(view);
router.route('/:id').get(viewSingle).put(edit).delete(deleteCar)

module.exports = router