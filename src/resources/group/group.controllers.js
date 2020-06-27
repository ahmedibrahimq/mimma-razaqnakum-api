import Model from './group.model';
import { C, RUD } from "../../utils/crud";

export const createOne = C(Model.createOne);
export const getOne    = RUD(Model.getOne);
export const getMany   = RUD(Model.getMany);
export const updateOne = RUD(Model.updateOne);
export const removeOne = RUD(Model.removeOne);
