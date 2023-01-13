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
  Divider
} from "@material-ui/core";
import "./style.css";
import { Close } from "@material-ui/icons";
const radioOff = require('../assets/radioOff.png')
const radioOn = require('../assets/radioOn.png')
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import UpdateSequenceModalController, { Props } from "./UpdateSequenceModalController";

export default class UpdateSequenceModal extends UpdateSequenceModalController {
  constructor(props: Props) {
    super(props);
  }

  returnMoveUpClassname = () => {
    if (!this.state.selectedSeqField || this.state.invalidMoveUp) {
      if (localStorage.getItem('user_type') == 'Superadmin') return 'inactive-move-btn'
      else return 'admin-inactive-move-btn'
    }
    else if (localStorage.getItem('user_type') == 'Superadmin') return 'sequence-btn-text'
    else return 'admin-sequence-btn-text'
  }

  returnMoveDownClassname = () => {
    if (!this.state.selectedSeqField || this.state.invalidMoveDown) {
      if (localStorage.getItem('user_type') == 'Superadmin') return 'inactive-move-btn'
      else return 'admin-inactive-move-btn'
    }
    else if (localStorage.getItem('user_type') == 'Superadmin') return 'sequence-btn-text'
    else return 'admin-sequence-btn-text'
  }

  returnMovableColumns = (data: any, index: number) => (<div className="seq-left-con">
    <p className="seq-title-text1">
      <img src={this.ternaryAlternative(this.state?.selectedSeqField == data?.sequence_no, radioOn, radioOff)} className="seq-radio" alt={data.sequence_no} onClick={(e) => {
          this.setState({
          selectedSeqField: e.currentTarget.alt
        });
        this.state.sequenceDataCopy?.[index - 1]?.is_frozen ?
          this.setState({
            invalidMoveUp: true
          }) : this.setState({
            invalidMoveUp: false
          })
          index + 1 === this.state.sequenceDataCopy?.length ?
          this.setState({
            invalidMoveDown: true
          }) :
          this.setState({
            invalidMoveDown: false
          })
        }} />
      {data.sequence_no}</p>
  </div>)

  render() {
    return (
      <>
        <Button style={this.ternaryAlternative(localStorage.getItem('user_type') == "Admin", webStyle.secondrowadminbutton, webStyle.secondrowbutton)} disableRipple={true}>
          <span className="button-content" onClick={() => {
            this.setState({ openSequence: true })
          }}> {localStorage.getItem('user_type') == "Admin"? <CompareArrowsIcon/> :""} Sequencing</span>
        </Button>
        <Modal
          open={this.state.openSequence}
          onClose={() => this.handleButtonCancel()}
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
                 Sequencing
                </Typography>
              }
            />

            <CardContent  style={localStorage.getItem('user_type')=='Superadmin'?webStyle.sequenceModalCardContent:webStyle.sequenceAdminModalCardContent}>
              <div className="sequence-top-div">
                <div className="sequencing-btns">
                  <p className={this.returnMoveUpClassname()} onClick={() => {
                    this.handleMoveSequenceUp()
                  }}>Move Up</p>
                  <p className={this.returnMoveDownClassname()} onClick={() => {
                    this.handleMoveSequenceDown()
                  }}>Move Down</p>
                </div>
                <p className="sequence-tip">*Select a field and then move up/down</p>
              </div>
              <div className="seq-table">
                <div className="sequence-header">
                  <div className={localStorage.getItem('user_type') == "Superadmin" ? "sequence-header-row" : "admin-sequence-header-row "}>
                    <Typography className="seq-title-text">Sequence</Typography>
                    <Typography className="field-title-text">Field</Typography>
                  </div>
                </div>
                <div className="sequence-body-list">
                  {this.state?.sequenceDataCopy?.length && this.state?.sequenceDataCopy?.map((data: any, index: number) => {
                    if (data?.is_frozen) {
                      return (
                        <div className="sequence-item-freeze" key={data?.sequence_no} >

                          <div className="seq-left-con">
                            <p className="seq-title-text1">{data?.sequence_no}</p>
                          </div>
                          <div className="seq-right-con" style={{borderLeft:"1px red"}}>
                            <p className="field-title-text1">{data?.field_name}</p>
                          </div>

                        </div>

                      )
                    }
                    return (
                      <div className={`sequence-item ${this.ternaryAlternative(this.state?.selectedSeqField == data?.sequence_no, 'active-border', '')}`} key={data.sequence_no} >
                        {this.returnMovableColumns(data, index)}
                        <div className="seq-right-con" >
                          <p className="field-title-text1">{data?.field_name}</p>
                          <Divider style={{color:"red"}}/>
                        </div>
                      </div>
                    )
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
                  onClick={() => this.handleButtonCancel()}
                >
                  Cancel
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  style={this.ternaryAlternative(localStorage.getItem('user_type') == 'Superadmin', webStyle.modalCardActionButton, webStyle.adminmodalCardActionButton)}
                  onClick={() => this.handleSequence()}
                >
                  Save
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
    backgroundColor: "white"
  },
  secondrowadminbutton: {
    color: "orange",
  },

  formTypography: {
    paddingBlockEnd: 1,
    marginBottom: '5px',
    fontSize: "14px",
    fontWeight: 600,
    color: "#424242",
  },
  adminmodalCardActionButton: {
    // backgroundColor: "#f5a823",
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    color: "black",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
    fontWeight: "bold",
  } as React.CSSProperties,

  modalCardCancelButton: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    width: "100px",
    fontWeight: "bold",
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
    fontWeight:"bold"
  } as React.CSSProperties,
  modalCardActionsContainer: { display: "flex", gap: "0.5rem" },
  modalCardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
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
  sequenceAdminModalCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "16px",
    backgroundColor:"#F5F5F5",
  } as React.CSSProperties,

  modalCardHeader: {
    paddingInline: "1rem",
  },
  modalCardHeaderText: {
    fontWeight: 600,
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
  modalBackdropProps: {
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  modalFormControl: {
  } as React.CSSProperties,
  modalTextField: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInline: "14.5px",
    fontSize: "16px",
    border: "1px solid rgba(0, 0, 0, .3)",
  },
  modalTextFieldError: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInline: "14.5px",
    fontSize: "16px",
    backgroundColor: "#fdf5f5",
    border: "1px solid red",
  },
  modalFormHelper: {
    paddingBlock: "0",
    paddingInline: "0",
  },
};
// Customizable Area End
