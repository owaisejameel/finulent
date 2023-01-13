import React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  InputLabel,
  TextField,
  InputAdornment,
  Grid,
  Link,
  Modal,
} from "@material-ui/core";

import { logoBackground, logoContent, passwordEye,mailBox, passwordKey} from './assets';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import "../../../web/public/index.css";
import './email.css';
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#0000ff",
//       contrastText: "#fff",
//     },
//   },
// });

export default class EmailAccountLoginsBlock extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
  }
// Customizable Area Start
validateLogin = (e: any) => {
    e.preventDefault();
    this.state.email.length == 0
        ? this.setState({ isMail: true })
        : this.setState({ isMail: false})
        // : null;

      this.state.password.length == 0
        ? this.setState({ isPassword: true })
        :this.setState({ isPassword: false})
        // : null;
        // if (this.state.email && /@finulent.com\s*$/.test(this.state.email)) {
        //   this.setState({isErrorMail: false})
        //   this.handleLogin()
        //   this.setState({
        //     // email: "",
        //     // password: "",
        //     isMail: false,
        //     isPassword: false
        //   })
        // }
        // else {
        //   this.setState({isErrorMail: true})
        // }
          this.handleLogin()
  }

  handleVisible = () => {
    this.setState({visibility: !this.state.visibility})
  }

  termsandCondition =() => {
    this.setState({termsModalOpen: true})
  }

  CloseTermsModal = () => {
    this.setState({termsModalOpen: false})
  }

  renderTerms = () => {
    if(this.state.termsModalOpen) {
    return (
      <Modal
      className="modal-backdrop"
      open={this.state.termsModalOpen}
      onClose={this.CloseTermsModal}
    >
      <div className="modal-content-success">
       {this.state.termsandcondition && <div dangerouslySetInnerHTML={{ __html: this.state.termsandcondition }} />}
        <Button
          onClick={this.CloseTermsModal}
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
        >
          Close
        </Button>
      </div>
  
      {/* </div> */}
    </Modal>
    )
  }
  }
// Customizable Area End
  render() {

    return (
      // Customizable Area Start
      <>
      <Grid container spacing={2} className="containerParent">
        <Grid item xs={5}>
            <Box sx={webStyles.background}>
                <img src={logoBackground} alt="logo" style={webStyles.sidelogo}/>
            </Box>
        </Grid>
        <Grid item xs={7}>
            <Box sx={webStyles.parent}>
                <Box sx={webStyles.content}>
                    <Box sx={webStyles.datas}>
                    <img src={logoContent} alt="logo1" style={webStyles.logo}/>
                    <InputLabel style={webStyles.pageheading} >
                        Login to your account
                    </InputLabel>
                    </Box>
                    <Box sx={webStyles.boxes}>
                        <InputLabel style={webStyles.textlabels}>Login</InputLabel>
                        {(this.state.isMail) || (this.state.isErrorMail) ? (
                          <TextField variant="outlined" size="small" required fullWidth error
                          placeholder="Your email id" type="text"
                          value={this.state.email}
                          style={webStyles.errorTextboxfilled}
                          onChange={(e: any) => {this.setState({email: e.target.value})}}
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
                        value={this.state.email}
                        onChange={(e: any) => {this.setState({email: e.target.value})}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={mailBox} style={webStyles.icons} />
                              </InputAdornment>
                            ),
                          }}>
                        </TextField>
                        )}
                        {this.state.isMail &&
                        (<div className="errors" style={webStyles.errormsg}
                        >
                          <InfoIcon fontSize="small" color="secondary" style={webStyles.infoicon}/>
                          <p style={webStyles.errorparas}>Email is required</p>
                        </div>)
                        }
                        {this.state.isMail === false && this.state.isErrorMail &&
                        (<div className="errors" style={webStyles.errormsg}
                        >
                          <InfoIcon fontSize="small" color="secondary" style={webStyles.infoicon}/>
                          <p style={webStyles.errorparas}>Email must end with @finulent.com</p>
                        </div>)
                        }

                    </Box>
                    <Box sx={webStyles.boxes}>
                        <InputLabel style={webStyles.textlabels}>Password</InputLabel>
                        {(this.state.isPassword) || (this.state.passwordError) ?
                        (
                          <TextField variant="outlined"  size="small" required fullWidth error
                        placeholder="********"
                        type={this.state.visibility ? "text" : "password"}
                        style={webStyles.errorTextboxfilled}
                        value={this.state.password}
                        onChange={(e: any) => {this.setState({ password: e.target.value })}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={passwordKey} style={webStyles.icons} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" onClick={this.handleVisible}>
                                  {this.state.visibility ? <VisibilityOffOutlinedIcon />:(
                                <img src={passwordEye} style={{width: 30, height: 30}} />
                                )}
                              </InputAdornment>
                            )
                          }}
                          >
                        </TextField>
                        ): (
                          <TextField variant="outlined"  size="small" required fullWidth
                        placeholder="********"
                        type={this.state.visibility ? "text" : "password"}
                        value={this.state.password}
                        onChange={(e: any) => {this.setState({ password: e.target.value })}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={passwordKey} style={webStyles.icons} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" onClick={this.handleVisible}>
                                  {this.state.visibility ? <VisibilityOffOutlinedIcon />:(
                                <img src={passwordEye} style={{width: 30, height: 30}} />)}
                              </InputAdornment>
                            )
                          }}
                          >
                        </TextField>
                        )}
                    </Box>
                    {this.state.isPassword &&
                        (
                        <div className="errors" style={webStyles.errors}><InfoIcon fontSize="small" color="secondary" style={webStyles.infoicon}/> <p style={webStyles.errorparas}>Password is required</p></div>)
                        }
                        {(this.state.isPassword === false) && this.state.passwordError &&
                        (<div className="errors"style={webStyles.errors}><InfoIcon fontSize="small" color="secondary" style={webStyles.infoicon}/> <p style={webStyles.errorparas}>Invalid Username or Password</p></div>)}
                      <Box  style={webStyles.forget}>
                        <InputLabel>
                          <Button style={{marginTop: "-12px", textTransform: "none", color: "rgb(237 191 74)",fontWeight: 600, fontSize: "14px", marginLeft: "-5px", backgroundColor: "white"}} onClick={this.termsandCondition}>Terms & Conditions</Button>
                        </InputLabel>
                        <InputLabel>
                            <Link
                            href="ForgotPasswords"
                            style={webStyles.nextpagemove}
                            >
                                Forgot Password?
                            </Link>
                        </InputLabel>
                    </Box>
                    {this.renderTerms()}
                    <Box>
                        <Button
                            variant="contained"
                            fullWidth
                            style={webStyles.loginbutton}
                            onClick={this.validateLogin}
                        >
                            Login
                        </Button>
                    </Box>
                    <Box style={webStyles.sign}>
                        <InputLabel style={webStyles.bottomword}>
                            Not a member?
                            <Link
                                href="signup"
                                style={webStyles.signuplink}>
                                Signup
                            </Link>
                        </InputLabel>
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
    background: {
        display: "flex",
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
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundRepeat: "no-repeat",
        // marginTop: '30px',
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
        // padding: "16px",
        // margin: "20px",
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
        overflowY: "scroll",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10px",
    },

    pageheading: {
      color: "black",
      fontSize: "22px",
      fontWeight: 600,
      padding: 16,  
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
      color: "#6a6f7a"
    },

    icons: {
      width: "30px",
      height: "30px"
    },

    errors: {
      color: "red",
      alignContent: "start",
      display: "flex",
      marginTop: "-20px"
      // flexDirection: "row",
    },

    forget: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "sans-serif"
  },

    nextpagemove: {
      color: "rgb(237 191 74)",
      fontWeight: 600,
      alignContent: "end",
      fontSize: "14px",
      textDecoration: "none",
    },

    loginbutton: {
      paddingLeft: "42px",
      paddingRight: "42px",
      // textTransform: "none",
      backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      color: "black",
      fontWeight: 600,
      borderRadius: '6px',
      height: "45px",
      marginTop: "5%"
    },


    sign: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginTop: "20px",
        fontFamily: "sans-serif",
        marginBottom: 20
    },

    error: {
        display: "flex",
        justifyContent: "flex-start",
        fontFamily: "sans-serif"
    },

    entire: {
        display: "flex",
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
      fontSize: "14px",
      textDecoration: "none",
    },

    errormsg: {
      color: "red",
      // marginTop: -10,
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
    }
}
// Customizable Area End