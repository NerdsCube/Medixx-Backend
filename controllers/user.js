const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/SignUp.js");

const secret = 'test';

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, weight, height, phone, gender, age, bloodGroup, picture } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({ email, password: hashedPassword, firstName, lastName, weight, height, phone, gender, age, bloodGroup, picture });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getUsers = async (req, res) => { 
    await UserModal.find({}).toArray()
    .then((users) =>{
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    })
};

const getUser = async (req, res) => { 
  const { email } = req.params;
  try {
      const user = await UserModal.findOne(email);
      
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};

module.exports = { signin, signup, getUsers, getUser };
