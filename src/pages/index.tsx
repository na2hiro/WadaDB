import React from "react"
import {Link, graphql} from "gatsby";
import Head from "../components/Head"

export default function Home({data}) {
  return <>
    <Head title={"WadaDB: 情報開示データベース"} />
    <h1>WadaDB: 情報開示データベース</h1>
    <h2>最新の開示</h2>
    <ul>
      {data.latest.nodes.map(item => (
        <li><Link to={`/disclosure/${item.id}`}>{item.disclosure_description}</Link></li>
      ))}
    </ul>
    <h2>被開示請求者一覧</h2>
    <ul>
      {data.targets.distinct.map((target, i) => (
        <li><Link to={`/target/${encodeURIComponent(target)}`}>{target}</Link> ({data.targets.group[i].totalCount})</li>
      ))}
    </ul>
    <h2>開示請求者一覧</h2>
    <ul>
      {data.actors.group.map((actor, i) => (
        <li><Link to={`/actor/${encodeURIComponent(actor.nodes[0].disclosure_actor)}`}>{actor.nodes[0].disclosure_actor}</Link> ({actor.totalCount})</li>
      ))}
    </ul>
  </>
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
`;
