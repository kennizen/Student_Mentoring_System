const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const adminController = require("../controllers/admin.controller");
const Authorize = require("../middlewares/authorize");
const Role = require("../utils/roles");

/** All admin routes are in this file    
 *  For protected routes we are passing the Authorize middleware to check if the user 
 *  is authorized to perform the operation/action.
 * 
 *  **This will prevent other users of the system from penetrating into the admin dashboard 
*/

// admin login route
router.post("/login", adminController.adminLoginHandler);

// admin dashboard route
router.get("/dashboard", Auth, Authorize(Role.Admin), adminController.adminDashboardHandler);

// get all mentor and students
router.get("/getAllUsers", Auth, Authorize(Role.Admin), adminController.getAllUsers);

// saving student mentor groups
router.post("/saveGroup", Auth, Authorize(Role.Admin), async (req, res) =>{

})

module.exports = router;
