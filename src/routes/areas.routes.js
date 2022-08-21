const {Router} = require('express');
const router = Router();

const {getAreas,getAreaById,createArea,updateArea,deleteArea} = require('../controllers/areas.controller');
//Creamos la rutas correspondientes a la tabla
router.get('/areas',getAreas);
router.get('/areas/:id',getAreaById);
router.post('/areas',createArea);
router.put('/areas/:id',updateArea);
router.delete('/areas/:id',deleteArea);

module.exports = router;