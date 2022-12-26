import { Router } from "express";
import { adaptRoute } from "./adapters";
import {
  loginControllerFactory,
  logoutControllerFactory,
  registerControllerFactory,
} from "./factories";

const router = Router();

router.get("/", (_, res) => {
  return res.status(200).send("teste");
});

router.post("/login", adaptRoute(loginControllerFactory()));

router.post("/register", adaptRoute(registerControllerFactory()));

router.post("/logout", adaptRoute(logoutControllerFactory()));

export default router;
