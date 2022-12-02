import { convert } from 'html-to-text';

export const getTextFromHtmlString = (html: string) => {
  const result = convert(html);
  return result;
};
