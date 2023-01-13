//Customizable Area Start
import React from 'react';
import {
  Box,
  Button,
  Modal,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  InputLabel,
  CardActions,
  TextField,
  createMuiTheme,

} from '@material-ui/core';
import MomentUtils from "@date-io/moment";
import { Close } from "@material-ui/icons";
import Select from 'react-select';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "material-ui-pickers";

import AddProjectController, {
  Props
} from './AddProjectController';
import { ThemeProvider } from "@material-ui/styles";
import { Divider } from 'react-native-elements';
import ControlPointIcon from '@material-ui/icons/ControlPoint';


const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8":"rgb(171 114 24)",
        color: "black",
        backgroundImage:   localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8":"radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      },
    },
    MuiPickersDay: {
      day: {
        color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
      },
      daySelected: {
        backgroundColor:localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "rgb(171 114 24)",
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      },
      dayDisabled: {
        color:localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "rgb(171 114 24)",
      },
      current: {
        color:localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "rgb(171 114 24)",
      },
      isSelected: {
        color: localStorage.getItem('user_type')=='Superadmin'?"black":"white",
        backgroundColor: localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8":"rgb(171 114 24)",
        backgroundImage: localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "10px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#E4EFEF",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#1D388F61",
          borderRadius: "2px",
        },
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
          color:  localStorage.getItem('user_type')=='Superadmin'?"black":"white",
      },
      toolbarBtnSelected: {
          color:  localStorage.getItem('user_type')=='Superadmin'?"black":"white"
      },
   },
    palette: {
      primary: "red", // works
    },
    MuiButton: {
      textPrimary: {
        color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
      },
    },

    MuiPickersModal: {
      dialogAction: {
        color: "#8bc34a",
      },
    },
    myComponent: {
      "& .MuiPickersDay-isSelected": {
        backgroundColor: "red",
      },
    },

    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
      },
      dayLabel: {
        color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
      },
    },
  },
});


export default class AddProjectModal extends AddProjectController {
  constructor(props: Props) {
    super(props);
  }

  dynamicForm = (fieldObj: any) => {
    switch (fieldObj?.field_type) {
      case "Text":
        return (
          <>
            <InputLabel style={webStyle.formHeading} >{fieldObj?.field_name}{fieldObj?.create_mandatory && '*'}</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder={` ${fieldObj?.field_name} here`}
              type="text"
              name={`${fieldObj.id}`}
              value={this.renderValue(fieldObj?.data)}
              helperText={this.renderhelperText(fieldObj?.id, fieldObj?.field_name)}
              onChange={(e) => this.handleChange(e.target.value, fieldObj)}
              disabled={this.props.isEditProject && !fieldObj.isEditable}
              style={{backgroundColor:"white"}}
            />
          </>
        )

      case "Calendar":
        return (
          <>
            <InputLabel style={webStyle.formHeading}>{fieldObj?.field_name}{fieldObj?.create_mandatory && '*'}</InputLabel>
            <MuiPickersUtilsProvider
              utils={MomentUtils}
              style={{ background: "orange" }}
            >
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                  keyboard
                  variant="outlined"
                  size="small"
                  fullWidth
                  maxDate={new Date().setDate(new Date().getDate())}
                  placeholder="MM-DD-YYYY"
                  style={{backgroundColor:"white"}}
                  format={"MM-DD-YYYY"}
                  mask={(value) =>
                    value
                      ? [
                        /\d/,
                        /\d/,
                        "/",
                        /\d/,
                        /\d/,
                        "/",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]
                      : []
                  }
                  name={`${fieldObj.id}`}
                  value={this.renderValue(fieldObj?.data)}
                  onChange={(e) => this.handleChange(e.format('YYYY-MM-DD'), fieldObj)}
                  disableOpenOnEnter
                  animateYearScrolling={false}
                  autoOk={true}
                  disabled={this.props.isEditProject && !fieldObj.isEditable}
                  helperText={this.renderhelperText(fieldObj?.id, fieldObj?.field_name)}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider></>

        )
      case "Dropdown":
        return (
          <>
            <InputLabel style={webStyle.formHeading}>{fieldObj?.field_name}{fieldObj?.create_mandatory && '*'}</InputLabel>
            <Select
              className='selectoptiondata'
              labelId="demo-simple-select-disabled-label"
              id="demo-simple-select-disabled"
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              name={`${fieldObj?.id}`}
              defaultValue={this.renderValue(fieldObj?.data, fieldObj?.associated_class_name, fieldObj?.field_values)}
              helperText={this.renderhelperText(fieldObj?.id, fieldObj?.field_name)}
              options={this.createOptions(fieldObj?.field_values, fieldObj?.associated_class_name)}
              onChange={(e) => this.handleChange(e.value, fieldObj)}
              disabled={this.props.isEditProject && !fieldObj.isEditable}
            >
            </Select>
            {/* error */}
            <div>
                {this.renderhelperText(fieldObj?.id, fieldObj?.field_name)}
            </div>
          </>
        )
      case "Number":
        return (
          <>
            <InputLabel style={webStyle.formHeading}>{fieldObj?.field_name}{fieldObj?.create_mandatory && '*'}</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              placeholder={` ${fieldObj?.field_name} here`}
              type="number"
              value={this.renderValue(fieldObj?.data)}
              helperText={this.renderhelperText(fieldObj?.id, fieldObj?.field_name)}
              onChange={(e) => this.handleChange(e.target.value, fieldObj)}
              disabled={this.props.isEditProject && !fieldObj.isEditable}
              style={{backgroundColor:"white"}}
            />
          </>
        )
      default:
        break;
    }
  }

  render() {
    const { that } = this.props;
    return (
      <>
        <Button style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.secondrowbutton : webStyle.adminsecondrowbutton}>
          <span className='button-content' onClick={() => {
            that.setState({ openAddProject: true })
          }}> {localStorage.getItem('user_type') == "Superadmin"?"": <ControlPointIcon/>}Add Project</span>
        </Button>
        <Modal
          open={that.state.openAddProject}
          onClose={() => this.handleCancel()}
          aria-labelledby="modal-workspace-title"
          aria-describedby="modal-workspace-description"
          style={webStyle.modalRoot}
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
                  onClick={() => this.handleCancel()}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
              }
              title={
                <Typography style={webStyle.modalCardHeaderText}>
                  {this.props.isEditProject ? 'Edit Project' : 'Add Project'}
                </Typography>
              }
            />
            <Divider/>
            <CardContent  style={localStorage.getItem('user_type')=='Superadmin'?webStyle.modalCardContent:webStyle.modaladminCardContent}>
              <Box component="form">
                {this.state?.fieldsData?.map((item: any) => (
                  this.dynamicForm(item)
                ))}
              </Box>
            </CardContent>
            <Divider/>
            <CardActions style={webStyle.modalCardActions}>
              <Box style={webStyle.modalCardActionsContainer}>
                <Button
                  disableElevation
                  variant="contained"
                  style={webStyle.modalCardCancelButton}
                  onClick={() => this.handleCancel()}
                >
                  Cancel
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  style={this.ternaryAlternative(localStorage.getItem('user_type') == 'Admin', webStyle.modalCardAddActionButton, webStyle.modalCardActionButton)}
                  onClick={() => this.props.isEditProject ? this.handleEditProject() : this.handleAddProject() }
                >
                  {this.props.isEditProject ? 'Save' : 'Add'}
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Modal>
      </>
    )
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
  adminsecondrowbutton: {
    color: "orange",
    backgroundColor: "white"
  },
  formSelect: {
    padding: "30px 0px"
  },
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
  modalCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
  modaladminCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    fontSize: "16px",
    backgroundColor:"#F5F5F5",
  } as React.CSSProperties,
  modalFormControl: {
    fontFamily: "sans-serif",
    fontSize: "14px",
    color: "#abafbb",

  } as React.CSSProperties,
  modalTextField: {
    borderRadius: "4px",
    paddingBlock: "10px",
    paddingInline: "14.5px",
    fontSize: "16px",
    border: "1px solid rgba(0, 0, 0, .3)",
    fontFamily: "sans-serif"
  },
  modalTextFieldError: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInline: "14.5px",
    fontSize: "16px",
    backgroundColor: "white",
    border: "1px solid red",
  },
  modalFormHelper: {
    paddingBlock: "0",
    paddingInline: "0",
    fontFamily: "sans-serif",
    marginLeft: 0
  },
  formTypography: {
    paddingBlockEnd: 1,
    marginBottom: '5px',
    fontSize: "14px",
    fontWeight: 600,
    color: "#424242",

  },
  modalCardCancelButton: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    width: "100px",
    fontWeight: 600,
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
    fontWeight: 600
  } as React.CSSProperties,
  modalCardAddActionButton: {
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    color: "black",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
    fontWeight: 600
  } as React.CSSProperties,
  modalCardActionsContainer: { display: "flex", gap: "0.5rem" },
  modalCardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
  },
  formHeading: {
    fontSizw: "14px",
    color: "black",
    fontFamily: "sans-serif",
    paddingTop: "10px",
    paddingBottom: "10px"
  }
}
//Customizable Area End