import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import React from 'react'

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");

// import download from "downloadjs";
// Customizable Area End
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  that?: any;
  history?: any;

  // Customizable Area End
}
interface S {
    // Customizable Area Start
    errParameter:any;
    openAddChecklistParam:boolean;
    checklistField:string;
    duplicateDataModal:boolean;
    duplicateChecklist:any;
    duplicateValue:any;
    displayParam:boolean;
    successSaveModal: boolean;
    inputError: boolean;
    loading: boolean;
    isEdit: boolean;
    editId: string;
    downloadedData:any;

    // Customizable Area End
  }

  interface SS {
    id: any;
    // Customizable Area Start

    // Customizable Area End
  }
export default class DefineChecklistTableController extends BlockComponent<Props, S, SS>{
   // Customizable Area Start
   getChecklistCSVId:string='';
   AddChecklistParamId:string='';
   UploadCSVId:string='';
   editChecklistParamId: string='';
   deleteCheckListParamId: string='';
   downloadCompeleteData:string='';
   csvLink:any=null;
   query: any = new URLSearchParams(this.props.history?.location?.search);
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.getChecklistData = this.getChecklistData.bind(this);
    this.closeChecklistModal = this.closeChecklistModal.bind(this)
    this.appendChecklistParameter = this.appendChecklistParameter.bind(this)
    this.csvLink = React.createRef();

     // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state={
      errParameter:[],
      openAddChecklistParam:false,
      checklistField:'',
      duplicateDataModal: true,
      duplicateChecklist:[],
      duplicateValue:[],
      displayParam: false,
      successSaveModal: false,
      inputError: false,
      loading: false,
      isEdit: false,
      editId: "",
      downloadedData:"",

  };
  // Customizable Area End
  runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  // Customizable Area Start
  // Customizable Area End
  }
  async componentDidMount() {
    if(this.query.get('tid'))
    {
     this.setState({loading: true})
     this.getChecklistData();
    }
  }
  closeChecklistModal = () =>{
    this.setState({
      openAddChecklistParam: false,
      inputError: false,
      checklistField: "",
      isEdit: false
    })
}
handleForm = () => {
  if (this.state.checklistField.trim() == "") {
   return this.setState({ inputError: true });
  }
  else {
    this.setState({ inputError: false });
    if (this.state.isEdit){
      this.editChecklistParameter();
    }
    else this.appendChecklistParameter();
  }
}
closeSuccessSaveModal = () =>{
  this.setState({
    successSaveModal: false
  });
      if(this.query.get('sfid'))
    {
    this.props.history.push(`/projectlist?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`);
    }else{
      this.props.history.push(`/projectlist?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`);
    }
}
  appendChecklistParameter = () => {
    if (this.state.checklistField !== '') {
      const header = {
        "Content-Type": 'application/json',
        token: localStorage.getItem('token')
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      //GO TO REQUEST STATE
      this.AddChecklistParamId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        'bx_block_dashboard/error_checklist'
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const data = {
        "error_checklist": {
          "template_id": this.query.get('tid'),
          "client_id": this.query.get('cid'),
          "client_subfolder_id": this.query.get('sfid') ? this.query.get('sfid') : "",
          "error_parameter": this.state.checklistField          // Common for all
          // "designer": true,                   // Solar Template  Valid values true / false.
          // "qc": "0",                          // Solar Template  Valid values "0"/"1"
          // "action_taken": "Yes",              // Fire Template.  Valid values "Yes"/"No"
          // "remarks": "Test"                   // Fire Template.
        }
      };

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        'POST'
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  }

  editChecklistParameter = () => {
    if (this.state.checklistField !== '') {
      const header = {
        "Content-Type": 'application/json',
        token: localStorage.getItem('token')
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      //GO TO REQUEST STATE
      this.editChecklistParamId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_dashboard/error_checklist/${this.state.editId}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      const data = {
        "error_checklist": {
          "error_parameter": this.state.checklistField             // Common for all
          // "designer": false,                   // Solar Template  Valid values true / false.
          // "qc": "1",                          // Solar Template  Valid values "0"/"1"
          // "action_taken": null,              // Fire Template.  Valid values "Yes"/"No"
          // "remarks": null                   // Fire Template.
        }
      };
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        'PUT'
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  }

  deleteChecklistParameter = (id: string) => {
      this.setState({ openAddChecklistParam: false });
      const header = {
        "Content-Type": 'application/json',
        token: localStorage.getItem('token')
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      //GO TO REQUEST STATE
      this.deleteCheckListParamId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_dashboard/error_checklist/${id}`
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
      return true;
  }

  getChecklistData = () => {
    const header = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getChecklistCSVId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_dashboard/error_checklist/list"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    const data = {
      "error_checklist": {
        "template_id": this.query.get('tid'),
        "client_id": Number(this.query.get('cid')),
        "client_subfolder_id": this.query.get('sfid') ? Number(this.query.get('sfid')) : null
      }
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  downloadCSV = async (url:any, name:any) => {
    const response = await fetch(url);
    const data = await response.text();
    const blob = new Blob([data], { type: "data:text/csv;charset=utf-8," });
    const blobURL = window.URL.createObjectURL(blob);

    // Create new tag for download file
    const anchor = document.createElement("a");
    anchor.download = name;
    anchor.href = blobURL;
    anchor.dataset.downloadurl = ["text/csv", anchor.download, anchor.href].join(
      ":"
    );
    anchor.click();

    // Remove URL.createObjectURL. The browser should not save the reference to the file.
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      URL.revokeObjectURL(blobURL);
    }, 100);
  };
  downloadSampleCSV =()=>{
    const header = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.downloadCompeleteData = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_dashboard/error_checklist/list?download=true"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    const data = {
      "error_checklist": {
        "template_id": this.query.get('tid'),
        "client_id": Number(this.query.get('cid')),
        "client_subfolder_id": this.query.get('sfid') ? Number(this.query.get('sfid')) : null
      }
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  uploadCSV = (file:any) =>{
    let id = localStorage.getItem('templateId');
    const header = {
      'token': localStorage.getItem('token'),
      };
    let formData = new FormData();
    // @ts-ignore
    formData.append('template_id',id);
    formData.append('file',file);
    formData.append('client_id',this.query.get('cid'));
    if(this.query.get('sfid'))
    {
      formData.append('client_subfolder_id',this.query.get('sfid'))
    }
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.UploadCSVId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
    "/bx_block_taskallocator/import_checklists");
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),"POST"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  handleApiGetChecklistSucc = (responseJson:any)=>{
    if(responseJson?.data?.length > 0 ) {
      this.setState({
        errParameter: responseJson.data,
        loading: false
    });
    }
    else {
      this.setState({
        errParameter: [],
        loading: false
    });
    }
  }
  handleAddChecklistParamSucc = (responseJson:any)=>{
     this.getChecklistData();
    if (responseJson?.error?.error === "duplicate record found") {
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else{
      toast.success('Checklist parameter added successfully',{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
    }
    this.setState({checklistField:"", openAddChecklistParam: false})
  }
  handleDownloadCompelteData = (responseJson:any)=>{
    toast.success('Downloaded successfully',{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
   this.setState({downloadedData:responseJson?.file})
   this.downloadCSV(responseJson.file,"download.csv")
 }
  handleApiFailure = (responseJson:any)=>{
    toast.error(responseJson?.error,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
  }
  handleDownloadCompelteDataFail=(responseJson:any)=>{
    toast.error(responseJson?.error,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
  }
  handleAddChecklistParamFailure = (responseJson:any)=>{
    if(responseJson?.errors?.[0]?.error_parameter)
    {
      toast.error(responseJson?.errors?.[0]?.error_parameter,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000});
    }

  }
  handleUploadCSVSucc = (responseJson:any)=>{
    if(responseJson?.meta?.message==="file imported Successfully")
    {
      this.getChecklistData();
      toast.success('File Added Successfuly',{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
    }
    if (responseJson?.error === "duplicate record found") {
      this.setState({ displayParam: true, duplicateValue: responseJson.parameter });
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
  }
  handleUploadCSVFailure = (responseJson:any)=>{
    if(responseJson?.error==="duplicate record found")
    {
      this.setState({displayParam:true,duplicateValue:responseJson.parameter});
    }
    toast.error(responseJson.errors,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
  }
  handleEditParamSucc = (responseJson: any) => {
    this.setState({ isEdit: false, openAddChecklistParam: false });
    this.getChecklistData();
    this.closeChecklistModal();
    toast.success('Checklist Parameter updated successfully.', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
  }
  handleDeleteParamSucc = (responseJson: any) => {
    this.setState({ isEdit: false });
    this.getChecklistData();
    toast.success('Checklist Parameter deleted successfully.', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
  }
  handleEditParamFail = (responseJson: any) => {
    this.showApiError(responseJson);
  }
  showApiError = (responseJson: any) => {
    if (typeof responseJson?.errors == 'string') {
      toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if (typeof responseJson?.error == 'string') {
      toast.error(responseJson?.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if (responseJson?.errors?.[0]?.error_parameter) {
      toast.error(responseJson?.errors?.[0]?.error_parameter, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if (responseJson?.errors?.length) {
      responseJson?.errors?.map((i: string) => toast.error(JSON.stringify(i), { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 }))
    }
  }
  handleDeleteParamFail = (responseJson: any) => {
    this.showApiError(responseJson);
  }
  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on receive ===>" + JSON.stringify(message));
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )
      if (responseJson && !responseJson?.error && !responseJson?.errors) {
        switch (apiRequestCallId) {
          case this.getChecklistCSVId:
            return this.handleApiGetChecklistSucc(responseJson);
          case this.AddChecklistParamId:
            return this.handleAddChecklistParamSucc(responseJson);
          case this.UploadCSVId:
            return this.handleUploadCSVSucc(responseJson);
          case this.editChecklistParamId:
            return this.handleEditParamSucc(responseJson);
          case this.deleteCheckListParamId:
            return this.handleDeleteParamSucc(responseJson);
            case this.downloadCompeleteData:
              return this.handleDownloadCompelteData (responseJson)
          default:
            break;
        }
        this.setState({ loading: false })
      } else {
        switch (apiRequestCallId) {
          case this.getChecklistCSVId:
            return this.handleApiFailure(responseJson);
          case this.AddChecklistParamId:
            return this.handleAddChecklistParamFailure(responseJson);
          case this.UploadCSVId:
            return this.handleUploadCSVFailure(responseJson);
          case this.editChecklistParamId:
            return this.handleEditParamFail(responseJson);
          case this.deleteCheckListParamId:
            return this.handleDeleteParamFail(responseJson);
            case this.downloadCompeleteData:
              return this.handleDownloadCompelteDataFail(responseJson)
          default:
            break;
        }
        this.setState({ loading: false })
      }
    }
  }
}
