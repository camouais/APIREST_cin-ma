const db = require("../Models");

const Projection = db.Projection;

const getProjections = async (req, res) => {
    try {
        const projections = await Projection.findAll();
        res.status(200).json({ success: true, data: projections });
    } catch (error) {
        console.error('Error fetching projections:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
};

module.exports = { getProjections };