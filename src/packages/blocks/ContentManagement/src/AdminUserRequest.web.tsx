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
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  FormControl,
  TableContainer,
  TablePagination,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import GenericModal from "./GenericModal.web";
import GenericSuccessModal from "./GenericSuccessModal.web";


// Customizable Area End

import UserManagementController, { Props } from "./UserManagementController";
import "./UserManagement.css";
import { widthFromPercentage } from "../../../framework/src/Utilities";
import UserRequestController from "./UserRequestController";

// const  isLoggedIn = localStorage.getItem('token')
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
export default class UserRequest extends UserRequestController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
  }
  handleAccept =(id:any)=>{

    this.setState({ genericModalOpen: true, isEditMode:true, handleAccept:true, userId:id});

}
// handleReject =(id:any) =>{
//   this.setState({rejectedId:id})
//   this.handleRejectAction(id)
// }
handleClose = () => {
    this.setState({ genericModalOpen: false ,  designation:'',
    role:'',
    joiningDate:null,
    workspace:'',
    page: true, });
  };
  handleAction = () => {

    if (this.state.page) {
      this.setState({ page: false });
    }
    if(this.state.joiningDate && this.state.role && this.state.workspace && this.state.designation){
      this.updateUser()
      this.setState({
        designation:'',
        role:'',
        joiningDate:null,
        workspace:'',
        page: true,
      })

    }

  };
  handleChange =(e:any) =>{
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val);
  }
  handleFilterChange=(e:any,value:any) =>{

    let filterData=value.props.value
    console.log(filterData,"this")
    this.setState({filterBy:value.props.value,isLoader:true});

   if(filterData=="Pending"){
   this.getUsers()
   }
   else{
    this.getApprovedUsers(filterData);
   }
  //  this.setState({isLoader:false})
  }
  handleDateChange=(date: any) => {
    this.setState({ joiningDate: date});
  }
modalBody =() =>(
   <>
    <Grid style={{backgroundColor:"#F5F5F5"}}>
      <Box style={webStyle.boxes}>
            <InputLabel
              className="inputLabel"

            >
             Joining Date*
            </InputLabel>

            <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        style={{ background: "orange" ,backgroundColor:"white"}}
                      >
                        <ThemeProvider theme={materialTheme}>
                          <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={{backgroundColor:"white"}}
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
                      {this.state.joiningDate === null && !this.state.page && (
                  <>
                    <p
                    className="errMsg"
                    >

                      Joining Date  is required
                    </p>
                  </>
                )}
          </Box>
          <Box>

                <InputLabel className="inputLabel">Designation*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  value={this.state.designation}
                  name="designation"
                  // label="Age"
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px",textAlign:"left",backgroundColor:"white" }}
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

          </Box>
          <Box>
          <InputLabel className="inputLabel">Role*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  value={this.state.role}
                  name="role"

                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px",textAlign:"left",backgroundColor:"white" }}
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
          </Box>
          <Box sx={webStyle.boxes}>
            <InputLabel
              className="inputLabel"

            >
              Workspace*
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Select"
              value={this.state.workspace}
              name="workspace"
              // label="Age"
              onChange={this.handleChange}
              variant="outlined"
              required
              fullWidth
              style={{ height: "40px",textAlign:"left" ,backgroundColor:"white"}}
            >
                 {this.state.workspaceData && this.state.workspaceData.map((item:any) =>(
                    <MenuItem value={item?.id}>{item.attributes?.name}</MenuItem>
                  ))}

            </Select>
            {this.state.workspace === "" && !this.state.page && (
                  <>
                    <p
                    className="errMsg" >

                    Workspace is required
                    </p>
                  </>
                )}
          </Box>
          <div style={{marginTop:"40px",marginBottom:"20px"}}>
            <Divider/>
          </div>
          </Grid>
    </>
)
successErrModalBody = () => (
  <>
    <div>
      <Typography
      className="modalmsg"
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
 handleChangePage = (event: unknown, newPage: number) => {

    this.setState({pageNo:newPage})
  };
  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({rowsPerPage:+event.target.value})
    this.setState({pageNo:0})
  };
  modalClose = () => {
    this.setState({ isSuccessModal: false ,modalMsg:"",isEditMode:false,rejectedId:"", genericModalOpen: false});
  };
  handleRejectConfirm =(id:any) =>{
    // this.handleReject(item.id)
    this.setState({rejectedId:id,isConfirm:true})
    // this.handleRejectAction(id)
  }
  handleCancelBtn =() =>{
    this.setState({isConfirm:false})
  }
  handleYes=() =>{
      this.handleRejectAction(this.state.rejectedId)
      this.setState({isConfirm:false})
  }
  requestSearch = (e:any) => {
    this.setState({search:e})
  };
   cancelSearch = () => {
    this.setState({search:""})
    this.requestSearch(this.state.search);
    this.setState({search:""})
  };
  confirmReject = () =>(

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
      }}
    >
     <Grid>
      <div
        style={{ textAlign: "center" }}
        //    className="usercontent"
      >
        <div  className="confirm-heading" style={{padding:"10px"}}>
        <Typography style={{fontWeight:900}}>Reject Signup Request</Typography>
      <CloseIcon   onClick={this.handleCancelBtn} />
        </div>
        <Divider/>
      <div style={{padding:"20px",backgroundColor:"#f8f8f8"}} className="confirmbody">
        <Typography>Are you sure,you want to reject the Signup request for this user ?</Typography>
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
          style={{backgroundColor: "#0096FF "}}
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
  render() {
    const { navigation } = this.props;
    const isLoggedIn = localStorage.getItem("token");

    return (
      <>
       {this.state.isConfirm && this.confirmReject()}
      <GenericModal
    heading="Define Role & Designation"
    isOpen={this.state.genericModalOpen}
    closeModal={this.handleClose}
    modalBody={this.modalBody}
    handleAction={this.handleAction}
    isEditMode={this.state.isEditMode}
    handleButton={this.state.isEditMode ?"Save":"Add"}
  />
   {this.state.isSuccessModal &&
        <GenericSuccessModal
        isOpen={this.state.isSuccessModal}
        succesModalBody={this.successErrModalBody}
        // modalVarient={}
        // succesModalBody={Object.keys(this.state.userData).length>0 ?this.succesModalBody: this.errorModalBody}
        close={this.modalClose}

      />
      }

        <Box
          sx={{
            // height: this.state.usersData.length ? "100%":"auto",
            height: "100%",

            // overflowX:"scroll",
            width: "85vw",
            top: "50px",
            // left: "280px",
            right: 0,
            boxSizing: "border-box",
            padding: "50px 20px 10px 20px",
            position: "absolute",

            // spacing:2
          }}
          className="maintablehead"
          style={{ backgroundColor:"#e8e8e8"}}

        >
          <Box sx={{   display:"flex",
            alignItems:"center",
            justifyContent:"space-between" }}>
                <Box >
              <SearchBar
                placeholder="Search User"
                  value={this.state.search}
                  onChange={this.requestSearch}
                  onCancelSearch={this.cancelSearch}
                  style={{height:"40px"}}
              />
              </Box>

            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>

            <Box sx={{width:"10vw",}}>

            <FormControl  fullWidth>
              <InputLabel id="demo-simple-select-label" className="filterlabel"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.filterBy}
                // label="Pending"
                // placeholder="Pending"
                variant="outlined"
                className="selectmenu"
                style={{background: "white"}}
                onChange={this.handleFilterChange}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Approved"} >Approved</MenuItem>
                <MenuItem value={"Rejected"}>Rejected</MenuItem>
              </Select>
            </FormControl>
            </Box>
            </div>
          </Box>
          { this.state.isLoader ? <Box className="progres">  <CircularProgress style={{color:"#6e6e6e"}} size={50}/> </Box>:
          <>
           <div style={{  overflowX: 'scroll' }}  className="tableuserdata">
          <Table stickyHeader aria-label="sticky table" className="table"  style={{borderCollapse:"separate",borderSpacing:"0px 5px"}} >
            <TableHead>
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
                <TableCell className="tableheader">Workspace</TableCell>

               {this.state.filterBy && this.state.filterBy==="Pending" ? <TableCell className="actiontable  tableheader"  >Action</TableCell>:null}

              </TableRow>
            </TableHead>
            <TableBody>

              {this.state.usersData &&
                this.state.usersData?.filter((item:any)=>{
                  if(!this.state.search) return true
                  if(item.attributes?.first_name.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase()))return true
                }).slice(this.state.pageNo * this.state.rowsPerPage, this.state.pageNo * this.state.rowsPerPage + this.state.rowsPerPage).map((item: any) => {
                  return (
                    <TableRow>
                      <TableCell className="tabledata tablecell" >{item.slNo}</TableCell>
                      <TableCell className="tabledata tablecell">
                        {" "}
                        {item.attributes.first_name}
                      </TableCell>
                      <TableCell className="tabledata tablecell">
                        {" "}
                        {item.attributes.last_name}
                      </TableCell>
                      <TableCell className="tabledata tablecell">
                        {" "}
                        {moment(item.attributes.date_of_birth).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className="tabledata tablecell">
                        {" "}
                        {"+" + item.attributes.full_phone_number}
                      </TableCell>
                      <TableCell className="tabledata tablecell">
                        {" "}
                        {item.attributes.designation === "not found" ? "NA" : item.attributes.designation}
                      </TableCell>
                      <TableCell className="tabledata tablecell name-break">
                        {" "}
                        {item.attributes.role_id === null ? "NA": item.attributes.role_id}
                      </TableCell>
                      <TableCell className="tabledata tablecell name-break" style={{width: "200px"}}>
                        {" "}
                        {item.attributes.email}
                      </TableCell>
                      <TableCell className="tabledata tablecell">
                        {" "}
                        {item.attributes.workspace === "not found" ? "NA": item.attributes.workspace?.name}
                      </TableCell>

                      {this.state.filterBy && this.state.filterBy === "Pending" ?
                         <TableCell className="tablebutton actiontable" style={{backgroundColor:"#f5f5f5"}}>
                         <Button className="btnadminAction" onClick={()=>this.handleAccept(item.id)}>Accept</Button>
                         <Button className="btnAdminReject" onClick={()=>this.handleRejectConfirm(item.id)}>Reject</Button>
                       </TableCell>:<></>
                       }

                    </TableRow>
                  );
                })}
              <TableRow>

              </TableRow>
            </TableBody>
          </Table>
          </div>

          <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.usersData.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.pageNo}
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
      />
      </>

     }
        </Box>

      </>
    );
  }
}

const webStyle = {



  boxes: {
    marginTop: "10px",
    // backgroundColor:"#F5F5F5"
  },

};
