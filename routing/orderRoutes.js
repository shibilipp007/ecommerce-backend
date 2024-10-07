const { secure } = require("../middleware/secure")
const router = require("express").Router()

router.post('/', secure, create)

module.exports = router