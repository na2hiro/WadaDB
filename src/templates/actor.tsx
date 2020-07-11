import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import Link from "../components/Link"
import { createStyles, Theme, Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Helmet } from "react-helmet"
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9)
    }
  }))

export default function Actor({ data }) {
  const classes = useStyles()
  console.log(data)
  const actor = data.actor.nodes[0]
  const disclosures = data.disclosures.nodes
  return <Layout title={`WadaDB: ${actor.name}による開示`} description={`${actor.name}による開示`}>
    <Box my={2}>
      <Paper>
        <Box my={2} p={2}>
          <Typography variant="h5" component="h1">
            <Grid container spacing={2}>
              <Grid item>
                {actor.avatar_url && <Avatar src={actor.avatar_url} className={classes.large}/>}
              </Grid>
              <Grid item xs zeroMinWidth container alignItems={"center"}>
                {actor.name}
              </Grid>
            </Grid>
          </Typography>

          <p>{actor.message}</p>
          {actor.twitter_id && <Box>
            <Link to={`https://twitter.com/${actor.twitter_id}?ref_src=twsrc%5Etfw`}
                  className="twitter-follow-button" data-size="large"
                  data-show-count="false">
              Follow @{actor.twitter_id}
              <Helmet>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"/>
              </Helmet>
            </Link></Box>}
          {actor.note_id && <Box><Link to={`https://note.com/${actor.note_id}`}>note.com/{actor.note_id}</Link></Box>}
        </Box>
      </Paper>
      <Box my={2}>
        <Typography variant="h6" component="h2">
          {actor.name}による開示
        </Typography>
        <ul>
          {disclosures.map(disclosure => (
            <li>{disclosure.explanation} (開示請求: <Link
              to={`/disclosures/${disclosure.id}`}>{disclosure.disclosure_description}</Link>)</li>
          ))}
        </ul>
      </Box>
    </Box>
  </Layout>
}
export const query = graphql`
query($actorName: String!) {
  actor: allWadaDbActorTsv(filter: {name: {eq: $actorName}}) {
    nodes {
      name
      avatar_url
      message
      note_id
      twitter_id
    }
  }
  disclosures: allWadaDbDisclosureTsv(filter: {disclosure_actor: {eq: $actorName}}) {
    nodes {
      explanation
      id
      disclosure_description
    }
  }
}
`
