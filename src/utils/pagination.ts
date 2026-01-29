export const offsetHandler = (page: number, limit: number) => {
  return (page - 1) * limit
};