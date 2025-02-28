const express = require('express')
const {handleImageUploadUrl,addProduct,fetchProduct,deleteProduct,getOneDetails,updateDetailsById}= require('../../controller/Admin/productController')
const {upload} = require('../../helper/cloudinarySetUp')

const router = express.Router();

router.post("/uploadimage",upload.single('my_file'),handleImageUploadUrl)
router.post("/add",addProduct)
router.get("/getAll",fetchProduct)
router.get("/getOne/:id",getOneDetails)
router.put("/updateOne/:id",updateDetailsById)
router.delete("/delete/:id",deleteProduct)


module.exports = router