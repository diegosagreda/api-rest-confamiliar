const {Router} = require('express');
const router = Router();

const {getEmpleados,getEmpleadoById,createEmpleado,updateEmpleado,deleteEmpleado} = require('../controllers/empleados.controller');
//Creamos la rutas correspondientes a la tabla
router.get('/empleados',getEmpleados);
router.get('/empleados/:id',getEmpleadoById);
router.post('/empleados',createEmpleado);
router.put('/empleados/:id',updateEmpleado);
router.delete('/empleados/:id',deleteEmpleado);

module.exports = router;