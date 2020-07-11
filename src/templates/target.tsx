import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import Link from "../components/Link"
import { Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"

export default function Target({ data }) {
  const target = data.target.nodes[0]
  const disclosures = data.disclosures.nodes
  return <Layout title={`WadaDB: ${target.name}に関する開示`} description={`${target.name}に関する開示`}>
    <Box my={2}>
      <Typography variant="h5" component="h1">
        {target.name}
      </Typography>
      {target.img_url && <p><img src={target.img_url} style={{ width: "100%", maxWidth: "300px" }}/></p>}
      <Typography variant="h6" component="h2">
        {target.name}に関する開示
      </Typography>
      <ul>
        {disclosures.map(disclosure => (
          <li>{disclosure.explanation} (開示請求: <Link
            to={`/disclosures/${disclosure.id}`}>{disclosure.disclosure_description}</Link>)</li>
        ))}
      </ul>
    </Box>
  </Layout>
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
`
