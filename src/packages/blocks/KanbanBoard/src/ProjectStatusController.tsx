import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  toggler: boolean;
  projectData: any;
  projectStatus: any;
  projectId: any;
  loader: boolean;
  comment: string;
  displayComments: any;
  projectName: string;
  fieldData: any
  projectPriority: boolean
  client: any
  projectDate: any
  dropDownOptions: any
  typeDropDownOptions: any
  showCustomBox: boolean
  isUploading: boolean
  Attachments: any
  bottomStatusValue: any
  deletedAttachmentId: any
  projectAttachmentToBeUploaded: any
  activityData: any
  showCommentTab: boolean
  openSnackBar: boolean
  snackBarMsg: string
  projectDisplayId: any
  currentFinulentStatus: any
  finulentStatusChoices: any
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProjectStatusController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  handleData = this.props.history.location.state.data;
  submitCommentId = "";
  getProjectDetailsCallId = "";
  getDropDownOptionId = "";
  profileUpdateCallId = "";
  editCommentCallId = "";
  deleteCommentId = "";
  getTypeDropDownOptionCallId = "";
  uploadAttachmentToProjectCallId = "";
  deleteAttachmentCallId = "";
  FinulentStatusChoicesCallId = "";
  timer: any;
  previousMention: any = [];
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];
    this.state = {
      comment: "",
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loader: true,
      toggler: true,
      projectId: this.props.history.location?.state?.data?.id || null,
      projectDisplayId: this.props.history.location?.state?.data?.project_id || null,
      projectStatus: {
        "0": "Project in Queue",
        "1": "Production Assigned",
        "2": "Production Intiated",
        "3": "Production Sent for QC",
        "4": "QC Initiated",
        "5": "File Sent for Corrections",
        "6": "Design Corrections Initiated",
        "7": "Revised File sent for QC",
        "8": "Production Sent for QA",
        "9": "QA Initiated",
        "10": "File Completed",
        "11": "Query",
        "12": "In Progress",
        "13": "Query - File Completed"
      },
      displayComments: [],
      projectName: '',
      projectData: [],
      fieldData: [],
      projectPriority: this.props.history.location?.state?.data?.priority == ("Yes"),
      client: this.props.history.location?.state?.data.client_name || "NA",
      projectDate: this.props.history.location?.state?.data?.created_at,
      dropDownOptions: [],
      typeDropDownOptions: [],
      showCustomBox: false,
      isUploading: false,
      Attachments: [],
      deletedAttachmentId: null,
      bottomStatusValue: "Select",
      projectAttachmentToBeUploaded: [],
      activityData: [],
      showCommentTab: true,
      openSnackBar: false,
      snackBarMsg: "",
      currentFinulentStatus: this.props.history.location?.state?.data.finulent_status,
      finulentStatusChoices: []
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.uploadAttachmentToProjectCallId) {
        if (responseJson && !responseJson.errors) {
          this.addAttachment(responseJson.data)
          this.getProjectDetailsById()
        }

      }

      if (apiRequestCallId === this.FinulentStatusChoicesCallId) {
        if (responseJson && !responseJson.errors) {
          this.setState({
            finulentStatusChoices: Object.values(responseJson)
          })
        }

      }

      if (apiRequestCallId === this.deleteAttachmentCallId) {
        if (responseJson && !responseJson.errors) {
          this.updateAttachmentArray()
          this.getProjectDetailsById()
        }

      }

      if (apiRequestCallId === this.editCommentCallId) {
        if (responseJson && !responseJson.errors) {
          this.getProjectDetailsById()
        }

      }
      if (apiRequestCallId === this.deleteCommentId) {
        if (responseJson && !responseJson.errors ) {
          this.getProjectDetailsById()
          toast.success("Comment Deleted Successfully", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }

      }

      if (apiRequestCallId === this.submitCommentId) {
        if (responseJson && !responseJson.errors && responseJson?.data) {
          this.updateComments(responseJson)
          this.getProjectDetailsById()
          this.setState({
            projectAttachmentToBeUploaded: false
          })
        }

      }
      if (apiRequestCallId === this.profileUpdateCallId) {
        if (responseJson && !responseJson.errors) {
          toast.success(responseJson.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          this.getProjectDetailsById()
          this.updateFinulentStatus()
        }else{
          toast.error(responseJson.errors[0], {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }

      }
      if (apiRequestCallId === this.getTypeDropDownOptionCallId) {
        if (responseJson && !responseJson.errors) {
          let typeDropDownArr = [...responseJson.data]
          
          typeDropDownArr.sort(function (a: any, b: any) { return a.id - b.id })
          
          let arr: any = []
          typeDropDownArr.forEach((item: any) => {
            arr.push({
              value: item.attributes.project_type,
              id: Number(item.id)
            })
          });
          this.setState({
            typeDropDownOptions: arr
          })

        }

      }
      if (apiRequestCallId === this.getProjectDetailsCallId) {
        if (responseJson && !responseJson.errors) {

          localStorage.setItem("template_id", responseJson.additional_attr.template.id)
          localStorage.setItem("client_id", responseJson.additional_attr.client_id)
          localStorage.setItem("client_subfolder_id", responseJson.additional_attr.client_subfolder_id)

          let project = [...responseJson.project]
          let field = [...responseJson.fields]
          
          project.sort(function (a: any, b: any) { return a.template_field_id - b.template_field_id })
          field.sort(function (a: any, b: any) { return a.sequence_no - b.sequence_no })
          this.setState({
            projectData: project,
            fieldData: field,
            displayComments: responseJson.additional_attr.project_comments.reverse(),
            loader: false,
            Attachments: responseJson.additional_attr?.attachments,
            activityData: responseJson.additional_attr?.activity,
          }, ()=> {
            this.checkForCustomBox()
            this.getFinulentStatusChoices()
            this.setState({
              currentFinulentStatus:this.findValueByFieldName(Number(localStorage.getItem("tempValue")), project)
            })
            
          })
        }else{
          this.setState({
            loader: false
          })
        }

      }
      if (apiRequestCallId === this.getDropDownOptionId) {
        if (responseJson && !responseJson.errors) {

          let arr: any = []
          responseJson.data.sort(function (a: any, b: any) { return a.id - b.id })

          responseJson.data.forEach((item: any) => {
            arr.push({
              value: item.attributes.first_name + " " + item.attributes.last_name,
              id: Number(item.id)
            })
          });
          this.setState({
            dropDownOptions: arr
          },()=>{
            this.getProjectDetailsById()
          })
        }

      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    if (!this.state.projectId) {
      this.props.history.goBack();
      return;
    }
    this.getDropDownOption(this.props.history.location?.state?.data?.workspace_id)
    this.getTypeDropDown()
    this.getFinulentStatusChoices()
  }

  updateAttachmentArray = () => {

    let arr: any = []

    this.state.Attachments.map((e: any) => {
      if(e.id != this.state.deletedAttachmentId)
        arr.push(e)
    })
    this.setState({
      Attachments: arr,
      deletedAttachmentId: null
    })
    
  }

  handleCommentTextChange = (text: string) => {
    this.setState({ comment: text })
  }

  getProjectDetailsById = () => {

    const header = {
      token: localStorage.getItem("token")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProjectDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.projectDetailById + `${this.state.projectId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getFinulentStatusChoices = () => {

    const header = {
      token: localStorage.getItem("token")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.FinulentStatusChoicesCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.FinulentStatusChoicesEndPoint + `${this.state.projectId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getDropDownOption = (workspace_id: string | number) => {

    const header = {
      token: localStorage.getItem("token")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getDropDownOptionId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.dropDownOptionsEndPoint + workspace_id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }


  getTypeDropDown = () => {

    const header = {
      token: localStorage.getItem("token")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTypeDropDownOptionCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.typeDropDownEndPoint + `?template_id${localStorage.getItem("template_id")}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  submitComment = () => {
    if(!this.state.comment.trim().length)
      return 

    const header = {
      token: localStorage.getItem("token")
    };

    let formdata = new FormData();
    formdata.append("comments", this.state.comment);
    formdata.append("commentable_type", "BxBlockDashboard::TemplateFieldData");
    formdata.append("commentable_id", this.state.projectId);
    
    
    if (this.state.projectAttachmentToBeUploaded.name) 
      formdata.append("files[]", this.state.projectAttachmentToBeUploaded);
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.submitCommentId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.commentEndPoint
    );
    

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata

    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  editComment = (newComment: string, id: string | number) => {

    const header = {
      token: localStorage.getItem("token")
    };

    let formdata = new FormData();
    formdata.append("comments", newComment);
    formdata.append("commentable_type", "BxBlockDashboard::TemplateFieldData");
    formdata.append("commentable_id", this.state.projectId);


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.editCommentCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.commentEndPoint + `/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata

    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'PUT'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  uploadAttachmentToProject = (file: any) => {

    const header = {
      token: localStorage.getItem("token")
    };

    let formdata = new FormData();
    formdata.append("attachment", file);


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.uploadAttachmentToProjectCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.uploadAttachmentToProjectEndPoint + `/${this.state.projectId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }


  deleteComment = (id: string | number) => {

    const header = {
      token: localStorage.getItem("token")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteCommentId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.commentEndPoint + `/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'DELETE'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }


  deleteAttachment = (id: string | number) => {
    this.setState({deletedAttachmentId: id},()=>{
      this.updateAttachmentArray()
    })
    
    const header = {
      token: localStorage.getItem("token")
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteAttachmentCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteAttachmentEndPoint + `/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'DELETE'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  updateComments = (comment: any) => {

    let obj = comment.data
    let arr = [...this.state.displayComments]
    arr.unshift(obj)
    this.setState({
      displayComments: arr,
      comment: ""
    })


  }

  findValueByFieldName = (searchKey: any, arr: any) => {
    
    let start = 0;
    let end = arr.length - 1;
    
    while (start <= end) {
      let middle = Math.floor((start + end) / 2);
      
      if (arr[middle].template_field_id === searchKey) {
        return arr[middle].data;
      } else if (arr[middle].template_field_id < searchKey) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return -1;
  }

  binarySearchforDropDown = (searchKey: any, arr: any) => {
    
    let start = 0;
    let end = arr.length - 1;
    searchKey = Number(searchKey)
    while (start <= end) {
      let middle = Math.floor((start + end) / 2);

      if (arr[middle].id == searchKey) {
        return arr[middle].id;
      } else if (arr[middle].id < searchKey) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return -1;
  }


  updateProjectDetails = (value: string, item: any) => {
    
    let client_subfolder_id = localStorage.getItem("client_subfolder_id")
    let obj = {
      "project": {
        "template_id": localStorage.getItem("template_id"),
        "client_id": localStorage.getItem("client_id"),
        "client_subfolder_id": client_subfolder_id == "null" ? null : client_subfolder_id,
        "project_data": [
          {
            "template_field_id": item.id,
            "data": value
          }
        ]
      }
    }


    const header = {
      token: localStorage.getItem("token"),
      "Content-Type" : "application/json"
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.profileUpdateCallId = requestMessage.messageId;


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(obj)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'PUT'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateProjectDetailsEndPoint + `/${this.state.projectId}`
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  checkForCustomBox = () => {
    try {
      this.state.fieldData.map((item: any) => {
        if(item.custom_field){
          this.setState({
            showCustomBox: true
          })
          throw Error
        }
      })
    } catch (error) {
      
    }
  }

  addAttachment = (response: any) => {
    let arr = [...this.state.Attachments]
      arr.push(response)
      this.setState({
        Attachments: arr,
        isUploading: false
      })
  }

  handleUpload = (event:any) => {
    if(event?.target?.files[0]){
      this.uploadAttachmentToProject(event.target.files[0])
    }
 }

 changeFinulentStatusValue = (e: any) => {
  this.setState({
    bottomStatusValue: e
  })
 }

 handleProjectAttachment = (event: any) => {
  if(event?.target?.files[0]){
    this.setState({
      projectAttachmentToBeUploaded: event.target.files[0],
    })
  }else{
    this.setState({
      projectAttachmentToBeUploaded: []
    })
  }
 }

  closeSnackBar = () => {
    this.setState({
      openSnackBar: false
    })
  }

 
  updateFinulentStatus = () =>{
    this.setState({
      currentFinulentStatus: localStorage.getItem("finulentStatusValue")
    })
  }

  debouncerHandler = (value:any, data: any) =>{
    clearTimeout(this.timer)
    
    this.timer = setTimeout(() => {
      this.updateProjectDetails(value, data)
    }, 2000);
  }

  handleMention = (newPlainTextValue: string, newValue: string, mentions: string[])=>{
    let regex = /@[a-zA-Z]+/gm
    let temp:any = newPlainTextValue.match(regex)
    
    if(temp == null)
      this.previousMention = []
    else{
      if(this.previousMention.length == temp.length){
        for(let i= 0; i <temp.length; i++){
          if(this.previousMention[i] != temp[i]){
              //TODO: Add API
            }
        }
      }

      this.previousMention = temp
    }
  }
  
  // Customizable Area End
}
