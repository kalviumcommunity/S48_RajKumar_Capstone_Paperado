const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===========================================================================REGISTER A NEW USER
// POST: api/users/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all the fields.", 422));
    }
    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists.", 422));
    }
    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters", 422)
      );
    }
    if (password !== password2) {
      return next(new HttpError("Passwords do not match", 422));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });
    res.status(201).json(`New user ${newUser.email} registered.`);
  } catch (error) {
    return next(new HttpError("User registration failed", 422));
  }
};

// ================================================================================LOGIN A REGISTERED USER
// POST: api/users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill in all the fields.", 422));
    }
    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid Email.", 422));
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid Password.", 422));
    }
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("Login failed .Please check your credentials", 422)
    );
  }
};


module.exports = {
  registerUser,
  loginUser,
};
