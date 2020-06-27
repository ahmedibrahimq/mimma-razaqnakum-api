import { callback200, callback201 } from "./controllers";

export const get = getCall => (req, res) => {
  getCall(req, callback200(res));
}

export const update = updateCall => (req, res) => {
  updateCall(req, callback200(res));
}

export const remove = removeCall => (req, res) => {
  removeCall(req, callback200(res));
}

export const C = createCall => (req, res) => { 
  createCall(req, callback201(res));
}

export const RUD = dbCall => (req, res) => {
  dbCall(req, callback200(res));
}
