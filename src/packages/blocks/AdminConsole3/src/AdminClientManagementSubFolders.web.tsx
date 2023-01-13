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
    Badge,
    Container,
    Menu,
    MenuItem,
    Link,
    IconButton,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {Close} from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
export const configJSONBase = require("../../../framework/src/config");
import { modalCheck, uploadimage } from "./assets";
// Customizable Area End

import ClientSubfolderSuperadminController, {Props} from "./ClientSubfolderSuperadminController";

export default class AdminClientManagementSubFolders extends ClientSubfolderSuperadminController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount(): any {
    let token = localStorage.getItem("token")
    if(token) {
        this.getClientData()
        this.handleGetSubfolderList()
    }
  }

  parseImg(img: string | null) {
    if (!img) return undefined;
    const imageLink = configJSONBase.baseURL;
    const imageFragment =
      typeof img === "string" && img.split("/").includes("rails");
    const imgSrc = imageFragment ? `${imageLink}/${img}` : img;
    return imgSrc;
  }

  nerfNames = (data: string) => {
    if (data) {
      const charLength = 10;
      if (data.length > 8) {
        const processedString = data.substring(0, charLength).concat("..");
        return processedString.length <= 11 ? data : processedString;
      }
    }
    return data;
  }

  handleTemplateDetailRedirect = (subfolder: any) => {
    const { id, attributes  } = subfolder;
    const { template, template_completed, workspace, client_management, team_title} = attributes;
      if (template_completed && template?.id) {
        this.props.history.push(`/reviewChecklist?cid=${client_management?.id}&sfid=${id}&tid=${template?.id}`)
      }
      else this.props.history.push(`/template?cid=${client_management?.id}&sfid=${id}`)
      const breadcrumb_data = {
        workspace: { id: workspace?.id, name: workspace?.name },
        client: { id: client_management?.id, name: client_management?.client_name },
        subfolder: { id: id, name: team_title },
        template_name: template?.attributes?.title
      }
      localStorage.setItem('breadcrumb_data', JSON.stringify(breadcrumb_data))
  }

  FormRow(row: any) {
    const results =
      row && row.map((user: any) => {const name = user.attributes.first_name? `${user.attributes.first_name} ${user.attributes.last_name}`: "default";
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

  FormRowUnavailable(row: any) {
    const results =
      row && row.map((user: any) => {const name = user.attributes.first_name? `${user.attributes.first_name} ${user.attributes.last_name}`: "default";
        const imgPartial = this.parseImg(user.attributes.image);
  
        return (
          <React.Fragment key={user.id}>
            <Grid item xs={4} key={user.id}>
              <Button style={{ ...webStyle.formContainerunavailable}} disabled>
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
              </Button>
            </Grid>
          </React.Fragment>
        );
      });
    return <React.Fragment>{results}</React.Fragment>;
  }

   FilterResults() {
    const row: any = this.state.availableTL;
    const secondrow: any = this.state.unavailableTL;
    const searches = row.filter((user: any) => {const name = user.attributes.first_name? `${user.attributes.first_name} ${user.attributes.last_name}`: "default";
      return name.trim().toLowerCase().includes(this.state.teamLeadSearchValue)
    })
    const unavailsearches = secondrow.filter((unavailuser: any) => { const unavailnames = unavailuser.attributes.first_name ? `${unavailuser.attributes.first_name} ${unavailuser.attributes.last_name}`: "default";
      return unavailnames.trim().toLowerCase().includes(this.state.teamLeadSearchValue)
    })
  
    return (
      this.state.teamLeadSearchValue.trim().length && (searches.length || unavailsearches.length)? (
        <React.Fragment>
          <Box style={webStyle.filterContainer}>
            <Grid container spacing={1}>
              {this.FormRow(searches)}
            </Grid>
          </Box>
          <Box style={webStyle.filterContainerdisable}>
            <Grid container spacing={1}>
              {this.FormRowUnavailable(unavailsearches)}
            </Grid>
          </Box>
        </React.Fragment>
      ) : null
    );
  }

  AdminRow(row: any) {
    const results =row &&row.map((user: any) => {const excessstyle = this.state.teamLeaders.map((admin: any) => {
          if (String(admin.id) !== user.id) {return undefined}
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
    const row: any = this.state.teamLeaders;
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

  renderAddSubfolder = () => {
    if(this.state.addClientSubfolderModal) {
        const resultsFilter =Boolean(this.state.availableTL.length || this.state.unavailableTL.length) && this.FilterResults();
        const teamLeaderFilter = Boolean(this.state.teamLeaders.length) && this.AdminResults();
        return (
            <Modal style={webStyle.modalbackdrop} open={this.state.addClientSubfolderModal} onClose={this.handleCloseAddSubfolderModal} data-test-id={"addModalpopup"}>
                  <div style={webStyle.modalcontentsuccess}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Add subfolder</h4>
                                        <Close  onClick={this.handleCloseAddSubfolderModal} style={webStyle.closebuttonstyle}/>
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.addworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.addworkspacecontentdiv}>
                                        <Box style={webStyle.addimage}>  
                                            <label className="input-label" htmlFor="input-label">
                                            {this.state.addSubfolderImage ?
                                                <>
                                                <img src={URL.createObjectURL(this.state.addSubfolderImage)} style={webStyle.addimagesize}/>
                                                </> :
                                                <div style={{display: "flex"}}>
                                                <img src={uploadimage}
                                                style={{width: 30, height: 30}}
                                                />
                                                {this.state.addSubfolderImage === "" && <span style={webStyle.uploadimage}><b>UPLOAD COVER IMAGE</b></span>}
                                                </div>}
                                                <input
                                                    id="input-label"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden onChange={(e) => this.handleImage(e)} />
                                                    <br/>
                                            </label>
                                        </Box>
                                        {this.state.addSubfolderImage.length === 0 && <p  style={webStyle.errorMessageDisplay}>{this.state.imageValidation}</p>}
                                    </div>
                                    <div style={webStyle.addworkspaceelements}>
                                        <p style={webStyle.modaltextboxheader}><strong>Workspace Name</strong></p>
                                        <TextField variant="outlined" fullWidth  placeholder="Title goes here" value={this.state.subfolderWorkspaceName} disabled style={webStyle.textfieldDisabled}/>
                                        <p style={webStyle.modaltextboxheader}><strong>Client Name</strong></p>
                                        <TextField variant="outlined" fullWidth  placeholder="Title goes here" value={this.state.subfolderClientName} disabled style={webStyle.textfieldDisabled}/>
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={3}>
                                                <p style={webStyle.modaltextboxheader}><strong>Client id</strong></p>
                                                <TextField variant="outlined" fullWidth  placeholder="Title goes here" value={this.state.subfolderClientId} disabled style={webStyle.textfieldDisabled}/>
                                                </Grid>
                                                <Grid item xs={9}>
                                                <p style={webStyle.modaltextboxheader}><strong>Team title</strong></p>
                                                <TextField variant="outlined" fullWidth  placeholder="Type title here" value={this.state.addSubfolderTeamTitle} style={{backgroundColor: "white"}}
                                                onChange={(e: any) => this.setState({addSubfolderTeamTitle: e.target.value})}/>
                                                {this.state.addSubfolderTeamTitle.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.teamTitleValidation}</p>}
                                                {this.state.errorInAddEdit && <p style={webStyle.errorMessageDisplay}>Subfolder name already exist</p>}
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.addSubfolderDescription} style={{backgroundColor: "white"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({addSubfolderDescription: e.target.value})}}/>
                                        {this.state.addSubfolderDescription.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.validateSubfolderDescription}</p>}
                                        <p style={webStyle.modaltextboxheader}><strong>Team leader</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Search user" value={this.state.searchSubfolderTeamLeader} onChange={(e) => this.searchTeamLead(e)} style={{backgroundColor: "white"}}/>
                                        {this.state.teamLeaders.length === 0 && <p  style={webStyle.errorMessageDisplay}>{this.state.teamLeaderValidation}</p>}
                                        {resultsFilter}
                                        {teamLeaderFilter}
                                    </div>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacebuttonstyle}>
                                <Button style={webStyle.cancelButton} onClick={this.handleCloseAddSubfolderModal}>Cancel</Button>
                                <Button style={webStyle.addworkspaceButton} onClick={this.handleAddSubfolderValidation}>Add</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
        )
    }

  }

  renderEditSubfolder = () => {
    if(this.state.editClientSubfolderModal) {
        const resultsFilter =Boolean(this.state.availableTL.length  || this.state.unavailableTL.length) && this.FilterResults();
        const teamLeaderFilter = Boolean(this.state.teamLeaders.length) && this.AdminResults();
        return (
            <Modal style={webStyle.modalbackdrop} open={this.state.editClientSubfolderModal} onClose={this.handleCloseEditSubfolderModal}>
                  <div style={webStyle.modalcontentsuccess}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Edit subfolder</h4>
                                        <Close  onClick={this.handleCloseEditSubfolderModal} style={webStyle.closebuttonstyle}/>
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.addworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.addworkspacecontentdiv}>
                                        <Box style={webStyle.saveimage}>
                                        {this.state.isEditMode? <img src={URL.createObjectURL(this.state.uploadedSubfolderImage)} style={{width: 455, height: 200}}/> : <img src={this.state.editSubfolderImage} alt="NO WORKSPACE IMAGE" style={{width: 455, height: 200, color: "#bababa", textAlign: "center", lineHeight: "170px"}}/>}
                                        </Box>
                                        <label htmlFor="contained-button-file">
                                            <input accept="image/*" id="contained-button-file" type="file" hidden onChange={(e) => this.handleImageEdit(e)}/>
                                                <br/><span style={webStyle.coverimagechangebutton}>Update Cover Image</span>
                                        </label>
                                        {this.state.isEditMode ? (this.state.uploadedSubfolderImage.length === 0 &&<p style={webStyle.errorMessageDisplay}>{this.state.imageValidation}</p>) : (this.state.editSubfolderImage.length === 0 &&<p style={webStyle.errorMessageDisplay}>{this.state.imageValidation}</p>)}
                                    </div>
                                    <div style={webStyle.addworkspaceelements}>
                                        <p style={webStyle.modaltextboxheader}><strong>Workspace Name</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Title goes here" value={this.state.subfolderWorkspaceName} disabled style={webStyle.textfieldDisabled}/>
                                        <p style={webStyle.modaltextboxheader}><strong>Client Name</strong></p>
                                        <TextField variant="outlined" fullWidth  placeholder="Title goes here" value={this.state.subfolderClientName} disabled style={webStyle.textfieldDisabled}/>
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={3}>
                                                <p style={webStyle.modaltextboxheader}><strong>Client id</strong></p>
                                                <TextField variant="outlined" fullWidth  placeholder="Title goes here" value={this.state.subfolderClientId} disabled style={webStyle.textfieldDisabled}/>
                                                </Grid>
                                                <Grid item xs={9}>
                                                <p style={webStyle.modaltextboxheader}><strong>Team title</strong></p>
                                                <TextField variant="outlined" fullWidth  placeholder="Type title here" value={this.state.editSubfolderTeamtitle} onChange={(e: any) => this.setState({editSubfolderTeamtitle: e.target.value})} style={{backgroundColor: "white"}}/>
                                                {this.state.editSubfolderTeamtitle.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.teamTitleValidation}</p>}
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.editsubfolderDescription}  style={{backgroundColor: "white"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({editsubfolderDescription: e.target.value})}}/>
                                        <p style={webStyle.modaltextboxheader}><strong>Team leader</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Search user" value={this.state.searchSubfolderTeamLeader} onChange={(e) => this.searchTeamLead(e)} style={{backgroundColor: "white"}}/>
                                        {this.state.teamLeaders.length === 0 && <p  style={webStyle.errorMessageDisplay}>{this.state.teamLeaderValidation}</p>}
                                        {resultsFilter}
                                        {teamLeaderFilter}
                                    </div>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacebuttonstyle}>
                                <Button style={webStyle.cancelButton} onClick={this.handleCloseEditSubfolderModal}>Cancel</Button>
                                <Button style={webStyle.addworkspaceButton} onClick={(e) => this.handleUpdateSubfoldervalidation(this.state.subfolder_id, e)}>Save</Button>
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

  renderDeleteSubfolder = () => {
    if(this.state.deleteClientSubfolderModal) {
        return (
            <Modal style={webStyle.modalbackdrop} open={this.state.deleteClientSubfolderModal} onClose={this.handleCloseDeleteSubfolderModalOpen} data-test-id={"addModalpopup"}>
                  <div style={webStyle.modalcontentsuccessdelete}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Delete Subfolder?</h4>
                                        <Close  onClick={this.handleCloseDeleteSubfolderModalOpen} style={webStyle.closebuttonstyle}/>
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.deleteworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.deleteworkspacecontentdiv}>
                                            <p style={webStyle.greyText}>Are you sure, you want to delete<br/>
                                            {this.state.deleteClientSubfolderName} subfolder</p>
                                    </div>
                                </div>
                            </div>
                            <div style={webStyle.deleteworkspacebuttonstyle}>
                                <Button style={webStyle.cancelButton} onClick={this.handleCloseDeleteSubfolderModalOpen}>Cancel</Button>
                                <Button style={webStyle.cancelButton} onClick={(e) => this.deleteSubfolderData(this.state.selectedSubfolder, e)}>Yes</Button>
                            </div>
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
                <div  style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <div>
                        <h4 style={webStyle.pageHeader}>Client Subfolder</h4>
                        <p style={webStyle.pageHeaderSubclient}>
                        <Link href={"/clientmanagement"} style={webStyle.gobacklink}>{this.state.subfolderClientName}</Link> {">"} Subfolder</p>
                    </div>
                    <SearchBar placeholder="Search Sub Folder" style={{height: 40, marginLeft: 15}} value={this.state.searchsubclient} onChange={this.requestSearch} onCancelSearch={this.cancelSearch}/>
                </div>
                <div style={{display: "flex", flexDirection: "row", }}>
                    <Button style={webStyle.addWorkspaceButtontop} onClick={this.handleAddSubfolderModalOpen}>Add Sub Folder</Button>
                </div>
            </Box>
            <Box style={webStyle.contentbox}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" spacing={2}>
                            <Grid container spacing={2} style={webStyle.innerGridcontainer}>
                                {this.state.subfolderList.filter((subfolder: any) => {
                                    if(!this.state.searchsubclient)return true
                                    if(subfolder.attributes.team_title.toLocaleLowerCase()?.includes(this.state.searchsubclient.toLocaleLowerCase()))return true
                                    }).map((subfolder: any, id: any) => {
                                    return (
                                        <Grid item sm={12} md={6} lg={3} key={id}>
                                            <Card style={webStyle.workspaceCard}>   
                                                <Box style={webStyle.imagebox}>
                                                    <Badge badgeContent={
                                                        <div>
                                                            <EditIcon onClick={(e: any) =>this.handleEditSubfolderAdminModalOpen(subfolder?.id, e)} style={webStyle.badgeStyle}/>
                                                        </div>} 
                                                    overlap="rectangular" anchorOrigin={{vertical: 'top',horizontal: 'right'}}>
                                                    {subfolder?.attributes?.image != null ? <img src={subfolder?.attributes?.image} alt="NO WORKSPACE IMAGE"  style={webStyle.coverimage}/> : <p style={webStyle.coverimageText}> NO SUBFOLDER IMAGE</p>}
                                                    </Badge>
                                                </Box>
                                                <Box style={webStyle.titleandDescription}>
                                                    <h4>{subfolder?.attributes?.team_title}</h4>
                                                    <Container style={{height: 100, overflow: "scroll"}}>
                                                        <p style={webStyle.greyText}>
                                                        {subfolder?.attributes?.description.split("\n").map((i: any, key: any) => {
                                                            return <p key={key} style={webStyle.newlinep}>{i}</p>
                                                          })}
                                                        </p>
                                                    </Container>
                                                </Box>
                                                <Box>
                                                    <div style={webStyle.admindisplay}>
                                                        <p style={webStyle.adminMargin}>Team Leader</p>
                                                        <AvatarGroup max={3}>
                                                            {subfolder?.attributes?.team_leaders?.data?.map((admin: any,  int: number) => {
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
                                                <Box>
                                                    <div style={webStyle.templateDetail}>
                                                        <Button onClick={(e: any) => this.handleTemplateDetailRedirect(subfolder)} style={webStyle.templateDetailText}>Template details</Button>
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

            {this.renderAddSubfolder()}
            {this.renderEditSubfolder()}
            {this.renderSuccessModal()}
            {this.renderDeleteSubfolder()}

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
        marginBottom: 0,
    },

    pageHeaderSubclient: {
        marginTop: 3,
        fontSize: 12,
        color: "#0000008a"
    },

    addWorkspaceButtontop: {
        display: "flex",
        width: "160px",
        border: "1px solid #cecece",
        height: "40px",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        marginLeft: 10,
        color: "black",
        marginRight: -5,
        textTransform: 'none',
        fontWeight: "bold"
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
        height: 150,
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
        fontWeight: "bold",
        textDecoration: "none",
        textTransform: "none",
        marginTop: 5,
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

    modalcontentsuccessdelete: {
        width: 370,
        height: 218,
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
        backgroundColor: "#f8f8f8",
        marginBottom: 10,
        borderBottom: "1px solid #e8e8e8",
    },

    addworkspacedivcontent: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 20,
        marginRight: 20,
    } as React.CSSProperties,

    deleteworkspacedivcontent: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 20,
        marginRight: 20,
        marginTop: -13
    } as React.CSSProperties,
      
    addworkspacecontentdiv: {
        marginTop: 20
    },

    deleteworkspacecontentdiv :{
        marginTop: 20,
        marginBottom: 10,
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

    deleteworkspacebuttonstyle: {
        backgroundColor: "white",
        marginTop: 10,
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
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        marginLeft: 10,
        color: "black",
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
        alignItems: "center",
        backgroundColor: "white",
    },

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
        textTransform: "none",
      } as React.CSSProperties,

      formContainerunavailable :{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(155, 155, 155, .5)",
        gap: "0.1rem",
        borderRadius: "4px", 
        paddingInline: "8px", 
        paddingBlock: "0.2rem",
        color: "rgba(155, 155, 155, 1)",
        textTransform: "none",
        width: 145,
      } as React.CSSProperties,

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
        textTransform: "none",
    } as React.CSSProperties,

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
        height: 150, 
        width: 2,
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
      marginLeft: 7,
    } as React.CSSProperties,

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

    linkRef: {
        color: "#42a5f5",
        fontSize: "16px",
        fontWeight: "bold",
        textDecoration: "none",
        textTransform: "none"
    }as React.CSSProperties,

};
// Customizable Area End
