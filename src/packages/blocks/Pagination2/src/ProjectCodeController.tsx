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
  desc:string;

  errorMsg: string;
  roleId:any;
  isSuccessModal:boolean;
  modalMsg:string;
  isEdit:boolean;
  termsandcondition:any;
  companyname:string;
  invoiceData:any;
  projectcodeData:any;
  selectedName:string;
  workspaceId:string;
  projectCode:any;
  codeData:any;
  removeData:any;
  selectedCode:any;
  test:any;
  page:boolean;
  newCode:any;
  newInitial: any;
  sameCode:boolean;


  // Customizable Area End
}
interface SS {
  id: any;
}

export default class  ProjectCodeContentController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  roleApiCallId:string="";
  editroleApiCallId:string="";
  updateTermsConditionApiCallId:string="";
  termsandconditionApiCallId:string="";
  invoiceApiCallId:string="";
  projectcodeApiCallId:string="";
  addprojectcodeApiCallId:string="";
  codeByIdApiCallId:string="";
  deleteCodesCallId:string=""

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
      desc:"",
      projectcodeData:[],
      invoiceData:[],
      errorMsg: '',
      roleId:"",
      isSuccessModal:false,
      modalMsg:"",
      isEdit:false,
      termsandcondition:"",
      companyname:"",
      selectedName:"",
      workspaceId:"",
      projectCode:"",
      codeData:[],
      removeData:[],
      selectedCode:"",
      test:[],
      page:true,
      newCode:[],
      newInitial: [],
      sameCode:false,

      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({isLoader:true})
    this. getProjectCode()
    this.getToken();



    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }

    // Customizable Area Start
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  getProjectCode(): boolean {
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
    this.projectcodeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `workspace_project_code`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"

    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  handleAddProjectCodeAction = () => {
    console.log("api call started *************");
       const body={
        workspace_id:this.state.workspaceId,
        project_code:this.state.newCode
       }


    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addprojectcodeApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "create_project_code"
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

  getProjectCodeById(id:any): boolean {
    console.log("HERE IN THE CAl")
    // Customizable Area Start
    const body={

      workspace_id:id
     }
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.codeByIdApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `project_code_list?workspace_id=${id}`
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
  deleteCodes(): boolean {
    // Customizable Area Start
    const body={
      project_code: this.state.removeData,
      workspace_id: this.state.workspaceId.toString()
    }
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjExNzU2NDcsInRva2VuX3R5cGUiOiJsb2dpbiJ9.bzaCwsk1Dyn2Ua42wMhn8zR89Jm_mNOkIhb3EOb1CT7Tr-rlh70rX4dReOlju0vH5ggntnr7WVppzmCGWLNS-w",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteCodesCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `delete_project_code`
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

      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.projectcodeApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GETTERMS  FROMAPI");
        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            console.log("HERE IN THE INVOICE", responseJson)
            this.setState({
             projectcodeData: responseJson,

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
      if (apiRequestCallId === this.addprojectcodeApiCallId) {

        if (responseJson ||  responseJson.errors && responseJson.data) {
          console.log("Here")
          if (Object.keys(responseJson ).length=== 0 ||responseJson.message) {

            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Project Code Already Exists!",
              codeData: this.state.newInitial,
              newCode: "",
              isSuccessModal:true,
            });
          } else {



            this.setState(
              {

                modalMsg:"Added Successfully!",
                isSuccessModal:true,
                newCode:"",
                errorMsg: "",
                loading: false,
              },

              () => console.log( "Response *****")
            );
          }
        } else {
          let errorReponse = message.getData(
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
      if (this.codeByIdApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GETTERMS  FROMAPI");
        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            console.log("HERE IN THE INVOICE", responseJson[0])
            this.setState({
            codeData: responseJson,
            newInitial: responseJson,
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
      if (this.deleteCodesCallId === apiRequestCallId) {
        console.log("U there **********", responseJson, "Thr");
        if (responseJson && !responseJson.errors && responseJson) {
          if (responseJson === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in delete!."
            });
          } else {

            const data= this.state.codeData

             const rowData = data.filter((item:any) => !responseJson.includes(item))
            console.log(rowData,"rowdaat")
            this.setState(
              {

                modalMsg:"Deleted Successfully!",
                codeData:rowData,
                isSuccessModal:true,
                removeData:"",
                errorMsg: "",
                loading: false,
              },

              () => console.log("Console")

            );
          }
        } else {
          let errorReponse = message.getData(
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
