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
      <p>
        <Link to={"/about"}>このプロジェクトについて</Link>
      </p>

      <Typography variant="h6" component="h2">
        最新の開示
      </Typography>
      <ul>
        {data.latest.nodes.map(item => (
          <li><Link to={`/disclosures/${item.id}`}>{item.disclosure_description}</Link></li>
        ))}
      </ul>
      <p>
        <Link to={"/disclosures/"}>すべての開示</Link> ({data.all.totalCount})
      </p>
      <Typography variant="h6" component="h2">
        被開示請求者一覧
      </Typography>
      <ul>
        {/* TODO sort in GraphQL */}
        {data.targets.group.sort((t1,t2)=>t2.totalCount-t1.totalCount).map((target, i) => (
          <li><Link to={`/targets/${encodeURIComponent(target.nodes[0].disclosure_target)}`}>{target.nodes[0].disclosure_target}</Link> ({target.totalCount})
          </li>
        ))}
      </ul>
      <Typography variant="h6" component="h2">
        開示請求者一覧
      </Typography>
      <ul>
        {data.actors.group.sort((a1,a2)=>a2.totalCount-a1.totalCount).map((actor, i) => (
          <li><Link
            to={`/actors/${encodeURIComponent(actor.nodes[0].disclosure_actor)}`}>{actor.nodes[0].disclosure_actor}</Link> ({actor.totalCount})
          </li>
        ))}
      </ul>
    </Box>
  </Layout>
};

export const query = graphql`
query MyQuery {
  latest: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}, sort: {fields: last_modified_date, order: DESC}, limit: 10) {
    nodes {
      id
      disclosure_description
    }
  }
  all: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}) {
    totalCount
  }
  targets: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}) {
    group(field: disclosure_target, limit: 1) {
      totalCount
      nodes {
        disclosure_target
      }
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
