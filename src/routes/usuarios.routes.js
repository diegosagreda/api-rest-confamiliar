const {Router} = require('express');
const router = Router();

const {getUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario,logearse} = require('../controllers/usuarios.controller');
//Creamos la rutas correspondientes a la tabla
router.get('/usuarios',getUsuarios);
router.get('/usuarios/:id',getUsuarioById);
router.post('/usuarios/login',logearse);
router.post('/usuarios',createUsuario);
router.put('/usuarios/:id',updateUsuario);
router.delete('/usuarios/:id',deleteUsuario);

module.exports = router;