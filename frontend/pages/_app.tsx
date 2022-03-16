import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../store/modules/index';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => <Component {...pageProps} />;

export default wrapper.withRedux(WrappedApp);