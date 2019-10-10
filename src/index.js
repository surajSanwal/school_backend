"use strict";

import Hapi from "@hapi/hapi";
import ip from "ip";
import { routes } from "./routes";

const init = async () => {
  const server = Hapi.server({
    port: 3003,
    host: process.env.NODE_ENV === "development" ? "localhost" : ip.address()
  });
  routes(server);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
