const notFound = (req, res) => res.status(404).json("Page doesnt exist");

module.exports = notFound;
