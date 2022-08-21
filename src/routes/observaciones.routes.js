const {Router} = require('express');
const router = Router();

const {getObservaciones,getObservacionById,createObservacion,updateObservacion,deleteObservacion} = require('../controllers/observaciones.controller');
//Creamos la rutas correspondientes a la tabla
router.get('/observaciones',getObservaciones);
router.get('/observaciones/:id',getObservacionById);
router.post('/observaciones',createObservacion);
router.put('/observaciones/:id',updateObservacion);
router.delete('/observaciones/:id',deleteObservacion);

module.exports = router;