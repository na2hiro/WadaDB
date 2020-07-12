import { navigate, withPrefix } from "gatsby"
import React, { FunctionComponent } from "react"
import MaterialLink from "@material-ui/core/Link";

type Props = {
  to: string;
  [attribute: string]: any;
}

const Link: FunctionComponent<Props> = ({to, children, ...rest}) => {
  return <MaterialLink href={withPrefix(to)} onClick={(e) => {e.preventDefault(); navigate(to); }} {...rest}>{children}</MaterialLink>
}

export default Link;

export const ExternalLink: FunctionComponent<Props> = ({to, children, ...rest}) => {
  return <MaterialLink href={to} target="_blank" rel="noopener noreferrer" {...rest}>{children}</MaterialLink>
}
