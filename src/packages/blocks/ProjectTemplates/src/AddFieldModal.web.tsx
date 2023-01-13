// Customizable Area Start
import React from "react";

import {
    Box,
    Button,
    InputLabel,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Modal,
    FormControl,
    FormHelperText,
    IconButton,
    Divider,
} from "@material-ui/core";
import "./style.css";
import Select from 'react-select'
import { Close } from "@material-ui/icons";
const iconcancel = require('../assets/iconcancel.png')
const radioOff = require('../assets/radioOff.png')
const radioOn = require('../assets/radioOn.png')

import ControlPointIcon from '@material-ui/icons/ControlPoint';


import AddFieldController, {Props} from "./AddFieldController";

export default class AddFieldModal extends AddFieldController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log(this.state)
    return (
    <>
    <Button style={this.ternaryAlternative(localStorage.getItem('user_type') == "Admin", webStyle.secondrowadminbutton, webStyle.secondrowbutton)} disableRipple={true}>
        <span className="button-content"

        onClick={()=>
        {

          this.setState({openAddField: true});
        }}> {localStorage.getItem('user_type') == "Admin"?<ControlPointIcon/>:""} Add field</span>
    </Button>
        <Modal
        open={this.state.openAddField}
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
                onClick={() => this.handleButtonCancel()}
                aria-label="close"
                >
                <Close />
                </IconButton>
            }
            title={
                <Typography style={webStyle.modalCardHeaderText}>
                Add field
                </Typography>
            }
            />
            <Divider/>
            <CardContent style={localStorage.getItem('user_type')=='Superadmin'?webStyle.modalCardContent:webStyle.modaladminCardContent}>

            <Box component="form">
                <Typography
                variant="subtitle2"
                style={webStyle.formTypography}
                >
                Field Name
                </Typography>
                <FormControl
                fullWidth
                error={Boolean(this.state.titleError)}
                style={webStyle.modalFormControl}
                >
                <InputLabel htmlFor="my-input" />
                <input
                    style={webStyle.modalTextField}
                    type="textarea"
                    className="name-input"
                    placeholder="Type field name here"
                    value={this.state.fieldName}
                    onChange={(e:any)=>{this.setState({fieldName: e.target.value, titleError: ''})}}
                />
                {this.andAlternative(Boolean(this.state.titleError), <FormHelperText
                    id="my-helper-text"
                    style={webStyle.modalFormHelper}
                    >
                    {this.state.titleError}
                    </FormHelperText>)}
                </FormControl>
                </Box>
                <Box component='form'>
                <Typography
                variant="subtitle2"
                style={webStyle.formTypography}
                >
                Field Type
                </Typography>
                <FormControl
                fullWidth
                error={Boolean(this.state.typeError)}
                style={webStyle.modalFormControl}
                >
                <Select  className="optionsdisplay" classNamePrefix="field-type-dropdwn" components={{IndicatorSeparator: () => null}} placeholder="Select" options={[{value:'Text', label:'Text'},{value:'Calendar', label:'Calendar'}, {value:'Dropdown', label:'Dropdown'},{value:'Number', label:'Numeric'}]} value={this.state.fieldType} onChange={(e:any)=>{this.setState({fieldType: e,typeError: ''})}} />
                  {this.andAlternative(this.state.typeError, (
                    <FormHelperText
                      id="my-helper-text"
                      style={webStyle.modalFormHelper}
                    >
                      {this.state.typeError}
                    </FormHelperText>
                  ))}
                </FormControl>
            </Box>
            {this.andAlternative(this.state.fieldType?.label === 'Dropdown',(
                <>
                <Box component="form">
                <Typography
                    variant="subtitle2"
                    style={webStyle.formTypography}
                >
                    Values
                </Typography>
                <FormControl
                    fullWidth
                    error={Boolean(this.state.valueError)}
                    style={webStyle.modalFormControl}
                >
                    <InputLabel htmlFor="my-input" />
                    <input
                    style={webStyle.modalTextField}
                    type="textarea"
                    className="values-input"
                    placeholder="Type and press enter to add"
                    value={this.state.singleVal}
                    onKeyPress={(e)=>e.key === 'Enter' && this.handleAddDrpdwnValues(e)}
                    onChange={(e:any)=>{this.setState({singleVal: e.target.value,valueError: ''})}}
                    />
                    {this.andAlternative(this.state.valueError,(
                    <FormHelperText
                        id="my-helper-text"
                        style={webStyle.modalFormHelper}
                    >
                        {this.state.valueError}
                    </FormHelperText>
                    ))}
                </FormControl>
                </Box>
                <Box className="all-values-con">
                    {this.state.dropdownValues?.map((val:any,id:any)=>{
                        return (
                            <div className="value-con" key={id}>
                                <p className="value-text">{val}</p>
                                <img src={iconcancel} alt="cancel" style={{cursor:'pointer'}} onClick={(e)=>{this.handleDeleteValues(e)}}/>
                            </div>
                        )
                    })}
                </Box>
                </>
            ))}
            <Box className="radios-div">
                <Typography className="form-radio-text">Is this a mandatory field?</Typography>
                <div className="radio-buttons-con">
                    <div className="radio-false-con">
                        <img src={this.ternaryAlternative(this.state.mandatoryField === 'no', radioOn, radioOff)} alt="" onClick={(e)=>{this.handleMandatoryRadioClick(e)}} style={{cursor:'pointer', width:"20px", height: "20px"}}/>
                        <p className="radio-text">No</p>
                    </div>
                    <div className="radio-false-con">
                        <img src={this.ternaryAlternative(this.state.mandatoryField === 'yes', radioOn, radioOff)} alt="" onClick={(e)=>{this.handleMandatoryRadioClick(e)}} style={{cursor:'pointer', width:"20px", height: "20px"}}/>
                        <p className="radio-text">Yes</p>
                    </div>
                </div>
            </Box>
            <Box className="radios-div">
                <div>
                <Typography className="form-radio-text">Quick Filter required?</Typography>
                {this.andAlternative(this.state.fieldType?.label === 'Text', (<Typography className="form-radio-dis-text">*Can’t apply quick filter for ‘text’ field</Typography>))}
                </div>
                <div className="radio-buttons-con">
                  <div className="radio-false-con">
                    <img src={this.ternaryAlternative(this.state.filterReq === 'no', radioOn, radioOff)} alt=""
                      onClick={(e) => this.handleFilterRadioClick(e)}
                      className={'radio-img ' + (this.ternaryAlternative(this.state.fieldType?.label === 'Text', 'radio-img-dis', ''))} />
                    <p className={'radio-text ' + (this.ternaryAlternative(this.state.fieldType?.label === 'Text', 'radio-text-dis', ''))}>No</p>
                  </div>
                  <div className="radio-false-con">
                    <img src={(this.ternaryAlternative(this.state.filterReq === 'yes', radioOn, radioOff))} alt=""
                      onClick={(e) => this.handleFilterRadioClick(e)}
                      className={'radio-img ' + (this.ternaryAlternative(this.state.fieldType?.label === 'Text', 'radio-img-dis', ''))} />
                    <p className={'radio-text ' + (this.ternaryAlternative(this.state.fieldType?.label === 'Text', 'radio-text-dis', ''))}>Yes</p>
                  </div>
                </div>
            </Box>
            </CardContent>
            <Divider/>
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
                style={this.ternaryAlternative(localStorage.getItem('user_type')=='Admin',webStyle.modalCardAddActionButton,webStyle.modalCardActionButton)}
                onClick={() => this.handleAddButtonAction()}
                >
                Add
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
    secondrowadminbutton:{
      color: "orange"
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
    fontWeight:600
  } as React.CSSProperties,
  modalCardAddActionButton: {
    backgroundImage:"radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    color: "black",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
    fontWeight:600
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
  modaladminCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    fontSize: "16px",
    backgroundColor:"#F5F5F5",
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
    backgroundColor: "white",
    border: "1px solid red",
  },
  modalFormHelper: {
    paddingBlock: "0",
    paddingInline: "0",
  },
};
// Customizable Area End
