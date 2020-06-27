import { Router } from "express";
import {getOne,
   getMany,
   createOne,
   updateOne,
   removeOne} from './group.controllers';

const router = Router();

router.route("/:groupName")
   .get(getOne)
   .put(updateOne)
   .delete(removeOne);

router.route("/")
   .get(getMany)
   .post(createOne);

export default router;
