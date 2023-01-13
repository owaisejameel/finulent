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
    Avatar,
    Modal,
    Typography
} from "@material-ui/core";

import MomentUtils from "@date-io/moment";
import PhoneInput from "react-phone-input-2";
import { modalCheck } from "./assets";
import { tickmark } from './assets';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
  } from "material-ui-pickers";
import "./style.css";


// import {profilePic} from './assets';
// import CatalogueNav from "../../catalogue/src/CatalogueNav.web"

const materialTheme = createMuiTheme({
    overrides: {
    //   @ts-ignore
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

      palette: {
        primary: "red", // works
      },
      MuiButton: {
        textPrimary: {
            color: "black"
        //   color: "rgb(171 114 24)",
        },
      },
      MuiIconButton: {
        root: {
          padding: "12px 12px 12px 12px",
        },
      },
  
      MuiPickersModal: {
        dialogAction: {
            color: "#e8e8e8"
        //   color: "#8bc34a",
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

import UserProfileBasicController, { Props} from "./UserProfileBasicController";
// Customizable Area End

// Customizable Area Start
export default class UserProfileEditBlock extends UserProfileBasicController {

    constructor(props: Props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    componentDidMount(): any {
        let token = localStorage.getItem("token")
        if(token) {
            this.getUser()
        }
    }

    handleCancel = () => {
        // this.props.navigation.navigate("UserProfileBlock")
        this.props.history.push("/userprofile")
    }

    handleImage = (e: any) => {
        // console.log("image", this.state.pimage)
        console.log("uploadedimage", e.target.files[0])
        this.setState({pimage: URL.createObjectURL(e.target.files[0])})
        this.setState({images: e.target.files[0]})
        // this.setState({imagep: e.target.files[0]})
        console.log("updates images==>", this.state.images)
        console.log("updated: ", this.state.pimage)
        this.setState({imagechanged: true})
    }

    handleDateChange(date: any) {
        this.setState({ btdate: date });
        console.log(this.state.btdate, "birthdate")
      }
    

    render() {
        const {navigation} = this.props;

        return (
            <>
            <div style={webStyle.container} className="boxcontainer">

                <div style={webStyle.divnav}>
                    {(localStorage.getItem("role_id") != "Superadmin") && 
                    (
                        <h3 style={webStyle.headnav} className="headnavbar">My Profile</h3>  
                    )}
                </div>
                
                <div className="content1" style={webStyle.contentBody}>

                    <Grid container spacing={2}>

                        <Grid item sm={6} style={webStyle.griditem}>
                        <label className="input-label" htmlFor="input-label" style={webStyle.label}>
                            <Avatar style={webStyle.image} src={this.state.pimage}>
                            {this.state.imagep ?
                                (<img 
                                    src={this.state.imagep}
                                    // src={`https://finulentproject2-187250-ruby.b187250.dev.eastus.az.svc.builder.cafe/${this.state.imagep}`}
                                    style={webStyle.images}
                                    // src={URL.createObjectURL(this.state.images)}
                                    // style={{ width: 100, height: 100, borderRadius: "50%" }}
                                />) : 
                                (<img src={this.state.pimage} style={webStyle.images}/>)
                                
                             } 
                            </Avatar>
                            <input
                                id="input-label"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={this.handleImage}
                            />
                                {/* <img src={this.state.pimage} alt="profile" style={webStyle.image}/> */}
                                    <br/>
                                    <span style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.profilepic) : (webStyle.profilepicother)}>Update Profile picture</span>
                                    {/* type="file"
                                    accept="image/*" */}
                            
                        </label>
                        </Grid>

                        <Grid item sm={6} style={webStyle.buttoncontainer}>
                            <Button style={webStyle.cancelbutton}  onClick={this.handleCancel}>
                                <span className="buttontext">Cancel</span>
                            </Button>
                            
                            <Button style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.savebutton) : (webStyle.savebuttonother)} onClick={this.handleUpdate}>
                            <span className="buttontext">Save</span>
                            </Button>
                        </Grid>

                    </Grid>

                </div>

                <div className="content"style={webStyle.body}>

                    <Grid container spacing={2}>
                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>First Name</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth
                                type="text"  size="small" required value={this.state.ftname}
                                placeholder={this.state.ftname} disabled />   
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>                               
                                <InputLabel style={webStyle.input}>Last Name</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth
                                type="text" placeholder={this.state.ltname} size="small" required value={this.state.ltname} disabled />
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>
                    
                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>BirthDate</InputLabel>
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
                            maxDate={new Date().setDate(
                              new Date().getDate() - 1
                            )}
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
                            value={this.state.btdate}
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
                                {/* <TextField variant="outlined" style={webStyle.text} fullWidth
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({ btdate: e.target.value });
                                  }}
                                type="text" placeholder={this.state.btdate} size="small" required value={this.state.btdate} />  */}
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Contact Number</InputLabel>
                                <div style={webStyle.textbox}>
                                <PhoneInput
                                    country={"in"}
                                    // enableSearchField
                                    enableSearch={true}
                                    disableSearchIcon
                                    inputStyle={webStyle.phoneinput}
                                    value={this.state.cellno}
                                    onChange={(phone) =>
                                        this.setState({ cellno: phone })
                                      }
                                />
                                </div>
                                {/* <TextField variant="outlined" style={webStyle.text} fullWidth
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({ cellno: e.target.value });
                                  }}
                                type="phone" placeholder={this.state.cellno} size="small" required value={this.state.cellno} />  */}
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>

                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Designation</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth
                                type="text" placeholder={this.state.design} size="small" required value={(this.state.design === null) ? "N/A" :(this.state.design)} disabled /> 
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Role</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth value={this.state.roleid}
                                type="text" placeholder={this.state.roleid} size="small" required disabled /> 
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>
                    </Grid>


                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Official Email id</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth
                                type="email" placeholder={this.state.oemail} size="small" required value={this.state.oemail} disabled /> 
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Workspace</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth
                                type="text" placeholder={this.state.workspace?.name} size="small" required disabled value={(this.state.workspace === "not found") ? "N/A" : (this.state.workspace?.name)} /> 
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>
                    </Grid>

                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                        <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Joining Date</InputLabel>
                                <TextField variant="outlined" style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.text) : (webStyle.textfilled)} fullWidth
                                type="text" placeholder={moment(this.state.jtdate).format("DD/MM/YYYY")} size="small" value={(this.state.jtdate === null) ? "N/A" : (moment(this.state.jtdate).format("DD/MM/YYYY"))} required disabled /> 
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>
                        <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Password</h4>
                                <Link style={(localStorage.getItem('role_id') === "Superadmin") ?(webStyle.changepasswordlink) : (webStyle.changepasswordlinkother)}
                                href="changepassword">
                                    Change Password</Link>
                            </Box>
                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item sm={10}>

                            <Box style={webStyle.box}>
                                <InputLabel style={webStyle.input}>Description</InputLabel>
                                <TextField variant="outlined" style={webStyle.text} fullWidth
                                type="text" placeholder={this.state.descrp} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({ descrp: e.target.value });
                                  }}
                                size="small" required multiline rows={5} value={this.state.descrp} /> 
                            </Box>

                        </Grid>
                
                    </Grid>

                    

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
                        className="modalcheck"
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
                      Profile updated
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
        // // width: "86.4%", 
        height: "fit-content", 
        // color: "#5f5f5f", 
        // fontFamily: "sans-serif" 
        // marginTop: 0, 
        // marginLeft: 230, 
        backgroundColor: "#eeeeee", 
        // width: "86.4%", 
        // width: "calc(100% + 16px)",
        // height: "100%", 
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

    label: {
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "start",
        alignItems: "start",
        marginLeft: 40,
    },

    contentBody: {
        // margin: 30,
        marginLeft: 0
    },
    
    griditem: {
        color: "#64b1f3",
        // marginLeft: 30,
    },

    image: {
        width: 120, 
        height: 110,
        // marginLeft: 30,
    },

    images: {
        width: 120, 
        height: 110,
    },

    profilepic: {
    marginTop: 10,
    fontWeight: 600,
    // marginLeft: 40
    },

    profilepicother: {
        marginTop: 10,
        fontWeight: 600,
        // color: "rgb(237 191 74)",
        color: "rgb(243 180 21)",
        },

    buttoncontainer: {
        display: "flex", 
        alignContent: "end", 
        justifyContent: "end"
    },

    cancelbutton: {
        display: "flex", 
        width: "100px", 
        border: "1px solid #cecece",
        height: "40px", 
        backgroundColor: "#e8e8e8", 
        marginRight: 10,
        fontWeight: 600,
    },

    savebutton: {
        display: "flex", 
        width: "100px", 
        border: "1px solid #cecece",
        height: "40px", 
        backgroundColor: "#64b1f3", 
        marginLeft: 10, 
        color: "white",
        fontWeight: 600,
    },

    savebuttonother: {
        display: "flex", 
        width: "100px", 
        border: "1px solid #cecece",
        height: "40px", 
        // backgroundColor: "#64b1f3", 
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        marginLeft: 10, 
        color: "black",
        fontWeight: 600,
    },

    textfilled: {
        backgroundColor: "#eeeeee", 
        color: "black", 
        margin: 10,
    },

    body: {
        marginLeft: 30
    },

    box: {
        marginTop: 10
    },

    input: {
        margin: "10 10 0 10", 
        fontWeight: 600
    },

    text: {
        backgroundColor: "white", 
        color: "black", 
        margin: 10
    },

    heading: {
        margin: 10
    },

    changepasswordlink: {
        margin: 0, 
        paddingLeft: 12, 
        color: "#64b1f3", 
        fontWeight: 600, 
    },

    changepasswordlinkother: {
        margin: 0, 
        paddingLeft: 12, 
        // color: "rgb(237 191 74)", 
        color: "rgb(243 180 21)",
        // color: "#e6aa47",
        fontWeight: 600, 
    },


    phoneinput: {
        padding: "10px 14px 10px 60px",
        width: "100%",
        backgroundColor: "white",
        // margin: 10,  
    },

    inputContact: {
        margin: "10 10 10 10", 
        fontWeight: 600
    },

    textbox: {
        backgroundColor: "white", 
        color: "black", 
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: -10,
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
        justifyContent: "center",
        width: 200,

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
        // color: "white"
    },

    okbtnsuper :{
        color: "white",
        fontWeight: 600,
        fontSize: "14px",
    },

    divnav: {
        display: "flex",
        justifyContent: "flex-start"
    },

    headnav: {
        marginLeft: 20,
        marginTop: -55,
        zIndex: 1300
    },

    loginbtnother: {
        backgroundColor:"rgb(100, 177, 243)",
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
        // color: "536c7c",
        color: "white"
    },

    modaltickcheck: {
        width: "120px", 
        height: "120px", 
        marginBottom: "8px",
        marginTop: "13px",
    },

}
// Customizable Area End