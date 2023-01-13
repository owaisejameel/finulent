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
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/EditOutlined';
import "./terms.css";
// Customizable Area End

import DesignationController, { Props } from "./DesignationController";


import { widthFromPercentage } from "../../../framework/src/Utilities";




export default class Designation extends DesignationController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
  }

  designationEdit = () => {
    this.setState({ isEdit: true })
  }
  handleChange = (e: any) => {
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val);
  }
  editDesignationModal = (e: any, id: any) => {
    this.setState({ open: true, isEdit: true, designationId: id })
    this.state.designationData.map((item: any) => {
      if (item.id === id) {
        console.log("EDIT IN ", id)
        this.setState((prev) => {
          console.log(prev, "THIS IS THE PREV")

          return {
            ...prev,
            //   genericModalOpen:true,
            title: item.name,


            //   isEditMode:true,
          }
        })

      }
    })
  }
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
          {this.state.modalMsg && this.state.modalMsg}

        </Typography>


      </div>
    </>
  );
  modalClose = () => {
    this.setState({ isSuccessModal: false, modalMsg: "" });
  };

  // handleDesignationClose=()=>{
  //   this.setState({open:false,isEdit:false})
  // }
  handleDesignationAdd = () => {
    if (this.state.title === "") {
      this.setState({ page: false })
    } else {
      this.state.isEdit ? this.updateDesignation() : this.handleAddDesignationAction()
      this.setState({ open: false, title: "", isEdit: false, page: true })
    }

  }
  addDesignation = () => {
    this.setState({ open: true })
  }
  handleDesignationDelete = (e: any, id: any) => {
    this.deleteDesignation(id)
    this.setState({ designationId: id })

  }
  handleDesignationClose = () => {
    this.setState({ open: false, title: "", isEdit: false, page: true })
  }
  handleAddDesignation = () => {
    this.setState({ open: true })
  }
  editDesignation = () => (
    <Modal
      className="modal-designation-backdrop"

      open={this.state.open}
      onClose={this.handleDesignationClose}
      style={{
        overflow: "auto",
      }}
    >
      <div
        className="modal-designation-content1"
        style={{ zIndex: 10, position: "absolute" }}
      >
        <div className="designationcontent1">
          <div className="headingdata1">
            <div>
              {this.state.isEdit ? <Typography className="mainheading">
                Edit Designation
              </Typography> : <Typography className="mainheading">
                Add Designation
              </Typography>}

            </div>

            <div>
              <CloseIcon onClick={this.handleDesignationClose} />
            </div>
          </div>
          <Divider />

          <Box>
            <Typography className="inputdesignationlabel"> Designation Title</Typography>
            <TextField

              variant="outlined"
              size="small"
              required
              fullWidth
              placeholder="Designation Title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
            />
            {this.state.title === "" && !this.state.page && (
              <>
                <p
                  className="errMsg"

                >

                  Designation is required
                </p>
              </>
            )}
          </Box>
          <div className="divideradmin" >
            <Divider style={{}} />
          </div>

          <div style={{ textAlign: "end", marginBottom: "30px" }}>
            <Button
              onClick={this.handleDesignationClose}
              className="btn-cancel-designation"

            >
              Cancel
            </Button>
            <Button
              onClick={this.handleDesignationAdd}
              className="btn-add-designation"

            >
              {this.state.isEdit ? "Save" : "Add"}

            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )

  render() {

    return (
      <>
        {this.state.isSuccessModal &&
          <GenericSuccessModal
            isOpen={this.state.isSuccessModal}
            succesModalBody={this.successErrModalBody}

            close={this.modalClose}
          />
        }

        {this.state.open && this.editDesignation()}
        <Box
          sx={{
            //   height: "100%",
            width: "85vw",
            top: "50px",
            // left: "280px",
            right: 0,
            boxSizing: "border-box",
            padding: "50px 20px 10px 20px",
            position: "absolute",

            // spacing:2
          }}
          style={{ backgroundColor: "#e8e8e8", height: "95%", overflowY: "scroll" }}
        >
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            {this.state.isEdit ? <Typography
              className="userrequest-heading"
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Edit  Designation
            </Typography> :
              <Typography
                className="userrequest-heading"
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Designation
              </Typography>
            }
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box >
                <Button className="adddesignebtn" onClick={this.handleAddDesignation}>Add Designation</Button>
                {/* {this.state.isEdit ?  <Button className="adddesignebtn">Add Designation</Button>: <Button className="designeditbtn" onClick={this.addDesignation}>Add Designation</Button> } */}

              </Box>
            </div>
          </Box>
          <Box style={{ backgroundColor: "white", padding: "10px" }}>
            {this.state.isLoader ? <Box className="progres">  <CircularProgress style={{ color: "#6e6e6e" }} size={50} /> </Box> :
              <div style={{ backgroundColor: "white" }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#e8e8e8" }}>
                      <TableRow>
                        <TableCell className="designname">Designation Id</TableCell>
                        <TableCell className="designname">Designation</TableCell>
                        <TableCell ></TableCell>

                      </TableRow>
                    </TableHead>


                    <TableBody>
                      {this.state.designationData?.map((row: any) => (
                        <TableRow
                          key={row.name}
                        //  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                          <TableCell >{row.degination_id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell><EditOutlinedIcon onClick={(e) => this.editDesignationModal(e, row.id)} />  <DeleteOutlinedIcon onClick={(e) => this.handleDesignationDelete(e, row.id)} /></TableCell>


                        </TableRow>
                      ))}
                    </TableBody>


                  </Table>
                </TableContainer>
              </div>
            }
          </Box>
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
