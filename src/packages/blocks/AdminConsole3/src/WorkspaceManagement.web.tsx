import React from "react";
// Customizable Area Start
import {
    Box,
    Button,
    Grid,
    Card,
    Avatar,
    Modal,
    TextField,
    Tooltip,
    Typography,
    IconButton,
    Badge,
    Container
} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {EditOutlined, Close} from "@material-ui/icons";
export const configJSONBase = require("../../../framework/src/config");
import { modalCheck, uploadimage } from "./assets";
// Customizable Area End

import WorkspaceManagementController, { Props } from "./WorkspaceManagementController";

export default class WorkspaceManagement extends WorkspaceManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  componentDidMount(): any {
    let token = localStorage.getItem("token")
    if(token) {
        console.log("calling get user")
        this.handleGetWorkspace()
    }
  }

  // Customizable Area Start
  
   FormRow(row: any) {
    const results =
      row &&
      row.map((user: any) => {
        const name = user.attributes.first_name
          ? `${user.attributes.first_name} ${user.attributes.last_name}`
          : "default";
  
        const imgPartial = this.parseImg(user.attributes.image);
  
        return (
          <React.Fragment key={user.id}>
            <Grid item xs={4} key={user.id}>
              <Box style={{ ...webStyle.formContainer }}>
                <Avatar style={webStyle.formAvatar} alt={name} src={imgPartial} key={name} />
                <Box component="span" style={webStyle.formToolTipContainer} onClick={() => this.handleSearchItemClick(user)}>
                  <Tooltip title={name} aria-label={`tooltip-${name}`}>
                    <Typography noWrap={true} style={webStyle.toolTipTypography}>
                      {this.nerfNames(name)}
                    </Typography>
                  </Tooltip>
                </Box>
                <IconButton size="small" onClick={() => this.handleSearchCloseClick(user.id)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          </React.Fragment>
        );
      });
    return <React.Fragment>{results}</React.Fragment>;
  }

   FilterResults() {
    const row: any = this.state.availableAdmin;
    const secondrow: any = this.state.unavailableAdmin;
    const searches = row.filter((user: any) => {const name = user.attributes.first_name? `${user.attributes.first_name} ${user.attributes.last_name}`: "default";
      return name.trim().toLowerCase().includes(this.state.adminSearchValue)
    })
    const unavailsearches = secondrow.filter((unavailuser: any) => { const unavailnames = unavailuser.attributes.first_name ? `${unavailuser.attributes.first_name} ${unavailuser.attributes.last_name}`: "default";
      return unavailnames.trim().toLowerCase().includes(this.state.adminSearchValue)
    })
  
    return (
      this.state.adminSearchValue.trim().length && (searches.length || unavailsearches.length)? (
        <React.Fragment>
          <Box style={webStyle.filterContainer}>
            <Grid container spacing={1}>
              {this.FormRow(searches)}
            </Grid>
          </Box>
          <Box style={webStyle.filterContainerdisable}>
            <Grid container spacing={1}>
              {this.FormRow(unavailsearches)}
            </Grid>
          </Box>
        </React.Fragment>
      ) : null
    );
  }

  AdminRow(row: any) {
    const results =
      row &&
      row.map((user: any) => {const excessstyle = this.state.Admins.map((admin: any) => {
          if (String(admin.id) !== user.id) return undefined;
            return admin.id;
      }).filter((item: string | undefined) => item !== undefined).length ? webStyle.formActivePick : {};  
      const name = user.attributes.first_name ? `${user.attributes.first_name} ${user.attributes.last_name}` : "default";
      const imgPartial = this.parseImg(user.attributes.image);
  
        return (
          <React.Fragment key={user.id}>
            <Grid item xs={4} key={user.id}>
              <Box style={{ ...webStyle.formContainer, ...excessstyle }}>
                <Avatar style={webStyle.formAvatar} alt={name} src={imgPartial} key={name}/>
                <Box component="span" style={webStyle.formToolTipContainer} onClick={() => this.handleSearchItemClick(user)}>
                  <Tooltip title={name} aria-label={`tooltip-${name}`}>
                    <Typography noWrap={true} style={webStyle.toolTipTypography}>
                      {this.nerfNames(name)}
                    </Typography>
                  </Tooltip>
                </Box>
                <IconButton size="small" onClick={() => this.handleSearchCloseClick(user.id)} style={webStyle.excessIcon}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          </React.Fragment>
        );
      });
    return <React.Fragment>{results}</React.Fragment>;
  }

  AdminResults() {
    const row: any = this.state.Admins;
    return (
      <React.Fragment>
        <Box style={webStyle.filterContainer}>
          <Grid container spacing={1}>
            {this.AdminRow(row)}
          </Grid>
        </Box>
      </React.Fragment>
  
    );
  }

  renderAddWorkspace = () => {
    if(this.state.addworkspaceModal) {
        const resultsFilter =Boolean(this.state.availableAdmin.length || this.state.unavailableAdmin.length) && this.FilterResults();
        const adminFilter = Boolean(this.state.Admins.length) && this.AdminResults();
        return (
            <Modal style={webStyle.modalbackdrop} open={this.state.addworkspaceModal} onClose={this.handleClose}>
                  <div style={webStyle.modalcontentsuccess}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Add Workspace</h4>
                                        <Close  onClick={this.handleClose} style={webStyle.closebuttonstyle}/>
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.addworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.addworkspacecontentdiv}>
                                        <Box style={webStyle.addimage}>  
                                            <label className="input-label" htmlFor="input-label">
                                            {this.state.addWorkspaceImage ?
                                                <>
                                                <img src={URL.createObjectURL(this.state.addWorkspaceImage)} style={webStyle.addimagesize}/>
                                                </> :
                                                <div style={{display: "flex"}}>
                                                <img src={uploadimage}
                                                style={{width: 30, height: 30}}
                                                />
                                                {this.state.addWorkspaceImage === "" && <span style={webStyle.uploadimage}>UPLOAD COVER IMAGE</span>}
                                                </div>}
                                                <input
                                                    id="input-label"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden onChange={(e) => this.handleImage(e)} />
                                                    <br/>
                                            </label>
                                        </Box>
                                    </div>
                                    <div style={webStyle.addworkspaceelements}>
                                        <p style={webStyle.modaltextboxheader}><strong>Workspace Name</strong></p>
                                        <TextField variant="outlined" fullWidth  placeholder="Title goes here" value={this.state.addWorkspaceName} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({addWorkspaceName: e.target.value})}}/>
                                        {this.state.addWorkspaceName.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.validateWorkspaceName}</p>}
                                        {this.state.clientnameunique.length != 0 && <p style={webStyle.errorMessageDisplay}>{this.state.clientnameunique}</p>}
                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.addWorkspaceDescription}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({addWorkspaceDescription: e.target.value})}}/>
                                        {this.state.addWorkspaceDescription.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.validateWorkspaceDescription}</p>}
                                        <p style={webStyle.modaltextboxheader}><strong>Workspace Admin</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Search user" value={this.state.searchWorkspaceAdmin} onChange={(e: any) => this.searchAdmin(e)}/>
                                        {this.state.Admins.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.validateWorkspaceAdmins}</p>}
                                        {resultsFilter}
                                        {adminFilter}
                                    </div>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacebuttonstyle}>
                                <Button style={webStyle.cancelButton} onClick={this.handleClose}>Cancel</Button>
                                <Button style={webStyle.addworkspaceButton} onClick={this.handleAddWorkspace}>Add</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
        )
    }
  }

  renderEditWorkspace = () => {
    const resultsFilter =Boolean(this.state.availableAdmin.length || this.state.unavailableAdmin.length) && this.FilterResults();
    const adminFilter = Boolean(this.state.Admins.length) && this.AdminResults();
    if(this.state.editworkspaceModal) {
        return (
            <Modal style={webStyle.modalbackdrop} open={this.state.editworkspaceModal} onClose={this.handleCloseEdit}>
                  <div style={webStyle.modalcontentsuccess}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Edit Workspace</h4>
                                        <Close  onClick={this.handleCloseEdit} style={webStyle.closebuttonstyle}/>
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.addworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.addworkspacecontentdiv}>
                                        <Box style={webStyle.saveimage}>
                                            <label className="input-label" htmlFor="input-label"> 
                                                {/* <img src={this.state.editWorkspaceImage} style={{width: 260, height: 200}} /> */}
                                                {/* {this.state.isEditMode? <img src={URL.createObjectURL(this.state.uploadedworkspaceimage)} style={{width: 260, height: 200}}/> : <img src={this.state.editWorkspaceImage} style={{width: 260, height: 200}}/>} 
                                                <input id="input-label" type="file" accept="image/*" hidden onChange={(e) => this.handleImageEdit(e)} />
                                                <Button style={webStyle.coverimagechangebutton}>Change Workspace Cover Image</Button>                                                 */}
                                            
                                                <Badge badgeContent={<Box><input accept="image/*" id="contained-button-file" type="file" hidden onChange={(e) => this.handleImageEdit(e)}/><label htmlFor="contained-button-file"><Button variant="contained" component="span" style={webStyle.coverimagechangebutton}>Change Cover Image</Button></label></Box>} overlap="rectangular" anchorOrigin={{vertical: 'top',horizontal: 'right'}}>
                                                    {this.state.isEditMode? <img src={URL.createObjectURL(this.state.uploadedworkspaceimage)} style={webStyle.imagesizeedit}/> : <img src={this.state.editWorkspaceImage} alt="NO WORKSPACE IMAGE" style={webStyle.imagesizeeditsecond}/>}
                                                </Badge> 
                                            </label>
                                        </Box>
                                    </div>
                                    <div style={webStyle.addworkspaceelements}>
                                        <p style={webStyle.modaltextboxheader}><strong>Workspace Name</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Title goes here" value={this.state.editWorkspaceName} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({editWorkspaceName: e.target.value})}}/>
                                        {this.state.editWorkspaceName.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.validateWorkspaceName}</p>}
                                        {this.state.clientnameunique.length != 0 && <p style={webStyle.errorMessageDisplay}>{this.state.clientnameunique}</p>}
                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.editWorkspacedescription} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({editWorkspacedescription: e.target.value})}}/>
                                        {this.state.editWorkspacedescription.length === 0 &&<p style={webStyle.errorMessageDisplay}>{this.state.validateWorkspaceDescription}</p>}
                                        <p style={webStyle.modaltextboxheader}><strong>Workspace Admin</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Search user" value={this.state.searchWorkspaceAdmin} onChange={(e: any) => this.searchAdmin(e)}/>
                                        {this.state.Admins.length === 0 &&<p style={webStyle.errorMessageDisplay}>{this.state.validateWorkspaceAdmins}</p>}
                                        {resultsFilter}
                                        {adminFilter}
                                    </div>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacebuttonstyle}>
                                <Button style={webStyle.cancelButton} onClick={this.handleCloseEdit}>Cancel</Button>
                                <Button style={webStyle.addworkspaceButton} onClick={(e) => this.handleSaveEdit(this.state.editworkspace_id, e)}>Save</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
        )
    }
  }

  renderSuccessModal = () => {
    if(this.state.successAlertModal) {
        return (
            <Modal className="modalbackdrop" style={webStyle.modalbackdrop} open={this.state.successAlertModal} onClose={this.handleSuccessAlertModalClose} >
                <div className="modalcontentsuccess" style={webStyle.modalsuccesspopup}>
                    <div className="modalbox" style={webStyle.modalbox}>
                        <img src={modalCheck} className="modalcheck" style={webStyle.modalcheck}/>
                    </div>

                    <Typography className="modalcontent" style={webStyle.modalcontent}>
                    <b>{this.state.modalsuccessmessage}</b>
                    </Typography>
                    <Typography className="modalcontent" style={webStyle.modalcontent}>
                    <b>Successfully!</b>
                    </Typography>
                    <div style={webStyle.button}>
                        <Button className="modalbutton" style={webStyle.modalbutton} onClick={this.handleSuccessAlertModalClose}>
                            ok
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
  }

  // Customizable Area End

  render() {
    return (
        // Customizable Area Start
        <div style={webStyle.maincontainer}>
            <Box style={webStyle.headingBox}>
                <h4 style={webStyle.pageHeader}>Workspace Management</h4>
                <Button style={webStyle.addWorkspaceButtontop} onClick={this.handleaddWorkspace}>Add Workspace</Button>
            </Box>
            <Box style={webStyle.contentbox}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" spacing={2}>
                            <Grid container spacing={1} style={webStyle.innerGridcontainer}>
                                {this.state.workspaceList?.map((workspace: any) => {
                                    return(
                                        <Grid item sm={12} md={6} lg={4}>
                                            <Card style={webStyle.workspaceCard}>   
                                                <Box style={webStyle.imagebox}>
                                                    <Badge badgeContent={<EditOutlined onClick={(e: any) => this.handleEditWorkspace(workspace?.id, e)} style={webStyle.badgeStyle}/>} overlap="rectangular" anchorOrigin={{vertical: 'top',horizontal: 'right'}}>
                                                    {workspace?.attributes?.image != null ? <img src={workspace?.attributes?.image} alt="NO WORKSPACE IMAGE"  style={webStyle.coverimage}/> : <p style={webStyle.coverimageText}> NO WORKSPACE IMAGE</p>}
                                                    </Badge>
                                                </Box>
                                                <Box style={webStyle.titleandDescription}>
                                                    <p style={webStyle.greyText}>id : {workspace?.id}</p>
                                                    <h4>{workspace?.attributes?.name}</h4>
                                                    <Container style={{height: 100, overflow: "scroll"}}>
                                                        <p style={webStyle.greyText}>
                                                          {workspace?.attributes?.description.split("\n").map((i: any, key: any) => {
                                                            return <p key={key} style={webStyle.newlinep}>{i}</p>
                                                          })}
                                                        </p>
                                                    </Container>
                                                </Box>
                                                <Box>
                                                    <div style={webStyle.admindisplay}>
                                                        <p style={webStyle.adminMargin}>Admin</p>
                                                        <AvatarGroup max={4}>
                                                            {workspace?.attributes?.admins?.data?.map((admin: any,  int: number) => {
                                                                const name= `${admin?.attributes?.first_name} ${admin?.attributes?.last_name}`
                                                                return (
                                                                    <div style={{ zIndex: 1, border: "0px solid #fafafa"}}>
                                                                        <Tooltip title={name} aria-label={`tooltip-${name}`} key={int}>
                                                                            <Avatar src={configJSONBase.baseURL+admin?.attributes?.image} />
                                                                        </Tooltip>
                                                                    </div>
                                                                )
                                                            })}
                                                        </AvatarGroup>
                                                    </div>
                                                </Box>                                                
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            {this.renderAddWorkspace()}
            {this.renderEditWorkspace()}
            {this.renderSuccessModal()}

        </div>
        // Customizable Area End
    );
  }
}

// Customizable Area Start
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

    headingBox: {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        marginLeft: 10,
        marginTop: 10,
    },

    pageHeader: {
        marginLeft: 0,
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
        height: 250,
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
        alignItems: "center"
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

    modaltextboxheader: {
        color: "#7a7a7a"
    },

    addimage: {
        width: 455,
        height: 200,
        border: "2px dashed #e8e8e8",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
        alignItems: "center"
    },

    addimagesize: {
        width: 455,
        height: 205,
        marginTop: 20,
    },

    saveimage: {
        width: 455,
        height: 200,
        border: "1px dolid #e8e8e8",
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
        backgroundColor: "#f4f4f4",
        textTransform: "none",
        display: "flex",
        justifyContent: "flex-end",
        alignContent: "flex-end",
        alignItems: "flex-end",
        right: 90,
        top:25,
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
        height: 251, 
        width: 349,
        display: "inherit",
        flexGrow: 1,
        color: "#bababa",
        textAlign: "center",
        lineHeight: "220px",
        border: 0,
    } as React.CSSProperties,

    coverimageText: {
      height: 251, 
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

};
// Customizable Area End
