import { Router } from "express";
import {createOne, getOne, getMany, updateOne, removeOne} from './campain.controllers';

const router = Router();


router.route("/")
.post(createOne)
.get(getMany)

router.route("/:title")
   .get(getOne)
   .put(updateOne)
   .delete(removeOne);

   export default router;
