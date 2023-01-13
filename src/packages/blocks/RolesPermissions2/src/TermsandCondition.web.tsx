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
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg"

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "./terms.css";
// Customizable Area End

import TermsandConditionController, { Props } from "./TermsandConditionController";

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

export default class TermsandCondition extends TermsandConditionController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
  }
  handleEdit = () => {
    this.setState({ isEdit: true })
  }
  handleCancelbtn = () => {
    this.setState({ isEdit: false })
  }
  saveTerms = () => {
    this.updateTermsConditions()
    this.setState({ isEdit: false })
  }
  handleTermsChange = (e: any) => {
    const val = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(val);
  }
  onEditorStateChange = (termsandcondition: any) => {
    console.log(termsandcondition)
    this.setState({
      termsandcondition,
    });
  };


  render() {
    // const { navigation } = this.props;
    // const isLoggedIn = localStorage.getItem("token");

    return (
      <>

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
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", width: "100%"
          }}>
            <Typography
              className="terms-heading"

            >
              {this.state.isEdit ? "Editing Terms & Conditions" : "Terms & Conditions"}

            </Typography>

            <div className="maintermsdiv">
              <Box >
                {this.state.isEdit ? <div style={{
                  display: "flex",

                  gap: "20px"
                }}>
                  <Button className="cancel-terms-btn" onClick={this.handleCancelbtn} >Cancel</Button>
                  <Button className="save-terms-btn" onClick={this.saveTerms} >Save</Button>
                </div> : <Button className="edittermbtn" onClick={this.handleEdit}>Edit</Button>}

              </Box>
            </div>
          </Box>
          <Box >
            {this.state.isLoader ? <Box className="progres">  <CircularProgress style={{ color: "#6e6e6e" }} size={50} /> </Box> :
              this.state.isEdit ?


                <div className="App" style={{ height: "auto" }}>
                  <Editor
                    editorState={this.state.termsandcondition}
                    onEditorStateChange={this.onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                </div>

                : <p className="termstext"><div dangerouslySetInnerHTML={{ __html: this.state.normaltext }} /></p>}

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
