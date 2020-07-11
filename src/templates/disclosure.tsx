import React from "react";
import { graphql} from "gatsby"
import Layout from "../components/Layout"
import { Typography } from "@material-ui/core"
import Link from "../components/Link"
import Box from "@material-ui/core/Box"
import { stringifyDate } from "../utils"

export default function Disclosure({data}) {
  const disclosure = data.allWadaDbDisclosureTsv.nodes[0];

  let result = null;
  switch(disclosure.result) {
    case "不開示":
      let explanation = null;
      if(disclosure.result_article_url || disclosure.explanation) {
        explanation = <>
          <Typography variant="h6" component="h2">
            解説
          </Typography>
          <Typography variant="body1">
          {disclosure.explanation && <p>{disclosure.explanation}</p>}
          {disclosure.result_article_url && <p><a href={disclosure.result_article_url} target="_blank" rel="noreferrer noopener">元記事</a></p>}
          </Typography>
          </>
      }
      result = <>
        <Typography variant="body1">
        {disclosure.result === "不開示" ? <p>{disclosure.reason_of_no_disclosure}</p> : ""}
        {disclosure.result_img_url && <p><img src={disclosure.result_img_url} style={{width: "100%", maxWidth: "800px"}} /></p>}
        </Typography>
        {explanation}
      </>;
  }
  return <Layout title={`WadaDB 開示請求: ${disclosure.disclosure_description}`}
                 description={`開示請求: ${disclosure.disclosure_description}`}>
    <Box my={2}>
    <Typography variant="h5" component="h1">
      開示請求: {disclosure.disclosure_description}
    </Typography>
    <Typography variant="h6" component="h2">
      開示請求詳細
    </Typography>
    <Typography variant="body1">
      <ul>
        <li>開示請求人: <Link to={`/actors/${disclosure.disclosure_actor}`}>{disclosure.disclosure_actor}</Link></li>
        <li>主な請求対象: <Link to={`/targets/${disclosure.disclosure_target}`}>{disclosure.disclosure_target}</Link></li>
        {disclosure.submission_date && <li>開示請求日時: {stringifyDate(disclosure.submission_date)}</li>}
        {disclosure.result_date && <li>開示・不開示日時: {stringifyDate(disclosure.result_date)}</li>}
      </ul>
    </Typography>

    <Typography variant="h6" component="h2">
      結果: {disclosure.result}
    </Typography>
    {result}
    </Box>
  </Layout>
}

export const query = graphql`
  query($slug: String!) {
  allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}, fields: {slug: {eq: $slug}}}) {
    nodes {
      disclosure_actor
      disclosure_description
      disclosure_target
      submission_date
      submission_article_url
      explanation
      id
      result_date
      result
      reason_of_no_disclosure
      result_article_url
      result_img_url
    }
  }
}
`;
