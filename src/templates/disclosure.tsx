import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { createStyles, Theme, Typography } from "@material-ui/core"
import Link, { ExternalLink } from "../components/Link"
import Box from "@material-ui/core/Box"
import { stringifyDate } from "../utils"
import DescriptionIcon from "@material-ui/icons/Description"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fileIcon: {
      backgroundColor: theme.palette.grey["50"],
      fontSize: "100px"
    }
  }))

export default function Disclosure({ data }) {
  const classes = useStyles();
  const disclosure = data.allWadaDbDisclosureTsv.nodes[0]

  let result = null
  switch (disclosure.result) {
    case "不開示決定":
    case "開示決定":
    case "開示":
      result = <>
        <Typography variant="body1">
          {disclosure.disclosed_documents_url && <>
            <Typography variant="subtitle1" component="h3">
              開示文書
            </Typography>
            <ExternalLink to={disclosure.disclosed_documents_url}>
              <DescriptionIcon className={classes.fileIcon}/>
            </ExternalLink>
          </>}

          {disclosure.reason_of_no_disclosure && <>
            {
              disclosure.result !== "不開示決定" &&
              <Typography variant="subtitle1" component="h3">
                不開示部分に関して
              </Typography>
            }
            {disclosure.reason_of_no_disclosure}
          </>}

          {disclosure.result_img_urls && <Box my={2}>
            {disclosure.result_img_urls.split(" ").map(url => (
              <img src={url} style={{ width: "100%", maxWidth: "800px" }}/>
            ))}
          </Box>}
        </Typography>
      </>
  }
  let explanation = null
  if (disclosure.result_article_urls || disclosure.explanation) {
    explanation = <>
      <Typography variant="h6" component="h2">
        解説
      </Typography>
      <Typography variant="body1">
        {disclosure.explanation && <Box>{disclosure.explanation}</Box>}
        {disclosure.result_article_urls && <Box>
          {disclosure.result_article_urls.split(" ").map(url => <>
            <a href={url} target="_blank" rel="noreferrer noopener">元記事</a>{" "}
          </>)}
        </Box>}
      </Typography>
    </>
  }

  return <Layout title={`WadaDB 開示請求: ${disclosure.disclosure_description}`}
                 description={`開示請求: ${disclosure.disclosure_description}`} isArticle={true}>
    <Box my={2}>
      <Typography variant="h5" component="h1">
        開示請求: {disclosure.disclosure_description}
      </Typography>
      <Box mb={2}>
        {explanation}
      </Box>
      <Box mb={2}>
      <Typography variant="h6" component="h2">
        開示請求詳細
      </Typography>
      <Typography variant="body1">
        <ul>
          <li>開示請求人: <Link to={`/actors/${disclosure.disclosure_actor}`}>{disclosure.disclosure_actor}</Link></li>
          <li>主な請求対象: <Link to={`/targets/${disclosure.disclosure_target}`}>{disclosure.disclosure_target}</Link></li>
          {disclosure.submission_date && <li>開示請求日時: {stringifyDate(disclosure.submission_date)}</li>}
          {disclosure.result_date && <li>{disclosure.result}決定日時: {stringifyDate(disclosure.result_date)}</li>}
        </ul>
      </Typography>
      </Box>

      {disclosure.result === "" ?
        <Typography variant="h6" component="h2">
          請求中
        </Typography> : <>
          <Typography variant="h6" component="h2">
            結果: {disclosure.result}
          </Typography>
          {result}
        </>
      }
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
      result_article_urls
      result_img_urls
      disclosed_documents_url
    }
  }
}
`
