import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { filteredProjectsState } from '../../common/recoil/states';

const ProjectsPage: React.FC = () => {
	const productionProjectsState = useRecoilValue(filteredProjectsState(0));
	const codingProjectsState = useRecoilValue(filteredProjectsState(1));

	if (!productionProjectsState && !codingProjectsState) {
		return <div>Loading ...</div>;
	}

	const productionProjects = useMemo(
		() =>
			productionProjectsState.map((project, index) => {
				const projectImage = `images/portfolio/production/${project.image}`;
				return (
					<div
						key={`projects-production-${project.id}-${index}`}
						id={`projects-production-${project.id}`}
						className='columns projects-item'
					>
						<a rel='noopener noreferrer' href={project.url} title={project.title} target='_blank'>
							<div className='item-wrap'>
								<img alt={project.title} src={projectImage} />
								<div className='overlay'>
									<div className='projects-item-meta'>
										<h5>{project.title}</h5>
										<p>{project.description}</p>
									</div>
								</div>
								<div className='link-icon'>
									<i className='fa fa-link'></i>
								</div>
							</div>
						</a>
					</div>
				);
			}),
		[productionProjectsState],
	);

	const codingProjects = useMemo(
		() =>
			codingProjectsState.map((project, index) => {
				const projectImage = `images/portfolio/coding/${project.image}`;
				return (
					<div
						key={`projects-coding-${project.id}-${index}`}
						id={`projects-coding-${project.id}`}
						className='columns projects-item'
					>
						<a rel='noopener noreferrer' href={project.url} title={project.title} target='_blank'>
							<div className='item-wrap'>
								<img alt={project.title} src={projectImage} />
								<div className='overlay'>
									<div className='projects-item-meta'>
										<h5>{project.title}</h5>
										<p>{project.description}</p>
									</div>
								</div>
								<div className='link-icon'>
									<i className='fa fa-link'></i>
								</div>
							</div>
						</a>
					</div>
				);
			}),
		[codingProjectsState],
	);

	return productionProjects.length > 0 || codingProjects.length > 0 ? (
		<div className='row'>
			<div className='twelve columns collapsed'>
				<h1>Check Out Some of My Projects</h1>

				<div className='projects-wrapper bgrid-quarters s-bgrid-thirds cf'>{productionProjects}</div>

				<div className='projects-wrapper bgrid-quarters s-bgrid-thirds cf'>{codingProjects}</div>
			</div>
		</div>
	) : null;
};

export default ProjectsPage;
