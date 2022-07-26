import { atom, selector, selectorFamily } from 'recoil';

import {
	WebsiteProps,
	TypeId,
	AccessLevel,
	GeneralProps,
	GalleryProps,
	ExperienceProps,
	EducationProps,
	CertificationProps,
	UserProps,
	ProjectProps,
	SkillProps,
} from '../types/web';

export const websiteState = atom({
	key: 'websiteState',
	default: {} as WebsiteProps,
});

export const ownerState = selector({
	key: 'ownerState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.owner;

		return null as UserProps | null;
	},
});

export const ownerAccessLevel = selector({
	key: 'ownerAccessLevel',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website && website?.owner) return website?.owner?.accessLevel;

		return AccessLevel.GUEST;
	},
});

export const certificationsState = selector({
	key: 'certificationsState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.certifications;

		return [] as CertificationProps[];
	},
});

export const filteredCertificationsState = selectorFamily({
	key: 'filteredCertificationsState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);
			if (website && website?.certifications)
				return website?.certifications?.filter((certification) => certification.type === typeId);

			return [] as CertificationProps[];
		},
});

export const educationsState = selector({
	key: 'educationsState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.educations;

		return [] as EducationProps[];
	},
});

export const experiencesState = selector({
	key: 'experiencesState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.experiences;

		return [] as ExperienceProps[];
	},
});

export const filteredExperienceState = selectorFamily({
	key: 'filteredExperienceState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);
			if (website && website?.experiences)
				return website?.experiences.filter((experience) => experience.type === typeId);

			return [] as ExperienceProps[];
		},
});

export const galleriesState = selector({
	key: 'galleriesState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.galleries;

		return [] as GalleryProps[];
	},
});

export const filteredGalleriesState = selectorFamily({
	key: 'filteredGalleriesState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);
			if (website && website?.galleries) return website?.galleries.filter((gallery) => gallery.type === typeId);

			return [] as GalleryProps[];
		},
});

export const generalState = selector({
	key: 'generalState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website && website?.generals) return website?.generals[0];

		return {} as GeneralProps;
	},
});

export const projectsState = selector({
	key: 'projectsState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.projects;

		return [] as ProjectProps[];
	},
});

export const filteredProjectsState = selectorFamily({
	key: 'filteredProjectsState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);
			if (website && website?.projects) return website?.projects.filter((project) => project.type === typeId);

			return [] as ProjectProps[];
		},
});

export const skillsState = selector({
	key: 'skillsState',
	get: ({ get }) => {
		const website = get(websiteState);
		if (website) return website?.skills;

		return [] as SkillProps[];
	},
});

export const filteredSkillsState = selectorFamily({
	key: 'filteredSkillsState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);
			if (website && website?.skills) return website?.skills.filter((skill) => skill.type === typeId)[0];

			return null as SkillProps | null;
		},
});
