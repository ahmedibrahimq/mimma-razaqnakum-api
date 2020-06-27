import Model from './donation.model';
import { C, RUD } from "../../utils/crud";

export const createOne    = C(Model.createOne);
export const getByCampain = RUD(Model.getByCampain);
export const updateOne    = RUD(Model.updateOne);
export const removeOne    = RUD(Model.removeOne);
