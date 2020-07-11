import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Link from "../components/Link"
import { Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"

export default function Home({ data }) {
  return <Layout title={"WadaDB: 情報開示データベース"}>
    <Box my={2}>
      <Typography variant="h5" component="h1">
        WadaDB: 情報開示データベース
      </Typography>
      <p>
        WadaDBは、行政文書の情報開示請求により得られた知見を蓄積するデータベースを目指す有志のプロジェクトです。
      </p>
      <Typography variant="h6" component="h2">
        最新の開示
      </Typography>
      <ul>
        {data.latest.nodes.map(item => (
          <li><Link to={`/disclosure/${item.id}`}>{item.disclosure_description}</Link></li>
        ))}
      </ul>
      <Typography variant="h6" component="h2">
        被開示請求者一覧
      </Typography>
      <ul>
        {data.targets.distinct.map((target, i) => (
          <li><Link to={`/target/${encodeURIComponent(target)}`}>{target}</Link> ({data.targets.group[i].totalCount})
          </li>
        ))}
      </ul>
      <Typography variant="h6" component="h2">
        開示請求者一覧
      </Typography>
      <ul>
        {data.actors.group.map((actor, i) => (
          <li><Link
            to={`/actor/${encodeURIComponent(actor.nodes[0].disclosure_actor)}`}>{actor.nodes[0].disclosure_actor}</Link> ({actor.totalCount})
          </li>
        ))}
      </ul>
    </Box>
  </Layout>
};

export const query = graphql`
query MyQuery {
  latest: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}, limit:5, sort: {fields: id, order: DESC}) {
    nodes {
      id
      disclosure_description
    }
  }
  targets: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}) {
    distinct(field: disclosure_target)
    group(field: id) {
      totalCount
    }
  }
  actors: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}) {
    group(field: disclosure_actor, limit: 1) {
      totalCount
      nodes {
        disclosure_actor
      }
    }
  }
}
`
