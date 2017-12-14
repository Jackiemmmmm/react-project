const changeLang = (locale) => {
  localStorage.setItem('mobi_lang', locale);
  return { type: 'LOCALE', locale };
};

export default changeLang;
