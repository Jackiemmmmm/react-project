import { fromJS } from 'immutable';
import antdEn from 'antd/lib/locale-provider/en_US';
import antdCn from 'antd/lib/locale-provider/zh_CN';

const arr = { zh: antdCn, en: antdEn };
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
  antd: arr[localStorage.getItem('mobi_lang') || checkLanguage()],
});

const Intl = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOCALE':
      return state
        .merge(fromJS({
          locale: action.locale,
          antd: arr[action.locale],
        }));
    default:
      return state;
  }
};
export default Intl;
