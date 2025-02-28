const User = require('../models/userDetailsModel.js');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, location } = req.body;

    // Check if the user already exists
    let user = await User.findById(req.user.id);

    if (!user) {
      // If user does not exist, create a new one
      user = new User({
        _id: req.user.id,
        name,
        phone,
        location,
      });

      // Save the newly created user
      await user.save();
      return res.status(201).json(user); // Return the newly created user
    }

    // If the user exists, update their profile
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser); // Return the updated user
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// // Handle image upload and URL creation
// export const handleImageUploadUrl = async (req, res) => {
//   try {
//     // Convert file buffer to Base64 and create a valid Data URI
//     const b64 = Buffer.from(req.file.buffer).toString('base64');
//     const url = `data:${req.file.mimetype};base64,${b64}`;

//     // Pass the Data URI to the Cloudinary upload function (replace `imageUploadUnit` with actual Cloudinary upload logic)
//     const result = await imageUploadUnit(url);

//     res.json({
//       success: true,
//       result,
//     });
//   } catch (e) {
//     console.error('Image upload error:', e.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error occurred during image upload',
//     });
//   }
// };

module.exports = { getUserProfile, updateUserProfile };
