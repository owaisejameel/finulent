import React, { Component } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  // Customizable Area Start
  CircularProgress
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { CiCalendar } from "react-icons/ci";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./ProjectCard.css";


// Customizable Area End
import TaskboardController,{Props} from "./TaskboardController";
import ProjectCarousel from "./ProjectCarousel.web";
import { CalendarIcon } from "./assets";

export default class Taskboard extends TaskboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    const {loader,clientDropDown,selectedClient,projects,dateRange} = this.state
    return (
      // Customizable Area Start


      <Box
        bgcolor={loader ? "white" : "#F7F8FA"}
        marginLeft={"15vw"}
        width={"85vw"}
        fontFamily={"sans-serif"}
      >

        {loader ? <Box marginTop={"25vh"} display={"flex"} justifyContent={"center"}><CircularProgress size={50}/></Box> : <Centered>
          <Box margin={"20"} width={"95%"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Box marginRight={"3vh"}>Select Date Range</Box>
                <Box>
                  <DateRangePicker
                    value={dateRange}
                    className={"calender"}
                    onChange = {(a)=>{this.handleDatePicker(a)}}
                    calendarIcon={
                      <img src={CalendarIcon} style={{height: '19', paddingBottom: '1'}} />
                    }
                    format={"dd/MM/y"}
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
            </Box>
                
             {Object.keys(projects).length != 0 && Object.keys(projects).map((el,i)=>{
                return <>
                    <ProjectCarousel 
                    key={i}
                    data={this.state}
                    projectStatus={el}
                />
                </>
             })}         
           
          </Box>
        </Centered>}

     
      </Box>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
class Centered extends Component{
  render(): React.ReactNode {
      return <>
          <Box display={"flex"} justifyContent={"center"}>
          {this.props.children}
        </Box>
      </>
  }
}



// Customizable Area End
