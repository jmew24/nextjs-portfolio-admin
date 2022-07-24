import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

import { UserProps } from './User';

export type CertificationBadgeProps = {
	id: number;
	identifier: string;
	title: string;
	image: string;
	certificationId: number | null;
};

export type CertificationProps = {
	id: number;
	identifier: string;
	displayTitle: string;
	title: string;
	link: string;
	type: number;
	websiteId: number | null;
	badges: CertificationBadgeProps[] | null;
};

export type EducationProps = {
	id: number;
	identifier: string;
	title: string;
	schoolName: string;
	credit: string;
	graduated: string;
	websiteId: number | null;
};

export type ExperienceRoleProps = {
	id: number;
	identifier: string;
	title: string;
	description: string;
	experienceId: number | null;
};

export type ExperienceProps = {
	id: number;
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
	id: number;
	identifier: string;
	file: string;
	description: string;
	galleryId: number | null;
};

export type GalleryProps = {
	id: number;
	identifier: string;
	title: string;
	type: number;
	websiteId: number | null;
	images: GalleryImageProps[] | null;
};

export type GeneralSocialProps = {
	id: number;
	identifier: string;
	name: string;
	url: string;
	className: string;
	generalId: number | null;
};

export type GeneralProps = {
	id: number;
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
	id: number;
	identifier: string;
	title: string;
	description: string;
	image: string;
	url: string;
	type: number;
	websiteId: number | null;
};

export type SkillLanguageProps = {
	id: number;
	identifier: string;
	title: string;
	list: String[];
};

export type SkillProps = {
	id: number;
	title: string;
	type: number;
	list: string[];
	websiteId: number | null;
	language: SkillLanguageProps | null;
};

export type WebsiteProps = {
	id: number;
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

const PreviewPage: React.FC<{ website: WebsiteProps }> = ({ website }) => {
	const authorName = website?.owner?.firstName
		? website?.owner?.lastName
			? `${website?.owner?.firstName} ${website?.owner?.lastName}`
			: website?.owner?.firstName
		: 'Unknown owner';

	return (
		<div onClick={() => Router.push('/website/[id]', `/website/${website.id}`)}>
			<h2>{website.title}....</h2>

			<small>By {authorName}</small>
			<ReactMarkdown children={website.url} />
			<style jsx>{`
				div {
					color: inherit;
					padding: 0.5rem;
				}
			`}</style>
		</div>
	);
};

export default PreviewPage;
