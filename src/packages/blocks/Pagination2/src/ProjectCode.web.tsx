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
import "./projectcode.css"
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
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearIcon from '@material-ui/icons/Clear';
// import "./invoice.css";
// Customizable Area End

import ProjectCodeContentController, { Props } from "./ProjectCodeController";

import { widthFromPercentage } from "../../../framework/src/Utilities";

// const  isLoggedIn = localStorage.getItem('token')

export default class ProjectCode extends ProjectCodeContentController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {

    super(props);
  }

  handleEdit = () => {
    this.setState({ isEdit: true });
  };
  handleCancelbtn = () => {
    this.getProjectCode()
    this.setState({ isEdit: false, page: true, removeData: [], newCode: [] });
  };

  handleCodeChange = (e: any) => {
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val, () => {

      if (this.state.codeData.includes(this.state.projectCode.toLowerCase()) ||  this.state.codeData.includes(this.state.projectCode.toUpperCase())) {

        this.setState({ sameCode: true })
      } else {
        this.setState({ sameCode: false })
      }
    });

  }

  handleTermsChange = (e: any) => {
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val, () => {
      if (this.state.codeData.includes(this.state.newCode)) {

        this.setState({ sameCode: true })
      } else {
        this.setState({ sameCode: false })
      }
    });

  };
  handleAddProjectCode = (e: any) => {

    if (this.state.page) {
      this.setState({ page: false });
    }
    if (this.state.projectCode.length) {
      this.setState(({
        codeData: [...this.state.codeData, this.state.projectCode], projectCode: "", page: true,
        newCode: [...this.state.newCode, this.state.projectCode]
      }))
    }

  }
  modalClose = () => {
    this.setState({ isSuccessModal: false, modalMsg: "" });
  };
  successErrModalBody = () => (
    <>
      <div>
        <Typography
          className="success-message-modal"
        >

          {this.state.modalMsg && this.state.modalMsg}

        </Typography>
      </div>
    </>
  );
  editCode = (e: any, name: any, id: any) => {

    this.getProjectCodeById(id)
    this.setState({ isEdit: true, selectedName: name, workspaceId: id });
  }

  handleCodeDelete = (code: any) => {

    const result = this.state.codeData.filter((item: any) => item != code)
    this.setState({ codeData: result, removeData: [...this.state.removeData, code] })


  }
  deleteCode = () => {

    this.deleteCodes()
    this.setState({ removeData: [] })
  }
  handlesaveBtn = () => {
    if (this.state.removeData.length > 0) {
      this.deleteCodes()

    } else {
      if(this.state.workspaceId!="" && this.state.newCode.length>0){
      this.handleAddProjectCodeAction()
      }
    }


  }


  editProjectCode = () => (
    <>

      <Grid className="edit-maingrid">
        <Box className="box-maingrid">
          <div className="subgrid" >
            {this.state.codeData && this.state.codeData?.map((code: any) => {

              return (

                <div>

                  <Button onClick={() => this.handleCodeDelete(code)} variant="outlined" style={{textTransform: "none"}}>
                    {code}
                    <ClearIcon />
                  </Button>
                </div>

              )
            })}
            <div>
            </div>
          </div>
          <div>
            <Typography className="add-heading">Add {this.state.selectedName} Project Codes</Typography>
            <div className="input-add-code">
              <TextField
                variant="outlined"
                size="small"
                required
                type="text"
                name="projectCode"
                value={this.state.projectCode}
                onChange={this.handleCodeChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start" />,
                }}
              />

              <div className="add-btn-code">
                <Button className="add-code" onClick={this.handleAddProjectCode} disabled={this.state.sameCode}>Add</Button>
              </div>

            </div>
            {this.state.projectCode === "" && !this.state.page && (
              <>
                <p className="errMsg"  >

                  Project Code is required
                </p>
              </>
            )}
             {this.state.sameCode && (
              <>
                <p
                  className="messageErr"

                >

                  Same  Name is  there
                </p>
              </>
            )}

          </div>
        </Box>
      </Grid>

    </>
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
        <Box
          sx={{
            height: "100%",
            overflow: "scroll",
            width: "85vw",
            top: "50px",
            right: 0,
            boxSizing: "border-box",
            padding: "50px 20px 10px 20px",
            position: "absolute",

            // spacing:2
          }}
          style={{ backgroundColor: "#e8e8e8" }}
        >
          <Box

            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography className="terms-heading">
              {this.state.isEdit
                ? "Editing Project Code"
                : "Project Code"}
            </Typography>

            <div className="maincodediv">
              <Box>
                {this.state.isEdit && (
                  <div className="subdiv-code-btn">
                    <Button
                      className="cancel-code-btn"
                      onClick={this.handleCancelbtn}
                    >
                      Back
                    </Button>
                    <Button className="save-code-btn" onClick={this.handlesaveBtn}>
                      Save
                    </Button>
                  </div>
                )
                }
              </Box>
            </div>
          </Box>
          <Grid>
            {this.state.isEdit ? this.editProjectCode() :
              <Box className="table-data1">
                {this.state.isLoader ? <Box className="progres">  <CircularProgress style={{ color: "#6e6e6e" }} size={50} /> </Box> :
                  <div className="maindiv-table">
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead className="tableheadcolor">
                          <TableRow>
                            <TableCell className="headingname">Workspace</TableCell>
                            <TableCell className="headingname" >Project Codes</TableCell>
                            <TableCell ></TableCell>

                          </TableRow>
                        </TableHead>


                        <TableBody>
                          {this.state.projectcodeData?.map((row: any, index: any, arr: any) => (
                            <TableRow
                              key={row.name}

                            >

                              <TableCell className="workspacename">{row.name}</TableCell>
                              <TableCell className="workspacename"><span>{row.project_code + ((index && index === arr.length - 1) ? ', ' : '')}</span></TableCell>
                              <TableCell><EditOutlinedIcon onClick={(e) => this.editCode(e, row.name, row.id)} />  </TableCell>


                            </TableRow>
                          ))}
                        </TableBody>


                      </Table>
                    </TableContainer>
                  </div>
                }
              </Box>
            }
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
