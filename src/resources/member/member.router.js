import { Router } from "express";
import {getByGroup,
   create,
   updateOne,
   deleteOne} from './member.controllers';

const router = Router();

router.route("/:username")
   .put(updateOne)
   .delete(deleteOne);

router.route("/")
   .get(getByGroup)
   .post(create);

export default router;
