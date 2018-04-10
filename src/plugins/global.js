import Vue from 'vue'; //eslint-disable-line
import format from 'date-fns/format';
import AppLogo from '../components/AppLogo'; //eslint-disable-line

Vue.component('app-logo', AppLogo);

export default ({ app, store }, injext) => {
  injext('date', (date, opt) => format(date, opt));
};
