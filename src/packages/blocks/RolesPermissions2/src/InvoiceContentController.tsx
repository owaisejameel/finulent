import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { date } from "yup";

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");
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

  errorMsg: string;
  roleId: any;
  isSuccessModal: boolean;
  modalMsg: string;
  isEdit: boolean;
  termsandcondition: any;
  // companyname:string;
  invoiceData: any;

  accountNo: any;
  accountName: any;
  swiftCode: any;
  ifscCode: any;
  address: string;
  micrNo: string;
  companyName: string;
  taxPay:any;
  signature:any;
  companyAddress:string;
  imgSign:any;
  branchAddress:string;



  // Customizable Area End
}
interface SS {
  id: any;
}

export default class InvoiceContentController extends BlockComponent<
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
  invoiceApiCallId: string = "";
  updateInvoiceApiCallId :string="";

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
      invoiceData: [],
      errorMsg: '',
      roleId: "",
      isSuccessModal: false,
      modalMsg: "",
      isEdit: false,
      termsandcondition: "",
      companyName: "",
      accountNo: "",
      accountName: "",
      swiftCode: "",
      ifscCode: "",
      address: "",
      micrNo: "",
      taxPay:"",
      companyAddress:"",
      signature:null,
      imgSign:null,
      branchAddress:"",

      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({ isLoader: true })
    this.getInvoice()

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
  getInvoice(): boolean {
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
    this.invoiceApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_download/invoice/all_invoice`
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

  updateUser = () => {



    var formData = new FormData();
    formData.append("company_name", this.state.companyName);

    formData.append("address", this.state.companyAddress);
    formData.append("branch_address",this.state.branchAddress);
    formData.append("account_name", this.state.accountName);
    formData.append("account_number", this.state.accountNo);
    formData.append("micr_code", this.state.micrNo);
    formData.append("ifsc_code", this.state.ifscCode);
    formData.append("swift_code", this.state.swiftCode);
    formData.append("tax_payable", this.state.taxPay)

    {this.state.imgSign ? formData.append("signature",this.state.imgSign): "" }



    const header = {
      'token': window.localStorage.getItem('token'),

    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateInvoiceApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_download/invoice/update_invoice`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
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

      if (this.invoiceApiCallId === apiRequestCallId) {

        if (responseJson && !responseJson.errors) {

          if (responseJson.data?.data?.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
              invoiceData: responseJson.data,
              accountName: responseJson?.data[0]?.attributes.account_name,
              companyAddress:responseJson?.data[0]?.attributes.address,
              companyName: responseJson?.data[0]?.attributes.company_name,
              ifscCode: responseJson?.data[0]?.attributes.ifsc_code,
              swiftCode: responseJson?.data[0]?.attributes.swift_code,

              micrNo: responseJson?.data[0]?.attributes.micr_code,
              accountNo: responseJson?.data[0]?.attributes.account_number,
              signature:configJSONBase.baseURL+responseJson?.data[0]?.attributes.signature,
              branchAddress:responseJson?.data[0]?.attributes.branch_address,

              errorMsg: "",
              taxPay:responseJson.data[0]?.attributes.tax_payable,
              loading: false,
              isLoader: false
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
      if (apiRequestCallId === this.updateInvoiceApiCallId ) {

        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in Updating the User."
            });
          } else {

            this.setState(
              {
                invoiceData: responseJson.data.attributes,
                taxPay:responseJson.data.attributes.tax_payable,
                modalMsg:"Updated Successfully!",
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


      //
    }
    // Customizable Area End
  }

  // Customizable Area Start


  // Customizable Area End
}
