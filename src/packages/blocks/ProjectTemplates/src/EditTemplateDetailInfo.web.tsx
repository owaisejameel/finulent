import React from "react";

// Customizable Area Start
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
} from "@material-ui/core";
import "./style.css";
// Customizable Area End

// Customizable Area Start
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
const filterIcon = require("../assets/iconquickfilter.png");
// Customizable Area End

import EditTemplateDetailInfoController, {
  Props,
} from "./EditTemplateDetailInfoController";

export default class EditTemplateDetailInfo extends EditTemplateDetailInfoController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleBack = () => {
    console.log("moving back");
    this.props.history.push("/edittemplate");
  };

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
              <div style={webStyle.pagename}>
                <Box style={webStyle.arrowbox}>
                  <ArrowLeftRoundedIcon
                    style={webStyle.arrow}
                    onClick={this.handleBack}
                  />
                </Box>
                <div>
                  <h4 style={webStyle.title}>{localStorage?.getItem('templateName') || 'Template Name'}</h4>
                </div>
              </div>
            </div>
            <Divider />

            <Box
              sx={{
                p: 2,
                border: "1px solid grey",
                bgcolor: "#EEEEEE",
              }}
            >
              <div style={webStyle.cardContent}>
              <div style={{flexDirection:"column"}}>
                <Typography className="table-field">
                  Fields
                </Typography>
                <Divider/>
                <Typography className="table-field">
                  Type
                </Typography>
                </div>
                <div className="template-table">

                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    className="template-tab"
                  >
                    <TableHead>
                      <TableRow className="template-table-header">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell key={data.id} className={localStorage.getItem('user_type') == 'Superadmin' ? "tablehead" : "admintablehead "}>
                              <Typography style={{ display: 'flex', alignItems: 'center' }}>
                                <span>{data?.field_name}</span>
                                {data?.quick_filter && (<span>
                                  <img style={{ marginLeft: 5 }} src={filterIcon} />
                                </span>
                                )}
                              </Typography>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            >
                              {data?.field_type}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                      <TableRow className="template-table-body">
                        {this.state.templatesFields?.map((data: any) => {
                          return (
                            <TableCell
                              key={data.id}
                              style={{
                                border: "1px solid #BDBDBD",
                                backgroundColor: "white",
                              }}
                            />
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
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
    marginTop: 15,
    color: "#42454e",
    // fontFamily: "Open Sans",
    fontSize: "20px",
    fontWeight: 100,
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

  cardContent: {
    margin: "20px 0px 20px 0px",
    display:"flex"
  },

  secondrowbutton: {
    color: "#0096ff",
  },

  tablescroll: {
    overflowX: "scroll",
  },
  gridMargin: { marginBlockEnd: "0" },
  gridLess: { paddingInline: 0 },
  gridMore: { paddingInline: "1rem" },
  uploadImage: {
    padding: "5rem",
    border: "2px dashed rgba(155, 155, 155, .2)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    // height: "5rem",
    paddingBlock: ".5rem",
    overflow: "scroll",
  },
  formTypography: {
    paddingBlockEnd: 1,
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#424242",
  },
  modalCardCancelButton: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    width: "100px",
    fontWeight: 500,
  } as React.CSSProperties,
  modalCardCancelButtonSuccess: {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "4px",
    textTransform: "none",
    fontWeight: 500,
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#42a5f5",
    color: "white",
    borderRadius: "4px",
    width: "100px",
    textTransform: "none",
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

  modalCardHeader: {
    // borderBottom: "1px solid #ccc",
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
  titleText: {
    fontSize: "medium",
    fontWeight: 600,
    textAlign: "center",
  } as React.CSSProperties,
  titleButtonStyle: {
    textTransform: "none",
    backgroundColor: "#42a5f5",
    color: "white",
  } as React.CSSProperties,
  alignRoot: {
    display: "grid",
    gridTemplateColumns: "15vw minmax(85vw, auto)",
  } as React.CSSProperties,
  secondaryGrid: {
    border: "none",
    gap: "1rem",
  },
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: "1rem",
  } as React.CSSProperties,
  mainGrid: {
    flexGrow: 1,
    backgroundColor: "rgba(200, 200, 200, .5)",
    zIndex: -1,
  },
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem", //
    height: 450,
  },
  cardActions: {
    display: "flex",
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    minHeight: "60px",
  },
  alert: {
    display: "flex",
    position: "fixed",
    top: 80,
    right: 1,
    zIndex: 4000,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  } as React.CSSProperties,
  gutter: {
    marginBlockEnd: "0.4rem",
  },

  loadingRoot: {
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  loadingGutter: {
    marginBlockEnd: 4,
  },
  skeletonStart: { paddingTop: "40%", marginBlockEnd: 6 },
  skeletonEnd: { paddingTop: "10%", marginBlockStart: 6 },
  circularRoot: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    color: "#6e6e6e",
  },
  badgeButton: {
    borderRadius: "6px",
    textTransform: "none",
    backgroundColor: "rgba(222, 227, 230, 1)",
  } as React.CSSProperties,
  badgeTypography: {
    paddingBlock: ".2rem",
    paddingInline: ".3rem",
  },

  badgeCardRoot: {
    height: "200px",
    width: "100%",
  },

  workspaceAvatar: { width: 32, height: 32 },
  workspaceCardRoot: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "1rem",
    height: 450,
  } as React.CSSProperties,
  workspaceIconButton: { padding: "1rem" },
  workspaceStyledCard: { height: "175px" },
  workspaceId: {
    fontSize: "small",
  },
  workspaceName: { fontWeight: 600, fontSize: "medium" },
  descriptionContainer: {
    height: "100px",
    overflow: "scroll",
  },

  formRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(155, 155, 155, .5)",
    gap: "0.1rem",
    borderRadius: "4px",
    paddingInline: "8px",
    paddingBlock: "0.2rem",
    color: "rgba(155, 155, 155, 1)",
  },
  formActivePick: { backgroundColor: "#42a5f5", color: "#fff" },
  formAvatar: { width: 32, height: 32, backgroundColor: "#5f5f5f" },
  formTextContainer: { cursor: "pointer" },
  formToolTypography: {
    display: "flex",
    flexWrap: "nowrap",
    fontSize: "small",
  } as React.CSSProperties,

  hide: {
    display: "none",
  },
  secondaryModalRoot: {
    display: "flex",
    gap: 1,
    fontSize: "16px",
    justifyContent: "center",
    borderBlockStart: "1px solid #ccc",
    backdropFilter: "blur(5px)",
    overflow: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modalCardRootSuccess: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: "37%",
    maxHeight: 300,
    fontSize: "16px",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "0",
  } as React.CSSProperties,
  secondaryModalCardContent: {
    padding: 0,
  },

  secondaryModalContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: "16px",
    alignItems: "center",
  } as React.CSSProperties,

  modalImageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "200px",
    height: "100px",
    aspectRatio: "1/1",
    marginBlockEnd: "25px",
  },
  modalSucessTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontSize: "16px",
  } as React.CSSProperties,
  descriptionText: {
    fontSize: "16px",
  },
  modalFormControl: {
    // border: "none",
    // textDecorationColor: "purple",
    // textDecoration: "none",
  } as React.CSSProperties,
  modalTextField: {
    borderRadius: "4px",
    paddingBlock: "18px",
    paddingInline: "14.5px",
    fontSize: "16px",
    border: "1px solid rgba(0, 0, 0, .3)",
  },
  modalTextArea: {
    paddingBlock: "18px",
    paddingInline: "14.5px",
    boxSizing: "border-box",
    border: "1px solid rgba(0, 0, 0, .3)",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "none",
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  modalTextAreaError: {
    paddingBlock: "18px",
    paddingInline: "14.5px",
    boxSizing: "border-box",
    borderRadius: "4px",
    fontSize: "16px",
    resize: "none",
    fontFamily: "sans-serif",
    backgroundColor: "#fdf5f5",
    border: "1px solid red",
  } as React.CSSProperties,

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
  modalFormHelperImage: {
    alignSelf: "center",
    paddingBlock: "0",
    paddingInline: "0",
  },
  excessIcon: {
    color: "white",
  },
};
// Customizable Area End
