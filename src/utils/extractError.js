export const extractError = (error, translatable, locale) => translatable ? error?.[locale] : error;
