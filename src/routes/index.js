import { rootHandler } from "../controllers";

export const routes = server => {
  server.route({
    method: "GET",
    path: "/",
    handler: rootHandler
  });
};
