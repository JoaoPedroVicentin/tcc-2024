export const VALIDATIONS_REGEX = {
  GET_INDEX_PAGE: /pagina=(\d+)/,
  MIN_3_CHARACTERES: /^.{3,}$/,
  IS_DATE_VALID: /(\b\d{2}\/\d{2}\/\d{4}\b)/g,
  REMOVE_ACCENTS: /[\u0300-\u036f]/g,
}
