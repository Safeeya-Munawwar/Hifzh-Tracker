export const currencyType = import.meta.env.VITE_APP_CURRENCY_TYPE || "USD";

export const formatPrice = (price) => {
  if (price === null || price === undefined) return "Contact for price";

  return `${currencyType} ${Number(price).toLocaleString()}`;
};