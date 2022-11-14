import { Router } from "express";
import {
  createCharc,
  deleteCharacter,
  isAuthenticated,
  updateCharacter,
  login,
} from "../controllers/model.routes";
import {
  renderabout,
  renderedit,
  renderpage,
  renderlogin,
  renderdelete,
} from "../controllers/page.routes";

const router = Router();

//pages

router.get("/", renderpage);

router.get("/about", renderabout);

router.get("/edit/:id", isAuthenticated, renderedit);

router.get("/validate/:id", renderlogin);

router.get("/validatedelete/:id", renderdelete);

//POST
router.post("/image", createCharc);

//DELETE

//PATCH
router.post("/editcharacter/:id", isAuthenticated, updateCharacter);

//LOGIN
router.post("/login", login);

//DELETE
router.delete("/deleteCharacter/:id", isAuthenticated, deleteCharacter);

//ERROR

export default router;
