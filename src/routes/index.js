import { rootHandler } from "../controllers";
import studentRoutes from "./students";
import bookRoutes from "./books";
export const routes = server => {
  server.route({
    method: "GET",
    path: "/",
    handler: rootHandler
  });

  studentRoutes(server);
  bookRoutes(server);
};
