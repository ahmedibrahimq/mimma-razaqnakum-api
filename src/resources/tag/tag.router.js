import { Router } from "express";
import {getMany,
   createOne,
   updateOne,
   removeOne} from './tag.controllers';

const router = Router();

router.route("/:title")
   .put(updateOne)
   .delete(removeOne);

router.route("/")
   .get(getMany)
   .post(createOne);

export default router;
