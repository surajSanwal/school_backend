import Book from "../models/Book";
import constants from "../constants";
import { getPaginationMeta } from "../helpers/pagination";

export const bookHandler = (req, h) => {
  return new Promise((resolve, reject) => {
    let pageNo = req.query.pageNo || 1;
    let size = req.query.size || 10;
    let skip = (pageNo - 1) * size;
    Book.find()
      .skip(skip)
      .limit(size)
      .then(res => {
        Book.find()
          .count()
          .then(count => {
            resolve({
              ...constants.status.success,
              data: [...res],
              meta: getPaginationMeta(count, size, pageNo)
            });
          });
      })
      .catch(e => {
        reject({ ...constants.status.error, error: e });
      });
  });
};

export const addBookHandler = (request, h) => {
  return new Promise((resolve, reject) => {
    let isbn = request.payload.isbn;
    Book.findOne({ isbn })
      .then(res => {
        if (!res) {
          let book = new Book(request.payload);
          book
            .save()
            .then(res =>
              resolve({
                ...constants.status.success,
                data: [...res],
                message: "Book Added Successfully"
              })
            )
            .catch(error => {
              reject({
                ...constants.status.dbError,
                message: "Error while writing document",
                error
              });
            });
        } else {
          resolve({
            ...constants.status.error,
            message: "Book with same ISBN already exits!"
          });
        }
      })
      .catch(error => {
        reject({
          ...constants.status.error,
          message: "an error occurred while connecting with database",
          error
        });
      });
  });
};
