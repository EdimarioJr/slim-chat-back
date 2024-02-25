import { Router } from "express";
import { adaptMiddleware, adaptRoute } from "./adapters";
import {
  createChatControllerFactory,
  createMessageControllerFactory,
  deleteChatControllerFactory,
  deleteMessageControllerFactory,
  getChatsByUserControllerFactory,
  getMessageByChatControllerFactory,
  loginControllerFactory,
  logoutControllerFactory,
  registerControllerFactory,
  updateChatControllerFactory,
} from "./factories";
import { replaceRefreshTokenControllerFactory } from "./factories/controllers/replaceRefreshTokenController.factory";
import { authMiddlewareFactory } from "./factories/middlewares";

const router = Router();

router.get("/", (_, res) => {
  return res.status(200).send("App slim chat back");
});

router.post("/login", adaptRoute(loginControllerFactory()));

router.post("/register", adaptRoute(registerControllerFactory()));

router.post("/logout", adaptRoute(logoutControllerFactory()));

router.post(
  "/refresh-token",
  adaptRoute(replaceRefreshTokenControllerFactory())
);

router.post(
  "/chat",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(createChatControllerFactory())
);

router.put(
  "/chat",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(updateChatControllerFactory())
);

router.get(
  "/chat",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(getChatsByUserControllerFactory())
);

router.delete(
  "/chat",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(deleteChatControllerFactory())
);

router.post(
  "/message",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(createMessageControllerFactory())
);

router.get(
  "/message/:chatId",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(getMessageByChatControllerFactory())
);

router.delete(
  "/message/:id",
  adaptMiddleware(authMiddlewareFactory()),
  adaptRoute(deleteMessageControllerFactory())
);

export default router;
