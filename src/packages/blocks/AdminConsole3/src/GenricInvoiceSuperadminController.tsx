import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import moment from "moment";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
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
  projectDate: any;
  projectId: any;
  projectName: any;
  projectAmount: any;
  selectedProjectType: any;
  isSelectedProjectTypeError: boolean;
  isProjectDateError: boolean;
  isProjectIdError: boolean;
  isProjectNameError: boolean;
  isProjectAmountError: boolean;
  pageType: boolean;
  open: boolean;
  invoiceData: any;
  projectTypes: any;
  invoiceComment:any;
  copy_invoiceComment:any;
  defineInvoiceId:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start

  // Customizable Area End
}

export default class GenricInvoiceSuperadminController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getInvoicDataApiCallId: string = "";
  deleteProjectApiCallId: string = "";
  addNewProjectApiCallId: string = "";
  getAllProjectTypeApiCallId: string = "";
  updateCommentApiCallId: string = "";
  query: any = new URLSearchParams(this.props.history?.location?.search);

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      invoiceComment: "",
      copy_invoiceComment: "",
      defineInvoiceId: "",
      pageType: true,
      selectedProjectType: "",
      isSelectedProjectTypeError: false,
      open: false,
      projectDate: "",
      projectId: "",
      projectName: "",
      projectAmount: "",
      isProjectDateError: false,
      isProjectIdError: false,
      isProjectNameError: false,
      isProjectAmountError: false,
      projectTypes: [],
      invoiceData: {
        data: {
          id: "1",
          type: "invoice_data",
          attributes: {
            generate_invoices: {
              id: 1,
              from_date: "2000-01-01",
              to_date: "2023-02-01",
              define_invoice_id: 1,
              overdue_date: "2022-02-02",
              invoice_amount: "93.8",
              finulent_admin: 2,
              invoice_status: "Draft",
              created_at: "2022-12-29T08:59:08.892Z",
              updated_at: "2022-12-29T08:59:08.892Z",
              client_id: 1,
              invoice_id: "FS LLP/22-23/678",
            },
            from_date: "2000-01-01",
            to_date: "2023-02-01",
            define_invoices: {
              id: 1,
              client_name: "dev test client",
              currency: "usd",
              invoice_frequency: "weekly",
              description: "creating invoice",
              additional_cost_per_file: "10",
              project_invoicing_structure: "project_creation_date",
              invoice_generation_method: "kw_structure",
              created_at: "2022-12-29T07:25:37.257Z",
              updated_at: "2022-12-29T07:25:37.257Z",
              cgst: "10",
              igst: "9",
              sgst: "8",
              other_tax: "7",
              client_managements_id: 1,
              current_invoicing_method: null,
            },
            all_projects: [
              {
                id: 1,
                generate_invoice_id: 1,
                project_date: "2005-03-07",
                project_id: "9292",
                project_name: "my first project",
                project_type: "Fresh",
                amount: null,
                type_side_elevation: null,
                kw: "kw_structure",
                created_at: "2022-12-29T08:59:08.974Z",
                updated_at: "2022-12-29T08:59:08.974Z",
                add_project_id: 1,
              },
            ],
            billing_amount: 93.8,
            tax_details: [
              {
                cgst: 8,
                sgst: 6,
                igst: 7,
                other_tax: 5,
              },
            ],
            gross_total: 125.69,
            account_details: {
              id: 1,
              company_name: "Filnulent",
              address: "pune",
              account_id: 2,
              created_at: "2022-12-29T09:02:02.320Z",
              updated_at: "2022-12-29T09:02:02.320Z",
              account_name: "Finulent SBI",
              account_number: "12345678",
              micr_code: "1213456",
              ifsc_code: "bkid111222344",
              swift_code: "1111",
              branch_address: "pune",
              tax_payable: false,
              external_name: "dummy_invoice",
            },
          },
        },
      },
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();

    // Customizable Area Start
    if(this.query.get('isEdit')){
      this.setState({pageType:false})
    }
    this.getInvoiceData();
    this.getProjectTypes(this.query.get('clientId'));
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
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      this.getInvoicDataApiCall(apiRequestCallId,responseJson);
      this.deleteProjectApiCall(apiRequestCallId);
      this.addNewProjectApiCall(apiRequestCallId);
    

      if(responseJson && apiRequestCallId ==this.updateCommentApiCallId){
        console.log('updateCommentApiCallId',responseJson);
      }
      if(responseJson && apiRequestCallId ==this.getAllProjectTypeApiCallId){
        if(Array.isArray(responseJson)){
         this.setState({projectTypes: responseJson})   
        }
      }
    }
    // Customizable Area End
  }
  
  getInvoicDataApiCall=(apiRequestCallId:any, responseJson:any)=>{
if (apiRequestCallId === this.getInvoicDataApiCallId) {
        if (responseJson?.data) {
          this.setState({
            invoiceData: responseJson?.data,
            invoiceComment: responseJson?.data?.attributes?.define_invoices?.description ? responseJson.data.attributes.define_invoices.description : "",
            copy_invoiceComment: responseJson?.data?.attributes?.define_invoices?.description ? responseJson.data.attributes.define_invoices.description : "",
            defineInvoiceId: responseJson?.data?.attributes?.define_invoices?.id
        });
        }
      }
  }
deleteProjectApiCall=(apiRequestCallId:any)=>{
 if (apiRequestCallId === this.deleteProjectApiCallId) {
        this.getInvoiceData();
      }
}
addNewProjectApiCall=(apiRequestCallId:any)=>{
  if (apiRequestCallId === this.addNewProjectApiCallId) {        
        this.handleClose();
        this.getInvoiceData();
      }
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

  handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false,
      selectedProjectType: "",
      isSelectedProjectTypeError: false,
      projectDate: "",
      projectId: "",
      projectName: "",
      projectAmount: "",
      isProjectDateError: false,
      isProjectIdError: false,
      isProjectNameError: false,
      isProjectAmountError: false, });
  };

  getProjectTypes =(clientManagementsId:any) => {

    if(!clientManagementsId){
      return;
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/json',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getAllProjectTypeApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getAllProjectType+`?client_managements_id=${clientManagementsId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  switchToEdit = () => {
    this.setState({ pageType: false });
  };

  switchToViewForCancel = () => {
    this.setState({ pageType: true, invoiceComment: this.state.copy_invoiceComment });
  };

  switchToViewForSave = () => {
    this.editComment();
    this.setState({ pageType: true });
  };


  editComment = () => {

    if(!this.state.defineInvoiceId){
      return;
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "content-type": "application/json"
    };

    let reqBody:any = {
            id: this.state.defineInvoiceId,
            comment: this.state.invoiceComment
    };

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.updateCommentApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`bx_block_invoicebilling/define_invoice/comment_edit`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),JSON.stringify(reqBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"PUT");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }

  handleBack = () => {
    if (this.state.pageType) {
      this.props.history.push(`/client_invoices_superadmin?clientId=${this.query.get('clientId')}`);
    } else {
      this.setState({ pageType: true });
    }
  };
  getInvoiceData = () => {
    // Customizable Area Start
    const header = {
      token: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getInvoicDataApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/define_invoice/get_invoice_data?generate_invoice_id="+this.query.get('id')
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
  };

  deleteProject = (id:any) => {
    // Customizable Area Start
    if(!id){
      return;
    }

    const header = {
      token: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteProjectApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/define_invoice/delete_project?id="+id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  addNewProject = () => {

    let isError = false;

    if(this.state.selectedProjectType == ""){
      this.setState({isSelectedProjectTypeError: true});
      isError = true;
    }
    if(this.state.projectDate == ""){
      this.setState({isProjectDateError: true});
      isError = true;
    }
    if(this.state.projectId == ""){
      this.setState({isProjectIdError: true});
      isError = true;
    }
    if(this.state.projectName == ""){
      this.setState({isProjectNameError: true});
      isError = true;
    }
    if(this.state.projectAmount == ""){
      this.setState({isProjectAmountError: true});
      isError = true;
    }

    if(isError){
      return;
    }

    const header = {
      token: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const body = {
      generate_invoice_id: this.query.get('id'),
      project_date: moment(this.state.projectDate).format("YYYY-MM-DD"),
      project_id: this.state.projectId,
      project_name: this.state.projectName,
      project_type: this.state.selectedProjectType,
      amount: this.state.projectAmount,
      type_side_elevation: "",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addNewProjectApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/define_invoice/project_add"
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
  // Customizable Area End
}
