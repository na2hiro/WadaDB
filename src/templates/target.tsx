import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import Link from "../components/Link"
import { createStyles, Theme, Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import PersonIcon from '@material-ui/icons/Person';
import makeStyles from "@material-ui/core/styles/makeStyles"
import useTheme from "@material-ui/core/styles/useTheme"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    defaultIcon: {
      backgroundColor: theme.palette.grey["50"],
      fontSize: "200px"
    }
  }))

export default function Target({ data }) {
  const classes = useStyles();
  const target = data.target.nodes[0]
  const disclosures = data.disclosures.nodes
  const theme = useTheme()
  return <Layout title={`WadaDB: ${target.name}に関する開示`} description={`${target.name}に関する開示`}>
    <Box my={2}>
      <Paper>
        <Box my={2} p={2}>
      <Typography variant="h5" component="h1">
        {target.name}
        <Box mt={2}>
          {target.img_url ?
            <img src={target.img_url} style={{ width: "100%", maxWidth: "300px" }}/> :
            <PersonIcon
              className={classes.defaultIcon}
              htmlColor={theme.palette.grey["300"]}/>}
        </Box>

      </Typography>
        </Box>
      </Paper>
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
