const notFound = (req, res) => {
   return res.status(404).send('Route not found!!!');
};

export default notFound;