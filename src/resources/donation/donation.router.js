import { Router } from "express";
import {getByCampain,
   create,
   updateOne,
   deleteOne} from './donation.controllers';

const router = Router();

router.route("/:campain")
.put(updateOne)
.delete(deleteOne);

router.route("/")
   .get(getByCampain)
   .post(create);

export default router;
