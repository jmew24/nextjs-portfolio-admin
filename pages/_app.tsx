import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from '../components/ErrorBoundary';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<SessionProvider session={pageProps.session}>
			<RecoilRoot>
				<ErrorBoundary>
					<Component {...pageProps} />
				</ErrorBoundary>
			</RecoilRoot>
		</SessionProvider>
	);
};

export default App;
