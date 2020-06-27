import Model from './group.model';

export const getOne = (req, res) => {
   Model.get([req.params.groupName], (err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      if (!result.rows || !result.rows.length) { return res.status(404).end(); }

      return res.status(200).json({data: result.rows[0]})
   });
};

export const getMany = (_, res) => {
   Model.getMany((err, result) => {
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

export const updateByName = (req, res) => {
   Model.update(req.body, (err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      if (!result.rowCount) { return res.status(404).end(); }
      return res.status(200).json({data: `${result.rowCount} row(s) updated`});
   });
};

export const deleteByName = (req, res) => {
   Model.remove([req.params.groupName], (err, result) => {
      if (err) {
         return res.status(400).end(err.message);
      }
      if (!result.rowCount) { return res.status(404).end(); }
      return res.status(200).json({data: `${result.rowCount} row(s) deleted`});
   });
};
