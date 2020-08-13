import model from './campain.model';
import cRUD from "../../utils/crud";

export const createOne = cRUD(model.createOne, 201);
export const getOne    = cRUD(model.getOne, 200);
export const getMany   = cRUD(model.getMany, 200);
export const updateOne = cRUD(model.updateOne, 200);
export const removeOne = cRUD(model.removeOne, 200);
