import { Router } from "express";
import {getByCampain,
   createOne,
   updateOne,
   removeOne} from './donation.controllers';

const router = Router();

router.route("/:campain")
.put(updateOne)
.delete(removeOne);

router.route("/")
   .get(getByCampain)
   .post(createOne);

export default router;
