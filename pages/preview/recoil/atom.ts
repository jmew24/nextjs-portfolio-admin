import { atom, selector, selectorFamily } from 'recoil';
import { WebsiteProps } from '../../../components/Preview';

export type TypeId = 0 | 1;

export const websiteState = atom({
	key: 'websiteState',
	default: {} as WebsiteProps,
});

export const ownerState = selector({
	key: 'ownerState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.owner;
	},
});

export const certificationsState = selector({
	key: 'certificationsState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.certifications;
	},
});

export const filteredCertificationsState = selectorFamily({
	key: 'filteredCertificationsState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);

			return website.certifications.filter((certification) => certification.type === typeId);
		},
});

export const educationsState = selector({
	key: 'educationsState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.educations;
	},
});

export const experiencesState = selector({
	key: 'experiencesState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.experiences;
	},
});

export const filteredExperienceState = selectorFamily({
	key: 'filteredExperienceState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);

			return website.experiences.filter((experience) => experience.type === typeId);
		},
});

export const galleriesState = selector({
	key: 'galleriesState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.galleries;
	},
});

export const filteredGalleriesState = selectorFamily({
	key: 'filteredGalleriesState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);

			return website.galleries.filter((gallery) => gallery.type === typeId);
		},
});

export const generalState = selector({
	key: 'generalState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.generals[0];
	},
});

export const projectsState = selector({
	key: 'projectsState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.projects;
	},
});

export const filteredProjectsState = selectorFamily({
	key: 'filteredProjectsState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);

			return website.projects.filter((project) => project.type === typeId);
		},
});

export const skillsState = selector({
	key: 'skillsState',
	get: ({ get }) => {
		const website = get(websiteState);

		return website.skills;
	},
});

export const filteredSkillsState = selectorFamily({
	key: 'filteredSkillsState',
	get:
		(typeId: TypeId) =>
		({ get }) => {
			const website = get(websiteState);

			return website.skills.filter((skill) => skill.type === typeId)[0];
		},
});
