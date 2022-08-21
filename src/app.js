const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/areas.routes'));
app.use(require('./routes/empleados.routes'));
app.use(require('./routes/observaciones.routes'));



app.listen(port, ()=>{
    console.log('listening on port ', port);
});
