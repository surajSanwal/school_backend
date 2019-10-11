import { rootHandler, studentHandler, addStudentHandler } from "../controllers";
import { student } from "../models/Student";
import Joi from "@hapi/joi";

export const routes = server => {
  server.route({
    method: "GET",
    path: "/",
    handler: rootHandler
  });

  server.route({
    method: "GET",
    path: "/todo/{id}/",
    options: {
      handler: rootHandler,
      description: "Get todo",
      notes: "Returns a todo item by the id passed in the path",
      tags: ["api"], // ADD THIS TAG
      validate: {
        params: {
          //   id:
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/students",
    options: {
      handler: studentHandler,
      description: "Get Students List",
      notes: "Returns a list of  students",
      tags: ["api"], // ADD THIS TAG
      validate: {
        query: {
          pageNo: Joi.number().default(1)
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/students",
    options: {
      handler: addStudentHandler,
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      },
      validate: {
        payload: Joi.object({
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          className: Joi.string()
            .required()
            .required(),
          registrationNumber: Joi.number().required(),
          fatherName: Joi.string().required(),
          motherName: Joi.string().required(),
          dob: Joi.date().required()
        })
      }
    }
  });
};
