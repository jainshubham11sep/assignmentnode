const db = require('../models');
const SubCategory = require("../models").sub_category;

//create sub category model

// const Category = db.category;

const addSubCategory = async (req, res) => {
    let info = {
        sub_cat_name: req.body.sub_cat_name,
        cat_id:req.body.cat_id
    }
    const sub_category = await SubCategory.create(info)
    res.status(200).send(sub_category);
    // console.log(category);
}



//get category

const getSubCategoryData = async (req, res) => {
    let sub_cat_id = req.params.sub_cat_id;
    let sub_category = await SubCategory.findOne({
        where: { sub_cat_id: sub_cat_id }
    });
    res.status(200).send(sub_category);
}


//update Category



const updateSubCategoryData = async (req, res) => {
    let sub_cat_id = req.body.sub_cat_id;
    let sub_category = await SubCategory.update(req.body, { where: { sub_cat_id: sub_cat_id } });
    res.status(200).send(sub_category);
}


//delete  Category

const deleteSubCategoryData = async (req, res) => {
    let sub_cat_id = req.params.sub_cat_id;
    await SubCategory.destroy({
        where: { sub_cat_id: sub_cat_id }
    });
    res.status(200).send('deleted');
}

module.exports={
    addSubCategory,getSubCategoryData,updateSubCategoryData,deleteSubCategoryData
}