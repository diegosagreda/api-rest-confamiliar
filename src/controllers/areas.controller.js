const pool = require('../db');


const getAreas = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM areas');
        if(response.rowCount > 0) {
            res.status(200).json(response.rows);
        }else{
            res.status(404).json({mensaje: 'No se pudo crear'});
        } 
    }catch(err){
        console.log(err);
    }
}
//Obtener actividad por id
const getAreaById = async (req, res) => {

}
//Crear actividad
const createArea = async (req, res) => {
    const {nombre,descripcion} = req.body;
    try {
        const response = await pool.query('INSERT INTO areas(nombre,descripcion) VALUES ($1,$2)',[nombre,descripcion]);
        if(response.rowCount > 0) {
           res.status(201).json({mensaje: 'Creado con exito'});
        }else{
            res.status(404).json({mensaje: 'No se pudo crear'});
        } 
    }catch(err){
        console.log(err);
    }
}
//Modificar actividad
const updateArea = async (req, res) => {
    const idarea = req.params.id;
    const {nombre,descripcion} = req.body;
    try {
        const response = await pool.query('UPDATE areas SET nombre=$1,descripcion=$2 WHERE idarea = $3',[nombre,descripcion,idarea]);
        if(response.rowCount > 0) {
            res.status(200).json({mensaje: 'Modificacion exitosa'});
        }else{
            res.status(404).json({mensaje: 'No se pudo modificar'});
        } 
    }catch(err){
        console.log(err);
    }
}
//Eliminar actividad
const deleteArea = async (req, res) => {
    const idarea = req.params.id;
    try {
      const response = await pool.query('DELETE FROM areas WHERE idarea = $1 RETURNING *',[idarea]);
      if(response.rowCount > 0) {

        //Recorreos empleados y eliminamos la referencia de idarea
        const response = await pool.query('SELECT * FROM empleados');
        response.rows.forEach(empleado => {
             pool.query('UPDATE empleados SET idarea = "0"  WHERE cedula = $2',[empleado.cedula]);
        });

        res.status(200).json(response.rows);

      }else{
        res.status(400);
      }
    } catch (error) {
      console.log(error);
    }

}

module.exports = {getAreas,getAreaById,createArea,updateArea,deleteArea};