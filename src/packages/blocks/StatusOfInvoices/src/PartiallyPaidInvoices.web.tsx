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
  InputLabel, Grid, Select,
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
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

import SearchBar from "material-ui-search-bar";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from '@material-ui/icons/Check';
import { filter } from "./assets";
// Customizable Area End

import PartiallyPaidInvoicesController, { Props } from "./PartiallyPaidInvoicesController";
import "./PartiallyPaidInvoices.css";
export const configJSONBase = require("../../../framework/src/config");

const materialTheme = createMuiTheme({
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
      primary: "red",
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

class PartiallyPaidInvoices extends PartiallyPaidInvoicesController {
  // }

  constructor(props: Props) {
    super(props);
    console.log(props, 'Props')
  }

  handleBack = () => {
    console.log("moving back");
    this.props.history.push("/invoicesDashboard");
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
    this.setState({ birthDate: date });
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
 

handleMore =( id:any, e:any) =>{

  this.getUserStatus(id)
  this.setState({isMenu:e.currentTarget, userId:id})
}
handleStatusChange=(e:any,value:any) =>{

  let statusData=value.props.value
  console.log(statusData,"this", e)
  this.updateUserStatus(statusData,e)

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

getFilteredData=(filteredList:any)=>{
  return filteredList.filter((item:any)=>{
                  if(!this.state.search) return true
                  if(item.attributes.first_name.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase()))return true
                }).slice(this.state.pageNo * this.state.rowsPerPage, this.state.pageNo * this.state.rowsPerPage + this.state.rowsPerPage)
}

  checkStatus =()=> (<CheckIcon/>)
  handleReset=()=>{

    this.getUsers()
    this.setState({isStatus:"",selectedWorkspace:"",role:"",filterOpen:null})
  }

  render() {
    const {classes} = this.props
    
    const filteredList = this.state.usersData
   

    return (
      <>
      {this.state.isConfirm && this.confirmDelete()}
      <Menu
        id="account-menu"
        anchorEl={this.state.filterOpen}
        open={Boolean(this.state.filterOpen)}
         onClose={this.handleFilterClose}
         getContentAnchorEl={null}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          className={classes.menuStyle}
         
     >
        <Box style={{ padding: "10px" }}>
              <Box display={"flex"} justifyContent={"space-between"}>
              <InputLabel className="inputfilter"> Filter</InputLabel>
                <Box style={{ textDecoration: "underline" }}>Clear Filter</Box>
              </Box>
              <MenuItem>
              <Grid xs={12} container>
                <Grid item xs={6} container style={{paddingRight : "10px"}}>
                  <Grid item xs={12}>
                    <InputLabel className="inputLabel">From Date</InputLabel>
                  </Grid>
                  <Grid item xs={12} >
                    <MuiPickersUtilsProvider
                        utils={MomentUtils}
                      >
                        <ThemeProvider theme={materialTheme}>
                          <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={webStyle.text}
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
                        <ThemeProvider theme={materialTheme}>
                          <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={webStyle.text}
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
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </Grid>
            </MenuItem>
              <MenuItem >
              <Grid item sm={12}>
                <InputLabel className="inputLabel">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select"
                  value={this.state.role}
                  name="role"
                  variant="outlined"
                  required
                  fullWidth
                  style={{ height: "40px",textAlign:"left" }}

                >

                  {this.state.roleData && this.state.roleData.map((item:any) =>(
                    <MenuItem value={item}
                    >{item}</MenuItem>
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
              >
                Apply
              </Button>
            </div>
            </Box>
       
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
           Partially paid invoices
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
             this.state.usersData.length  || this.state.initialTableLoad?
              <>
              <div style={{  overflowX: 'scroll' }} className="tableuserdata">
               <Table aria-label="sticky table" className="usermanagement-table"  >
              <TableHead className="maintablehead">
                <TableRow>
                 <TableCell className="tableheader">S.no</TableCell>
                 <TableCell className="tableheader">Client Name</TableCell>
                 <TableCell className="tableheader">Client id</TableCell>
                 <TableCell className="tableheader">From Date</TableCell>
                 <TableCell className="tableheader"> To Date</TableCell>
                 <TableCell className="tableheader">Overdue Date</TableCell>
                 <TableCell className="tableheader">Invoice Status</TableCell>
                 <TableCell className="tableheader">Invoice Amount</TableCell>
                 <TableCell className="tableheader">Finulent Admin</TableCell>
                 <TableCell className="tableheader">Actions</TableCell>
              </TableRow>
              </TableHead>


              <TableBody style={{background : "#fff"}}>
                {this.state.usersData?.length >0 ? this.getFilteredData(filteredList).map((item:any) =>
                 {
                  return (
                    <TableRow>
                     <TableCell className="tablecell tabledata" >{item.slNo}</TableCell>
                    <TableCell className="tablecell tabledata">{item.attributes.first_name}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.last_name}</TableCell>
                    <TableCell className="tablecell"> {item.attributes.email}</TableCell>
                    <TableCell className="tablecell tabledata"> {"+" + item.attributes.full_phone_number}</TableCell>
                    <TableCell className="tablecell tabledata"> {item.attributes.designation}</TableCell>
                    <TableCell className="tablecell  name-break"> {item.attributes.role_id}</TableCell>
                   
                    <TableCell className="tablecell"> { moment(item.attributes.joining_date).format("DD/MM/YYYY")}</TableCell>
                    
                    <TableCell className="tablecell  name-break"> 
                    
                    <Box sx={{display : "flex", alignItems : "center"}} >                     
                         <Avatar className="smallSize" alt="Remy Sharp" src="/static/images/avatar/1.jpg"/> 
                          <Typography style={{paddingLeft : "8px"}}>{item.attributes.first_name}</Typography>
                      </Box>
                    </TableCell>


                    <TableCell className="tablecell"> 
                    
                    <Box sx={{display : "flex", gap : "10px", alignItems : "center"}} >  
                    <VisibilityOutlinedIcon onClick={()=>this.props.history.push("/genericInvoice")}/>
                    <EditOutlinedIcon disabled/>
                    <ArrowDownwardOutlinedIcon />

                      </Box>
                    </TableCell>
                    
                    

                       
                  </TableRow>
                    )
                }):null
                }
                  </TableBody>

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


export default withStyles(useStyles)(PartiallyPaidInvoices)

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
