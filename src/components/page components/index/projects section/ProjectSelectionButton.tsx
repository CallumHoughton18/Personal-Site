import { ProjectSelectionType } from "@/utils/enums";
import React from "react";
import { ReactNode } from "react";

type ProjectSelectionButtonProps = {
  children?: ReactNode;
  enabled: boolean;
  projectButtonType: ProjectSelectionType;
  onClick: (projectTypeSelected: ProjectSelectionType) => void;
};
const ProjectSelectionButton = ({
  enabled,
  children,
  projectButtonType,
  onClick,
}: ProjectSelectionButtonProps): JSX.Element => {
  return (
    <button
      className={`text-snowStorm-lightest py-2 px-3 block 
    hover:text-blueGray-300 hover:border-blueGray-300 
    focus:outline-none text-lg md:text-2xl border-snowStorm-darkest 
    md:tracking-wider font-semibold filter drop-shadow-md whitespace-nowrap
    ${enabled ? "border-b-2 md:border-b-4" : "border-none"}`}
      onClick={() => onClick(projectButtonType)}
    >
      {children}
    </button>
  );
};

export default ProjectSelectionButton;
