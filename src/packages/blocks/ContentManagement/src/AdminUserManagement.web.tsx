import React from "react";
import PhoneInput from "react-phone-input-2";
import MomentUtils from "@date-io/moment";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";

import Avatar from "@material-ui/core/Avatar";

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Menu,
  // MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TablePagination,
  Link,
  CircularProgress,



} from "@material-ui/core";
// import Pagination from "@material-ui/core/Pagination";

import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from '@material-ui/icons/Check';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import GenericModal from "./GenericModal.web";
import GenericSuccessModal from "./GenericSuccessModal.web";
import  {filter } from "./assets"
// Customizable Area End

import UserManagementController, { Props } from "./UserManagementController";
import "./UserManagement.css";
import { widthFromPercentage } from "../../../framework/src/Utilities";
export const configJSONBase = require("../../../framework/src/config");

const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
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
        color: "rgb(171 114 24)",
      },
      dayLabel: {
        color: "rgb(171 114 24)",
      },
    },
  },
});
const usePlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#aaa"
  }
}));


const Placeholder:React.FunctionComponent = ({children}) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};

// const  isLoggedIn = localStorage.getItem('token')

export default class UserManagement extends UserManagementController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
    console.log(props, 'Props')
  }
  handleOpen = () => {
    // alert("here");

    // this.setState({ modalOpen: true });
    this.setState({ genericModalOpen: true });
    this.getWorkspaces();
    // this.getUsers();
  }


  handleClose = () => {
    this.setState({ genericModalOpen: false,isEditMode:false, firstname:'',lastname:'', birthDate:null,
    joiningDate:null,
    email:"",
    contactNo:"",
    password:'',
    role:"",
    desc:"",
    workspace:"",
    designation: "",
    fileData:"",page:true,isErrorEmail:false});
  };
  modalClose = () => {
    this.setState({ isSuccessModal: false ,genericModalOpen:false,modalMsg:"",isEditMode:false,modalVarient:""});
  };
  handleImage = (e: any) => {

    this.setState({
      fileData: e.target.files[0],
      // imageName: e.target.files[0].name,
    });

    console.log(this.state.fileData, "FileData");
  };
  handleDateChange = (date: any) => {
    // let birth = new Date(date).toLocaleDateString();
    this.setState({ birthDate: date });
  };
  handleJoingDateChange = (date: any) => {
    // let joinDate = new Date(date).toLocaleDateString();
    this.setState({ joiningDate: date });
  };

  handleAction = () => {
    console.log("Action");

    if (this.state.page) {
      this.setState({ page: false });
    }

    // if (this.state.email && /@finulent.com\s*$/.test(this.state.email)) {

      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.birthDate &&
        this.state.email &&
        this.state.contactNo &&
        this.state.designation&&
        this.state.role &&
        this.state.workspace&&
        this.state.fileData
      ) {

        this.setState({ isErrorEmail: false });
        // this.handleSubmitApiCall();
        if(this.state.isEditMode){
          this.updateUser()
        }else{
          this.handleAddAction();
        }
        this.setState({
          page: true,
          firstname:"",
          lastname:"",
          birthDate:null,
          joiningDate:null,
          email:"",
          contactNo:"",
          password:'',
          designation:"",
          // isSuccessModal:true,
         role:"",
         desc:"",
         workspace:"",

         fileData:"",

          isErrorFirstName:false,
          isErrorLastName:false,
          isErrorPassword:false,

        })
      }
    // } else {

    //   this.setState({ isErrorEmail: true,  });
    // }
    // this.handleAddAction();
  };
  handleChange = (e: any) => {
    let char, email;
    e.persist();
    if (e.target.name == "password") {

      let password = e.currentTarget.value;

      const regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      !regex.test(password) || password.length < 5
        ? this.setState({ isErrorPassword: true })
        : this.setState({ isErrorPassword: false });
      this.setState({ password: e.currentTarget.value });
    } else if (e.target.name == "firstname") {
      char = /^[a-zA-Z ]*$/.test(e.currentTarget.value);
      char
        ? this.setState({
            isErrorFirstName: false,
            firstname: e.currentTarget.value,
          })
        : this.setState({ isErrorFirstName: true });
    } else if (e.target.name == "lastname") {
      char = /^[a-zA-Z ]*$/.test(e.currentTarget.value);
      char
        ? this.setState({
            isErrorLastName: false,
            lastname: e.currentTarget.value,
          })
        : this.setState({ isErrorLastName: true });
    } else {
      const val = {
        ...this.state,
        [e.target.name]: e.target.value,
      };
      this.setState(val);
    }
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
          {this.state.modalMsg && this.state.modalMsg }

        </Typography>


      </div>
    </>
  );
  modalBody = () => (
    <>
      <Grid >
        <Box sx={webStyle.parent} style={{backgroundColor:"#F5F5F5"}}>
          <div className="imageupload" style={{display:"flex"}}>
            {/* <input type="file" style={{display:'none'}} /> */}

            <label className="input-label" htmlFor="input-label">
              <Avatar
              className="img-avatar"

              >
                {this.state.fileData ? (
                  <img
                  // src="https://minio.b187250.dev.eastus.az.svc.builder.cafe/sbucket/qqy5buwy6h3g4mu13gome1zto1gg?response-content-disposition=inline%3B%20filename%3D%22Screenshot%202022-07-29%20at%204.49.28%20PM.png%22%3B%20filename%2A%3DUTF-8%27%27Screenshot%25202022-07-29%2520at%25204.49.28%2520PM.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20220829%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20220829T103839Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7bbc31658fd7358532a2c69a64e8ccf3ecc81ba36e7effbff55747d5da24bb8b"
                    // src={URL.createObjectURL(this.state.fileData)}
                    src={this.state.isEditMode ? this.state.fileData :URL.createObjectURL(this.state.fileData)}
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                  />
                ) : (
                  <CloudUploadOutlined style={{ color: "black" }} />
                )}
              </Avatar>
              {this.state.isEditMode ? <></>:   <input
                id="input-label"
                type="file"
                accept="image/*"
                onChange={(e) => this.handleImage(e)}
              />}

                <h4 className="profile-name">UPLOAD PROFILE PICTURE *</h4>
                {this.state.fileData === "" && !this.state.page && (
                  <p
                  className="errMsg"

                  >
                    {" "}

                   Profile Picture is required
                  </p>
             )}

            </label>

          </div>

          <Box>
            <Grid container spacing={2}>
              <Grid item sm={6} spacing={2}>
                <InputLabel
                  className="inputLabel"

                >
                  First Name*
                </InputLabel>

                <TextField
                  variant="outlined"
                  size="small"
                  required
                  className="background"
                  fullWidth
                  placeholder="John"
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
                {this.state.firstname === "" && !this.state.page && (
                  <p
                  className="errMsg"
                    // style={{
                    //   color: "red",
                    //   marginTop: "2px",
                    //   fontFamily: "sans-serif",
                    //   fontSize: "12px",
                    // }}
                  >
                    {" "}
                    {/* <img
                            src={info}
                            style={{ height: "15px", width: "15px" }}
                          /> */}
                    First Name required
                  </p>
                )}

                {this.state.isErrorFirstName && (
                  <p
                  className="character-message"

                  >
                    Only characters are allowed.
                  </p>
                )}
              </Grid>
              <Grid item sm={6}>
                <InputLabel
                  className="inputLabel"

                >
                  Last Name*
                </InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  className="background"
                  required
                  fullWidth
                  placeholder="Doe"
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
                  {this.state.lastname === "" && !this.state.page && (
                <>
                  <p
                    className="errMsg"
                    style={{
                      color: "red",
                      marginTop: "2px",
                      fontFamily: "sans-serif",
                      fontSize: "12px",
                    }}
                  >
                    {" "}

                    Last Name required
                  </p>
                </>
              )}
              {this.state.isErrorLastName && (
                <p
                className="character-message"

                >
                  {" "}
                  Only characters are allowed.
                </p>
              )}
              </Grid>

            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={6} style={webStyle.boxes}>
                <InputLabel
                  className="inputLabel"

                >
                  Birthdate*
                </InputLabel>

                <MuiPickersUtilsProvider
                  utils={MomentUtils}
                  style={{ background: "orange" }}
                >
                  <ThemeProvider theme={materialTheme}>
                    <DatePicker
                      keyboard
                      className="background"
                      variant="outlined"
                      size="small"
                      fullWidth
                      maxDate={new Date().setDate(new Date().getDate() - 1)}
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
                  <p
                  className="errMsg"

                  >
                    {" "}

                    Birth date required
                  </p>
                )}
              </Grid>
              <Grid item sm={6} style={webStyle.boxes}>
                <InputLabel
                  className="inputLabel"

                >
                  Contact Number*
                </InputLabel>

                <PhoneInput
                  country={"in"}

                  enableSearch={true}
                  disableSearchIcon
                  inputStyle={{
                    padding: "10px 14px 10px 60px",
                    width: "100%",

                    backgroundColor:"white"
                  }}
                  value={this.state.contactNo}
                  onChange={(phone) => this.setState({ contactNo: phone })}
                />
                {this.state.contactNo === "" && !this.state.page && (
                  <>
                    <p
                    className="errMsg"

                    >

                      Contact No required
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2} style={webStyle.boxes}>
              <Grid item sm={6} spacing={2}>
                <InputLabel className="inputLabel">Designation*</InputLabel>
                {/* <TextField variant="outlined" fullWidth/> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  className="background"
                  value={this.state.designation}
                  name="designation"
                  // label="Age"
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px",textAlign:"left" }}
                >

                  {this.state.designationList && this.state.designationList?.map((item:any) =>(
                    <MenuItem value={item.name}>{item.name} </MenuItem>
                  ))}

                </Select>
                {this.state.designation === "" && !this.state.page && (
                  <>
                    <p
                    className="errMsg"

                    >

                     Designation is required
                    </p>
                  </>
                )}
              </Grid>
              <Grid item sm={6}>
                <InputLabel className="inputLabel">Role*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  value={this.state.role}
                  name="role"
                  className="background"
                  // label="Age"
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth

                  style={{ height: "40px",textAlign:"left" ,}}
                >

                  {this.state.roleData && this.state.roleData.map((item:any) =>(
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}

                </Select>
                {this.state.role === "" && !this.state.page && (
                  <>
                    <p
                    className="errMsg"

                    >

                      Role is required
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box style={webStyle.boxes}>
            <InputLabel
              className="inputLabel"

            >
              Description
            </InputLabel>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Optional"
              style={{ width: "100%" ,backgroundColor:"#F5F5F5"}}
              onChange={this.handleChange}
              value={this.state.desc}
              name="desc"

              className="description  background"

            />
          </Box>
          <Box style={{ marginTop: "10px" }}>
            <InputLabel
              className="inputLabel"

            >
              Official Email Id*
            </InputLabel>

            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              placeholder="Email id here"
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              className="background"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <img src={mail} style={{ width: 30, height: 30 }} /> */}
                  </InputAdornment>
                ),
              }}
            />
             {this.state.email === "" && !this.state.page && (
                    <p
                    className="errMsgEmail"

                    >

                      Email is required
                    </p>
                  )}
                  {this.state.isErrorEmail && (
                    <p
                      style={{
                        color: "red",
                        fontFamily: "sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      Email must end with @finulent.com
                    </p>
                  )}
          </Box>
          <Box>
                <InputLabel
                  className="inputLabel" >
                 Joining date*
                </InputLabel>

                <MuiPickersUtilsProvider
                  utils={MomentUtils}
                  style={{ background: "orange" }}
                >
                  <ThemeProvider theme={materialTheme}>
                    <DatePicker
                      keyboard
                      className="background"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // maxDate={new Date().setDate(new Date().getDate() - 1)}
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
                      value={this.state.joiningDate}
                      onChange={this.handleJoingDateChange}
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
                  <p
                  className="errMsg"

                  >
                    {" "}

                    Joining Date required
                  </p>
                )}

          </Box>
          <Box sx={webStyle.boxes}>
            <InputLabel
              className="inputLabel">
              Workspace*
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="background"
              value={this.state.workspace}
              name="workspace"
              // label="Age"
              onChange={this.handleChange}
              variant="outlined"
              required
              fullWidth
              style={{ height: "40px"}}
            >
                 {this.state.workspaceData && this.state.workspaceData.map((item:any) =>(
                    <MenuItem value={item.id}>{item.attributes?.name}</MenuItem>
                  ))}

            </Select>
            {this.state.workspace === "" && !this.state.page && (
                  <>
                    <p
                    className="errMsg"

                    >

                      Workspace is required
                    </p>
                  </>
                )}
          </Box>
          <Box sx={webStyle.boxes}>
            <InputLabel
              className="inputLabel"

            >
              Password*
            </InputLabel>
            <TextField
              variant="outlined"
              size="small"
              required
              className="background"
              fullWidth
              disabled={this.state.isEditMode}
              name="password"
              placeholder="********"
              type="password"
              style={{ borderRadius: "6px", fontSize: "12px" }}
              value={this.state.password}
              onChange={this.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <img src={password} style={{ width: 30, height: 30 }} /> */}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <img src={eye} style={{ width: 30, height: 30 }} /> */}
                  </InputAdornment>
                ),
              }}

            />
               {this.state.password === "" && !this.state.page && (
                  <>
                    <p
                    className="errMsg"

                    >

                      Password  is required
                    </p>
                  </>
                )}

                {this.state.isErrorPassword ? (
                    <p
                    // style={{ color: "red", textAlign:'left' }}
                    className="message-main">
                      Password must contain:
                      <br />
                      <p
                      className="sub-message"


                      >
                        Minimum 8 characters
                      </p>
                      <p
                        className="sub-message"

                      >
                        Atleast One Number, One Lowercase, One Uppercase and One
                        Special Character
                      </p>
                    </p>
                  ) : (
                    <p
                    className="noerror-password"
                    // style={{ color: "#9fa0a2", textAlign:"left" }}
                    >
                      <span
                      className="span-message"

                      >
                        Password must contain:{" "}
                      </span>
                      <br />
                      <p style={{ margin: 10, fontFamily: "sans-serif" }}>
                        Minimum 8 characters
                      </p>
                      <p style={{ marginLeft: 10, fontFamily: "sans-serif" }}>
                        Atleast One Number, One Lowercase, One Uppercase and One
                        Special Character
                      </p>
                    </p>
                  )}
            {/* <hr className="solid"></hr> */}
            <Divider />
          </Box>
        </Box>
      </Grid>
    </>
  );

handleMore =( id:any, e:any) =>{
  // const id=this.props.params.id

  this.getUserStatus(id)
  this.setState({isMenu:e.currentTarget, userId:id})
}
handleStatusChange=(e:any,value:any) =>{

  let statusData=value.props.value
  console.log(statusData,"this", e)
  this.updateUserStatus(statusData,e)
  // this.setState({statusBy:value.props.value,isLoader:true});

//  if(filterData=="Pending"){
//  this.getUsers()
//  }
//  else{
//   this.getApprovedUsers(filterData);
//  }
//  this.setState({isLoader:false})

}
handleMenuClose = (e:any) =>{
  this.setState({isMenu:null})
}
handleMenuStatus =(e:any) =>{
  console.log(e.currentTarget, "HANDLE MENU STATUS")
  this.setState({isSubMenu:e.currentTarget,})
}
handleSubMenuClose =(e:any) =>{
  this.setState({isSubMenu:null, isChecked:false,isCheckedFalse:false})
}

handleEdit = (e:any) =>{
  let imagesconfig = configJSONBase.baseURL;
  // let test="https://finulentproject2-187250-ruby.b187250.dev.eastus.az.svc.builder.cafe"

  this.state.usersData.map((item:any) =>{


    if(item.id===this.state.userId){
      let binaryData = [] as any;
      binaryData.push(item.attributes.image);
      this.setState((prev) =>{

        return {
          ...prev,
          genericModalOpen:true,
          firstname:item.attributes.first_name,
          lastname:item.attributes.last_name,
          birthDate:item.attributes.date_of_birth,
          contactNo:item.attributes.full_phone_number,
          email:item.attributes.email,
          desc:item.attributes.description,
          designation:item.attributes.designation,
          role:item.attributes.role_id,
          workspace:item.attributes.workspace?.id,
          joiningDate:item.attributes.joining_date,
          isEditMode:true,
          fileData:imagesconfig+item.attributes.image

        }

      })

    }
  })

}
handleStatus =(e:any)=>{
  console.log(e.target.innerText)
  const innerText= e.target.innerText
  let status = false
  if(innerText==="Active")
  {
    status=true
    // this.setState({ activeValueId:true})
  }
  this.setState({activeValueId:status,isSubMenu:null, isChecked:false,isCheckedFalse:false})
  this.updateUserStatus(this.state.userId, innerText)

}
handleChangePage = (event: unknown, newPage: number) => {
  // setPage(newPage);
  this.setState({pageNo:newPage})
};
handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  this.setState({rowsPerPage:+event.target.value})
  this.setState({pageNo:0})
};

requestSearch = (e:any) => {

  this.setState({search:e})


};
 cancelSearch = () => {
  this.setState({search:""})
  this.requestSearch(this.state.search);
  this.setState({search:""})
};

// handleFilterClose =()=>{
//   this.setState({filterOpen:null})
// }
handleApply =()=>{
  this.getApply()
  this.setState({filterOpen:null,initialTableLoad:true,})
}
handleFilterMenuClose =() =>{
  this.setState({isConfirm:false})
}
handleFilterClose =()=>{
  this.setState({isConfirm:false,isStatus:"", role:"",filterOpen:null})
}
handleFilterClick =(e:any) =>(
 this.setState({filterOpen:e.currentTarget})
)

handleDeleteBtn=() =>{
  this.setState({isConfirm:true})
  // this.deleteUser()
}
handleReset=()=>{

  this.getUsers()
  this.setState({isStatus:"",selectedWorkspace:"",role:"",filterOpen:null})
}
handleCancelBtn =() =>{
  this.setState({isConfirm:false})
}
handleYes=() =>{
   this.deleteUser()
   this.setState({isConfirm:false})
}
confirmDelete =() =>(
  <Modal
  className="modal-backdrop"
  //   open={false}
  open={this.state.isConfirm}
  onClose={this.handleCancelBtn}
  style={{
    overflow: "auto",
  }}
>
  <div
    // className="modal-successcontent"
    style={{
      zIndex: 10,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width: "20%",
      // height: "20%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      // padding:"20px"
    }}
  >
   <Grid>
    <div
      style={{ textAlign: "center" }}
      //    className="usercontent"
    >
      <div  className="confirm-heading" style={{padding:"10px"}} >
      <Typography style={{fontWeight:900}}>Delete User</Typography>
    <CloseIcon   onClick={this.handleCancelBtn} />
      </div>
      <Divider/>
    <div style={{ padding:"20px"}} className="confirmadminbody">
      <Typography>Are you sure,you want to delete selected user ?</Typography>
    </div>
    <Divider/>
    <div style={{padding:"20px"}}>
    <Button
        onClick={this.handleCancelBtn}
        className="cancelbtn"

      >
        Cancel
      </Button>
      <Button
        onClick={this.handleYes}
        className="yesadminbtn"
        // style={{ backgroundColor: "#0096FF "}}
      >
        Yes
      </Button>
    </div>

      {/* </div> */}
    </div>
    </Grid>
  </div>
</Modal>
)

  checkStatus =()=> (<CheckIcon/>)

  render() {
    const { navigation } = this.props;
    const isLoggedIn = localStorage.getItem("token");

    const filteredList = this.state.usersData

    return (
      <>
      {/* {this.state.isConfirm && this.handleFilterClick} */}
      {this.state.isConfirm && this.confirmDelete()}
      {this.state.genericModalOpen &&
       <GenericModal
       heading={this.state.isEditMode? "Edit User":"Add user"}
       isOpen={this.state.genericModalOpen}
       closeModal={this.handleClose}
       modalBody={this.modalBody}
       handleAction={this.handleAction}
       isEditMode={this.state.isEditMode}
       handleButton={this.state.isEditMode ?"Save":"Add"}
      //  dataRoles={this.state.roleData}
     />
      }
      {this.state.isSuccessModal &&
        <GenericSuccessModal
        isOpen={this.state.isSuccessModal}
        succesModalBody={this.successErrModalBody}
        modalVarient={this.state.modalVarient}
        close={this.modalClose}
      />
      }


          <Menu
        id="simple-menu"
        anchorEl={this.state.isMenu}
        keepMounted
        open={this.state.isMenu!= null ? true:false}
        onClose={this.handleMenuClose}
        className="menu-field"
        onClick={this.handleMenuClose}
      >
        <MenuItem className="menu-field" onClick={this.handleMenuStatus} >Status</MenuItem>
        <MenuItem   onClick={this.handleEdit}>Edit</MenuItem>
        <MenuItem  onClick={this.handleDeleteBtn} style={{color:"red"}}>Delete</MenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={this.state.isSubMenu}
        keepMounted
        open={this.state.isSubMenu!= null ? true:false}
        onClose={this.handleSubMenuClose}

        transformOrigin={{
          vertical:'center',
          horizontal: 'left',
        }}
        className="subMenu"

      >
        <MenuItem  onClick={this.handleStatus}> <div>Active</div> {this.state.isChecked && this.checkStatus()
        }</MenuItem>
        <MenuItem onClick={this.handleStatus}  >Inactive  {this.state.isCheckedFalse && this.checkStatus()}</MenuItem>

      </Menu>
      <Menu
        // id="account-menu"
        anchorEl={this.state.filterOpen}
        id="account-menu"
        open={Boolean(this.state.filterOpen)}
        // open={this.state.filterOpen!= null ? true:false}
        onClose={this.handleFilterClose}
        // onClick={this.handleFilterClose}
        // style={{width:"150%"}}

       transformOrigin={{ horizontal: "right", vertical: "top" }}
       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        // style={{width:"50%"}}
      >
        <div  style={{display:"flex",justifyContent:"space-between",alignItems:"end"}}>
        <InputLabel className="inputfilter">  Filter</InputLabel>
         <Link  onClick={this.handleReset}  className="reset-btn">Clear Filter</Link>
        </div>

        <MenuItem  >
        <Grid sm={12} >
        <InputLabel className="inputLabel">Role*</InputLabel>
                <Select
                   className="background"
                 fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // placeholder="Select"
                  value={this.state.role}
                  name="role"
                  renderValue={
                    this.state.role !== "" ? undefined : () => <Placeholder>Select Role</Placeholder>
                  }
                  displayEmpty
                  // label="Age"
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  // fullWidth
                  style={{ height: "40px",textAlign:"left",backgroundColor:"white" }}
                >

                  {this.state.roleData && this.state.roleData.map((item:any) =>(
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}

                </Select>
        </Grid>
        </MenuItem>
        <MenuItem >
        <Grid item sm={12}>
        <InputLabel className="inputLabel">Status</InputLabel>
                <Select
                   className="background"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // placeholder="Select"
                  value={this.state.isStatus}
                  name="isStatus"
                  renderValue={
                    this.state.isStatus !== "" ? undefined : () => <Placeholder>Select Status</Placeholder>
                  }
                  displayEmpty
                  // label="Age"
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px",textAlign:"left" }}
                >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
                {/* <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem> */}

                </Select>
                </Grid>
        </MenuItem>
        <MenuItem >
        <Grid item sm={12}>
        <InputLabel className="inputLabel">Workspace</InputLabel>
                <Select
                className="background"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // placeholder="Select"
                  value={this.state.selectedWorkspace}
                  name="selectedWorkspace"
                  renderValue={
                    this.state.selectedWorkspace !== "" ? undefined : () => <Placeholder>Select Workspace</Placeholder>
                  }
                  displayEmpty
                  // label="Age"
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px",textAlign:"left" }}
                >
                  {this.state.workspaceData?.map((item:any)=>(
                     <MenuItem value={item.id}>{item.attributes.name}</MenuItem>
                  ))}


                {/* <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem> */}

                </Select>
                </Grid>
        </MenuItem>

        <div style={{padding:"10px", justifyContent:"space-between",gap:"10px"}}>
        <Button style={{backgroundColor:"grey"}}  onClick={this.handleFilterClose} className="btn-cancelmenu">Cancel</Button>
        <Button  className="btn-applyaddmenu" onClick={this.handleApply}>Apply</Button>
        </div>

      </Menu>

        <Box
          sx={{
            // height: this.state.usersData.length ?  "auto" :"100%",
            height:"100%",
            // overflowX:"scroll",
            width: "85vw",
            top: "50px",
            // left: "280px",
            right:0,
            boxSizing:"border-box",
            padding:"50px 20px 10px 20px",
            position: "absolute",

            // spacing:2
          }}
          style={{ backgroundColor:"#e8e8e8"}}
          justifyContent="space-between"
          className="maintablehead"
        >
          <Box sx={{ display: "flex" ,justifyContent:"space-between"}}>
          <SearchBar
                placeholder="Search User"
                  value={this.state.search}
                  onChange={this.requestSearch}
                  onCancelSearch={this.cancelSearch}
              />
            {/* <Typography
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Admin User Management
            </Typography> */}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                // marginLeft: 550,
                // alignItems:"center"
              }}
            >
              <div style={{display:"flex",alignItems:"center"}}>
              <img src={filter} style={{ width: 30, height: 30,marginRight:"15px"}} onClick={this.handleFilterClick}/>
              </div>



              <Button
               className="adminbtn-adduser"
                onClick={this.handleOpen}
              >
              Add User
              </Button>
            </div>
          </Box>
            {
             this.state.usersData.length  || this.state.initialTableLoad?
              <>
              <div style={{  overflowX: 'scroll' }} className="Tableuser tableuserdata" >
               <Table stickyHeader aria-label="sticky table" className="usermanagement-table"   style={{borderCollapse:"separate",borderSpacing:"0px 5px"}} >
              <TableHead className="maintablehead">
                <TableRow>
                 <TableCell className="tableheader">S.no</TableCell>
                 <TableCell className="tableheader">First Name</TableCell>
                 <TableCell className="tableheader">Last Name</TableCell>
                 <TableCell className="tableheader">Birthdate</TableCell>
                 <TableCell className="tableheader"> Contact number</TableCell>
                 <TableCell className="tableheader">Designation</TableCell>
                 <TableCell className="tableheader">Role</TableCell>
                 {/* <TableCell>Description</TableCell> */}
                 <TableCell className="tableheader">Offical Email id</TableCell>
                 <TableCell className="tableheader">Joining Date</TableCell>
                 <TableCell className="tableheader">Workspace</TableCell>
                 <TableCell className="tableheader">Assigned Workspace</TableCell>
                 <TableCell className="tableheader">Assigned Client</TableCell>
                 <TableCell className="tableheader">Assigned Subclient</TableCell>
                 <TableCell className="tableheader  optiontable" ></TableCell>
                </TableRow>
              </TableHead>


                {this.state.usersData?.length >0  ?filteredList.filter((item:any)=>{
                  if(!this.state.search) return true
                  if(item.attributes.first_name.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase()))return true
                }).slice(this.state.pageNo * this.state.rowsPerPage, this.state.pageNo * this.state.rowsPerPage + this.state.rowsPerPage).map((item:any) =>
                 {
                  return (
                    <TableBody>
                    <TableRow >

                     <TableCell className="tablecell tabledata"  >{item.slNo}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.first_name}</TableCell>
                    <TableCell className="tablecell tabledata" > {item.attributes.last_name}</TableCell>
                    <TableCell className="tablecell tabledata" > {moment(item.attributes.date_of_birth).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className="tablecell tabledata" >  {"+" + item.attributes.full_phone_number}</TableCell>
                    <TableCell className="tablecell tabledata" > {item.attributes.designation=== "not found" ? "NA":item.attributes.designation}</TableCell>
                    <TableCell className="tablecell name-break" > {item.attributes.role_id=== null ? "NA":item.attributes.role_id}</TableCell>
                    <TableCell className="tablecell name-break"> {item.attributes.email}</TableCell>
                    <TableCell className="tablecell" >{ item.attributes.joining_date===null ?"NA" : moment(item.attributes.joining_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className="tablecell tabledata" > {item.attributes.workspace === "not found" ? "NA": item.attributes.workspace?.name}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.workspace_assign === null ? "NA": item.attributes.workspace_assign?.name}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.client === null ? "NA": item.attributes.client.client_name}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.sub_client === null ? "NA": item.attributes.sub_client.team_title}</TableCell>
                   <TableCell  className="tablecell optiontable"  >{item.attributes.status==="Approved" ?<MoreHorizIcon  onClick={(e)=> this.handleMore(item.id,e)}/> :<></>}</TableCell>

                  </TableRow>
                  </TableBody>
                    )
                }):null
                }

            </Table>
            {this.state.usersData?.length >0 ? null:<p className="norecord">No Data Found</p>
                }
            </div>

        <TablePagination

        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.usersData.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.pageNo}
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
        // style={{ backgroundColor:"red"}}
      />
      </>
             :
             <Box className="progres">  <CircularProgress style={{color:"#6e6e6e"}} size={50} /></Box>
            }
        </Box>

      </>
    );
  }
}

const webStyle = {
  parent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "fit-content",
    position: "relative",
    backgroundRepeat: "no-repeat",
    // height: "fit-content",
  },
  boxes: {
    marginTop: "10px",
  },


};
