import { GetServerSidePropsContext } from 'next';

import { prisma } from './get-prisma-client';
import { getUserIsAdmin } from './get-prisma-user';

export const getWebsite = async (context: GetServerSidePropsContext) => {
	const {
		props: { isAdmin, session },
	} = await getUserIsAdmin(context);

	if (!session) {
		return {
			props: { website: undefined, session: null },
		};
	}

	if (isAdmin) {
		const website = await prisma.website.findFirst({
			where: {
				url: String(context.query.url),
			},
			select: {
				id: true,
				title: true,
				url: true,
				public: true,
				owner: {
					select: {
						id: true,
						email: true,
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		return {
			props: { website, session },
		};
	}

	const website = await prisma.website.findFirst({
		where: {
			url: String(context.query.url),
		},
		select: {
			id: true,
			title: true,
			url: true,
			public: true,
			owner: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return {
		props: { website, session },
	};
};

export const getWebsiteById = async (context: GetServerSidePropsContext) => {
	const {
		params: { id },
	} = context;
	const {
		props: { isAdmin, session },
	} = await getUserIsAdmin(context);

	if (!id || typeof id !== 'string') {
		return {
			props: { website: undefined, session },
		};
	}

	if (isAdmin) {
		const website = await prisma.website.findFirst({
			where: {
				id: id,
			},
			select: {
				id: true,
				title: true,
				url: true,
				public: true,
				owner: {
					select: {
						id: true,
						email: true,
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		return {
			props: { website, session },
		};
	}

	const website = await prisma.website.findFirst({
		where: {
			id: id,
			AND: {
				public: true,
				OR: [{ owner: { email: session.user.email } }],
			},
		},
		select: {
			id: true,
			title: true,
			url: true,
			public: true,
			owner: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return {
		props: { website, session },
	};
};

export const getWebsitePreviewById = async (context: GetServerSidePropsContext) => {
	const {
		params: { id },
	} = context;
	const {
		props: { isAdmin, session },
	} = await getUserIsAdmin(context);
	console.log('getWebsitePreviewById', id);

	if (!id || typeof id !== 'string') {
		return {
			props: { website: undefined, session },
		};
	}

	if (isAdmin) {
		const website = await prisma.website.findFirst({
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
	}

	const website = await prisma.website.findFirst({
		where: {
			id: id,
			AND: {
				public: true,
				OR: [{ owner: { email: session.user.email } }],
			},
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
