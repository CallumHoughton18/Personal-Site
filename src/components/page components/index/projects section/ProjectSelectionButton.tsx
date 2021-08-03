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
      className={`py-2 px-3 block 
      focus:outline-none text-lg md:text-2xl
      md:tracking-wide font-semibold filter drop-shadow-md whitespace-nowrap
    ${enabled ? "text-snowStorm-lightest border-snowStorm-lightest border-b-2 md:border-b-4" :
          "border-none text-blueGray-300 hover:text-snowStorm hover:border-snowStorm"}`}
      onClick={() => onClick(projectButtonType)}
    >
      {children}
    </button>
  );
};

export default ProjectSelectionButton;
