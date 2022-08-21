const pool = require('../db');


const getEmpleados = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM empleados');
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
const getEmpleadoById = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM empleados WHERE cedula = $1',[req.params.id]);
        if(response.rowCount > 0) {
            res.status(200).json(response.rows);
        }else{
            res.status(404).json(response.rows);
        } 
    }catch(err){
        console.log(err);
    }
}
const buscarEmpleado = async (id) => {
    try {
        const response = await pool.query('SELECT * FROM empleados WHERE cedula = $1',[id]);
        if(response.rowCount > 0) {
            return true;
        }else{
            return false;
        }
      }catch (Error){
        console.log(Error);
      }
}
//Crear actividad
const createEmpleado = async (req, res) => {
    const {cedula,nombre,telefono,email,ciudad_nacimiento,fecha_nacimiento,ciudad_expedicion,fecha_expedicion,tipo_sangre,sexo,estado_civil,idarea,rol,ciudad_residencia,direccion_residencia,salario} = req.body;

   
     //Fernadnaaaaa
        try {
            const response = await pool.query('INSERT INTO empleados(cedula,nombre,telefono,email,ciudad_nacimiento,fecha_nacimiento,ciudad_expedicion,fecha_expedicion,tipo_sangre,sexo,estado_civil,idarea,rol,ciudad_residencia,direccion_residencia,salario) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)',[cedula,nombre,telefono,email,ciudad_nacimiento,fecha_nacimiento,ciudad_expedicion,fecha_expedicion,tipo_sangre,sexo,estado_civil,idarea,rol,ciudad_residencia,direccion_residencia,salario]);
            if(response.rowCount > 0) {
                //Creamos usuario siempre y cuando su rol sea gerente de area
                res.status(201).json({mensaje: 'Creado con exito'});
                
                await pool.query('INSERT INTO usuarios(cedula,usuario,contrasena,rol) values ($1,$2,$3,$4)',[cedula,email,cedula,rol]);
                
            }else{
                res.status(404).json({mensaje: 'No se pudo crear'});
            } 
        }catch(err){
            console.log(err);
        }


}
//Modificar actividad
const updateEmpleado = async (req, res) => {
    const cedula = req.params.id;
    const {nombre,telefono,email,ciudad_nacimiento,fecha_nacimiento,ciudad_expedicion,fecha_expedicion,tipo_sangre,sexo,estado_civil,idarea,rol,ciudad_residencia,direccion_residencia,salario} = req.body;
    try {
        const response = await pool.query('UPDATE empleados SET nombre = $1,telefono = $2,email = $3,ciudad_nacimiento = $4,fecha_nacimiento = $5,ciudad_expedicion = $6,fecha_expedicion = $7,tipo_sangre = $8,sexo = $9,estado_civil = $10,idarea = $11,rol = $12,ciudad_residencia = $13,direccion_residencia = $14,salario = $15 WHERE cedula = $16',[nombre,telefono,email,ciudad_nacimiento,fecha_nacimiento,ciudad_expedicion,fecha_expedicion,tipo_sangre,sexo,estado_civil,idarea,rol,ciudad_residencia,direccion_residencia,salario,cedula]);
        if(response.rowCount > 0) {
            res.status(200).json({mensaje: 'Modificacion exitosa'});
        }else{
            res.status(404).json({mensaje: 'No se pudo modificar'});
        } 
    }catch(err){
        console.log(err);
    }
}
//Eliminar actividaddd
const deleteEmpleado = async (req, res) => {
    const cedula = req.params.id;
    try {
      const response = await pool.query('DELETE FROM empleados WHERE cedula = $1 RETURNING *',[cedula]);
      if(response.rowCount > 0) {
        res.status(200).json(response.rows);
      }else{
        res.status(400);
      }
    } catch (error) {
      console.log(error);
    }

}


module.exports = {getEmpleados,getEmpleadoById,createEmpleado,updateEmpleado,deleteEmpleado};