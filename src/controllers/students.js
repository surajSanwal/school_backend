import Student from "../models/Student";
import constants from "../constants";
import { getPaginationMeta } from "../helpers/pagination";

export const studentHandler = (req, h) => {
  return new Promise((resolve, reject) => {
    let pageNo = req.query.pageNo || 1;
    let size = req.query.size || 10;
    let skip = (pageNo - 1) * size;
    Student.find()
      .skip(skip)
      .limit(size)
      .then(res => {
        Student.find()
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

export const addStudentHandler = (request, h) => {
  return new Promise((resolve, reject) => {
    let email = request.payload.email;
    Student.findOne({ email })
      .then(res => {
        if (!res) {
          let student = new Student(request.payload);
          student
            .save()
            .then(res =>
              resolve({
                ...constants.status.success,
                data: [...res],
                message: "Student Registered Successfully"
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
            message: "Email already exits!"
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

export const studentDetailsHandler = (request, h) => {
  return new Promise((resolve, reject) => {
    Student.findById(request.params.id)
      .then(res => {
        resolve({ ...constants.status.success, data: res });
      })
      .catch(e => {
        reject({ ...constants.status.error, error: e });
      });
  });
};
