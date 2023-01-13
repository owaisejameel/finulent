import React, { Component } from "react";

import {
  Box,
  Button, Avatar,
  Modal,
  TextField, Popover, InputAdornment, createMuiTheme
} from "@material-ui/core";
import './style.css';
import "./ClientSubFolder.css";
import { GoSearch } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
export const configJSONBase = require("../../../framework/src/config");

// Customizable Area End

import ClientSubFolderController, { Props } from "./ClientSubfolderController";

export default class ClientSubFolder extends ClientSubFolderController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount(): any {
    let token = localStorage.getItem("token")
    if(token) {
        console.log("calling get user")
        this.getClientData()
        this.handleGetSubfolderList()
        this.handleCurrencyList()
        this.getProjectTypes()
    }
  }

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start

      <Box marginLeft={"15vw"} width={"85vw"} fontFamily={"sans-serif"}>
        <Centered>
          <Box width={"97%"}>
            {/* Top Start */}
            <Box height={"5vh"} marginTop={"2vh"}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                  <Box className="boldText">Client Subfolder</Box>
                  <Box
                    className="breadCrumbText"
                    marginTop={"5px"}
                    display={"flex"}
                  >
                    <Box>New Client</Box>
                    <Box marginX={"0.5vh"}>
                     {`>`}
                    </Box>
                    <Box>Sub Folder</Box>
                  </Box>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box>
                    <TextField
                      variant={"outlined"}
                      size={"small"}
                      style={{
                        backgroundColor: "white",
                        margin: "0px 2vw",
                        width: "25vw",
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box>
                            <InputAdornment position={"start"}>
                              <GoSearch />
                            </InputAdornment>
                          </Box>
                        ),
                      }}
                      placeholder={"Search Sub Folder"}
                    />
                  </Box>
                  <Box>
                    <AddSubFolderModal />
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Top End */}

            {/* Main Content  */}
            <Box marginTop={"1.5vh"} className={"carsdDivSubFolder"}>
              {[1, 1, 1, 1].map((el) => {
                return <SubFolderCard />;
              })}
            </Box>

            {/*Main Content End */}
          </Box>
        </Centered>
      </Box>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
            textTransform :"none",
          "&.Mui-selected": {
            background: "#fff"
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
        }
      }
    }
  });

const webStyle = {
    maincontainer: {
        backgroundColor: "#eeeeee",
        height: "100%",
        color: "#5f5f5f",
        fontFamily: "sans-serif",
        width: "85vw",
        top: "50px",
        right:0,
        padding:"10px 20px 0px 0px",
        marginLeft: '15vw',
        boxSizing: "border-box",
        position: "fixed",
        overflow: "scroll"
    }as React.CSSProperties,

    cellStyle : {
        borderRight : "1px solid #e6e6e6",
        width :"50%"
    },

    KwcellStyle :{
        borderRight : "1px solid #e6e6e6",
    },

    newRangebtn:{
        textTransform :"none",
        color : "#42a5f5",
    }as React.CSSProperties,

    headingBox: {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        marginLeft: 10,
        marginTop: 10,
    },

    pageHeader: {
        marginLeft: 0,
        marginBottom: 0,
    },

    pageHeaderSubclient: {
        marginTop: 3,
        fontSize: 12,
        color: "#0000008a"
    },

    addWorkspaceButton: {
        display: "flex",
        width: "160px",
        border: "1px solid #cecece",
        height: "40px",
        backgroundColor: "#42a5f5",
        marginLeft: 10,
        color: "white",
        marginRight: 10,
        textTransform: 'none',
    } as React.CSSProperties,

    addWorkspaceButtontop: {
        display: "flex",
        width: "160px",
        border: "1px solid #cecece",
        height: "40px",
        backgroundColor: "#42a5f5",
        marginLeft: 10,
        color: "white",
        marginRight: -5,
        textTransform: 'none',
    } as React.CSSProperties,
    
    contentbox: {
        display:"flex",
        alignItems:"center",
        marginLeft: 20,
        marginTop: 20,
        marginRight: 1,
        marginBottom: 20,
        paddingBottom: 20,
    },

    innerGridcontainer: {
        // marginLeft: 0,
    },

    workspaceCard: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "1rem",
        maxHeight: "500px",
        marginBottom: 10,
    } as React.CSSProperties,

    imagebox: {
        border: "1px solid #e8e8e8",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        height: 100,
    } as React.CSSProperties,

    editButton: {
        display: "flex",
        justifyContent:"flex-end",
        alignContent:"flex-end",
        alignItems: "flex-end",
        height: 20,
    },

    titleandDescription: {
        borderBottom: "1px solid #e8e8e8"
    } as React.CSSProperties,

    admindisplay: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #e8e8e8",
        height: 80,
    } as React.CSSProperties,

    templateDetail: {
        display: "flex",
        justifyContent: "center",
    },

    templateDetailText: {
        color: "#42a5f5",
        fontWeight: "bold"
    } as React.CSSProperties,

    modalbackdrop: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        alignContent: "center"
      },
      
      modaltextboxheader: {
        color: "#575757"
    },

    errorText: {color:"#f44336", fontSize:15, marginTop:5},

    addimage: {
        width: 455,
        height: 200,
        border: "2px dashed #e8e8e8",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },

  modalcontentsuccess: {
      // width: "30%",
      width: "500px",
      height: "85%",
      fontFamily: "sans-serif",
      backgroundColor: "white",
      alignItems: "left",
      justifyContent: "left",
      margin: 20,
      overflowX: "scroll",
      overflowY: "scroll",
  } as React.CSSProperties,
    
  modalContent: {
  //    margin: 20,
  //    marginTop: -10,
  },

  addworkspacemodaldiv: {
      backgroundColor: "white",
      marginLeft: 0,
      marginright: 0,
  },

  addworkspaceseconddiv: {
      display: "flex",
      justifyContent: "space-between",
  },

  addEditHeading: {
      marginLeft: 20,
  },

  closebuttonstyle: {
      marginTop: 20,
      marginRight: 20,
  },

  addworkspacemaincontentdiv: {
      backgroundColor: "white",
      marginBottom: 10,
      borderBottom: "1px solid #e8e8e8",
  },

  addworkspacedivcontent: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 20,
      marginRight: 20,
  } as React.CSSProperties,
    
  addworkspacecontentdiv: {
      marginTop: 20
  },
    
  addworkspceelements: {
      marginBottom: 20
  },

  addworkspacebuttonstyle: {
      backgroundColor: "white",
      marginTop: 20,
      display: "flex",
      justifyContent: "flex-end",
      marginRight: 20,
  },

  addworkspaceelements: {
      marginBottom: 20
  },

  cancelButton: {
      display: "flex",
      width: "100px",
      border: "1px solid #cecece",
      height: "40px",
      backgroundColor: "#e8e8e8",
      marginLeft: 10,
      color: "black",
      fontWeight: 600,
      textTransform: "none",
  }as React.CSSProperties,

  addworkspaceButton: {
      display: "flex",
      width: "100px",
      border: "1px solid #cecece",
      height: "40px",
      backgroundColor: "#42a5f5",
      marginLeft: 10,
      color: "white",
      fontWeight: 600,
      textTransform: "none",
  } as React.CSSProperties,

  addimagesize: {
      width: 455,
      height: 205,
      marginTop: 20,
  },

  saveimage: {
      width: 455,
      height: 200,
      border: "1px solid #e8e8e8",
      alignContent: "center",
      justifyContent: "center",
      display: "flex"
  },

  headerBox: {
      borderBottom: '1px solid #e8e8e8',
      display: "flex",
      justifyContent: "space-between",
      width: 520,
  } as React.CSSProperties,

  coverimagechangebutton: {
      color: "#42a5f5",
      // textTransform: "none",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
  } as React.CSSProperties,

  formContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid rgba(155, 155, 155, .5)",
      gap: "0.1rem",
      borderRadius: "4px", 
      paddingInline: "8px", 
      paddingBlock: "0.2rem",
      color: "rgba(155, 155, 155, 1)",
    },

    formAvatar: { 
      width: 32, 
      height: 32, 
      backgroundColor: "grey" 
  },

  formToolTipContainer: { 
      cursor: "pointer" 
  },

  toolTipTypography: {
      flexWrap: "nowrap",
      display: "flex",
      fontSize: "small",
  } as React.CSSProperties,

  excessIcon: {
      color: "white"
  },

  filterContainer: {
      display: "flex",
      paddingBlockStart: "1rem",
      overflow: "scroll",
  },

  filterContainerdisable: {
      display: "flex",
      paddingBlockStart: "1rem",
      overflow: "scroll",
      backgroundColor: "#d3cfcf",
      color: "black",
  },

  formActivePick: { 
      backgroundColor: "#42a5f5", 
      color: "#fff" 
  },

  errorMessageDisplay: {
      color: "red",
  },

  modalsuccesspopup: {
      width: "20%",
      height: "35%",
      fontFamily: "sans-serif",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
  },

  modalbox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: -62,
      marginLeft: 40,
  },

  modalcheck: {
      width: "200px",
      height: "100px",
      marginBottom: "25px"
  },
    
    modalcontent: {
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontWeight: 500,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      display: "flex"
  },

  button: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: 200,  
  },

  modalbutton: {
      paddingLeft: "25%",
      paddingRight: "25%",
      paddingTop: "2%",
      paddingBottom: "2%",
      fontWeight: 600,
      borderRadius: "6px",
      width: "140px",
      height: "auto",
      marginTop: "13px",
      display: "flex",
      backgroundColor: "#e9e9e9",
      color: "536c7c",  
  },

  badgeStyle: {
      backgroundColor: "white", 
      marginRight: 40, 
      marginTop: 40
  },

  coverimage: {
      height: 100, 
      width: 349,
      display: "inherit",
      flexGrow: 1,
      color: "#bababa",
      textAlign: "center",
      lineHeight: "220px",
      border: 0,
  } as React.CSSProperties,

  coverimageText: {
    height: 100, 
    width: 349,
    display: "inherit",
    justifyContent: "center",
    flexGrow: 1,
    color: "#bababa",
    textAlign: "center",
    lineHeight: "220px",
    border: 0,
} as React.CSSProperties,

  adminMargin: {
      marginRight: 10,
      color: "#0000008a"
  },

  uploadimage: {
    marginTop: 6, 
    color: "#bababa", 
    fontSize: 14, 
    marginLeft: 7
  },

  greyText: {
    color: "#0000008a"
  },
  newlinep: {
    color: "#0000008a",
    lineHeight: 1,
    margin: 1,
  },

  imagesizeedit: {
    width: 455, 
    height: 200,
  },

  imagesizeeditsecond: {
    width: 455, 
    height: 200, 
    color: "#bababa", 
    textAlign: "center", 
    lineHeight: "170px"
  } as React.CSSProperties,

  textfieldDisabled: {
      backgroundColor: "#e8e8e8"
  },

  gobacklink: {
      color: "rgb(95, 95, 95)"
  },
    };

        class SubFolderCard extends Component {
          render(): React.ReactNode {
            const styles = {
              paperContainer: {
                backgroundImage: `url(https://telecomtalk.info/wp-content/uploads/2021/04/airtel-iot-india-integrate-smart-devices.png)`,
                backgroundSize: `100% 100%`,
                backgroundRepeat: `no-repeat`,
      },
    };

    return (
      <>
        <Box
         className="card"
         
        >
          <Box>
            <Box
              style={styles.paperContainer}
              border={"1px solid lightgrey"}
              height={"13vh"}
              margin={"auto"}
              width={"85%"}
            >
              <Box display={"flex"} justifyContent={"end"}>
                <Box className={"options"}>
                  <Popperr />
                </Box>
              </Box>
            </Box>
            <Box marginY={"15px"}>
              <Box className="boldText" textAlign={"center"}>
                India
              </Box>
              <Box
                className={"cardText"}
                overflow={"hidden"}
                height={"9vh"}
                textOverflow={"none"}
                textAlign={"center"}
                marginTop={"1vh"}
              >
                When you develop a mockup page or backend API is not ready for
                data fetching and you have to make Frontend Development with
                static data until it comes, react-lorem-ipsum will create your
                gibberish texts for you.
              </Box>
            </Box>
            <Box marginY={"1.5vh"} component={"hr"}></Box>
            <Box
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box className={"cardText"} marginRight={"1vh"}>Team Leader</Box>
              <Box display={"flex"}>
                {[1, 1, 1].map((el, i) => {
                  return (
                    <Box key={i} zIndex={i} marginLeft={i!=0 && "-13px"}>
                      <Avatar
                        style={{
                          border: "3px solid white",
                          width: "35px",
                          height: "35px",
                        }}
                        alt="Remy Sharp"
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box marginTop={"1.8vh"} component={"hr"} />
            <Box
              marginY={"1.5vh"}
              className="boldText"
              color={"#5BB3F8"}
              textAlign={"center"}
            >
              Template details
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

class Centered extends Component {
  render(): React.ReactNode {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          {this.props.children}
        </Box>
      </>
    );
  }
}

interface MenuState {
  anchorEl: any;
}

class Popperr extends Component<{}, MenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render(): React.ReactNode {
    return (
      <>
        <Box>
          <Box onClick={this.handleClick}>
            <FiMoreHorizontal />
          </Box>
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box className="menu" padding={"5px 0px"}>
              <EditSubFolderModal/>
              <DeleteSubFolderModal />
            </Box>
          </Popover>
        </Box>
      </>
    );
  }
}

class EditSubFolderModal extends Component<{}, { open: boolean }> {

  modalStyle: any = getModalStyle();
  constructor(props: any) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(): React.ReactNode {
    const body = (
      <Box
        style={this.modalStyle}
        // className = {this.classes.paper}
      >
        <Box>
          <Box
            padding={"10px 10px"}
            display={"flex"}
            justifyContent={"space-between"}
            className="boldText"
          >
            <Box>Edit Client</Box>
            <Box onClick={this.handleClose} className={"closeIcon"}>
              <AiOutlineClose />
            </Box>
          </Box>
          <Box component={"hr"} marginY={"2vh"} />

          <Box width={"90%"} margin={"auto"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              border={"1px dotted black"}
              height={"180px"}
            >
              <Box
                margin={"auto"}
                display={"flex"}
                fontSize={"14px"}
                alignItems={"center"}
              >
                <BiCloudUpload size={"25px"} />
                <Box marginLeft={"5px"}>UPLOAD COVER IMAGE</Box>
              </Box>
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Workspace Name</Box>
              <TextField
               style={{backgroundColor:"#EBEBEB"}}
               disabled={true}
                variant={"outlined"}
                placeholder="Telecom"
                fullWidth
                size={"small"}
              />
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Client Name</Box>
              <TextField
                style={{backgroundColor:"#EBEBEB"}}
                disabled={true}
                variant={"outlined"}
                placeholder="Telecom"
                fullWidth
                size={"small"}
              />
            </Box>
            <Box
              marginY={"1.5vh"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box width={"20%"}>
                <Box className={"labelModal"}>Client Id</Box>
                <TextField
                 style={{backgroundColor:"#EBEBEB"}}
                 disabled={true}
                  variant={"outlined"}
                  placeholder="Telecom"
                  fullWidth
                  size={"small"}
                />
              </Box>
              <Box width={"75%"}>
                <Box className={"labelModal"}>Team Title</Box>
                <TextField
                  variant={"outlined"}
                  placeholder="Type title here"
                  fullWidth
                  size={"small"}
                />
              </Box>
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Description</Box>
              <TextField
                multiline
                minRows={4}
                variant={"outlined"}
                placeholder="Type here"
                fullWidth
                size={"small"}
              />
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Team Leader</Box>
              <TextField
                variant={"outlined"}
                placeholder="Search User"
                fullWidth
                size={"small"}
              />
            </Box>
          </Box>
          <Box component={"hr"} marginY={"2vh"} />
          <Box
            display={"flex"}
            justifyContent={"end"}
            marginY={"2vh"}
            width={"90%"}
            margin={"auto"}
          >
            <Button
              variant={"contained"}
              color={"default"}
              style={{ textTransform: "none",fontWeight:"bold",width:"25%",padding:"8px 50px" }}
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              color={"default"}
              style={{
                color: "white",
                backgroundColor: "#4EABF8",
                marginLeft: "10px",
                textTransform: "none",fontWeight:"bold",width:"25%",padding:"8px 50px"
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    );

    return (
      <>
        <Box>
        <Box onClick={this.handleOpen}>Edit</Box>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "25rem",
    borderRadius:"5px",
    fontFamily: "sans-serif",
    backgroundColor: "white",

    // boxShadow: theme.shadows[5],
  };
}

class AddSubFolderModal extends Component<{}, { open: boolean,diff_1:string }> {

  modalStyle: any = getModalStyle();
  constructor(props: any) {
    super(props);

    this.state = {
      open: false,
      diff_1:"diff"
    };
  }

  handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(): React.ReactNode {
    const body = (
      <Box
        style={this.modalStyle}
        // className = {this.classes.paper}
      >
        <Box>
          <Box
            padding={"10px 10px"}
            display={"flex"}
            justifyContent={"space-between"}
            className="boldText"
          >
            <Box>Add Client</Box>
            <Box onClick={this.handleClose} className={"closeIcon"}>
              <AiOutlineClose />
            </Box>
          </Box>
          <Box component={"hr"} marginY={"2vh"} />

          <Box width={"90%"} margin={"auto"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              border={"1px dotted black"}
              height={"180px"}
            >
              <Box
                margin={"auto"}
                display={"flex"}
                fontSize={"14px"}
                alignItems={"center"}
              >
                <BiCloudUpload size={"25px"} />
                <Box marginLeft={"5px"}>UPLOAD COVER IMAGE</Box>
              </Box>
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Workspace Name</Box>
              <TextField
               style={{backgroundColor:"#EBEBEB"}}
               disabled={true}
                variant={"outlined"}
                placeholder="Telecom"
                fullWidth
                size={"small"}
              />
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Client Name</Box>
              <TextField
                style={{backgroundColor:"#EBEBEB"}}
                disabled={true}
                variant={"outlined"}
                placeholder="Telecom"
                fullWidth
                size={"small"}
              />
            </Box>
            <Box
              marginY={"1.5vh"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box width={"20%"}>
                <Box className={"labelModal"}>Client Id</Box>
                <TextField
                 style={{backgroundColor:"#EBEBEB"}}
                 disabled={true}
                  variant={"outlined"}
                  placeholder="Telecom"
                  fullWidth
                  size={"small"}
                />
              </Box>
              <Box width={"75%"}>
                <Box className={"labelModal"}>Team Title</Box>
                <TextField
                  variant={"outlined"}
                  placeholder="Type title here"
                  fullWidth
                  size={"small"}
                />
              </Box>
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Description</Box>
              <TextField
                multiline
                minRows={4}
                variant={"outlined"}
                placeholder="Type here"
                fullWidth
                size={"small"}
              />
            </Box>
            <Box marginY={"1.5vh"}>
              <Box className={"labelModal"}>Team Leader</Box>
              <TextField
                variant={"outlined"}
                placeholder="Search User"
                fullWidth
                size={"small"}
              />
            </Box>
          </Box>
          <Box component={"hr"} marginY={"2vh"} />
          <Box
            display={"flex"}
            justifyContent={"end"}
            marginY={"2vh"}
            width={"90%"}
            margin={"auto"}
          >
            <Button
              variant={"contained"}
              color={"default"}
              style={{ textTransform: "none",fontWeight:"bold",width:"25%",padding:"8px 50px" }}
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              color={"default"}
              style={{
                color: "white",
                backgroundColor: "#4EABF8",
                marginLeft: "10px",
                textTransform: "none",fontWeight:"bold",width:"25%",padding:"8px 50px"
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    );

    return (
      <>
        <Box>
          <Button
            onClick={this.handleOpen}
            size={"large"}
            variant={"contained"}
            style={{
              textTransform: "none",
              backgroundColor: "#42A5F5",
              color: "white",
              height:"38px",
              fontWeight:"bold"
            }}
           
          >
            Add Sub Folder
          </Button>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

function getDeleteModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "20rem",
    borderRadius:"5px",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
  };
}

class DeleteSubFolderModal extends Component<{}, { open: boolean ,diff_3:string}> {
  modalStyle: any = getDeleteModalStyle();
  constructor(props: any) {
    super(props);

    this.state = {
      open: false,
      diff_3:"diff1"
    };
  }

  handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(): React.ReactNode {
    const body = (
      <Box style={this.modalStyle}>
        <Box
          marginTop={"1vh"}
          className={"boldText"}
          display={"flex"}
          justifyContent={"space-between"}
          paddingX={"20px"}
          paddingY={"10px"}
        >
          <Box>Delete Subfolder?</Box>
          <Box onClick={this.handleClose} className={"close"}>
            <AiOutlineClose />
          </Box>
        </Box>
        <Box component={"hr"} />
        <Box
          textAlign={"center"}
          marginY={"30px"}
          className={"deleteModalText"}
        >
          Are you sure to delete Qatar Subfolder
        </Box>
        <Box component={"hr"} />
        <Box
          display={"flex"}
          justifyContent={"end"}
          marginY={"2vh"}
          width={"90%"}
          margin={"auto"}
        >
          <Button
            variant={"contained"}
            color={"default"}
            style={{ textTransform: "none",
          fontWeight:"bold",width:"25%",padding:"8px 50px" }}
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"default"}
            style={{
              marginLeft: "10px",
              textTransform: "none",
              fontWeight:"bold",width:"25%",padding:"8px 50px"
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    );

    return (
      <>
        <Box>
          <Box onClick={this.handleOpen}>Delete</Box>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

// Customizable Area End
