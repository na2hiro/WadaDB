const {graphql} = require("gatsby");
const path = require(`path`)
const {createFilePath} = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if(node.disclosure_description==="") return;
  if(node.internal.type==="WadaDbDisclosureTsv") {
    const slug = `/disclosure/${node.id}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  } else {
    // console.log(node.internal.type);
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}}) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allWadaDbDisclosureTsv.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/disclosure.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
