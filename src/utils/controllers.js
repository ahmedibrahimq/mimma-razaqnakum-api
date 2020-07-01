const callback200 = res => (err, result) => {
  if (err) {
     return res.status(400).end(err.message);
  }
  if (!result.rowCount) { return res.status(404).end(); }

  return res.status(200).json(result.rows);
}

const callback201 = res => (err, result) => {
  if (err) {
     return res.status(400).end(err.message);
  }
  return res.status(201).json(result.rows);
}

export {callback200, callback201}
