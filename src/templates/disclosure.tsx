import React from "react";
import {graphql} from "gatsby";
import Head from "../components/Head"

export default function Disclosure({data}) {
  const disclosure = data.allWadaDbDisclosureTsv.nodes[0];

  let result = null;
  switch(disclosure.result) {
    case "不開示":
      let explanation = null;
      if(disclosure.result_article_url || disclosure.explanation) {
        explanation = <>
          <h2>解説</h2>
          {disclosure.explanation && <p>{disclosure.explanation}</p>}
          {disclosure.result_article_url && <p><a href={disclosure.result_article_url} target="_blank" rel="noreferrer noopener">元記事</a></p>}
          </>
      }
      result = <>
        {disclosure.result === "不開示" ? <p>{disclosure.reason_of_no_disclosure}</p> : ""}
        {disclosure.result_img_url && <p><img src={disclosure.result_img_url} style={{width: "100%", maxWidth: "800px"}} /></p>}
        {explanation}
      </>;
  }
  return <>
    <Head title={`WadaDB 開示請求: ${disclosure.disclosure_description}`} description={`開示請求: ${disclosure.disclosure_description}`} />
    <h1>開示請求: {disclosure.disclosure_description}</h1>
    <h2>開示請求詳細</h2>
    <ul>
      <li>開示請求人: {disclosure.disclosure_actor}</li>
      <li>主な請求対象: {disclosure.disclosure_target}</li>
      {/*<li>開示請求日時: {disclosure.disclosure_action_date}</li>*/}
    </ul>
    <h2>結果: {disclosure.result}</h2>
    {result}
  </>;
}

export const query = graphql`
  query($slug: String!) {
  allWadaDbDisclosureTsv(filter: {disclosure_description: {ne: ""}, fields: {slug: {eq: $slug}}}) {
    nodes {
      disclosure_actor
      disclosure_description
      disclosure_target
      submission_article_url
      explanation
      id
      reason_of_no_disclosure
      result
      result_article_url
      result_img_url
    }
  }
}
`;
