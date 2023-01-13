import React from "react";
import PhoneInput from "react-phone-input-2";
import MomentUtils from "@date-io/moment";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";

import Avatar from "@material-ui/core/Avatar";
import GenericSuccessModal from "../../ContentManagement/src/GenericSuccessModal.web";

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
  FormControl,
  TableContainer,
  TablePagination,
  Link,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "./roles.css";
// Customizable Area End

import RolesPermissionController, { Props } from "./RolesPermissionController";

import { widthFromPercentage } from "../../../framework/src/Utilities";

// const  isLoggedIn = localStorage.getItem('token')
let roles = [
  {
    id: 1,
    name: "Testing",
    created_at: "2022-08-30T07:09:55.463Z",
    updated_at: "2022-08-30T07:09:55.463Z",
    description: "random words",
  },
  {
    id: 2,
    name: "QA",
    created_at: "2022-08-30T07:09:55.463Z",
    updated_at: "2022-08-30T07:09:55.463Z",
    description: "random words",
  },
  {
    id: 3,
    name: "super_admin",
    created_at: "2022-08-30T07:09:55.463Z",
    updated_at: "2022-08-30T07:09:55.463Z",
    description: "random words",
  },
  {
    id: 4,
    name: "admin",
    created_at: "2022-08-30T07:09:55.463Z",
    updated_at: "2022-08-30T07:09:55.463Z",
    description: "random words",
  },
];

export default class RolesPermission extends RolesPermissionController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
  }
handleClose=()=>{
this.setState({open:false})
}
handleAdd =() =>{
this.updateRole()
this.setState({open:false})
}
modalClose = () => {
  this.setState({ isSuccessModal: false ,modalMsg:""});
};
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
handleChange =(e:any)=>{
    const val = {
        ...this.state,
        [e.target.name]: e.target.value,
      };
      this.setState(val);
}

   editRole = ()=>(
    <Modal
        className="modal-backdrop"

        open={this.state.open}
        onClose={this.handleClose}
        style={{
          overflow: "auto",
        }}
      >
        <div
          className="modal-content1"
          style={{ zIndex: 10, position: "absolute" }}
        >
          <div className="usercontent1">
            <div className="headingdata1">
              <div>
                <Typography className="mainheading">
                  Role & Permission
                </Typography>
              </div>

              <div>
                <CloseIcon onClick={this.handleClose} />
              </div>
            </div>
            <Divider />

          <Box>
            <Typography className="inputlabel1">Title</Typography>
            <TextField
            disabled
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  placeholder="Doe"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                />
          </Box>
          <Box>
            <Typography className="inputlabel1">Description</Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Optional"
              style={{ width: "100%" }}
              onChange={this.handleChange}
              value={this.state.desc}
              name="desc"
              className="description"
            />
          </Box>
            <div style={{  textAlign:"end" }}>
              <Button
                onClick={this.handleClose}
                className="btn-cancel"

              >
                Cancel
              </Button>
              <Button
                onClick={this.handleAdd}
                className="btn-add"

              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </Modal>
   )
  edit=(e:any,id:any)=>{
    console.log(id, "IN ID")
    this.setState({open:true,roleId:id})
    this.state.rolesData.map((item:any)=>{
        if(item.id===id){
            this.setState((prev) =>{
                console.log(prev, "THIS IS THE PREV")

                return {
                  ...prev,
                //   genericModalOpen:true,
                  title:item.name,
                  desc:item.description

                //   isEditMode:true,
                }
            })

        }
    })
  }

  render() {
    // const { navigation } = this.props;
    // const isLoggedIn = localStorage.getItem("token");

    return (
      <>
       {this.state.isSuccessModal &&
        <GenericSuccessModal
        isOpen={this.state.isSuccessModal}
        succesModalBody={this.successErrModalBody}
        // succesModalBody={Object.keys(this.state.userData).length>0 ?this.succesModalBody: this.errorModalBody}
        close={this.modalClose}
      />
      }
      <Box
        sx={{
          height: "100%",
          width: "85vw",
          top: "50px",
          // left: "280px",
          right: 0,
          boxSizing: "border-box",
          padding: "50px 20px 10px 20px",
          position: "absolute",

          // spacing:2
        }}
        style={{ backgroundColor: "#e8e8e8" }}
      >
        <Grid container spacing={2}>
            {     !this.state.rolesData.length ? <Box style={{ display:"flex",width:"100%",height:"100vh",justifyContent:"center", alignItems:"center",textAlign:"center"}}  >  <CircularProgress style={{color:"#6e6e6e",}} size={50} className="progres"/> </Box>: this.state.rolesData &&  this.state.rolesData.map((item:any) =>(
                <>
                  <Grid item xs={6}>
                  <Card>
                    <CardActionArea>
                      <CardContent className="maincard">
                        <Box className="editicon">
                          <Typography gutterBottom variant="h5" component="div">
                           {item?.name}
                          </Typography>
                          <EditOutlinedIcon onClick={(e)=>this.edit(e,item.id)} />
                        </Box>

                        <Typography variant="body2">
                         {item?.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>

                </>
            ))}
            {this.editRole()}
        </Grid>
      </Box>
      </>
    );
  }
}

const webStyle = {
  boxes: {
    marginTop: "10px",
  },
};
