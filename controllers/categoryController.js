const db = require('../models');
const Category = require("../models").categories;

//create category model

// const Category = db.category;

const addCategory = async (req, res) => {
    let info = {
        cat_name: req.body.cat_name,
    }

    const category = await Category.create(info)
    res.status(200).send(category);
    // console.log(category);
}

//get all Category

// const getAllCategories = async (req, res) => {
//     let categories = await User.findAll({
//         // attributes:[
//         //     'user_name',
//         //     'email_id'
//         // ]
//     });
//     res.status(200).send(categories);
// }


//get category

const getCategoryData = async (req, res) => {
    let cat_id = req.params.cat_id;
    let category = await Category.findOne({
        where: { cat_id: cat_id }
    });
    res.status(200).send(category);
}


//update Category



const updateCategoryData = async (req, res) => {
    let cat_id = req.body.cat_id;
    let category = await Category.update(req.body, { where: { cat_id: cat_id } });
    res.status(200).send(category);
}


//delete  Category

const deleteCategoryData = async (req, res) => {
    let cat_id = req.params.cat_id;
    await Category.destroy({
        where: { cat_id: cat_id }
    });
    res.status(200).send('deleted');
}

module.exports={
    addCategory,getCategoryData,updateCategoryData,deleteCategoryData
}