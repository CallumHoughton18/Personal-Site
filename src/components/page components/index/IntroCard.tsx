import Card from "@/components/layout/Card";
import React from "react";
import CircleAvatar from "./CircleAvatar";
import ContactsRibbon from "./ContactsRibbon";

const IntroCard = (): JSX.Element => {
  return (
    <div className="relative">
      <Card
        className="lg:max-w-6xl backdrop-blur bg-opacity-80 border-gray-700 bg-polarNight-lighter"
        innerChildrenStyle="p-10"
      >
        <CircleAvatar />
        <span className="text-center text-gray-400 text-xl xl:text-2xl sm:mb-2 sm:mt-5 md:mb-5 md:mt-10 tracking-wide">
          Callum Houghton
        </span>
        <h1 className="text-center text-snowStorm text-xl md:text-7xl font-extrabold tracking-wide">
          Web / Mobile Developer
        </h1>
      </Card>
      <div className="absolute md:mr-8 top-16 right-6 text-2xl sm:text-3xl md:text-4xl text-snowStorm">
        <ContactsRibbon />
      </div>
    </div>
  );
};

export default IntroCard;
