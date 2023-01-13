import React from "react";
// Customizable Area Start
import {  Box,
  Button,
  Grid,
  Card,
  Modal,
  TextField,
  Typography,
  MenuItem,
   Select,
  RadioGroup, FormControlLabel,
  Radio, FormControl, Tabs, Tab, TableContainer, Table, TableBody, TableRow, TableCell, TableHead} from "@material-ui/core";
  import {  Close } from "@material-ui/icons";
import "./style.css";
import GetProjectTemplateFieldsController, {
  Props,
} from "./GetProjectTemplateFieldsController";
const templateIcon= require("../assets/tl-template.png");
const checklistIcon = require("../assets/tl-checklist.png");
const Checklist = require("../assets/Checklist.png")
const Template=require("../assets/Template.png")
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import { invoiceimage } from "../../AdminConsole3/src/assets";
// Customizable Area End

export default class AdminSubfolderManagement extends GetProjectTemplateFieldsController {
  // Customizable Area Start
  constructor(props: Props) {
    super(props);
  }

  handleCancel = () => {

};
  handleBack = () => {

  };

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
                                          
                                            {/* <ThemeProvider theme={theme}> */}
                                         
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
                                            {/* </ThemeProvider> */}
                                        
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

  renderTextComponents=()=>{
    return <>
    <p style={webStyle.modaltextboxheader}><strong>Tax Components</strong></p>
    <Grid container sm={12} alignItems="center" style={{margin:"10px 0px"}}
    >
        <Grid item sm={4}>
            <p style={{color: "#8a8a8a"}}><strong>{"CGST (%)"}</strong></p>
        </Grid>
        <Grid item sm={8}>
            <TextField variant="outlined" fullWidth value={this.state.cgst} onChange={(e)=>{
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
            <TextField variant="outlined" fullWidth value={this.state.igst} onChange={(e)=>{
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
            <TextField variant="outlined" fullWidth value={this.state.sgst} onChange={(e)=>{
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
            <TextField variant="outlined" fullWidth value={this.state.otherTax} onChange={(e)=>{
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
  // Customizable Area End
  render() {
    // Customizable Area Start

    // Customizable Area End
    return (
      // Customizable Area Start
      <>
        <div style={webStyle.container} className="boxcontainer">
          <div className="content1" style={webStyle.content}>
            <Grid container spacing={2} style={{alignItems:"center"}}  >
              {/* <Grid item sm={6}> */}
              <ArrowLeftRoundedIcon
              style={webStyle.arrow}
              onClick={() => window.history.back()}
              // onClick={this.handleHomePage}
            />
              <Typography className="template-title">Details</Typography>
              {/* </Grid> */}
            </Grid>
          </div>
          {/* <Box style={webStyle.sign} className="headnavbar">
                  <h3 style={webStyle.headnav}>Details</h3>
                </Box> */}
          <div className="content" style={webStyle.contents}>
            <Grid container spacing={1}>
              <Card
                style={webStyle.twocards}
                onClick={() => this.props.history.push(`/projectlist?cid=${this.query?.get('cid')}&sfid=${this.query?.get('sfid') || ""}&tid=${this.query?.get('tid')}`)}
              >
                <div>
                  <div style={webStyle.iconimages}>
                     <img
                      src={localStorage.getItem('user_type')=='Superadmin'? Template:templateIcon}
                      alt="template"
                      style={webStyle.icons}
                    />
                  </div>
                  <div>
                    <h4 style={webStyle.iconname}>Template</h4>
                  </div>
                </div>
              </Card>
              <Card
                style={webStyle.twocards}
                onClick={() => this.props.history.push(`/definechecktable?cid=${this.query?.get('cid')}&sfid=${this.query?.get('sfid') || ""}&tid=${this.query?.get('tid')}`)}
              >
                <div>
                  <div style={webStyle.iconimages}>
                    <img
                      src={localStorage.getItem('user_type')=='Superadmin'? Checklist:  checklistIcon}

                      alt="checklist"
                      style={webStyle.icons}
                    />
                  </div>
                  <div>
                    <h4 style={webStyle.iconnamecheck}>Checklist</h4>
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid container  spacing={2} style={{marginBottom: 20, marginTop: 10}}>
                                <Grid item sm={12} md={6} lg={3}>
                                    <Card
                                    onClick={this.handleDefineInvoiceModalOpen}
                                    style={{height: 250, backgroundColor: "white", margin: 10, marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center", justifyContent: "center", cursor :"pointer"}}>
                                    <img
                                    onClick={this.handleDefineInvoiceModalOpen}
                                    src={invoiceimage} 
                                    style={{width: 100, height: 100}}
                                    />
                                    <Button
                                        onClick={this.handleDefineInvoiceModalOpen}
                                        style={{textTransform: "none", marginTop: 20}}><b>Define Invoice</b></Button>
                                    </Card>
                                </Grid>
                                <Grid item sm={12} md={6} lg={3}>
                                    <Card 
                                    onClick={()=>this.props.history.push(`/client_invoices_superadmin?clientName=${this.state.subfolderClientName}&subFolderClientId=${this.state.subfolderClientId}&projectInvoicingStructure=${this.state.projectInvoicingStructure}&invoiceId=${this.state.invoiceId}&clientId=${this.state.clientId}&path=reviewChecklist&cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)}
                                    style={{height: 250, backgroundColor: "white", margin: 5, marginTop: 10, marginBottom: 10,  display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center", justifyContent: "center", cursor: 'pointer',
                                    }}>
                                    <img
                                    onClick={()=>this.props.history.push(`/client_invoices_superadmin?clientName=${this.state.subfolderClientName}&subFolderClientId=${this.state.subfolderClientId}&projectInvoicingStructure=${this.state.projectInvoicingStructure}&invoiceId=${this.state.invoiceId}&clientId=${this.state.clientId}&path=reviewChecklist&cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)}
                                    src={invoiceimage} 
                                    style={{width: 100, height: 100}}/>
                                    <Button style={{textTransform: "none", marginTop: 20}} 
                                    onClick={()=>this.props.history.push(`/client_invoices_superadmin?clientName=${this.state.subfolderClientName}&subFolderClientId=${this.state.subfolderClientId}&projectInvoicingStructure=${this.state.projectInvoicingStructure}&invoiceId=${this.state.invoiceId}&clientId=${this.state.clientId}&path=reviewChecklist&cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)}
                                    ><b>Client Invoices</b></Button>
                                    </Card>
                                </Grid>
                                </Grid>

          </div>
          {this.renderDefineInvoice()}
        </div>

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
    right: 0,
    padding: "30px 20px 10px 0px",
  },

  content: {
    margin: 0,
  },

  sign: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "20px",
    fontFamily: "sans-serif",
    zIndex: 1300,
  },

  headnav: {
    marginLeft: 10,
    marginTop: "-55px",
    zIndex: 1300,
  },

  contents: {
    marginLeft: 30,
  },

  twocards: {
    display: "flex",
    height: 200,
    width: 400,
    marginRight: 30,
    marginTop: 20,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  iconimages: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  arrow: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    marginLeft: 30,
    borderRadius: 8,
  },

  icons: {
    width: 120,
    height: 120,
  },

  iconname: {
    marginLeft: 28,
    marginRight: 20,
  },

  iconnamecheck: {
    marginLeft: 32,
    marginRight: 20,
  },
  textfieldDisabled: {
    backgroundColor: "#e8e8e8"
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
  headerBox: {
    borderBottom: '1px solid #e8e8e8',
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
} as React.CSSProperties,
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
modaltextboxheader: {
  color: "#7a7a7a"
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
};

// Customizable Area End
