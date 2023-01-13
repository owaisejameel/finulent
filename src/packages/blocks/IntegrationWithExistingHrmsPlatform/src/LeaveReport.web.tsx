//@ts-nocheck
import React from "react";
import MomentUtils from "@date-io/moment";
import { ThemeProvider } from "@material-ui/styles";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "material-ui-pickers";

import Avatar from "@material-ui/core/Avatar";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import {
  createMuiTheme,
  Box,
  Button,
  Typography,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Divider,
  Modal,
  Menu,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from '@material-ui/icons/Check';
import  {filter } from "./assets"
// Customizable Area End

import LeaveReportController, { Props } from "./LeaveReportController";
import "./LeaveReport.css";
export const configJSONBase = require("../../../framework/src/config");


const materialThemeTwo = createMuiTheme({
  overrides: {
    // @ts-ignore
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
      primary: "red"
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
        color: "black"
      },
      dayLabel: {
          color: "black"
      },
    },
  },
});

const useStyles = ((theme) => ({ 
  menuStyle : {
    "& .MuiPaper-root":{
       maxWidth : "500px",
     }
   },
  selectRoot: {  
    '&:focus':
    { backgroundColor:'yellow' } 
  } 
}));



const usePlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#aaa"
  }
}));

class LeaveReport extends LeaveReportController {
  constructor(props: Props) {
    super(props);
    console.log(props, 'Props')
  }

  handleBack = () => {
    console.log("moving back");
    this.props.history.push("/reporting");
  };

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
    fileData:"", page:true,isErrorEmail:false});
  };
  modalClose = () => {
    this.setState({ isSuccessModal: false ,genericModalOpen:false,modalMsg:"",isEditMode:false,modalVarient:""});
  };
  handleImage = (e: any) => {

    this.setState({
      fileData: e.target.files[0],
    });

    console.log(this.state.fileData, "FileData");
  };
  handleDateChange = (date: any) => {
    this.setState({ toDate: date });
    };
    handleDateChangeFrom = (date: any) => {
      this.setState({ fromDate: date });
      };
  handleJoingDateChange = (date: any) => {
    this.setState({ joiningDate: date });
  };

  handleAction = () => {
    console.log("Action");

    if (this.state.page) {
      this.setState({ page: false });
    }

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
         role:"",
         designation:"",
         desc:"",
         workspace:"",

         fileData:"",

          isErrorFirstName:false,
          isErrorLastName:false,
          isErrorPassword:false,

        })
      }
  };
  handleChange = (e: any) => {
    let char, email;
    e.persist();
    if (e.target.name == "password") {

      let password = e.currentTarget.value;

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
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
          }}
        >
          {this.state.modalMsg }

        </Typography>


      </div>
    </>
  );

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
  }
  this.setState({activeValueId:status,isSubMenu:null, isChecked:false,isCheckedFalse:false})
  this.updateUserStatus(this.state.userId, innerText)

}
handleChangePage = (event: unknown, newPage: number) => {
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

handleApply =()=>{
  this.getApply()
  this.setState({filterOpen:null,initialTableLoad:true,})
}
handleFilterMenuClose =() =>{
  this.setState({isConfirm:false})
}
handleFilterClose =()=>{
  this.setState({isConfirm:false,isStatus:"", role:"",filterOpen:null,selectedWorkspace:""})
}
handleFilterClick =(e:any) =>(
 this.setState({filterOpen:e.currentTarget})
)

handleDeleteBtn=() =>{
  this.setState({isConfirm:true})
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
  open={this.state.isConfirm}
  onClose={this.handleCancelBtn}
  style={{
    overflow: "auto",
  }}
>
  <div
    style={{
      zIndex: 10,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width: "20%",
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
    >
      <div  className="confirm-heading" style={{padding:"10px"}} >
      <Typography style={{fontWeight:900}}>Delete User</Typography>
    <CloseIcon   onClick={this.handleCancelBtn} />
      </div>
      <Divider/>
    <div style={{ padding:"20px"}} className="confirmbody">
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
        className="yesbtn"
        style={{ backgroundColor: "#0096FF "}}
      >
        Yes
      </Button>
    </div>
    </div>
    </Grid>
  </div>
</Modal>
)

  checkStatus =()=> (<CheckIcon/>)
  handleReset=()=>{

    this.getUsers()
    this.setState({isStatus:"",selectedWorkspace:"",role:"",filterOpen:null})
  }

  renderNoData=()=>{
    return this.state.usersData?.length >0 ? null:<p className="norecord">No Data Found</p>
  }

  getUserData=(filteredList:any)=>{
    return filteredList.filter((item:any)=>{
                  if(!this.state.search) return true
                  if(item.attributes.first_name.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase()))return true
                }).slice(this.state.pageNo * this.state.rowsPerPage, this.state.pageNo * this.state.rowsPerPage + this.state.rowsPerPage)
  }

  render() {
    const {classes} = this.props   
    const filteredList = this.state.usersData

    return (
      <>
      {this.state.isConfirm && this.confirmDelete()}
     
      <Menu
          anchorEl={this.state.filterOpen}
          id="account-menu"
          open={Boolean(this.state.filterOpen)}
          onClose={this.handleFilterClose}
          getContentAnchorEl={null}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          className={classes.menuStyle}
         
        >
          
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <InputLabel className="inputfilter"> Filter</InputLabel>
            </div>

            <MenuItem>
              <Grid sm={12}>
                <InputLabel className="inputLabel">Workspace</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  value={this.state.selectedWorkspace}
                  name="selectedWorkspace"
                  displayEmpty
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  style={{ height: "40px", textAlign: "left" }}
                >
                  {this.state.workspaceData?.map( (item:any) => (
                    <MenuItem key={item.attributes.name} value={item.attributes.name}>{item.attributes.name}</MenuItem>
                  ))}
              
                </Select>
              </Grid>
            </MenuItem>
            <MenuItem>
              <Grid item sm={12}>
                <InputLabel className="inputLabel">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  value={this.state.role}
                  name="role"
                  displayEmpty
                    onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px", textAlign: "left" }}
                >
                   {this.state.roleData?.map((item:any) =>(
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </MenuItem>
            
            <MenuItem>
              <Grid xs={12} container>
                <Grid item xs={6} container style={{paddingRight : "10px"}}>
                  <Grid item xs={12}>
                    <InputLabel className="inputLabel">From Date</InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                  <MuiPickersUtilsProvider
                        utils={MomentUtils}
                      >
                        <ThemeProvider theme={materialThemeTwo}>
                          <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={webStyle.text}
                            placeholder="MM/DD/YYYY"
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
                            value={this.state.fromDate}
                            onChange={this.handleDateChangeFrom}
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
                  </Grid>
                </Grid>
                <Grid item xs={6} container style={{paddingLeft : "10px"}}>
                  <Grid item xs={12} >
                    <InputLabel className="inputLabel">To Date</InputLabel>
                  </Grid>
                  <Grid item xs={12}>
                  <MuiPickersUtilsProvider
                        utils={MomentUtils}
                      >
                        <ThemeProvider theme={materialThemeTwo}>
                          <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={webStyle.text}
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
                            value={this.state.toDate}
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
                  </Grid>
                </Grid>
              </Grid>
            </MenuItem>
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                style={{ backgroundColor: "grey" }}
                onClick={this.handleFilterClose}
                className="btn-cancelmenu"
              >
                Cancel
              </Button>
              <Button
                className="btn-addmenu"
                onClick={this.handleApply}
              >
                Apply
              </Button>
            </div>
          
        </Menu>
        <Box
          sx={{
            height:"100%",
            width: "85vw",
            top: "50px",
            right:0,
            boxSizing:"border-box",
            padding:"50px 20px 10px 20px",
            position: "absolute",
          }}
          style={{ backgroundColor:"#e8e8e8"}}
          justifyContent="space-between"
          className="maintablehead"
        >
          <Box sx={{ display: "flex" ,justifyContent:"space-between",alignItems:"center"}}>
            
            <div style={{display: "flex", alignItems: "center"}}> 
            <Box style={webStyle.arrowbox}>
                  <ArrowLeftIcon
                    onClick={this.handleBack}
                  />
                </Box>
            <Typography
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
           Leave Report
            </Typography>
            </div>
          
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div style={{display:"flex",alignItems:"center"}}>
              <img src={filter} style={{ width: 30, height: 30,marginRight:"15px"}} onClick={this.handleFilterClick}/>
              </div>

              <SearchBar
                placeholder="Search user/email"
                  value={this.state.search}
                  onChange={this.requestSearch}
                  onCancelSearch={this.cancelSearch}
              />
            </div>
          </Box>
            {
             this.state.usersData?.length  || this.state.initialTableLoad?
              <>
              <div style={{  overflowX: 'scroll' }} className="tableuserdata">
               <Table aria-label="sticky table" className="usermanagement-table"  >
              <TableHead className="maintablehead">
                <TableRow>
                 <TableCell className="tableheader">S.no</TableCell>
                 <TableCell className="tableheader">{" "}</TableCell>
                 <TableCell className="tableheader">First Name</TableCell>
                 <TableCell className="tableheader">Last Name</TableCell>
                 <TableCell className="tableheader">Official email id</TableCell>
                 <TableCell className="tableheader"> Contact number</TableCell>
                 <TableCell className="tableheader">Designation</TableCell>
                 <TableCell className="tableheader">Role</TableCell>
                 <TableCell className="tableheader">Workspace</TableCell>
                 <TableCell className="tableheader">Leave from Date</TableCell>
                 <TableCell className="tableheader">Leave to date</TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {this.state.usersData?.length >0  ? this.getUserData(filteredList).map((item:any) =>
                 {
                  return (
                    <TableRow key={item.slNo}>
                     <TableCell className="tablecell tabledata" >{item.slNo}</TableCell>
                     <TableCell className="tablecellAvatar">
                     <Avatar className="smallSize" alt="Remy Sharp" src="data:image/jpeg;base64,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"/>
                    </TableCell>
                    <TableCell className="tablecell tabledata">{item.attributes.first_name}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.last_name}</TableCell>
                    <TableCell className="tablecell"> {item.attributes.email}</TableCell>
                    <TableCell className="tablecell tabledata"> {"+" + item.attributes.contact_number}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.designation}</TableCell>
                    <TableCell className="tablecell  name-break"> {item.attributes.role}</TableCell>
                   
                    <TableCell className="tablecell tabledata"> {item.attributes.workspace}</TableCell>
                    <TableCell className="tablecell"> {moment(item.attributes.leave_from).format("DD/MM/YYYY")}</TableCell>
                    <TableCell className="tablecell tabledata"> {moment(item.attributes.leave_to).format("DD/MM/YYYY")}</TableCell>

                  </TableRow>
                    )
                }):null
                }
                  </TableBody>

            </Table>
            { this.renderNoData() }
            </div>

        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.usersData?.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.pageNo}
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
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

export default withStyles(useStyles)(LeaveReport)

const webStyle = {
  parent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "fit-content",
    position: "relative",
    backgroundRepeat: "no-repeat",
  },
  boxes: {
    marginTop: "10px",
  },
  arrowbox: {
    backgroundColor: "#fff",
    width: 35,
    height: 35,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },


};
