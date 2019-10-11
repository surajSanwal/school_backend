"use strict";

import Hapi from "@hapi/hapi";
import ip from "ip";
import mongoose from "mongoose";
import { routes } from "./routes";
import dotenv from "dotenv";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
const init = async () => {
  dotenv.config();
  const swaggerOptions = {
    info: {
      title: "Test API Documentation",
      version: "v1"
    }
  };

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV === "development" ? "localhost" : ip.address()
  });
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(res => console.log("mongoose=======connection"))
    .catch(e => console.warn("mongoose error", e));
  routes(server);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
