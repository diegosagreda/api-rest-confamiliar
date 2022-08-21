const pool = require('../db');


const getObservaciones = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM observaciones');
        if(response.rowCount > 0) {
            res.status(200).json(response.rows);
        }else{
            res.status(404).json(response.rows);
        } 
    }catch(err){
        console.log(err);
    }
}
//Obtener actividad por id
const getObservacionById = async (req, res) => {
    const cedula = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM observaciones WHERE cedula = $1',[cedula]);
        if(response.rowCount > 0) {
            res.status(200).json(response.rows);
        }else{
            res.status(404).json({mensaje: 'No se pudo crear'});
        } 
    }catch(err){
        console.log(err);
    }
}
//Crear actividad
const createObservacion = async (req, res) => {
    const {cedula,nota,idarea} = req.body;
    try {
        const response = await pool.query('INSERT INTO observaciones(cedula,nota,idarea) VALUES ($1,$2,$3)',[cedula,nota,idarea]);
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
const updateObservacion = async (req, res) => {
    const idobservacion = req.params.id;
    const {cedula,nota,idarea} = req.body;
    try {
        const response = await pool.query('UPDATE observaciones SET cedula=$1,nota=$2,idarea = $3 WHERE idobservacion = $4',[cedula,nota,idarea,idobservacion]);
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
const deleteObservacion = async (req, res) => {
    const idobservacion = req.params.id;
    try {
      const response = await pool.query('DELETE FROM observaciones WHERE idobservacion = $1 RETURNING *',[idobservacion]);
      if(response.rowCount > 0) {
        res.status(200).json(response.rows);
      }else{
        res.status(400);
      }
    } catch (error) {
      console.log(error);
    }

}

module.exports = {getObservaciones,getObservacionById,createObservacion,updateObservacion,deleteObservacion};