import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { date } from "yup";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  token: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start


  // success:boolean,


  isLoader:boolean;
  loading: boolean;
  token: string;
  open:boolean;
  title:string;
  errorMsg: string;
  roleId:any;
  isSuccessModal:boolean;
  modalMsg:string;
  isEdit:boolean;


  invoiceData:any;
  projectcodeData:any;
  selectedName:string;
  workspaceId:any;
  projectCode:string;
  templateData:any;
  allTypeAndCode:any;
  typeName:string;
  colorsData:any;
  selectedColor:any;
  templateName:string;
  allData:any;
  projectId:any;
  subEdit:boolean;
  page:boolean;
  templateErr:boolean;
  templateId:any;
  deleteId:any;

  // Customizable Area End
}
interface SS {
  id: any;
}

export default class  ProjectTypeContentController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start

  getTypeAndCodeApiCallId:string="";

  getTemplateApiCallId:string="";
  getAllColorApiCallId :string="";
  addProjectTypeApiCallId:string="";
  getTemplateDataApiCallId:string="";
  updateProjectTypeApiCallId:string="";
  deleteProjectTypeApiCallId :string="";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {


       loading:false,
      isLoader:true,
      token:"",
      open:false,
      title:"",

      projectcodeData:[],
      invoiceData:[],
      errorMsg: '',
      roleId:"",
      isSuccessModal:false,
      modalMsg:"",
      isEdit:false,


      selectedName:"",
      workspaceId:"",
      projectCode:"",
      allTypeAndCode:[],
      typeName:"",
      colorsData:[],
      templateData:[],
      selectedColor:"",
      templateName:"",
      allData:[],
      projectId:"",
      subEdit:false,
      page:true,
      templateErr:false,
      templateId:"",
      deleteId:""
      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({isLoader:true})
    // this.getAllTypeAndCode()
    this.getAllTemplate()
    this.getAllColorCode()
    this.getDataByTemplateName(3)
    this.getToken();



    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // this.setState({isLoader:false})
    // Customizable Area Start
    this.setState({templateId:3})

    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  getDataByTemplateName(id:any): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getTemplateDataApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/type_of_project?template_id=${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  getAllTemplate(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getTemplateApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/templates`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  updateProjectType = () => {

   const body={
    template_id:this.state.templateId,
    // template_name:this.state.templateName,
    project_type: this.state.typeName,
    colour: this.state.selectedColor
   }
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTgsImV4cCI6MTY1OTczNTI5NiwidG9rZW5fdHlwZSI6ImxvZ2luIn0.08O-3I9QAjbP4xcAN5a8KR7VbAQDqwRwasDh8a893w3sEQ9g0xveUuxkmQbbmv3ZhqvjiZ22B_tmVfmiukDCLweyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjcsImV4cCI6MTY5MTQ4ODk5NCwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.enaKYnHWPVmn01eC6pLqtE_OT5HU8jgMb43lH7UAl2E5OLS_eyeNbwXuSiLJyB56ag0NJBxR8vfR4m_edmn7Yg",
      "Content-Type": 'application/JSON',
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateProjectTypeApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_dashboard/type_of_project/${this.state.projectId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  addProjectTypeAction = () => {

       const body={
        template_id: this.state.templateId,
    project_type: this.state.typeName,
    colour: this.state.selectedColor
       }


    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addProjectTypeApiCallId= requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_dashboard/type_of_project"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  getAllColorCode(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllColorApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/colour_code`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  deleteProjectType(id:any): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjExNzU2NDcsInRva2VuX3R5cGUiOiJsb2dpbiJ9.bzaCwsk1Dyn2Ua42wMhn8zR89Jm_mNOkIhb3EOb1CT7Tr-rlh70rX4dReOlju0vH5ggntnr7WVppzmCGWLNS-w",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteProjectTypeApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/type_of_project/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true }, () => {
        // this.getDashboardData();
        // this.getsignUpData();
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.getTypeAndCodeApiCallId === apiRequestCallId) {

        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({

              errorMsg: "",
              loading: false,
              isLoader:false
            });
          }
        } else {
          const errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );

          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }

      if (this.getTemplateApiCallId === apiRequestCallId) {

        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
             templateData: responseJson.data,
              errorMsg: "",
              loading: false,
              isLoader:false
            });
          }
        } else {
          const errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );

          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }
      if (this.getAllColorApiCallId === apiRequestCallId) {

        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
             colorsData: responseJson.data,
              errorMsg: "",
              loading: false,
              isLoader:false
            });
          }
        } else {
          const errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );

          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }
      if (apiRequestCallId === this.addProjectTypeApiCallId) {

        if (responseJson || !responseJson.errors && responseJson.data) {

          if ( responseJson?.errors?.length) {

            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Project Type Already Exists.",
              isSuccessModal: true
            });
          } else {

            const apiData = responseJson.data;

            this.setState(
              {
                allData: [...this.state.allData,apiData],
                // newData: result,
                modalMsg:"Added Successfully!",
                isSuccessModal:true,

                errorMsg: "",
                loading: false,
              },


            );
          }
        } else {
          var errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );
          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }
      if (this.getTemplateDataApiCallId=== apiRequestCallId) {

        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
            allData: responseJson.data,
              errorMsg: "",
              loading: false,
              isLoader:false
            });
          }
        } else {
          const errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );

          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }
      if (apiRequestCallId === this.updateProjectTypeApiCallId) {

        if (responseJson) {

          if ( responseJson.errors) {

            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Project Type Already Exists.",
              isSuccessModal:true
            });
          } else {

            const rowData = this.state.allData

            const apiData = responseJson?.data;


            const result = rowData?.map((item:any)=>
              item?.id === apiData?.id?{...item, attributes:{...item?.attributes,project_type:apiData?.attributes?.project_type,colour:apiData?.attributes?.colour}}:item
          )



            this.setState(
              {
                allData: result,

                modalMsg:"Updated Successfully!",
                isSuccessModal: true,

                errorMsg: "",
                loading: false,
              },


            );
          }
        } else {
          var errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );
          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }
      if (this.deleteProjectTypeApiCallId  === apiRequestCallId) {

        if (responseJson || !responseJson.errors && responseJson) {
          if (Object.keys(responseJson ).length=== 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in delete ."
            });
          } else {

             const rowData = this.state.allData.filter((item:any) => item.id!= this.state.deleteId)
            this.setState(
              {

                modalMsg:"Deleted Succesfully!",
                isSuccessModal:true,
                allData:rowData,

                errorMsg: "",
                loading: false,
              },



            );
          }
        } else {
          var errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );
          if (errorReponse === undefined) {
            this.setState({
              errorMsg: "Something went wrong",
              loading: false,
            });
          } else {
            this.setState({
              errorMsg: errorReponse,
              loading: false,
            });
          }
        }
      }


      //
    }
    // Customizable Area End
  }

  // Customizable Area Start


  // Customizable Area End
}
