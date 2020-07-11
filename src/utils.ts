export const stringifyDate = (dateString: string) => {
  const [y, m, d] = dateString.split("-");
  return `${parseInt(y)}年${parseInt(m)}月${parseInt(d)}日`;
}
