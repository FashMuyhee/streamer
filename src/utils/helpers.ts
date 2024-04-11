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
  const map = textSplit?.map(item => {
    return item.charAt(0);
  });
  if (single) return text.charAt(0);
  return map.join(delimiter);
};
