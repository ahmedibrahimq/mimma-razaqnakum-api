import { Router } from "express";
import {getByGroup,
   createOne,
   updateOne,
   removeOne} from './tag.controllers';

const router = Router();

router.route("/:title")
   .put(updateOne)
   .delete(removeOne);

router.route("/")
   .get(getByGroup)
   .post(createOne);

export default router;
