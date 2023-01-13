// Customizable Area Start
import React from "react";

import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Modal,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import "./style.css";
import { Close } from "@material-ui/icons";

import DefineChecklistTableController, {
  Props,
} from "./DefineChecklistTableController";
import ControlPointIcon from '@material-ui/icons/ControlPoint';

export default class AddChecklistModal extends DefineChecklistTableController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { that } = this.props;
    console.log(that.state);
    return (
      <>
        <Button
          style={webStyle.addParameterbtn}
          onClick={() => {
            that.setState({ openAddChecklistParam: true, isEdit: false });
          }}
          disableRipple={true}
        >
          <span className={localStorage.getItem('user_type')=='Superadmin'? "button-checklist":"admin-button-checklist"}> {localStorage.getItem('user_type') == "Admin"? < ControlPointIcon />:""}Add Checklist Parameter</span>
        </Button>
        <Modal
          open={that.state.openAddChecklistParam}
          onClose={that.closeChecklistModal}
          aria-labelledby="modal-workspace-title"
          aria-describedby="modal-workspace-description"
          style={webStyle.modalRoot}
          BackdropProps={{
            style: webStyle.modalBackdropProps,
          }}
        >
          <Card variant="outlined" style={webStyle.modalCardRoot}>
            <CardHeader
              disableTypography={true}
              style={{backgroundColor:"white"}}
              action={
                <IconButton aria-label="close">
                  <Close
                    style={webStyle.closeIcn}
                    onClick={that.closeChecklistModal}
                  />
                </IconButton>
              }
              title={
                <Typography style={webStyle.addParameterlabel}>
                  {that.state.isEdit ? 'Edit' : 'Add'} Checklist Parameter
                </Typography>
              }
            />
            <Divider />
            <CardContent style={localStorage.getItem('user_type')=='Superadmin'?webStyle.addChecklistInputSection:webStyle.addChecklistInputSectionAdmin}>
              <div style={webStyle.inputWrapper}>
                <Typography style={webStyle.checklistParamater}>
                  Checklist Parameter Name
                </Typography>
                <FormControl
                  fullWidth
                  error={that.state.inputError}
                  style={webStyle.modalFormControl}
                >
                  <InputLabel htmlFor="my-input" />
                  <input
                    style={webStyle.modalTextField}
                    type="textarea"
                    className="name-input"
                    placeholder="Type parameter name here"
                    value={that.state.checklistField}
                    onChange={(e: any) => {
                      that.setState({ checklistField: e.target.value });
                    }}
                  />
                  {that.state.inputError && (<FormHelperText
                    id="my-helper-text"
                    style={webStyle.modalFormHelper}
                  >
                    {"Please enter checklist parameter."}
                  </FormHelperText>)}
                </FormControl>
              </div>
            </CardContent>
            <Divider/>
            <CardActions style={webStyle.modalCardActions}>
              <Box style={webStyle.modalCardActionsContainer}>
                <Button
                  disableElevation
                  variant="contained"
                  style={webStyle.modalCardCancelButton}
                  onClick={that.closeChecklistModal}
                >
                  Cancel
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  style={localStorage.getItem('user_type')=='Superadmin'?webStyle.modalCardActionButton:webStyle.adminmodalCardActionButton}
                  onClick={() => that.handleForm()}
                >
                  {that.state.isEdit ? 'Update' : 'Add'}
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Modal>

      </>
    );
  }
}

const webStyle = {
  modalRoot: {
    display: "flex",
    gap: 1,
    fontSize: "16px",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    paddingBlock: "2rem", //
    backdropFilter: "blur(5px)",
    overflow: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modalBackdropProps: {
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  modalCardRoot: {
    width: "552px",
    borderRadius: "4px",
    background: "#ffffff",
  } as React.CSSProperties,
  closeIcn: {
    fontSize: "30px",
    color: "black",
  } as React.CSSProperties,
  modalHeaderText: {
    color: "#252631",
    fontFamily: "Open Sans",
    fontSize: "18px",
    fontWeight: 700,
  } as React.CSSProperties,
  checklistParamater: {
    fontSize: "14px",
    fontWeight: 600,
    margin: '7px 0px',
  } as React.CSSProperties,
  modalCardActionsContainer: { display: "flex", gap: "0.5rem" },
  modalCardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
  },
  modalCardCancelButton: {
    backgroundColor: "#e8e8e8",
    borderRadius: "8px",
    textTransform: "none",
    width: "140px",
    fontWeight: 600,
    height: "50px",
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#4eabf8",
    color: "white",
    borderRadius: "4px",
    width: "140px",
    textTransform: "none",
    height: "50px",
    fontWeight: 600,
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  adminmodalCardActionButton: {
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    color: "black",
    borderRadius: "4px",
    width: "140px",
    textTransform: "none",
    height: "50px",
    fontWeight: 600,
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  modalButton: {
    marginTop: "20px",
    backgroundColor: "#4eabf8",
    color: "white",
    borderRadius: "4px",
    width: "263px",
    textTransform: "none",
    height: "50px",
    fontWeight: 600,
  } as React.CSSProperties,
  duplicatebtn: {
    color: "#ffffff",
    fontFamily: "Open Sans",
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "center",
  } as React.CSSProperties,
  addParameterbtn: {
    backgroundColor: "white",
    margin: "10px",
    fontSize: "18px"
  } as React.CSSProperties,
  addParameterlabel: {
    backgroundColor: "white",
    margin: "10px",
    fontSize: "18px",
    fontWeight: 600
  } as React.CSSProperties,
  addChecklistInputSection: {
    height: '100px'
  } as React.CSSProperties,
  addChecklistInputSectionAdmin: {
    backgroundColor:"#F5F5F5",
    height: '100px'
  } as React.CSSProperties,
  inputWrapper: {
    margin: '0px 12px'
  } as React.CSSProperties,
  modalFormControl: {
    fontFamily:"sans-serif",
    fontSize: "14px",
    color: "#abafbb",
} as React.CSSProperties,
modalTextField: {
  borderRadius: "4px",
  paddingBlock: "10px",
  paddingInline: "14.5px",
  fontSize: "16px",
  border: "1px solid rgba(0, 0, 0, .3)",
  fontFamily:"sans-serif"
},
modalFormHelper: {
  paddingBlock: "0",
  paddingInline: "0",
  fontFamily:"sans-serif"
} as React.CSSProperties,
};
