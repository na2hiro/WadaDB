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
}
const Layout: FunctionComponent<Props> = ({ title, description = "", children }) => {
  return <>
    <Helmet>
      <html lang="ja"/>
      <title>{title}</title>
      <meta name="description" content={`WadaDBは公的機関に対する情報開示請求のデータベースです。${description}`}/>
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
    </Container>
  </>
}

export default Layout
