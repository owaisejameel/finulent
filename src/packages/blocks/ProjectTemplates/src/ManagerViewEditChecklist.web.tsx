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
} from "@material-ui/core";
import "./style.css";
// Customizable Area End

// Customizable Area Start
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
const redIcon = require("../assets/redicon.png");
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// Customizable Area End
import DefineChecklistTableController, {
  Props,
} from "./DefineChecklistTableController";
import AddChecklistModal from "./AddCheckListModal.web";

export default class ManagerViewEditChecklist extends DefineChecklistTableController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  //Customizable Area Start
  handleBack = () => {
    console.log("moving back");
    
  };

  handleSave = () => {
    console.log("Save and go home button clicked");
    this.props.history.push("/userprofile");
  };

  handleNext = () => {
    console.log("Next button clicked");
  };

  handleClick = () => {
    console.log("clicking the breadcrumbs");
  };
  handleFileSelect = (event: any) => {
    this.uploadCSV(event.target.files[0]);
  };
  // Customizable Area End
  render() {
    //Customizable Area Start
    

    console.log(this.state.errParameter);
    //Customizable Area End
    return (
      //Customizable Area Start
      <>
        <Box style={webStyle.background}>
          <Box style={webStyle.content} className="background-content">
            <div className="heading" style={webStyle.pageheader}>
              <div style={webStyle.pagename}>
                <Box style={webStyle.arrowbox}>
                  <ArrowLeftRoundedIcon
                    style={webStyle.arrow}
                    onClick={this.handleBack}
                  />
                </Box>
                  <div>
                  <h4 style={webStyle.title}>{localStorage?.getItem('templateName') || 'Template Name'}</h4>
                  <Breadcrumbs
                    separator=">"
                    aria-label="breadcrumb"
                    style={webStyle.breadcrumb}
                  >
                    <Link
                      color="inherit"
                      href="/templates"
                      // onClick={this.handleClick}
                    >
                      Solar
                    </Link>
                    <Link
                      color="inherit"
                      href="/workspaces"
                      // onClick={this.handleClick}
                    >
                      Tata Power
                    </Link>
                    <Link color="inherit">
                      Subfolder - India
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
              <div>
                <Button style={webStyle.savebutton} onClick={this.handleSave}>
                  <span className="admin-save-button-content">Save & go to home</span>
                </Button>
                <Button style={webStyle.nextbutton} onClick={this.handleNext}>
                  <span className="admin-next-button-content">Next</span>
                </Button>
              </div>
            </div>
            <div style={webStyle.checklistbuttons}>
    
              <Button
                style={webStyle.fileButton}
                onClick={this.downloadSampleCSV}
                disableRipple={true}
              >
                <span className="admin-button-checklist">
                  Download sample .CSV file
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
                  disabled={true}
                >
                  <span className="admin-button-checklist">Upload .CSV file</span>
                </Button>
              </label>
              <AddChecklistModal
                navigation={""}
                id={""}
                that={this}
                history={""}
              />
            </div>
            <Box
              sx={{
                p: 3,
                bgcolor: "#EEEEEE",
              }}
            >
              <div className="template-table">
                <Table>
                  <TableHead className="admin-checklist-tablehead">
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
                        style={{ width: "150px", textAlign: "center" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                        <TableRow>
                          <TableCell
                            style={{
                              border: "1px solid #BDBDBD",
                              backgroundColor: "white",
                            }}
                          >
                            First checked
                          </TableCell>
                          <TableCell
                            style={{
                              border: "1px solid #BDBDBD",
                              backgroundColor: "white",
                            }}
                          >
                          </TableCell>
                          <TableCell
                            style={{
                              border: "1px solid #BDBDBD",
                              backgroundColor: "white",
                              textAlign:'center'
                            }}
                          >
                            <Checkbox disabled />
                          </TableCell>
                          <TableCell
                            style={{
                              border: "1px solid #BDBDBD",
                              backgroundColor: "white",
                              textAlign:'center'
                            }}
                          >
                            <div>
                              <FormControl disabled style={{ width: "150px" }}>
                                <InputLabel id="demo-simple-select-disabled-label">
                                  Select
                                </InputLabel>
                                <Select
                                  // style={webStyle.underline}
                                  labelId="demo-simple-select-disabled-label"
                                  id="demo-simple-select-disabled"
                                  // value="Select"
                                  label="Age"
                                  // onChange={handleChange}
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
                          <TableCell
                            style={{
                              border: "1px solid #BDBDBD",
                              backgroundColor: "lightgrey",
                              textAlign:"center"
                            }}
                          >
                            <EditOutlinedIcon/>
                            <DeleteOutlinedIcon/>
                          </TableCell>
                        </TableRow>
                  </TableBody>
                  
                </Table>
              </div>
            </Box>
            
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
              {this.state.duplicateValue.map((item: any) => {
                return (
                  <div className="duplicate-param">
                    <Typography className="duplicate-param-one">
                      Parameter
                    </Typography>
                    <Typography className="duplicate-param-two">
                     
                      {item.parameter}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div>
              <Button
                disableElevation
                variant="contained"
                style={webStyle.modalButton}
                onClick={() => {
                  this.setState({ displayParam: false });
                }}
              >
                <span style={webStyle.duplicatebtn}>Ok</span>
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
    fontWeight: 800,
  } as React.CSSProperties,
  duplicatebtn: {
    color: "#ffffff",
    fontFamily: "Open Sans",
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "center",
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
    background: `linear-gradient(213deg, #915b16 0%, #f5a823 49.17%, #915b16 100%)`,
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
};
//Customizable Area End
