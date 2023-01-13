import React, { Component, Fragment, PureComponent } from "react";

import {
  Box,
  Button,
  InputAdornment,
  // Customizable Area Start
  TextField,
  Avatar,
  Popover,
  Modal,
  Select,
  FormControl,
  MenuItem,
  Checkbox,
  CircularProgress,
  OutlinedInput,
  ListItemText,
  ListItemIcon,
  Tooltip
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import "./ClientSubFolder.css";
import { GoSearch } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import {  Formik } from "formik";
import * as yup from "yup";
import { modalCheck, uploadimage } from "./assets";
const configJSONBase = require("../../../framework/src/config");
// Customizable Area End

import ClientManagementController, {
  Props,
} from "./ClientManagementController";

export default class ClientManagement extends ClientManagementController {
  modalStyle: any = getStatusModalStyle();
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    
    // Customizable Area End
  }

  // Customizable Area Start

  renderModal = ()=>{
   const body = (
       <Box style={this.modalStyle}>
          <Box margin={"auto"} width={"60%"}>
          <img src={modalCheck} className="statusImage"/>
          </Box>
          <Box fontWeight={"bold"} textAlign={"center"}>
            {this.state.snackBarMessage}
          </Box>
          <Box fontWeight={"bold"} textAlign={"center"}>
            Successfully!
          </Box>
          <Box  marginY={"20px"} marginBottom={"50px"} display={"flex"} justifyContent={"center"}>
          <Button onClick={this.handleCloseStatusModal} style={{width:"42%"}} variant={"contained"}>
            OK
          </Button>
          </Box>
       </Box>
   )
 

    return <>
        <Box>
          <Modal
            open={this.state.isStatusModalVisible}
            onClose={this.handleCloseStatusModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
    </>
  }

  // Customizable Area End

  render() {
    const {
      allClientData,
      loader,
    } = this.state;


    return (
      // Customizable Area Start

      <Box marginLeft={"15vw"} width={"85vw"} fontFamily={"sans-serif"}>
         {this.renderModal()}

      
        <Centered>
          <Box width={"97%"}>
            {/* Top Start */}
            <Box height={"5vh"} marginTop={"2vh"}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Box id="touch" className="boldText">Client Management</Box>  
                  <TextField
                      id="searchClientInput"
                      variant={"standard"}
                      style={{
                        backgroundColor: "white",
                        margin: "0px 2vw",
                        width: "20vw",
                        border:"1px solid #C4C4C4",
                        borderRadius:"5px",
                        padding:"4px 8px"
                      }}
                      value={this.state.searchClientValue}
                      onChange={(e) =>
                        this.handleChangeWorkspaceandClientSearch(e, "else")
                      }
                      InputProps={{
                        startAdornment: (
                          <Box>
                            <InputAdornment position={"start"}>
                              <GoSearch />
                            </InputAdornment>
                          </Box>
                        ),
                        endAdornment: (
                          <Box>
                            <InputAdornment position={"end"}>
                            {this.clientsearchValue.trim().length != 0 && <AiOutlineClose className={"closeIcon"} onClick={this.handleClearSearch}/>}
                            </InputAdornment>
                          </Box>
                        ),
                        disableUnderline: true 
                      }}
                      placeholder={"Search Client"}
                    />
                </Box>

                <Box  alignItems={"center"} display={"flex"} justifyContent={"space-between"}>
                  <Box fontWeight={"bold"} color={"#6A6F7A"}>Workspace</Box>
                  <Box>
                  <MultipleCheckMark data={{data:this.state,handleChangeWorkspaceandClientSearch:(event:any,type:any)=>this.handleChangeWorkspaceandClientSearch(event,type)}}/>
                  </Box>
                  <Box marginLeft={"2vw"}>
                    <AddClientModal data={this.state} postNewClient={this.postAddClient}/>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Top End */}

            {/* Main Content  */}

             {loader ?   <Box
                  height={"80vh"}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <CircularProgress style={{margin:"auto"}}/>
                </Box> :   <Box className={"carsdDiv"}>
                {allClientData.map((el: any, i: number) => {
                  return <SeeClientDetailsModal key={i} data={{cardData:el,data:this.state}}  />;
                })
                }
            </Box>}         
                {allClientData.length == 0  && !loader  && <Box height={"80vh"}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  fontSize={"25px"}
                  fontWeight={"bold"}
                  justifyContent={"center"}>No Folder Found</Box>}
            {/*Main Content End */}
          </Box>
        </Centered>
      </Box>

      // Customizable Area End
    );
  }
}
// Customizable Area Start



class  MultipleCheckMark extends PureComponent<{data:any},{isDropDownOpen:boolean,workSpaceArr:any}>{
  constructor(props:any){
    super(props);
    this.state={
      isDropDownOpen:false,
      workSpaceArr:[]
    }
  }

  handleCancel=(e:any)=>{
     e.stopPropagation();
     this.setState({isDropDownOpen:false});
  }

  handleOpen=()=>{
    this.setState({isDropDownOpen:true});
 }

 handleClose=()=>{
  this.setState({isDropDownOpen:false});
}

 handleApply=(e:any)=>{
  e.stopPropagation();
   this.props.data.handleChangeWorkspaceandClientSearch({target:{value:this.state.workSpaceArr}}, "dropDown");
   this.handleClose();

 }


 handleWorkspace = (e:any)=>{
  const {value} = e.target;
  const {
    workspacesData,
  } = this.props.data.data;
  
  if(value[value.length-1] == "all"){
   this.setState({workSpaceArr:workspacesData.length == this.state.workSpaceArr.length ? [] : workspacesData})
   return;
  }
  this.setState({workSpaceArr:value});
 }


 componentDidUpdate(prevProps: Readonly<{ data: any; }>, prevState: Readonly<{ isDropDownOpen: boolean; workSpaceArr: any; }>, snapshot?: any): void {
     if(this.props.data.data.workspacesData !== prevProps.data.data.workspacesData){
      this.setState({workSpaceArr:this.props.data.data.workspacesData});
     }
 }

  render(): React.ReactNode {
    const {
      workspacesData,
    } = this.props.data.data;
     
      return <Box >
          

      <FormControl
        size={"small"}
        style={{
          width: "16vw",
          marginLeft: "2vw",
          backgroundColor: "white",
        }}
      >
        <Select
          open={this.state.isDropDownOpen}
          onClick = {this.handleOpen}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={this.state.workSpaceArr}
          onChange={(e) => {
            // this.props.data.handleChangeWorkspaceandClientSearch(e, "dropDown")
            this.handleWorkspace(e);
          }}
          input={<OutlinedInput />}
          renderValue={(selected: any) => {
            return selected.map((el: any) => el?.attributes?.name).join(",");
          }}
        >
          
          <MenuItem  value="all">
            <ListItemIcon>
              <Checkbox
                checked={
                  workspacesData.length > 0 &&
                  this.state.workSpaceArr.length === workspacesData.length
                }
                indeterminate={
                  this.state.workSpaceArr.length > 0 &&
                  this.state.workSpaceArr.length < workspacesData.length
                }
              />
            </ListItemIcon>
            <ListItemText primary="Select All" />
          </MenuItem>

          {workspacesData.length != 0 &&
            workspacesData.map((workspace: any, i: number) => (
              <MenuItem key={i} value={workspace}>
                <Checkbox
                  checked={this.state.workSpaceArr.indexOf(workspace) > -1}
                />
                <ListItemText primary={workspace.attributes.name} />
              </MenuItem>
            ))}
            <Box margin={"10px 10px"} display={"flex"} justifyContent={"space-evenly"}>
            <Button style={{width:"45%",textTransform:"none",fontWeight:"bold"}} variant = {"contained"} onClick={this.handleCancel} >Cancel</Button>
            <Button style={{width:"45%",backgroundColor:"#0096FF",color:"white",textTransform:"none",fontWeight:"bold"}} variant = {"contained"} onClick={this.handleApply}>Apply</Button>
            </Box>
        </Select>
      </FormControl>
    </Box>
  }
}


class ClientCard extends PureComponent<{ data: any }> {


  horizantalRow=()=>{
    return <>
    <Box width={"80%"} margin={"auto"}>
      <Box fontWeight={"0.1px"} marginY={"1rem"} border={"0.01px solid lightgrey"} />
    </Box>
    </>
  }

  handleMoreInfoRedirect = (e: any) => {
    e.stopPropagation();
    const history = this.props.data.data.history;
    const { team_leaders, template, template_completed, workspace, client_name } = this.props.data.cardData.attributes;
    const { id } = this.props.data.cardData;
    sessionStorage.setItem("client_id", id);
    if (team_leaders?.data?.length != 0) {
      if (template_completed && template?.id) {
        history.push(`/reviewChecklist?cid=${id}&tid=${template?.id}`)
      }
      else history.push(`/template?cid=${id}`)
      const breadcrumb_data = {
        workspace: { id: workspace?.id, name: workspace?.name },
        client: { id: id, name: client_name },
        template_name: template?.attributes?.title
      }
      localStorage.setItem('breadcrumb_data', JSON.stringify(breadcrumb_data))
    }
    else { history.push(`/client_subfolder?cid=${id}`); }
  }

 handleImageLink = (image:any)=>{
  const imageLink = image ? configJSONBase.baseURL+image : null;
  return imageLink;
 }

  render(): React.ReactNode {
    const {cardData,data} = this.props.data;
    const { client_name, description, client_id, image,team_leaders } = cardData.attributes;
    const name =
      cardData.attributes.workspace == null
        ? ""
        : cardData.attributes.workspace.name;

    

    return (
      <>
        <Box className="card">
          <Box>
            <Box display={"flex"} justifyContent={"end"}>
              <Box className={"options"}>
                <Popperr data={{cardData:cardData,data:data}}/>
              </Box>
            </Box>
            <Box margin={"auto"} marginBottom={"2vh"}>
              <Avatar
                style={{
                  border: "2px solid lightgrey",
                  margin: "auto",
                  height: "95px",
                  width: "100px",
                }}
                src={image}
              />
            </Box>
            <Box textAlign={"center"} className={"cardText"}>
              ID : {client_id}
            </Box>
            <Box marginBottom={"15px"} marginTop={"5px"}>
              <Box className="boldText dotText" marginX={"auto"}>
                {client_name}
              </Box>
              <Box
                className={"cardText"}
                overflow={"scroll"}
                height={"8rem"}
                textAlign={"center"}
                marginTop={"1vh"}
                paddingX={"1rem"}
              >
                {description}
              </Box>
            </Box>
            {this.horizantalRow()}
            <Box
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
              className={"cardText"}
            >
              <Box>Workspace</Box>
              <Box fontWeight={"bolder"} marginLeft={"10px"}>
                {name}
              </Box>
            </Box>
            {this.horizantalRow()}
            <Box
             height={"3vh"}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box className={"cardText"} marginRight={"1vh"}>
                Team Leader
              </Box>
              <Box display={"flex"}>
                {team_leaders.data.length != 0 && team_leaders.data.map((el:any,i:number)=>{
                    return (
                      <Box key={i} zIndex={i} marginLeft={i != 0 && "-13px"}>
                        <Tooltip title={el.attributes.first_name + " " + el.attributes.last_name} placement="bottom">
                        <Avatar
                         src={this.handleImageLink(el.attributes.image) as string}
                          style={{
                            border: "3px solid white",
                            width: "30px",
                            height: "30px",
                          }}
                          alt="Remy Sharp"
                        />
                        </Tooltip>
                      </Box>
                    );
                })}
              </Box>
            </Box>
            {this.horizantalRow()}
           
              <Box
                marginY={"1.5vh"}
                className="boldText closeIcon"
                color={"#5BB3F8"}
                textAlign={"center"}
                onClick={this.handleMoreInfoRedirect}
              >
                More Info
              </Box>
           

          </Box>
        </Box>
      </>
    );
  }
}

class Centered extends PureComponent {
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

interface MenuState {
  anchorEl: any;
}

class Popperr extends PureComponent<{data:any}, MenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  componentDidUpdate(prevProps: Readonly<{ data: any; }>, prevState: Readonly<MenuState>, snapshot?: any): void {  
    this.props.data.data.popOverBoolean != prevProps.data.data.popOverBoolean && this.handleClose();
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  

  render(): React.ReactNode {
    const {data,cardData} = this.props.data;
    return (
      <>
        <Box onClick={(e:any) => e.stopPropagation()}>
          <Box style={{fontSize:"25px"}} onClick={this.handleClick}>
            <FiMoreHorizontal />
          </Box>
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            style={{fontSize:"20px"}}
          >
            <Box className="menu" padding={"5px 0px"}>
              <EditClientModal data={{cardData:cardData,data:data}}/>
              <DeleteClientModal data={{cardData:cardData,data:data,closePopover:()=>this.handleClose()}}/>
            </Box>
          </Popover>
        </Box>
      </>
    );
  }
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "32rem",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    maxHeight: "95vh",

    // boxShadow: theme.shadows[5],
  };
}



class AddClientModal extends PureComponent<
  {data:any,postNewClient:any}
> {
  modalStyle: any = getModalStyle();
 
  handleTlFontColor=(type:any)=>{
    const color =   type == "selected" ? "white" : "darkgrey" ;
    return color;
  }

  handleImageLink = (image:any)=>{
    const imageLink = image ? configJSONBase.baseURL+image : null;
    return imageLink;
   }

   handleFormikError=(isTouched:any,error:any)=>{
      const formikError = isTouched ? error : null;
      return formikError;
   }



  render(): React.ReactNode {
    
    const {workspacesData,handleAddClientModalOpen,isAddClientModal,handleAddClientModalClose,selectedTL,available_tl,unavailable_tl,handleSelectTl,removeSelectedTl,handleWorkspaceId,handleTeamLeadValue,snackBarMessage,handleEmptySnackBar} = this.props.data;

    const phoneRegExp = /^[0-9\- ]{8,14}$/

    const validationSchema = yup.object().shape({
      client_name: yup.string().required("Client Name is required"),
      workspace_id: yup
        .string()
        .required("Workspace Name is required"),
      image: yup
        .mixed()
        .required("Client logo is required") .when("image",{
          is:(value:any) => typeof(value) != "string",
          then:yup.mixed().test(
            'is-correct-file',
            'Uploaded file is not valid.Only JPEG,PNG files are allowed.',
             checkIfFilesAreCorrectType
          )
        }),
        client_email: yup.string().notRequired().when("client_email",{
          is: (value: string | any[]) => value?.length,
          then: yup.string().email("Enter proper email").required(),
        }),  
    },[
      ["client_email", "client_email"], 
      ["image", "image"], 
     ] 
    );

    const  TlBox=({type,tlData}:any)=>{
      return <>
       <Tooltip title={tlData.attributes.first_name + " " + tlData.attributes.last_name} placement="bottom">
           <Box className={"closeIcon"} onClick={()=>type == "available" && handleSelectTl(tlData)} bgcolor={type == "selected" ? "#097BED" : null } color={this.handleTlFontColor(type)} marginX={"10px"} padding={"5px 3px"} borderRadius={"5px"} border={"1px solid darkgrey"} width={"25%"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Box><Avatar style={{height:"20px",width:"20px" }} src={this.handleImageLink(tlData.attributes.image)}/></Box>
          <Box fontSize={"12px"}  className="dotText">{tlData.attributes.first_name +" "+tlData.attributes.last_name}</Box>
          <Box onClick={()=>type == "selected" && removeSelectedTl(tlData)}><AiOutlineClose/></Box>
         </Box>
         </Tooltip>
      </>
    }

    const body = (
      <Formik
        validateOnBlur={false}
        initialValues={{
          client_name: "" ,
          workspace_id: "" ,
          description: "" ,
          contack_details: "" ,
          client_address: "" ,
          client_email: "" ,
          image: "" 
        }}

        onSubmit={(values:Record<string,string>) => {
          
        
          let form_data = new FormData();
          for ( let key in values ) {
          form_data.append(key, values[key]);
}
          selectedTL.length !=0 && selectedTL.map((el:any)=>{
              form_data.append("team_leader_ids[]",el.id);
            })
                   
          this.props.postNewClient(form_data);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <Box overflow={"scroll"} style={this.modalStyle}>
              <Box component={"form"}>
                <Box
                  padding={"10px 22px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  className="boldText"
                >
                  <Box>Add Client</Box>
                  <Box onClick={handleAddClientModalClose} className={"closeIcon"}>
                   <AiOutlineClose />
                    
                  </Box>
                </Box>
                <Box component={"hr"} marginY={"1vh"} />
                <Box width={"90%"} margin={"auto"}>
                
                  {formikProps.values.image  ? <Box component="label"><input
                          name="image"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={(e:any)=> formikProps.setFieldValue("image",e.target.files[0])}
                        /><Avatar style={{margin:"auto",width:"100px",
                  
                  height:"100px"}}
                   // @ts-ignore
                   src={URL.createObjectURL(formikProps.values.image)}/></Box>  :  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100px"}
                    borderRadius={"50%"}
                    height={"100px"}
                    border={"2px dotted grey"}
                    margin={"auto"}
                  >
                    <Fragment>
                      <Button color="primary" component="label" size={"large"}>
                        {" "}
                        <input
                          name="image"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={(e:any)=> formikProps.setFieldValue("image",e.target.files[0])}
                        />
                        <img src = {uploadimage} style={{color:"black",height:"30px",width:"30px"}}/>
                       
                      </Button>
                    </Fragment>
                  </Box>}

                

                  <Box
                    textAlign={"center"}
                    fontSize={"10px"}
                    className={"cardText"}
                  >
                    UPLOAD CLIENT LOGO
                  </Box>
                  <Box textAlign={"center"} className={"errorFieldText"}>
                    {this.handleFormikError(formikProps.touched.image,formikProps.errors.image)}
                    </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Name</Box>
                    <TextField
                      name="client_name"
                      id="client_name"
                      variant={"outlined"}
                      placeholder="Type Name here"
                      fullWidth
                      size={"small"}
                      onChange={(e:any)=>{formikProps.handleChange(e);
                      if(snackBarMessage.length != 0){
                        handleEmptySnackBar();
                      }
                      }}
                      autoComplete={"off"}
                    />
                    <Box className={"errorFieldText"}>
                      {this.handleFormikError(formikProps.touched.client_name,formikProps.errors.client_name)}
                    </Box>
                    <Box className={"errorFieldText"}>
                      {snackBarMessage}
                    </Box>
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Workspace Name</Box>
                    <FormControl
                      id="workspace_id"
                      size={"small"}
                      fullWidth
                      variant={"outlined"}
                    >
                      {/* <InputLabel id="demo-simple-select-label">
                        Select
                      </InputLabel> */}
                      <Select
                        onChange={(e)=>{formikProps.handleChange(e);handleWorkspaceId(e.target.value);}}
                        name="workspace_id"
                        labelId="demo-simple-select-label"
                      >
                        {workspacesData.length != 0 && workspacesData.map((el:any,i:number)=>{
                          return  <MenuItem key={i} value={el.id}>{el.attributes.name}</MenuItem>
                        })}
                       
                      </Select>
                    </FormControl>
                    <Box className={"errorFieldText"}>
                      {this.handleFormikError(formikProps.touched.workspace_id,formikProps.errors.workspace_id)}
                    </Box>
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Description</Box>
                    <TextField
                      name="description"
                      multiline
                      minRows={3}
                      variant={"outlined"}
                      placeholder="Type here"
                      fullWidth
                      size={"small"}
                      id="description"
                      onChange={formikProps.handleChange}
                      autoComplete={"off"}
                    />
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Contact Details</Box>
                    <TextField
                      variant={"outlined"}
                      placeholder="Client contact number here"
                      fullWidth
                      size={"small"}
                      name="contack_details"
                      id="contactDetails"
                      onChange={formikProps.handleChange}
                      autoComplete={"off"}
                     type={"number"}
                    />
                    {/* <Box className={"errorFieldText"}>{formikProps.errors.contack_details}</Box> */}
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Address</Box>
                    <TextField
                      name="client_address"
                      multiline
                      minRows={3}
                      variant={"outlined"}
                      placeholder="Client Contact details here"
                      onChange={formikProps.handleChange}
                      fullWidth
                      size={"small"}
                      id={"clientAddress"}
                      autoComplete={"off"}
                    />
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Team Leader</Box>
                    <TextField
                      onChange={(e)=> handleTeamLeadValue(e.target.value)}
                      variant={"outlined"}
                      placeholder="Search user"
                      fullWidth
                      size={"small"}
                    />
                  </Box>

                 {available_tl.length != 0 && <Box gridRowGap={"10px"} paddingY={"10px"} display={"flex"} flexWrap={"wrap"} >
                  {available_tl.map((el:any)=><TlBox type={"available"} tlData={el}/>)}
                  </Box>}

                 { unavailable_tl.length != 0 && <Box paddingY={"10px"} bgcolor={"#D3CFCF"} display={"flex"} gridRowGap={"10px"}  flexWrap={"wrap"}>{unavailable_tl.map((el:any)=><TlBox type={"unavailable"} tlData={el}/>)}</Box>}

                 { selectedTL.length != 0 && <Box gridRowGap={"10px"} paddingY={"10px"} display={"flex"} flexWrap={"wrap"}>{selectedTL.map((el:any)=> el && <TlBox type={"selected"} tlData={el}/>)}</Box>}

                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Official Email Id</Box>
                    <TextField
                      name="client_email"
                      variant={"outlined"}
                      placeholder="Client official email id here"
                      fullWidth
                      size={"small"}
                      onChange={formikProps.handleChange}
                      id="clientOfficialEmailId"
                      autoComplete={"off"}
                    />
                      <Box className={"errorFieldText"}>
                      {formikProps.errors.client_email}
                    </Box>
                  </Box>
                </Box>
                <Box component={"hr"} marginY={"2vh"} />
                <Box
                  display={"flex"}
                  justifyContent={"end"}
                  marginY={"0.5vh"}
                  width={"90%"}
                  margin={"auto"}
                >
                 <Button
                    variant={"contained"}
                    color={"default"}
                    style={{
                      textTransform: "none",
                      fontWeight: "bold",
                      width: "25%",
                      padding: "8px 50px",
                    }}
                    onClick={handleAddClientModalClose}
                  >
                    Cancel
                  </Button>
                 
                  <Button
                    type={"submit"}
                    variant={"contained"}
                    color={"default"}
                    style={{
                      color: "white",
                      backgroundColor:  "#4EABF8",
                      marginLeft: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                      width: "25%",
                      padding: "8px 50px",
                    }}
                  >
                   Add
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );

   

    return (
      <>
        <Box>
          <Button
            onClick={handleAddClientModalOpen}
            variant={"contained"}
            style={{
              fontSize:"16px",
              textTransform: "none",
              backgroundColor: "#42A5F5",
              color: "white",
              height: "38px",
              width: "10vw",
            }}
          >
            Add Client
          </Button>
          <Modal
            open={isAddClientModal}
            onClose={handleAddClientModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

function getDeleteModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "20rem",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
  };
}

function getStatusModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "18rem",
    borderRadius: "5px",
    fontFamily: "sans-serif",
    backgroundColor: "white",
  };
}




class DeleteClientModal extends PureComponent<{data:any} > {
  modalStyle: any = getDeleteModalStyle();
 
  

  render(): React.ReactNode {
    
    const {isDeleteClientModalVisible,handleDeleteClientModalClose,handleDeleteClientModalOpen,deleteClient} = this.props.data.data;
    const {client_name} = this.props.data.cardData.attributes;
    const {id} = this.props.data.cardData;
    const closePopover = this.props.data.closePopover;

    const body = (
      <Box style={this.modalStyle}>
        <Box
          marginTop={"1vh"}
          className={"boldText"}
          display={"flex"}
          justifyContent={"space-between"}
          paddingX={"20px"}
          paddingY={"10px"}
        >
          <Box>Delete Client?</Box>
          <Box onClick={handleDeleteClientModalClose} className={"closeIcon"}>
            <AiOutlineClose />
          </Box>
        </Box>
        <Box component={"hr"} />
        <Box
          padding={"0px 20px"}
          marginY={"30px"}
          className={"deleteModalText "}
          style={{wordWrap:"break-word"}}
        >
          Are you sure, you want to delete {client_name} Client?
        </Box>
        <Box component={"hr"} />
        <Box
          display={"flex"}
          justifyContent={"end"}
          marginY={"2vh"}
          width={"90%"}
          margin={"auto"}
        >
          <Button
            variant={"contained"}
            color={"default"}
            style={{
              textTransform: "none",
              fontWeight: "bold",
              width: "25%",
              padding: "8px 50px",
            }}
            onClick={handleDeleteClientModalClose}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"default"}
            style={{
              marginLeft: "10px",
              textTransform: "none",
              fontWeight: "bold",
              width: "25%",
              padding: "8px 50px",
            }}
            onClick={()=>{deleteClient(id);closePopover();}}
          >
            Yes
          </Button>
        </Box>
      </Box>
    );

   

    return (
      <>
        <Box>
          <Box onClick={handleDeleteClientModalOpen}>Delete</Box>
          <Modal
            open={isDeleteClientModalVisible}
            onClose={handleDeleteClientModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

class SeeClientDetailsModal extends PureComponent<
  { data: any },
  { open: boolean}
> {
  modalStyle: any = getModalStyle();
  constructor(props: any) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(): React.ReactNode {
    const {cardData,data} = this.props.data;
    
    const {
      client_name,
      description,
      client_id,
      image,
      contack_details,
      client_address,
      client_email,
      team_leaders
    } = cardData.attributes;
    const name =
      cardData.attributes.workspace == null
        ? ""
        : cardData.attributes.workspace.name;


    const body = (
      <Box overflow={"scroll"} style={this.modalStyle}>
        <Box>
          <Box
            padding={"10px 22px"}
            display={"flex"}
            justifyContent={"space-between"}
            className="boldText"
          >
            <Box className={"seeClientHeading"}>{client_name}</Box>
            <Box
              alignItems={"center"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box  
                className={"cardText closeIcon"}
                style={{ textDecoration: "underline" }}
              >
                <EditClientModal data={{cardData:cardData,data:data}}/>
              </Box>
              <Box onClick={this.handleClose} style={{marginLeft:"10px"}} className={"closeIcon"}>
                <AiOutlineClose />
              </Box>
            </Box>
          </Box>
          <Box component={"hr"} marginY={"1vh"} />
          <Box width={"90%"} margin={"auto"}>
            <Avatar
              src={image}
              style={{
                height: "80px",
                width: "80px",
                border: "2px solid lightgrey",
                margin: "auto",
                marginTop: "35px",
                marginBottom: "35px",
              }}
            />
            <Box marginY={"1rem"} >
              <Box>Client Name</Box>
              <Box className={"labelValue"}>{client_name}</Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Client Id</Box>
              <Box className={"labelValue"}>{client_id}</Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Workspace Name</Box>
              <Box className={"labelValue"}>{name}</Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Description</Box>
              <Box className={"labelValue"}>{description}</Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Contact Details</Box>
              <Box className={"labelValue"}>{contack_details}</Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Client Address</Box>
              <Box className={"labelValue"}>{client_address}</Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Team Leader</Box>
              <Box className={"labelValue"} display={"flex"}>
               {team_leaders.data.length > 0 && team_leaders.data.map(({attributes}:any,i:number)=>{
                  return <Box
                  key = {i}
                  marginX={"10px"}
                  alignItems={"center"}
                  display={"flex"}
                  fontSize={"13px"}
                  justifyContent={"space-between"}
                >
                  <Avatar
                    src={attributes.image}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <Box marginLeft={"5px"}>{attributes.first_name + " " + attributes.last_name}</Box>
                </Box>
               })}
              </Box>
            </Box>
            <Box marginY={"1rem"} >
              <Box>Client Official Email Id</Box>
              <Box className={"labelValue"}>{client_email}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );

    return (
      <>
        <Box>
          <Box onClick={this.handleOpen}>
            <ClientCard data={this.props.data} />
          </Box>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

class EditClientModal extends Component<{data:any}> {
  modalStyle: any = getModalStyle();
 
  handleBgColor=(type:any)=>{
   const value =  type == "selected" ? "#097BED" : null;
   return value;
  }

  handleTlFontColor=(type:any)=>{
    const color =   type == "selected" ? "white" : "darkgrey" ;
    return color;
  }

  handleUnavailalbleTlBgColor=(arr:any)=>{
    const color = arr.length!== 0 ?  "#D3CFCF" : null;
    return color;
  }

  handleProfileImage=(image:any)=>{
    const imageUrl = typeof image == "string" ? image : URL.createObjectURL(image);
    return imageUrl;
  }

  handleImageLink = (image:any)=>{
    const imageLink = image ? configJSONBase.baseURL+image : null;
    return imageLink;
   }

   handleMargin = (arr:any)=>{
    const value = arr.length != 0 ? "0.5rem" : "0"; 
    return value;
   }

   handleFormikError=(isTouched:any,error:any)=>{
    const formikError = isTouched ? error : null;
    return formikError;
   }

   handleNullValue = (key:any)=>{
      const value =  key == null ? "" : key;
      return value;
   }


  render(): React.ReactNode {

    const {workspacesData,handleEditClientModalOpen,isEditClientModalVisible,handleEditClientModalClose,updateClient,handleSelectTl,removeSelectedTl,available_tl,unavailable_tl,selectedTL,handleTeamLeadValue,handleWorkspaceId,snackBarMessage,handleEmptySnackBar} = this.props.data.data;
    const {client_id,client_name,client_email,contack_details,client_address,image,description,team_leaders} = this.props.data.cardData.attributes;
    const {id} = this.props.data.cardData.attributes.workspace;
    

    const  TlBoxs=({type,tlData,space}:any)=>{
      return <>
       <Tooltip title={tlData.attributes.first_name + " " + tlData.attributes.last_name} placement="bottom">
           <Box className={"closeIcon"} onClick={()=> type == "available" && handleSelectTl(tlData)} bgcolor={this.handleBgColor(type)} color={this.handleTlFontColor(type)} marginX={"10px"} padding={"5px 3px"} borderRadius={"5px"} border={"1px solid darkgrey"} width={"25%"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Box><Avatar style={{height:"20px",width:"20px" }} src={this.handleImageLink(tlData.attributes.image)}/></Box>
          <Box fontSize={"12px"}  className="dotText">{tlData.attributes.first_name +space+tlData.attributes.last_name}</Box>
          <Box onClick={()=>type == "selected" && removeSelectedTl(tlData)}><AiOutlineClose/></Box>
         </Box>
         </Tooltip>
      </>
    }


    const phoneRegExp = /^[0-9\- ]{8,14}$/

    const validationSchema = yup.object().shape({
      client_name: yup.string().required("Client Name is a required"),
      workspace_id: yup
        .string()
        .required("Workspace Name is a required"),
      image: yup
        .mixed()
        .required("An image file is required")
        .when("image",{
          is:(value:any) => typeof(value) != "string",
          then:yup.mixed().test(
            'is-correct-file',
            'Uploaded file is not valid.Only JPEG,PNG files are allowed',
             checkIfFilesAreCorrectType
          )
        }),
        client_email: yup.string().notRequired().when("client_email",{
          is: (value: string | any[]) => value?.length,
          then: yup.string().email("Enter proper email").required(),
        }),  
    },[
      ["client_email", "client_email"], 
      ["image", "image"], 
     ] 
    );


    const body = (
      <Formik
          validateOnBlur={false}
          initialValues={{
          client_name: client_name ,
          workspace_id: id ,
          description: this.handleNullValue(description),
          contack_details: contack_details == 0 ?   null : contack_details ,
          client_address: this.handleNullValue(client_address),
          client_email: this.handleNullValue(client_email),
          image: image,
        }}

        onSubmit={(values:Record<string,string>) => {
          
          let form_data = new FormData();
          for ( let key in values ) {
            key !== "image" &&  form_data.append(key, values[key]);
            key == "image" && typeof values[key] != "string" && form_data.append(key, values[key]);
} 

            selectedTL.length !=0 && selectedTL.map((el:any)=>{
              form_data.append("team_leader_ids[]",el.id);
            })
                   
          updateClient(form_data,this.props.data.cardData.id)
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <Box overflow={"scroll"} style={this.modalStyle}>
              <Box component={"form"}>
                <Box
                  padding={"10px 23px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  className="boldText"
                >
                  <Box>Edit Client</Box>
                  <Box onClick={handleEditClientModalClose} className={"closeIcon"}>
                     <AiOutlineClose />
                  </Box>
                </Box>
                <Box component={"hr"} marginY={"1vh"} />
                <Box width={"90%"} margin={"auto"}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100px"}
                    borderRadius={"50%"}
                    height={"100px"}
                    border={"2px dotted grey"}
                    margin={"auto"}
                  >

                    {formikProps.values.image ? <Box component={"label"}><input
                          name="image"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={(e:any)=> formikProps.setFieldValue("image",e.target.files[0])}
                        /><Avatar src={this.handleProfileImage(formikProps.values.image)} style={{height:"100px",width:"100px",margin:"auto"}}/></Box> :   <Fragment>
                      <Button color="primary" component="label" size={"large"}>
                        {" "}
                        <input
                          name="image"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={(e:any)=> formikProps.setFieldValue("image",e.target.files[0])}
                        />
                          <img src = {uploadimage} style={{color:"black",height:"30px",width:"30px"}}/>
                       
                      </Button>
                    </Fragment>}
                  </Box>

                  <Box
                    textAlign={"center"}
                    fontSize={"10px"}
                    className={"cardText"}
                  >
                    UPLOAD CLIENT LOGO
                  </Box>
                  <Box textAlign={"center"} className={"errorFieldText"}>
                      {this.handleFormikError(formikProps.touched.image,formikProps.errors.image)} 
                    </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Name</Box>
                    <TextField
                      name="client_name"
                      id="client_name"
                      variant={"outlined"}
                      placeholder="Type Name here"
                      fullWidth
                      size={"small"}
                      value= {formikProps.values.client_name}
                      onChange={(e:any)=>{formikProps.handleChange(e);
                        if(snackBarMessage.length != 0){
                          handleEmptySnackBar();
                        }
                        }}
                      autoComplete={"off"}
                    />
                    <Box className={"errorFieldText"}>
                    {this.handleFormikError(formikProps.touched.client_name,formikProps.errors.client_name)} 
                    </Box>
                    <Box className={"errorFieldText"}>
                      {snackBarMessage}
                    </Box>
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Id</Box>
                    <TextField
                      variant={"outlined"}
                      placeholder="Type Name here"
                      fullWidth
                      size={"small"}
                      disabled
                      style={{backgroundColor:"#EBEBEB"}}
                      value={client_id}
                      autoComplete={"off"}
                    />
                    <Box className={"errorFieldText"}>
                    </Box>
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Workspace Name</Box>
                    <FormControl
                      id="workspace_id"
                      size={"small"}
                      fullWidth
                      variant={"outlined"}
                    >
                     
                      <Select
                        onChange={(e)=>{formikProps.handleChange(e);handleWorkspaceId(e.target.value);}}
                        name="workspace_id"
                        labelId="demo-simple-select-label"
                        value={formikProps.values.workspace_id}
                      >
                        {workspacesData.map((el:any,i:number)=>{
                          return  <MenuItem key={i} value={el.id}>{el.attributes.name}</MenuItem>
                        })}
                       
                      </Select>
                    </FormControl>
                    <Box className={"errorFieldText"}>
                    {this.handleFormikError(formikProps.touched.workspace_id,formikProps.errors.workspace_id)} 
                    </Box>
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Description</Box>
                    <TextField
                      name="description"
                      multiline
                      minRows={3}
                      variant={"outlined"}
                      placeholder="Type here"
                      fullWidth
                      size={"small"}
                      id="description"
                      value={formikProps.values.description}
                      onChange={formikProps.handleChange}
                      autoComplete={"off"}
                    />
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Contact Details</Box>
                    <TextField
                      variant={"outlined"}
                      placeholder="Client contact number here"
                      fullWidth
                      size={"small"}
                      name="contack_details"
                      id="contactDetails"
                      onChange={formikProps.handleChange}
                      value={formikProps.values.contack_details}
                      autoComplete={"off"}
                      type={"number"}
                    />
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Address</Box>
                    <TextField
                      name="client_address"
                      multiline
                      minRows={3}
                      variant={"outlined"}
                      placeholder="Client Contact details here"
                      onChange={formikProps.handleChange}
                      fullWidth
                      size={"small"}
                      value={formikProps.values.client_address}
                      id={"clientAddress"}
                      autoComplete={"off"}
                    />
                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Team Leader</Box>
                    <TextField
                      onChange={(e)=> handleTeamLeadValue(e.target.value)}
                      variant={"outlined"}
                      placeholder="Search user"
                      fullWidth
                      size={"small"}
                    />
                  
                        
                {available_tl.length != 0 && <Box marginY={"0.5rem"} gridRowGap={"10px"} paddingY={"10px"} display={"flex"} flexWrap={"wrap"} >

                  {available_tl.map((el:any,i:number)=><TlBoxs space={" "} key={i} type={"available"} tlData={el}/>)}
                  </Box>}

                 { <Box marginY={this.handleMargin(unavailable_tl)}  paddingY={this.handleMargin(unavailable_tl)} bgcolor={this.handleUnavailalbleTlBgColor(unavailable_tl)} display={"flex"} gridRowGap={"10px"} flexWrap={"wrap"}>{unavailable_tl.map((el:any,i:number)=><TlBoxs key={i} type={"unavailable"} space={" "} tlData={el}/>)}</Box>}

                 { <Box marginY={this.handleMargin(selectedTL)} paddingY={this.handleMargin(selectedTL)} gridRowGap={"10px"} display={"flex"} flexWrap={"wrap"}>{selectedTL.map((el:any,i:number)=> el && <TlBoxs  space={" "} key={i} type={"selected"} tlData={el}/>)}</Box>}       


                  </Box>
                  <Box marginY={"1.5vh"}>
                    <Box className={"labelModal"}>Client Official Email Id</Box>
                    <TextField
                      name="client_email"
                      variant={"outlined"}
                      placeholder="Client official email id here"
                      fullWidth
                      size={"small"}
                      onChange={formikProps.handleChange}
                      id="clientOfficialEmailId"
                      autoComplete={"off"}
                      value={formikProps.values.client_email}
                    />
                      <Box className={"errorFieldText"}>
                      {formikProps.errors.client_email}
                    </Box>
                  </Box>
                </Box>
                <Box component={"hr"} marginY={"2vh"} />
                <Box
                  display={"flex"}
                  justifyContent={"end"}
                  marginY={"0.5vh"}
                  width={"90%"}
                  margin={"auto"}
                >

                 <Button
                    variant={"contained"}
                    color={"default"}
                    style={{
                      textTransform: "none",
                      fontWeight: "bold",
                      width: "25%",
                      padding: "8px 50px",
                    }}
                    onClick={handleEditClientModalClose}
                  >
                    Cancel
                  </Button>
                 
                  <Button
                    type={"submit"}
                    variant={"contained"}
                    color={"default"}
                    style={{
                      color: "white",
                      backgroundColor:  "#4EABF8",
                      marginLeft: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                      width: "25%",
                      padding: "8px 50px",
                    }}
                    
                  >
                   Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );

    return (
      <>
        <Box>
          <Box onClick={()=>handleEditClientModalOpen(team_leaders.data,id)}>Edit</Box>
          <Modal
            open={isEditClientModalVisible}
            onClose={handleEditClientModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </Box>
      </>
    );
  }
}

function checkIfFilesAreCorrectType(files?: any): boolean{
  let valid = true
  if (files) {
    if (!['image/jpeg', 'image/png'].includes(files.type)) {
      valid = false
    }
  }
  return valid;
}


// Customizable Area End
