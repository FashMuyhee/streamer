/**
 * return an initialized text
 * for example: james Ade = JA
 * @param text string
 * @param delimiter  string
 * @param single  boolean
 * @returns string
 */
export const initializeText = (text: string, single: boolean = true, delimiter: string = '') => {
  if (text == undefined) return '';
  const textSplit = text?.split(' ');
  const map = textSplit?.map((item) => {
    return item.charAt(0);
  });
  if (single) return text.charAt(0);
  return map.join(delimiter);
};

/**
 * check if a string variable is empty
 * @param str
 * @returns
 */
export const isEmptyString = (str?: string) => {
  if (str) {
    return false;
  }
  return true;
};

/**
 * validate email string
 * @param email
 */
export const isValidEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

/**
 * date formatter
 * @param date
 * @returns
 */
export const dateFormatter = (date: string) => {
  return new Date(date).toDateString();
};
