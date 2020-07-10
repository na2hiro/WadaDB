import { graphql, Link } from "gatsby"
import React from "react";

export default function Target ({data}) {
  const target = data.target.nodes[0];
  const disclosures = data.disclosures.nodes;
  return <>
    <h1>{target.name}</h1>
    {target.img_url && <p><img src={target.img_url} style={{width: "100%", maxWidth: "300px"}} /></p>}
    <h2>{target.name}に関する開示</h2>
    <ul>
      {disclosures.map(disclosure => (
        <li>{disclosure.explanation} (開示請求: <Link to={`/disclosure/${disclosure.id}`}>{disclosure.disclosure_description}</Link>)</li>
      ))}
    </ul>
  </>;
}
export const query = graphql`
  query($targetName: String!) {
  target: allWadaDbTargetTsv(filter: {name: {eq: $targetName}}) {
    nodes {
      name
      img_url
    }
  }
  disclosures: allWadaDbDisclosureTsv(filter: {disclosure_target: {eq: $targetName}}) {
    nodes {
      explanation
      id
      disclosure_description
    }
  }
}
`;
