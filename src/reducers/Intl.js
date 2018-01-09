import { fromJS } from 'immutable';

const checkLanguage = () => {
  const lang = window.navigator.language.toLowerCase();
  if (lang.indexOf('zh') >= 0) {
    return 'zh';
  } else if (lang.indexOf('en') >= 0) {
    return 'en';
  }
  return 'en';
};

const defaultState = fromJS({
  locale: localStorage.getItem('mobi_lang') || checkLanguage(),
});

const Intl = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOCALE':
      return state
        .merge(fromJS({
          locale: action.locale,
        }));
    default:
      return state;
  }
};
export default Intl;
