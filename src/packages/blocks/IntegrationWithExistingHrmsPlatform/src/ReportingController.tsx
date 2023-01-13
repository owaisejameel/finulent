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
  editTemplate: boolean;
  editTemplateName: string;
  getTemplatesDetail: any;
  editTemplateDesc: string;
  editTemplateId: string;
  editImg: any;
  sequenceData: any,
  sequenceDataCopy: any,
  // Customizable Area End
}
interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ReportingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  ApiGetTemplateId: string = "";
  ApiUpdateTemplateId: string = "";
  ApiUpdateTemplateImgId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.getTemplates = this.getTemplates.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.updateTemplateImg = this.updateTemplateImg.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      // Customizable Area Start
      editTemplate: false,
      editTemplateName: "",
      getTemplatesDetail: [],
      editTemplateDesc: "",
      editTemplateId: "",
      editImg: {},
      sequenceData: [],
      sequenceDataCopy: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    this.getTemplates();
  }
  // Customizable Area Start
  getFields = async () => {
    fetch(
      `${configJSONBase.baseURL}/bx_block_taskallocator/subtemplates/${localStorage.getItem(
        "templateId"
      )}`,

      {
        //@ts-ignore
        headers: {
          Content_Type: "Application/json",
          token: localStorage.getItem("token"),
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.data);
        this.setState({
          sequenceData: data.data,
          sequenceDataCopy: data.data,
        //   sequenceLoader: false,
        //   openAddField: false,
        });
      });
  };
  // Customizable Area End
  getTemplates = ()=>{
    const header = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.ApiGetTemplateId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_dashboard/templates"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  updateTemplateImg = (img:any) =>{
    let formData = new FormData();
      formData.append('image',img);
      formData.append('title',this.state.editTemplateName);
      formData.append('description',this.state.editTemplateDesc);
      const header = {
        token: localStorage.getItem("token"),
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.ApiUpdateTemplateImgId = requestMessage.messageId;
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_dashboard/templates/${this.state.editTemplateId}`
          );
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
          );

          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),formData
          );
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),"PUT"
          );
          runEngine.sendMessage(requestMessage.id, requestMessage);

          return true;
  }
  updateTemplate = () =>{
    this.setState({editTemplate:false})
      let formData = new FormData();
      formData.append('title',this.state.editTemplateName);
      formData.append('description',this.state.editTemplateDesc);


    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
        this.ApiUpdateTemplateId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `bx_block_dashboard/templates/${this.state.editTemplateId}`
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );

        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),formData
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),"PUT"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
  }
  async receive(from: string, message: Message) {
        // Customizable Area Start

        runEngine.debugLog("on recieive==>" + JSON.stringify(message));
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
              getName(MessageEnum.RestAPIResponceDataMessage)
            );
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
              );



            console.log(responseJson);
            if (responseJson && !responseJson?.errors) {
                if(this.ApiGetTemplateId===apiRequestCallId){
                    this.setState({getTemplatesDetail:responseJson.data});
                }else if(this.ApiUpdateTemplateId === apiRequestCallId){
                  console.log(responseJson);
                  toast.success('Template Edited Successfully',{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
                  this.getTemplates();
                }else if(this.ApiUpdateTemplateImgId === apiRequestCallId){
                  console.log(responseJson);
                  this.setState({editImg:responseJson?.data?.attributes?.image})
                }
            }else
            {
                console.log(responseJson)
            }
        }
        // Customizable Area End
  }
}
