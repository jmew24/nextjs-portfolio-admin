import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { filteredExperienceState, filteredGalleriesState } from '../../common/recoil/states';

const ExperiencePage: React.FC = () => {
	const productionExperienceState = useRecoilValue(filteredExperienceState(0));
	const codingExperienceState = useRecoilValue(filteredExperienceState(1));
	const productionGalleryState = useRecoilValue(filteredGalleriesState(0));
	const codingGalleryState = useRecoilValue(filteredGalleriesState(1));

	if (!productionExperienceState && !codingExperienceState && !productionGalleryState && !codingGalleryState) {
		return (
			<section className='education' id='education'>
				Loading ...
			</section>
		);
	}

	const productionExperience = useMemo(
		() =>
			productionExperienceState.map((experience, index) => {
				const galleryLink =
					productionGalleryState.find((o) => o.id === experience.id)?.images.length > 0 ? (
						<span key={`experience-goto-${experience.id}-${index}`}>
							<br />
							<a
								rel='noreferrer'
								className='smoothscroll'
								href={`#gallery-production-${experience.id}`}
								title={experience.title}
							>
								{' '}
								[Goto {experience.displayTitle} Photos]
							</a>
						</span>
					) : null;

				return (
					<div
						key={`experience-${experience.id}-${index}`}
						id={`experience-${experience.id}`}
						className='experience-item'
					>
						<h3 className='experience-title' dangerouslySetInnerHTML={{ __html: experience.title }}></h3>
						<p className='info'>
							<span dangerouslySetInnerHTML={{ __html: experience.subtitle }}></span>
							<span>&bull;</span> <em className='date'>{experience.when}</em>
							{galleryLink}
						</p>

						<span className='item-wrap'>
							{experience?.roles.map((role, i) => {
								return (
									<div
										className='role'
										key={`experience-${experience.id}-role-${role.title.toLowerCase().replace(' ', '_')}-${i}`}
									>
										<span className='role-title'>{role.title}:</span>{' '}
										<span className='role-description' dangerouslySetInnerHTML={{ __html: role.description }}></span>
									</div>
								);
							})}
						</span>
					</div>
				);
			}),
		[productionExperienceState, productionGalleryState],
	);

	const codingExperience = useMemo(
		() =>
			codingExperienceState.map((experience) => {
				const galleryLink =
					codingGalleryState.find((o) => o.id === experience.id)?.images.length > 0 ? (
						<span key={`experience-goto-${experience.id}`}>
							<br />
							<a
								rel='noreferrer'
								className='smoothscroll'
								href={`#gallery-coding-${experience.id}`}
								title={experience.title}
							>
								{' '}
								[Goto {experience.displayTitle} Photos]
							</a>
						</span>
					) : null;

				return (
					<div key={`experience-${experience.id}`} id={`experience-${experience.id}`} className='experience-item'>
						<h3 className='experience-title' dangerouslySetInnerHTML={{ __html: experience.title }}></h3>
						<p className='info'>
							<span dangerouslySetInnerHTML={{ __html: experience.subtitle }}></span>
							<span>&bull;</span> <em className='date'>{experience.when}</em>
							{galleryLink}
						</p>

						<span className='item-wrap'>
							{experience?.roles.map((role) => {
								return (
									<div
										className='role'
										key={`experience-${experience.id}-role-${role.title.toLowerCase().replace(' ', '_')}`}
									>
										<span className='role-title'>{role.title}:</span>{' '}
										<span className='role-description' dangerouslySetInnerHTML={{ __html: role.description }}></span>
									</div>
								);
							})}
						</span>
					</div>
				);
			}),
		[codingExperienceState, codingGalleryState],
	);

	return (
		<section className='experience' id='experience'>
			<div className='row work'>
				<div className='four columns header-col'>
					<h1>
						<span>Production Experience</span>
					</h1>
				</div>

				<div className='eight columns main-col'>
					<div className='row item'>
						<br />
						<br />
						<div className='twelve columns'>{productionExperience}</div>
					</div>
				</div>

				<div className='four columns header-col'>
					<h1>
						<span>Programming Experience</span>
					</h1>
				</div>

				<div className='eight columns main-col'>
					<div className='row item'>
						<br />
						<br />
						<div className='twelve columns'>{codingExperience}</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ExperiencePage;
