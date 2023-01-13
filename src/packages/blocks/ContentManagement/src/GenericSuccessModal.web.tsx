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
import "./UserManagement.css";
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
  Link,
  //   Modal
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import {redicon} from "./assets"
// Customizable Area End
import PropTypes from "prop-types";
import { Component } from "react";
import UserManagementController from "./UserManagementController";

import { widthFromPercentage } from "../../../framework/src/Utilities";
import { modalCheck } from "../../forgot-password/src/assets";
import  {success } from "./assets"
// import CloseIcon from "@material-ui/icons/Close";

type Props = {
  //   testID: string;
  //   appId: string;
  //   loginFacebookButtonText: string;
  //   heading: string;
  isOpen: boolean;
  close: () => void;
  modalVarient?:string;
  //   modalBody: () => void;
  succesModalBody: () => void;

  // modalBody:() =>void;
  //   handleAction:() => void;
  //   callback: (response: any) => void;
  //   onPress: () => void;
  // Customizable Area Start
  // Customizable Area End
};

export default class GenericSuccessModal extends Component<Props> {
  static propTypes = {
    // heading: PropTypes.string,
    // modalBody: PropTypes.func,
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    // handleAction:PropTypes.func,
    succesModalBody: PropTypes.func,
    modalVarient:PropTypes.string
    // modalBody:PropTypes.func

    // Customizable Area Start
    // Customizable Area End
  };
  constructor(props: Props) {
    super(props);
  }

  handleClose = () => {
    this.props.close();
    // this.setState
    this.setState({modalVarient:"", genericModalOpen: false, isEditMode: false, modalMsg: "" });
    // this.props.closeModal()
  };

  // componentDidUpdate(){
  //   this.setState({modalBody:this.props.succesModalBody})
  // }
  render() {
    return (
      <Modal
        className="modal-backdrop"
        //   open={false}
        open={this.props.isOpen}
        onClose={this.handleClose}
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
            width: "30%",
            // height: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {
            this.props.modalVarient==="error"?
                <img
                width="40px"
                style={{paddingTop:"40px"}}
                  src={ redicon}
                  // style={{ width: "200px", height: "150px" }}
                />:
                 <img

                  src={ success}
                  style={{ width: "200px", height: "150px" }}
                />
          }
              {/* </div> */}
          <div
            style={{ textAlign: "center" ,color:"black"}}
            //    className="usercontent"
          >
            {this.props.succesModalBody()}

            <Button
              onClick={this.handleClose}
              className="okbtn"
              style={{marginBottom:"20px",marginTop:"20px"}}

            >
              Ok
            </Button>
            {/* </div> */}
          </div>
        </div>
      </Modal>
    );
  }
}


