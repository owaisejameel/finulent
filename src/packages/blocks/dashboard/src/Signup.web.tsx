import React from "react";

import PhoneInput from "react-phone-input-2";
import MomentUtils from "@date-io/moment";
import "react-phone-input-2/lib/bootstrap.css";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import { logo } from "./assets";

import { smalllogo } from "./assets";

import { eye } from "./assets";

import { password } from "./assets";

import { mail } from "./assets";
import { info } from "./assets";
import { success } from "./assets";

import InfoIcon from "@material-ui/icons/Info";
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
  Modal,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SignupController, { Props } from "./SignupController";
import { widthFromPercentage } from "../../../framework/src/Utilities";
import "./Signup.css";
// Customizable Area Start
const materialTheme = createMuiTheme({
  overrides: {
    //@ts-ignore
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "rgb(171 114 24)",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      },
    },

    MuiPickersDay: {
      day: {
        color: "rgb(171 114 24)",
      },
      daySelected: {
        backgroundColor: "rgb(171 114 24)",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      },
      dayDisabled: {
        color: "rgb(171 114 24)",
      },
      current: {
        color: "rgb(171 114 24)",
      },
      isSelected: {
        color: "white",
        backgroundColor: "rgb(171 114 24)",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
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
    MuiIconButton: {
      root: {
        padding: "0px 0px 0px 0px",
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
        color: "rgb(171 114 24)",
      },
      dayLabel: {
        color: "rgb(171 114 24)",
      },
    },
  },
});
// Customizable Area End
export default class Signup extends SignupController {
  constructor(props: Props) {
    super(props);
    
    // Customizable Area Start
    // Customizable Area End
  }

   // Customizable Area Start
  handleVisible = () => {
    this.setState({visibility: !this.state.visibility})
  }
  handleconfirmvisibilityVisible=()=>{
    this.setState({confirmvisibility: !this.state.confirmvisibility})
  }

  handleOpen = () => {
    console.log("u clicked me ");
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.setState({ isSuccessModal: false });
  };

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <>
        <Modal
          className="modal-backdrop"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <div className="modal-content-success">
            {/* <div className="content"> */}
           {this.state.termsandcondition && <div dangerouslySetInnerHTML={{ __html: this.state.termsandcondition }} />}
            <Button
              onClick={this.handleClose}
              style={{
                paddingTop: "2%",
                paddingBottom: "2%",
                marginTop: "2%",
                textTransform: "none",
                backgroundColor: "#dd951f",
                color: "black",
                fontWeight: "bold",
                borderRadius: "6px",
                backgroundImage:
                  "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
              }}
              // style={{
              //   paddingLeft: "42%",
              //   paddingRight: "42%",

              //   marginTop: "5%",
              //   marginBottom: "5%",
              //   backgroundImage:
              //     "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
              // }}
            >
              Close
            </Button>
          </div>

          {/* </div> */}
        </Modal>

        {
          <Modal
            className="modal-backdrop"
            open={this.state.isSuccessModal}
            onClose={this.handleClose}
          >
            <div className="modal-content-success">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={success}
                  style={{ width: "250px", height: "150px" }}
                />
              </div>

              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                {this.state.errorMsg && this.state.errorMsg}
                {/* Account Created */}
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                {/* Succesfully! */}
              </Typography>
{this.state.submenu &&
              <p
                style={{
                  fontSize: "12px",
                  fontFamily: "sans-serif",
                  color: "#9fa0a2",
                }}
              >

                {" "}
                Account Creation Request sent to the
                <br />
                admin. You will receive an email notification
                <br />
                once admin activates your account{" "}
              </p>
  }

              <Button
                style={{
                  paddingLeft: "25%",
                  paddingRight: "25%",
                  paddingTop: "2%",
                  paddingBottom: "2%",
                  backgroundColor: "#dd951f",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  width: "50px",
                  height: "auto",
                  marginTop:"20px",
                  backgroundImage:
                    "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
                }}
                onClick={this.handleClose}
              >
              <Link  href="EmailAccountLoginsBlock" underline="none">  Ok</Link>
              </Button>
            </div>
          </Modal>
        }

        <Grid
          container
          // spacing={2}
          style={{  maxWidth: "100%", }}
        >
          <Grid item sm={5}>
            <Box sx={webStyle.background}>
              <img src={logo} alt="logo" style={{ width: 400 }} />
            </Box>
          </Grid>
          <Grid item sm={7} style={{overflowY:"scroll",marginTop:"10px"}}>
            <Box sx={webStyle.parent}>
              <img
                src={smalllogo}
                alt="logo1"
                style={{ width: 80, height: 80, alignSelf: "center" }}
              />

              <Box sx={webStyle.content}>
                <Box sx={webStyle.datas}>
                  <InputLabel
                    style={{
                      fontSize: "22px",
                      color: "black",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Signup
                  </InputLabel>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <InputLabel
                        style={{
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                          color: "#6a6f7a",
                          marginBottom: 10,
                          fontWeight: "bold",
                        }}
                      >
                        First Name
                      </InputLabel>
                      {/* <TextField variant="outlined" fullWidth/> */}
                      <TextField
                        variant="outlined"
                        error={   this.state.firstname ===""  &&  !this.state.page ? true:false }
                        size="small"
                        required
                        fullWidth
                        placeholder="John"
                        type="text"
                        onChange={this.handleChange}
                        // onChange={this.handleFirstname}
                        value={this.state.firstname}
                        name="firstname"
                        style={ {backgroundColor:   this.state.firstname ===""  &&  !this.state.page ? "#fdf5f5":"white" }}
                      />

                      {this.state.firstname === "" && !this.state.page && (
                        <div
                          style={{
                            color: "red",
                            marginTop: "2px",
                            fontFamily: "sans-serif",
                            display:"flex",
                            alignItems:"center"
                            // fontSize: "12px",
                          }}
                        >
                          {" "}
                          <img
                            src={info}
                            style={{ height: "15px", width: "15px",marginRight:"5px" }}
                          />
                          First Name required
                        </div>
                      )}

                      {this.state.isErrorFirstName && (
                        <p style={{ color: "red" , fontFamily: "sans-serif",
                        // fontSize: "12px"
                        }}>
                          Only characters are allowed.
                        </p>
                      )}
                    </Grid>
                    <Grid item sm={6}>
                      <InputLabel
                        style={{
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                          color: "#6a6f7a",
                          marginBottom: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Last Name
                      </InputLabel>
                      <TextField

                        variant="outlined"
                        error={this.state.lastname ===""  && !this.state.page  ?true:false}
                        size="small"
                        required
                        fullWidth
                        placeholder="Doe"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.lastname}
                        name="lastname"

                        style={ {backgroundColor: this.state.lastname ===""  && !this.state.page? "#fdf5f5":"white" }}
                      />

                      {this.state.lastname === "" && !this.state.page && (
                        <>
                          <div
                            style={{
                              color: "red",
                              marginTop: "2px",
                              fontFamily: "sans-serif",
                              display:"flex",
                              alignItems:"center"
                              // fontSize: "12px",
                            }}
                          >
                            {" "}
                            <img
                              src={info}
                              style={{ height: "15px", width: "15px",marginRight:"5px" }}
                            />{" "}
                            Last Name required
                          </div>
                        </>
                      )}
                      {this.state.isErrorLastName && (
                        <p style={{ color: "red", fontFamily: "sans-serif",  }}>
                          {" "}
                          Only characters are allowed.
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <InputLabel
                        style={{
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                          color: "#6a6f7a",
                          marginBottom: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Birthdate
                      </InputLabel>

                      <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        style={{ background: "orange" }}
                      >
                        <ThemeProvider theme={materialTheme}>
                          <DatePicker
                           error={this.state.birthDate === null && !this.state.page ? true:false}
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={ {backgroundColor: this.state.birthDate === null && !this.state.page? "#fdf5f5":"white" }}
                            maxDate={new Date().setDate(
                              new Date().getDate() - 1
                            )}
                            placeholder="MM/DD/YYYY"
                            format={"MM/DD/YYYY"}
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
                            value={this.state.birthDate}
                            onChange={this.handleDateChange}
                            disableOpenOnEnter
                            animateYearScrolling={false}
                            autoOk={true}
                            clearable
                            onInputChange={(e: any) =>
                              console.log("Keyboard:", e.target.value)
                            }
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                      {this.state.birthDate === null && !this.state.page && (
                        <div
                          style={{
                            color: "red",
                            marginTop: "2px",
                            fontFamily: "sans-serif",
                            display:"flex",
                            alignItems:"center"
                            // fontSize: "12px",
                          }}
                        >
                          {" "}
                          <img
                            src={info}
                            style={{ height: "15px", width: "15px",marginRight:"5px" }}
                          />
                          Birth date required
                        </div>
                      )}
                    </Grid>
                    <Grid item sm={6}>
                      <InputLabel
                        style={{
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                          color: "#6a6f7a",
                          marginBottom: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Contact Number
                      </InputLabel>

                      <PhoneInput
                       isValid={this.state.contactNo === "" && !this.state.page ? false : true}
                        country={"in"}
                        // searchClass={ {backgroundColor: "#fdf5f5" }}
                        // enableSearchField
                        enableSearch={true}
                        disableSearchIcon
                        inputStyle={{
                          padding: "10px 14px 10px 60px",
                          width: "100%",
                          backgroundColor: this.state.contactNo === "" && !this.state.page ? "#fdf5f5":"white"
                        }}
                        value={this.state.contactNo}
                        onChange={(phone) =>
                          this.setState({ contactNo: phone })
                        }
                      />

                      {this.state.contactNo === "" && !this.state.page && (
                        <>
                          <div
                            style={{
                              color: "red",
                              marginTop: "2px",
                              fontFamily: "sans-serif",
                              display:"flex",
                              alignItems:"center"
                              // fontSize: "12px",
                            }}
                          >
                            <img
                              src={info}
                              style={{ height: "15px", width: "15px",marginRight:"5px" }}
                              sizes="small"
                            />
                            Contact No required
                          </div>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box style={{ marginTop: "10px" }}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      fontFamily: "sans-serif",
                      color: "#6a6f7a",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Official Email Id
                  </InputLabel>

                  <TextField
                    variant="outlined"

                    error={this.state.email === "" && !this.state.page ?true:false}

                    size="small"
                    required
                    fullWidth
                    placeholder="Your email id"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.email}
                    name="email"

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={mail} style={{ width: 30, height: 30 }} />
                        </InputAdornment>
                      ),
                    }}
                    style={ {backgroundColor:this.state.email === '' && !this.state.page? "#fdf5f5":"white" }}

                  />
                  {this.state.email === "" && !this.state.page && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "2px",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        display:"flex",

                        // fontSize: "12px",
                      }}
                    >
                      <img
                        src={info}
                        style={{ height: "15px", width: "15px",marginRight:"5px" }}
                      />
                      Email is required
                    </div>
                  )}
                  { !(this.state.email === "") && this.state.isErrorEmail && (
                    <div
                      style={{
                        color: "red",
                        fontFamily: "sans-serif",
                        display:"flex",
                        alignItems:"center"
                        // fontSize: "12px",
                      }}
                    >
                      {" "}
                      <img
                        src={info}
                        style={{ height: "15px", width: "15px",marginRight:"5px" }}
                      />
                      Email must end with @finulent.com
                    </div>
                  )}
                </Box>

                <Box style={{ marginTop: "10px" }}>
                  <InputLabel
                    style={{
                      marginBottom: 10,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#6a6f7a",
                    }}
                  >
                    Password
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    error={this.state.password === "" && !this.state.page ?true:false}
                    size="small"
                    required
                    fullWidth
                    name="password"
                    placeholder="********"
                    type={this.state.visibility ?"text":"password"}
                    value={this.state.password}
                    onChange={this.handleChange}
                    style={ {backgroundColor:this.state.password === "" && !this.state.page ? "#fdf5f5":"white" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={password}
                            style={{ width: 30, height: 30 }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" onClick={this.handleVisible}>
                          {this.state.visibility ? < VisibilityOffOutlinedIcon /> : (
                        <img src={eye} style={{width: 30, height: 30}} />
                        )}
                      </InputAdornment>
                    )
                    }}


                  />

                  {this.state.password === "" && !this.state.page && (
                    <>
                      <div
                        style={{
                          color: "red",
                          fontFamily: "sans-serif",
                          display:"flex",
                          alignItems:"center"
                          // fontSize: "12px",
                        }}
                      >
                        <img
                          src={info}
                          style={{ height: "15px", width: "15px",marginRight:"5px" }}
                        />
                        Password is required
                      </div>
                    </>
                  )}

                  {this.state.isErrorPassword ? (
                    <p style={{ color: "red", fontFamily: "sans-serif" }}>
                      Password must contain:
                      <br />
                      <p
                        style={{
                          margin: 15,
                          color: "#9fa0a2",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Minimum 8 characters
                      </p>
                      <p
                        style={{
                          marginLeft: 15,
                          color: "#9fa0a2",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Atleast One number, One Lowercase, One Uppercase and One
                        Special Character
                      </p>
                    </p>
                  ) : (
                    <p style={{ color: "#9fa0a2" }}>
                      <span
                        style={{
                          color: "#777777",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Password must contain:{" "}
                      </span>
                      <br />
                      <p style={{ margin: 10, fontFamily: "sans-serif" }}>
                        Minimum 8 characters
                      </p>
                      <p style={{ marginLeft: 10, fontFamily: "sans-serif" }}>
                        Atleast One number, One Lowercase, One Uppercase and One
                        Special Character
                      </p>
                    </p>
                  )}
                </Box>

                <Box style={{ marginTop: "10px" }}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      fontFamily: "sans-serif",
                      color: "#6a6f7a",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Confirm Password
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    error={this.state.confirmpwd === "" && !this.state.page?true:false}
                    size="small"
                    required
                    fullWidth
                    placeholder="********"
                    type={this.state.confirmvisibility ?"text":"password"}
                    onChange={this.handleChange}
                    value={this.state.confirmpwd}
                    name="confirmpwd"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={password}
                            style={{ width: 30, height: 30 }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" onClick={this.handleconfirmvisibilityVisible}>
                          {this.state.confirmvisibility ? < VisibilityOffOutlinedIcon/> : (
                        <img src={eye} style={{width: 30, height: 30}} />
                        )}
                      </InputAdornment>
                    )
                    }}
                    style={ {backgroundColor:this.state.confirmpwd === "" && !this.state.page ? "#fdf5f5":"white" }}
                  />
                  {this.state.confirmpwd === "" && !this.state.page && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "2px",
                        fontFamily: "sans-serif",
                        display:"flex",
                        alignItems:"center"
                        // fontSize: "12px",
                      }}
                    >
                      <img
                        src={info}
                        style={{ height: "15px", width: "15px",marginRight:"5px" }}
                      />
                      Confirm Password required
                    </div>
                  )}
                  {this.state.confirmpwd === this.state.password ||
                  this.state.confirmpwd.length === 0 ? null : (
                    <p style={{ color: "red", marginTop: "2px", fontFamily: "sans-serif",  }}>
                      Password does not match
                    </p>
                  )}
                </Box>

                <Box
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontFamily: "sans-serif",
                    color: "#6a6f7a",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight:"bold"
                    }}
                  >
                    <p>
                      By registering you agree with{" "}
                      <Button
                        onClick={this.handleOpen}
                        style={{
                          color: "rgb(237 191 74)",
                          display: "inline",
                          fontWeight: 600,
                          alignContent: "end",
                          backgroundColor: "Transparent",
                          fontSize: 14,
                          border: "none",
                          textTransform:'none',
                          padding:"0px"
                        }}
                      >
                        Terms & Conditions
                      </Button>
                    </p>
                  </div>
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={(e: any) => this.handleSubmit(e)}
                    className="loginbtn"
                    style={{
                      paddingLeft: "42%",
                      paddingRight: "42%",
                      textTransform: "none",
                      backgroundColor: "#dd951f",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      marginTop: "5%",
                      marginBottom: "5%",
                      backgroundImage:
                        "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
                    }}
                  >
                    Signup
                  </Button>
                </Box>

                <Box style={{ textAlign: "center", fontSize: 14, marginBottom:"50px" }}>
                  <InputLabel
                    style={{
                      color: "rgb(124 123 128);",
                      fontSize: 14,
                      fontFamily: "sans-serif",
                      fontWeight:"bold"
                    }}
                  >
                    Already have an account?
                    <Link
                      href="EmailAccountLoginsBlock"
                      style={{
                        color: "rgb(237 191 74)",
                        fontWeight: 600,
                        alignContent: "end",
                        fontSize: 14,
                        marginLeft: 10,
                      }}
                    >
                      Login
                    </Link>
                  </InputLabel>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start



const webStyle = {
  gridParent: {
    height: "100%",
    maxWidth: "100%",
    position: "fixed",
  },
  background: {
    display: "flex",
    // alignitems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
  parent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundRepeat: "no-repeat",
    maxWidth:"550px",
    margin:"auto"
  },
  content: {
    padding: "16px",
    // marginLeft: "150px",
    // marginRight: "150px",
  },
  datas: {
    alignItem: "center",
    justifyContent: "center",
    margin: "10px",
    paddingBottom: "5px",
  },
  boxes: {
    // marginTop: "10px",
  },
  modal: {
    margin: "25%",
    position: "relative",
  },
  datePicker: {
    background: "orange",
  },
  errorTextboxfilled: {
    backgroundColor: "#fdf5f5"
  }

};
// Customizable Area End
