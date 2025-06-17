const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/Menucontroller');


router.get('/allmenu', menuController.getAllMenuItems);


router.post('/postmenu', menuController.createMenuItem);
router.route('/getmenubyid/:id').get(menuController.getAllMenuItemsbyId)

router.patch('updatemenu/:id', menuController.updateMenuItem);

module.exports = router;