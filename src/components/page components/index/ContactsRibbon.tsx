import React from "react";
import { FaGithubSquare } from "@react-icons/all-files/fa/FaGithubSquare";
import { FaTwitterSquare } from "@react-icons/all-files/fa/FaTwitterSquare";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { ImProfile } from "@react-icons/all-files/im/ImProfile";
import IconWithLink from "@/components/layout/IconWithLink";

const ContactsRibbon = (): JSX.Element => {
  //TODO: Add type to pass objects to ribbon with icon and href instead of hardcoding
  const iconStyle = "mb-2 hover:text-blueGray-300 focus:text-blueGray-300";
  return (
    <div className="flex flex-col min-h-full">
      <IconWithLink
        link="https://github.com/callumhoughton18"
        icon={<FaGithubSquare className={iconStyle} />}
      />
      <IconWithLink
        icon={<FaTwitterSquare className={iconStyle} />}
        link="https://twitter.com/CallummmmmmH"
      />
      <IconWithLink
        icon={<FaLinkedin className={iconStyle} />}
        link="https://uk.linkedin.com/in/callum-houghton-346365114"
      />
      <IconWithLink
        icon={<ImProfile className={iconStyle} />}
        link="https://callumhoughton18.github.io/super-simple-cv/"
      />
    </div>
  );
};

export default ContactsRibbon;
