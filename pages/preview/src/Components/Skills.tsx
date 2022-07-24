import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { filteredSkillsState } from '../../recoil/atom';

const SkillsPage = () => {
	const productionSkillsState = useRecoilValue(filteredSkillsState(0));
	const codingSkillsState = useRecoilValue(filteredSkillsState(1));

	const productionSkills = useMemo(
		() =>
			productionSkillsState.list.map((skill, index) => {
				return (
					<li key={`skills-production-${skill}-${index}`} id={`skill-production-${skill}`}>
						{skill}
					</li>
				);
			}),
		[productionSkillsState],
	);

	const codingSkills = useMemo(
		() =>
			codingSkillsState.list.map((skill, index) => {
				return (
					<li key={`skills-production-${skill}-${index}`} id={`skill-coding-${skill}`}>
						{skill}
					</li>
				);
			}),
		[codingSkillsState],
	);

	const codingLanguages = useMemo(
		() =>
			codingSkillsState.language.list.map((value: string, index) => {
				return (
					<em key={`coding-language-list-${index}`} id={`languages-production-${index}`}>
						{index > 0 ? <span>&bull;</span> : null} <span dangerouslySetInnerHTML={{ __html: value }}></span>{' '}
					</em>
				);
			}),
		[codingSkillsState],
	);

	return (
		<section id='skills'>
			<div className='row skill'>
				{(productionSkillsState?.title && productionSkillsState.list.length > 0) ?? (
					<>
						<div className='four columns header-col'>
							<h1>
								<span>{productionSkillsState.title}</span>
							</h1>
						</div>

						{productionSkillsState.list.length > 0 && (
							<div className='eight columns main-col'>
								<div className='row skill'>
									<div className='skills'>
										<ul>{productionSkills}</ul>
									</div>
								</div>
							</div>
						)}
					</>
				)}

				{(codingSkillsState?.title && codingSkillsState.list.length) ?? (
					<>
						<div className='four columns header-col'>
							<h1>
								<span>{codingSkillsState.title}</span>
							</h1>
						</div>

						{codingSkillsState.list.length > 0 && (
							<div className='eight columns main-col'>
								<div className='row item'>
									<div className='skills'>
										<ul>{codingSkills}</ul>
									</div>
								</div>
							</div>
						)}

						{(codingSkillsState?.language?.title && codingSkillsState.language.list.length > 0) ?? (
							<>
								<div className='four columns header-col'>
									<h1>
										<span>{codingSkillsState.language.title}</span>
									</h1>
								</div>

								<div className='eight columns main-col'>
									<div className='row item'>
										<p className='skills'>{codingLanguages}</p>
									</div>
								</div>
							</>
						)}
					</>
				)}
			</div>
			<br />
		</section>
	);
};

export default SkillsPage;
