import Model from './member.model';
import { C, RUD } from "../../utils/crud";

export const createOne    = C(Model.createOne);
export const getByGroup   = RUD(Model.getByGroup);
export const updateOne    = RUD(Model.updateOne);
export const removeOne    = RUD(Model.removeOne);
