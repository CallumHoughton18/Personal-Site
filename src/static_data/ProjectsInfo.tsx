import { IconWithLinks } from "@/components/types";
import React from "react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaMobile } from "@react-icons/all-files/fa/FaMobile";

type ProjectInfo = {
  title: string;
  desc: string;
  tech: string[];
  links: IconWithLinks[];
};

const ProjectInfo = (): ProjectInfo[] => {
  const commonStyle = "hover:text-snowStormactive:text-snowStorm";
  return [
    {
      title: "XLSX Data Extractor",
      desc: "A WPF application built to demonstrate the data extraction capabilities of the XLSX Data Extractor library, which is built on top of OpenXML. The application allows mass data extraction from a collection of XLSX reports",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/XLSXBulkDataExtractor",
          className: commonStyle,
        },
      ],
      tech: ["C#", "WPF", "ClosedXML", "Azure Pipelines"],
    },
    {
      title: "Mushroom Classifier",
      desc: "A web app using a Python Flask backend and a TypeScript ReactJS frontend to expose a machine learning model to classify whether a given mushroom is edible or not. Deployed to a VPS using Docker and Jenkins.",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/Mushroom-Classification-Front-End",
          className: commonStyle,
        },
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/Mushroom-Classification",
          className: commonStyle,
        },
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/Mushroom-Classification-Deployment",
          className: commonStyle,
        },
        {
          icon: <FaExternalLinkAlt />,
          link: "https://mushrooml.callums-stuff.net/",
          className: commonStyle,
        },
      ],
      tech: ["Python", "Flask", "ReactJS", "TypeScript", "Docker", "Jenkins"],
    },
    {
      title: "Pi Rover Bot",
      desc: "A Raspberry Pi Rover Bot that allows a mobile app (built using Xamarin.Forms) to communicate with a web API, built using Python and Django, to control the Pi's GPIO pins",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/PiRoverController",
          className: commonStyle,
        },
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/PiRoverWebServer",
          className: commonStyle,
        },
        {
          icon: <FaYoutube />,
          link: "https://www.youtube.com/watch?v=dnlcQPna3ew",
          className: commonStyle,
        },
      ],
      tech: ["Python", "Django", "C#", "Xamarin", "Azure Pipelines"],
    },
    {
      title: "Local Crimes Map",
      desc: "A Python Django project that displays crime data from the data.police.uk RESTful API on a map, and as a report style breakdown. The crime data from the report style breakdown is then saved in a PostGIS",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/Local-Crimes-Map",
          className: commonStyle,
        },
        {
          icon: <FaExternalLinkAlt />,
          link: "https://localcrimesmap.herokuapp.com/",
          className: commonStyle,
        },
      ],
      tech: ["Python", "Django", "JavaScript", "Postgres"],
    },
    {
      title: "ChemViewAR",
      desc: "Allows the viewing of molecular models (sourced from ChemTube3D and the Protein Data Bank) in augmented reality, the models are converted from standard chemical file formats. Built using Unity and ARCore.",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/ChemViewAR",
          className: commonStyle,
        },
        {
          icon: <FaMobile className="mr-5" />,
          link: "https://play.google.com/store/apps/details?id=com.Callum.ChemViewAR",
          className: commonStyle,
        },
        {
          icon: <FaExternalLinkAlt />,
          link: "https://medium.com/@callumhoughton18/creating-ar-ready-models-from-chemical-file-formats-cc8b927e5339",
        },
      ],
      tech: ["C#", "Unity", "Arcore", "Blender"],
    },
  ];
};

export default ProjectInfo;
