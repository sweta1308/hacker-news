export const getSerialNumber = (index: number, page: number) =>
  (page - 1) * 30 + index + 1
