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
  designationData:any;
  errorMsg: string;
  designationId:any;
  isSuccessModal:boolean;
  modalMsg:string;
  isEdit:boolean;
  page:boolean;
//   open:boolean;

  // Customizable Area End
}
interface SS {
  id: any;
}

export default class  InAppNotificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  designationApiCallId:string="";
  editroleApiCallId:string="";
  updateDesignationApiCallId:string="";
  addDesignationApiCallId:string="";
  deleteDesignationApiCallId:string="";

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
      designationData:[],
      errorMsg: '',
      designationId:"",
      isSuccessModal:false,
      modalMsg:"",
      isEdit:false,
      page:true,
    //   open:false,
    //   isLoader:true

      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({isLoader:true})
   this.getDesignation();
    console.log(this.props, "USER PROPS");
    this.getToken();



    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // this.setState({isLoader:false})
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  getDesignation(): boolean {
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
    this.designationApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_favourites/designer/all_designation`
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
  updateDesignation = () => {

   const body={
    id:this.state.designationId,
    name:this.state.title
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

    this.updateDesignationApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_favourites/designer/update_designation`
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
  handleAddDesignationAction = () => {
    console.log("api call started *************");
       const body={

        name:this.state.title
       }


    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addDesignationApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_favourites/designer/create_designation"
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
  deleteDesignation(id:any): boolean {
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

    this.deleteDesignationApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_favourites/designer/delete_designation?id=${id}`
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

      if (this.designationApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GET ROLES FROMAPI");
        if (responseJson && !responseJson.errors) {

          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
              designationData: responseJson,
              isLoader:false,
              errorMsg: "",
              loading: false,
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
      if (apiRequestCallId === this.updateDesignationApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson) {
          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in Updating the User."
            });
          } else {

            const rowData = this.state.designationData

            const apiData = responseJson;
            console.log("API DATA IN RESPONSE", apiData)
            // apiData.slNo = this.state.usersData.length + 1;
            const result=rowData.map((item:any)=>item.id == apiData.id? {...item, name:apiData.name}:item)

            // const result=this.state.designationData.filter((item:any) => item.id!= this.state.designationId)

            this.setState(
              {
                designationData: result,
                // usersData: result,
                modalMsg:"Updated Succesfully",
                isSuccessModal: true,
              //  activation_status:responseJson.data.attributes.activation_status,
                errorMsg: "",
                loading: false,
              },

              () => console.log(this.state.designationData)
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
      if (apiRequestCallId === this.addDesignationApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson || !responseJson.errors && responseJson.data) {
          if (Object.keys(responseJson ).length=== 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in Updating the User."
            });
          } else {

            const apiData = responseJson;
            console.log(apiData, "API@#")
            // apiData.slNo = this.state.usersData.length + 1;
            // console.log(apiData, "APUI DATA")
            // const result=rowData.map((item:any)=>item.id == apiData.id? {...item, name:apiData.name}:item)
            // console.log(result," RESULT NEW")
            // console.log(result, "RESULT IN API TEST")
          //  const rowData=  [...this.state.designationData, apiData]
           console.log("BEFORE SETSTATE")
            this.setState(
              {
                designationData: [...this.state.designationData,apiData],
                // newData: result,
                modalMsg:"Added Succesfully",
                isSuccessModal:true,

                errorMsg: "",
                loading: false,
              },

              () => console.log( "Response *****")
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
      if (this.deleteDesignationApiCallId === apiRequestCallId) {
        console.log("U there **********", responseJson);
        if (responseJson || !responseJson.errors && responseJson) {
          if (Object.keys(responseJson ).length=== 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in delete ."
            });
          } else {
            console.log("HERE IN ELSE DES")
             const rowData = this.state.designationData.filter((item:any) => item.id!= this.state.designationId)
            this.setState(
              {
                // deletedData: responseJson,
                modalMsg:"Deleted Succesfully!",
                isSuccessModal:true,
                designationData:rowData,

                errorMsg: "",
                loading: false,
              },

              () => console.log("Console")
              // { const rowData = this.state.usersData.filter((item:any) => item.id!= this.state.userId)
              //   this.setState({usersData:rowData})}
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
