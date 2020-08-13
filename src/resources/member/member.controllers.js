import Model from './member.model';
import cRUD from "../../utils/crud";

export const createOne    = cRUD(Model.createOne, 201);
export const getByGroup   = cRUD(Model.getByGroup, 200);
export const updateOne    = cRUD(Model.updateOne, 200);
export const removeOne    = cRUD(Model.removeOne, 200);
