import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"
import { useScrollTrigger } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import Slide from "@material-ui/core/Slide"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Link from "./Link"
import Box from "@material-ui/core/Box"

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

type Props = {
  title: string;
  description?: string;
  isArticle?: boolean;
}
const Layout: FunctionComponent<Props> = ({ title, description = "", children, isArticle=false }) => {
  const seo = {
    url: null,
    image: null,
    title,
    description: isArticle && description ? description : `WadaDBは公的機関に対する情報開示請求のデータベースです。${description}`,
    twitterUsername: "na2hiro"
  }
  return <>
    <Helmet>
      <html lang="ja"/>
      <title>{title}</title>
      <meta name="description" content={seo.description}/>
      {seo.url && <meta property="og:url" content={seo.url} />}
      {isArticle && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.twitterUsername && (
        <meta name="twitter:creator" content={seo.twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
    <CssBaseline/>
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: "white" }}>WadaDB: 情報開示データベース</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar/>
    <Container>
      {children}

      <Box my={2}>
        <Link to={"/"}>トップに戻る</Link>
      </Box>
    </Container>
  </>
}

export default Layout
