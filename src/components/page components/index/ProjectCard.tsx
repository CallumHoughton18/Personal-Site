import Card from "@/components/layout/Card";
import React, { ReactNode } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import IconWithLink from "@/components/layout/IconWithLink";
import { IconWithLinks } from "@/components/types";
import PillsCollection from "@/components/layout/PillCollection";

type ProjectCardProps = {
  children?: ReactNode;
  projectName: string;
  projectLinks: IconWithLinks[];
  projectDesc: string;
  projectTech: string[];
  ProjectImg: IGatsbyImageData;
};

const ProjectCard = ({
  projectName,
  projectLinks,
  projectDesc,
  ProjectImg,
  projectTech,
}: ProjectCardProps): JSX.Element => {
  const projectIcons = projectLinks.map((val, indx) => {
    return (
      <IconWithLink
        icon={val.icon}
        link={val.link}
        className={`${val.className} hover:text-snowStorm-darkest active:text-snowStorm-darkest mr-3`}
        key={indx}
      />
    );
  });
  return (
    <Card className="max-w-xl overflow-hidden shadow-inner border-none sm:flex-50 xl:flex-25 sm:h-card mt-8 sm:m-8 bg-polarNight-lighter">
      <GatsbyImage
        image={ProjectImg}
        alt={`${projectName}-image`}
        className="w-overflow sm:h-56"
      ></GatsbyImage>
      <div className="flex flex-row justify-start text-gray-400 self-start px-6 mt-4 text-xl">
        {projectIcons}
      </div>
      <div className="px-6 pb-4 pt-2">
        <div className="text-snowStorm-lightest font-bold text-xl">
          {projectName}
        </div>
        <hr className="mb-5 border border-snowStorm-darkest"></hr>
        <p className=" text-snowStorm text-sm leading-relaxed tracking-normal">
          {projectDesc}
        </p>
      </div>
      <PillsCollection
        pillsText={projectTech}
        pillStyle="bg-gray-200 mr-0.5 ml-0.5 mt-1 text-gray-700 tracking-wide"
      />
    </Card>
  );
};

export default ProjectCard;
