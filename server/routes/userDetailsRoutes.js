const express = require('express')
const requireAuth = require('../middleware/requireAuth.js')
const{getUserProfile, updateUserProfile} = require('../controller/userDetailsController.js')

const router = express.Router();


router.use(requireAuth)

router.get("/getprofile", getUserProfile);
router.put("/postprofile", updateUserProfile);

module.exports = router