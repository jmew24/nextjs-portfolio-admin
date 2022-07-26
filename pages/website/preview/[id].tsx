import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';

import { websiteState } from '../../../common/recoil/states';

import { WebsiteProps } from '../../../common/types/web';

import About from '../../../components/preview/About';
import Header from '../../../components/preview/Header';
import Experience from '../../../components/preview/Experience';
import Certifications from '../../../components/preview/Certifications';
import Skills from '../../../components/preview/Skills';
import Education from '../../../components/preview/Education';
import Gallery from '../../../components/preview/Gallery';
import Projects from '../../../components/preview/Projects';
import Footer from '../../../components/preview/Footer';

import prisma from '../../../common/server/get-prisma-client';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		res,
		params: { id },
	} = context;
	const session = await getSession(context);
	console.log('preview[id] getServerSideProps', id);

	if (!id || typeof id !== 'string') {
		res.writeHead(400).end('Invalid website id');
		return;
	}

	const website = await prisma.website.findUnique({
		where: {
			id: id,
		},
		select: {
			id: true,
			title: true,
			url: true,
			public: true,
			ownerId: true,
			owner: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					accessLevel: true,
				},
			},
			certifications: {
				select: {
					id: true,
					displayTitle: true,
					title: true,
					link: true,
					type: true,
					websiteId: true,
					badges: {
						select: {
							id: true,
							title: true,
							image: true,
							certificationId: true,
						},
					},
				},
			},
			eductions: {
				select: {
					id: true,
					title: true,
					schoolName: true,
					credit: true,
					graduated: true,
					websiteId: true,
				},
			},
			experiences: {
				select: {
					id: true,
					displayTitle: true,
					title: true,
					subtitle: true,
					when: true,
					type: true,
					websiteId: true,
					roles: {
						select: {
							id: true,
							title: true,
							description: true,
							experienceId: true,
						},
					},
				},
			},
			galleries: {
				select: {
					id: true,
					title: true,
					type: true,
					websiteId: true,
					images: {
						select: {
							id: true,
							file: true,
							description: true,
							galleryId: true,
						},
					},
				},
			},
			generals: {
				select: {
					year: true,
					name: true,
					occupation: true,
					description: true,
					bio: true,
					image: true,
					email: true,
					personalWebsite: true,
					resumeDownload: true,
					region: true,
					province: true,
					country: true,
					socials: {
						select: {
							id: true,
							name: true,
							url: true,
							className: true,
						},
					},
				},
			},
			projects: {
				select: {
					id: true,
					title: true,
					description: true,
					image: true,
					url: true,
					type: true,
					websiteId: true,
				},
			},
			skills: {
				select: {
					id: true,
					title: true,
					type: true,
					list: true,
					websiteId: true,
					languages: {
						select: {
							id: true,
							title: true,
							list: true,
						},
					},
				},
			},
		},
	});
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
