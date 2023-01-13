// Customizable Area Start
import React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import "./style.css";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import TemplateBreadcrumbsController, { Props } from "./TemplateBreadcrumbsController.web";

export default class TemplateBreadcrumbs extends TemplateBreadcrumbsController {
  constructor(props: Props) {
    super(props);
  }
  handleBack = () => {
    return window?.history?.back()
  };
  handleWorkspaceClick = () => {
    if (localStorage?.getItem('user_type') == 'Superadmin') this.props.history.push(`/workspacemanagement`);
  }
  handleClientClick = () => {
    if (localStorage?.getItem('user_type') == 'Superadmin') this.props.history.push(`/clients`);
    else this.props.history.push(`/clientmanagement`);
  }
  handleSFClick = () => {
    if (localStorage?.getItem('user_type') == 'Superadmin') this.props.history.push(`/client_subfolder?cid=${this.query.get('cid')}`);
    else this.props.history.push(`/subfolder?cid=${this.query.get('cid')}`);
  }
  render() {
    const { breadCrumbs } = this.state;
    return (
      <div style={webStyle.pagename}>
        <Box style={webStyle.arrowbox}>
          <ArrowLeftRoundedIcon
            style={webStyle.arrow}
            onClick={() => this.handleBack()}
          />
        </Box>
        <div>
          <h4 style={webStyle.title}>{breadCrumbs?.template_name || 'Template Name'}</h4>
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            style={webStyle.breadcrumb}
          >
            <Link color="inherit" onClick={() => this.handleWorkspaceClick()}>
              {breadCrumbs?.workspace?.name || 'Workspace'}
            </Link>
            <Link color="inherit" onClick={() => this.handleClientClick()}>
              {breadCrumbs?.client?.name || 'Client'}
            </Link>
            {breadCrumbs?.subfolder?.name && <Link color="inherit" onClick={() => this.handleSFClick()}>
              {breadCrumbs?.subfolder?.name}
            </Link>}
          </Breadcrumbs>
        </div>
      </div>
    );
  }
}

const webStyle = {
  modalRoot: {
    display: "flex",
    gap: 1,
    fontSize: "16px",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    paddingBlock: "2rem", //
    backdropFilter: "blur(5px)",
    overflow: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  pagename: {
    display: "flex",
  },
  breadcrumb: {
    marginLeft: 10,
    marginTop: -10,
  },
  arrowbox: {
    backgroundColor: "#eeeeee",
    width: 35,
    height: 35,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  title: {
    margin: 10,
    marginTop: 2,
    color: "#42454e",
    fontSize: "20px",
    fontWeight: 100,
  },
  arrow: {
    width: 20,
    height: 20,
  },
}
// Customizable Area End
