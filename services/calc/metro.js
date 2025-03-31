const sendCalcMetro = async (req, res) => {
    const { custo, maoDeObra, area } = req.body;
    const resultado = custo + maoDeObra / area;

    res.status(200).json({ preço: resultado});
};

export { sendCalcMetro }; 