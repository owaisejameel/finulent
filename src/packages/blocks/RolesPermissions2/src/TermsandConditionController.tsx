import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { date } from "yup";
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';


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


  isLoader: boolean;
  loading: boolean;
  token: string;
  open: boolean;
  title: string;
  desc: string;
  rolesData: any;
  errorMsg: string;
  roleId: any;
  isSuccessModal: boolean;
  modalMsg: string;
  isEdit: boolean;
  termsandcondition: any;
  editorState: any;
  normaltext:any;

  // Customizable Area End
}
interface SS {
  id: any;
}

export default class TermsandConditionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  roleApiCallId: string = "";
  editroleApiCallId: string = "";
  updateTermsConditionApiCallId: string = "";
  termsandconditionApiCallId: string = "";

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


      loading: false,
      isLoader: true,
      token: "",
      open: false,
      title: "",
      desc: "",
      rolesData: [],
      errorMsg: '',
      roleId: "",
      isSuccessModal: false,
      modalMsg: "",
      isEdit: false,
      termsandcondition: "",
      editorState: '',
      normaltext:""

      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({ isLoader: true })
    //    this.getRoles();
    this.getTermsandCondition()
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
  getTermsandCondition(): boolean {
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
    this.termsandconditionApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_profile_bio/terms_and_condition/all_terms`
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
  updateTermsConditions = () => {

    let data = convertToHTML(this.state.termsandcondition.getCurrentContent())
    console.log(data,"data")
    const body = {

      description: data
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

    this.updateTermsConditionApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_profile_bio/terms_and_condition/update_terms`
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

      if (this.termsandconditionApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GETTERMS  FROMAPI");
        if (responseJson && !responseJson.errors) {

          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
              termsandcondition: EditorState.createWithContent(
                stateFromHTML(responseJson.data[0]?.attributes.description)),

              errorMsg: "",
              normaltext:responseJson.data[0]?.attributes.description,
              loading: false,
              isLoader: false,
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
      if (apiRequestCallId === this.updateTermsConditionApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg: "Error in Updating the User."
            });
          } else {
            console.log("INTHE ELSE ")
            const rowData = this.state.termsandcondition

            const apiData = responseJson.data;
            console.log("API DATA IN RESPONSE", apiData)
            // apiData.slNo = this.state.usersData.length + 1;

            // const result = rowData.map((item: any) => item.id == apiData.id ? { ...item, description: apiData.description } : item)

            this.setState(
              {
                termsandcondition: EditorState.createWithContent(
                  stateFromHTML(responseJson.data?.attributes?.description)) ,
                // usersData: result,
                modalMsg: "Updated Successfully",
                normaltext:responseJson.data?.attributes?.description,
                isSuccessModal: true,
                //  activation_status:responseJson.data.attributes.activation_status,
                errorMsg: "",
                loading: false,
              },

              () => console.log(this.state.rolesData, "Response *****")
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
