import antdEn from 'antd/lib/locale-provider/en_US';
import antdCn from 'antd/lib/locale-provider/zh_CN';
import { fromJS } from 'immutable';

const arr = { zh: antdCn, en: antdEn };

const checkLanguage = () => {
  const lang = (window.navigator.language || window.navigator.browserLanguage).toLowerCase();
  if (!lang || lang.indexOf('en') >= 0) return 'en';
  // if (lang.indexOf('tw') >= 0 || lang.indexOf('hk') >= 0) return 'zh-Hant-HK';
  if (lang.indexOf('zh') >= 0) return 'zh';
  return 'en';
};

const defaultState = fromJS({
  locale: localStorage.getItem('lang') || checkLanguage(),
  antd: arr[localStorage.getItem('lang') || checkLanguage()],
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
