import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");
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
  duplicateParam: boolean;
  parameterModal: any;
  openAddChecklistParam: boolean;
  checklistField: string;
  sampleData:any;

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChecklistController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start

  UploadCSVId: string = ''
  downloadSampleData:string=''
  query: any = new URLSearchParams(this.props.history?.location?.search);
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.downloadSampleCSV = this.downloadSampleCSV.bind(this)
    this.uploadCSV = this.uploadCSV.bind(this)
    this.closeChecklistModal = this.closeChecklistModal.bind(this)

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      duplicateParam: false,
      parameterModal: [],
      openAddChecklistParam: false,
      checklistField: '',
      sampleData:''
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }



  downloadSampleCSV =()=>{
    const header = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.downloadSampleData = requestMessage.messageId;

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
  closeChecklistModal = () => {
    this.setState({
      duplicateParam: false,
      parameterModal:[]
    })
  }
  uploadCSV = (file: any) => {
    let id = this.query.get('tid');
    const header = {
      'token': localStorage.getItem('token'),
    };
    let formData = new FormData();
    // @ts-ignore
    formData.append('template_id', id);
    formData.append('file', file);
    formData.append('client_id',this.query.get('cid'));
    if(this.query.get('sfid'))
    {
      formData.append('client_subfolder_id',this.query.get('sfid'))
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.UploadCSVId = requestMessage.messageId;

    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_taskallocator/import_checklists");

      requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage), formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage), "POST"
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

  handleUploadCSVIdSuccessRes = (responseJson: any) => {
    console.log(responseJson);
    if (responseJson?.meta?.message === "file imported Successfully") {
      toast.success('File Added Successfuly', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
      if(this.query.get('sfid'))
      {
      this.props.history.push(`/definechecktable?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`)
      }else{
        this.props.history.push(`/definechecktable?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)
      }
    }
    if (responseJson?.error === "duplicate record found") {
      this.setState({ duplicateParam: true, parameterModal: responseJson.parameter });
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
  }
  handleDownloadSampleData =(responseJson:any) =>{
    toast.success('Downloaded sample  successfully',{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
    this.setState({sampleData:responseJson?.file})
    this.downloadCSV(responseJson?.file,'downloadsample.csv')
  }
  handleDownloadSampleDataFail=(responseJson:any)=>{
    // toast.success('Downloaded successfully',{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
    toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
  }


  handleUploadCSVIdFailureRes = (responseJson:any) => {
    if (responseJson?.error === "duplicate record found") {
      this.setState({ duplicateParam: true, parameterModal: responseJson.parameter });
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }else{
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }


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
      if (responseJson && !responseJson?.error && !responseJson?.errors) {
        if (this.UploadCSVId === apiRequestCallId) {
        this.handleUploadCSVIdSuccessRes(responseJson);
        }
        else if (this.downloadSampleData=== apiRequestCallId) {
          this.handleDownloadSampleData(responseJson);
        }
      }
      else {
        if (this.UploadCSVId === apiRequestCallId) {
          this.handleUploadCSVIdFailureRes(responseJson);
        }
        else if (this.downloadSampleData=== apiRequestCallId) {
          this.handleDownloadSampleDataFail(responseJson);
        }
      }
    }
    // Customizable Area End
  }
}
