
import React from "react";

// Customizable Area Start

import {
  Box,
  Grid,
  Button,
  Card,
  Link,
  Avatar,
  Divider,
  ListItem,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import SearchBar from "material-ui-search-bar";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PhoneInput from "react-phone-input-2";
import {uploadimage} from "./assets";
import { modalCheck } from "./assets";
import { logo } from "./assets";
export const configJSONBase = require("../../../framework/src/config");
import './style.css';
// Customizable Area End

import AdminClientManagementController, {
    Props,
  } from "./AdminClientManagementController";
// Customizable Area Start

  export default class AdminClientSubfolder extends AdminClientManagementController {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): any {
    let token = localStorage.getItem("token")
    if(token) {
        console.log("calling get user")
        this.getClients()
        console.log("Workspace name: ", this.state.clientworkspace)
        
    }
  }

  cancelSearch = () => {
    this.getClients();  
    this.setState({searchlistdisplay: false})
    this.setState({searchclient: ""})
    this.setState({searchedclientData: []})
    this.setState({searchlist: ""})
  }

  addsubfolder = () => {
    console.clear()
    console.log("Add subfolder client button clicked");
    this.setState({
      addsubfoldermodal: true
    })
    this.setState({addsubfoldershow: true})
  }

  handleAddsubfolder = () => {
    if(this.state.newclientdescription != 0) {
      this.setState({iserroradd: false})
    }
    else {
      this.setState({iserroradd: true})
    } 
  }

  render() {

    return (
      <>
        <div style={webStyle.divnav}>
            <h3 style={webStyle.headnav} className="headnavbar">Client Management</h3>
        </div>

        <div style={webStyle.container} className="boxcontainerprofile">

            <Box style={webStyle.mainbox}>
                <SearchBar
                    placeholder="Search Client"
                    value={this.state.searchclient}
                    style={webStyle.searchbarstyle}
                />

                <Button style={webStyle.addClientButtonTop} 
                onClick={this.addsubfolder}
                >
                    <span className="buttontext">Add Subfolder</span>
                </Button>
            </Box>

            <Box style={webStyle.maincontentbox}>
              <Grid container style={webStyle.csgridcontainer}>
                <Grid item lg={3} style={webStyle.csgriditem}>
                  <Card style={webStyle.cardstyle}>
                    <div style={webStyle.cardsize}>
                      <div style={webStyle.threedotcontent}>
                      <EditIcon style={webStyle.editicon}/>
                      </div>
                      <div style={webStyle.contentdisplay}>
                        <Card style={webStyle.avatarStyle}>
                          <img src={logo}  alt="client logo image"/>
                        </Card>
                        <p>
                          id : 1
                        </p>
                        <p>
                          <b>client Subfolder name</b></p> 
                        <p>
                          Description
                        </p>
                        <Box style={webStyle.dividerboxstyle1}>
                          <p>
                            Team Leader 
                            <AvatarGroup max={3}>
                            </AvatarGroup>
                          </p>
                        </Box>
                        <Divider />
                        <Box style={webStyle.dividerboxstyle2}>
                        <Button>
                        <h4>More info</h4>
                        </Button>
                        </Box>
                      </div>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Box>

        </div>

        <div className="modal-boxes">
            {this.state.addsubfoldershow && (
                <Modal style={webStyle.modalbackdrop}
                  open={this.state.addsubfoldermodal}
                  onClose={this.handleCloseaddsubfolder}
                  className="modalbackdrop"
                >
                    <div style={webStyle.modalcontentsuccess} className="modalcontentsuccess">
                      <div style={webStyle.modalContent}>
                        <div style={webStyle.addclientmodaldiv}>
                          <div style={webStyle.addclientseconddiv}>
                            <h4>Add subfolder</h4>
                            <CloseIcon  onClick={this.handleCloseaddsubfolder} style={webStyle.closebuttonstyle}/>
                          </div>
                        </div>
                        <div style={webStyle.addclientmaincontentdiv}>
                          <div style={webStyle.addclientdivcontent} className="addclientdivcontent">
                            <div style={webStyle.addclientcontentdiv}>
                              <label className="input-label" htmlFor="input-label">
                                <div style={webStyle.imageupload}>
                                  {this.state.imageuploadclient ? 
                                  <>
                                  <img src={URL.createObjectURL(this.state.imageuploadclient)} style={webStyle.imageinside} />
                                  <p>UPLOAD CLIENT LOGO</p>
                                  </> :  
                                  <>
                                  <img src={uploadimage}
                                  style={{width: 30, height: 30}} 
                                  />
                                  </>}
                                </div>
                                <input
                                    id="input-label"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    // onChange={(e) => this.handleImage(e)}

                                />
                                <br/>
                                {/* <span>UPLOAD CLIENT LOGO</span> */}
                                
                              </label>
                              {this.state.imageuploadclient === "" && this.state.iserroradd && <p style={webStyle.errorineditandadd}>Image is required</p>}
                            </div>
                            <div style={webStyle.addclientelements}>
                              <p>
                                Workspace Name
                              </p>
                              <TextField variant="outlined" fullWidth 
                                placeholder={this.state.newclientworkspacename}
                                value={this.state.newclientworkspacename} disabled 
                                style={webStyle.textfieldstyledisabled}
                              />
                              <p>
                                Client Name
                              </p>
                              <TextField variant="outlined" fullWidth 
                                placeholder={this.state.newclientname}
                                value={this.state.newclientname} disabled
                                style={webStyle.textfieldstyledisabled}
                                // style={webStyle.textfieldstyle}
                              />
                              <div style={{display: "flex", flexDirection: "row",justifyContent: "space-between"}}>
                                <div>
                                  <p>
                                    Client ID
                                  </p>
                                  <TextField variant="outlined"
                                    placeholder={this.state.clientid}
                                    value={this.state.clientid} disabled
                                    style={webStyle.textfieldstyleddisabledclientid}
                                    // style={webStyle.textfieldstyle}
                                  />
                                </div>
                                <div>
                                  <p>
                                    Team title
                                  </p>
                                  <TextField variant="outlined" fullWidth 
                                    placeholder="Type title here"
                                    value={this.state.clientid}
                                    style={webStyle.textfieldstyledteamtitle}
                                    // style={webStyle.textfieldstyle}
                                  />
                                </div>

                              </div>
                              
                              <p>
                                Description
                              </p>
                              <TextField variant="outlined" fullWidth multiline rows={5}
                                placeholder="Type client description here"
                                value={this.state.newclientdescription} style={webStyle.textfieldstyle}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                {this.setState({newclientdescription: e.target.value})}} 
                              />
                                {
                                  this.state.newclientdescription === "" && 
                                  this.state.iserroradd && 
                                  <p style={webStyle.errorineditandadd}>
                                    Description is required
                                  </p>
                                }

                              <p>
                                Team Leaders
                              </p>
                              <TextField variant="outlined" fullWidth placeholder="search user"
                                style={webStyle.textfieldstyle}
                                value={this.state.newsearchteamlead}
                              />
                                {
                                  this.state.teamleaddisplay &&
                                  this.state.clientteamleads.map((member: any) => {
                                    console.clear()
                                    console.log(member.id, member.attributes.first_name)
                                  })
                                }

                            </div>
                          </div>
                        </div>
                        <div style={webStyle.addclientbuttonstyle}>
                          <Button style={webStyle.cancelButton} onClick={this.handleCloseaddsubfolder}>Cancel</Button>
                          <Button style={webStyle.addClientButton} onClick={this.handleAddsubfolder}>Add</Button>
                        </div>

                      </div>
                    </div>                  
                </Modal>)
            }

        </div>

            </>
            
    );
  }
}

// Customizable Area End


// Customizable Area Start

const webStyle = {
divnav: {
    display: "flex",
    justifyContent: "flex-start",
    fontFamily: "sans-serif",
},

headnav: {
    marginLeft: 280,
    marginTop: -45,
    zIndex: 1300
},

container: {
    backgroundColor: "#eeeeee", 
    height: "100%", 
    color: "#5f5f5f", 
    fontFamily: "sans-serif",
    width: "85vw",
    top: "50px",
    right:0,
    padding:"30px 20px 10px 0px",
},

mainbox: {
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    marginLeft: 20,
  },

  maincontentbox: {
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    marginLeft: 20,
    marginTop: 20,
  },

  csgridcontainer: {
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    marginLeft: 10,
    marginTop: 20,
    // marginRight: 10,
  },

  csgriditem: {
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    // marginRight: 10,
    // marginLeft: 20,
    // marginTop: 20,
  },

  cardstyle: {
    justifyContent: "center", 
    alignContent: "center", 
    display: "flex", 
    flexDirection: "column", 
    height: 530,
    width: 300,
    marginBottom: 20,
  } as React.CSSProperties,

  cardsize: {
    height: 500,
  },

  threedotcontent: {
    display: "flex", 
    justifyContent:"flex-end", 
    alignContent:"flex-end",
    alignItems: "flex-end", 
    marginRight: 10,
    height: 20,
  },

  editicon: {
    marginTop: 10
  },

  contentdisplay: {
    margin: 10, 
    padding: 10, 
    justifyContent: "center", 
    alignContent: "center", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    height: 440
  } as React.CSSProperties,

  avatarStyle: {
    height: 175, 
    width: 272,
  },

  dividerboxstyle1: {
    borderBlockStart: "1px solid rgb(204, 204, 204)", 
    gap: "0.6rem", 
    width: "260px", 
    justifyContent: "center", 
    alignContent: "center", 
    alignItems: "center", 
    display: "flex",
    marginLeft: 5, 
    marginRight: 5, 
    height: 80,
  },
  
  dividerboxstyle2: {
    borderBlockStart: "1px solid rgb(204, 204, 204)", 
    gap: "0.6rem", 
    width: "260px", 
    justifyContent: "center", 
    alignContent: "center", 
    alignItems: "center", 
    display: "flex",
    marginLeft: 5, 
    marginRight: 5, 
  },

  searchbarstyle: {
    height:"40px", 
    width: "360px", 
    border: "1px solid grey", 
    borderRadius: "5px",
    marginLeft: 10
  },

  addClientButtonTop: {
    display: "flex", 
    width: "160px", 
    border: "1px solid #cecece",
    height: "40px", 
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    marginLeft: 10, 
    color: "black",
    fontWeight: 600,
    borderRadius: 7,
    marginRight: 10,
  },

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

  modalcontentsuccess: {
    width: "30%",
    height: "85%",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    alignItems: "left",
    justifyContent: "space-around",
    margin: 20,
  },

  modalContent: {
    margin: 20,
    marginTop: -10,
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

  addclientmodaldiv: {
    backgroundColor: "white", 
    marginLeft: -20, 
    marginRight: -20
  },

  addclientseconddiv: {
    display: "flex", 
    justifyContent: "space-between", 
    marginLeft: 20, 
    marginRight: 20,
    marginTop: 10,
  },

  closebuttonstyle: {
    marginTop: 20,
    backgroundColor: "#e8e8e8",
    borderRadius: 25,
  },

  addclientmaincontentdiv: {
    // backgroundColor: "#e8e8e8", 
    marginLeft: -20, 
    marginRight: -20, 
    marginBottom: 10
  },

  addclientdivcontent: {
    display: "flex", 
    flexDirection: "column",  
    marginLeft: 20, 
    marginRight: 20,
  } as React.CSSProperties,

  addclientcontentdiv: {
    marginTop: 20
  },

  imageupload: {
    backgroundColor: "white", 
    borderStyle: "dashed", 
    borderColor: "grey", 
    width: 465, 
    height: 166, 
    alignItems: "center"
  },
  
  imageinside: {
    width: 120,
    height: 110,
    backgroundColor: "white",
  } as React.CSSProperties,

  errorineditandadd: {
    color: "red", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
  },
  
  addclientelements: {
    marginBottom: 20
  },

  textfieldstyle: {
    backgroundColor: "white", 
    borderRadius: 12,
  },

  textfieldstylephone: {
    backgroundColor: "white", 
    borderRadius: 7, 
    width: "100%"
  },


  textfieldstyledisabled: {
    backgroundColor: "lightgrey", 
    // borderRadius: 12,
  },
  
  textfieldstyleddisabledclientid: {
    backgroundColor: "lightgrey",
    // borderRadius: 10,
    width: 140,
  },

  textfieldstyledteamtitle: {
    borderRadius: 12,
    width: 310,
  },

  addclientbuttonstyle: {
    backgroundColor: "white", 
    marginTop: 20, 
    display: "flex", 
    justifyContent: "flex-end"
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
  },
  
  addClientButton: {
    display: "flex", 
    width: "100px", 
    border: "1px solid #cecece",
    height: "40px", 
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    marginLeft: 10, 
    color: "black",
    fontWeight: 600,
  },
  

}


// Customizable Area End

