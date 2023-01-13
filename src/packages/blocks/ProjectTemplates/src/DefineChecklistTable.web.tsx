import React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  Breadcrumbs,
  Link,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
  Input,
  Modal,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import "./style.css";
// Customizable Area End

// Customizable Area Start
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
const redIcon = require("../assets/redicon.png");
const rightIcon = require("../assets/righticon.png");

// Customizable Area End
import DefineChecklistTableController, {
  Props,
} from "./DefineChecklistTableController";
import AddChecklistModal from "./AddCheckListModal.web";
import TemplateBreadcrumbs from "./TemplateBreadcrumbs.web";


export default class DefineChecklistTable extends DefineChecklistTableController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  //Customizable Area Start
  handleBack = () => {
    console.log("moving back");
      if(this.query.get('sfid'))
      {
      this.props.history.push(`/definechecklist?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`);
      }else{
        this.props.history.push(`/definechecklist?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`);
      }
    };

  handleSave = () => {
    console.log("Save and go home button clicked");
    this.props.history.push("/userprofile");
  };

  handleNext = () => {
    console.log("Next button clicked");
    this.setState({successSaveModal: true})
  };

  handleClick = () => {
    console.log("clicking the breadcrumbs");
  };
  handleFileSelect = (event: any) => {
    this.uploadCSV(event.target.files[0]);
  };



  renderChecklistButtons = () => (<div style={webStyle.checklistbuttons}>
    <Button
      style={webStyle.fileButton}
      onClick={this.downloadSampleCSV}
      disableRipple={true}
    >
      <span className={localStorage.getItem('user_type') == 'Superadmin' ? "button-checklist" : "admin-button-checklist "} >
      Download  Complete data
      </span>
    </Button>
    <Input
      type="file"
      style={{ display: "none" }}
      id="icon-button-file"
      onChange={this.handleFileSelect}
    />
    <label htmlFor="icon-button-file">
      <Button
        component="span"
        style={webStyle.fileButton}
        disableRipple={true}
      >
        <span className={localStorage.getItem('user_type') == 'Superadmin' ? "button-checklist" : "admin-button-checklist "}>Upload .CSV file</span>
      </Button>
    </label>
    <AddChecklistModal
      navigation={""}
      id={""}
      that={this}
      history={""}
    />
  </div>)

  renderCheckListTable = () => {
    if (this.state.loading) return (<Box style={webStyle.loader}><CircularProgress size={50} /></Box>)
    else if (this.state?.errParameter?.length) return (<Box
      sx={{
        p: 3,
        bgcolor: "#EEEEEE",
      }}
    >
      <div className="template-table">
        <Table>
          <TableHead className={localStorage.getItem('user_type') == 'Superadmin' ? "checklist-tablehead" : "admin-checklist-tablehead"}>
            <TableRow>
              <TableCell style={{ width: "50px", textAlign: "center" }}>
                S No
              </TableCell>
              <TableCell>Error Parameter</TableCell>
              <TableCell
                style={{ width: "150px", textAlign: "center" }}
              >
                Designer
              </TableCell>
              <TableCell
                style={{ width: "150px", textAlign: "center" }}
              >
                QC
              </TableCell>
              <TableCell
                style={{ width: "70px", textAlign: "center" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state?.errParameter?.map((data: any) => {
              return (
                <TableRow>
                  <TableCell
                    style={{
                      border: "1px solid #BDBDBD",
                      backgroundColor: "white",
                    }}
                  >
                    {data?.attributes?.s_no}
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid #BDBDBD",
                      backgroundColor: "white",
                    }}
                  >
                    {data?.attributes?.error_parameter}
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid #BDBDBD",
                      backgroundColor: "white",
                    }}
                  >
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell
                    style={{
                      border: "1px solid #BDBDBD",
                      backgroundColor: "white",
                    }}
                  >
                    <div>
                      <FormControl disabled style={{ width: "150px" }}>
                        <InputLabel id="demo-simple-select-disabled-label">
                          Select
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-disabled-label"
                          id="demo-simple-select-disabled"
                          label="Age"
                          disableUnderline
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </TableCell>
                  <TableCell style={{
                      // border: "1px solid #BDBDBD",
                      backgroundColor: "white",
                    }}>
                  <div style={{ height: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography display="inline">
                                    <EditOutlinedIcon onClick={() => this.setState({openAddChecklistParam: true, isEdit: true, checklistField: data?.attributes?.error_parameter, editId: data?.id})}/>
                                </Typography>
                                <Typography display="inline">
                                    <DeleteOutlineIcon onClick={() => this.deleteChecklistParameter(data?.id)}/>
                                </Typography>
                            </div>
                </TableCell>
                </TableRow>

              );
            })}
          </TableBody>
        </Table>
      </div>
    </Box>)
    else return (<Box style={{ minHeight: '55vh' }} sx={{ bgcolor: "#e8e8e8", p: 2 }}>
      <div style={webStyle.noData}>No Data Found</div>
    </Box>)
  }
  // Customizable Area End
  render() {
    //Customizable Area Start

    console.log(this.props);

    console.log(this.state.duplicateValue);
    //Customizable Area End
    return (
      //Customizable Area Start
      <>
        <Box style={webStyle.background}>
          <Box style={webStyle.content} className="background-content">
            <div className="heading" style={webStyle.pageheader}>
              <TemplateBreadcrumbs
                navigation={""}
                id={""}
                that={this}
                history={this.props.history} />
              <div>
                <Button style={webStyle.savebutton} onClick={this.handleSave}>
                  <span className="save-button-content">Save & go to home</span>
                </Button>
                <Button style={localStorage.getItem('user_type')=='Superadmin' ?webStyle.nextbutton:webStyle.adminnextbutton} onClick={this.handleNext}>
                  <span className={localStorage.getItem('user_type')=='Superadmin'? "next-button-content":"admin-next-button-content"}>Save</span>
                </Button>
              </div>
            </div>
            {this.renderChecklistButtons()}
            {this.renderCheckListTable()}

            <div className="template-footer">
              <Box
                className={localStorage.getItem('user_type')=='Superadmin'? "non-active-box":"admin-non-active-box"}
                onClick={()=>{
                  if(this.query.get('sfid'))
                  {
                  this.props.history.push(`/templateDetails?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`)
                  }
                  else
                  {
                    this.props.history.push(`/templateDetails?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)
                  }
                  }}
                  >
                <div
                  className= {localStorage.getItem('user_type')=="Superadmin"?"non-active-oval":"non-active-admin-oval"}

                >
                  <div
                    className="non-active-oval-content"

                  >
                    1
                  </div>
                </div>
                <Typography className="template-box-content">
                  Template Details
                </Typography>
              </Box>
              <Divider
                style={{
                  margin: "30px",
                  width: "1px",
                  height: "37px",
                  border: "1px dashed #b2b7ba",
                  transform: "rotate(-90.00008deg)",
                }}
              />
              <Box
                 className={localStorage.getItem('user_type')=='Superadmin'? "active-box":"admin-active-box"}

              >
                <div
                 className={localStorage.getItem('user_type')=='Superadmin'?"active-oval":"admin-active-oval"}
                >
                  <div
                    className="active-oval-content"
                  >
                    2
                  </div>
                </div>
                <Typography className="checklist-box-content">
                  Checklist
                </Typography>
              </Box>
            </div>
          </Box>
        </Box>
        <Modal
          open={this.state.displayParam}
          onClose={this.closeChecklistModal}
          aria-labelledby="modal-workspace-title"
          aria-describedby="modal-workspace-description"
          style={webStyle.modalRoot}
          BackdropProps={{
            style: webStyle.modalBackdropProps,
          }}
        >
          <div className="error-container">
            <img src={redIcon} alt="Icon" className="error-icon" />

            <Typography className="error-param-header">
              Can't perform action, duplicate record found
            </Typography>
            <Typography component="header" className="duplicate-header">
              Duplicate entries
            </Typography>
            <Divider
              style={{
                marginTop: "10px",
                width: "223px",
                height: "1px",
                border: "1px dashed #dbdbdb",
              }}
            />
            <div className="sequence-bodys-list">
              {this.state?.duplicateValue?.map((item: any) => {
                return (
                  <div className="duplicate-param">
                    <Typography className="duplicate-param-one">
                      Parameter
                    </Typography>
                    <Typography className="duplicate-param-two">

                      {item}
                    </Typography>
                  </div>
                );
              })}

            </div>
            <div>
              <Button
                disableElevation
                variant="contained"
                style={localStorage.getItem('user_type')=='Superadmin'?webStyle.modalButton:webStyle.modalButtonAdmin}
                onClick={() => {
                  this.setState({ displayParam: false });
                }}
              >
                <span style={webStyle.duplicatebtn}>Ok</span>
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.successSaveModal}
          onClose={this.closeSuccessSaveModal}
          aria-labelledby="modal-workspace-title"
          aria-describedby="modal-workspace-description"
          style={webStyle.modalRoot}
          BackdropProps={{
            style: webStyle.modalBackdropProps,
          }}
        >
       <div style={webStyle.successSaveModal}>
        <img style={webStyle.rightIcon} src={rightIcon} />
        <p style={webStyle.TemplateCreatedText}>Template Created Successfully</p>
        <div>
              <Button
                disableElevation
                variant="contained"
                style={localStorage.getItem('user_type')=='Superadmin'?webStyle.modalButton:webStyle.modalButtonAdmin}
                onClick={() => this.closeSuccessSaveModal()}
              >
                <span style={ localStorage.getItem('user_type')=='Superadmin'?webStyle.duplicatebtn:webStyle.duplicateadminbtn}>Ok</span>
              </Button>
            </div>
       </div>
        </Modal>
      </>
    );
    //Customizable Area End
  }
}
//Customizable Area Start
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
  modalButton: {
    marginTop: "20px",
    backgroundColor: "#4eabf8",
    color: "white",
    borderRadius: "4px",
    width: "263px",
    textTransform: "none",
    height: "50px",
    fontWeight: 600,
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  modalButtonAdmin: {
    marginTop: "20px",
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    color: "white",
    borderRadius: "4px",
    width: "263px",
    textTransform: "none",
    height: "50px",
    fontWeight: 600,
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  adminnextbutton: {
    width: "193px",
    height: "50px",
    borderradius: "4px",
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
  },

  duplicatebtn: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  duplicateadminbtn: {
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif",
  } as React.CSSProperties,
  background: {
    backgroundColor: "white",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  content: {
    top: "50px",
    right: "0px",
    width: "85vw",
    height: "fit-content",
    padding: "50px 20px 10px",
    justifyContent: "space-between",
    backgroundColor:"white"
  },
  pageheader: {
    display: "flex",
    justifyContent: "space-between",
  },
  pagename: {
    display: "flex",
  },
  arrowbox: {
    backgroundColor: "#eeeeee",
    width: 35,
    height: 35,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },

  arrow: {
    width: 20,
    height: 20,
  },

  title: {
    margin: 10,
    marginTop: 2,
    fontWeight: 500,
    fontSize: 18,
  },

  breadcrumb: {
    marginLeft: 10,
    marginTop: -10,
  },

  savebutton: {
    marginRight: 10,
    width: "193px",
    height: "50px",
    borderradius: "8px",
    background: "#e8e8e8",
  },

  nextbutton: {
    width: "193px",
    height: "50px",
    borderradius: "4px",
    background: "#4eabf8",
  },

  checklistbuttons: {
    display: "flex",
    height: "50px",
  },
  fileButton: {
    backgroundColor: "white",
    margin: "10px",
    fontSize: "12px",
    color: "#0096ff",
    borderRadius: "5%",
    textTransform: "capitalize",
  } as React.CSSProperties,
  underline: {
    borderBottom: "0px solid red !important",
    border: "0px solid white !important",
  },
  successSaveModal: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '436px',
    height: '300px',
    borderRadius: '4px',
    background: '#ffffff',
  } as React.CSSProperties,
  rightIcon: {
    marginTop: '10px',
    width: '30px',
    height: '30px'
    } as React.CSSProperties,
  TemplateCreatedText: {
    fontFamily: "sans-serif",
    fontSize: "26px",
    width: '282px',
    textAlign: 'center',
    marginBottom: '-10px'
  } as React.CSSProperties,
  loader: {
    minHeight: '55vh',
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
} as React.CSSProperties,
noData: {
  height: '55vh',
  display: 'grid',
  placeItems: 'center'
} as React.CSSProperties,
};
//Customizable Area End
