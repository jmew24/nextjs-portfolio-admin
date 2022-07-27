import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { useSetRecoilState } from 'recoil';

import { websiteState } from '../../../common/recoil/states';

import { WebsiteProps } from '../../../common/types/web';

import { getWebsitePreviewById } from '../../../common/server/get-prisma-website';

import About from '../../../components/preview/About';
import Header from '../../../components/preview/Header';
import Experience from '../../../components/preview/Experience';
import Certifications from '../../../components/preview/Certifications';
import Skills from '../../../components/preview/Skills';
import Education from '../../../components/preview/Education';
import Gallery from '../../../components/preview/Gallery';
import Projects from '../../../components/preview/Projects';
import Footer from '../../../components/preview/Footer';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { res } = context;
	const {
		props: { website, session },
	} = await getWebsitePreviewById(context);

	if (!website) {
		res.writeHead(400).end('Invalid website id');
		return;
	}

	return {
		props: { website, session },
	};
};

type Props = {
	website: WebsiteProps;
	session: Session;
};

const Preview: React.FC<Props> = ({ website, session }) => {
	const setWebsiteState = useSetRecoilState(websiteState);

	// Update our website state with the props we received
	useEffect(() => {
		setWebsiteState(website);
	}, [website, session]);

	return (
		<>
			<div className='App'>
				<Header />
				<About />
				<section className='main'>
					<Experience />
					<Certifications />
					<Skills />
					<Education />
				</section>
				<section className='bottom'>
					<Gallery />
					<Projects />
				</section>
				<Footer />
			</div>
			<style jsx>{`
				.page {
					background: white;
					padding: 2rem;
				}

				.actions {
					margin-top: 2rem;
				}

				button {
					background: #ececec;
					border: 0;
					border-radius: 0.125rem;
					padding: 1rem 2rem;
				}

				button + button {
					margin-left: 1rem;
				}
			`}</style>
		</>
	);
};

export default Preview;
