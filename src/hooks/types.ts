import { ProjectInfo } from "@/static_data/types";
import { IGatsbyImageData } from "gatsby-plugin-image";

export type ProjectInfoWithImage = {
  imageSrc: IGatsbyImageData;
  info: ProjectInfo;
};
