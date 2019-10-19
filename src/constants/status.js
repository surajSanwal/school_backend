const status = {
  success: {
    success: true,
    statusCode: 200
  },
  error: {
    success: false,
    statusCode: 100
  },
  notFound: {
    success: false,
    statusCode: 404
  },
  serverError: {
    success: false,
    statusCode: 500
  },
  dbError: {
    success: false,
    statusCode: 102
  }
};

export default status;
