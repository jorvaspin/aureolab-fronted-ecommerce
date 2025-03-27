export const formatPrice = (price: number | string): string => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
};