export type TypeId = 0 | 1;

export enum AccessLevel {
	GUEST,
	CLIENT,
	ROOT,
	ADMIN,
}

export type UserProps = {
	id: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	password: string | null;
	accessLevel: AccessLevel;
	websites: WebsiteProps[] | null;
};

export type WebsiteProps = {
	id: string;
	url: string;
	title: string;
	public: boolean;
	ownerId: number | null;
	owner: UserProps | null;
	certifications: CertificationProps[] | null;
	educations: EducationProps[] | null;
	experiences: ExperienceProps[] | null;
	galleries: GalleryProps[] | null;
	generals: GeneralProps[] | null;
	projects: ProjectProps[] | null;
	skills: SkillProps[] | null;
};

export type CertificationBadgeProps = {
	id: string;
	identifier: string;
	title: string;
	image: string;
	certificationId: number | null;
};

export type CertificationProps = {
	id: string;
	identifier: string;
	displayTitle: string;
	title: string;
	link: string;
	type: number;
	websiteId: number | null;
	badges: CertificationBadgeProps[] | null;
};

export type EducationProps = {
	id: string;
	identifier: string;
	title: string;
	schoolName: string;
	credit: string;
	graduated: string;
	websiteId: number | null;
};

export type ExperienceRoleProps = {
	id: string;
	identifier: string;
	title: string;
	description: string;
	experienceId: number | null;
};

export type ExperienceProps = {
	id: string;
	identifier: string;
	displayTitle: string;
	title: string;
	subtitle: string;
	when: string;
	type: number;
	websiteId: number | null;
	roles: ExperienceRoleProps[] | null;
};

export type GalleryImageProps = {
	id: string;
	identifier: string;
	file: string;
	description: string;
	galleryId: number | null;
};

export type GalleryProps = {
	id: string;
	identifier: string;
	title: string;
	type: number;
	websiteId: number | null;
	images: GalleryImageProps[] | null;
};

export type GeneralSocialProps = {
	id: string;
	identifier: string;
	name: string;
	url: string;
	className: string;
	generalId: number | null;
};

export type GeneralProps = {
	id: string;
	year: string;
	name: string;
	occupation: string;
	description: string;
	image: string;
	bio: string;
	email: string;
	personalWebsite: string;
	resumeDownload: string;
	region: string;
	province: string;
	country: string;
	websiteId?: number;
	socials: GeneralSocialProps[] | null;
};

export type ProjectProps = {
	id: string;
	identifier: string;
	title: string;
	description: string;
	image: string;
	url: string;
	type: number;
	websiteId: number | null;
};

export type SkillLanguageProps = {
	id: string;
	identifier: string;
	title: string;
	list: string[];
};

export type SkillProps = {
	id: string;
	title: string;
	type: number;
	list: string[];
	websiteId: number | null;
	language: SkillLanguageProps | null;
};
