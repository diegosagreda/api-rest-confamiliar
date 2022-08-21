const pool = require('../db');

//Obtener todas la actividades 
const logearse = async (req, res) => {
    const {usuario,contrasena} = req.body;
    try {
        const response = await pool.query('SELECT * FROM usuarios WHERE usuario = $1 and contrasena = $2',[usuario,contrasena]);
        if(response.rowCount > 0) {
            res.status(200).json(response.rows);
        }else{
            res.status(404).json({mensaje: 'Fallo en iniciar sesion'});
        } 
    }catch(err){
        console.log(err);
    }
}
const getUsuarios = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuarios');
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
const getUsuarioById = async (req, res) => {

}
//Crear actividad
const createUsuario = async (req, res) => {
    const {cedula,usuario,contrasena,rol} = req.body;
    try {
        const response =  await pool.query('INSERT INTO usuarios(cedula,usuario,contrasena,rol) values ($1,$2,$3,$4)',[cedula,usuario,contrasena,rol]);
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
const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const {usuario,contrasena,iddocente} = req.body;
    try {
        const response = await pool.query('UPDATE usuarios SET usuario=$1,contrasena=$2, iddocente=$3 WHERE idusuario = $4',[usuario,contrasena,iddocente, id]);
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
const deleteUsuario = async (req, res) => {

}

module.exports = {getUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario,logearse};