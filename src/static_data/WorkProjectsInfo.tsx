import { IconWithLinks } from "@/components/types";
import React from "react";
import { FaAppStoreIos } from "@react-icons/all-files/fa/FaAppStoreIos";
import { FaWindows } from "@react-icons/all-files/fa/FaWindows";
import { FaGooglePlay } from "@react-icons/all-files/fa/FaGooglePlay";

type ProjectInfo = {
  title: string;
  desc: string;
  tech: string[];
  links: IconWithLinks[];
  imageName: string;
};

const WorkProjectsInfo = (): ProjectInfo[] => {
  const commonStyle = "hover:text-snowStormactive:text-snowStorm";
  return [
    {
      title: "K-AR",
      desc: "An Android app designed to visualize and record GIS location-anchored data in augmented reality. Integrates with K-Mobile X for receiving and sending data.",
      links: [],
      tech: ["Kotlin", "Android", "ARCore", "Filament"],
      imageName: "placeholder.png",
    },
    {
      title: "K-Mobile X",
      desc: "A Cross-Platform GIS focused data capture and visualizer application. Designed to be highly flexible and to fit different workflows for a range of customers. Integrates with a range of Trimble and non-trimble GIS equipment for high accuracy GPS.",
      links: [
        {
          icon: <FaGooglePlay className="mr-5" />,
          link: "https://play.google.com/store/apps/details?id=com.KMatic.K_Mobile",
          className: commonStyle,
        },
        {
          icon: <FaAppStoreIos className="mr-5" />,
          link: "https://apps.apple.com/gb/app/k-mobile/id1464170715#?platform=iphone",
          className: commonStyle,
        },
        {
          icon: <FaWindows />,
          link: "https://www.microsoft.com/en-az/p/k-mobile-x/9p4fnxbn652w?cid=msft_web_chart#activetab=pivot:overviewtab",
        },
      ],
      tech: ["C#", "Xamarin Forms", ".NET", "GIS"],
      imageName: "placeholder.png",
    },
    {
      title: "Taurus",
      desc: "A streamlined fork of K-Mobile X, designed for recording Cattle TB test results. Designed with insight from vetinarians in the Department of Agriculture in Northern Ireland.",
      links: [
        {
          icon: <FaGooglePlay className="mr-5" />,
          link: "https://play.google.com/store/apps/details?id=com.KMatic.Taurus",
          className: commonStyle,
        },
        {
          icon: <FaAppStoreIos className="mr-5" />,
          link: "https://apps.apple.com/gb/app/taurus/id1574349199#?platform=iphone",
          className: commonStyle,
        },
      ],
      tech: ["C#", "Xamarin Forms", ".NET", "GIS"],
      imageName: "placeholder.png",
    },
  ];
};

export default WorkProjectsInfo;
