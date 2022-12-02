export const slugify = (text: string): string => {
  return text
    .split(' ')
    .map((w) => w.toLowerCase())
    .join('-');
};

export const getTwoFirstWords = (text: string): string => {
  return text.split(' ').slice(0, 2).join(' ');
};
