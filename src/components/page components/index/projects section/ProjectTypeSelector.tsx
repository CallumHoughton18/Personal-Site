import PersonalProjectsInfo from "@/static_data/PersonalProjectsInfo";
import WorkProjectsInfo from "@/static_data/WorkProjectsInfo";
import { ProjectSelectionType } from "@/utils/enums";
import React from "react";
import Projects from "../Projects";
import ProjectSelectionButton from "./ProjectSelectionButton";

type ProjectTypeSelectorProps = {
  projectSelectionType: ProjectSelectionType;
  onProjectSelectorButtonClicked: (
    projectTypeSelected: ProjectSelectionType,
  ) => void;
};
const ProjectTypeSelector = ({
  projectSelectionType,
  onProjectSelectorButtonClicked,
}: ProjectTypeSelectorProps): JSX.Element => {
  const projectInfo =
    projectSelectionType === ProjectSelectionType.Personal
      ? PersonalProjectsInfo()
      : WorkProjectsInfo();

  return (
    <React.Fragment>
      <div className="flex items-center justify-center mb-8 space-x-5">
        <ProjectSelectionButton
          enabled={projectSelectionType === ProjectSelectionType.Personal}
          projectButtonType={ProjectSelectionType.Personal}
          onClick={onProjectSelectorButtonClicked}
        >
          Personal Projects
        </ProjectSelectionButton>

        <ProjectSelectionButton
          enabled={projectSelectionType === ProjectSelectionType.Work}
          projectButtonType={ProjectSelectionType.Work}
          onClick={onProjectSelectorButtonClicked}
        >
          Work Projects
        </ProjectSelectionButton>
      </div>
      <div className="flex flex-wrap items-start justify-center xl:ml-20 xl:mr-20">
        <Projects projectsInfo={projectInfo} />
      </div>
    </React.Fragment>
  );
};

export default ProjectTypeSelector;
