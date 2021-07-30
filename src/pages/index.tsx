import React from "react";
import IntroCard from "@/components/page components/index/IntroCard";
import Section from "@/components/layout/Section";
import Skills from "@/components/page components/index/Skills";
import Header from "@/components/Header";
import PageWithNavBar from "@/components/layout/PageWithHeader";
import { useState } from "react";
import { ProjectSelectionType } from "@/utils/enums";
import ProjectTypeSelector from "@/components/page components/index/projects section/ProjectTypeSelector";

const Home = (): JSX.Element => {
  const [projectTypeSelected, setProjectTypeSelected] = useState(
    ProjectSelectionType.Personal,
  );
  return (
    <PageWithNavBar header={<Header />}>
      <div className="flex items-center justify-center mt-10 mb-36">
        <IntroCard />
      </div>
      <Section className="bg-polarNight-lighter p-20 bg-opacity-80">
        <div className="text-snowStorm">
          <h2 className="text-center text-4xl font-bold tracking-wide text-snowStorm-lightest text-shadow-md">
            Experience With:
          </h2>
          <Skills />
        </div>
      </Section>
      <Section className="pt-20 pb-20 pr-5 pl-5 md:p-20">
        <ProjectTypeSelector
          projectSelectionType={projectTypeSelected}
          onProjectSelectorButtonClicked={setProjectTypeSelected}
        ></ProjectTypeSelector>
      </Section>
    </PageWithNavBar>
  );
};

export default Home;
