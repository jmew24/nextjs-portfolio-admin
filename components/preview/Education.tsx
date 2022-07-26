import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { educationsState } from '../../common/recoil/states';

const EducationPage: React.FC = () => {
	const educationState = useRecoilValue(educationsState);

	if (!educationState) {
		return (
			<section className='education' id='education'>
				Loading ...
			</section>
		);
	}

	const educationData = useMemo(
		() =>
			educationState.map((education, index) => {
				return (
					<div key={`education-${education.id}-${index}`} id={`education-${education.id}`}>
						<h3>{education.title}</h3>
						<p className='info'>
							{education.schoolName} <span>&bull;</span>
							{education.credit !== '' ? (
								<em className='credit'>
									{education.credit} <span>&bull;</span>
								</em>
							) : null}
							<em className='date'>{education.graduated}</em>
						</p>
					</div>
				);
			}),
		[educationState],
	);

	return (
		<section id='education'>
			<div className='row education'>
				<div className='four columns header-col'>
					<h1>
						<span>Education</span>
					</h1>
				</div>

				<div className='eight columns main-col'>
					<div className='row item'>
						<div className='twelve columns'>{educationData}</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EducationPage;
