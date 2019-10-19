import { bookHandler, addBookHandler } from "../controllers/books";
import Joi from "@hapi/joi";

const bookRoutes = server => {
  server.route({
    method: "GET",
    path: "/book",
    options: {
      handler: bookHandler,
      description: "Get Books List",
      notes: "Returns a list of  Books",
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
    method: "POST",
    path: "/book",
    options: {
      handler: addBookHandler,
      description: "Add an new book",
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      },
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          publisher: Joi.string().required(),
          author: Joi.string().required(),
          isbn: Joi.string()
            .required()
            .required(),
          pages: Joi.number().required(),
          price: Joi.number().required(),
          edition: Joi.number().required(),
          category: Joi.string().required()
        })
      }
    }
  });
};

export default bookRoutes;
