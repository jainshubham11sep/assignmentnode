const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models").users;
//create user model

// const User = db.users;

const addUsers = async (req, res) => {
    let info = {
        user_name: req.body.user_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        token: null
    }
    const user = await User.create(info);
    res.status(200).send(user);
    // console.log(user);
}

//signin by user

const signinUser = async (req, res) => {
    // let user_id = req.params.user_id;
    let user = await User.findOne({
        where: { email: req.body.email }
    });
    if (!user) return res.status(404).send({ message: "User Not found." });
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if (!passwordIsValid) {
        return res.status(401).send({
            token: null,
            message: "Invalid Password!"
        });
    }
    var token = jwt.sign({ user_id: user.user_id }, "nodeAssignment", {
        expiresIn: 86400 // 24 hours
    });
    // console.log(token,"token===")
    await User.update({...user,token:token}, { where: { user_id: user.user_id } });

    res.status(200).send({
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        token: token
      });

}

//get all users

// const getAllUsers = async (req, res) => {
//     let users = await User.findAll({
//         // attributes:[
//         //     'user_name',
//         //     'email_id'
//         // ]
//     });
//     res.status(200).send(users);
// }


//get single product

const getUserData = async (req, res) => {
    let user_id = req.params.user_id
    let user = await User.findOne({
        where: { user_id: user_id }
    });
    res.status(200).send(user);
}


//update user



const updateUserData = async (req, res) => {
    let user_id = req.body.user_id;
    let user = await User.update(req.body, { where: { user_id: user_id } });
    res.status(200).send(user);
}


//delete  user

const deleteUserData = async (req, res) => {
    let user_id = req.params.user_id
    await User.destroy({
        where: { user_id: user_id }
    });
    res.status(200).send('deleted');
}

module.exports = {
    addUsers, getUserData, updateUserData, deleteUserData, signinUser
}