import Model from './tag.model';
import { C, RUD } from "../../utils/crud";

export const createOne    = C(Model.createOne);
export const getMany      = RUD(Model.getMany);
export const updateOne    = RUD(Model.updateOne);
export const removeOne    = RUD(Model.removeOne);
