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
  TextField,
  Grid,
  Select,
  MenuItem,
  Divider,
  Modal,
  Menu,
  withStyles,
  Table,
  TableRow,
  TableBody,
  TableCell,
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

import ClientInvoicesSuperadminController, { Props } from "./ClientInvoicesSuperadminController";
import "./ClientInvoicesSuperadmin.css";
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

class ClientInvoicesSuperadmin extends  ClientInvoicesSuperadminController{

  constructor(props: Props) {
    super(props);
    
  }

  handleBack = () => {

    let path = this.query.get('path');
    console.log(path, 'path')

    if(path == "reviewChecklist"){
      this.props.history.push(`/reviewChecklist?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`);
    }else{
      this.props.history.push(`/client_subfolder?cid=${this.query.get('clientId')}`);
    }    
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
      // imageName: e.target.files[0].name,
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


  handleChangeStatus = (e: any) => {
    this.setState({ status: e.target.value },()=>{
      console.log('this.state.status', this.state.status);
      
    });
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
            // color: "red",
          }}
        >
          {/* {this.state.isEditMode ? "User Updated Succesfully!": } */}
          {this.state.modalMsg}

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

  this.state.invoiceData.map((item:any) =>{


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

handleApply =() =>{
  let isError = false
  
  if(this.state.toDate || this.state.fromDate){
    if(!moment(this.state.toDate).isAfter(this.state.fromDate)){
      this.setState({ filterToDateError:true})
      isError = true;
  
    }
  }
 
        

 if (isError) {
  
   return;
 }
  this.getApply()
  this.setState({filterOpen:null ,initialTableLoad:true, filterToDateError: false})
}
handleFilterMenuClose =() =>{
  this.setState({isConfirm:false})
}
handleFilterClose =()=>{
  this.setState({isConfirm:false,status:"", toDate:"", fromDate:"",filterOpen:null, filterToDateError:false})
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
    this.getInvoices();
    this.setState({fromDate:"",toDate:"",status:"",filterToDateError: false})
  }

  isTableLoaded=()=>{
    return this.state.invoiceData.length //  || this.state.initialTableLoad
  }

  getFilteredData=(filteredList:any)=>{
    return filteredList.filter((item:any)=>{
      if(!this.state.search) return true
      if(item?.attributes?.client_name.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase()))return true
    }).slice(this.state.pageNo * this.state.rowsPerPage, this.state.pageNo * this.state.rowsPerPage + this.state.rowsPerPage)
  }

  getTableData=(item:any)=>{
    return(
      <TableRow>
      <TableCell className="tablecell tabledata" >{id+1}</TableCell>
      <TableCell className="tablecell"> {item?.client_id}</TableCell>
      <TableCell className="tablecell"> { item?.from_date===null ?"NA" :moment(item?.from_date).format("DD/MM/YYYY")}</TableCell>
      <TableCell className="tablecell"> { item?.to_date===null ?"NA" :moment(item?.to_date).format("DD/MM/YYYY")}</TableCell>
      <TableCell className="tablecell"> { item?.overdue_date===null ?"NA" :moment(item?.overdue_date).format("DD/MM/YYYY")}</TableCell>
     
      <TableCell className="tablecell tabledata">{item?.invoice_status}</TableCell>
      <TableCell className="tablecell tabledata">{item?.invoice_amount}</TableCell>

      <TableCell className="tablecell  name-break"> 
      
      <Box sx={{display : "flex", alignItems : "center"}} >                     
           <Avatar className="smallSize" alt="Remy Sharp" src="/static/images/avatar/1.jpg"/> 
            <Typography style={{paddingLeft : "8px"}}>{item?.first_name}</Typography>
        </Box>
      </TableCell>


      <TableCell className="tablecell"> 
      
      <Box sx={{display : "flex", gap : "10px", alignItems : "center"}} >  
      <VisibilityOutlinedIcon onClick={()=>this.props.history.push("/genricInvoiceClientSuperadmin?id="+item?.id)}/>
      <EditOutlinedIcon disabled/>
      <ArrowDownwardOutlinedIcon />

        </Box>
      </TableCell>
      </TableRow>
    )
  }

  getNoDataView=()=>{
    return this.state.invoiceData?.length >0 ? null:<p className="norecord">No Data Found</p>
  }

  getStatusDropdown=()=>{
    return(
      <Grid item sm={12}>
      <InputLabel className="inputLabel">Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        renderValue={
          this.state.status !== "" ? undefined : () => <Placeholder>Select</Placeholder>
        }
        value={this.state.status}
        name="role"
        onChange={this.handleChangeStatus}
        variant="outlined"
        required
        fullWidth
        displayEmpty
        style={{ height: "40px",textAlign:"left" }}
      >
        {this.state.statusData && this.state.statusData.map((item:any) =>(
          <MenuItem value={item}
          >{item}</MenuItem>
        ))}

      </Select>
      {this.state.status === "" && !this.state.page && (
        <>
          <p
          className="errMsg"
          >
            Status is required
          </p>
        </>
      )}
    </Grid>
    )
  }

  renderFilterPopup=(classes:any)=>{
    return  <Menu
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
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"baseline"}>
          <InputLabel className="inputfilter"> Filter</InputLabel>
            <Box onClick={this.handleReset} style={{ textDecoration: "underline", cursor :"pointer", paddingRight:"16px" }}>Clear Filter</Box>
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
                        value={this.state.fromDate}
                        // onChange={(date)=>this.setState({fromDate:date, filterToDateError: false})}
                        onChange={(date)=>{
                          this.setState({fromDate:date},handleError)
                          function handleError(){
                            if(this.state.fromDate && this.state.toDate){
                              if(!moment(this.state.toDate).isAfter(this.state.fromDate)){
                                this.setState({filterToDateError: true})
                              }else{
                                this.setState({filterToDateError: false})
                              }
                              
                            }
                          }
                        }}
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
                        value={this.state.toDate}
                        // onChange={(date)=>this.setState({toDate:date, filterToDateError: false})}
                        onChange={(date)=>{
                          this.setState({toDate:date},handleError)
                          function handleError(){
                            if(this.state.fromDate && this.state.toDate){
                              if(!moment(this.state.toDate).isAfter(this.state.fromDate)){
                                this.setState({filterToDateError: true})
                              }else{
                                this.setState({filterToDateError: false})
                              }
                              
                            }
                          }
                        }}
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
        <Grid item xs={12} >
            
                  <Grid style={{paddingLeft : "20px"}}>
{this.state.filterToDateError && <Typography style={webStyle.errorText}>From Date can not be greater than To Date</Typography>}
                  </Grid>

                 
                
              </Grid>
          <MenuItem >
         {this.getStatusDropdown()}
          </MenuItem>
          <div
          style={{
            padding: "10px 15px 0px",
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
        </Box>
  </Menu>
  }

  getFromToDateError=()=>{
    return this.state.modalToDate !== "" && this.state.toDateError && <Typography style={webStyle.errorText}>From Date can not be greater than To Date</Typography>
  }

  renderDefineInvoice = () => {
    if(this.state.defineInvoiceModal) {
        return (
            <Modal style={webStyle.modalbackdrop} 
            open={this.state.defineInvoiceModal} 
            onClose={this.handleCloseDefineInvoiceModal}
             data-test-id={"addModalpopup"}>
                  <div style={webStyle.modalcontentsuccess}>
                        <div style={webStyle.modalContent}>
                            <div style={webStyle.addworkspacemodaldiv}>
                                <div style={webStyle.addworkspaceseconddiv}>
                                    <Box style={webStyle.headerBox}>
                                        <h4 style={webStyle.addEditHeading}>Generate Invoice</h4>
                                        <CloseIcon 
                                         onClick={this.handleCloseDefineInvoiceModal}
                                          style={webStyle.closebuttonstyle}
                                          />
                                    </Box>
                                </div>
                            </div>
                            <div style={webStyle.addworkspacemaincontentdiv}>
                                <div style={webStyle.addworkspacedivcontent} className="addclientdivcontent">
                                    <div style={webStyle.addworkspaceelements}>
                                        <p style={webStyle.modaltextboxheader}><strong>{"Client Name"}</strong></p>
                                        <TextField variant="outlined" style={webStyle.textfieldDisabled} fullWidth disabled value={this.state.subfolderClientName}
                                          placeholder="TATA Power"
                                          
                                        />
                                                                                <p style={webStyle.modaltextboxheader}><strong>Client id</strong></p>
                                        <TextField variant="outlined" placeholder="23WSF"  fullWidth  value={this.state.subfolderClientId} disabled style={webStyle.textfieldDisabled}/>

                                        <p style={webStyle.modaltextboxheader}><strong>Project invoicing structure</strong></p>
                                        <TextField variant="outlined"    fullWidth  value={this.state.projectInvoicingStructure == "project_completion_date" ? "Project completion date" : "Project creation date"} disabled style={webStyle.textfieldDisabled}/>
                                        
                                        <p style={webStyle.modaltextboxheader}><strong>Overdue Date*</strong></p>
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
                            value={this.state.modalOverdueDate}
                            onChange={(date)=>this.setState({modalOverdueDate:date, isModalOverdueDateError:false})}
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
                                        {this.state.isModalOverdueDateError && <Typography style={webStyle.errorText}>Overdue Date is required</Typography>}
                                        <Grid container>
                                          <Grid item xs={6}>
                                          <p style={webStyle.modaltextboxheader}><strong>From  Date*</strong></p>
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
                            value={this.state.modalFromDate}
                            // onChange={(date)=>this.setState({modalFromDate:date, isModalFromDateError:false, toDateError : false})}
                            onChange={(date)=>{
                              this.setState({modalFromDate:date,isModalFromDateError:false},handleError)
                              function handleError(){
                                     if(this.state.modalToDate && this.state.modalFromDate){
                                      if(!moment(this.state.modalToDate).isAfter(this.state.modalFromDate)){
                                        this.setState({toDateError : true})
                                      }else{
                                        this.setState({toDateError:false})
                                      }
                                      }
                              }
                            }}
                            
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
                                        {this.state.isModalFromDateError && <Typography style={webStyle.errorText}>From  Date is required</Typography>}
                                          </Grid>

                                          <Grid item xs={6} style={{paddingLeft:"10px"}}>
                                          <p style={webStyle.modaltextboxheader}><strong>To Date*</strong></p>
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
                            value={this.state.modalToDate}
                            // onChange={(date)=>this.setState({modalToDate:date, isModalToDateError:false, toDateError : false})}
                            onChange={(date)=>{
                              this.setState({modalToDate:date,isModalToDateError:false},handleError)
                              function handleError(){
                                     if(this.state.modalToDate && this.state.modalFromDate){
                                      if(!moment(this.state.modalToDate).isAfter(this.state.modalFromDate)){
                                        this.setState({toDateError : true})
                                      }else{
                                        this.setState({toDateError:false})
                                      }
                                      }
                              }
                            }}
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
                                        {this.state.isModalToDateError && <Typography style={webStyle.errorText}>To Date is required</Typography>}

                                        
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={12}>
                                        {this.getFromToDateError()}

                                        </Grid>
                                        <Grid container sm={12} style={{margin:"25px auto auto auto"}}>
                                            

                                            
                                          <Grid item sm={6}>
                                          <Button                   size="large"
 style={webStyle.cancelButton} onClick={this.handleCloseDefineInvoiceModal}>Cancel</Button>

                                          </Grid>
                                          

                                          <Grid item sm={6}>
                                             <Button
                  style={{
                    textTransform: "none",
                    backgroundColor: "#4EABF8",
                    color:"#ffff",
                    width:"97%",
                    marginLeft:"10px"
                  }}
                  size="large"
                  variant="contained"
                  onClick={this.handelGenerateInvoice}
                >
                  Generate 
                                              </Button>
                                          </Grid>

                                        </Grid>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </Modal>
        )
    }
  }

  parseImg(img: string | null) {
    if (!img) return undefined;
    const imageLink = configJSONBase.baseURL;
    const imageFragment =
      typeof img === "string" && img.split("/").includes("rails");
    const imgSrc = imageFragment ? `${imageLink}/${img}` : img;
    return imgSrc;
  }

  getTableCells=(item:any)=>{
    return <>
    <TableCell className="tablecell tabledata" >{item?.slNo}</TableCell>
    <TableCell className="tablecell"> {item?.attributes?.client_name}</TableCell>
    <TableCell className="tablecell"> {item?.attributes?.client_id}</TableCell>
    <TableCell className="tablecell"> { item?.attributes?.client_invoice_list?.from_date===null ?"NA" :moment(item.attributes.client_invoice_list.from_date).format("DD/MM/YYYY")}</TableCell>
    <TableCell className="tablecell"> { item?.attributes?.client_invoice_list?.to_date===null ?"NA" :moment(item.attributes.client_invoice_list.to_date).format("DD/MM/YYYY")}</TableCell>
    <TableCell className="tablecell"> { item?.attributes?.client_invoice_list?.overdue_date===null ?"NA" :moment(item.attributes.client_invoice_list.overdue_date).format("DD/MM/YYYY")}</TableCell>
   
    <TableCell className="tablecell tabledata">{item?.attributes?.client_invoice_list?.invoice_status}</TableCell>
    <TableCell className="tablecell tabledata">{item?.attributes?.client_invoice_list?.invoice_amount}</TableCell>
    </>
  }

  render() {
    const {classes} = this.props
    
    const filteredList = this.state.invoiceData

    return (
      <>
     
     {this.renderFilterPopup(classes)}
      
      
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
           Client Invoices
            </Typography>
            </div>
          
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div style={{display:"flex",alignItems:"center"}}>
              <img src={filter} style={{ width: 30, height: 30,marginRight:"15px", cursor :"pointer"}} onClick={this.handleFilterClick}/>
              </div>

              <SearchBar
                placeholder="Search Invoices"
                  value={this.state.search}
                  onChange={this.requestSearch}
                  onCancelSearch={this.cancelSearch}
              />
              <div>
              <Button
                  style={{
                    textTransform: "none",
                    backgroundColor: "#4EABF8",
                    color:"#ffff",
                    height:"100%",
                    marginLeft:"15px"
                  }}
                  size="large"
                  variant="contained"
                  onClick={()=>this.setState({defineInvoiceModal:true})}
                >
                  Generate Invoice
                </Button>
              </div>
            </div>
          </Box>
            { this.state.loading ? <Box className="progres">  <CircularProgress style={{color:"#6e6e6e"}} size={50}/> </Box> :
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


              <TableBody>
                {this.state.invoiceData?.length >0  ?this.getFilteredData(filteredList).map((item:any,id:any) =>
                 {
                  return (
                    <TableRow>
                      {this.getTableCells(item)}

      <TableCell className="tablecell  name-break"> 
      
      <Box sx={{display : "flex", alignItems : "center"}} >                     
           <Avatar className="smallSize" alt="Remy Sharp" src={item?.attributes?.finulent_admin[0]?.image ? this.parseImg(item.attributes.finulent_admin[0].image) : "/static/images/avatar/1.jpg"}/> 
            <Typography style={{paddingLeft : "8px"}}>{item?.attributes?.finulent_admin[0]?.first_name}{" "}{item?.attributes?.finulent_admin[0]?.last_name}</Typography>
        </Box>
      </TableCell>


      <TableCell className="tablecell"> 
      
      <Box sx={{display : "flex", gap : "10px", alignItems : "center"}} >  
      <VisibilityOutlinedIcon onClick={()=>this.props.history.push("/genricInvoiceClientSuperadmin?id="+item?.id+"&clientId="+this.query.get('clientId'))}/>
      <EditOutlinedIcon onClick={()=>this.props.history.push("/genricInvoiceClientSuperadmin?id="+item?.id+"&clientId="+this.query.get('clientId')+'&isEdit=true')}/>
      <ArrowDownwardOutlinedIcon />

        </Box>
      </TableCell>
      </TableRow>
                  )
                }):null
                }
                  </TableBody>

            </Table>
            {this.getNoDataView()}
            </div>

        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.invoiceData.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.pageNo}
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
      />
      </>
            }
        </Box>

            {this.renderDefineInvoice()}
      </>
      
    );
  }
}

const Placeholder:React.FunctionComponent = ({children}) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};

export default withStyles(useStyles)(ClientInvoicesSuperadmin)

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
  modalbackdrop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    alignContent: "center"
  },
  modalcontentsuccess: {
    width: "500px",
    height: "auto",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    alignItems: "left",
    justifyContent: "left",
    margin: 20,
    overflowX: "scroll",
    overflowY: "scroll",
} as React.CSSProperties,
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
addworkspacemodaldiv: {
  backgroundColor: "white",
  marginLeft: 0,
  marginright: 0,
},
headerBox: {
  borderBottom: '1px solid #e8e8e8',
  display: "flex",
  justifyContent: "space-between",
  width: 520,
} as React.CSSProperties,
cancelButton: {
  width: "100%",
  border: "1px solid #cecece",
  backgroundColor: "#e8e8e8",
  color: "black",
  fontWeight: 600,
  textTransform: "none",
}as React.CSSProperties,
addEditHeading: {
  marginLeft: 20,
},
closebuttonstyle: {
  marginTop: 20,
  marginRight: 25,
},
addworkspacemaincontentdiv: {
  backgroundColor: "white",
  marginBottom: 10,
},
addworkspacedivcontent: {
  display: "flex",
  flexDirection: "column",
  marginLeft: 20,
  marginRight: 20,
} as React.CSSProperties,
addworkspaceelements: {
  marginBottom: 20
},
modaltextboxheader: {
  color: "#7a7a7a"
},
textfieldDisabled: {
  backgroundColor: "#e8e8e8"
},
errorText: {color:"#f44336", fontSize:15, marginTop:5},

};
