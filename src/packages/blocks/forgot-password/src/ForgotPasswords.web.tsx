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
} from "@material-ui/core";

import { logoBackground} from './assets';
import { logoContent } from './assets';
import {passwordEye} from './assets';
import { mailBox } from "./assets";
import { passwordKey } from "./assets";
import { infos } from "./assets";
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './forgotpassword.css';
// import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Visibility from "@material-ui/icons/Visibility";


// Customizable Area End

import ForgotPasswordController, {
  Props,
} from "./ForgotPasswordController";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#0000ff",
//       contrastText: "#fff",
//     },
//   },
// });

export default class ForgotPasswords extends ForgotPasswordController {
//   constructor(props: Props) {
//     super(props);
//   }
// Customizable Area Start
validateVerify = (e: any) => {
  // e.preventDefault();
  this.state.emailValue.length == 0
      ? this.setState({ isMail: true })
      : null
      this.state.emailValue && this.handleForgot()
      // (this.state.emailValue) ? this.handleForgot() : 
  // (this.state.emailValue && /@finulent.com\s*$/.test(this.state.emailValue)) ? this.handleForgot() : this.setState({isErrorMail: true})
  // if (this.state.email && /@finulent.com\s*$/.test(this.state.email)) {
  //     this.setState({isErrorMail: false})
  //     this.handleForgot()
  //   }
  //     else {
  //       this.setState({isErrorMail: true})
  //     }
        // this.handleLogin()
}

handleEmail = (e: any) => {
  this.setState({emailValue: e.target.value})
  this.setState({otpError: false})
  if(this.state.emailValue != 0) {
    this.setState({isMail: false})
    this.setState({isErrorMail: false})
  }
}
// Customizable Area End
  render() {
    return (
      // Customizable Area Start
      <>
      <Grid container spacing={2} className="containerParent">
        <Grid item sm={5}>
            <Box sx={webStyles.background}>
                <img src={logoBackground} alt="logo" style={webStyles.sidelogo} />
            </Box>
        </Grid>
        <Grid item sm={7}>
            <Box sx={webStyles.parent}>
                {/* <img src={logoContent} alt="logo1" style={webStyles.logo} /> */}
                <Box sx={webStyles.content}>
                    <Box sx={webStyles.datas} className="forgotcondition"
                    // style={webStyles.forgotcondition}
                    // style={{alignItems: "center", display: "flex", flexDirection: "column"}}
                    >
                      <img src={logoContent} alt="logo1" style={webStyles.logo} />
                    <InputLabel style={webStyles.pageheading}>
                        Forgot Password
                    </InputLabel>
                    <p style={webStyles.captions}>Please enter your official email id</p>
                    </Box>
                    <Box sx={webStyles.boxes}>
                        <InputLabel style={webStyles.textlabels}>Official Email id</InputLabel>
                        {(this.state.isMail) || (this.state.isErrorMail) ? (
                          <TextField variant="outlined" size="small" required fullWidth error
                          style={webStyles.errorTextboxfilled}
                          placeholder="Your email id" type="text"
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //     this.setState({ emailValue: e.target.value });
                          //   }}
                          onChange={this.handleEmail}
                          InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img src={mailBox} style={webStyles.icons} />
                                </InputAdornment>
                              ),
                            }}>
                          </TextField>
                        ) : (
                          <TextField variant="outlined" size="small" required fullWidth
                        placeholder="Your email id" type="text"
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        //     this.setState({ emailValue: e.target.value });
                        //   }}
                        onChange={this.handleEmail}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={mailBox} style={webStyles.icons} />
                              </InputAdornment>
                            ),
                          }}>
                        </TextField>
                        )}
                        {/* <TextField variant="outlined" size="small" required fullWidth
                        placeholder="Your email id" type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            this.setState({ emailValue: e.target.value });
                          }}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={mailBox} style={webStyles.icons} />
                              </InputAdornment>
                            ),
                          }}>
                        </TextField> */}

                        {this.state.isMail &&
                        (<div className="errors" style={webStyles.errormsg}
                        // style={{ color: "red"}}
                        >
                          <InfoIcon fontSize="small" color="secondary" style={webStyles.infoicon}/>
                          <p style={webStyles.errorparas}>Email is required</p>
                        </div>)
                        }
                        {this.state.isMail === false && this.state.isErrorMail &&
                        (<div className="errors" style={webStyles.errormsg}
                        // style={{ color: "red"}}
                        >
                          <InfoIcon fontSize="small" color="secondary" style={webStyles.infoicon}/>
                          <p style={webStyles.errorparas}>Email must end with @finulent.com</p>
                        </div>)
                        }

{this.state.otpError && <p style={{color: "red", display: "flex", justifyContent: "center", alignItems: "center",}}>{this.state.errorValue}</p>}
                    </Box>

                    <Box>
                        <Button
                            variant="contained"
                            fullWidth
                            style={webStyles.nextbutton}
                            // onClick={this.handleForgot}
                            onClick={this.validateVerify}
                        >
                            Next
                        </Button>
                    </Box>
                    <Box style={webStyles.sign}>
                    <Button
                            variant="contained"
                            style={webStyles.backbutton}
                            onClick={() => this.props.history.push("/EmailAccountLoginsBlock")}
                        >

                                <ArrowBackIosIcon fontSize="small" style={webStyles.arrow} />
                                <span style={webStyles.back}>Back</span>

                        </Button>
                    </Box>

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
const webStyles = {
    gridParent: {
        height: "100%",
        maxWidth: "100%",
        position: "fixed",
        fontFamily: "sans-serif"
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
        fontFamily: "sans-serif"

    },

    sidelogo: {
        width: "400",
        height: "180",
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
        fontFamily: "sans-serif",
        overflowY: "scroll",
        overflowX: "scroll",
        margin: "auto",
        maxWidth: "550px",
    },

    logo: {
        width: "100",
        height: "100",
        alignSelf: "center",
        marginBottom: "10px",
        marginTop: "10px",
      },

    content :{
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
        // margin: "20px",
        display: "flex",
        // flexFlow: "column",
        fontFamily: "sans-serif",
        alignItems: "center",
        // display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        marginTop: "10px",
        marginBottom: "30px",


    },

    pageheading: {
        color: "black",
        fontSize: "22px",
        fontWeight: 600,
        padding: 16,  
    },

      captions: {
        color: "#59788ec4",
        fontWeight: 600,
        fontSize: 16
    },

    boxes: {
        marginTop: "25px",
        marginBottom: "20px",
        fontFamily: "sans-serif",
        overflowY: "scroll",
    },

    textlabels: {
        marginBottom: 15,
        fontWeight: 700,
        fontSize: "16px",
        color: "#6a6f7a",
         //   {marginBottom: 10, fontWeight: "bold", color: "#65666a", fontSize: 16}
      },

      icons: {
        width: "30px",
        height: "30px"
      },

      errors: {
        color: "red",
        alignContent: "start"
      },

    forget: {
        display: "flex",
        justifyContent: "flex-end",
        fontFamily: "sans-serif"
    },

    nextpagemove: {
        color: "rgb(237 191 74)",
        fontWeight: 600,
        alignContent: "end",
        fontSize: "14px"
      },

      nextbutton: {
        paddingLeft: "42px",
        paddingRight: "42px",
        // textTransform: "none",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        color: "black",
        fontWeight: 600,
        borderRadius: '6px',
        height: "45px",
        marginTop: "5px",
        fontSize: "14px",
        // {
        //     paddingLeft: "42%",
        //     paddingRight: "42%",
        //     textTransform: "none",
        //     // backgroundColor: "#dd951f",
        //     backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        //     color: "black",
        //     fontWeight: 'bold',
        //     borderRadius: '6px',
        //     height: "45px",
        //     fontSize: "14px",
        //     marginTop: "5%"}
      },

      backbutton: {
        paddingLeft: "12%",
        paddingRight: "12%",
        // textTransform: "none",
        // backgroundColor: "lightgray",
        // color: "gray",
        backgroundColor: "#e9e9e9",
        color: "536c7c",
        // fontWeight: 'bold',
        // borderRadius: '6px',
        width: "40px",
        height: '45px',
        marginTop: "5%"},


        arrow: {color: 'gray', fontSize: "16px"},
    sign: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginTop: "20px",
        fontFamily: "sans-serif",
        marginBottom: 20,
    },

    bottomword: {
        color: "#707279",
        fontWeight: 600,
        fontSize: "14px"
      },

      signuplink: {
        color: "rgb(237 191 74)",
        fontWeight: 600,
        alignContent: "end",
        marginLeft: 10,
        marginRight: 10,
        fontSize: "14px"
      },
      back: {marginLeft: 8},

      forgotcondition: {
        alignItems: "center", display: "flex", flexDirection: "column"
      },
      errormsg: {
        color: "red",
        display: "flex",
        // flexDirection: "row",
      },
      infoicon: {
        marginTop: "10px",
        marginRight: "2px"
      },

      errorparas: {marginTop: "12px"},

      errorTextboxfilled: {
        backgroundColor: "#fdf5f5"
      },
}

// Customizable Area End