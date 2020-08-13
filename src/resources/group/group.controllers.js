import Model from './group.model';
import cRUD from "../../utils/crud";

export const createOne = cRUD(Model.createOne, 201);
export const getOne    = cRUD(Model.getOne, 200);
export const getMany   = cRUD(Model.getMany, 200);
export const updateOne = cRUD(Model.updateOne, 200);
export const removeOne = cRUD(Model.removeOne, 200);
