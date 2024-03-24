import '@radix-ui/themes/styles.css';
import '~/styles/global.scss';
import 'dayjs/locale/ko';

import { Theme } from '@radix-ui/themes';
import dayjs from 'dayjs';
import relativeTimeDayjsPlugin from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '~/App';

dayjs.locale('ko');
dayjs.extend(relativeTimeDayjsPlugin);

const $root = document.getElementById('root');

if ($root === null) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
