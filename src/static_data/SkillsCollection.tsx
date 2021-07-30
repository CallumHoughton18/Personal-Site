import React from "react";
import { ListElement } from "@/components/layout/List";
import { SiAzuredevops } from "@react-icons/all-files/si/SiAzuredevops";
import { SiCsharp } from "@react-icons/all-files/si/SiCsharp";
import { SiDotNet } from "@react-icons/all-files/si/SiDotNet";
import { SiHockeyapp } from "@react-icons/all-files/si/SiHockeyapp";
import { SiJenkins } from "@react-icons/all-files/si/SiJenkins";
import { SiPython } from "@react-icons/all-files/si/SiPython";
import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiKotlin } from "@react-icons/all-files/si/SiKotlin";
import { SiTypescript } from "@react-icons/all-files/si/SiTypescript";
import { SiXamarin } from "@react-icons/all-files/si/SiXamarin";
import { SiAndroid } from "@react-icons/all-files/si/SiAndroid";
import { SiDocker } from "@react-icons/all-files/si/SiDocker";

type SkillsList = {
  languages: ListElement[];
  frameworks: ListElement[];
  cdAndCI: ListElement[];
};

const SkillsCollection = (): SkillsList => {
  const iconStyle = "inline text-aurora-green text-2xl";
  const languages: ListElement[] = [
    {
      id: "csharp",
      content: (
        <span>
          C# <SiCsharp className={iconStyle} />
        </span>
      ),
    },
    {
      id: "kotlin",
      content: (
        <span>
          Kotlin <SiKotlin className={iconStyle} />
        </span>
      ),
    },
    {
      id: "typescript",
      content: (
        <span>
          TypeScript <SiTypescript className={iconStyle} />
        </span>
      ),
    },
    {
      id: "python",
      content: (
        <span>
          Python <SiPython className={iconStyle} />
        </span>
      ),
    },
  ];

  const frameworks: ListElement[] = [
    {
      id: "xam",
      content: (
        <span>
          Xamarin.Forms <SiXamarin className={iconStyle} />
        </span>
      ),
    },
    {
      id: "react",
      content: (
        <span>
          ReactJS <SiReact className={iconStyle} />
        </span>
      ),
    },
    {
      id: "net",
      content: (
        <span>
          .Net Platform <SiDotNet className={iconStyle} />
        </span>
      ),
    },
    {
      id: "android",
      content: (
        <span>
          Android <SiAndroid className={iconStyle} />
        </span>
      ),
    },
  ];

  const cdAndCI: ListElement[] = [
    {
      id: "jenkins",
      content: (
        <span>
          Jenkins <SiJenkins className={iconStyle} />
        </span>
      ),
    },
    {
      id: "appcenter",
      content: (
        <span>
          App Center <SiHockeyapp className={iconStyle} />
        </span>
      ),
    },
    {
      id: "azure",
      content: (
        <span>
          Azure DevOps <SiAzuredevops className={iconStyle} />
        </span>
      ),
    },
    {
      id: "docker",
      content: (
        <span>
          Docker <SiDocker className={iconStyle} />
        </span>
      ),
    },
  ];

  return {
    languages: languages,
    frameworks: frameworks,
    cdAndCI: cdAndCI,
  };
};

export default SkillsCollection;
