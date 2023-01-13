import React from 'react'
import {
  Grid,
  Box,
  Button, Typography,
  // Customizable Area Start
  Table,
  TableContainer,
  TextField,
  TableRow,
  TableCell, TableBody,
  Modal,
  Select,
  MenuItem, createMuiTheme
} from "@material-ui/core";

// Customizable Area Start
import {
  MuiPickersUtilsProvider, DatePicker
} from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { AiFillCaretLeft, AiOutlineDelete } from "react-icons/ai";
import "./GenricInvoiceClientSuperadmin.css";
import { finulentImageInvoice } from "./assets";
import CloseIcon from "@material-ui/icons/Close";
export const configJSONBase = require("../../../framework/src/config");

// Customizable Area End
import GenricInvoiceSuperadminController, {
  Props,
} from "./GenricInvoiceSuperadminController";

export default class GenericInvoiceClientSuperadmin extends GenricInvoiceSuperadminController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  createDataForAddress = (name: string, calories: number) => {
    return { name, calories };
  };
  createDataForTerms = (name: string, calories: string) => {
    return { name, calories };
  };
  createBillTableData = (name: string, calories: number) => {
    return { name, calories };
  };

  BillDetailsSection = () => {
    return (
      <>
        {/* Total Amount Section Start*/}
        <Box display={"flex"} justifyContent={"center"}>
          <Box className={"totalAmount"} width={"95%"}>
            <Box fontWeight={"bolder"} component={"div"}>
              <Box>Total Amount</Box>
              <Box>₹{this.state.invoiceData?.attributes?.billing_amount}</Box>
            </Box>
            <Box marginTop={"15px"} component={"div"}>
              <Box color={"#868686"} fontSize={"10px"}>
                Tax Details
              </Box>
              <Box />
            </Box>
            {this.state.invoiceData?.attributes?.tax_details[0]?.cgst != 0 && <Box margin={"10px 0px"} component={"div"}>
              <Box>CGST</Box>
              <Box>₹{this.state.invoiceData?.attributes?.tax_details[0]?.cgst}</Box>
            </Box>}
            {this.state.invoiceData?.attributes?.tax_details[0]?.igst != 0 && <Box margin={"10px 0px"} component={"div"}>
              <Box>IGST</Box>
              <Box>₹{this.state.invoiceData?.attributes?.tax_details[0]?.igst}</Box>
            </Box>}
           { this.state.invoiceData?.attributes?.tax_details[0]?.sgst != 0 && <Box margin={"10px 0px"} component={"div"}>
              <Box>SGST</Box>
              <Box>₹{this.state.invoiceData?.attributes?.tax_details[0]?.sgst}</Box>
            </Box>}
            {this.state.invoiceData?.attributes?.tax_details[0]?.other_tax != 0 && <Box margin={"10px 0px"} component={"div"}>
              <Box>Other Tax</Box>
              <Box>₹{this.state.invoiceData?.attributes?.tax_details[0]?.other_tax}</Box>
            </Box>}
            <Box component={"hr"} />
            <Box fontWeight={"bolder"} margin={"15px 0px"} component={"div"}>
              <Box>Gross Total</Box>
              <Box>₹{this.state.invoiceData?.attributes?.gross_total}</Box>
            </Box>
          </Box>
        </Box>
        {/* Total Amount Section End*/}
      </>
    );
  };

  parseImg(img: string | null) {
    if (!img) return undefined;
    const imageLink = configJSONBase.baseURL;
    const imageFragment =
      typeof img === "string" && img.split("/").includes("rails");
    const imgSrc = imageFragment ? `${imageLink}/${img}` : img;
    return imgSrc;
  }

  AccountDetails = () => {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={"95%"}>
            <Box marginBottom={"2.5vh"}>
              I have no objection if the amount is credited to my bank directly.
              Bank details are given below:
            </Box>

            <Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Account Name</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.account_number}</Box>
                  {/* {this.state.pageType ? (
                  ) : null
                  //  (
                  //   <TextField
                  //     fullWidth
                  //     size={"small"}
                  //     variant={"outlined"}
                  //     value={""}
                  //   />
                  // )
                } */}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>A/C Number</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.account_name}</Box>
                  {/* {this.state.pageType ? (
                    ) : null
                    // (
                    //   <TextField
                    //     fullWidth
                    //     size={"small"}
                    //     variant={"outlined"}
                    //     value={""}
                    //   />
                    // )
                    } */}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>MICR Code</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.micr_code}</Box>
                  {/* {this.state.pageType ? (
                    ) : null
                  //    (
                  //   <TextField
                  //     fullWidth
                  //     size={"small"}
                  //     variant={"outlined"}
                  //     value={""}
                  //   />
                  // )
                  } */}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Branch IFSC Code</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.ifsc_code}</Box>
                  {/* {this.state.pageType ? (
                    ) : null
                  //   (
                  //   <TextField
                  //     fullWidth
                  //     size={"small"}
                  //     variant={"outlined"}
                  //     value={""}
                  //   />
                  // )
                } */}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Swift Code</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.swift_code}</Box>
                  {/* {this.state.pageType ? (
                    ) : null
                  //   (
                  //   <TextField
                  //     fullWidth
                  //     size={"small"}
                  //     variant={"outlined"}
                  //     value={""}
                  //   />
                  // )
                } */}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Branch Address</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.branch_address}</Box>
                  {/* {this.state.pageType ? (

                  ) : null
                  //  (
                  //   <TextField
                  //     multiline
                  //     fullWidth
                  //     size={"small"}
                  //     variant={"outlined"}
                  //     value={``}
                  //   />
                  // )
                  } */}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>
                  Whether the tax is payable under the Reverse charge
                </Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  <Box>{this.state.invoiceData?.attributes?.account_details?.tax_payable?"Yes":"No"}</Box>
                  {/* {this.state.pageType ? (
                    ) : null
                  //   (
                  //   <TextField
                  //     fullWidth
                  //     size={"small"}
                  //     variant={"outlined"}
                  //     value={""}
                  //   />
                  // )
                  } */}
                </Box>
              </Box>
              <Box marginY={"4vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Signature</Box>
                <Box marginX={"5px"}>:</Box>
                { this.state.invoiceData?.attributes?.signature &&
                  <Box width={"27%"} fontWeight={"bolder"}>
                  <img
                    src={this.parseImg(this.state.invoiceData.attributes.signature)}
                      width={"100%"}
                      height={"100px"}
                      className={"signature"}
                      />
                </Box> }
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          marginBottom={"2vh"}
          color={"#9A9A9A"}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <Box>India : +91 97694 92539</Box>
          <Box marginX={"0.5vh"}>|</Box>
          <Box>info@finulent.com</Box>
          <Box marginX={"0.5vh"}>|</Box>
          <Box>US: +1 97831 055 45</Box>
        </Box>
      </>
    );
  };

  BillingTable = () => {
    return (
      <>
        <Box marginY={"3vh"}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableRow
                className="tHead billLastRow"
                style={{
                  backgroundColor: "#F6A724",
                  border: "1px solid black",
                }}
              >
                <TableCell align="center">S no.</TableCell>
                <TableCell align="center">Project Date</TableCell>
                <TableCell align="center">Project Id</TableCell>
                <TableCell align="center">Project Name</TableCell>
                <TableCell align="center">Project Type</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
              <TableBody>
                {this.state.invoiceData?.attributes?.all_projects.map((row: any, i: any) => (
                  <TableRow key={i} className={"billTable"}>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell align="center">{row?.project_date}</TableCell>
                    <TableCell align="center">{row?.project_id}</TableCell>
                    <TableCell align="center">
                    {row?.project_name}
                    </TableCell>
                    <TableCell align="center">{row?.project_type}
</TableCell>
                    <TableCell align="center">
                      <Box display={"flex"} alignItems={"center"} justifyContent="center">
                      {/* <Box display={"flex"} alignItems={"center"} justifyContent="space-between"> */}
                        <Box style={{flexGrow:1}} >₹{row?.amount ? row?.amount : 0}</Box>
                        {!this.state.pageType && (
                          <Box
                            className={"icon"}
                            style={{
                              border: "none",
                              marginRight : "1.1rem"
                              // transform: "translate(30px, 0px)",
                            }}
                            onClick={()=>this.deleteProject(row?.id)}
                          >
                            <AiOutlineDelete />
                          </Box>
                        )}
                        {/* </Box> */}
                      </Box>{" "}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className={"billLastRow"}>
                  <TableCell
                    style={{ borderLeft: "1px solid black" }}
                    colSpan={2}
                    // align="center"
                  >
                    {!this.state.pageType && <Button
                      onClick={this.handleOpen}
                      size={"small"}
                      variant={"contained"}
                      style={{
                        backgroundColor: "#4FABF6",
                        textTransform: "none",
                        color: "#fff",
                        padding: "10px 30px",
                        fontWeight: 600,
                      }}
                    >
                      Add Project
                    </Button>}
                    {this.getAddProjectModal()}
                  </TableCell>
                  <TableCell colSpan={2} align="center" />
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    Billing Amount
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bolder",
                      borderRight: "1px solid black",
                    }}
                    align="center"
                  >
                    ₹{this.state.invoiceData?.attributes?.billing_amount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };
  getAddProjectModal=()=>{
    return(
      <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
              <Box
        style={{
          top: `${50}%`,
          left: `${50}%`,
          transform: `translate(-${50}%, -${50}%)`,
          position: "absolute",
          width: "30%",
          border: "1px solid #000",
          fontFamily: "sans-serif",
          backgroundColor: "white",
          // boxShadow: theme.shadows[5],
          // padding: "25px 10px",
        }}
        // className = {this.classes.paper}
      >
        <Grid 
        container
        style={{
        borderBottom : "1px solid rgb(232, 232, 232)", 
        padding: "1.3rem 2rem",
      }}
         justifyContent="space-between">
                <Box fontSize={"20px"} fontWeight={"bold"}>
           Add Project
          </Box>
            <CloseIcon 
             onClick={this.handleClose}
            //  style={webStyle.closebuttonstyle}
             />
        </Grid>
        {/* <Box display={"flex"} justifyContent={"space-between"} 
        style={{borderBottom : "1px solid rgb(232, 232, 232)"}}>
          <Box fontSize={"20px"} fontWeight={"bold"}>
           Add Project
          </Box>
          <Box
            onClick={this.handleClose}
            className={"icon"}
            fontSize={"20px"}
            fontWeight={"bold"}
          >
            <IoCloseSharp />
          </Box>  
        </Box> */}

        {/* <Box component={"hr"} /> */}
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={"90%"}>
            <Box marginY={"2.5vh"}>
              <Box className={"modalLabel"} fontSize={"13px"}>
                Project Date
              </Box>
              <Box>
                 <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        // style={{ background: "orange" }}
                      >
                        <ThemeProvider theme={materialTheme}>
                          <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={webStyle.text}
                            // maxDate={new Date().setDate(
                            //   new Date().getDate() - 1
                            // )}
                            // placeholder="MM/DD/YYYY"
                            // format={"MM/DD/YYYY"}
                            placeholder="DD/MM/YYYY"
                            format={"DD/MM/YYYY"}
                            mask={(value) =>
                              value
                                ? [
                                    /\d/,
                                    /\d/,
                                    "/",
                                    /\d/,
                                    /\d/,
                                    "/",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                  ]
                                : []
                            }
                            value={this.state.projectDate}
                            onChange={(date:any)=>this.setState({projectDate:date, isProjectDateError:false})}
                            disableOpenOnEnter
                            animateYearScrolling={false}
                            autoOk={true}
                            clearable
                            // onInputChange={(e: any) =>
                            //   console.log("Keyboard:", e.target.value)
                            // }
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                      {this.state.isProjectDateError && <Typography style={webStyle.errorText}>Project date is required</Typography>}
                      
                      
                      
              </Box>
            </Box>
            <Box marginY={"2.5vh"}>
              <Box className={"modalLabel"} fontSize={"13px"}>
                Project ID
              </Box>
              <Box>
                <TextField
                  variant={"outlined"}
                  fullWidth
                  size={"small"}
                  placeholder="Project id goes here"
                  onChange={(e)=>this.setState({projectId:e.target.value, isProjectIdError:false,})}
                  value={this.state.projectId}
                />
                {this.state.isProjectIdError && <Typography style={webStyle.errorText}>Project id is required</Typography>}
              </Box>
            </Box>
            <Box marginY={"2.5vh"}>
              <Box className={"modalLabel"} fontSize={"13px"}>
                Project Name
              </Box>
              <Box>
                <TextField
                  variant={"outlined"}
                  fullWidth
                  size={"small"}
                  placeholder="Project name goes here"
                  onChange={(e)=>this.setState({projectName:e.target.value, isProjectNameError:false,})}
                  value={this.state.projectName}
                />
                {this.state.isProjectNameError && <Typography style={webStyle.errorText}>Project name is required</Typography>}
              </Box>
            </Box>
            <Box marginY={"2.5vh"}>
              <Box className={"modalLabel"} fontSize={"13px"}>
                Project Type
              </Box>
              <Box>
              <Select
                      variant="outlined"
                      name="taxPay"
                      renderValue={
                        this.state.selectedProjectType !== "" ? undefined : () => <Placeholder>Select</Placeholder>
                      }
                      value={this.state.selectedProjectType}
                      className="input-type"
                      required
                      fullWidth
                      displayEmpty
                      style={{ height: "40px", textAlign: "left"}}
                      onChange={this.handleChange}
                    >
                      {this.state.projectTypes.map((item:any)=><MenuItem value={item}>{item}</MenuItem>)}
                    </Select>
                    {this.state.isSelectedProjectTypeError && <Typography style={webStyle.errorText}>Project type is required</Typography>}
              </Box>
            </Box>
            <Box marginY={"2.5vh"}>
              <Box className={"modalLabel"} fontSize={"13px"}>
                Project Amount
              </Box>
              <Box>
                <TextField
                  variant={"outlined"}
                  fullWidth
                  type="number"
                  size={"small"}
                  placeholder="Enter project amount here"
                  onChange={(e)=>this.setState({projectAmount:e.target.value, isProjectAmountError:false,})}
                  value={this.state.projectAmount}
                />
                {this.state.isProjectAmountError && <Typography style={webStyle.errorText}>Project amount is required</Typography>}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Box component={"hr"} /> */}

        <Grid 
        container 
        style={{
          padding : "1rem",
          borderTop: "1px solid rgb(232, 232, 232)"
        }}
        justifyContent="flex-end"
        >
        <Button
            onClick={this.handleClose}
            variant={"contained"}
            color={"default"}
            style={webStyle.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"default"}
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              backgroundColor: "#4EABF8",
              textTransform: "none",
              color: "#fff",
              boxShadow : "none",
              fontWeight: 600,
              padding : "10px 40px"
             }}
            onClick={this.addNewProject}
          >
            Add
          </Button>

        </Grid>
        {/* <Box display={"flex"} justifyContent={"end"}>
         
        </Box> */}
      </Box>
          </Modal>
    )
  }

  handleChange = (e: any) => {
    this.setState({ selectedProjectType: e.target.value, isSelectedProjectTypeError: false });
  };

  // Customizable Area End

  render() {
    const addressTabelRow = [this.createDataForAddress("Frozen yoghurt", 159)];
    const termsTableData = [
      this.createDataForTerms(
        this.state.invoiceData?.attributes?.client?.client_name,
        "GST not charged as covered under LUT"
      ),
      this.createDataForTerms(`Address - ${this.state.invoiceData?.attributes?.client?.client_address ? this.state.invoiceData?.attributes?.client?.client_address : ""}`, "(ARN: )"),
    ];
    
    return (
      // Customizable Area Start
      <>
        <Box bgcolor={"#EEEEEE"} width={"85vw"} marginLeft={"15vw"}>
          <Box display={"flex"} justifyContent={"center"}>
            <Box width={"95%"}>
              <Box
                margin={"20px 0px"}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    className={"hoverPointer"}
                    marginRight={"10px"}
                    borderRadius={"5px"}
                    padding={"10px 10px"}
                    bgcolor={"white"}
                    color={"black"}
                    onClick={this.handleBack}
                  >
                    <AiFillCaretLeft />
                  </Box>
                  <Box className="buttonText">
                    {this.state.pageType ? "Invoice" : "Edit Invoice"}
                  </Box>
                </Box>

                {this.state.pageType ? (
                  <Button
                    color={"default"}
                    variant={"contained"}
                    style={{ textTransform: "none", backgroundColor : "#fff" }}
                    onClick={this.switchToEdit}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Button
                      style={{ textTransform: "none", fontWeight: "bold", padding : "10px 40px" }}
                      color={"default"}
                      variant={"contained"}
                      onClick={this.switchToViewForCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#4EABF8",
                        color : "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        padding : "10px 40px"
                      }}
                      variant={"contained"}
                      onClick={this.switchToViewForSave}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>

              <Box bgcolor={"white"}>
                {/* Image */}
                <Box margin={"10px 0px"} height={"25vh"} width={"100%"}>
                  <img src={finulentImageInvoice} className={"finImage"} />
                </Box>
                <Box />

                <Box display={"flex"} justifyContent={"center"}>
                  <Box className="genText" width={"88%"}>
                    <Box
                      alignItems={"center"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box width={"40%"}>
                        <Typography>Finulent Solutions LLP</Typography>
                        <Typography>
                          216, Link Way Industrial Estate,Malad (W)
                        </Typography>
                        <Typography>Mumbai - 400 064, India</Typography>
                      </Box>

                      <Box width={"55%"}>
                        <>
                          <Box margin={"10px 0px"} border={"1px solid gray"}>
                            <TableContainer>
                              <Table aria-label="simple table">
                                <TableRow
                                  className="tHead"
                                  style={{ backgroundColor: "#F6A724" }}
                                >
                                  <TableCell align="center">Invoice#</TableCell>
                                  <TableCell align="center">
                                    From Date
                                  </TableCell>
                                  <TableCell align="center">To Date</TableCell>
                                </TableRow>
                                <TableBody>
                                  {addressTabelRow.map((row) => (
                                    <TableRow
                                      key={row.name}
                                      className={"tCell"}
                                    >
                                      <TableCell align="center">
                                        {this.state.invoiceData?.attributes?.generate_invoices?.invoice_id}
                                      </TableCell>
                                      <TableCell align="center">
                                      {moment(this.state.invoiceData?.attributes?.from_date).format('DD MMM YYYY')}
                                      </TableCell>
                                      <TableCell align="center">
                                      {moment(this.state.invoiceData?.attributes?.to_date).format('DD MMM YYYY')}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </>
                      </Box>
                    </Box>

                    <>
                      <Box
                        border={"1px solid gray"}
                        marginTop={"5vh"}
                        marginBottom={"2vh"}
                      >
                        <TableContainer>
                          <Table aria-label="simple table">
                            <TableRow
                              className="tHead"
                              style={{ backgroundColor: "#F6A724" }}
                            >
                              <TableCell align="center">BILL TO</TableCell>
                              <TableCell align="center">Terms</TableCell>
                            </TableRow>
                            <TableBody>
                              {termsTableData.map((row) => (
                                <TableRow key={row.name} className={"tCell"}>
                                  <TableCell align="center">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.calories}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </>
                    {this.BillingTable()}
                    {/* <Box marginY={"5vh"} component={"hr"} /> */}
                    {/* <OtherChargesTable data={this.state} /> */}
                    {this.BillDetailsSection()}
                    <>
                      <Box marginTop={"3.5vh"}>
                        <Box
                          fontWeight={"bold"}
                          fontSize={"14px"}
                          marginBottom={"1.5vh"}
                        >
                          Comment
                        </Box>

                        {!this.state.pageType && (
                          <TextField
                            inputProps={{
                              style: {
                                fontSize: "13px",
                                padding: "0px 10px",
                                color: "#B1B0B6",
                              },
                            }}
                            multiline
                            variant="outlined"
                            value={this.state.invoiceComment}
                            onChange={(e)=>{this.setState({invoiceComment:e.target.value})}}
                            maxRows={4}
                            fullWidth
                          />
                        )}
                        {this.state.pageType && (
                          <Box
                            marginTop={"15px"}
                            color={"#B1B0B6"}
                            fontSize={"13px"}
                          >
                            {this.state.invoiceComment}
                          </Box>
                        )}
                      </Box>
                    </>
                    <Box marginY={"3.5vh"} component={"hr"} />
                    {this.AccountDetails()}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const usePlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#aaa"
  }
}));


const Placeholder:React.FunctionComponent = ({children}) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};

const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
    MuiPickersToolbar: {
      toolbar: {
          color: "black",
          backgroundColor: "#e8e8e8"
      },
    },
    MuiPickersDay: {
      day: {
      color: "black"
      },
      daySelected: {
          backgroundColor: "#e8e8e8"
      },
      dayDisabled: {
          color: "#e8e8e8"
      },
      current: {
          color: "#e8e8e8"
      },
      isSelected: {
        color: "white",
        backgroundColor: "#e8e8e8"
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
          color: "black",
      },
      toolbarBtnSelected: {
          color: "black"
      },
   },
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "10px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#E4EFEF",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#1D388F61",
          borderRadius: "2px",
        },
      },
    },

    palette: {
      primary: "red", // works
    },
    MuiButton: {
      textPrimary: {
        color: "rgb(171 114 24)",
      },
    },

    MuiPickersModal: {
      dialogAction: {
        color: "#8bc34a",
      },
    },
    myComponent: {
      "& .MuiPickersDay-isSelected": {
        backgroundColor: "red",
      },
    },

    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: "black"
      //   color: "rgb(171 114 24)",
      },
      dayLabel: {
          color: "black"
      //   color: "rgb(171 114 24)",
      },
    },
  },
});

const webStyle:any={
  modalStyle:{
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: "35%",
    border: "1px solid #000",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
    padding: "25px 10px",
  },
  errorText:{
    color:"#f44336",
     fontSize:15, 
      marginTop:5
    },
    cancelButton: {
      background: "#e8e8e8",
      color: "black",
      fontWeight: 600,
      textTransform: "none",
      boxShadow : "none",
      padding : "10px 40px"
    },
  closebuttonstyle: {
    marginTop: 20,
    marginRight: 25,
  },
}
// Customizable Area End
