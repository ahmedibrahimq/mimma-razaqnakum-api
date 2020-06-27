import { Router } from "express";
import {getAll,
   create,
   updateOne,
   deleteOne} from './tag.controllers';

const router = Router();

router.route("/:title")
   .put(updateOne)
   .delete(deleteOne);

router.route("/")
   .get(getAll)
   .post(create);

export default router;
