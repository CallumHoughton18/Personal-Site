import useProjectImagesQuery from "@/hooks/useProjectImagesQuery";
import useProjectInfoBuilder from "@/hooks/useProjectInfoBuilder";
import React, { Fragment } from "react";
import ProjectCard from "./ProjectCard";

const Projects = (): JSX.Element => {
  const projectImageQueryResult = useProjectImagesQuery();
  const projectsWithInfoAndImage = useProjectInfoBuilder(
    projectImageQueryResult,
  );

  const projectCards = projectsWithInfoAndImage.map((project, indx) => {
    return (
      <ProjectCard
        key={indx}
        projectName={project.info.title}
        projectTech={project.info.tech}
        ProjectImg={project.imageSrc}
        projectDesc={project.info.desc}
        projectLinks={project.info.links}
      ></ProjectCard>
    );
  });
  return <Fragment>{projectCards}</Fragment>;
};

export default Projects;
