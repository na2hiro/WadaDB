import Layout from "../components/Layout"
import React from "react"
import Box from "@material-ui/core/Box"
import { Typography } from "@material-ui/core"
import { ExternalLink } from "../components/Link"

export default function About() {
  return <Layout title="WadaDBについて" description="WadaDB: 情報開示データベースについて">
    <Box my={2}>
      <Typography variant="h5" component="h1">
        WadaDBについて
      </Typography>

      <Box my={2}>
        <Typography variant="body1">
          WadaDBは、<ExternalLink to={"https://twitter.com/WadaJP"}>@WadaJP</ExternalLink>さんの情報開示請求運動に触発され
          <ExternalLink to={"https://twitter.com/na2hiro"}>@na2hiro</ExternalLink>が開始した有志のプロジェクトです。
          市民によってなされた情報開示請求に関する情報を集約し一覧できるようにすることを目標としています。
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" component="h2">
          特徴
        </Typography>
        <ul>
          <li>
            開示データは、公開された
            <ExternalLink to={"https://docs.google.com/spreadsheets/d/13cNdATgaTFin8mJrkaY8nFqomMxtVM78b0JaV4dkHZU/edit#gid=0"}>Google スプレッドシート</ExternalLink>
            と
            <ExternalLink to={"https://drive.google.com/drive/folders/1XE9lzfSKtLkRGWqsddyVbiFvrJ0AhhwX"}>Google ドライブ</ExternalLink>
            で管理され、ボランティアの誰でも情報を追加及び修正することができる。
          </li>
          <li>
            開示データから当サイトを生成するソースコードは、公開されたGithubリポジトリ
            <ExternalLink to={"https://github.com/na2hiro/WadaDB"}>na2hiro/WadaDB</ExternalLink>
            で管理され、誰でも改善及びそのリクエストをすることができる。
          </li>
        </ul>
      </Box>
    </Box>
  </Layout>
}
