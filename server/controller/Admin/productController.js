const { imageUploadUnit } = require('../../helper/cloudinarySetUp');
const Product = require('../../models/admin/product.js');

const handleImageUploadUrl = async (req, res) => {
    try {
        // Convert file buffer to Base64 and create a valid Data URI
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        

        // Pass the Data URI to the Cloudinary upload function
        const result = await imageUploadUnit(url);

        res.json({
            success: true,
            result,
        });
    } catch (e) {
        console.error('Image upload error:', e.message);
        res.status(500).json({
            success: false,
            message: 'Error occurred during image upload',
        });
    }
};



//add new product
const addProduct = async (req, res) => {
    try {
      console.log('Request body:', req.body); // Debug log to inspect incoming data
      const { productName, price, description, size, color, image } = req.body;
  
      if (!Array.isArray(size) || size.some((item) => typeof item !== 'string')) {
        return res.status(400).json({ error: 'Invalid size format' });
      }
  
      const product = new Product({ productName, price, description, size, color, image });
      await product.save();
  
      res.status(201).json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


  //fetch product
  const fetchProduct = async(req,res)=>{
    try{
      const listOfProducts = await Product.find({})
        res.status(200).json
        ({
            success:true,
            data:listOfProducts
        })
    }

    catch(err){
      console.log(err)
      res.status(500).json({
        success:false,
        message:'Error while fetching data'
      })
    }
  }

  //ready product by id
  const getOneDetails = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        const oneDetails = await Product.findById(id); // Pass the ID to findById
  
        if (!oneDetails) { // No need to check `length` for a single document
            return res.status(404).json({ message: "No details found" });
        }
  
        res.json({ message: "Detail found", data: oneDetails });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
    }
  };
  


 
// Update details by ID
const updateDetailsById = async (req, res) => {
  const { id } = req.params;
  const { productName, price, description, size, color} = req.body;

  try {
      const updatedDetails = await Details.findByIdAndUpdate(id, {
        productName, price, description, size, color
      }, { new: true });

      if (!updatedDetails) {
          return res.status(404).json({ message: "Details not found" });
      }
      res.json({ message: "Details updated successfully", data: updatedDetails });
  } catch (error) {
      console.error("Error updating details:", error);
      res.status(500).json({ message: "Failed to update details" });
  }
};



  
//delete product
const deleteProduct =  async(req,res)=>{
  try{
      const{id} = req.params;
      const product = await Product.findByIdAndDelete(id)

      if(!product) return res.status(404).json({
          success:false,
          message:'Not got the Product'
      })

      res.status(200).json({
          success:true,
          message:'Product deleted successfully'
      })

  }
  catch(e){
      console.log(e)
      res.status(500).json({
          success:false,
          message:'Error happened'
      })
  }
}
  
module.exports = { handleImageUploadUrl,addProduct,fetchProduct,deleteProduct,getOneDetails,updateDetailsById};
