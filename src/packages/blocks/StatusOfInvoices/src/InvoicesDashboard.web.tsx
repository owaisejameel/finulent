//@ts-nocheck
import React, { Component } from "react";
import {
  Grid,
  Box,
  Typography,
  Select,
  Menu,
  MenuItem,
  InputLabel,
  Link,
  Button,
  withStyles,
  // Customizable Area Start
  createMuiTheme,
  CircularProgress,
  ListItemIcon,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText
  // Customizable Area End
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import SearchBar from "material-ui-search-bar";

// Customizable Area Start
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

import { filter } from "./assets";
import "./ProjectCard.css";
import InvoicesDashboardController, {
  Props,
} from "./InvoicesDashboardController";
import ProjectCarousel from "./ProjectCarousel.web";
import moment from "moment";

// Customizable Area End

const useStyles = (theme) => ({
  menuStyle: {
    "& .MuiPaper-root": {
      maxWidth: "500px",
    },
  },
});

const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
    MuiPickersToolbar: {
      toolbar: {
        color: "black",
        backgroundColor: "#e8e8e8",
      },
    },
    MuiPickersDay: {
      day: {
        color: "black",
      },
      daySelected: {
        backgroundColor: "#e8e8e8",
      },
      dayDisabled: {
        color: "#e8e8e8",
      },
      current: {
        color: "#e8e8e8",
      },
      isSelected: {
        color: "white",
        backgroundColor: "#e8e8e8",
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        color: "black",
      },
      toolbarBtnSelected: {
        color: "black",
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

    palette: {
      primary: "red",
    },
    MuiButton: {
      textPrimary: {
        color: "rgb(171 114 24)",
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
        color: "black",
      },
      dayLabel: {
        color: "black",
      },
    },
  },
});

class InvoicesDashboard extends InvoicesDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  handleFilterClick = (e: any) =>
    this.setState({ filterOpen: e.currentTarget });
  handleFilterClose = () => {
    this.setState({workspace_id: "", selectedClientsName: [], modalFromDate:"", modalToDate: "", filterOpen: null, filterToDateError: false });
  };
  handleApply = () => {
    let isError = false;
    if(this.state.modalToDate || this.state.modalFromDate){
      if(!moment(this.state.modalToDate).isAfter(this.state.modalFromDate)){
        this.setState({filterToDateError : true})
        isError = true;
      }
    }
    if(isError){
      return ;
    }

    this.getApply()
    this.setState({filterOpen:null ,initialTableLoad:true, filterToDateError: false})
  }

  // Customizable Area End

  render() {
    const { loader, projects,selectedClientsName,clientsData } = this.state;
    const { classes } = this.props;
    const MultipleSelectCheckmarks = () => {
      return (
        <Box>
          
          <FormControl
            size={"small"}
            style={{
              width: "100%",
              // marginLeft: "2vw",
              backgroundColor: "white",
            }}
          >
         
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedClientsName}
              onChange={(e) =>
                this.handleChangeWorkspaceandClientSearch(e, "dropDown")
              }
              input={<OutlinedInput />}
              renderValue={(selected: any) => {
                return selected.map((el: any) => el.attributes.client_name).join(",");
              }}
              // MenuProps={MenuProps}
            >
              <MenuItem value="all">
                <ListItemIcon>
                  <Checkbox
                    checked={
                      clientsData.length > 0 &&
                      selectedClientsName.length === clientsData.length
                    }
                    indeterminate={
                      selectedClientsName.length > 0 &&
                      selectedClientsName.length < clientsData.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Select All" />
              </MenuItem>

              {clientsData.length != 0 &&
                clientsData.map((workspace: any, i: number) => (
                  <MenuItem key={i} value={workspace}>
                    <Checkbox
                      checked={selectedClientsName.indexOf(workspace) > -1}
                    />
                    <ListItemText primary={workspace.attributes.client_name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      );
    };

    return (
      <>
        <Menu
          id="account-menu"
          anchorEl={this.state.filterOpen}
          open={Boolean(this.state.filterOpen)}
          onClose={this.handleFilterClose}
          getContentAnchorEl={null}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          className={classes.menuStyle}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <InputLabel className="inputfilter"> Filter</InputLabel>
            <Box onClick={this.handleReset} style={{ textDecoration: "underline", cursor :"pointer", paddingRight : "16px" }}>Clear Filter</Box>

          </div>

          <MenuItem>
            <Grid item sm={12}>
              <InputLabel className="inputLabel">Workspace</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Select"
                name="role"
                displayEmpty
                variant="outlined"
                required
                value={this.state.workspace_id}
                style={{ height: "40px", textAlign: "left" }}
                onChange={(e)=>this.setState({workspace_id:e.target.value})}
              >
                {this.state.workspaceData &&
                  this.state.workspaceData.map((item: any, index: any) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.attributes.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </MenuItem>
          <MenuItem>
            <Grid item sm={12}>
              <InputLabel className="inputLabel">Client</InputLabel>
              <MultipleSelectCheckmarks />

            </Grid>
          </MenuItem>

          <MenuItem>
            <Grid  xs={12} container>
              <Grid item xs={6} container style={{ paddingRight: "10px" }}>
                <Grid item xs={12}>
                  <InputLabel className="inputLabel">From Date</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <ThemeProvider theme={materialTheme}>
                    <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            // style={webStyle.text}
                            placeholder="DD/MM/YYYY"
                            format={"DD/MM/YYYY"}
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
                            value={this.state.modalFromDate}
                            // onChange={(date)=>this.setState({modalFromDate:date, filterToDateError : false})}
                            onChange={(date)=>{
                              this.setState({modalFromDate:date},handleError)
                              function handleError(){
                                if(this.state.modalFromDate && this.state.modalToDate){
                                  if(!moment(this.state.modalToDate).isAfter(this.state.modalFromDate)){
                                    this.setState({filterToDateError:true})
                                  }else{
                                    this.setState({filterToDateError : false})
                                  }
                                }
                              }
                            }}
                            disableOpenOnEnter
                            animateYearScrolling={false}
                            autoOk={true}
                            clearable
                            onInputChange={(e: any) =>
                              console.log("Keyboard:", e.target.value)
                            }
                          />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid item xs={6} container style={{ paddingLeft: "10px" }}>
                <Grid item xs={12}>
                  <InputLabel className="inputLabel">To Date</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <ThemeProvider theme={materialTheme}>
                    <DatePicker
                            keyboard
                            variant="outlined"
                            size="small"
                            fullWidth
                            // style={webStyle.text}
                            placeholder="DD/MM/YYYY"
                            format={"DD/MM/YYYY"}
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
                            value={this.state.modalToDate}
                            // onChange={(date)=>this.setState({modalToDate:date, filterToDateError : false})}
                            onChange={(date)=>{
                              this.setState({modalToDate:date},handleError)
                              function handleError(){
                                if(this.state.modalFromDate && this.state.modalToDate){
                                  if(!moment(this.state.modalToDate).isAfter(this.state.modalFromDate)){
                                    this.setState({filterToDateError:true})
                                  }else{
                                    this.setState({filterToDateError:false})
                                  }
                                }
                                
                                
                              }
                              
                            }}
                            disableOpenOnEnter
                            animateYearScrolling={false}
                            autoOk={true}
                            clearable
                            onInputChange={(e: any) =>
                              console.log("Keyboard:", e.target.value)
                            }
                          />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
          </MenuItem>
            <Grid style={{paddingLeft : "20px"}}>
            {this.state.filterToDateError && <Typography style={webStyle.errorText}>From Date can not be greater than To Date</Typography>}
            {/* {this.state.filterFromDateError && <Typography style={webStyle.errorText}>From date can not be greater than to date</Typography>} */}
           </Grid>
          <div
            style={{
              padding: "10px 16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              style={{ backgroundColor: "grey" }}
              onClick={this.handleFilterClose}
              className="btn-cancelmenu"
            >
              Cancel
            </Button>
            <Button
              className="btn-addmenu"
               onClick={this.handleApply}
            >
              Apply
            </Button>
          </div>
        </Menu>

        {/* Customizable Area Start */}

        <Box
          bgcolor={loader ? "white" : "#F7F8FA"}
          marginLeft={"15vw"}
          width={"85vw"}
          fontFamily={"sans-serif"}
        >
          {loader ? (
            <Box marginTop={"25vh"} display={"flex"} justifyContent={"center"}>
              <CircularProgress size={50} />
            </Box>
          ) : (
            <Centered>
              <Box margin={"20"} width={"95%"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Invoice Dashboard
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        id="account-menu"
                        src={filter}
                        style={{ width: 30, height: 30, marginRight: "15px", cursor:"pointer" }}
                        onClick={this.handleFilterClick}
                      />
                    </div>

                    <SearchBar
                      placeholder="Search Invoice"
                      // value={this.state.searchIvoice}
                      //   onChange={this.requestSearch}
                      //   onCancelSearch={this.cancelSearch}
                    />
                  </div>
                </Box>
                {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Box marginRight={"3vh"}>Select Date Range</Box>
                <Box>
                  <DateRangePicker
                    value={""}
                    className={"calender"}
                    calendarIcon={
                      <CiCalendar color={"#848E98"} fontSize={"1.5rem"} />
                    }
                    
                  />
                </Box>
              </Box>
              <Box />
              <Box display={"flex"} alignItems={"center"}>
                <Box marginRight={"20"}>Client</Box>
                <Box bgcolor={"white"} height={"50%"} sx={{ minWidth: "15vw" }}>
                  <FormControl size={"small"} variant={"outlined"} fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedClient}
                      onChange={this.handleClientChange}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      {clientDropDown.map((el:any,i:number)=>{
                        return <MenuItem key={i} value={JSON.stringify({
                          "client_type":el.client_type,
                          "client_id":el.id
                        })}>{el.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box> */}

                {Object.keys(projects).map((el, i) => {
                  console.log("PPPP",projects[el])
                  if(projects[el].length>0){
                    console.log("YYY")
                    return <ProjectCarousel
                    key={i}
                    data={projects}
                    projectStatus={el}
                  />
                  }
                  else{
                      return null
                  }
                 
                })}
              </Box>
            </Centered>
          )}
        </Box>
      </>
      // Customizable Area End
    );
  }
}

export default withStyles(useStyles)(InvoicesDashboard);
// Customizable Area Start
class Centered extends Component {
  render(): React.ReactNode {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          {this.props.children}
        </Box>
      </>
    );
  }
}

const webStyle ={
  errorText: {color:"#f44336", fontSize:15, marginTop:5},  
}

// Customizable Area End
