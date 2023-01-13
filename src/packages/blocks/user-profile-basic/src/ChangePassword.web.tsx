import React from 'react';
// Customizable Area Start
import {
    Box,
    Grid,
    Button,
    Link,
    InputLabel,
    TextField,
    InputAdornment,
    Modal,
    Typography,
} from "@material-ui/core";
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import { modalCheck } from "./assets";
import { passwordEye } from "./assets";
import { tickmark } from './assets';
import { infos } from "./assets";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import "./style.css";
// import CatalogueNav from "../../catalogue/src/CatalogueNav.web"
import UserProfileBasicController, { Props} from "./UserProfileBasicController";
// Customizable Area End

export default class ChangePassword extends UserProfileBasicController {
// Customizable Area Start
    constructor(props: Props) {
        super(props);
    }

    handlePasswordChangeold = (e: any) => {
        let password = e.currentTarget.value;
        console.log(password);
        this.setState({ oldpasswd: e.currentTarget.value });
        if(this.state.oldpasswd != 0) {
            this.setState({isOldErr: false})
        }
      };

    handlePasswordChange = (e: any) => {
        let password = e.currentTarget.value;
        console.log(password);
        const regex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        !regex.test(password) || password.length < 8
          ? this.setState({ isErpd: true })
          : this.setState({ isErpd: false });
        this.setState({ passwd: e.currentTarget.value });
        if(this.state.passwd != 0) {
            // this.setState({isErpd: false})
            this.setState({isErro: false})
        }
      };

      handleConfirmPasswordChange = (e: any) => {
        this.setState({ repswd: e.currentTarget.value });
        if(this.state.repswd != 0) {
            this.setState({isErcf: false})
        }
      };

      handleSave = (e: any) => {
        e.preventDefault();
        console.log("All value before check=:", this.state.isErro, this.state.isOldErr, this.state.isErcf)
        this.state.oldpasswd == 0 ? this.setState({isOldErr: true}) : null;
        // this.state.oldpasswd === 0 ? this.setState({isOldErr: true}) : this.setState({isOldErr: false});
        this.state.passwd.length == 0 ? this.setState({ isErro: true }) : null;
        // this.state.passwd.length === 0 ? this.setState({ isErro: true }) : this.setState({ isErro: false });

        this.state.repswd.length == 0
          ? this.setState({ isErcf: true })
          : null;
        // this.state.repswd.length === 0
        //   ? this.setState({ isErcf: true })
        //   : this.setState({ isErcf: false });

        // this.setNewPassword();
        console.log("All value after check:=", this.state.isErro, this.state.isOldErr, this.state.isErcf)
        let finalsol: boolean = this.state.isErro && this.state.isOldErr && this.state.isErcf
        console.log(finalsol, "all three boolean value of password")
        console.log("Calling function next")
            this.handleSavePassword();
            console.log("Function called")
        
      };
      handleVisibleOld = () => {
        this.setState({visible: !this.state.visible})
      }
      handleVisible = () => {
        this.setState({visibility: !this.state.visibility})
      }

      handleVisibleretype = () => {
        this.setState({visibilityretype: !this.state.visibilityretype})
      }

    handleCancel = () => {
        // this.props.navigation.navigate("UserProfileBlock")
        this.props.history.push("/userprofile")
    }
    handleBack = () => {
        // this.props.navigation.navigate("UserProfileEditBlock")
        this.props.history.push("/profileupdate")
    }

    // Customizable Area End
    render() {
        // Customizable Area Start
        const {navigation} = this.props;
        // Customizable Area End
        return (
            // Customizable Area Start
            <>
            {/* <CatalogueNav navigation={undefined} id={''} /> */}
            <div style={webStyle.container} className="boxcontainer">

                <div className="content1" style={webStyle.content}>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            {(localStorage.getItem('role_id') === "Superadmin") ? (
                                <ArrowLeftRoundedIcon  style={webStyle.arrow}
                                onClick={this.handleBack}/>) : (
                                <Box style={webStyle.sign} className="headnavbar">
                                    <Button
                                            variant="contained"
                                            style={webStyle.backbutton}
                                            // onClick={() => this.props.navigation.navigate("UserProfileEditBlock")}
                                            onClick={() => this.props.history.push("profileupdate")}
                                        >

                                                <ArrowBackIosIcon fontSize="small" style={webStyle.arrowback} />
                                                <span style={webStyle.back} className="buttontext">Back</span>

                                        </Button>
                                        <h3 style={webStyle.headnav}
                                        >
                                            Change password
                                        </h3>
                                </Box>)
                            }
                        </Grid>
                        <Grid item sm={6} style={webStyle.grid}>
                            <Button style={webStyle.cancel}
                                onClick={this.handleCancel}>
                                    <span className="buttontext">Cancel</span>
                            </Button>

                            <Button style={(localStorage.getItem('role_id') === "Superadmin") ? (webStyle.save) : (webStyle.saveother)}
                                onClick={this.handleSave}>
                                    <span className="buttontext">Save</span>
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                <div className="content"style={webStyle.contents}>

                    {/* <h3 style={webStyle.heading}>Change Password</h3> */}

                    {/* {(localStorage.getItem('role_id') != "Superadmin") &&
                    ( */}
                        <div>
                            <Grid container spacing={2}>
                                <Grid item sm={4} style={webStyle.innergrid}>
                                    <InputLabel style={webStyle.label}>Old Password</InputLabel>
                                    <TextField variant="outlined" style={webStyle.text} fullWidth
                                    type={this.state.visible ? "text" : "password"}
                                    placeholder="********" size="small" required value={this.state.oldpasswd}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={this.handleVisibleOld}>
                                            {this.state.visible ? <VisibilityOffOutlinedIcon /> : (
                                            <img src={passwordEye} style={{width: 30, height: 30}} />
                                            )}
                                        </InputAdornment>
                                        )
                                    }}
                                    onChange={this.handlePasswordChangeold} />
                                </Grid>
                            </Grid>
                                    {this.state.isOldErr && (
                                    <p style={webStyle.err}>
                                        Old password is required
                                    </p>
                                    )}

                        </div>
                    {/*  )} */}
                    {this.state.responseerror && <p style={webStyle.err}>{this.state.errmsggdisplay}</p>}
                    <div>
                        <Grid container spacing={2}>
                        <Grid item sm={4} style={webStyle.innergrid}>
                            <InputLabel style={webStyle.label}>New Password</InputLabel>
                            <TextField variant="outlined" style={webStyle.text} fullWidth
                            // type="password"
                            type={this.state.visibility ? "text" : "password"}
                            placeholder="********" size="small" required value={this.state.passwd}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={this.handleVisible}>
                                      {this.state.visibility ? <VisibilityOffOutlinedIcon /> : (
                                    <img src={passwordEye} style={{width: 30, height: 30}} />
                                    )}
                                  </InputAdornment>
                                )
                              }}
                            onChange={this.handlePasswordChange} />
                        </Grid>
                        </Grid>
                        {this.state.isErro && (
                            <p style={webStyle.err}>
                            Password is required
                            </p>
                        )}
                        {this.state.isErpd ? (
                            <p style={webStyle.error}>
                                <span style={webStyle.mustcontain}>Password must contain: </span>
                                <br/>
                                <p style={webStyle.innertext}>Minimum 8 characters</p>
                                <p style={webStyle.innerp}>Atleast One number, One Lowercase, One Uppercase and One
                                <br/>
                                Special Character</p>
                            </p>
                        ) : (
                            <p style={webStyle.para}>
                                <span style={webStyle.span}>Password must contain: </span>
                                <br/>
                                <p style={webStyle.innertext}>Minimum 8 characters</p>
                                <p style={webStyle.innerp}>Atleast One number, One Lowercase, One Uppercase and One
                                <br/>
                                Special Character</p>
                            </p>
                        )}
                        {/* <p style={{color: "#9fa0a2", marginLeft: 30, marginTop: -10}}>
                                <span style={{color: "#777777", fontWeight: "bold"}}>Password must contain: </span>
                                <br/>
                                <p style={{margin: 10}}>Minimum 8 characters</p>
                                <p style={{marginLeft: 10}}>Atleast One number, One Lowercase, One Uppercase and One
                                <br/>
                                Special Character</p>
                        </p> */}
                    </div>

                    <div>
                        <Grid container spacing={2}>
                        <Grid item sm={4} style={webStyle.innergrid}>
                            <InputLabel style={webStyle.label}>Re-enter Password</InputLabel>
                            <TextField variant="outlined" style={webStyle.text} fullWidth
                            // type="password"
                            type={this.state.visibilityretype ? "text" : "password"}
                            placeholder="********" size="small" required value={this.state.repswd}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={this.handleVisibleretype}>
                                      {this.state.visibilityretype ? <VisibilityOffOutlinedIcon /> : (
                                    <img src={passwordEye} style={{width: 30, height: 30}} />
                                    )}
                                  </InputAdornment>
                                )
                              }}
                            onChange={this.handleConfirmPasswordChange} />
                        </Grid>
                        </Grid>
                        {this.state.isErcf && (
                            <p style={webStyle.err}>
                            Confirm Password is required
                            </p>
                        )}
                        {this.state.passwd === this.state.repswd ||
                        this.state.isErpd ||
                        this.state.repswd.length === 0 ? null : (
                            <p style={webStyle.err}>
                            Password doesn't match{" "}
                            </p>
                        )}

                    </div>

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
                      {/* <img
                        src={modalCheck}
                        className="modalcheck"
                        style={webStyle.modalcheck}
                      /> */}
                      {(localStorage.getItem('role_id') === "Superadmin") ?
                      (<img
                        src={tickmark}
                        className="tickmark"
                        style={webStyle.modaltickcheck}
                      />) : (<img
                        src={modalCheck}
                        className="modalcheck"
                        style={webStyle.modalcheck}
                      />)}
                    </div>

                    <Typography
                    className="modalcontent"
                    style={webStyle.modalcontent}
                    >
                      <b>Password Changed</b>
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
                    // style={webStyle.modalbutton}
                    style={(localStorage.getItem('role_id') === "Superadmin") ? (webStyle.loginbtnother) :  (webStyle.modalbutton)}
                      onClick={this.handleClose}
                    >
                      <Link
                          href="userprofile"
                        //   style={webStyle.loginbtn}
                        style={(localStorage.getItem('role_id') === "Superadmin") ? (webStyle.okbtnsuper) :(webStyle.loginbtn)}
                        >
                          ok
                        </Link>
                    </Button>
                    </div>
                  </div>
                </Modal>
            )}

                </div>
            </div>
            </>
        )
    }
}
 // Customizable Area End
 // Customizable Area Start
const webStyle = {

    container: {
        // marginTop: 0,
        // marginLeft: 230,
        // backgroundColor: "#eeeeee",
        // // width: "88vw",
        // height: "100%",
        // color: "#5f5f5f",
        // fontFamily: "sans-serif"
        // marginTop: 0,
        // marginLeft: 230,
        backgroundColor: "#eeeeee",
        // width: "86.4%",
        // width: "calc(100% + 16px)",
        height: "100%",
        color: "#5f5f5f",
        fontFamily: "sans-serif",
        // height: "fit-content",
        width: "85vw",
        top: "50px",
            // left: "280px",
        right:0,
        // boxSizing:"border-box",
        padding:"30px 20px 10px 0px",
        // position: "absolute",
    },

    content: {
        margin: 0
    },

    arrow: {
        backgroundColor: "white",
        width: 30,
        height: 30,
        marginLeft: 30,
    },

    grid: {
        display: "flex",
        alignContent: "end",
        justifyContent: "end"
    },

    cancel: {
        display: "flex",
        width: "100px",
        border: "1px solid #cecece",
        height: "40px",
        backgroundColor: "#e8e8e8",
        marginRight: 10,
        fontWeight: 600
    },

    save: {
        display: "flex",
        width: "100px",
        border: "1px solid #cecece",
        height: "40px",
        backgroundColor: "#64b1f3",
        marginLeft: 10,
        color: "white",
        fontWeight: 600
    },

    saveother: {
        display: "flex",
        width: "100px",
        border: "1px solid #cecece",
        height: "40px",
        // backgroundColor: "#64b1f3",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        marginLeft: 10,
        color: "black",
        fontWeight: 600
    },

    contents: {
        marginLeft: 30
    },

    heading: {
        fontWeight: 600
    },

    innergrid: {
        margin: 10,
        padding: 10
    },

    label: {
        margin: 10,
        fontWeight: 600
    },

    text: {
        backgroundColor: "white",
        margin: 10
    },

    error: {
        color: "#9fa0a2",
        marginLeft: 30,
        marginTop: -10
    },

    mustcontain: {
        color: "red",
        fontWeight: 600
    },

    innertext: {
        margin: 10
    },

    innerp: {
        marginLeft: 10
    },

    para: {
        color: "#9fa0a2",
        marginLeft: 30,
        marginTop: -10
    },

    span: {
        color: "#777777",
        fontWeight: 600
    },

    err: {
        color: "red",
        marginLeft: 30,
        marginTop: -10
    },

    modalbackdrop: {
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

    modalbox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        justifyContent: "center"

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
        // width: "50px",
        width: "140px",
        height: "auto",
        marginTop: "13px",
        display: "flex",
        backgroundColor: "#e9e9e9",
        color: "536c7c",
        // backgroundImage:
        //     "radial-gradient(rgb(246 168 34), rgb(171 114 24))",

    },

    loginbtn: {
        color: "black",
        fontWeight: 600,
        fontSize: "14px",
    },
    okbtnsuper :{
        color: "white",
        fontWeight: 600,
        fontSize: "14px",
    },

    sign: {
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "20px",
        // marginTop: "-50px",
        fontFamily: "sans-serif",
        zIndex: 1300,
    },

    backbutton: {
        paddingLeft: "1%",
        paddingRight: "1%",
        backgroundColor: "#e9e9e9",
        color: "536c7c",
        width: "100px",
        height: '40px',
        marginTop: "-65px",
        zIndex: 1300,

    },

    arrowback: {
        color: 'gray',
        fontSize: "16px",
    },

    back: {
        marginLeft: 8,
    },

    headnav: {
        marginLeft: 10,
        marginTop: "-55px",
        zIndex: 1300,
    },
    modaltickcheck: {
        width: "120px", 
        height: "120px", 
        marginBottom: "8px",
        marginTop: "13px",
    },

    loginbtnother: {
        backgroundColor:"rgb(100, 177, 243)",
        paddingLeft: "25%",
        paddingRight: "25%",
        paddingTop: "2%",
        paddingBottom: "2%",
        fontWeight: 600,
        borderRadius: "6px",
        // width: "50px",
        width: "140px",
        height: "auto",
        marginTop: "13px",
        display: "flex",
        color: "536c7c",
    },

}

// Customizable Area End