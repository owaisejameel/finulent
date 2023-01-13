import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

toast.configure();

// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  history?: any;

  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: any;
  signUpData: any;
  userData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  password: any;
  firstname: any;
  lastname: any;
  isErr: boolean;
  isValid: boolean;
  modalOpen: boolean;
  checkedB: boolean;
  isErrorPassword: boolean;
  initialPageLoad: boolean;
  page: boolean;
  birthDate: any;
  email: string;
  contactNo: string;
  confirmpwd: string;
  isSuccessModal: boolean;
  open: boolean;
  peopleOpen: boolean;
  genericModalOpen: boolean;
  fileData: any;
  genericModalClose: boolean;
  designation: string;
  role: string;
  desc: string;
  imageName: string;
  workspaceData: any;
  statusData: any;
  status: any;
  invoiceData: any;
  workspace: string;
  isErrorFirstName: boolean;
  isErrorLastName: boolean;
  isErrorEmail: boolean;
  isMenu: null | HTMLElement;
  isSubMenu: null | HTMLElement;
  apiData: any;
  message: string;
  modalBody: any;
  pageNo: any;
  rowsPerPage: number;
  search: string;
  rows: any;
  pageLoading: boolean;
  userId:any;
  deletedData:any;
  isEditMode:boolean;
  modalMsg:string;
  handleEdit:any;
  joiningDate:any;
  activeValueId:any;
  designationList:any;
  isChecked:boolean;
  selectedWorkspace:any;
  userStatus:any;
  isCheckedFalse:any;
  isFilter:null | HTMLElement;
  isStatus:any;
  applyData:any;
  filterOpen:null | HTMLElement;
  isConfirm:boolean;
  modalVarient:string,
  initialTableLoad:boolean
  defineInvoiceModal:boolean;
  subfolderClientName:string;
  subfolderClientId:string;
  projectInvoicingStructure:string;
  fromDate:any;
  toDate:any;
  modalOverdueDate:string;
  modalFromDate:string;
  modalToDate:string;  
  isModalToDateError:boolean;
  isModalFromDateError:boolean;
  isModalOverdueDateError:boolean;
  toDateError:boolean;
  fromDateError: boolean;
  filterToDateError : boolean;


  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ClientInvoicesSuperadminController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  dashboardApiCallId: string = "";
  apiGetQueryStrinurl: string = "";
  signUpAPICallId: string = "";
  addUserApiCallId: string = "";
  workspaceApiCallId: string = "";
  roleApiCallId: string = "";
  invoicesApiCallId: string = "";
  invoicesStatusApiCallId: string = "";
  deleteApiCallId :string ="";
  updateUserApiCallId:string ="";
  updateStatusApiCallId:string="";
  getUserStatusApiCallId:string="";
  applyApiCallId :string="";
  designationApiCallId:string="";
  generateInvoiceApiCallId:string="";
  query: any = new URLSearchParams(this.props.history?.location?.search);
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
      dashboardData: [],
      userData: {},
      signUpData: [],
      errorMsg: "",
      token: "",
      password: "",
      isErr: false,
      isValid: false,
      firstname: "",
      lastname: "",
      loading: false,
      modalOpen: false,
      checkedB: false,
      isErrorPassword: false,
      initialPageLoad: true,
      page: true,
      birthDate: null,
      email: "",
      contactNo: "",
      confirmpwd: "",
      isSuccessModal: false,
      open: false,
      peopleOpen: false,
      genericModalOpen: false,
      genericModalClose: false,
      fileData: "",
      designation: "",
      role: "",
      desc: "",
      imageName: "",
      workspaceData: [],
      statusData: [],
      status: "",
      designationList:[],
      workspace: "",
      invoiceData: [],
      isErrorFirstName: false,
      isErrorLastName: false,
      isErrorEmail: false,
      isMenu: null,
      isSubMenu: null,
      apiData: [],
      message: "",
      modalBody: "",
      pageNo: 0,
      rowsPerPage: 10,
      search: "",
      rows: [],
      pageLoading: true,
      userId:"",
      deletedData:"",
      isEditMode:false,
      modalMsg:"",
      handleEdit:false,
      joiningDate:null,
      activeValueId:"",
      isChecked:false,
      userStatus:[],
      isCheckedFalse:false,
      filterOpen:null,
      isStatus:"",
      applyData:[],
      isFilter:null,
      isConfirm:false,
      selectedWorkspace:"",
      modalVarient:"success",
      initialTableLoad:false,
      defineInvoiceModal:false,
      subfolderClientName:"",
      subfolderClientId:"",
      projectInvoicingStructure:"",
      fromDate:"",
      toDate:"",
      modalToDate:"",
      modalFromDate:"",
      modalOverdueDate:"",
      isModalToDateError:false,
      isModalFromDateError:false,
      isModalOverdueDateError:false,
      toDateError : false,
      fromDateError : false,
      filterToDateError : false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    console.log(this.props, "USER PROPS");
    this.getToken();
    this.getInvoices();
    this.getInvoicesStatus();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.setState({
     subfolderClientName:this.query.get('clientName'),
subfolderClientId:this.query.get('subFolderClientId'),
projectInvoicingStructure:this.query.get('projectInvoicingStructure')
    })
    // Customizable Area End
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.userData != prevState.userData) {
      this.setState({ isSuccessModal: true });
    }


  }
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  updateUserStatus = (id:any, value:any) => {
   const body={
    account_id : id,
    activated: value==="Active"?"true":"false"
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

    this.updateStatusApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_activate`
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

  getWorkspaces(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
     "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.workspaceApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_workspace_management/workspaces"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
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

  getRoles(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.roleApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "all_role"
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

  getInvoicesStatus=()=> {
    
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.invoicesStatusApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/define_invoice/invoice_status"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
  }
  getInvoices(): boolean {
    
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.invoicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/define_invoice/client_invoice_list?client_managements_id="+this.query.get('clientId')
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  deleteUser(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
        "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    console.log("TEXT MESSAGE", this.state.userId)
    this.deleteApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `delete_account/${this.state.userId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "DELETE"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
 updateUser = () => {
    console.log("api call started *************");


    let formData = new FormData();
    formData.append("first_name", this.state.firstname);
    // @ts-ignore
    formData.append("last_name", this.state.lastname);
    formData.append("date_of_birth", this.state.birthDate);
    formData.append("full_phone_number", this.state.contactNo);
    formData.append("email", this.state.email);
    formData.append("description", this.state.desc);
    formData.append("designation", this.state.designation);
    formData.append("role_id", this.state.role);
    formData.append("joining_date", this.state.joiningDate)
    formData.append("workspace_id", this.state.workspace)

    const header = {
      'token': window.localStorage.getItem('token'),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateUserApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `update_account/${this.state.userId}`
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
  getUserStatus(id:any): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
       "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserStatusApiCallId= requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `show_account/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  getApply(): boolean {
    // Customizable Area Start
    
    let URL = `bx_block_invoicebilling/define_invoice/client_invoice_list?client_managements_id=${this.query.get('clientId')}&status=${this.state.status}`

    if(this.state.fromDate){
      URL = URL+`&from_date=${moment(this.state.fromDate).format('YYYY-MM-DD')}`
    }

    if(this.state.toDate){
      URL = URL+`&to_date=${moment(this.state.toDate).format('YYYY-MM-DD')}`
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.invoicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      URL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  getDesignations(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
       "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.designationApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_favourites/designer/all_designation"
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



  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      this.invoicesStatusApiCall(apiRequestCallId, responseJson, message)
      this.generateInvoiceApiCall(apiRequestCallId, responseJson, message)
      this.invoicesApiCall(apiRequestCallId, responseJson, message)
      this.applyApiCall(apiRequestCallId, responseJson, message)
      
    }
    // Customizable Area End
  }

  // Customizable Area Start

  invoicesStatusApiCall=(apiRequestCallId:any, responseJson:any, message:any)=>{
if (this.invoicesStatusApiCallId === apiRequestCallId) {

        if (responseJson && !responseJson.errors && responseJson) {

          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {                        
            this.setState({
              statusData:responseJson,
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
  }

  showToast=(message:any, isError?:any)=>{
    if(isError){
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return;
    }
    toast.success(message, {
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

  generateInvoiceApiCall=(apiRequestCallId:any, responseJson:any, message:any)=>{
if(this.generateInvoiceApiCallId == apiRequestCallId){
        if (responseJson?.message){
          this.showToast(responseJson.message, true)
        }else{
          this.showToast("Invoice is generated successfully", false)
          this.getInvoices();
          this.handleCloseDefineInvoiceModal();
        }
      }
  }
  invoicesApiCall=(apiRequestCallId:any, responseJson:any, message:any)=>{
if (this.invoicesApiCallId === apiRequestCallId) {
        if(responseJson?.message == "Record not found"){
          this.setState({
            invoiceData:[],
            errorMsg: responseJson?.message,
            loading: false,
          });
        }
        if (responseJson && !responseJson.errors && responseJson?.data) {
            if(responseJson?.data?.length > 0){

            const apiData = responseJson?.data?.map((item: any, index: any) => {
              item.slNo = index + 1;
              return item;
            });
            
            this.setState({
              invoiceData:apiData,
              errorMsg: "",
              loading: false,
            });
          }else{
            this.setState({
              errorMsg: "Data Not Found",
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
  }
  applyApiCall=(apiRequestCallId:any, responseJson:any, message:any)=>{
if (this.applyApiCallId === apiRequestCallId) {
        if (responseJson && !responseJson.errors) {

          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            const apiData = responseJson?.data?.map((item: any, index: any) => {
              item.slNo = index + 1;
              return item;
            });
            this.setState({
              invoiceData: apiData,
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
  }

  handleAddAction = () => {

    let formData = new FormData();
    formData.append("first_name", this.state.firstname);
    // @ts-ignore
    formData.append("last_name", this.state.lastname);
    formData.append("date_of_birth", this.state.birthDate);
    formData.append("joining_date", this.state.joiningDate);
    formData.append("full_phone_number", this.state.contactNo);
    formData.append("email", this.state.email);
    formData.append("description", this.state.desc);
    formData.append("designation", this.state.designation);
    formData.append("role_id", this.state.role);
    formData.append("password", this.state.password);
    formData.append("image", this.state.fileData);
    formData.append("workspace_id", this.state.workspace)

    const header = {
       'token': window.localStorage.getItem('token'),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addUserApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "account_block/accounts/add_account"
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
      "POST"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  handleCloseDefineInvoiceModal = () => {
    this.setState({defineInvoiceModal: false,
      isModalOverdueDateError: false,
      isModalFromDateError: false,
      isModalToDateError: false,
      modalOverdueDate: "",
      modalFromDate: "",
      modalToDate: "",
      toDateError:false,
    })
  };

  handelGenerateInvoice=()=>{
    let isError = false;

    if (this.state.modalOverdueDate == "") {
      this.setState({ isModalOverdueDateError: true });
      isError = true;
    }
    if (this.state.modalFromDate == "") {
      this.setState({ isModalFromDateError: true });
      isError = true;
    }
    if (this.state.modalToDate == "") {
      this.setState({ isModalToDateError: true });
      isError = true;
    }
    else if (!moment(this.state.modalToDate).isAfter(this.state.modalFromDate)){
      this.setState({ toDateError : true})
      isError = true;
    }


    if (isError) {
      return;
    }

    const body={
      "id": this.query.get('invoiceId'),
      "from_date": moment(this.state.modalFromDate).format('YYYY-MM-DD'), 
      "to_date": moment(this.state.modalToDate).format('YYYY-MM-DD'),
      "overdue_date": moment(this.state.modalOverdueDate).format('YYYY-MM-DD')
     }

    const header = {
      'token': window.localStorage.getItem('token'),
      "content-type": "application/json"
    };

   const requestMessage = new Message(
     getName(MessageEnum.RestAPIRequestMessage)
   );

   this.generateInvoiceApiCallId = requestMessage.messageId;

   requestMessage.addData(
     getName(MessageEnum.RestAPIResponceEndPointMessage),
     "bx_block_invoicebilling/define_invoice/generate_invoice"
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
  }

  // Customizable Area End
}
