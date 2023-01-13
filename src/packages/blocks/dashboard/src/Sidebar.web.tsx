import React from "react";
import PhoneInput from "react-phone-input-2";
import MomentUtils from "@date-io/moment";
import "react-phone-input-2/lib/bootstrap.css";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InfoIcon from "@material-ui/icons/Info";

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";

import {
  Container,
  Box,
  Button,
  Input,
  Typography,
  IconButton,
  Grid,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  Badge,
  Collapse,
  //   ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  styled,
  // Modal,
  Link,
  // Customizable Area Start
  Modal,
  Tooltip,
  withStyles,
  Theme
  // Customizable Area End
} from "@material-ui/core";
// import { styled } from '@mui/system'
// import { makeStyles } from '@material-ui/core/styles'
// Customizable Area Start
import { drawerlogo,modalCheck } from "./assets";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import ArrowForwardIosIcon from '@material-ui/icons/PowerSettingsNew/ArrowForwardIos';
import PersonIcon from "@material-ui/icons/Person";

// Customizable Area End
// Customizable Area Start
import { widthFromPercentage } from "../../../framework/src/Utilities";
import SidebarController, { Props } from "./SidebarController";

import "./sidebar.css";
// Customizable Area End
const drawerWidth = 440;
// const StyledMenuItem = styled(MenuItem)(
//   ({ theme: Theme }) => `
//   list-style: none;
//   border-radius: 8px;
//   width: 300px;
//   boxSizing: border-box;
//   zIndex: 4000;

//   `,
// );

export default class Sidebar extends SidebarController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  modalStyle: any = getStatusModalStyle();
  handleClick = () => {
    this.state.isopen ?
      (this.setState({ isopen: !this.state.isopen }),
        localStorage.setItem("isopen", "false")) :
      (this.setState({ isopen: !this.state.isopen }),
        localStorage.setItem("isopen", "true"))
  };

  renderModal = ()=>{
    const body = (
        <Box style={this.modalStyle}>
           <Box margin={"auto"} width={"60%"}>
           <img src={modalCheck} className="statusImage"/>
           </Box>
           <Box fontWeight={"bold"} textAlign={"center"}>
             {this.state.StatusModalMessage}
           </Box>
           <Box  marginY={"20px"} marginBottom={"50px"} display={"flex"} justifyContent={"center"}>
           <Button onClick={this.handleRoleChangeRedirect} style={{width:"42%"}} variant={"contained"}>
             OK
           </Button>
           </Box>
        </Box>
    )
  
 
     return <>
         <Box>
           <Modal
             open={this.state.isStatusModalVisible}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
           >
             {body}
           </Modal>
         </Box>
     </>
   }

  handlepeopleClick = () => {
    this.state.peopleOpen ?
      (this.setState({ peopleOpen: !this.state.peopleOpen }),
        localStorage.setItem("peopleOpen", "false")) :
      (this.setState({ peopleOpen: !this.state.peopleOpen }),
        localStorage.setItem("peopleOpen", "true"))

  };
  handleColor = (e: any) => {
    e.target.style.color = "#0096FF";
  };
  handleOutColor = (e: any) => {
    e.stopPropagation()

    e.target.style.color = "#818589";
  };
  handleClose = () => {
    this.setState({ isopen: false })
    localStorage.removeItem("isopen")

  }
  handleModelnameLogout = async () => {
    await localStorage.removeItem("modelname")
  }

  handleEdit = () => {
    console.log(this.props, "NAVIGATION PROPS")

  };
  handleMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // event.stopPropagation()

    // e.target.style.color = "#0096FF";
    this.state.achorEl ?
      this.setState({ achorEl: null }) : this.setState({ achorEl: event.currentTarget })

  };
  powerButton=()=>{
    this.handleLogout()
    // this.handleDeviceId()
  }
  handleMouseClick = (event: any) => {
    // event.stopPropagation()

    localStorage.setItem("modelname", "Client Management")
  }

  renderMegaMenu=()=>{   
     return <Box>
        {this.state.drawerList && this.state.drawerList?.map((item:any) => (
          <>
            <p><Link href="/clients" style={{marginLeft: 10, color: "black", fontWeight: "bold", fontSize:15, fontFamily: "sans-serif", textDecoration: "none"}}>{item?.attributes?.client_management?.client_name}</Link></p>

            {item.attributes.client_subfolders.map((item:any) => (

              <p><Link href={`/client_subfolder?cid=${item?.client_id}`} style={{marginLeft: 10, color: "black", fontSize:12, fontFamily: "sans-serif", textDecoration: "none"}}>{item?.team_title}</Link></p>

            ))}
            <Divider />
          </>
        ))}
      </Box>
  }

  // Customizable Area End

  render() {

    return (
      // Customizable Area Start
      <>
      {this.renderModal()}
        
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "white",
            // @ts-ignore
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              <img
                src={drawerlogo}
                alt="logo"
                style={{ width: 100, height: 30 }}
              />
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge style={{ color: "white" }}>
                  <Link href="userprofile">
                    <PersonIcon style={{ color: "black" }} />
                  </Link>

                  {/* <img
                    src={profile}
                    alt="logo"
                    style={{ width: 30, height: 30 }}
                  /> */}
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Link href="EmailAccountLoginsBlock" underline="none">

                  <Badge style={{ color: "white" }}>
                    <PowerSettingsNewIcon style={{ color: "black" }} onClick={this.powerButton} />
                    {/* <img
                    src={profile}
                    alt="logo"
                    style={{ width: 30, height: 30 }}
                  /> */}
                  </Badge>
                </Link>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Drawer
            variant="permanent"
            style={{
              zIndex: 0,
              width: 300,
              backgroundColor: "#f5f5f5",
              // textAlign: "center",
            }}

          // sx={{
          //     width: drawerWidth,
          //     flexShrink: 0,
          //     zIndex: 0,
          //     // [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          // }}
          >
            <Toolbar />

            <Box sx={{ overflow: "auto" }} style={{ width: '15vw' }}>
              {/* {['SUPERADMIN','ADMIN]'.includes(role) && ( */}
              <Link underline="none">
                <List style={webStyle.input}>
                  {/* <ListItem key="Analytics" disablePadding> */}
                  <ListItem>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      className="labletext"
                    >
                      Analytics
                    </ListItemText>
                  </ListItem>

                  {/* </ListItem> */}
                </List>
              </Link>

              <Link underline="none" href="/workspacemanagement" >
                <List style={webStyle.input} >
                  <ListItem onClick={() => localStorage.setItem("modelname", "Workspace Management")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Workspace Management"
                      className={localStorage.getItem("modelname") == "Workspace Management" ? "selectedLabledText" : "labletext"}
                    >
                      Workspace Management
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link href="/clients" underline="none"  onClick={this.handleMouseClick} >
                <List style={webStyle.input}    >
                  <ListItem>
                    <LightTooltip title={this.renderMegaMenu()} arrow placement={"right"} interactive>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Client Management"
                      className={localStorage.getItem("modelname") == "Client Management" ? "selectedLabledText" : "labletext"}
                    >
                      Client Management
                    <Button> < ArrowRightIcon/></Button>
                    </ListItemText>
                    </LightTooltip>
                  </ListItem>
                </List>
              </Link>

              <Link underline="none" href="/edittemplate">
                <List style={webStyle.input}>
                  <ListItem onClick={() => localStorage.setItem("modelname", "Templates")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Templates"
                      className={localStorage.getItem("modelname") == "Templates" ? "selectedLabledText" : "labletext"}
                    >
                      Templates
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>

              <Link underline="none">
                <List onClick={() => this.handleClick()} style={webStyle.input}>
                  <ListItem >
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Configuration Module"
                      className="labletext"
                    />
                    {localStorage.getItem("isopen") == "true" ? (
                      <ExpandLess
                        onClick={() => this.handleClick()}
                        style={{ color: "#818589", fontFamily: "san-serif" }}
                      />
                      // <ExpandMore style={{ color: "#818589" }} />
                    ) : (
                      <ExpandMore style={{ color: "#818589" }} />
                    )}
                  </ListItem>
                </List>
                <Collapse in={localStorage.getItem("isopen") == "true"} timeout="auto" unmountOnExit>
                  <Link href="/InvoiceContent" underline="none">
                    <List component="div" disablePadding style={webStyle.input}>
                      <ListItem onClick={() => localStorage.setItem("modelname", "Invoice Content")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="Invoice Content"
                          className={localStorage.getItem("modelname") == "Invoice Content" ? "selectedLabledText" : "labletext"}
                        />
                      </ListItem>
                    </List>
                  </Link>

                  <List component="div" disablePadding style={webStyle.input}>
                    <Link href="/TermsandCondition" underline="none">
                      <ListItem onClick={() => localStorage.setItem("modelname", "Terms & Conditions")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="Terms & Conditions"
                          className={localStorage.getItem("modelname") == "Terms & Conditions" ? "selectedLabledText" : "labletext"}
                        />
                      </ListItem>
                    </Link>

                  </List>
                  <List component="div" disablePadding style={webStyle.input}>
                    <Link href="/ProjectType" underline="none">
                      <ListItem onClick={() => localStorage.setItem("modelname", "Type of Project")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="Type of Projects"
                          className={localStorage.getItem("modelname") == "Type of Project" ? "selectedLabledText" : "labletext"}
                        />
                      </ListItem>
                    </Link>

                  </List>
                  <List component="div" disablePadding style={webStyle.input}>
                    <Link href="/AutoSuggestion" underline="none">
                      <ListItem onClick={() => localStorage.setItem("modelname", "Auto suggestions")}>

                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="Auto suggestions"
                          className={localStorage.getItem("modelname") == "Auto suggestions" ? "selectedLabledText" : "labletext"}
                        />
                      </ListItem>
                    </Link>

                  </List>
                  <List component="div" disablePadding style={webStyle.input}>
                    <Link href="/ProjectCode" underline="none">

                      <ListItem onClick={() => localStorage.setItem("modelname", "Project codes")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="Project codes"
                          className={localStorage.getItem("modelname") == "Project codes" ? "selectedLabledText" : "labletext"}
                        />
                      </ListItem>
                    </Link>
                  </List>
                  <List component="div" disablePadding style={webStyle.input}>
                    <Link href="Designation" underline="none">
                      <ListItem onClick={() => localStorage.setItem("modelname", "Designation")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="Designations"
                          className={localStorage.getItem("modelname") == "Designation" ? "selectedLabledText" : "labletext"}
                        />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </Link>
              <Link underline="none">
                <List
                  onClick={this.handlepeopleClick}
                  // style={{ display: "flex" }}
                  style={webStyle.input}
                >
                  <ListItem>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="People Management"
                      className="labletext"
                    />
                    {localStorage.getItem("peopleOpen") == "true" ? (
                      <ExpandLess style={{ color: "#818589" }} />
                    ) : (
                      <ExpandMore style={{ color: "#818589" }} />
                    )}
                  </ListItem>
                </List>
                <Collapse
                  in={localStorage.getItem("peopleOpen") == "true"}
                  timeout="auto"
                  unmountOnExit
                  style={{ color: "#818589" }}
                >
                  <List component="div" style={webStyle.input}>
                    <Link href="UserManagement" underline="none">
                      <ListItem onClick={() => localStorage.setItem("modelname", "User Management")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="User Management"
                          className={localStorage.getItem("modelname") == "User Management" ? "selectedLabledText" : "labletext"}
                          onClick={() => this.handleEdit()}
                        />
                      </ListItem>
                    </Link>
                    <List style={webStyle.input}>
                      <Link href="UserRequest" underline="none">
                        <ListItem onClick={() => localStorage.setItem("modelname", "User Request")}>
                          <ListItemText
                            onMouseOver={this.handleColor}
                            onMouseOut={this.handleOutColor}
                            disableTypography={true}
                            primary="User Request"
                            className={localStorage.getItem("modelname") == "User Request" ? "selectedLabledText" : "labletext"}
                          />
                        </ListItem>
                      </Link>
                    </List>
                  </List>
                </Collapse>
              </Link>
              <Link underline="none" href="/RolesPermission">
                <List style={webStyle.input} >
                  <ListItem onClick={() => localStorage.setItem("modelname", "Roles & Permissions")} >
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary=" Roles & Permissions"
                      className={localStorage.getItem("modelname") == "Roles & Permissions" ? "selectedLabledText" : "labletext"}
                    >
                      Roles & Permissions
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link underline="none" href="/invoicesDashboard">
                <List style={webStyle.input}>
                  <ListItem onClick={() => localStorage.setItem("modelname", "Invoices Dashboard")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Invoices Dashboard"
                      className={localStorage.getItem("modelname") == "Invoices Dashboard" ? "selectedLabledText" : "labletext"}
                    >
                      Invoices Dashboard
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link underline="none" href="/reporting">
                <List style={webStyle.input}>
                  <ListItem onClick={() => localStorage.setItem("modelname", "Reporting")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Reporting"
                      className={localStorage.getItem("modelname") == "Reporting" ? "selectedLabledText" : "labletext"}
                    >
                      Reporting
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link underline="none">
                <List style={webStyle.input}>
                  <ListItem>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Task Board"
                      className={localStorage.getItem("modelname") == "Task Board" ? "selectedLabledText" : "labletext"}
                    >
                      Task Board
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link underline="none">
                <List style={webStyle.input} >
                  <Link href="InAppNotification" underline="none">
                    <ListItem onClick={() => localStorage.setItem("modelname", "Notifications")}>
                      <ListItemText
                        onMouseOver={this.handleColor}
                        onMouseOut={this.handleOutColor}
                        disableTypography={true}
                        primary="Notifications"
                        className={localStorage.getItem("modelname") == "Notifications" ? "selectedLabledText" : "labletext"}
                      >
                        Notifications
                      </ListItemText>
                    </ListItem>
                  </Link>
                </List>
              </Link>

              <Link underline="none" href={"userprofile"}>
                <List style={webStyle.input} >
                  <ListItem onClick={() => localStorage.setItem("modelname", "Profile")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      primary="Profile"
                      className={localStorage.getItem("modelname") == "Profile" ? "selectedLabledText" : "labletext"}
                    >
                      Profile
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
              <Link href="EmailAccountLoginsBlock" underline="none">
                <List style={webStyle.input} onClick={() => this.handleModelnameLogout()}>
                  <ListItem onClick={() => localStorage.setItem("modelname", "Logout")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      className={localStorage.getItem("modelname") == "Logout" ? "selectedLabledText" : "labletext"}
                      onClick={this.handleLogout}
                    >
                      Logout
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
            </Box>
          </Drawer>
        </Box>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "white",
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    marginTop:"15vh",
    boxSizing:"border-box",
    overflow:"scroll",
    height:"70vh",
    width:"25vw"
  },
}))(Tooltip);


function getStatusModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "18rem",
    borderRadius: "5px",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    border:"none"
  };
}

const webStyle = {
  input: {
    paddingBottom: 0,
  },
  label: {
    color: "#818589",
    fontFamily: "san-serif",
    fontWeight: "bold",
    fontSize: 15,
  },
};
// Customizable Area End
