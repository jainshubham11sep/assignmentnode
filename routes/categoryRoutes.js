const categoryController=require('../controllers/categoryController.js');

const router=require('express').Router();

router.post('/category',categoryController.addUsers);
router.get('/:id',categoryController.getUserData);


module.exports=router;