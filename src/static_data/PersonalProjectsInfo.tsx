import React from "react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaMobile } from "@react-icons/all-files/fa/FaMobile";
import { FaDocker } from "@react-icons/all-files/fa/FaDocker";
import { ProjectInfo } from "./types";

const PersonalProjectsInfo = (): ProjectInfo[] => {
  const commonStyle = "hover:text-snowStormactive:text-snowStorm";
  return [
    {
      title: "NotifyMe",
      desc: "A blazor server app that is focused on providing a self-hostable open source solution that allows users to save and schedule notifications that can be sent to any device which supports web push notifications. The demo is hosted on my VPS.",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/Notify-Me",
          className: commonStyle,
        },
        {
          icon: <FaDocker className="mr-5" />,
          link: "https://hub.docker.com/r/callumhoughton22/notifymeserver",
          className: commonStyle,
        },
        {
          icon: <FaExternalLinkAlt />,
          link: "https://notifymeapp.callums-stuff.net/",
        },
      ],
      tech: ["C#", "Blazor", "Quartz.NET", "Docker", "Azure Pipelines"],
      imageName: "notifymeapp.png",
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
      imageName: "chemviewar.png",
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
      imageName: "mushroomapp.png",
    },
    {
      title: "XLSX Data Extractor",
      desc: "A WPF application built to demonstrate the data extraction capabilities of the XLSX Data Extractor library, which is built on top of OpenXML. The application allows mass data extraction from a collection of XLSX reports.",
      links: [
        {
          icon: <FaGithub className="mr-5" />,
          link: "https://github.com/CallumHoughton18/XLSXBulkDataExtractor",
          className: commonStyle,
        },
      ],
      tech: ["C#", "WPF", "ClosedXML", "Azure Pipelines"],
      imageName: "xlsxapp.png",
    },
    {
      title: "Pi Rover Bot",
      desc: "A Raspberry Pi Rover Bot that allows a mobile app (built using Xamarin.Forms) to communicate with a web API, built using Python and Django, to control the Pi's GPIO pins.",
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
      imageName: "roverapp.png",
    },
    {
      title: "Local Crimes Map",
      desc: "A Python Django project that displays crime data from the data.police.uk RESTful API on a map, and as a report style breakdown. The crime data from the report style breakdown is then saved in a PostGIS database.",
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
      tech: ["Python", "Django", "JavaScript", "Postgres", "Heroku"],
      imageName: "crimemap.png",
    },
  ];
};

export default PersonalProjectsInfo;
