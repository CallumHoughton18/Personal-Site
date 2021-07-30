import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const CircleAvatar = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "me.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 150, height: 150)
        }
      }
    }
  `);
  return (
    <GatsbyImage
      className="transform scale-75 rounded-full ring-4 ring-white shadow-m sm:scale-100"
      alt="Avatar Image"
      image={data.file.childImageSharp.gatsbyImageData}
    />
  );
};

export default CircleAvatar;
