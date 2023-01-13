import React from "react";
import PhoneInput from "react-phone-input-2";
import MomentUtils from "@date-io/moment";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";

import Avatar from "@material-ui/core/Avatar";
import GenericSuccessModal from "../../ContentManagement/src/GenericSuccessModal.web";

import {
  Container,
  Box,
  Button,
  Input,
  Typography,
  IconButton,
  Checkbox,
  InputLabel,
  TextField,
  InputAdornment,
  Grid,
  Paper,
  TextareaAutosize,
  Select,
  MenuItem,
  Divider,
  Modal,
  FormControl,
  TableContainer,
  TablePagination,
  Link,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "./invoice.css";
import { cloudimg, modalcheck } from "./assets";
// Customizable Area End

import InvoiceContentController, { Props } from "./InvoiceContentController";

import { widthFromPercentage } from "../../../framework/src/Utilities";

// const  isLoggedIn = localStorage.getItem('token')

export default class InvoiceContent extends InvoiceContentController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
  }
  handleEdit = () => {
    this.setState({ isEdit: true });
  };
  handleCancelbtn = () => {
    this.setState({ isEdit: false });
  };
  saveTerms = () => {
    this.updateUser();
    this.setState({ isEdit: false });
  };
  handleTermsChange = (e: any) => {
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val);
  };
  handleImage = (e: any) => {
    // e.target.value = null

    this.setState({
      imgSign: e.target.files[0],
      // imageName: e.target.files[0].name,
    });

    // console.log(this.state.fileData, "FileData");
  };
  handleChange = (e: any) => {
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val);
  };
  handleImageSelect = (e: any) => {
    this.setState({
      signature: e.target.files[0],
      // imageName: e.target.files[0].name,
    });
    // console.log("uploadedimage", e.target.files[0])
    // this.setState({signature: URL.createObjectURL(e.target.files[0])})
    // this.setState({images: e.target.files[0]})
    // // this.setState({imagep: e.target.files[0]})
    // console.log("updates images==>", this.state.images)
    // console.log("updated: ", this.state.pimage)
    // this.setState({imagechanged: true})
  };
  modalClose = () => {
    this.setState({ isSuccessModal: false, isEdit: false });
  };
  successErrModalBody = () => (
    <>
      <div>
        <Typography
          style={{
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            // color: "red",
          }}
        >
          {/* {this.state.isEditMode ? "User Updated Succesfully!": } */}
          {this.state.modalMsg && this.state.modalMsg}
        </Typography>
      </div>
    </>
  );
  render() {
    // const { navigation } = this.props;
    // const isLoggedIn = localStorage.getItem("token");

    return (
      <>
        {this.state.isSuccessModal && (
          <GenericSuccessModal
            isOpen={this.state.isSuccessModal}
            succesModalBody={this.successErrModalBody}
            close={this.modalClose}
          />
        )}
        <Box
          sx={{
            height: "100%",
            // overflowY: "scroll",
            width: "85vw",
            top: "50px",
            // left: "280px",
            right: 0,
            boxSizing: "border-box",
            padding: "50px 20px 10px 20px",
            position: "absolute",


            // spacing:2
          }}
          style={{ backgroundColor: "#e8e8e8" }}
          className="maindiv-box"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography className="invoicedata-heading">
              {this.state.isEdit
                ? "Editing Invoice Content"
                : "Invoice Content"}
            </Typography>

            <div className="maintermsdiv">
              <Box>
                {this.state.isEdit ? (
                  <div style={{ display: "flex", gap: "20px" }}>
                    <Button
                      className="cancel-terms-btn"
                      onClick={this.handleCancelbtn}
                    >
                      Cancel
                    </Button>
                    <Button className="save-terms-btn" onClick={this.saveTerms}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button className="edittermbtn" onClick={this.handleEdit}>
                    Edit
                  </Button>
                )}
              </Box>
            </div>
          </Box>
          <Grid style={{ width: "70%" }}>
            <Box style={{paddingTop:"20px"}}>
              <Typography className="invoice-heading">Company Name</Typography>
              {this.state.isEdit ? (
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  placeholder="Company Name"
                  type="text"
                  name="companyName"
                  className="input-type"
                  value={this.state.companyName}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
              ) : (
                <Typography>{this.state.companyName}</Typography>
              )}
            </Box>
            <Box className="box-design">
              <Typography className="invoice-heading">Address</Typography>
              {this.state.isEdit ? (
                  <TextareaAutosize

                  //   style={{ width: "100%" }}
                  minRows={6}
                  name="companyAddress"
                  className="input-address-type"
                  value={this.state.companyAddress}
                  onChange={this.handleChange}
                  aria-label="maximum height"
                  placeholder="Branch Address"
                  style={{ width: "100%" }}
                />

              ) : (
                <Typography>{this.state.companyAddress}</Typography>
              )}
            </Box>
            <Box className="box-design">
              <Typography className="invoice-heading">Signature</Typography>

              <Box className={this.state.isEdit ? "image-upload" : ""}>
                {this.state.isEdit ? (
                  this.state.imgSign ? (
                    <img
                      src={URL.createObjectURL(this.state.imgSign)}
                      style={{ width: "100", height: "100" }}
                    />
                  ) : (
                    <>
                      <img
                        src={
                          // "https://finulentproject2-187250-ruby.b187250.dev.eastus.az.svc.builder.cafe" +
                          this.state.signature
                        }
                        style={{ width: "100", height: "100" }}
                      />
                      <label className="input-label" htmlFor="input-label1">
                        <input
                          id="input-label1"
                          type="file"
                          accept="image/*"
                          onChange={(e) => this.handleImage(e)}

                        />
                      </label>

                      {/*
                    <label className="input-label" htmlFor="input-label1">
                      <CloudUploadOutlined style={{ color: "black" }} />

                      <input
                        id="input-label1"
                        type="file"
                        accept="image/*"
                        onChange={(e) => this.handleImage(e)}
                      />
                    </label> */}
                    </>
                  )
                ) : (
                  this.state.imgSign? <>
                      <img
                  src={URL.createObjectURL(this.state.imgSign)}
                    style={{ width: "100", height: "100" }}
                  />

                  </>:
                  <img
                    src={
                      // "https://finulentproject2-187250-ruby.b187250.dev.eastus.az.svc.builder.cafe" +
                      this.state.signature
                    }
                    style={{ width: "100", height: "100" }}
                  />
                )}
              </Box>
              {this.state.isEdit ? <>
                <label className="input-label" htmlFor="input-label1">
                        <input
                          id="input-label1"
                          type="file"
                          accept="image/*"
                          onChange={(e) => this.handleImage(e)}

                        />
                        <p className="update-sign">Update signature</p>
                      </label>


              </> : null}
            </Box>
            <Box style={{paddingTop:"10px"}}>
              <Typography className="account-details">
                Account Details
              </Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "20px",
                }}
              >
                {this.state.isEdit ? (
                  <div style={{ width: "100%" }}>
                    <Typography
                      component="h1"
                      style={{ marginTop: "30px", marginBottom: "10px" }}
                    >
                      {" "}
                      Account Name
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      required
                      fullWidth
                      placeholder="Account Name"
                      type="text"
                      name="accountName"
                      className="input-type"
                      value={this.state.accountName}
                      onChange={this.handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                    <Typography component="h1" style={{ marginTop: "30px" }}>
                      {" "}
                      Account No
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      required
                      fullWidth
                      placeholder="Account No"
                      type="text"
                      style={{ width: 100 }}
                      className="input-type"
                      name="accountNo"
                      value={this.state.accountNo}
                      onChange={this.handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                    <Typography component="h1" style={{ marginTop: "30px" }}>
                      {" "}
                      MICR Code
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      required
                      fullWidth
                      placeholder="MICR Code"
                      type="text"
                      style={{ width: 100 }}
                      className="input-type"
                      name="micrNo"
                      value={this.state.micrNo}
                      onChange={this.handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                    <Typography component="h1" style={{ marginTop: "30px" }}>
                      Branch IFSC Code
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      required
                      fullWidth
                      placeholder="Branch IFSC Code"
                      type="text"
                      style={{ width: 100 }}
                      className="input-type"
                      name="ifscCode"
                      value={this.state.ifscCode}
                      onChange={this.handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                    <Typography component="h1" style={{ marginTop: "30px" }}>
                      Swift Code
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      required
                      fullWidth
                      placeholder="Swift Code"
                      type="text"
                      style={{ width: 100 }}
                      className="input-type"
                      name="swiftCode"
                      value={this.state.swiftCode}
                      onChange={this.handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                    <Typography component="h1" style={{ marginTop: "30px" }}>
                      Branch Address
                    </Typography>
                    <TextareaAutosize
                     className="input-address-type"
                      //   style={{ width: "100%" }}
                      minRows={6}
                      name="branchAddress"
                      value={this.state.branchAddress}
                      onChange={this.handleChange}
                      aria-label="maximum height"
                      placeholder="Branch Address"
                      style={{ width: "100%" }}
                    />
                    <Typography component="h1" style={{ marginTop: "30px" }} >
                      {" "}
                      Whether the tax is payable under the Reverse charge
                    </Typography>
                    <Select
                      // labelId="demo-simple-select-label"
                      // id="demo-simple-select"
                      variant="outlined"
                      name="taxPay"
                      value={this.state.taxPay}
                      // label="Age"
                      className="input-type"

                      required
                      fullWidth
                      style={{ height: "40px", textAlign: "left" ,marginBottom:"50px"}}
                      onChange={this.handleChange}
                    >
                      <MenuItem value="false">No</MenuItem>
                      <MenuItem value="true">Yes</MenuItem>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <table>
                      <tbody>
                        <tr className="account-details-heading">
                          <td  className="account-content" >Account Name</td>
                          <td className="account-content" >:</td>
                          <td className="account-content" >
                            {this.state.accountName?.length &&
                              this.state.accountName}
                          </td>
                        </tr>
                        <tr className="account-details-heading">
                          <td className="account-content" >A/C Number</td>
                          <td className="account-content" >:</td>
                          <td className="account-content" >
                            {this.state.accountNo &&
                              this.state.accountNo
                                }
                          </td>
                        </tr>
                        <tr className="account-details-heading">
                          <td className="account-content" >MICR Code</td>
                          <td className="account-content" >:</td>
                          <td className="account-content"  >
                            {this.state.micrNo?.length &&
                              this.state.micrNo}
                          </td>
                        </tr>
                        <tr className="account-details-heading">
                          <td className="account-content" >Branch IFSC Code</td>
                          <td className="account-content" >:</td>
                          <td className="account-content" >
                            {this.state.ifscCode?.length &&
                              this.state.ifscCode}
                          </td>
                        </tr>
                        <tr className="account-details-heading">
                          <td className="account-content" >Swift Code</td>
                          <td className="account-content" >:</td>
                          <td className="account-content" >
                            {this.state.swiftCode?.length &&
                              this.state.swiftCode}
                          </td>
                        </tr>
                        <tr className="account-details-heading">
                          <td style={{ width: "400px" }}>Branch Address</td>
                          <td className="account-content" >:</td>
                          <td className="account-content" >
                            {this.state.branchAddress?.length &&
                              this.state.branchAddress
                               }
                          </td>
                        </tr>
                        <tr className="account-details-heading">
                          <td style={{ width: "400px" }}>
                            Whether the tax is payable under the Reverse charge
                          </td>

                          <td className="account-content" >:</td>
                          <td className="account-content" >
                            {  this.state?.taxPay? "Yes" : "No"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Box>
          </Grid>
        </Box>
      </>
    );
  }
}

const webStyle = {
  boxes: {
    marginTop: "10px",
  },
};
