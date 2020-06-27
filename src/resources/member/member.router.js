import { Router } from "express";
import {getByGroup,
   createOne,
   updateOne,
   removeOne} from './member.controllers';

const router = Router();

router.route("/:username")
   .put(updateOne)
   .delete(removeOne);

router.route("/")
   .get(getByGroup)
   .post(createOne);

export default router;
