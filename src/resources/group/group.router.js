import { Router } from "express";
import {getOne,
   getMany,
   create,
   updateByName,
   deleteByName} from './group.controllers';

const router = Router();

router.route("/:groupName")
   .get(getOne)
   .put(updateByName)
   .delete(deleteByName);

router.route("/")
   .get(getMany)
   .post(create);

export default router;
