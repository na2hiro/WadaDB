import React, { FunctionComponent } from "react"
import {Helmet} from "react-helmet";

type Props = {
  title: string;
  description?: string;
}
const Head: FunctionComponent<Props> = ({title, description = ""}) => {
return(
  <Helmet>
    <html lang="ja"/>
    <title>{title}</title>
    <meta name="description" content={`WadaDBは公的機関に対する情報開示請求のデータベースです。${description}`} />
  </Helmet>
  )
}

export default Head;
