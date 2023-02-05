export const formats = [
  'bold',
  'italic',
  'strike',
  'underline',
  'font',
  'script',
  'list',
  'code-block',
  'size',
  'header',
  'indent',
  'align',
  'color',
  'background',
  'direction',
  'link',
];

export const module = {
  toolbar: [
    [
      'bold',
      'italic',
      'underline',
      'strike',
      'link',
      { list: 'ordered' },
      { list: 'bullet' },
      { align: [] },
    ],
    [{ font: [] }, { header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    [{ direction: 'rtl' }],
  ],
};
