import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start

import moment from "moment";
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
  fromDate:any;
  toDate:any;
  email: string;
  contactNo: string;
  confirmpwd: string;
  // success:boolean,
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
  roleData: any;
  usersData: any;
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
  // isFilter:null | HTMLElement;
  isConfirm:boolean;
  modalVarient:string,
  initialTableLoad:boolean
  // activation_status :any;


  // Customizable Area End
}
interface SS {
  id: any;
}

export default class LeaveReportController extends BlockComponent<
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
  usersApiCallId: string = "";
  deleteApiCallId :string ="";
  updateUserApiCallId:string ="";
  updateStatusApiCallId:string="";
  getUserStatusApiCallId:string="";
  applyApiCallId :string="";
  designationApiCallId:string="";
  // updateApiCallId:string="";
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
      fromDate:null,
      toDate : null,
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
      roleData: [],
      designationList:[],
      workspace: "",
      usersData: [],
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
      // activation_status :""

      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    console.log(this.props, "USER PROPS");
    this.getToken();
    this.getUsers();
    this.getRoles();
    this.getWorkspaces();
    this.getDesignations()
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }
  componentDidUpdate(_prevProps: any, prevState: any) {
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
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjI5LCJleHAiOjE2NjE0MjYwODQsInRva2VuX3R5cGUiOiJsb2dpbiJ9.u7OE-btsPGjMyreXXDbMhjzCdMSMdM0AxjQdZuH3bB2zz3bAQS5_e1iqDVecL5eL28o1eKjXRwVKmREYrZZeGw",
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
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
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
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  getUsers(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      // token:"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjI5LCJleHAiOjE2NjE0MjYwODQsInRva2VuX3R5cGUiOiJsb2dpbiJ9.u7OE-btsPGjMyreXXDbMhjzCdMSMdM0AxjQdZuH3bB2zz3bAQS5_e1iqDVecL5eL28o1eKjXRwVKmREYrZZeGw",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.usersApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_leave_report/leave_reports/leave_reports"
      );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  deleteUser(): boolean {
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
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjI5LCJleHAiOjE2NjE0MjYwODQsInRva2VuX3R5cGUiOiJsb2dpbiJ9.u7OE-btsPGjMyreXXDbMhjzCdMSMdM0AxjQdZuH3bB2zz3bAQS5_e1iqDVecL5eL28o1eKjXRwVKmREYrZZeGw",
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
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  getApply(): boolean {
    // Customizable Area Start
    // &from_date=${moment(this.state.fromDate).format("DD/MM/YYYY")}&to_date=${moment(this.state.toDate).format("DD/MM/YYYY")}&role=${}
    let URL = `bx_block_leave_report/leave_reports/leave_reports?workspace=${this.state.selectedWorkspace}&from_date=${this.state.fromDate?moment(this.state.fromDate).format('DD/MM/YYYY'):""}&to_date=${this.state.toDate?moment(this.state.toDate).format('DD/MM/YYYY'):""}&role=${this.state.role}`;

    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.applyApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      URL
   );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  getDesignations(): boolean {
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
      "bx_block_favourites/designer/all_designation"
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



  async receive(_from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true }, () => {
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      this.workspaceApiCall(apiRequestCallId,responseJson)
      this.roleApiCall(apiRequestCallId,responseJson)
      this.usersApiCall(apiRequestCallId,responseJson)
      this.applyApiCall(apiRequestCallId,responseJson)
      
    }
    // Customizable Area End
  }

  // Customizable Area Start
workspaceApiCall=(apiRequestCallId:any,responseJson:any)=>{
if (this.workspaceApiCallId === apiRequestCallId) {
        if (responseJson?.data) {
            this.setState({
              workspaceData: responseJson.data,
              errorMsg: "",
              loading: false,
            });
          }
      }
}
roleApiCall=(apiRequestCallId:any,responseJson:any)=>{
if (this.roleApiCallId === apiRequestCallId) {
        if (responseJson) {
            this.setState({
              roleData: responseJson,
              errorMsg: "",
              loading: false,
            });
          }        
      }
}
usersApiCall=(apiRequestCallId:any,responseJson:any)=>{
if (this.usersApiCallId === apiRequestCallId) {
        if (responseJson?.data) {
            const apiData = responseJson.data?.map((item: any, index: any) => {
              item.slNo = index + 1;
              return item;
            });
            this.setState({
              usersData:apiData,
              errorMsg: "",
              loading: false,
            });   
      }}
}
applyApiCall=(apiRequestCallId:any,responseJson:any)=>{
if (this.applyApiCallId === apiRequestCallId) {
        if (responseJson?.data) {         
            const apiData = responseJson.data?.map((item: any, index: any) => {
              item.slNo = index + 1;
              return item;
            });
            this.setState({
              usersData: apiData,
              errorMsg: "",
              loading: false,
            });       
      }}
}
  // Customizable Area End
}
