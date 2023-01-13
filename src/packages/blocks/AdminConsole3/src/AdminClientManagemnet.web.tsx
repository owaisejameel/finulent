
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
  Modal,
  TextField,
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";
import Close from '@material-ui/icons/Close';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import SearchBar from "material-ui-search-bar";
import EditIcon from '@material-ui/icons/Edit';
import PhoneInput from "react-phone-input-2";
import {uploadimage, modalCheck} from "./assets";
export const configJSONBase = require("../../../framework/src/config");
import './style.css';
// Customizable Area End
import AdminClientManagementController, {
    Props,
  } from "./AdminClientManagementController";
// Customizable Area Start
  export default class AdminClientManagement extends AdminClientManagementController {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): any {
    let token = localStorage.getItem("token")
    if(token) {
        this.getClients()
    }
}

addclient = () => {
    this.setState({
      isSuccessModal: true
    })
    this.setState({modalOpen: true})
}

isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}


addNewClientCheck = () => {
  if(this.state.newclientemail != 0){
    let value = this.isValidEmail(this.state.newclientemail)
    if (value) {
      this.setState({emailvalidate: false})
    }
    else {
      this.setState({emailvalidate: true})
    }
}
    if(this.state.newclientname != 0 && this.state.imageuploadclient != 0 && (this.state.newclientemail?.length === 0 || this.state.newclientemail == "")) {
      this.addNewClient()
      this.setState({iserroradd: false})
    }
    else if(this.state.newclientname != 0 && this.state.imageuploadclient != 0 && this.state.newclientemail){
      let emailResult = this.isValidEmail(this.state.newclientemail)
      emailResult ? this.addNewClient() : this.setState({iserroradd: true})
    }
  else {
    this.setState({iserroradd: true})
  }
}

handleEdit = (item: any, e: any) => {
  this.state.clientData.data.map((client: any) => {
    if (client.id === item) {
      const adminString = client.attributes.team_leaders.data.map((user: any) =>`${user.attributes.first_name} ${user.attributes.last_name}`).join("; ");
      this.setState(
        (prev) => {
          return {
            ...prev,
            teamLeaders: client.attributes.team_leaders.data,
            adminString,
          };
        },
      );
      return client;
    }
    return undefined;
  });
  this.setState({
    isSuccessEdit: true
  })
  this.setState({editModalOpen: true})
  this.showClientDetails(item);
}

showClientdetails = (item: any, e: any) => {
  this.setState({isSuccessShow: true})
  this.setState({showModalOpen: true})
  this.showClientDetails(item);
}

handleSaveButtonFunction = (item: any, e: any) => {
  let workspace_id = localStorage.getItem('workspace_id')
  this.setState({clientworkspaceid: workspace_id})
  if(this.state.clientname != 0 && (this.state.clientemail?.length === 0 || this.state.clientemail == null)) {
    this.handleSaveClientUpdate(item)
  }
  else if(this.state.clientemail != 0 && this.state.clientname != 0) {
    let result =  this.isValidEmail (this.state.clientemail)
    result ? this.handleSaveClientUpdate(item) : this.setState({emailvalidate: true})
  }
  else {
    this.setState({iserroredit: true})
  }
}


setclient = (id: any, e: any) => {
  {this.state.clientteamleads.map((item: any) => {
    if(item.id === id) {
      this.setState({updateteamLead: [...this.state.updateteamLead, id]})
    }
  })}
  this.setState({teamleadid: id})
  this.setState({teamleadidlist: [...this.state.teamleadidlist,id]})
}

setclientnewteamlead = (id: any, e: any) => {
  {this.state.clientteamleads.map((item: any) => {
    if(item.id === id) {
      this.setState({newteamLeads: [...this.state.newteamLeads, this.state.clientteamleads[item.id]]})
    }
  })}
  this.setState({teamleadid: id})
}

requestSearch = (e: any) => {
  this.setState({searchclient: e})
};

cancelSearch = () => {
  this.setState({searchclient:""})
  this.requestSearch(this.state.searchclient);
  this.setState({searchclient:""})
}

handleremoveteamlead = (id: any, e: any) => {
this.setState({teamleaddisplay: false})
let arrays = this.state.clientteamleads;
{this.state.clientteamleads.map((item: any) => {
  if(item.id === id) {
    let index = arrays.indexOf(item.id)
    if (index !== -1) {
      arrays.splice(index, 1);
    }
  }
})}
}

searchTeamLead = (e: any) => {
 {this.setState({searchteamlead: e.target.value})}
  this.setState({ adminSearchValue: e.target.value.toLocaleLowerCase()});
this.getTeamLead(this.state.searchteamlead)
}
newSearchteamlead = (e: any) => {
  this.setState({newsearchteamlead: e.target.value})
  this.setState({searchteamlead: e.target.value})
  this.setState({ adminSearchValue: e.target.value.toLocaleLowerCase()});
  this.getTeamLead(this.state.searchteamlead)
}

displaydescription = (data: any) => {
  if(data) {
    const charLength = true ? 120 : 100;
    if (data.length > 100) {
      return data.substring(0, charLength).concat("....");
    }
    return data;
  }
}

displayclientName = (data: any) => {
  if(data) {
    const charLength = true ? 20 : 15;
    if (data.length > 20) {
      return data.substring(0, charLength).concat("....");
    }

    return data;
  }
}

handleImage = (e: any) => {
  this.setState({imageuploadclient: e.target.files[0],})
}

handleImageEdit = (e: any) => {
  this.setState({isEditmode: true})
  this.setState({updatedclientlogo: e.target.files[0],})
}

handleNavigationLink(id: any) {
  sessionStorage.setItem("id", id)
};

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
              <Avatar
                style={webStyle.formAvatar}
                alt={name}
                src={imgPartial}
                key={name}
              />
              <Box
                component="span"
                style={webStyle.formToolTipContainer}
                onClick={() => this.handleSearchItemClick(user)}
              >
                <Tooltip title={name} aria-label={`tooltip-${name}`}>
                  <Typography noWrap={true} style={webStyle.toolTipTypography}>
                    {this.nerfNames(name)}
                  </Typography>
                </Tooltip>
              </Box>
              <IconButton
                size="small"
                onClick={() => this.handleSearchCloseClick(user.id)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </React.Fragment>
      );
    });
  return <React.Fragment>{results}</React.Fragment>;
}

FormRowUnavaialble(row: any) {
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
            <Button style={{ ...webStyle.formContainer }} disabled>
              <Avatar
                style={webStyle.formAvatar}
                alt={name}
                src={imgPartial}
                key={name}
              />
              <Box
                component="span"
                style={webStyle.formToolTipContainer}
                onClick={() => this.handleSearchItemClick(user)}
              >
                <Tooltip title={name} aria-label={`tooltip-${name}`}>
                  <Typography noWrap={true} style={webStyle.toolTipTypography}>
                    {this.nerfNames(name)}
                  </Typography>
                </Tooltip>
              </Box>
              <IconButton
                size="small"
                onClick={() => this.handleSearchCloseClick(user.id)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Button>
          </Grid>
        </React.Fragment>
      );
    });
  return <React.Fragment>{results}</React.Fragment>;
}

renderAdmins() {
  const admins = this.state.teamLeaders.map(
    (user: any) =>
      `${user.attributes.first_name} ${user.attributes.last_name}`
  );

  this.setState({ adminString: admins.join("; ") });
}


handleSearchItemClick(payload: any) {
  const data = this.state.teamLeaders.filter(
    (user: any) => user.id === payload.id
  ).length;
  if (data) return;
  this.setState(
    (prev) => {
      return {
        ...prev,
        teamLeaders: prev.teamLeaders.concat(payload),
      };
    },
    () => {
      this.renderAdmins();
    }
  );
}

handleSearchCloseClick(id: string) {
  this.setState(
    {
      teamLeaders: this.state.teamLeaders.filter(
        (user: any) => String(user.id) !== id
      ),
    },
    () => {
      this.renderAdmins();
    }
  );
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

AdminRow(row: any) {
  const results =
    row &&
    row.map((user: any) => {
      const excessstyle = this.state.teamLeaders
        .map((admin: any) => {
          if (String(admin.id) !== user.id) return undefined;
          return admin.id;
        })
        .filter((item: string | undefined) => item !== undefined).length
        ? webStyle.formActivePick
        : {};

      const name = user.attributes.first_name
        ? `${user.attributes.first_name} ${user.attributes.last_name}`
        : "default";

      const imgPartial = this.parseImg(user.attributes.image);

      return (
        <React.Fragment key={user.id}>
          <Grid item xs={4} key={user.id}>
            <Box style={{ ...webStyle.formContainer, ...excessstyle }}>
              <Avatar
                style={webStyle.formAvatar}
                alt={name}
                src={imgPartial}
                key={name}
              />
              <Box
                component="span"
                style={webStyle.formToolTipContainer}
                onClick={() => this.handleSearchItemClick(user)}
              >
                <Tooltip title={name} aria-label={`tooltip-${name}`}>
                  <Typography noWrap={true} style={webStyle.toolTipTypography}>
                    {this.nerfNames(name)}
                  </Typography>
                </Tooltip>
              </Box>
              <IconButton
                size="small"
                onClick={() => this.handleSearchCloseClick(user.id)}
                style={webStyle.excessIcon}
              >
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

FilterResults() {
  const row: any = this.state.availableTL;
  const secondrow: any = this.state.unavailableTL;
  const searches = row.filter((user: any) => {
    const name = user.attributes.first_name
      ? `${user.attributes.first_name} ${user.attributes.last_name}`
      : "default";
    return name.trim().toLowerCase().includes(this.state.adminSearchValue)
  })
  const unavailsearches = secondrow.filter((unavailuser: any) => {
    const unavailnames = unavailuser.attributes.first_name ? `${unavailuser.attributes.first_name} ${unavailuser.attributes.last_name}`: "default";
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
            {this.FormRowUnavaialble(unavailsearches)}
          </Grid>
        </Box>
      </React.Fragment>
    ) : null
  );
}

handleAdminSearch = (event: any) => {
  const value = event.target.value;
  this.setState({ adminSearchValue: value.toLocaleLowerCase(),
  });
};

handleMoreInfoRedirect = (e: any, item: any) => {
  e.stopPropagation();
  const { id, attributes  } = item;
  const { team_leaders, template, template_completed, workspace, client_name } = attributes;
  if (team_leaders?.data?.length != 0) {
    if (template_completed && template?.id) {
      this.props.history.push(`/reviewChecklist?cid=${id}&tid=${template?.id}`)
    }
    else this.props.history.push(`/template?cid=${id}`)
    const breadcrumb_data = {
      workspace: { id: workspace?.id, name: workspace?.name },
      client: { id: id, name: client_name },
      template_name: template?.attributes?.title
    }
    localStorage.setItem('breadcrumb_data', JSON.stringify(breadcrumb_data))
  }
  else { this.props.history.push(`/clientsubfolders?cid=${id}`); }
}

renderAddClient = () => {
  if(this.state.modalOpen) {
    const resultsFilter = Boolean(this.state.availableTL.length || this.state.unavailableTL.length) && this.FilterResults();
    const adminFilter = Boolean(this.state.teamLeaders.length) && this.AdminResults();
    return (
    <Modal className="modalbackdrop"
    style={webStyle.modalbackdrop}
    open={this.state.isSuccessModal}
    onClose={this.handleClose}
  >
    <div className="modalcontentsuccess"
    style={webStyle.modalcontentsuccess}
    >
      <div style={webStyle.modalContent}>
        <div style={webStyle.addclientmodaldiv}>
        <div style={webStyle.addclientseconddiv}>
          <h4>Add Client</h4>
          <Close  onClick={this.handleClose} style={webStyle.closebuttonstyle}/>
        </div>
        </div>
        <div style={webStyle.addclientmaincontentdiv}>
        <div style={webStyle.addclientdivcontent} className="addclientdivcontent">
          <div style={webStyle.addclientcontentdiv}>
          <label className="input-label" htmlFor="input-label">
              <Avatar style={webStyle.imageupload}>
                {this.state.imageuploadclient ?
                <>
                <img src={URL.createObjectURL(this.state.imageuploadclient)} style={webStyle.imageinside} />
                </> :
                <>
                <img src={uploadimage}
                style={{width: 30, height: 30}}
                />
                </>}
              </Avatar>
              <input
                  id="input-label"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => this.handleImage(e)}

              />
                      <br/>
                      <span>UPLOAD CLIENT LOGO</span>

          </label>
          {this.state.imageuploadclient.length === 0 && this.state.iserroradd &&  <p style={webStyle.errorineditandadd}>Image required</p>}
          </div>
          <div style={webStyle.addclientelements}>
          <p>Client Name</p>
          <TextField variant="outlined" fullWidth placeholder="Type name here"
          value={this.state.newclientname} style={webStyle.textfieldstyle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
          {this.setState({newclientname: e.target.value})}} />
          {this.state.newclientname === "" && this.state.iserroradd && <p style={webStyle.errorineditandadd}>Client name is required</p>}
          {this.state.responseError[0]?.client_name === "has already been taken" && <p style={{color: "red"}}>Client Name already exist</p>}

          <p>Workspace Name</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.newclientworkspacename}
          value={this.state.newclientworkspacename} disabled style={webStyle.textfieldstyledisabled}
          />

          <p>Description</p>
          <TextField variant="outlined" fullWidth multiline rows={5}
          placeholder="Type client description here"
          value={this.state.newclientdescription} style={webStyle.textfieldstyle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {this.setState({newclientdescription: e.target.value})}} />

          <p>Contact Details</p>
           <PhoneInput
                      country={"in"}
                      enableSearch={true}
                      disableSearchIcon
                      inputStyle={webStyle.textfieldstylephone}
                      value={this.state.cellno}
                      onChange={(e)=>
                        {this.setState({newclientcontactno: e})}}
                  />
          <p>Client Address</p>
          <TextField variant="outlined" fullWidth multiline rows={3}
          placeholder="Client address here"
          value={this.state.newclientaddress} style={webStyle.textfieldstyle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {this.setState({newclientaddress: e.target.value})}} />

          <p>Team Leaders</p>
          <TextField variant="outlined" fullWidth placeholder="search user"
          style={webStyle.textfieldstyle}
          value={this.state.newsearchteamlead}
          onChange={(e: any) => this.newSearchteamlead(e)}
          />
          {resultsFilter}
          {adminFilter}
          <p>Client Official Email Address</p>
          <TextField variant="outlined" fullWidth placeholder="Client Official email id here"
          value={this.state.newclientemail} style={webStyle.textfieldstyle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
          {this.setState({newclientemail: e.target.value})}} />
          {(this.state.newclientemail != 0) && this.state.emailvalidate && <p style={webStyle.errorineditandadd}>Please enter proper email</p>}
        </div>
        </div>
        </div>
        <div style={webStyle.addclientbuttonstyle}>
          <Button style={webStyle.cancelButton} onClick={this.handleClose}>Cancel</Button>
          <Button style={webStyle.addClientButton} onClick={this.addNewClientCheck}>Add</Button>
        </div>
      </div>

    </div>
  </Modal>
 )}
}

renderEditClient = () => {
  const resultsFilter = Boolean(this.state.availableTL.length || this.state.unavailableTL.length) && this.FilterResults();
  const adminFilter = Boolean(this.state.teamLeaders.length) && this.AdminResults();
  if (this.state.editModalOpen) { 
    return (
    <Modal className="modalbackdrop"
    style={webStyle.modalbackdrop}
    open={this.state.isSuccessEdit}
    onClose={this.handleCloseEdit}
  >
    <div className="modalcontentsuccess"
    style={webStyle.modalcontentsuccess}
    >
      <div style={webStyle.modalContent}>
        <div style={webStyle.editclientmodaldiv}>
        <div style={webStyle.editclientdivcontent}>
          <h4>Edit Client</h4>
          <Close  onClick={this.handleCloseEdit} style={{marginTop: 20}}/>
        </div>
        </div>
        <div style={webStyle.editclientmaindiv}>
        <div style={webStyle.editclientmaindivcontent} className="editclientmaindivcontent">
          <div style={webStyle.editclientcontentdiv}>
          <label className="input-label" htmlFor="input-label">
              <Avatar style={webStyle.image}>
              {this.state.isEditmode ? <>
                <img src={URL.createObjectURL(this.state.updatedclientlogo)}  style={webStyle.imageinside}/>
                </> :
                <>
                <img src={this.state.clientlogo}
                style={webStyle.imageinside}/>
                </>}
              </Avatar>
              <input
                  id="input-label"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => this.handleImageEdit(e)}

              />
                      <br/>
                      <span style={webStyle.editclientuploadlogo}><b>Update client logo</b></span>

          </label>
          {this.state.isEditmode ? (this.state.updatedclientlogo.length === 0 &&<p style={webStyle.errorineditandadd}>Image is required</p>) : (this.state.clientlogo.length === 0 &&<p style={webStyle.errorineditandadd}>Image is required</p>)}
          </div>
          <div style={webStyle.editclientdivelements}>
          <p>Client Name</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.clientname}
          value={this.state.clientname} style={webStyle.textfieldstyle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
          {this.setState({clientname: e.target.value})}}/>

          {this.state.clientname === "" && this.state.iserroredit && <p style={webStyle.errorineditandadd}>Client name is required</p>}

          <p>Client id</p>
          <TextField variant="outlined" fullWidth disabled placeholder={this.state.client_id}
          value={this.state.client_id} style={webStyle.textfieldstyledisabled} />

          <p>Workspace Name</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.clientworkspace}
          value={this.state.clientworkspace} disabled style={webStyle.textfieldstyledisabled} />

          <p>Description</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.clientdescription}
          value={this.state.clientdescription} style={webStyle.textfieldstyle} multiline rows={5}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {this.setState({clientdescription: e.target.value})}} />

          <p>Contact Details</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.clientcontactno}
          value={this.state.clientcontactno} style={webStyle.textfieldstyle} type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {this.setState({clientcontactno: e.target.value})}} />
          <p>Client Address</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.clientaddress}
          value={this.state.clientaddress} style={webStyle.textfieldstyle} multiline rows={3}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {this.setState({clientaddress: e.target.value})}} />
          <p>Team Leaders</p>
          <TextField variant="outlined" fullWidth placeholder="search user"
          style={webStyle.textfieldstyle}
          value={this.state.searchteamlead}
          onChange={(e: any) => this.searchTeamLead(e)}
          name="adminSearchValue"
          />
          {resultsFilter}
          {adminFilter}


          <p>Client Official Email Address</p>
          <TextField variant="outlined" fullWidth placeholder={this.state.clientemail}
          value={this.state.clientemail === null ? "" : this.state.clientemail} style={webStyle.textfieldstyle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          {this.setState({clientemail: e.target.value})}} />
          {(this.state.clientemail != 0) && this.state.emailvalidate && <p style={webStyle.errorineditandadd}>Please enter proper email</p>}
        </div>
        </div>
        </div>
        <div style={webStyle.editclientbuttonstyle}>
          <Button style={webStyle.cancelButton} onClick={this.handleCloseEdit}>Cancel</Button>
          <Button style={webStyle.addClientButton} onClick={(e) =>this.handleSaveButtonFunction(this.state.clientid, e)}>Save</Button>
        </div>
      </div>

    </div>
  </Modal>
)}
}

renderShowClient = () => {
  if(this.state.showModalOpen) { 
    return (
    <Modal className="modalbackdrop"
    style={webStyle.modalbackdrop}
    open={this.state.isSuccessShow}
    onClose={this.handleCloseshow}
  >
    <div className="modalcontentsuccess"
    style={webStyle.modalcontentsuccess}
    >
      <div style={webStyle.modalContent}>
        <div style={webStyle.showclientmodaldiv}>
        <div style={webStyle.showclientmodaldivcontent}>

          <h4 style={webStyle.showclientname}>{this.state.clientname}</h4>
          <div style={webStyle.showclientcontentdiv}>
          <Button style={webStyle.showclienteditbutton} onClick={(e) =>this.handleEdit(this.state.clientid, e)}><b>edit</b></Button>
          <Close  onClick={this.handleCloseshow} style={webStyle.showclientclosebutton}/>
          </div>
        </div>
        </div>
        <div style={webStyle.showclientcontentmaindiv}>
        <div style={webStyle.showclientinsidecontentdiv} className="showclientinsidecontentdiv">
          <div style={webStyle.showclientcontents}>
          <label className="input-label" htmlFor="input-label">
              <Avatar style={webStyle.image}
              >
                <img src={this.state.clientlogo} style={webStyle.imageinside} />
              </Avatar>
          </label>
          </div>
          <div style={webStyle.showclientinnerbody}>
          <p style={webStyle.showclientinnername}><b>Client Name</b></p>

          <p style={webStyle.showclientnamep}>{this.state.clientname}</p>

          <p style={webStyle.showclienthead}><b>Client id</b></p>
          <p style={webStyle.showclientp}>{this.state.client_id}</p>

          <p style={webStyle.showclienthead}><b>Workspace Name</b></p>
          <p style={webStyle.showclientp}>{this.state.clientworkspace}</p>

          <p style={webStyle.showclienthead}><b>Description</b></p>
            <p style={webStyle.showclientp}>{this.state.clientdescription}</p>

          <p style={webStyle.showclienthead}><b>Contact Details</b></p>
          <p style={webStyle.showclientp}>{this.state.clientcontactno}</p>

          <p style={webStyle.showclienthead}><b>Client Address</b></p>
          <p style={webStyle.showclientp}>{this.state.clientaddress}</p>

          <p style={webStyle.showclienthead}><b>Team Leaders</b></p>
          <div style={webStyle.showclientteamlead} className="showclientteamlead">

           {this.state.clientteamleads?.data?.map((item: any) => {
            return (
              <div style={webStyle.showclientteamleaddiv} className="showclientteamlead">
                <div style={webStyle.showclientteamleaddiv}>
                <Avatar src={item?.attributes?.image} style={webStyle.showclientavatarteam}/><p style={webStyle.showclientteamavatarname}>{`${item?.attributes?.first_name} ${item?.attributes?.last_name}`}</p>
                </div>
              </div>
            )
           })}


          </div>

          <p style={webStyle.showclienthead}><b>Client Official email id</b></p>
          <p style={webStyle.showclientp}>{this.state.clientemail}</p>

        </div>
        </div>
        </div>
      </div>
    </div>
  </Modal>
)}
}

renderSuccessMessage = () => {
  if(this.state.successmodalpopup) {
    return(
    <Modal className="modalbackdrop"
    style={webStyle.modalbackdrop}
    open={this.state.issuccessmodaldisplay}
    onClose={this.handleClosemodalpopup}
  >
    <div className="modalcontentsuccess"
    style={webStyle.modalsuccesspopup}
    >
      <div className="modalbox"
      style={webStyle.modalbox}
      >
        <img
          src={modalCheck}
          className="modalcheck"
          style={webStyle.modalcheck}
        />
      </div>

      <Typography
      className="modalcontent"
      style={webStyle.modalcontent}
      >
        <b>{this.state.modalsuccessmessage}</b>
      </Typography>
      <Typography
      className="modalcontent"
      style={webStyle.modalcontent}
      >
        <b>Successfully!</b>
      </Typography>
      <div style={webStyle.button}>
      <Button
      className="modalbutton"
      style={webStyle.modalbutton}
        onClick={this.handleClosemodalpopup}
      >
            ok
      </Button>
      </div>
    </div>
  </Modal>
)}
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
                  onChange={this.requestSearch}
                  onCancelSearch={this.cancelSearch}
                  style={webStyle.searchbarstyle}
              />

              <Button style={webStyle.addClientButtonTop} onClick={this.addclient}>
                <span className="buttontext">Add Client</span>
              </Button>
          </Box>
          <Box style={webStyle.contentbox}>
            <Grid container>
              {this.state.clientData?.data ? 
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between" spacing={2}>
                    <Grid container  style={{marginLeft: 20}} spacing={1}>
                      {this.state.clientData.data.filter((item: any) => {
                        if(!this.state.searchclient)return true
                        if(item.attributes.client_name?.toLocaleLowerCase()?.includes(this.state.searchclient?.toLocaleLowerCase()))return true
                      }).map((item: any) => {
                        return (
                          <>
                          <Grid item sm={12} md={6} lg={3}>
                            <Card style={webStyle.maincardstyle} className="cardcontents maincardstyle">
                              <div style={webStyle.cardsize}>
                                <div style={webStyle.divcontent}>
                                  <EditIcon onClick={(e: any) =>this.handleEdit(item?.id, e)} style={webStyle.pencilicon}/>
                                </div>
                                <div  onClick={(e) =>this.showClientdetails(item.id,e)} style={webStyle.avatardivcontent} className="avatardivcontent">
                                  <Avatar style={webStyle.avatarclientlogo}>
                                    <img src={item?.attributes?.image} style={webStyle.imageinside}/>
                                  </Avatar>
                                  <p style={webStyle.idstyle}>ID : {item?.attributes?.client_id}</p>
                                  <p style={webStyle.clientnamestyle}><b>{this.displayclientName(item?.attributes.client_name)}</b></p>
                                  <p style={webStyle.descriptionstyle} className="descriptionstyle">{this.displaydescription(item?.attributes?.description)}</p>
                                  <Box style={webStyle.dividerboxstyle}>
                                    <p style={webStyle.workspacenamestyle}>Workspace  <b style={webStyle.workspaceitem}>{item?.attributes?.workspace?.name}</b></p>
                                  </Box>
                                  <Box style={webStyle.dividerboxstyle1}>
                                    <p style={webStyle.teamleaderstyle}>Team Leader
                                      <AvatarGroup max={3} style={webStyle.teamleaderavatar}>
                                        {item?.attributes?.team_leaders?.data?.map((teamid: any) => {
                                          return (
                                            <div>
                                              <Avatar src={configJSONBase.baseURL+this.state.imagevalue} />
                                            </div>
                                          )
                                        })}
                                      </AvatarGroup>
                                    </p>
                                  </Box>
                                  <Divider />
                                  <Box style={webStyle.dividerboxstyle2}>
                                    <Link onClick={(e: any) => this.handleMoreInfoRedirect(e, item)} style={{textDecoration: "none"}}>
                                      <Button style={webStyle.moreinfobutton} className="buttontext">More info</Button>
                                    </Link>
                                  </Box>
                                </div>
                              </div>
                            </Card>
                          </Grid>
                          </>
                        )
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              : <p></p>}
            </Grid>
          </Box>
        </div>

        {this.renderAddClient()}
        {this.renderEditClient()}
        {this.renderShowClient()}
        {this.renderSuccessMessage()}
            </>

    );
  }
}

// Customizable Area End


// Customizable Area Start

const webStyle = {
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

contentBody: {
    marginLeft: 30,
    marginRight: 60,
    marginBottom: 0,
},

mainGrid: {
  margin: 10,
},
image: {
    width: 120,
    height: 110
},

editGrid: {
    display: "flex",
    alignContent: "space-around",
    justifyContent: "flex-end",
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
  textTransform: "none",
} as React.CSSProperties,

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


body: {
    marginLeft: 60,
    marginTop: 150,
},

box: {
    marginTop: 10,
    marginBottom: 10
},

heading: {
    margin: 10
},

paragraph: {
    margin: 0,
    paddingLeft: 12,
},

paragraphlink: {
    margin: 0,
    paddingLeft: 12,
    color: "#64b1f3",
    fontWeight: 600,
},

paragraphlinkOther: {
    margin: 0,
    paddingLeft: 12,
    color: "rgb(243 180 21)",
    fontWeight: 600,
},

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

mainbox: {
  display:"flex",
  alignItems:"center",
  justifyContent:"space-between",
  marginLeft: 30,
},

contentbox: {
  display:"flex",
  alignItems:"center",
  marginLeft: 20,
  marginTop: 20,
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
 margin: 20,
 marginTop: -10,
},

cardcontents: {
  justifyContent: "center",
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  height: "100% !important",
  width: "30% important",
  marginRight: 20
},
searchbarstyle: {
  height:"40px",
  width: "360px",
  border: "1px solid grey",
  borderRadius: "5px",
  marginLeft: 6
},

cardsize: {
  height: 500,
},

maincardstyle: {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "1rem",
  height: "530px",
  marginBottom: 10,
} as React.CSSProperties,

divcontent: {
  display: "flex",
  justifyContent:"flex-end",
  alignContent:"flex-end",
  alignItems: "flex-end",
  marginRight: 10,
  height: 20,
},

pencilicon: {
  marginTop: 10
},

avatardivcontent: {
  margin: 10,
  padding: 10,
  justifyContent: "center",
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 440
} as React.CSSProperties,
avatarclientlogo: {
  width: 120,
  height: 110,
  marginTop: -20,
  border: "2px solid rgb(119, 119, 119)"
},
idstyle: {
  marginTop: 25,
  color: "rgb(119, 119, 119)",
  height: 30,
},
clientnamestyle: {
  marginTop: -5,
  height: 30,
},
descriptionstyle: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: -10,
  color: "rgb(119, 119, 119)",
  height: 80,
},
dividerboxstyle: {
  borderBlockStart: "1px solid rgb(204, 204, 204)",
  gap: "0.6rem",
  width: "260px",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  display: "flex",
  marginLeft: 5,
  marginRight: 5,
  height: 70,
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

workspacenamestyle: {
  color: "rgb(159, 160, 162)",
  marginLeft: 10
},
workspaceitem: {
  color: "black",
  marginLeft: 2
},
teamleaderstyle: {
  display: "flex",
  color: "rgb(159, 160, 162)",
  marginLeft: -8
},
teamleaderavatar: {
  marginTop: -10,
  marginLeft: 10
},
moreinfobutton: {
  color: "rgb(243 180 21)",
  marginTop: 10,
  marginBottom: -5,
  textTransform: "none",
  backgroundColor: "white",
  fontWeight: "bold",
  fontSize: "16px"
}  as React.CSSProperties,
addclientmodaldiv: {
  backgroundColor: "white",
  marginLeft: -20,
  marginRight: -20
},
addclientseconddiv: {
  display: "flex",
  justifyContent: "space-between",
  marginLeft: 20,
  marginRight: 20
},
closebuttonstyle: {
  marginTop: 20
},
addclientmaincontentdiv: {
  backgroundColor: "#e8e8e8",
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

addclientelements: {
  marginBottom: 20
},
addclientbuttonstyle: {
  backgroundColor: "white",
  marginTop: 20,
  display: "flex",
  justifyContent: "flex-end"
},

editclientmodaldiv: {
  backgroundColor: "white",
  marginLeft: -20,
  marginRight: -20
},
editclientdivcontent: {
  display: "flex",
  justifyContent: "space-between",
  marginLeft: 20,
  marginRight: 20
},
editclientmaindiv: {
  backgroundColor: "#e8e8e8",
  marginLeft: -20,
  marginRight: -20,
  marginBottom: 10
},
editclientmaindivcontent: {
  display: "flex",
  flexDirection: "column",
  marginLeft: 20,
  marginRight: 20,
} as React.CSSProperties,
editclientcontentdiv: {
  marginTop: 20
},
editclientuploadlogo: {
  color: "rgb(243 180 21)",
},
editclientdivelements: {
  marginBottom: 20
},
editclientteamleaddiv: {
  display: "flex",
  flexDirection: "row"
} as React.CSSProperties,

editclientteamleaddivblue: {
  display: "flex",
  flexDirection: "row"
} as React.CSSProperties,

editclientteamleadcard: {
  backgroundColor: "white",
  width: "180px",
  height: "50px",
   marginTop: "10px",
   marginRight: 10
  },

  editclientteamleadcardblue: {
    backgroundColor: "blue",
    width: "180px",
    height: "50px",
     marginTop: "10px",
     marginRight: 10
    },
  editclientinnerdiv: {
    display: "flex",
    justifyContent: "space-around"
  },
  editclientteamleadavatar: {
    width: 30,
    height:30,
    margin: 8
  },
  editclientteamleadname: {
    marginTop: 14
  },
  editclosebutton: {margin: 8},
  editclientbuttonstyle: {
    backgroundColor: "white",
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  },
  showclientmodaldiv: {
    backgroundColor: "white",
    marginLeft: -20,
    marginRight: -20
  },
  showclientmodaldivcontent: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20
  },
  showclientname: {
    marginTop: 23
  },
  showclientcontentdiv: {
    display: "flex",
    justifyContent: "space-around"
  },
  showclienteditbutton: {
    color: "rgb(243 180 21)",
    margin: 0,
    marginTop: 3,
    marginRight: 4,
    textTransform: "lowercase",
    fontSize: 16,
  }  as React.CSSProperties,

  showclientclosebutton: {
    marginTop: 20
  },
  showclientcontentmaindiv: {
    backgroundColor: "#e8e8e8",
    marginLeft: -20,
    marginRight: -20,
    marginBottom: 10
  },
  showclientinsidecontentdiv: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
  } as React.CSSProperties,
  showclientcontents: {marginTop: 20},
  showclientinnerbody: {marginBottom: "40px"},
  showclientinnername: {marginTop: 50},
  showclientnamep: {marginTop: -10, color: "rgb(119, 119, 119)"},
  showclienthead: {marginTop: 30},
  showclientp: {marginTop: -10, color: "rgb(119, 119, 119)"},
  showclientteamlead: {display: "flex",
  flexDirection: "row"
} as React.CSSProperties,
showclientteamleaddiv: {display: "flex",
flexDirection: "row"
}as React.CSSProperties,
showclientavatarteam: {marginTop: -10,},
showclientteamavatarname: {marginTop: 2, marginLeft: 5, color: "rgb(119, 119, 119)"},

errorineditandadd: {color: "red", display: "flex", justifyContent: "center", alignItems: "center"},

textfieldstyle: {backgroundColor: "white", borderRadius: 12,},
textfieldstylephone: {backgroundColor: "white", borderRadius: 7, width: "100%"},
textfieldstyledisabled: {backgroundColor: "lightgrey", borderRadius: 12,},
imageupload: {backgroundColor: "white", borderStyle: "dashed", borderColor: "grey", width: 100, height: 100, alignItems: "center"},
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
loginbtn: {
  color: "black",
  fontWeight: 600,
  fontSize: "14px",
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

imageinside: {
  width: 120,
  height: 110,
  backgroundColor: "white",
} as React.CSSProperties,


teamAvatar: { width: 32, height: 32, marginInlineEnd: "0.1rem" },

AvatarContainer: {
  display: "flex",
  paddingBlock: "1rem",
  alignItems: "center",
  gap: ".5rem",
},

workspaceAvatar: { width: 40, height: 40 },

formActivePick: { backgroundColor: "#42a5f5", color: "#fff" },

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

formAvatar: { width: 32, height: 32, backgroundColor: "grey" },
formToolTipContainer: { cursor: "pointer" },
toolTipTypography: {
  flexWrap: "nowrap",
  display: "flex",
  fontSize: "small",
} as React.CSSProperties,
excessIcon: {
  color: "white"
},

filterContainer: {
  paddingBlockStart: "1rem",
  overflow: "scroll",
},

filterContainerdisable: {
  paddingBlockStart: "1rem",
  overflow: "scroll",
  backgroundColor: "#d3cfcf",
  color: "black",
},

nodatafound: {marginLeft: 22},

newlinep: {
  color: "#0000008a",
  lineHeight: 1,
  margin: 1,
},


}


// Customizable Area End

