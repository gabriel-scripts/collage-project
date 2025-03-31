const sendCalcMetro = async (req, res) => {
    const { custo, maoDeObra, area } = req.body;
    const resultado = custo + maoDeObra / area;
};