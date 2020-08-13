const cRUDCallback = (res, status) => (err, result) => {
  if (err) {
     return res.status(400).end(err.message);
  }
  return res.status(status).json(result.rows);
}

export const cRUD = (dbCall, status) => (req, res) => {
  dbCall(req, cRUDCallback(res, status));
}

export default cRUD;
