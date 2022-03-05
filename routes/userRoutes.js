const userController=require('../controllers/userController.js');

const router=require('express').Router();

router.post('/adduser',userController.addUsers);
router.get('/signin',userController.signinUser)
router.get('/:id',userController.getUserData);
router.put("/updateuser",userController.updateUserData);
router.delete("/deleteuser",userController.deleteUserData);


module.exports=router;