import {
  studentHandler,
  addStudentHandler,
  studentDetailsHandler
} from "../controllers/students";
import Joi from "@hapi/joi";

const studentRoutes = server => {
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
          pageNo: Joi.number().default(1),
          size: Joi.number().default(10)
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/students/{id}",
    options: {
      handler: studentDetailsHandler,
      description: "Get Student Details Using student_id",
      notes: "Returns details of  students",
      tags: ["api"], // ADD THIS TAG
      validate: {
        params: {
          id: Joi.string().required()
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
          email: Joi.string()
            .email()
            .required(),
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

export default studentRoutes;
