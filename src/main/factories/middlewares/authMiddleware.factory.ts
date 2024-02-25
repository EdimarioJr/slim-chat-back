import { AuthMiddleware } from "@/main/middlewares";
import { JsonWebToken } from "@/infra/jwt/jsonwebtoken";
import { JWT_ACCESS_SECRET } from "@/main/config/consts";

export const authMiddlewareFactory = () => {
  const jwt = new JsonWebToken(JWT_ACCESS_SECRET);
  return new AuthMiddleware(jwt);
};
