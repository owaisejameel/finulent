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

// Customizable Area End
import PropTypes from "prop-types";
import { Component } from "react";
import UserManagementController from "./UserManagementController";

import { widthFromPercentage } from "../../../framework/src/Utilities";
// import CloseIcon from "@material-ui/icons/Close";
import "./generic.css"
import { classNames } from "react-select/src/utils";

type Props = {
  //   testID: string;
  //   appId: string;
  //   loginFacebookButtonText: string;
  heading: string;
  isOpen: boolean;
  closeModal: () => void;
  modalBody: () => void;
  handleAction: () => void;
  isEditMode:boolean;
  handleButton:string;
  // handleEditAction:() =>void
  // dataRoles: () => [];
  //   callback: (response: any) => void;
  //   onPress: () => void;
  // Customizable Area Start
  // Customizable Area End
};

export default class GenericModal extends Component<Props> {
  static propTypes = {
    heading: PropTypes.string,
    handleButton:PropTypes.string,
    modalBody: PropTypes.func,
    isEditMode:PropTypes.bool,
    closeModal: PropTypes.func,
    handleAction: PropTypes.func,
    // handleEditAction:PropTypes.func,
    // dataRoles: PropTypes.array,

    // Customizable Area Start
    // Customizable Area End
  };
  constructor(props: Props) {
    super(props);
  }

  handleClose = () => {
    this.props.closeModal();
  };
  handleAction = () => {

    // this.props.isEditMode ? : ""
    this.props.handleAction();
    // this.setState({ isSuccessModal: true})
    // this.props.closeModal();

    // this.setState({})
  };
  render() {
    return (
      <Modal
        className="modal-backdrop"

        open={this.props.isOpen}
        onClose={this.handleClose}
        style={{
          overflow: "auto",
        }}
      >
        <div
          className="modal-content"
          style={{ zIndex: 10, position: "absolute" }}
        >
          <div className="usercontent">
            <div className="headingdata">
              <div>
                <Typography className="mainheading">
                  {this.props.heading}
                </Typography>
              </div>

              <div>
                <CloseIcon onClick={this.handleClose} />
              </div>
            </div>
            <Divider />

            {this.props.modalBody()}

            <div style={{  textAlign:"end" }}>
              <Button
                onClick={this.handleClose}
                className="btn-cancel"

              >
                Cancel
              </Button>
              <Button
                onClick={this.handleAction}
                className={(localStorage.getItem('role_id') === "Superadmin") ? "btn-add" : "saveadminbtn"}
                // {((localStorage.getItem('role_id')==="Admin")
                // className="btn-add"

              >

               {this.props.handleButton}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}



