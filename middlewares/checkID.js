module.exports = (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        req.id = id;
        next();
    } catch (error) {
        next(error);
    }
};