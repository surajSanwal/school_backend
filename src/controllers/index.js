import Student from "../models/Student";

export const rootHandler = (request, h) => {
  return "Hello";
};

export const studentHandler = (req, h) => {
  return new Promise((resolve, reject) => {
    Student.find()
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const addStudentHandler = (request, h) => {
  return new Promise((resolve, reject) => {
    let student = new Student(request.payload);
    student
      .save()
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
};
