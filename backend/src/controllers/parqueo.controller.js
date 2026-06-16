export function calcularCobro(req,res) {
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
}; 
