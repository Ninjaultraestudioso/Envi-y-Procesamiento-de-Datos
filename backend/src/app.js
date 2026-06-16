import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const NAME = process.env.SERVER_NAME;
const VERSION = process.env.SERVER_VERSION;
const DESCRIPTION = process.env.SERVER_DESCRIPTION;
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.json());

app.post('/api/parqueo/calcular', (req, res) => {
    const {
        placa,
        tipo,
        horas,
        minutos
    } = req.body;

    if (!placa || !tipo || !horas || !minutos) {
        return res.status(400).json({
            error: 'La placa es requerida'
        });
    }

    if (tipo !== 'moto' && tipo !== 'carro') {
        return res.status(400).json({
            error: 'El tipo debe ser carro o moto'
        });
    }

    if (Number.isNaN(horas) || horas < 0) {
        return res.status(400).json({
            error: 'La cantidad de horas ingresadas no puede ser menor a cero'
        });
    }

    if (Number.isNaN(minutos) || minutos < 0 || minutos >= 59) {
        return res.status(400).json({
            error: 'La cantidad de minutos ingresados no puede ser menor a cero'
        });
    }

    const tarifa=tipo==="carro"? 1200 : 500;
    
   let h = Number(horas);
   let m = Number(minutos);

    if (m>5) h++;

    const total=h*tarifa;

 res.json({
    placa: placa,
    tipo: tipo,
    tarifa: tarifa,
    tiempoUso: horas+":"+minutos,
    horasCobradas: h,
    total: total
});
}); 

app.get("/", (req, res) => {
    res.json({
        name: NAME,
        version: VERSION,
        description: DESCRIPTION,
        puerto: PORT
    });
});

app.listen(PORT, () => {
    console.log(`${NAME} version ${VERSION} corriendo en http://localhost:${PORT}`);
});

export default app;