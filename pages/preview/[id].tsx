import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useSetRecoilState } from 'recoil';

import { websiteState } from './recoil/atom';

import Layout from '../../components/Layout';
import { WebsiteProps } from '../../components/Preview';
import Header from './src/Components/Header';
import About from './src/Components/About';
import Experience from './src/Components/Experience';
import Certifications from './src/Components/Certifications';
import Skills from './src/Components/Skills';
import Education from './src/Components/Education';
import Gallery from './src/Components/Gallery';
import Projects from './src/Components/Projects';
import Footer from './src/Components/Footer';

import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const website = await prisma.website.findUnique({
		where: {
			id: Number(params?.id) || -1,
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
		props: website,
	};
};

const Preview: React.FC<WebsiteProps> = (props) => {
	const setWebsiteState = useSetRecoilState(websiteState);

	// Update our website state with the props we received
	useEffect(() => {
		setWebsiteState(props);
	}, [props]);

	return (
		<Layout>
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
		</Layout>
	);
};

export default Preview;
