const {graphql} = require("gatsby");
const path = require(`path`)
const {createFilePath} = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  let slug;
  switch(node.internal.type) {
    case "WadaDbDisclosureTsv":
      if(node.disclosure_description==="") return;
      slug = `/disclosure/${node.id}`
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
      break;
    case "WadaDbTargetTsv":
      slug = `/target/${node.name}`
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
      break;
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
      allWadaDbTargetTsv {
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
      component: path.resolve(`./src/templates/disclosure.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  result.data.allWadaDbTargetTsv.edges.forEach(({ node }) => {
    const pathFragments = node.fields.slug.split("/");
    const targetName = pathFragments[pathFragments.length-1];
    console.log(targetName)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/target.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        targetName,
      },
    })
  })
}
