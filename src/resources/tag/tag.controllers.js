import Model from './tag.model';

export const getAll = (req, res) => {
   Model.get((err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      if (!result.rows || !result.rows.length) { return res.status(404).end(); }

      return res.status(200).json({data: result.rows})
   });
};

export const create = (req, res) => {
   Model.create(req.body, (err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      return res.status(201).json({data: `${result.rowCount} row(s) inserted`});
   });
};

export const updateOne = (req, res) => {
   Model.update(req.body, (err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      if (!result.rowCount) { return res.status(404).end(); }

      return res.status(200).json({data: `${result.rowCount} row(s) updated`});
   });
};

export const deleteOne = (req, res) => {
   Model.remove([req.params.title], (err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      if (!result.rowCount) { return res.status(404).end(); }

      return res.status(200).json({data: `${result.rowCount} row(s) deleted`});
   });
};
