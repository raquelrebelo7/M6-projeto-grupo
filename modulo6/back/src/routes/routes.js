const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const addUserController = require("../controllers/addUserController");
const editUserController = require("../controllers/editUserController");
const deleteUserController = require("../controllers/deleteUserController");
const findUserByIdController = require("../controllers/findUserByIdController");
const indexFuncionalidadesController = require("../controllers/indexFuncionalidadesController");
const addFuncionalidadesController = require("../controllers/addFuncionalidadesController");
const editFuncionalidadesController = require('../controllers/editFuncionalidadesController');
const deleteFuncionalidadesController = require('../controllers/deleteFuncionalidadesController');

//index ou busca todos
router.get("/", indexController.renderPage);

router.get("/funcionalidades", indexFuncionalidadesController.renderPage);

//adiciona 
router.post("/adduser", addUserController.addUser);

router.post("/addfuncionalidades", addFuncionalidadesController.addFuncionalidades);


//edita
router.put("/edituser/:userId", editUserController.editUser);
router.put("/editfuncionalidades/:name", editFuncionalidadesController.editFuncionalidades);

//deleta 
router.delete("/deleteuser/:id", deleteUserController.deleteUser);
router.delete("/deletefuncionalidades/:id", deleteFuncionalidadesController.deleteFuncionalidades);

//busca por id
router.get("/user/:userId", findUserByIdController.renderUserById);

module.exports = router;
