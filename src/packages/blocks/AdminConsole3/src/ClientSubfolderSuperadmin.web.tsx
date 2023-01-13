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
    Divider,
    Select,
    RadioGroup, FormControlLabel,
    Radio, FormControl, Tabs, Tab, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, createMuiTheme
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { MoreHoriz, Close } from "@material-ui/icons";
import { modalCheck, uploadimage, invoiceimage } from "./assets";
import { ThemeProvider } from "@material-ui/styles";
export const configJSONBase = require("../../../framework/src/config");
// Customizable Area End

import ClientSubfolderSuperadminController, { Props } from "./ClientSubfolderSuperadminController";

export default class ClientSubfolderSuperadmin extends ClientSubfolderSuperadminController {
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
        this.handleCurrencyList()
    }
  }

  renderDefineInvoice = () => {
    if(this.state.defineInvoiceModal) {
        return (
            <Modal style={webStyle.modalbackdrop} open={this.state.defineInvoiceModal} onClose={this.handleCloseDefineInvoiceModal} data-test-id={"addModalpopup"}>
                  <div style={webStyle.modalcontentsDefine}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Define Invoice</h4>
                                        <Close  onClick={this.handleCloseDefineInvoiceModal} style={webStyle.closebuttonstyle}/>
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.addworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.addworkspaceelements}>
                                        <p style={webStyle.modaltextboxheader}><strong>Client id</strong></p>
                                        <TextField variant="outlined" fullWidth  value={this.state.subfolderClientId} disabled style={webStyle.textfieldDisabled}/>
                                        <p style={webStyle.modaltextboxheader}><strong>{"Client Name(Displayed on Invoices)"}</strong></p>
                                        <TextField variant="outlined" fullWidth  value={this.state.subfolderClientNameForDefineInvoice}
                                            onChange={(e)=>{
                                                this.setState({subfolderClientNameForDefineInvoice:e.target.value,
                                                    isSubfolderClientNameForDefineInvoiceError: false});
                                            }}
                                        />
                                        {
                                            this.state.isSubfolderClientNameForDefineInvoiceError &&
                                            <Typography style={webStyle.errorText}>Client name is required</Typography>
                                        }


                                        <p style={webStyle.modaltextboxheader}><strong>Currency</strong></p>
                                        <Select
                                            variant="outlined"
                                            name="taxPay"
                                            value={this.state.selectedCurrency}
                                            // label="Age"
                                            className="input-type"

                                            required
                                            fullWidth
                                            style={{ height: "40px", textAlign: "left"}}
                                            onChange={this.handleChangeCurrency}
                                            >
                                                {this.state.currencyData.map((item:any)=><MenuItem value={item}>{item}</MenuItem>)}

                                            {/* <MenuItem value="true">Yes</MenuItem> */}
                                        </Select>
                        {this.state.isSelectedCurrencyError && <Typography style={webStyle.errorText}>Currency is required</Typography>}
                                        <p style={webStyle.modaltextboxheader}><strong>Invoice Frequency</strong></p>
                                        <Select
                      variant="outlined"
                      name="taxPay"
                      value={this.state.selectedFrequency}
                      // label="Age"
                      className="input-type"

                      required
                      fullWidth
                      style={{ height: "40px", textAlign: "left"}}
                      onChange={this.handleChangeFrequency}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="quarterly">Quarterly</MenuItem>
                      <MenuItem value="annual">Annual</MenuItem>
                    </Select>
                    {this.state.isSelectedFrequencyError && <Typography style={webStyle.errorText}>Invoice Frequency is required</Typography>}


                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.addSubfolderDescriptionForInvoice}
                                        onChange={(e:any) => {this.setState({addSubfolderDescriptionForInvoice: e.target.value},()=>{
                                            console.log('addSubfolderDescriptionForInvoice',this.state.addSubfolderDescriptionForInvoice);
                                            
                                        })}}/>
                                        
                                        <p style={webStyle.modaltextboxheader}><strong>Project Invoicing Structure</strong></p>
                                       




                                    <Grid container>
                                        <FormControl style={{width:"100%"}}>
                                            <RadioGroup aria-label="projectInvoicingStructure" name="projectInvoicingStructure" value={this.state.projectInvoicingStructure} onChange={(e) => {
                                                this.setState({ projectInvoicingStructure: e.target.value })
                                            }}
                                            row
                                            style={{width:"100%", justifyContent:"space-between"}}
                                            >
                                                <Grid item sm={6} style={{ paddingRight: "5px" }}>
                                                    <Box
                                                        style={{ border: '1px solid #e6e6e6', display: "flex", justifyContent: "center", borderRadius: "4px", paddingLeft:10 }}
                                                    >
                                                        <FormControlLabel
                                                            value="project_creation_date" control={<Radio color="primary" />} label="Project creation date" />
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={6} style={{ paddingLeft: "5px" }}>
                                                    <Box
                                                        style={{ border: '1px solid #e6e6e6', borderRadius: "4px", display: "flex", justifyContent: "center", paddingLeft:10  }} >
                                                        <FormControlLabel
                                                            value="project_completion_date" control={<Radio color="primary" />} label="Project completion date" />
                                                    </Box>
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>





                                        <p style={webStyle.modaltextboxheader}><strong>Invoice Generation Method</strong></p>
                                        <Grid
                                         container
                                        style={{
                                         border :"1px solid #e6e6e6",
                                         borderRadius: "4px"
                                        }}
                                         >
                                          
                                            <ThemeProvider theme={theme}>
                                         
                                            <Tabs
                                                value={this.state.selectedInvoiceMethodTab}
                                                indicatorColor="primary"
                                                textColor="primary"
                                                onChange={(e,newValue)=>{
                                                    this.setState({
                                                        selectedInvoiceMethodTab: newValue
                                                    })
                                                }}
                                                style={{width : "100%"}}
                                                aria-label="disabled tabs example"
                                                TabIndicatorProps={{
                                                    style: {backgroundColor: "transparent"}}}
                                                
                                               
                                            >
                                                <Tab 
                                                style={{
                                                    fontWeight : 'bold',
                                                    color : "#000",
                                                    width : "50%",
                                                    backgroundColor : this.state.selectedInvoiceMethodTab == 0 ?
                                                     "#fff" : "#EBEBEB",
                                                    }} 
                                                     label="Type and Side elevation structure" />
                                                <Tab 
                                                style={{
                                                    fontWeight : 'bold',
                                                    color : "#000",
                                                    // paddingLeft : "50px",
                                                    // paddingRight : "63px",
                                                    width : "50%",
                                                    backgroundColor : this.state.selectedInvoiceMethodTab == 1 ? "#fff" : "#EBEBEB",
                                                    }}
                                                     label="Kw Structure"/>
                                            </Tabs>
                                            </ThemeProvider>
                                        
                                        {this.renderTypeSideView()}
                                        {this.renderKWStructureView()}
                                        

                                       {this.state.selectedInvoiceMethodTab == 0 && <Grid item xs={12} style={{padding : "0px 20px 20px 20px"}}> 
                                            <p style={webStyle.modaltextboxheader}><strong>Additional cost per file</strong></p>
                                            <TextField variant="outlined" fullWidth 
                                                value={this.state.additionalCostPerFile} onChange={(e)=>{
                                                    this.setState({additionalCostPerFile:e.target.value, isAdditionalCostPerFileError:false})
                                                }}/>
                                        {this.state.isAdditionalCostPerFileError && <Typography style={webStyle.errorText}>Additional cost per file is required</Typography>}
                                        </Grid>}
                                        </Grid>

                                        {this.renderTextComponents()}
                                    </div>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacebuttonstyle}>
                                <Button style={webStyle.cancelButton} onClick={this.handleCloseDefineInvoiceModal}>Cancel</Button>
                                <Button style={webStyle.addworkspaceButton} onClick={()=>{
                                        if(this.state.invoiceStatus){
                                            this.editDefineInvoice()
                                        }else{
                                            this.saveDefineInvoice()
                                        }
                                    }}>Save</Button>
                            </div>
                            
                        </div>
                    </div>
                </Modal>
        )
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
    console.log('handleMoreInfoRedirect', subfolder)
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
              <Button style={{ ...webStyle.formContainer}} disabled>
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
                {/* </Button> */}
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
                                                <TextField variant="outlined" fullWidth  placeholder="Type title here" value={this.state.addSubfolderTeamTitle}
                                                onChange={(e: any) => this.setState({addSubfolderTeamTitle: e.target.value})}/>
                                                {this.state.addSubfolderTeamTitle.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.teamTitleValidation}</p>}
                                                {this.state.errorInAddEdit && <p style={webStyle.errorMessageDisplay}>Subfolder name already exist</p>}
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.addSubfolderDescription}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({addSubfolderDescription: e.target.value})}}/>
                                        {this.state.addSubfolderDescription.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.validateSubfolderDescription}</p>}
                                        <p style={webStyle.modaltextboxheader}><strong>Team leader</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Search user" value={this.state.searchSubfolderTeamLeader} onChange={(e) => this.searchTeamLead(e)}/>
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

  renderTextComponents=()=>{
    return <>
    <p style={webStyle.modaltextboxheader}><strong>Tax Components</strong></p>
    <Grid container sm={12} alignItems="center" style={{margin:"10px 0px"}}
    >
        <Grid item sm={4}>
            <p style={{color: "#8a8a8a"}}><strong>{"CGST (%)"}</strong></p>
        </Grid>
        <Grid item sm={8}>
            <TextField type="number" variant="outlined" fullWidth value={this.state.cgst} onChange={(e)=>{
                this.setState({cgst:e.target.value, isCgtsError:false})
            }}/>
        </Grid>
        <Grid item sm={4}/>
        <Grid item sm={8}>
            {this.state.isCgtsError && <Typography style={webStyle.errorText}>CGST is required</Typography>}
        </Grid>
    </Grid>
    <Grid container sm={12} alignItems="center" style={{margin:"10px 0px"}}
    >
        <Grid item sm={4}>
            <p style={{color: "#8a8a8a"}}><strong>{"IGST (%)"}</strong></p>
        </Grid>
        <Grid item sm={8}>
            <TextField type="number" variant="outlined" fullWidth value={this.state.igst} onChange={(e)=>{
                this.setState({igst:e.target.value, isIgstError:false})
            }}/>
        </Grid>
        <Grid item sm={4}/>
        <Grid item sm={8}>
            {this.state.isIgstError && <Typography style={webStyle.errorText}>IGST is required</Typography>}
        </Grid>
    </Grid>
    <Grid container sm={12} alignItems="center" style={{margin:"10px 0px"}}
    >
        <Grid item sm={4}>
            <p style={{color: "#8a8a8a"}}><strong>{"SGST (%)"}</strong></p>
        </Grid>
        <Grid item sm={8}>
            <TextField type="number" variant="outlined" fullWidth value={this.state.sgst} onChange={(e)=>{
                this.setState({sgst:e.target.value, isSgstError:false})
            }}/>

        </Grid>
        <Grid item sm={4}/>
        <Grid item sm={8}>
            {this.state.isSgstError && <Typography style={webStyle.errorText}>SGST is required</Typography>}
        </Grid>
    </Grid>
    <Grid container sm={12} alignItems="center" style={{margin:"10px 0px"}}
    >
        <Grid item sm={4}>
            <p style={{color: "#8a8a8a"}}><strong>{"Other Tax (%)"}</strong></p>
        </Grid>
        <Grid item sm={8}>
            <TextField type="number" variant="outlined" fullWidth value={this.state.otherTax} onChange={(e)=>{
                this.setState({otherTax:e.target.value, isOtherTaxError:false})
            }}/>
        </Grid>
        <Grid item sm={4}/>
        <Grid item sm={8}>
            {this.state.isOtherTaxError && <Typography style={webStyle.errorText}>Other Tax is required</Typography>}
    </Grid>
    </Grid>
    </>
  }

  renderTypeSideView=()=>{
    return this.state.selectedInvoiceMethodTab == 0 && (
                                         
                                            <Grid
                                             item xs={12} 
                                             style={{padding:"20px"}}>
                                               <TableContainer>
                                                    <Table size="small" aria-label="a dense table" style={{borderRadius :"4px", border :"1px solid #e6e6e6"}}>
                                                        <TableHead style={{backgroundColor :"#EBEBEB"}}>
                                                        <TableRow>
                                                            <TableCell style={webStyle.cellHeadingStyle}>
                                                            Project Type
                                                               </TableCell>
                                                            <TableCell style={webStyle.cellHeadingStyle}>Price per file</TableCell>
                                                        </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        {this.state.projectTypes?.map((row:any) => (
                                                            <TableRow>
                                                            <TableCell style={webStyle.cellStyle}>{row?.project_type}</TableCell>
                                                            <TableCell >
                                                                <TextField
                                                                type="number"
                                                                InputProps={{ disableUnderline: true }}
                                                                value={row.price_per_file}
                                                                onChange={(e)=>{
                                                                    let tempArr = this.state.projectTypes?.map((item:any)=>{
                                                                        if(item?.project_type == row?.project_type){
                                                                            return {...item, price_per_file: e.target.value}
                                                                        }
                                                                        return item
                                                                    });

                                                                    this.setState({projectTypes: tempArr, isProjectTypesError:false})
                                                                }}
                                                                />

                                                            </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>

                                               
{this.state.selectedInvoiceMethodTab == 0 && this.state.isProjectTypesError && <Typography style={webStyle.errorText}>Price per file is required</Typography>}
                                            </Grid>
                                        
    )
  }

  renderKWStructureView=()=>{
return(
    this.state.selectedInvoiceMethodTab == 1 && (
                                            <>
                                                <Grid item xs={12} style={{ padding: "20px" }}>
                                                    <TableContainer
                                                        // style={{
                                                        //     borderRadius: '4px',
                                                        //     border: '1px solid #e6e6e6',
                                                        // }}
                                                    >
                                                        <Table size="small" aria-label="a dense table"
                                                        style={{
                                                            borderRadius: '4px',
                                                            border: '1px solid #e6e6e6',
                                                        }}
                                                        
                                                        >
                                                            <TableHead style={{ backgroundColor: "#EBEBEB" }}>
                                                                <TableRow>
                                                                    <TableCell style={webStyle.kwStructureHeading}>From</TableCell>
                                                                    <TableCell style={webStyle.kwStructureHeading}>To</TableCell>
                                                                    <TableCell style={webStyle.kwStructureHeading}>Price per unit</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.state.kwStructure.map((row: any, index:any) => (
                                                                    <TableRow>
                                                                        <TableCell style={webStyle.KwcellStyle}>
                                                                            <TextField
                                                                            type="number"
                                                                                value={row?.from ? row.from : ""}
                                                                                onChange={(e) => {
                                                                                    let tempArr = this.state.kwStructure?.map((item: any, i:any) => {
                                                                                        if (i == index) {
                                                                                            return { ...item, from: e.target.value }
                                                                                        }
                                                                                        return item
                                                                                    });

                                                                                    this.setState({ kwStructure: tempArr, isKwStructureError:false, isKwStructureDataError:false })
                                                                                }}
                                                                                InputProps={{ disableUnderline: true }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell style={webStyle.KwcellStyle}  >
                                                                            <TextField
                                                                            type="number"
                                                                                value={row?.to ? row.to : ""}
                                                                                onChange={(e) => {
                                                                                    let tempArr = this.state.kwStructure?.map((item: any, i:any) => {
                                                                                        if (i == index) {
                                                                                            return { ...item, to: e.target.value }
                                                                                        }
                                                                                        return item
                                                                                    });
                                                                                    this.setState({ kwStructure: tempArr, isKwStructureError:false, isKwStructureDataError:false })
                                                                                }}

                                                                                InputProps={{ disableUnderline: true }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell >
                                                                            <TextField
                                                                            type="number"
                                                                                value={row?.price_per_unit ? row.price_per_unit:""}
                                                                                onChange={(e) => {
                                                                                    let tempArr = this.state.kwStructure?.map((item: any, i:any) => {
                                                                                        if (i == index) {
                                                                                            return { ...item, price_per_unit: e.target.value }
                                                                                        }
                                                                                        return item
                                                                                    });

                                                                                    this.setState({ kwStructure: tempArr, isKwStructureError:false, isKwStructureDataError: false })
                                                                                }}

                                                                                InputProps={{ disableUnderline: true }}
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                {this.state.selectedInvoiceMethodTab == 1 && this.state.isKwStructureDataError && <Typography style={webStyle.errorText}>Data entered for kw structure is not correct</Typography>}
                                                {this.state.selectedInvoiceMethodTab == 1 && this.state.isKwStructureError && <Typography style={webStyle.errorText}>From, To and Price per unit is required </Typography>}

                                                </Grid>


                                                <Grid item xs={12} container justifyContent="center">
                                                    <Button
                                                        // color="primary"
                                                        onClick={() => {
                                                            let isError = false;

                                                            for (const element of this.state.kwStructure) {
                                                                if(element.from == "" || element.to == "" || element.price_per_unit == ""){
                                                                  this.setState({isKwStructureError:true});
                                                                  isError = true;
                                                                }
                                                              }

                                                              if(isError){
                                                                return;
                                                              }

                                                            let data = [...this.state.kwStructure, {
                                                                "from": "",
                                                                "to": "",
                                                                "price_per_unit": ""
                                                            }]
                                                            this.setState({ kwStructure: data })
                                                        }}
                                                        style={webStyle.newRangebtn}>Add new range</Button>
                                                </Grid>
                                        </>
                                        )
)
  }

  renderEditSubfolder = () => {
    if(this.state.editClientSubfolderModal) {
        const resultsFilter =Boolean(this.state.availableTL.length || this.state.unavailableTL.length) && this.FilterResults();
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
                                                <TextField variant="outlined" fullWidth  placeholder="Type title here" value={this.state.editSubfolderTeamtitle} onChange={(e: any) => this.setState({editSubfolderTeamtitle: e.target.value})}/>
                                                {this.state.editSubfolderTeamtitle.length === 0 && <p style={webStyle.errorMessageDisplay}>{this.state.teamTitleValidation}</p>}
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <p style={webStyle.modaltextboxheader}><strong>Description</strong></p>
                                        <TextField variant="outlined" fullWidth multiline rows={5} placeholder="Type here" value={this.state.editsubfolderDescription} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({editsubfolderDescription: e.target.value})}}/>
                                        <p style={webStyle.modaltextboxheader}><strong>Team leader</strong></p>
                                        <TextField variant="outlined" fullWidth placeholder="Search user" value={this.state.searchSubfolderTeamLeader} onChange={(e) => this.searchTeamLead(e)}/>
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
                <div>
                    <h4 style={webStyle.pageHeader}>Client Subfolder</h4>
                    <p style={webStyle.pageHeaderSubclient}>
                    <Link href={"/clients"} style={webStyle.gobacklink}>{this.state.subfolderClientName}</Link> {">"} Subfolder</p>
                </div>
                <div style={{display: "flex", flexDirection: "row", }}>
                    <SearchBar placeholder="Search Sub Folder" style={{height: 40}} value={this.state.searchsubclient} onChange={this.requestSearch} onCancelSearch={this.cancelSearch}/>
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
                                // {this.state.subfolderList.map((subfolder: any, id: any) => {
                                    return (
                                        <Grid item sm={12} md={6} lg={3} key={id}>
                                            <Card style={webStyle.workspaceCard}>   
                                                <Box style={webStyle.imagebox}>
                                                    <Badge badgeContent={
                                                        <div>
                                                            <MoreHoriz style={webStyle.badgeStyle} onClick={(e) => this.handleMenuOption(e, subfolder?.id, subfolder?.attributes?.team_title)} aria-controls="simple-menu" aria-haspopup="true"/>
                                                            <Menu id="simple-menu" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleMenuClose}>
                                                                <MenuItem onClick={(e: any) => this.handleEditSubfolderModalOpen(this.state.selectedSubfolder, e)}>Edit</MenuItem>
                                                                <MenuItem onClick={(e: any) => this.handleDeleteSubfolderModalOpen(subfolder?.id, subfolder?.attributes?.team_title, e)}>Delete</MenuItem>
                                                            </Menu>
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
                                <Divider/>
                              {this.state.projectTypes?.length > 0 &&  <Grid container  spacing={2} style={{marginBottom: 20, marginTop: 10}}>
                                <Grid item sm={12} md={6} lg={3}>
                                    <Card
                                    onClick={this.handleDefineInvoiceModalOpen}
                                    style={{height: 250, backgroundColor: "white", margin: 10, marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center", justifyContent: "center", cursor :"pointer"}}>
                                    <img
                                    onClick={this.handleDefineInvoiceModalOpen}
                                    src={invoiceimage} style={{width: 100, height: 100}}/>
                                    <Button
                                        onClick={this.handleDefineInvoiceModalOpen}
                                        style={{textTransform: "none", marginTop: 20}}><b>Define Invoice</b></Button>
                                    </Card>
                                </Grid>
                                <Grid item sm={12} md={6} lg={3}>
                                    <Card 
                                    onClick={()=>this.props.history.push(`/client_invoices_superadmin?clientName=${this.state.subfolderClientName}&subFolderClientId=${this.state.subfolderClientId}&projectInvoicingStructure=${this.state.projectInvoicingStructure}&invoiceId=${this.state.invoiceId}&clientId=${this.state.clientId}`)}
                                    style={{height: 250, backgroundColor: "white", margin: 5, marginTop: 10, marginBottom: 10,  display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center", justifyContent: "center", cursor: 'pointer',
                                    }}>
                                    <img
                                    onClick={()=>this.props.history.push(`/client_invoices_superadmin?clientName=${this.state.subfolderClientName}&subFolderClientId=${this.state.subfolderClientId}&projectInvoicingStructure=${this.state.projectInvoicingStructure}&invoiceId=${this.state.invoiceId}&clientId=${this.state.clientId}`)}
                                    src={invoiceimage} style={{width: 100, height: 100}}/>
                                    <Button style={{textTransform: "none", marginTop: 20}} onClick={()=>this.props.history.push(`/client_invoices_superadmin?clientName=${this.state.subfolderClientName}&subFolderClientId=${this.state.subfolderClientId}&projectInvoicingStructure=${this.state.projectInvoicingStructure}&invoiceId=${this.state.invoiceId}&clientId=${this.state.clientId}`)}><b>Client Invoices</b></Button>
                                    </Card>
                                </Grid>
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            {this.renderAddSubfolder()}
            {this.renderDefineInvoice()}
            {this.renderEditSubfolder()}
            {this.renderSuccessModal()}
            {this.renderDeleteSubfolder()}

        </div>
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

    errorText: {color:"#f44336", fontSize:15, marginTop:5},

    cellStyle : {
        borderRight : "1px solid #e6e6e6",
        width :"50%"
    }as React.CSSProperties,
    cellHeadingStyle :{
        borderRight : "1px solid #e6e6e6",
        width :"50%",
        fontWeight: "bold",
       }as React.CSSProperties,
       kwStructureHeading:{
        borderRight : "1px solid #e6e6e6",
        fontWeight: "bold",
        }as React.CSSProperties,

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
    
    modalcontentsDefine:{
        // width: "30%",
        width: "565px",
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
        border: "1px solid #e8e8e8",
        alignContent: "center",
        justifyContent: "center",
        display: "flex"
    },

    headerBox: {
        borderBottom: '1px solid #e8e8e8',
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
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
