// creiamo una middleware per la gestione centralizzata degli errori
function handleError(err, req, res, next) {
  res.status(500);
  res.json({
    error: err.message,
  });
}
// esportiamo la middleware
module.exports = handleError;
