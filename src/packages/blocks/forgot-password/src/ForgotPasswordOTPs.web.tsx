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
import OtpInput from "react-otp-input";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './forgotpassword.css'
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

export default class ForgotPasswordOTPs extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
  }
//   verify = (e: any) => {
//     // const otp = [this.state.otpValue1, this.state.otpValue2, this.state.otpValue3, this.state.otpValue4, this.state.otpValue5, this.state.otpValue6]
//     console.log(this.state.otpValue, "otpValue");
//     const otp = this.state.otpValue1+this.state.otpValue2+this.state.otpValue3+this.state.otpValue4+this.state.otpValue5+this.state.otpValue6;
//     console.log(otp, "otp");
//     console.log(typeof(otp), "typeof otp");
//     // console.log(otpValues, "otpValues");


//   }
// Customizable Area Start
handleChange = (otp: any) => {
  this.setState({otpVal: otp})
  this.setState({otpError: false})
}
// Customizable Area End
  render() {
    // Customizable Area Start
    const {navigation} = this.props;
// Customizable Area End
    return (
      // Customizable Area Start
      <>
      <Grid container spacing={2} className="containerParent"
      // style={{   height: "100%",
      //   maxWidth: "100%",
      //   position: "fixed",
      //   fontFamily: "sans-serif"}}
        >
        <Grid item sm={5}>
            <Box sx={webStyle.background}>
                <img src={logoBackground} alt="logo" style={webStyle.sidelogo} />
            </Box>
        </Grid>
        <Grid item sm={7}>
            <Box sx={webStyle.parent}>
                {/* <img src={logoContent} alt="logo1" style={webStyle.logo} /> */}
                <Box sx={webStyle.content}>
                    <Box sx={webStyle.datas} className="forgotcondition"
                    // style={{alignItems: "center", display: "flex", flexDirection: "column"}}
                    >
                      <img src={logoContent} alt="logo1" style={webStyle.logo} />
                    <InputLabel style={webStyle.pageheading}>
                        Forgot Password
                    </InputLabel>
                    <p style={webStyle.captions}>Please enter the 6 digit code that you have received
                    <br/><span style={webStyle.captionsecond}>on your official email id</span></p>
                    </Box>
                    <Box sx={webStyle.boxes}>
                      <Grid container>
                    <Grid item spacing={3} justify="center">
                      <div className="otps" style={webStyle.otps}
                      // style={{display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center"}}
                      >
                      <OtpInput
                      value={this.state.otpVal}
                      onChange={this.handleChange}
                        // this.setState({ otpValue1: [e.target.value] });
                        // onChange={(otp: any) => console.log(otp)}
                        numInputs={6}
                        className="inputStyles"
                        inputStyle={webStyle.inputStyles}
                        // style={webStyle.inputStyles}
                        // inputStyle={{
                        //   width: "3rem",
                        //   height: "3rem",
                        //   margin: "0 1rem",
                        //   fontSize: "2rem",
                        //   borderRadius: 4,
                        //   border: "1px solid rgba(0,0,0,0.3)"
                        // }}
                      />
                      </div>
                      </Grid>
                      </Grid>
                    </Box>
                    {this.state.otpError && <p style={{color: "red", display: "flex", justifyContent: "center", alignItems: "center",}}>{this.state.errorValue}</p>}
                    <Box style={webStyle.signs}>
                        <InputLabel style={webStyle.resend}>
                            Haven't received the code?
                            <Link
                                href="ForgotPasswords"
                                // onClick={this.handleForgot}
                                style={webStyle.resendgold}>
                                Resend
                            </Link>
                        </InputLabel>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            fullWidth
                            style={webStyle.verifybutton}
                            onClick={this.verifyOtp}
                            // onClick={this.verify}
                        >
                            Verify
                        </Button>
                    </Box>
                    <Box style={webStyle.sign}>
                    <Button
                            variant="contained"
                            style={webStyle.backbutton}
                        onClick={() => this.props.history.push("/ForgotPasswords")}
                        >

                            <ArrowBackIosIcon fontSize="small" style={webStyle.arrow} />
                            <span style={webStyle.back}>Back</span>

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
const webStyle = {
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
        alignItems: "center",
        alignContent: "center",
        overflowY: "scroll",
        overflowX: "scroll",
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
        marginLeft: "170px",
        marginRight: "170px",
        fontFamily: "sans-serif",
        overflowY: "scroll",
    },
    pageheading: {
      color: "black",
      fontSize: "22px",
      fontWeight: 600,
      padding: 16, 
    },
    captions: {
      color: "#59788ec4",
      alignSelf: "center",
      fontWeight: 600,
      fontSize: 16,
      // textAlign: "center",
      margin: 20,
  },
  captionsecond: {
    marginLeft: "110px",
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
    boxes: {
        marginTop: "10px",
        marginBottom: "20px",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginLeft: "50px",
        overflowY: "scroll",
    },
    forget: {
        display: "flex",
        justifyContent: "flex-end",
        fontFamily: "sans-serif"
    },
    sign: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        // marginTop: "20px",
        // marginBottom: '1px',
        fontFamily: "sans-serif",
        marginBottom: "20px",
    },
    signs: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        margin: '10px',
        marginBottom: '-10px',
        fontFamily: "sans-serif"
    },
    inputfield: {
      width: 60,
      height: 50,
      margin: "auto",
      borderRadius: 10,
      border: "2px solid #e9e9e9",
      fontSize: "22px",
      display: "block",

      // textAlign: 'center'
  },

    resend: {color: "#59788e", fontWeight: 600, fontSize: 14},
    resendgold: {color: "rgb(237 191 74)", fontWeight: 600, alignContent: "end", marginLeft: 10, fontSize: 14},
    verifybutton: {
      paddingLeft: "42px",
      paddingRight: "4px",
      // textTransform: "none",
      // backgroundColor: "#dd951f",
      // backgroundImage: "radial-gradient(#eaa323, #d08c1f)",
      backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      color: "black",
      fontWeight: 600,
      borderRadius: '6px',
      height: "45px",
      fontSize: "14px",
      marginTop: "5%"},
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
        back: {marginLeft: 8},

        otps: {display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center"},

        inputStyles: {
            width: "3rem",
            height: "3rem",
            margin: "0 1rem",
            fontSize: "2rem",
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.3)"
          },
}

// Customizable Area End