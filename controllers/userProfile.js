import User from "../models/User.js";

// @desc Get all users
// @route GET /api/users
// @access Admin
export const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");

  res.json(users);
};

// @desc Delete user
// @route DELETE /api/users/:id
// @access Admin
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();

    res.json({
      message: "User removed",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }
};

// @desc Update user by admin
// @route PUT /api/users/:id
// @access Admin
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);

    throw new Error("User not found");
  }
};