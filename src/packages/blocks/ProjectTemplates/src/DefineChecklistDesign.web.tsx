import React from "react";
// Customizable Area Start
import {
  Box,
  Button,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Modal,
  Input,
} from "@material-ui/core";
import "./style.css";
// Customizable Area End

// Customizable Area Start
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
const redIcon = require("../assets/redicon.png");
// Customizable Area End
import ChecklistController, { Props } from "./ChecklistController";
import TemplateBreadcrumbs from "./TemplateBreadcrumbs.web";

export default class DefineChecklistDesign extends ChecklistController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  handleBack = () => {
    if(this.query.get('sfid'))
    {
    this.props.history.push(`/templateDetails?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`);
    }
    else
    {
      this.props.history.push(`/templateDetails?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`);
    }
  };

  handleSave = () => {
    console.log("Save and go home button clicked");
    this.props.history.push("/userprofile");
  };

  handleNext = () => {
    console.log("Next button clicked");
    if(this.query.get('sfid'))
    {
    this.props.history.push(`/definechecktable?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`)
    }else{
      this.props.history.push(`/definechecktable?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)
    }
  };

  handleFileSelect = (event: any) => {
      this.uploadCSV(event.target.files[0]);
  };

  returnActiveBoxClass = () => {
    if (window.location.pathname === "/definechecklist") {
      if (localStorage.getItem('user_type') == "Superadmin") {
        return 'active-box'
      }
      else return 'active-box'
    } else return 'non-active-box'
  }

  returnOvalClassname = () => {
    if (window.location.pathname === "/definechecklist") {
      if (localStorage.getItem('user_type') == "Superadmin") {
        return 'active-oval'
      }
      else return 'admin-active-oval'
    } else return 'non-active-oval'
  }

  renderTemplateFooter = () => (<div className="template-footer">
    <Box
      className={localStorage.getItem('user_type') == "Superadmin" ? "non-active-box" : "admin-non-active-box "}
      onClick={() => {
        if (this.query.get('sfid')) {
          this.props.history.push(`/templateDetails?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`)
        }
        else {
          this.props.history.push(`/templateDetails?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)
        }
      }}
    >
      <div className={localStorage.getItem('user_type') == 'Superadmin' ? "non-active-oval" : 'admin-non-active-oval'}>
        <div className="non-active-oval-content">
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
      className={this.returnActiveBoxClass()}
      onClick={() => {
        this.props.history.push({
          pathname: "/definechecktable",
          state: {
            header: this.props.history.location.state.header,
            parent: this.props.history.location.state.parent,
            child: this.props.history.location.state.child,
          },
        });
      }}
    >
      <div className={this.returnOvalClassname()}>
        <div
          className={
            window.location.pathname === "/definechecklist"
              ? "active-oval-content"
              : "non-active-oval-content"
          }
        >
          2
        </div>
      </div>
      <Typography className="checklist-box-content">
        Checklist
      </Typography>
    </Box>
  </div>)

  renderSaveAndNextButtons = () => (
  <div>
    <Button style={webStyle.savebutton} onClick={this.handleSave}>
      <span className="save-button-content">Save & go to home</span>
    </Button>
    <Button style={localStorage.getItem('user_type') == 'Superadmin' ? webStyle.nextbutton : webStyle.adminnextbutton} onClick={this.handleNext}>
      <span className={localStorage.getItem('user_type') == 'Superadmin' ? "next-button-content" : "admin-next-button-content"} >Next</span>
    </Button>
  </div>)

  // Customizable Area End
  render() {
    // Customizable Area Start

    // Customizable Area End
    return (
      // Customizable Area Start
      <>
        <Box style={webStyle.background}>
          <Box style={webStyle.content} className="background-content">
            <div className="heading" style={webStyle.pageheader}>
            <TemplateBreadcrumbs
                navigation={""}
                id={""}
                that={this}
                history={this.props.history} />
              {this.renderSaveAndNextButtons()}
            </div>
            <Box
              sx={{
                p: 2,
                bgcolor: "#EEEEEE",
              }}
            >
              <div style={webStyle.cardContent}>
                <Button
                  className="csv-button"
                  style={localStorage.getItem('user_type')=='Superadmin'?webStyle.fileButton:webStyle.adminfileButton}
                  onClick={this.downloadSampleCSV}
                  disableRipple={true}
                >
                  <span className="button-content">
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
                    className="csv-button"
                    style={localStorage.getItem('user_type')=='Superadmin'?webStyle.fileButton:webStyle.adminfileButton}
                    // onClick={this.uploadCSV}
                    disableRipple={true}
                  >
                    Upload .CSV file
                  </Button>
                </label>
              </div>
            </Box>

            {this.renderTemplateFooter()}
          </Box>
        </Box>
        <Modal
          open={this.state.duplicateParam}
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
              {this.state.parameterModal?.map((item: any) => {
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
                style={webStyle.modalButton}
                onClick={() => {
                  this.setState({ duplicateParam: false,parameterModal:[] });
                }}
              >
                <span style={webStyle.duplicatebtn}>Ok</span>
              </Button>
            </div>
          </div>
        </Modal>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
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
  background: {
    backgroundColor: "white",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  modalBackdropProps: {
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: "blur(10px)",
  },
  adminnextbutton: {
    width: "193px",
    height: "50px",
    borderradius: "4px",
    backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    color: 'black'
  },
  adminfileButton: {
    backgroundColor: "white",
    margin: "10px",
    fontSize: "12px",
    color: "#f5a823",
    borderRadius: "5%",
    textTransform: "capitalize",
  } as React.CSSProperties,


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
    marginBottom: '15px'
  },
  pagename: {
    display: "flex",
    // flexDirection: row,
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
    // backgroundColor: "#eeeeee",
    width: 20,
    height: 20,
    // marginLeft: 30,
    // borderRadius: 8,
  },

  title: {
    margin: 10,
    marginTop: 2,
    color: "#42454e",
    // fontFamily: "Open Sans",
    fontSize: "20px",
    fontWeight: 300,
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
    color: 'white'
  },
  cardContent: {
    margin: 20,
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fileButton: {
    backgroundColor: "white",
    margin: "10px",
    fontSize: "12px",
    color: "#0096ff",
    borderRadius: "5%",
    textTransform: "capitalize",
  } as React.CSSProperties,
};
// Customizable Area End
