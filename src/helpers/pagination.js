export const getPaginationMeta = (count, size, pageNo) => {
  return {
    currentPage: pageNo,
    pageSize: size,
    totalPage: Math.ceil(count / size)
  };
};
