import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Box from "@material-ui/core/Box"
import { Typography } from "@material-ui/core"
import Link from "../components/Link"
import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"

export default function Disclosures({ data }) {
  const [text, setText] = useState("")
  return <Layout title={"WadaDB: 情報開示一覧"}>
    <Box my={2}>
      <Typography variant="h5" component="h1">
        WadaDB: 情報開示一覧 ({data.all.totalCount})
      </Typography>

      <TextField label="検索" value={text} onChange={(e) => setText(e.target.value)}/>
      <ul>
        {data.all.nodes.filter(item => item.disclosure_description.indexOf(text) >= 0).map(item => (
          <li><Link to={`/disclosures/${item.id}`}>{decorate(item.disclosure_description, text)}</Link></li>
        ))}
      </ul>
    </Box>
  </Layout>
};

function decorate(text: string, keyword: string) {
  console.log(text, keyword)
  if (keyword == "") return text
  const ret = []
  const textsOtherThanKeyword = text.split(keyword).forEach(fragment => {
    ret.push(fragment)
    ret.push(<b style={{ backgroundColor: "yellow" }}>{keyword}</b>)
  })
  ret.pop()
  return ret
}

export const query = graphql`
query IndexQuery {
  all: allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}, sort: {fields: last_modified_date, order: DESC}) {
    nodes {
      id
      disclosure_description
    }
    totalCount
  }
}
`
