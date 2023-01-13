
import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputAdornment,
  // Customizable Area Start
  TextField,
  Avatar,
  CircularProgress,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { AiOutlineLeft } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import "./ProjectCard.css";
import moment from 'moment';
import { DeleteSvg, DownloadSvg, FileSvg, GreenCheckSvg, UploadSvg } from "./assets";
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MentionsInput, Mention } from "react-mentions";

const configJSONBase = require("../../../framework/src/config");
// Customizable Area End

import ProjectStatusController, { Props } from "./ProjectStatusController";

export default class ProjectStatus extends ProjectStatusController {

  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  defaultValueCheck = (result: any, item:any) =>{
    if(result == "NA" || result == -1)
      return ""
    else if(item.associated_class_name == "AccountBlock::Account")
      return this.binarySearchforDropDown(result, this.state.dropDownOptions)
    else
      return result
  }
  
  finulentTrackingCount = 0;
  timeTrackerCount = 0;
  clientFeedbackCount = 0;
  customFieldCount = 0;

  displayButton = (value: any, prefix: string = "", customStyle: any = {}, disabled: boolean = false) => {
      customStyle={
        fontSize: "0.7rem",
        fontWeight: "bold",
        textTransform: "none",
        padding: "5 10",
        cursor: 'pointer',
        marginRight: 10,
        height: 40,
        ...customStyle
      }
    if(typeof value == "string")
      value = [value]
    return value.map((el:string) => {
      return <Button
      style={customStyle}
      className={"sendBtn"}
      variant={"contained"}
      disabled={disabled}
      onClick={()=>{this.updateProjectDetails(el, {id :localStorage.getItem("tempValue")});}}
      >
        {`${prefix} ${el}`}
      </Button>
    })
  }


  CustomMention = React.forwardRef(function CustomMention(props: any) {
    const { onChange, value } = props;
  
    return (
      <MentionsInput value={value + " "} onChange={onChange} {...props}
      singleLine={false}
      onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
      customSuggestionsContainer={(children)=><div id ="customSuggestionsContainer">{children}</div>}
      allowSuggestionsAboveCursor={true}
      >
        <Mention
          trigger="@"
          data={[{ id: "1", display: "Akarsh" },{ id: "2", display: "Akarsh" },{ id: "3", display: "Akarsh" },{ id: "4", display: "Akarsh" },{ id: "5", display: "Akarsh" },{ id: "7", display: "Akarsh" },{ id: "8", display: "Akarsh" },{ id: "hell9o", display: "Akarsh" },{ id: "10", display: "Akarsh" },{ id: "11", display: "Akarsh" },{ id: "12", display: "Akarsh" },{ id: "13", display: "Akarsh" },{ id: "14", display: "Akarsh" },{ id: "15", display: "Akarsh" },{ id: "16", display: "Akarsh" }]}
          style={{ backgroundColor: "#edab29" }}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div className={`user ${focused ? 'focused' : ''}`} id="MentionSuggestions" >
              {highlightedDisplay}
            </div>
          )}
          
        />
      </MentionsInput>
    );
  });

  displayFooter = () => {
    let bottomButtom:any = ['File Completed']

    let currentValue = this.state.currentFinulentStatus

    if(currentValue == "Project in Queue")
      bottomButtom = ['Production Assigned']

    if(currentValue == "Production Assigned")
      bottomButtom = ['Production Initiated']

    if(currentValue == "Production Initiated")
      bottomButtom = ['Production Sent for QC', 'File Completed','Production Sent for QA']

    if(currentValue == "Production Sent for QC")
      bottomButtom = ['QC Initiated']

    if(currentValue == "QC Initiated")
      bottomButtom = ['File Sent for Corrections', 'File Completed','Production Sent for QA']

    if(currentValue == "Production Sent for QA")
      bottomButtom = ['QA Initiated']

    if(currentValue == "File Sent for Corrections")
      bottomButtom = ['Design Corrections Initiated']

    if(currentValue == "Design Corrections Initiated")
      bottomButtom = ['Revised File sent for QC']

    if(currentValue == "Revised File sent for QC")
      bottomButtom = ['File Sent for Corrections', 'File Completed','Production Sent for QA']

    this.state.fieldData.forEach((el: any)=>{
      if(el.field_name == "Finulent Status"){
        localStorage.setItem("tempValue", el.id)
       
      }
    })

    const isDisabled = (el: string) => {

       if(this.state.finulentStatusChoices.find((str:string) => str === el) == undefined){
        return true
       }else{
        return this.state.currentFinulentStatus == "File Completed" ?  true : false
       }
    }
    
    
    if(localStorage.getItem('user_type')== "Admin"){
      return <Box
      width={"50%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <Box fontSize={"0.7rem"} fontWeight={"bold"}>
        Move to
      </Box>
      <Box>
        <Box sx={{ minWidth: 120, bgcolor: "white" }}>
          <FormControl
            size={"small"}
            variant={"outlined"}
            fullWidth
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              defaultValue={()=>{
                return "Select"
              }}
              // label="Select"
              onChange={(e)=> this.changeFinulentStatusValue(e.target.value)}
            >
              <MenuItem key={"Select"} value={"Select"}>
                        {"Select"}
              </MenuItem>
              {this.state.fieldData.map((el: any)=>{
                if(el.field_name == "Finulent Status"){
                  localStorage.setItem("tempValue", el.id)
                 return el.field_values.map((e: string, index: number)=>{
                    return (
                      <MenuItem key={index} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })
                }
              })}
              
            </Select>
        </FormControl>
        </Box>
      </Box>
      <Box fontSize={"0.7rem"} fontWeight={"bold"}>
        Status
      </Box>
      <Box>
        <Button
          className={"sendBtn"}
          style={{
            fontSize: "0.7rem",
            fontWeight: "bold",
            textTransform: "none",
            padding: "5 10",
          }}
          variant={"contained"}
          onClick={()=>{this.updateProjectDetails(this.state.bottomStatusValue, {id :localStorage.getItem("tempValue")}); }}
          disabled={this.state.bottomStatusValue == "Select"}
          >
          Confirm
        </Button>
      </Box>
    </Box>
    }else if (localStorage.getItem('user_type') == "TL/Manager" || localStorage.getItem('user_type') == "Designer/QC/QA"){
      return <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-end"}
    >
      <Box
      style={{
        fontSize: "0.7rem",
        fontWeight: "bold",
        textTransform: "none",
        padding: "5 10",
        marginRight: 10
      }}>
        {bottomButtom.map((el:string)=>{
          return this.displayButton(el, "Move to", isDisabled(el) ? {cursor: 'default'} : {} , isDisabled(el))
        })}
      </Box>
    </Box>
    }
  }

  echoInputFields = (str : string) => {
    if(str == "custom_field"){
      this.customFieldCount++
    }
    this.customFieldCount = 0
    this.finulentTrackingCount = 0
    this.timeTrackerCount = 0
    this.clientFeedbackCount = 0

    return this.state.fieldData.map((item: any) => {
      if (item[str]) {
        this.customFieldCount++
        const result = this.findValueByFieldName(item.id, this.state.projectData);
        if (item.field_type == "Yes/No") {
          return <Box 
          className={"identifier"} ><LabelWithSelect
            label={item.field_name}
            value={[{ value: "Yes" }, { value: "No" }]}
            available={true}
            defaultValue={this.defaultValueCheck(result,item)}
            disabled={item.is_frozen || item.auto_filled}
            data={item}
            updateProjectDetails={this.updateProjectDetails}
            personID={this.findValueByFieldName(item.id, this.state.projectData)}
            currentFinulentStatus={this.state.currentFinulentStatus}
          />
          </Box >
        }

        if (item.field_type == "Dropdown") {
          return <Box   
          className={"identifier"} ><LabelWithSelect
            label={item.field_name}
            value={this.dropDownValueCheck(item)}
            available={true}
            defaultValue={this.dropDownDefaultValue(result, item)}
            disabled={item.is_frozen || item.auto_filled}
            data={item}
            updateProjectDetails={this.updateProjectDetails}
            personID={this.findValueByFieldName(item.id, this.state.projectData)}
            currentFinulentStatus={this.state.currentFinulentStatus}
          />
          </Box  >
        }

        return <Box    
        className={"identifier"} ><LabelWithInput
          label={
            item.field_name
          }
          isDisable={item.is_frozen || item.auto_filled}
          value={result == -1 ? "NA" : result}
          data={item}
          updateProjectDetails={this.updateProjectDetails}
          debouncerHandler={this.debouncerHandler}
        /></Box>
      }
    })
  }

  dropDownValueCheck = (item:any) => {
    
    if(item.field_values.length){
      return item.field_values.map((i: any) => {
        return { value: i, id: i }
      })
    }
    if(item.associated_class_name == "BxBlockDashboard::TypeOfProject"){
      return this.state.typeDropDownOptions
    }

    return this.state.dropDownOptions
  }
  ;
  
  dropDownDefaultValue = (result: any, item: any) => {
    if((result == "NA" || result == -1)){
      return ""
    }
    if(item.associated_class_name == "AccountBlock::Account")
      return this.binarySearchforDropDown(result, this.state.dropDownOptions)

    if (item.associated_class_name == "BxBlockDashboard::TypeOfProject"){
      return this.binarySearchforDropDown(result, this.state.typeDropDownOptions)
    }
    return result
  }

  Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

  // Customizable Area End
  
  render() {
    let topBottons = ['In Progress','Query','Query - File Completed']
    let output = ""
    let tags: string[] = []
    const handleTags = () => {
      
      if(this.props.history.location?.state?.data?.is_overdue){
        tags.push("Overdue")
      }
      if(this.props.history.location?.state?.data?.priority == "Yes"){
        tags.push("Priority")
      }
      
      let arr:any = []
      
      if(tags.length > 0){
        tags.forEach((el,index)=>{
          if(index != 0){
            arr.push(<Box component={"span"} marginX={'5px'} style={{borderLeft: '1px solid red', height: '50px', opacity: 0.8}}></Box>)
          }
         arr.push(el)
        })
      }

      tags = arr
      return <Box  display={"flex"} justifyContent= {"flex-end"}>
              <Box fontSize= {"0.8rem"} paddingX={"2px"} style={{borderRadius: '0 3px 0 3px'}} bgcolor={"#FFD3D2"} border= {"1px solid red"}>{tags.map((item, index)=>{
                if(index > 0){
                  output += " | " 
                }
                return item
              })}</Box>
            </Box>
    }

    const { projectStatus } = this.state;

    const createTextDate = (oldDate: string) => {
      const oldFromateDate = oldDate.split("/");
      const newFormatDate = new Date(
        [oldFromateDate[1], oldFromateDate[0], oldFromateDate[2]].join("/")
      ).toDateString();
      const newFormatSplittedDate = newFormatDate.split(" ");
      const [date, month, year] = [
        newFormatSplittedDate[2],
        newFormatSplittedDate[1],
        newFormatSplittedDate[3],
      ];
      const obj = {
        date,
        month,
        year,
      };
      return obj;
    };

    return (
      // Customizable Area Start
      <>
        {this.state.loader ? (
          <Box display={"flex"} justifyContent={"center"} width={"85vw"} marginLeft={"15vw"} fontFamily={"sans-serif"} marginTop={"25vh"}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <Box width={"85vw"} marginLeft={"15vw"} fontFamily={"sans-serif"}>
            {/* Nav Start */}
            <Box
              height={"8.5vh"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              paddingLeft={"5vw"}
              paddingRight={"7vw"}

            // bgcolor={"red"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width="60%"
              >
                <Box marginRight={"3.5%"}>
                  <Button
                    onClick={() => {
                      this.props.history.push("taskboard");
                    }}
                    variant="contained"
                  >
                    <AiOutlineLeft style={{ marginRight: "5" }} /> Back
                  </Button>
                </Box>

                <Box
                  width={"auto"}
                  display={"flex"}
                  height={"100%"}
                  flexDirection={"column"}
                >
                  <Box
                    fontSize={"2vh"}
                    display={"flex"}
                    alignItems={"center"}
                    height={"55%"}
                  >
                    {this.state.projectData.find((item: any) => item.field_name == "Project Name" || item.field_name == "Site Name")?.data || "NA"}
                  </Box>
                  <Box display={"flex"} alignItems={"center"} height={"40%"}>
                    <Box>
                      <Box component={"span"} className={"detailsText"}>
                        Project id
                      </Box>{" "}
                      <Box component={"span"} className={"detailsValue"}>
                        {this.state.projectDisplayId || "NA"}
                      </Box>
                    </Box>
                    <Box marginLeft={"2.5vw"} marginRight={"2.5vw"}>
                      <Box component={"span"} className={"detailsText"}>
                        Client
                      </Box>{" "}
                      <Box component={"span"} className={"detailsValue"}>
                        {this.state.client}
                      </Box>
                    </Box>
                    <Box>
                      <Box component={"span"} className={"detailsText"}>
                        Project Created
                      </Box>{" "}
                      <Box component={"span"} className={"detailsValue"}>
                        {createTextDate(this.state.projectDate).date +
                          " " +
                          createTextDate(this.state.projectDate).month +
                          " " +
                          createTextDate(this.state.projectDate).year}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'} flexDirection="column" alignItems={"center"} >
                <Box
                  padding={"5px"}
                  borderRadius={"30px 30px 30px 30px;"}
                  component={"span"}
                  color={"white"}
                  bgcolor={ this.props.history.location?.state?.projectStatusColors[this.state.currentFinulentStatus]}
                  marginBottom={"5"}
                  width={"102%"}
                  textAlign={"center"}
                >
                  {this.state.currentFinulentStatus}
                </Box>
                {this.state.projectPriority && handleTags()}
              </Box>
              {localStorage.getItem('user_type') != "Admin" && this.state.currentFinulentStatus != "Project in Queue" && <Box
                width={"30%"} 
                display={"flex"} 
                flexDirection="row"
                justifyContent={"end"}
              >
                <Box >
                {topBottons.map((el: string)=>{
                  return this.displayButton(el,"",{maxWidth:74, padding: 4},localStorage.getItem('user_type') == "Designer/QC/QA" || el == this.state.currentFinulentStatus )
                })}
                </Box>
              </Box>}
              </Box>
            {/* // Nav End  */}

            <Box bgcolor={"#F7F8FA"} paddingTop={"20"}>
              <Box margin={"auto"} width={"75%"}>
                <Box marginBottom={"20"} fontSize={"19px"}>
                  Details
                </Box>

                <Box
                  bgcolor={"white"}
                  borderTop={"2px solid #E89717"}
                  borderRadius={"5px"}
                  border={"1px solid #EAECED"}
                  padding={"3 3"}
                  height={"auto"}
                >
                  <Centered>
                    {/* Finulent Tracking*/}
                    <Box
                      padding={"20 0"}
                      borderRadius={"5px"}
                      width={"100%"}
                      border={"1px solid #EAECED"}
                      margin={"2 0"}
                      height={"auto"}
                    >
                      <SectionHead>Finulent Tracking</SectionHead>

                      {/* Finulent Tracking */}
                      <Box
                        className="wrapper" 
                      >
                        {this.echoInputFields("finulent_tracking")}
                      </Box   >
                      {/* Finulent Tracking End*/}
                    </Box>
                  </Centered>

                  <Centered>
                    {/* Time Tracking*/}
                    <Box
                      padding={"20 0"}
                      borderRadius={"5px"}
                      width={"100%"}
                      border={"1px solid #EAECED"}
                      margin={"2 0"}
                      height={"auto"}
                    >
                      <SectionHead>Time Tracking</SectionHead>
                      <Box
                        className="wrapper"
                      >
                        {this.echoInputFields("time_tracking")}
                      </Box>
                    </Box>
                    {/* Time Tracking End*/}
                  </Centered>

                  <Centered>
                    {/* Client Feedbacks */}
                    <Box
                      padding={"20 0"}
                      borderRadius={"5px"}
                      width={"100%"}
                      border={"1px solid #EAECED"}
                      margin={"2 0"}
                    >
                      <SectionHead>Client Feedback</SectionHead>
                      {/* Client Feedback */}
                      <Box
                        className="wrapper"
                      >
                        {this.echoInputFields("client_feedback")}
                      </Box>
                    </Box>
                    {/* Client Feedbacks End*/}
                  </Centered>

                  {this.state.showCustomBox && <Centered>
                    {/* Custom Fields */}

                    <Box
                      padding={"20 0"}
                      borderRadius={"5px"}
                      width={"100%"}
                      border={"1px solid #EAECED"}
                      margin={"2 0"}
                    >
                      <SectionHead>Custom Fields</SectionHead>

                      <Box
                        className="wrapper"
                      >
                        {this.echoInputFields("custom_field")}
                        {this.customFieldCount % 3 != 0 && Array(this.customFieldCount % 3 == 1 ? 2 : 1).fill("1").map((el)=>{
                          return <Box className="identifier"> </Box>
                          
                        })}
                      </Box>
                    </Box>
                  </Centered>}
                </Box>
                {/* Attachments */}

                <Attachments
                  isUploading={this.state.isUploading}
                  handleUpload={this.handleUpload}
                  Attachments={this.state.Attachments}
                  deleteAttachment={this.deleteAttachment}
                />

                {/* Toggler */}
                <Box
                  width={"26.5%"}
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  padding={"3"}
                  fontSize={"1.5vh"}
                  margin={"10"}
                  border={"1px solid #D4D4D4"}
                  borderRadius={"5"}
                >
                  <Box
                    padding={"4.5 6"}
                    width={"49%"}
                    bgcolor={this.state.toggler ? "#EDAB29" : ""}
                    borderRadius={"5px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    className={"togglers"}
                    onClick={() => {
                      this.setState({ toggler: true });
                    }}
                  >
                    Comments
                  </Box>
                  <Box
                    padding={"1 10"}
                    width={"49%"}
                    bgcolor={this.state.toggler ? "" : "#EDAB29"}
                    borderRadius={"5px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    className={"togglers"}
                    onClick={() => {
                      this.setState({ toggler: false });
                    }}
                  >
                    Show Activity
                  </Box>
                </Box>
                {/* Toggler End*/}

                {/* Comments */}
                {this.state.toggler ? <>
                <Box width={"100%"} id={"TaskBoardCommentParent"}>
                  <Box style={{
                    background: 'white',
                    minHeight: 'inherit',
                    borderRadius: '4px',
                    display: 'flex',
                    width: "100%",
                    justifyContent: 'space-between'
                  }} >
                    <Box style={{width: '87%'}}>
                      <this.CustomMention 
                      onChange={(e:any,newValue:any, newPlainTextValue:any, mentions:any) => {this.handleCommentTextChange(e.target.value); this.handleMention(newPlainTextValue, newValue, mentions);}}
                      value={this.state.comment} 
                      placeholder={"Add a Comment"}
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                      marginBottom={'10px'}
                      marginRight={"10px"}
                      style={{alignItems: 'end'}}
                    >
                      <Box style={{position: 'relative', cursor: 'pointer', marginBottom: "7px"}} >
                        {this.state.projectAttachmentToBeUploaded.name?
                        <img src={GreenCheckSvg} alt="" height={20} />
                        :
                        <ImAttachment />
                        }
                      <input type="file" className="upload-input-project" onChange={(event)=>{this.handleProjectAttachment(event)}} />
                        
                      </Box>
                      <Box>
                        <Button
                          style={{
                            fontSize: "1.5vhv",
                            fontWeight: "bolder",
                            textTransform: "none",
                            marginLeft: '15'
                          }}
                          variant={"contained"}
                          className="sendBtn"
                          onClick={() => { this.submitComment() }}
                        >
                          Send
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box width={"85%"}>
                  {this.state.displayComments.map((item: {
                    attributes: {
                      comments: string;
                    }
                  }) => {
                    return <Comment comment={item} editComment={this.editComment} deleteComment={this.deleteComment} CustomMention={this.CustomMention} />
                  })}
                </Box> </>
                : <ShowActivity activity={this.state.activityData} CustomMention={this.CustomMention}/>}
                {/* Comments End*/}

                {/* State Changer */}
                {<Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  bgcolor={"#F3F4F6"}
                  padding={"10 0"}
                  border={"2px solid #EAECED"}
                  borderRadius={"10px"}
                >
                  {this.displayFooter()}
                </Box>}
                {/* State Changer  End*/}
                <Box 
                bgcolor={'#f7f8fa'}
                height={50}
                >

              <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
class Centered extends Component {
  render(): React.ReactNode {
    const { children } = this.props;
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          {children}
        </Box>
      </>
    );
  }
}


class IndividualAttachment extends Component<{ isUploading: boolean, data: any, deleteAttachment: any }, {showDeleteIcon: boolean, removeLink: boolean}>{
  constructor(props: any) {
    super(props);
    this.state = {
      showDeleteIcon: false,
      removeLink: false,
    }
  }
  attachmentName = (data: any) => {
    const path = data?.attributes?.attachment?.url.split("/")
    
    if (path.length>1) {
      return path[path.length - 1]
    }
    return data?.attributes?.attachment?.name
  }

  canBeDisplayed = (url: string) => {
    const spliUrl = url.split("/")
    const extensionSplit = spliUrl[spliUrl.length - 1].split(".")
    const extension = extensionSplit[extensionSplit.length - 1]

    const allowedExtensions = ['png', 'jpeg', 'jpg']

    const result = allowedExtensions.find((str) => str === extension.toLocaleLowerCase());

    return result
  }

  render(): React.ReactNode {
    const { data, deleteAttachment } = this.props
    return (
      <Box style={{width: '100%', height:'60%'}}
      >
        <a className="linkOnClick" href={configJSONBase.baseURL + data?.attributes?.attachment?.url || "NA"} target="_blank" download style={{ width: '100%', top: -8 }}>
        
          <Box
            style={{ background: 'white', height: '100%', width: '100%', borderRadius: 4, position: 'relative' }}
            className={"attachmentOuterBox"}
            onMouseEnter={()=>{
              this.setState({
                showDeleteIcon: true
              })
            }}
            onMouseLeave={()=>{
              this.setState({
                showDeleteIcon: false
              })
            }}
          >
            { this.state.showDeleteIcon && <Box onMouseEnter={
              ()=>{
                this.setState({
                  removeLink: true
                })
              }
            } onMouseLeave={
              ()=>{
                this.setState({
                  removeLink: false
                })
              }
            } onClick={(e)=> { e.preventDefault(); e.stopPropagation(); deleteAttachment(data?.id)}} ><img src={DeleteSvg} className={"deleteAtt"}  /> </Box>}
            {/* {isUploading  "Uploading"} */}
            <Box style={{ width: '100%' }}>
              <Box style={{ height: '100%', width: '100%', borderRadius: 4, textAlign: 'center', position: 'relative' }}>

                {this.canBeDisplayed(data?.attributes?.attachment?.url)?
                <img src={ configJSONBase.baseURL + data?.attributes?.attachment?.url} style={{
                  height: '100%', width: '100%',
                  borderRadius: 4
                }}  alt="" />
                :
                <>
                  <img src={FileSvg} className="uploadFile" height={80} style={{maxHeight: '100%'}}/>
                  <p className="uploadText" style={{
                    position: "absolute",
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: 130,
                    color: 'grey'
                  }} ><b>{this.attachmentName(data)}</b></p>
                </>
                }
              </Box>
            </Box>
          </Box>
        </a>
        
        <Box>
          <p style={{display: 'flex', fontSize: '1rem', alignItems: 'center'}} >
          <Avatar
            style={{ height: "20px", width: "20px" }}
            src={ data?.attributes?.added_by?.attributes?.image || null}
          />
          <span style={{fontSize: 13, marginLeft: 5,}} ><b>{data?.attributes?.added_by?.attributes?.first_name + " " + data?.attributes?.added_by?.attributes?.last_name}</b></span>
         </p>
         <Box style={{fontSize: 10}} >Added on {moment(data?.attributes?.updated_at).format("D MMM YY on hh:mm a")}</Box>
        </Box>
      </Box>
    )

  }
}

interface AttachmentsProps {
  isUploading: boolean;
  handleUpload: (event: any) => void
  Attachments: any
  deleteAttachment: any
}

class Attachments extends Component<AttachmentsProps, { file: any }>{
  constructor(props: AttachmentsProps) {
    super(props);
    this.state = {
      file: [],
    }
  }

  UploadFile = () => {
    return (<>
      <Box style={this.props.Attachments.length % 4  == 0 ? {width: '100%', height: '100%',position: 'relative'}: {width: '100%', height:'60%',position: 'relative'}}>
        <Box style={{ border: '1px dashed rgba(95, 83, 89, 0.16)', height: '100%', width: '100%', borderRadius: 4, textAlign: 'center', background: 'white' }}>
          <img src={UploadSvg} className="uploadFile" />
          <p className="uploadText" style={{
                  position: 'relative',
                  float: 'left',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'grey'
                }} >ADD AN ATTACHMENT</p>
        </Box>
        <input type="file" className="upload-input" onChange={this.props.handleUpload} />
      </Box>
    </>)
  }

  render(): React.ReactNode {
    return (
      <Box>
        <p style={{fontSize: 20}} >Attachments</p>
        <Box
          className="attachmentWrapper"
        >
          {this.props.Attachments.map((e: any, index: number) => {
            return <IndividualAttachment
              isUploading={this.props.isUploading && index == this.props.Attachments.length - 1}
              data={e}
              deleteAttachment={this.props.deleteAttachment}
            />
          })}
          <this.UploadFile />
        </Box>
      </Box>
    )
  }
}

class Comment extends Component<{ comment: any, editComment: any, deleteComment: any,  CustomMention: any }, { edit: boolean, newComment: string, isHide: boolean }> {
  commentRef: React.RefObject<HTMLDivElement>
  constructor(props: { comment: any, editComment: any, deleteComment: any, CustomMention: any }) {
    super(props);
    this.commentRef = React.createRef();
    this.state = {
      edit: false,
      newComment: this.props.comment.attributes.comments|| "Comment Unavailable",
      isHide: false,
    }
  }
  
  listener = (event:any) => {
    // Do nothing if clicking ref's element or descendent elements
    if (!this.commentRef.current || this.commentRef.current.contains(event.target)) {
      return;
    }
    this.setState({ edit: false, newComment: this.props.comment.attributes.comments })
    
  };
  async componentDidMount() {
    document.addEventListener("mousedown", this.listener);
    document.addEventListener("touchstart", this.listener);
  }

  async componentWillUnmount() {
    document.removeEventListener("mousedown", this.listener);
    document.removeEventListener("touchstart", this.listener);
  }
  render(): React.ReactNode {
    if (this.state.isHide) return <></>
    const { comment, editComment, deleteComment, CustomMention } = this.props;
    const date = moment(comment.attributes.updated_at).fromNow()
    return (
      <>
        <Box margin={"20 0"}>
          <Box display={"flex"} alignItems={"center"}>
            <Box>
              <Avatar
                style={{ height: "20px", width: "20px" }}
                src={comment?.attributes?.added_by?.attributes?.image}
              />
            </Box>
            <Box fontWeight={"bold"} fontSize={"0.9rem"} margin={"0 10"}>
              {comment.attributes.added_by.attributes.first_name + " " + comment.attributes.added_by.attributes.last_name}
            </Box>
            <Box color={"#C1C2C8"} fontSize={"0.8rem"}>
              {date}
            </Box>
          </Box>
          <Box marginLeft={"5%"} marginTop={"0.9vh"} fontSize={"1rem"}>
            {this.state.edit && comment.attributes.added_by.id == localStorage.getItem("id") ?
              <>
              <></>
              <div ref={this.commentRef} id={"EditCommentMention"} style={{position:'relative'}} >
                  <CustomMention 
                  onChange={(e:any,newValue:any, newPlainTextValue:any, mentions:any) => {this.setState({ newComment: e.target.value });}}
                  value={this.state.newComment} 
                  placeholder={"Add a Comment"}
                  autoFocus
                />
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                  >
                    <Box >
                      <Button
                        style={{
                          fontSize: "1.5vhv",
                          fontWeight: "bolder",
                          textTransform: "none",
                          position: 'absolute',
                          top: '0',
                          marginLeft: '10px'
                        }}
                        variant={"contained"}
                        className="sendBtn"
                        disabled={!this.state.newComment.trim().length}
                        onClick={(e) => {e.preventDefault(); e.stopPropagation() ; this.setState({ edit: false }); editComment(this.state.newComment, comment.id); comment.attributes.comments = this.state.newComment }}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
              </div>
              </> :
              <Box id="commentMention">
                  <CustomMention 
                    onChange={() => {}}
                    value={comment.attributes.comments} 
                    placeholder={""}
                    readOnly
                  />
                { comment.attributes?.files?.length > 0 ? 
                <Box>
                <Box style={{marginTop: 10, background: 'white', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Box>
                    <Typography style={{padding: 10, fontSize: 10, color: 'grey', display: 'flex', alignItems: 'center' }}>
                      <img src={FileSvg} height={20} />
                      {comment.attributes?.files[0].split("/")[comment.attributes?.files[0].split("/").length - 1]}
                    </Typography>
                  </Box>
                  <Box>
                    <Link to={comment.attributes?.files[0]} target="_blank" download>
                      <img src={DownloadSvg} alt="" height={20} style={{padding: 10}} />
                    </Link>
                  </Box>
                </Box>
              </Box>
              :
              null}
              </Box>

            }
          </Box>
          <Box>
            {!this.state.edit && comment.attributes.added_by.id == localStorage.getItem("id") ?
              <Box className="taskBoardCommentFont" >
                <span onClick={() => this.setState({ edit: true })} style={{ cursor: 'pointer' }} >
                  Edit
                </span>
                <span style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                  onClick={() => {
                      this.setState({ isHide: true }); deleteComment(comment.id);
                  }}
                >
                  Delete
                </span>
              </Box> : ""}
          </Box>
        </Box>
      </>
    );
  }
}

interface LabelWithInputsProps {
  label: any;
  isDisable: any;
  value: any;
  data: any;
  updateProjectDetails: any
  debouncerHandler: any;
}

class LabelWithInput extends Component<LabelWithInputsProps, { input: string }> {
  constructor(props: LabelWithInputsProps) {
    super(props);
    this.state = {
      input: this.props.value
    }
  }
  render(): React.ReactNode {
    const { label, isDisable, data, debouncerHandler } = this.props;
    return (
      <>
        <Box height={"100%"} width={"90%"} padding={'10px'}>
          <Box className={"labelFont"} marginBottom={"3%"}>
            <Box height={"32px"} style={{display:'flex', alignItems:'flex-end'}} >{label}</Box>
          </Box>
          <Box>
            <TextField
              multiline={label === "Comments"}
              style={{ backgroundColor: isDisable ? "#EFEFEF" : "" }}
              size={"small"}
              fullWidth
              id="outlined-basic"
              disabled={isDisable}
              variant="outlined"
              value={this.state.input}
              onChange={(e) => {
                this.setState({ input: e.target.value });
                debouncerHandler(e.target.value, data);
              }}
            />
          </Box>
        </Box>
      </>
    );
  }
}

interface LabelWithSelectProps {
  label: any;
  value: any;
  available: boolean;
  defaultValue: any;
  disabled: boolean;
  data: any;
  updateProjectDetails: any
  personID: any
  currentFinulentStatus: string
}
class LabelWithSelect extends Component<LabelWithSelectProps> {
  arr = [{ value: 10, name: 'Ten' },
  { value: 20, name: 'Twenty' },
  { value: 30, name: 'Thirty' },
  ]

  render(): React.ReactNode {
    const { label, available = false, defaultValue, disabled, data, updateProjectDetails, currentFinulentStatus } = this.props;
    return (
      <>
        <Box height={"100%"} width={"90%"} padding={'10px'}>
          <Box className={"labelFont"} marginBottom={"3%"}>
            <Box height={"32px"} style={{display:'flex', alignItems:'flex-end'}} >{label}</Box>
          </Box>
          <Box>
              { label != "Finulent Status" ? 
            <FormControl size={"small"} variant={"outlined"} fullWidth>
              
              <Select
                style={{ backgroundColor: disabled ? "#EFEFEF" : "" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={(e) => updateProjectDetails(e.target.value, data)
                }
              >
                
                {!available ? this.arr.map((item) => {
                  return <MenuItem value={item.value}>{item.name}</MenuItem>
                })
                  :
                  this.props.value.map((item: { value: string, id: number }) => {
                    return <MenuItem value={item.id} >{item.value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            :
            <FormControl size={"small"} variant={"outlined"} fullWidth>
              {localStorage.setItem("finulentStatusValue",currentFinulentStatus)}
              <Select
                style={{ backgroundColor: disabled ? "#EFEFEF" : "" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentFinulentStatus}
                disabled={disabled}
                onChange={(e) => updateProjectDetails(e.target.value, data)
                }
              >
                
                {!available ? this.arr.map((item) => {
                  return <MenuItem value={item.value}>{item.name}</MenuItem>
                })
                  :
                  this.props.value.map((item: { value: string, id: number }) => {
                    return <MenuItem value={item.id} >{item.value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          }
          </Box>
        </Box>
      </>
    );
  }
}

class SectionHead extends Component {
  render(): React.ReactNode {
    return (
      <>
        <Box
          padding={"5px"}
          borderRadius={"0px 30px 30px 0px;"}
          component={"span"}
          fontWeight={"bold"}
          fontSize={"15px"}
          bgcolor={"#F3AC17"}
        >
          {this.props.children}
        </Box>
      </>
    );
  }
}

interface ShowActivityProps{
  activity: any;
  CustomMention: any;
}

class ShowActivity extends Component<ShowActivityProps>{
  constructor(props: ShowActivityProps) {
    super(props);
  }
  addAttachmentDisplayName = (data: any) => {
    const result = data.attributes?.attachment?.attributes?.attachment?.url.split("/")
    
    if(result)
      return result[result.length - 1]
    else{
      if(data.attributes?.previous_data != null)
       return data.attributes?.previous_data
      else
        return "File has been Deleted"
    }
  }

  activityType = (data : any, CustomMention: any) => {
    if(data?.attributes?.title == "changed_status"){
      return <>
         <Typography style={{fontSize: 12}} >
            Changed status from <b>{data.attributes?.previous_data}</b> to <b>{data.attributes?.new_data}</b>
         </Typography>
      </>
    }
    if(data?.attributes?.title == "deleted_an_attachment"){
      return <>
         <Typography style={{fontSize: 12, display: 'flex', alignItems: 'center' }} >
            Deleted an attachment
            <Typography style={{fontSize: 10, color: 'grey', marginLeft: '5px'}} >
              {data.attributes?.previous_data || "File has been Deleted" }
            </Typography>
         </Typography>
      </>
    }
    if(data?.attributes?.title == "added_an_attachment"){
      return <>
         <Typography style={{fontSize: 12, display: 'flex', alignItems: 'center' }} >
            Added an attachment
         </Typography>
         <Box style={{marginTop: 10, background: 'white', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>
              <Typography style={{padding: 10, fontSize: 10, color: 'grey', display: 'flex', alignItems: 'center' }}>
                <img src={FileSvg} height={20} />
                {this.addAttachmentDisplayName(data)}
              </Typography>
            </Box>
            {data.attributes?.attachment != null ? <Box>
              <Link to={data.attributes?.attachment?.attributes?.attachment?.url} target="_blank" download>
                <img src={DownloadSvg} alt="" height={20} style={{padding: 10}} />
              </Link>
            </Box> : null}
         </Box>
      </>
    }
    if(data?.attributes?.title == "added_a_comment"){
      return <>
         <Box style={{fontSize: 12}} className={'activityMention'} >
            Added a comment
            <Box style={{fontSize: 10, color: 'grey', marginTop: 5}}>
                <CustomMention 
                  onChange={() => {}}
                  value={data.attributes?.new_data} 
                  placeholder={""}
                  readOnly
                />
                </Box>
            </Box>
      </>
    }
    if(data?.attributes?.title == "deleted_a_comment"){
      return <>
          <Box style={{fontSize: 12}} className={'activityMention'}>
            Deleted a comment
            <Box style={{fontSize: 10, color: 'grey', marginTop: 5}} >
              <CustomMention 
                  onChange={() => {}}
                  value={data.attributes?.previous_data} 
                  placeholder={""}
                  readOnly
                />
            </Box>
          </Box>
      </>
    }
    if(data?.attributes?.title == "edited_a_comment"){
      return <>
         <Box style={{fontSize: 12}} className={"activityMention"} >
            Edited a comment
            <Box>
              <Typography style={{fontSize: 12}} >
                New comment
              </Typography>
              <Box style={{fontSize: 12, color: 'grey'}} >
                <CustomMention 
                  onChange={() => {}}
                  value={data.attributes?.new_data} 
                  placeholder={""}
                  readOnly
                />
              </Box>
              <Typography style={{fontSize: 12, marginTop: 10}} >
                Previous Comment
              </Typography>
              <Box style={{fontSize: 12, color: 'grey'}} >
                <CustomMention 
                  onChange={() => {}}
                  value={data.attributes?.previous_data} 
                  placeholder={""}
                  readOnly
                />
              </Box>
            </Box>
         </Box>
      </>
    }
  }

  PerActivity = (activityData:any, CustomMention: any) => {
    const date = moment(activityData?.attributes?.updated_at).format("D MMM YY on hh:mm a")
    return <>
      <Box style={{marginBottom: '0.75rem'}} >
        <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            style={{ height: "20px", width: "20px" }}
            src={activityData?.attributes?.perfom_by?.image || null}
          />
          <Typography style={{marginLeft: 5, fontWeight: 'bold' }} >{activityData?.attributes?.perfom_by?.full_name || "NA"}</Typography>
          <Typography style={{marginLeft: 10, color: 'grey', fontSize: 10}} >{date}</Typography>
        </Box>
        <Box style={{marginLeft: 27}}>
          {this.activityType(activityData,CustomMention)}
        </Box>
      </Box>
      <hr className="horizontalLineStyle" />
    </>
  }

  render(): React.ReactNode {
    const { activity, CustomMention } = this.props
    return(<>
      <Box style={{marginBottom: '1rem', width: '75%'}} >
      {/* <this.PerActivity activity={activity[0]} /> */}
      {activity.map((el: any)=>{
        return this.PerActivity(el, CustomMention)
      })}
      </Box>
    </>)
  }
}

// Customizable Area End
