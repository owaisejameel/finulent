import React from "react";
// Customizable Area Start
import "react-phone-input-2/lib/bootstrap.css";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  Badge,
  Collapse,
  ListItemText,
  Link,
  Modal,
  Button
} from "@material-ui/core";
import { drawerlogo } from "./assets";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import PersonIcon from "@material-ui/icons/Person";
import { logout,modalCheck,drawerlogoother, bellicon} from './assets';

// Customizable Area End

// Customizable Area Start
import SidebarController, { Props } from "./SidebarController";
import "./sidebar.css";
// Customizable Area End
const drawerWidth = 440;
 // Customizable Area Start
export default class SidebarOther extends SidebarController {
  modalStyle: any = getStatusModalStyle();
  constructor(props: Props) {
    super(props);
  }
  handleClick = () => {
    this.setState({ isopen: !this.state.isopen });
  };
  handlepeopleClick = () => {
    this.state.peopleOpen?

    (this.setState({ peopleOpen: !this.state.peopleOpen }),
    localStorage.setItem("peopleOpen","false")):
    (this.setState({ peopleOpen: !this.state.peopleOpen }),
    localStorage.setItem("peopleOpen","true"))
  };
  handleColor = (e: any) => {
    e.target.style.color = "white";
  };
  handleOutColor = (e: any) => {
    e.target.style.color = "#818589";
  };

  handleEdit = () => {
    console.log(this.props, "NAVIGATION PROPS")

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

  render() {
    return (
      <>
        {this.renderModal()}
        <AppBar
          position="sticky"
          style={webStyle.appbar}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              <img
                src={drawerlogoother}
                alt="logo"
                style={webStyle.logo}
              />
            </Typography>

            <Box sx={webStyle.outerbox} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge style={webStyle.badge}>
                    <img
                        src={bellicon}
                        alt="notification"
                        style={webStyle.navlogo}
                    />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge style={webStyle.badge}>
                  <Link href="EmailAccountLoginsBlock">
                    <img
                        src={logout}
                        alt="notification"
                        style={webStyle.navlogo}
                        onClick={this.handleLogout}

                    />
                    </Link>
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box style={webStyle.innerbox}>
          <Drawer
            variant="permanent"
            style={webStyle.drawer}
            className="drawers"
          >
            <div style={webStyle.drawerdiv}>
            <div style={webStyle.drawerlogo}>
            <Typography variant="h6" noWrap component="div">
              <img
                src={drawerlogoother}
                alt="logo"
                style={webStyle.logoother}
              />
            </Typography>
            </div>

            <Box sx={webStyle.box}>
              {/* <Link underline="none">
                <List style={webStyle.input}>
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
                </List>
              </Link> */}

              {/* <Link underline="none" href="/workspaces" >
                <List style={webStyle.input}>
                  <ListItem>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      className="labletext"
                    >
                      Workspace Management
                    </ListItemText>
                  </ListItem>
                </List>
              </Link> */}

            {((localStorage.getItem('role_id')==="Admin") ||(localStorage.getItem('role_id')==="TL/Manager")) &&
              // <Link href="/clientmanagement" underline="none" >
              <Link href={((localStorage.getItem('role_id')==="Admin") ? "/clientmanagement" : "/clientmanage")} underline="none" >
                <List style={webStyle.input}>
                  <ListItem onClick={()=>localStorage.setItem("modelname","Client Management")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      className={localStorage.getItem("modelname")=="Client Management"? "adminselected":"labletext"}
                    >
                      Client Management
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
            }

              {((localStorage.getItem('role_id')==="Admin")) &&
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
                  in={localStorage.getItem("peopleOpen")=="true"}
                  timeout="auto"
                  unmountOnExit
                  style={{ color: "#818589" }}
                >
                  <List component="div" style={webStyle.input}>
                    <Link href="AdminUserManagement" underline="none">
                      <ListItem onClick={()=>localStorage.setItem("modelname","User Management")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="User Management"
                          className={localStorage.getItem("modelname")=="User Management"? "adminselected":"labletext"}
                          onClick={() => this.handleEdit()}
                        />
                      </ListItem>
                    </Link>
                    <List style={webStyle.input}>
                    <Link href="AdminUserRequest" underline="none">
                      <ListItem onClick={()=>localStorage.setItem("modelname","User Request")}>
                        <ListItemText
                          onMouseOver={this.handleColor}
                          onMouseOut={this.handleOutColor}
                          disableTypography={true}
                          primary="User Request"
                          className={localStorage.getItem("modelname")=="User Request"? "adminselected":"labletext"}
                        />
                      </ListItem>
                      </Link>
                    </List>
                  </List>
                </Collapse>
              </Link>
              }

            {((localStorage.getItem('role_id')==="Admin")) &&
              <Link underline="none"  href="/edittemplate">
                    <List style={webStyle.input}>
                        <ListItem>
                            <ListItemText
                                onMouseOver={this.handleColor}
                                onMouseOut={this.handleOutColor}
                                disableTypography={true}
                                className="labletext"
                            >
                                Templates
                            </ListItemText>
                        </ListItem>
                    </List>
              </Link>
            }
            {((localStorage.getItem('role_id')==="Admin") ||(localStorage.getItem('role_id')==="TL/Manager") || (localStorage.getItem('role_id')=== 'Designer/QC/QA')) &&
            <Link underline="none" href="/taskboard">
                <List style={webStyle.input}>
                  <ListItem onClick={()=>localStorage.setItem("modelname","Manager Task Board")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      // className="labletext"
                      className={localStorage.getItem("modelname")=="Manager Task Board"? "adminselected":"labletext"}
                    >
                      Manager Task Board
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
            }

            {((localStorage.getItem('role_id')==="Designer/QC/QA")) &&
            <Link underline="none">
            <List style={webStyle.input}>
              <ListItem>
                <ListItemText
                  onMouseOver={this.handleColor}
                  onMouseOut={this.handleOutColor}
                  disableTypography={true}
                  className="labletext"
                >
                  Task Board
                </ListItemText>
              </ListItem>
            </List>
          </Link>
        }

                <Link underline="none">
                    <List style={webStyle.input}>
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
                    </List>
                </Link>

            {((localStorage.getItem('role_id')==="Admin")) &&
              <Link underline="none">
                <List style={webStyle.input}>
                  <ListItem>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      className="labletext"
                    >
                      Reporting
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
            }

              <Link underline="none" href={"userprofile"}>
                <List style={webStyle.input} >
                  <ListItem onClick={()=>localStorage.setItem("modelname","Profile")}>
                    <ListItemText
                      onMouseOver={this.handleColor}
                      onMouseOut={this.handleOutColor}
                      disableTypography={true}
                      className={localStorage.getItem("modelname")=="Profile"? "adminselected":"labletext"}
                    >
                      My Profile
                    </ListItemText>
                  </ListItem>
                </List>
              </Link>
            </Box>
            </div>
          </Drawer>
        </Box>
      </>
    );
  }
}
 // Customizable Area End

// Customizable Area Start
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

    appbar: {
        backgroundColor: "white",
    },

    logo: {
        width: 100,
        height: 30,
    },

    outerbox: {
        flexGrow: 1
    },

    badge: {
        color: "white"
    },

    icon: {
        color: "black"
    },

    innerbox: {
        display: "flex",
        // flexDirection: "row"
    },

    drawer: {
        zIndex: 1300,
        width: 300,
    },

    box: {
        overflow: "auto",
        width: '15vw',
    },

    drawerdiv: {
        backgroundColor: "black",
        height: "100vh",
    },

    drawerlogo: {
        height: 60,
        width: "15vw",
        borderBottom: "1px solid #606060"
    },

    logoother: {
        width: 150,
        height: 45,
        margin: 10
    },

    navlogo: {
        width: 30,
        height: 30,
    },

}
// Customizable Area End
