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
// import "./terms.css";
// Customizable Area End

// import DesignationController, { Props } from "./DesignationController";
import InAppNotificationController , {Props} from "./InAppNotificationController"

import { widthFromPercentage } from "../../../framework/src/Utilities";




export default class InAppNotification extends InAppNotificationController {
  // static get isLoggedIn(){
  //     return {isLoggedIn:localStorage.getItem('token')}
  // }

  constructor(props: Props) {
    super(props);
  }



  render() {

    return (
      <>

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

              <Typography
                className="userrequest-heading"
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Notification
              </Typography>


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
