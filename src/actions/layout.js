const changeLang = (locale) => {
  localStorage.setItem('lang', locale);
  return { type: 'LOCALE', locale };
};

export default changeLang;
