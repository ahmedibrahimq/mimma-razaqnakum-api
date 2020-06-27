import Model from './donation.model';
import { C, RUD } from "../../utils/crud";

export const getByCampain = RUD(Model.get);

// export const getByCampain = (req, res) => {
//    Model.get(req.body, (err, result) => {
//       if (err) {
//          return res.status(400).end(err.message);
//       }
//       if (!result.rows || !result.rows.length) { return res.status(404).end(); }

//       return res.status(200).json({data: result.rows})
//    });
// };

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

      return res.status(200).json({data: result.rows[0]});
   });
};

export const deleteOne = (req, res) => {
   Model.remove(req.body, (err, result) => {
      if (err) {
         res.status(400).end(err.message);
      }
      if (!result.rowCount) { return res.status(404).end(); }

      return res.status(200).json({data: result.rows[0]});
   });
};
