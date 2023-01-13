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
  Checkbox,

} from "@material-ui/core";
import "./style.css";
import { Close } from "@material-ui/icons";

import DeleteFieldController, {
  Props,
} from "./DeleteFieldController";
export default class DeleteFieldModal extends DeleteFieldController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Button style={webStyle.secondrowbutton} disableRipple={true}>
          <span
            className="button-content"
            onClick={() => {
              this.setState({ openDeleteField: true });
            }}
          >
            Delete field
          </span>
          </Button>
          <Modal
            open={this.state.openDeleteField}
            onClose={this.handleButtonCancel}
            aria-labelledby="modal-workspace-title"
            aria-describedby="modal-workspace-description"
            style={webStyle.modalRoot}
            disableScrollLock={true}
            BackdropProps={{
              style: webStyle.modalBackdropProps,
            }}
          >
            <Card variant="outlined" style={webStyle.modalCardRoot}>
              <CardHeader
                className="fdkf"
                style={webStyle.modalCardHeader}
                disableTypography={true}
                action={
                  <IconButton
                    aria-label="close"
                    onClick={this.handleButtonCancel}
                  >
                    <Close />
                  </IconButton>
                }
                title={
                  <Typography style={webStyle.modalCardHeaderText}>
                    Delete field
                  </Typography>
                }
              />

              <CardContent style={webStyle.sequenceModalCardContent}>
                <div className="seq-table">
                  <div className="sequence-header">
                    <div className="sequence-header-row">
                      <p className="seq-title-text">Sequence</p>
                      <p className="field-title-text">Field</p>
                    </div>
                  </div>

                  <div className="sequence-body-list">
                    {this.state?.fieldsData?.map((data: any) => {

                      if (data.custom_field === false) {
                        return (
                          <div
                            className="sequence-item-freeze"
                            key={data.sequence_no}
                          >
                            <div className="seq-left-con">
                              <p className="seq-title-text1">
                                {data.sequence_no}
                              </p>
                            </div>
                            <div className="seq-right-con">
                              <p className="field-title-text1">
                                {data.field_name}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div
                          className={`sequence-item ${
                            this.state.selectedDelField ==
                            data.field_name
                              ? "active-border"
                              : ""
                          }`}
                          key={data.sequence_no}
                        >
                          <div className="seq-left-con">
                            <div className="seq-title-text1">
                              <Checkbox
                              style={{marginLeft: '-40'}}
                                checked={this.isChecked(
                                  this.state.selectedDelField,
                                  data.field_name
                                )}
                                value={data.field_name}
                                onChange={(e) => {
                                  if (
                                    this.state.selectedDelField.includes(data)
                                  ) {
                                    let index = this.state.selectedDelField.indexOf(
                                      data
                                    );
                                    let tmpSelected = this.state.selectedDelField;
                                    if (index !== -1) {
                                      tmpSelected.splice(index, 1);
                                    }
                                    this.setState({ selectedDelField: tmpSelected });
                                  } else {
                                    let tmparr = this.state.selectedDelField;
                                    tmparr.push(data);
                                    this.setState({ selectedDelField: tmparr });
                                    }
                                  Number(e.currentTarget.alt) - 1 === 6 ?
                                    this.setState({
                                        invalidSelect: true
                                    }): this.setState({
                                        invalidSelect: false
                                    })
                                    document.querySelector(".active-border")?.scrollIntoView();
                                }}
                                inputProps={{ "aria-label": "controlled" }}

                              />
                                    {data.sequence_no}
                            </div>
                          </div>
                          <div className="seq-right-con">
                            <p className="field-title-text1">
                              {data.field_name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>

              <CardActions style={webStyle.modalCardActions}>
                <Box style={webStyle.modalCardActionsContainer}>
                <Button
                    disableElevation
                    variant="contained"
                    style={webStyle.modalCardCancelButton}
                    onClick={
                        this.handleButtonCancel
                    }
                >
                    Cancel
                </Button>
                <Button
                     disableElevation
                     variant="contained"
                     style={webStyle.modalCardActionButton}
                    onClick={
                        this.handleDeleteButtonAction
                    }
                  >
                    Delete
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
  secondrowbutton: {
    color: "#0096ff",
    backgroundColor:"white"
  },
  modalBackdropProps: {
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  modalCardRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    minHeight: "50%",
    maxHeight: "80%",
    fontSize: "16px",
    overflowY: "scroll",
  } as React.CSSProperties,
  modalCardHeader: {
    // borderBottom: "1px solid #ccc",
    paddingInline: "1rem",
  },
  modalCardHeaderText: {
    fontWeight: 600,
  },
  modalCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
  sequenceModalCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
    fontFamily:"sans-serif",
    fontWeight:"bold"
  } as React.CSSProperties,
  modalCardActionsContainer: { display: "flex", gap: "0.5rem" },
  modalCardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
  },
  modalCardCancelButton: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    width: "100px",
    fontWeight: "bold",
    fontFamily:"sans-serif"
  } as React.CSSProperties
};
// Customizable Area End
