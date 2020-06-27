import model from './campain.model';
import { C, RUD } from "../../utils/crud";

export const createOne = C(model.createOne);
export const getOne    = RUD(model.getOne);
export const getMany   = RUD(model.getMany);
export const updateOne = RUD(model.updateOne);
export const removeOne = RUD(model.removeOne);
