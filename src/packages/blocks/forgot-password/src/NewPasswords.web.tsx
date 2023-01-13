import React from "react";
// Customizable Area Start
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
  Link,
  Modal,
} from "@material-ui/core";

import { logoBackground } from "./assets";
import { logoContent } from "./assets";
import { passwordEye } from "./assets";
import { mailBox } from "./assets";
import { passwordKey } from "./assets";
import { modalCheck } from "./assets";
import { infos } from "./assets";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InfoIcon from "@material-ui/icons/Info";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import './forgotpassword.css';
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Visibility from "@material-ui/icons/Visibility";

// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#0000ff",
//       contrastText: "#fff",
//     },
//   },
// });

export default class NewPasswords extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
  }
  // Customizable Area Start
  handlePasswordChange = (e: any) => {
    let password = e.currentTarget.value;
    console.log(password);
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    !regex.test(password) || password.length < 8
      ? this.setState({ isErrorPassword: true })
      : this.setState({ isErrorPassword: false });
    this.setState({ password: e.currentTarget.value });
    if(this.state.password != 0 ) {
      this.setState({isError: false})
    }
    if(this.state.password === ""){
      this.setState({isErrorPassword: false})
    }
  };

  handleConfirmPasswordChange = (e: any) => {
    this.setState({ reTypePassword: e.currentTarget.value });
    if (this.state.reTypePassword != 0 ) {
      this.setState({isErrorConfirm: false})
    }
  };

  handleVisible = () => {
    this.setState({visibility: !this.state.visibility})
  }

  handleVisibleretype = () => {
    this.setState({visibilityretype: !this.state.visibilityretype})
  }

  handleSave = (e: any) => {
    e.preventDefault();
    this.state.password.length == 0 ? this.setState({ isError: true }) : this.setState({ isError: false})

    this.state.reTypePassword.length == 0
      ? this.setState({ isErrorConfirm: true })
      : this.setState({ isErrorConfirm: false})

    this.setNewPassword();
  };
// Customizable Area End
  render() {
    const { navigation } = this.props;
// Customizable Area Start
    return (
      <>
        <Grid container spacing={2} className="containerParent">
          <Grid item sm={5}>
            <Box sx={webStyle.background}>
              <img src={logoBackground} alt="logo" className="sidelogo" style={webStyle.sidelogo}/>
            </Box>
          </Grid>
          <Grid item sm={7}>
            <Box sx={webStyle.parent}>
              <Box sx={webStyle.content}>
                <Box sx={webStyle.datas} style={webStyle.newcontain}>
                  <img src={logoContent} alt="logo1" className="logos" style={webStyle.logos}/>
                  <InputLabel className="label" style={webStyle.label}>
                    Forgot Password
                  </InputLabel>
                  <p className="textlabel" style={webStyle.textlabel}>
                    Create new password
                  </p>
                </Box>
                <Box sx={webStyle.boxes}>
                  <InputLabel className="inputs" style={webStyle.inputs}>
                    New Password
                  </InputLabel>
                  {(this.state.isError) || (this.state.isErrorPassword) ? (
                    <TextField variant="outlined" size="small" required fullWidth error placeholder="********" type={this.state.visibility ? "text" : "password"} className="textbox" style={webStyle.errorTextboxfilled}
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><img src={passwordKey} className="icons" style={webStyle.icons}/></InputAdornment>),
                      endAdornment: (<InputAdornment position="end" onClick={this.handleVisible}>{this.state.visibility ? <VisibilityOffOutlinedIcon /> : (<img src={passwordEye} style={{width: 30, height: 30}} />)}</InputAdornment>)
                    }}
                    onChange={this.handlePasswordChange}/>
                  ) : (
                    <TextField variant="outlined" size="small" required fullWidth placeholder="********" type={this.state.visibility ? "text" : "password"} className="textbox"
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><img src={passwordKey} className="icons" style={webStyle.icons}/></InputAdornment>),
                      endAdornment: (<InputAdornment position="end" onClick={this.handleVisible}>{this.state.visibility ? <VisibilityOffOutlinedIcon /> : (<img src={passwordEye} style={{width: 30, height: 30}} />)}</InputAdornment>)
                    }}
                    onChange={this.handlePasswordChange} />
                  )}
                  {this.state.isError && (
                    <div className="errors" style={webStyle.errors}>
                      <InfoIcon fontSize="small" color="secondary" style={webStyle.infoicon}/> 
                      <p style={webStyle.errorparas}>Password is required</p>
                    </div>
                  )}

                  {(this.state.password != 0) && this.state.isErrorPassword ? (
                    <p className="errors" >
                      <div style={webStyle.errors}>
                      <InfoIcon fontSize="small" color="secondary" style={webStyle.infoicon}/> 
                      <span style={webStyle.errorparas}>Password must contain:</span>
                      <br />
                      </div>
                      <div>
                      <p className="mustcontain" style={webStyle.errorcon}>
                        Minimum 8 characters
                      </p>
                      <p className="mustcontain" style={webStyle.errorat}>
                        Atleast One number, One Lowercase, One Uppercase and One
                        Special Character
                      </p>
                      </div>
                    </p>
                  ) : (
                    <p className="mustcontains" style={webStyle.mustcontains}>
                      <span className="insidecontent" style={webStyle.insidecontent}>
                        Password must contain:{" "}
                      </span>
                      <br />
                      <p className="mini" style={webStyle.mini}>
                        Minimum 8 characters
                      </p>
                      <p className="atleast" style={webStyle.atleast}>
                        Atleast One number, One Lowercase, One Uppercase and One
                        Special Character
                      </p>
                    </p>
                  )}
                </Box>
                <Box sx={webStyle.boxes}>
                  <InputLabel className="inputs" style={webStyle.inputs}>
                    Re-enter new Password
                  </InputLabel>
                  {(this.state.isErrorConfirm || ((this.state.reTypePassword != 0 && this.state.reTypePassword != this.state.password)))
                   ? (
                    <TextField variant="outlined" size="small" required fullWidth error placeholder="********" type={this.state.visibilityretype ? "text" : "password"} className="textbox" style={webStyle.errorTextboxfilled}
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><img src={passwordKey} className="icons" style={webStyle.icons}/></InputAdornment>),
                      endAdornment: (<InputAdornment position="end" onClick={this.handleVisibleretype}>{this.state.visibilityretype ? <VisibilityOffOutlinedIcon /> : (<img src={passwordEye} style={{width: 30, height: 30}} />)}</InputAdornment>)
                    }}
                    onChange={this.handleConfirmPasswordChange}
                  />
                  ) : (
                    <TextField variant="outlined" size="small" required fullWidth placeholder="********" type={this.state.visibilityretype ? "text" : "password"} className="textbox"
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><img src={passwordKey} className="icons" style={webStyle.icons}/></InputAdornment>),
                      endAdornment: (<InputAdornment position="end" onClick={this.handleVisibleretype}>{this.state.visibilityretype ? <VisibilityOffOutlinedIcon /> : (<img src={passwordEye} style={{width: 30, height: 30}} />)}</InputAdornment>)
                    }}
                    onChange={this.handleConfirmPasswordChange}/>
                  )}
                  {this.state.isErrorConfirm && (
                    <div className="errors" style={webStyle.errors}
                    >
                      <InfoIcon fontSize="small" color="secondary" style={webStyle.infoicon}/> 
                      <p style={webStyle.errorparas}>Confirm Password is required</p>
                    </div>
                  )}
                  {this.state.password === this.state.reTypePassword ||
                  this.state.isErrorPassword ||
                  this.state.reTypePassword.length === 0 ? null : (
                    <p className="errors" style={webStyle.errors}
                    >
                      <InfoIcon fontSize="small" color="secondary" style={webStyle.infoicon}/> 
                      <p style={webStyle.errorparas}>Password doesn't match{" "}</p>
                    </p>
                  )}
                </Box>
                <Box style={{marginBottom: 40}}>
                  <Button
                    variant="contained"
                    fullWidth
                    className="buttons"
                    style={webStyle.buttons}
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                </Box>

                {this.state.modalOpen && (
                  <Modal className="modalbackdrop"
                  style={webStyle.modalbackdrop}
                  open={this.state.isSuccessModal}
                  onClose={this.handleClose}
                >
                  <div className="modalcontentsuccess"
                  style={webStyle.modalcontentsuccess}
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
                      New Password Changed
                    </Typography>
                    <Typography
                    className="modalcontent"
                    style={webStyle.modalcontent}
                    >
                      Successfully!
                    </Typography>
                    <div style={webStyle.button}>
                    <Button
                    className="modalbutton"
                    style={webStyle.modalbutton}
                      onClick={this.handleClose}
                    >
                      <Link
                          href="/EmailAccountLoginsBlock"
                          style={webStyle.loginbtn}
                        >
                          Login
                        </Link>
                    </Button>
                    </div>
                  </div>
                </Modal>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
// Customizable Area End
// Customizable Area Start
const webStyle = {
  gridParent: {
    height: "100%",
    maxWidth: "100%",
    position: "fixed",
    fontFamily: "sans-serif",
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
    fontFamily: "sans-serif",
  },
  parent: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundRepeat: "no-repeat",
    // marginTop: "30px",
    fontFamily: "sans-serif",
    overflowY: "scroll",
    overflowX: "scroll",
    // marginBottom: '50px'
    marginTop: "-10px",
    margin: "auto",
    maxWidth: "550px",
  },
  content: {
    padding: "16px",
    margin: "20px",
    // marginLeft: "180px",
    // marginRight: "180px",
    fontFamily: "sans-serif",
    overflowY: "scroll",
  },
  datas: {
    alignItem: "center",
    justifyContent: "center",
    // margin: "10px",
    display: "flex",
    marginBottom: "30px",
    fontFamily: "sans-serif",
    alignItems: "center",
      //   display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    marginTop: "10px",
  },
  boxes: {
    marginTop: "25px",
    marginBottom: "20px",
    fontFamily: "sans-serif",
    overflowY: "scroll",
  },
  forget: {
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "sans-serif",
  },
  sign: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    marginTop: "20px",
    fontFamily: "sans-serif",
  },
  modalDesign: {
    height: "200px",
    marginLeft: "450px",
    marginTop: "280px",
    backgroundColor: "white",
    width: "302px",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    zIndex: "1300",
  },

  modalbackdrop: {
    // position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  modalcontentsuccess: {
    width: "20%",
    height: "35%",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    // padding: "25px",
    // textAlign: "center",
    // display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sidelogo: { 
    width: 400, 
    height: 180 
  },
  logos: { 
    width: 100, 
    height: 100, 
    alignSelf: "center",
    marginBottom: "10px",
    marginTop: "10px",
  },
  newcontain: {
    alignItems: "center",
    display: "flex",
    // flexDirection: "column",
  },

  label: {
      color: "black",
      fontWeight: 600,
      fontSize: "22px",
      paddingTop: 16, 
      
    },
    textlabel: { color: "#59788ec4", fontWeight: 600 },

    inputs: {
        marginBottom: 15,
        fontWeight: 700,
        fontSize: "16px",
        color: "#6a6f7a",
      },
errors: { color: "red", display: "flex" },
errorcon: { margin: 15, color: "#9fa0a2" },
// textbox: { borderRadius: "6px", fontSize: "12px" },
icons: { width: 30, height: 30 },
errorat: { marginLeft: 15, color: "#9fa0a2" },
mustcontains: { color: "#9fa0a2" },
insidecontent: { color: "#777777", fontWeight: 600 },
mini: { margin: 10 },
atleast: { marginLeft: 10 },
buttons: {
  paddingLeft: "42%",
  paddingRight: "42%",
  // textTransform: "none",
  backgroundImage:
    "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
  color: "black",
  fontWeight: 600,
  borderRadius: "6px",
  height: "45px",
  marginTop: "5%",
},
modalbox: { display: "flex", justifyContent: "center", alignItems: "center", },
// modalcheck: { width: "250px", height: "150px" },
modalcheck: {width: "200px", height: "100px", marginBottom: "25px"},
modalcontent: {
    fontSize: "16px",
    fontFamily: "sans-serif",
    fontWeight: 600,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    display: "flex"
  },
  modalbutton: {
      paddingLeft: "25%",
      paddingRight: "25%",
      paddingTop: "2%",
      paddingBottom: "2%",
      // backgroundColor: "#dd951f",
      // color: "black",
      fontWeight: 600,
      borderRadius: "6px",
      width: "200px",
      height: "auto",
      marginTop: "13px",
      display: "flex",
      // backgroundImage:
      //   "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      backgroundColor: "#e9e9e9",
      color: "536c7c",
    },
    loginbtn: {
      color: "black",
      fontWeight: 600,
      fontSize: "14px",
    },
    button: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginBottom: "20",
    },

    infoicon: {
      marginTop: "10px",
      marginRight: "2px"
    },

    errorparas: {marginTop: "12px"},

    errorTextboxfilled: {
      backgroundColor: "#fdf5f5"
    },





};
// Customizable Area End