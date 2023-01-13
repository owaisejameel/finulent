import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { date } from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
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

export default class UserManagementController extends BlockComponent<
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
      "get_status_data?status=Approved"
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
      //   configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
 updateUser = () => {
    console.log("api call started *************");


    var formData = new FormData();
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
    // formData.append("password", this.state.password);
    // formData.append("image", this.state.fileData);
    formData.append("workspace_id", this.state.workspace)

    const header = {
      'token': window.localStorage.getItem('token'),
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTgsImV4cCI6MTY1OTczNTI5NiwidG9rZW5fdHlwZSI6ImxvZ2luIn0.08O-3I9QAjbP4xcAN5a8KR7VbAQDqwRwasDh8a893w3sEQ9g0xveUuxkmQbbmv3ZhqvjiZ22B_tmVfmiukDCLweyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjcsImV4cCI6MTY5MTQ4ODk5NCwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.enaKYnHWPVmn01eC6pLqtE_OT5HU8jgMb43lH7UAl2E5OLS_eyeNbwXuSiLJyB56ag0NJBxR8vfR4m_edmn7Yg",
      // "Content-Type": 'application/JSON',
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
      `account_filter?activation_status=${this.state.isStatus}&role_id=${this.state.role}&workspace_id=${this.state.selectedWorkspace}`

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



  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true }, () => {
        // this.getDashboardData();

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

      if (apiRequestCallId === this.addUserApiCallId) {
        console.log("U there **********", responseJson);

        if (responseJson && !responseJson.error && responseJson.data|| responseJson&& responseJson?.data?.message) {

          if (responseJson.data.length === 0 || responseJson.data?.message) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:`${responseJson?.data.message}`,
              isSuccessModal:true,
              modalVarient:"error"
            });
          } else {
            const apiData = responseJson.data;
            apiData.slNo = this.state.usersData.length + 1;
            this.setState(
              {
                userData: responseJson.data.attributes,
                usersData: [...this.state.usersData, apiData],
                // usersData:this.state.usersData,
                // apiData:responseJson.data.attributes,
                // isSuccessModal: true,
                errorMsg: "",
                loading: false,
                modalMsg:"User Added Successfully!",
              },

              () => console.log(this.state.userData, "Response *****")
            );
          }
        } else {

          this.setState({
            modalMsg:"Account already exists with this email id!",
                isSuccessModal:true,
          })
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
      if (apiRequestCallId === this.updateStatusApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:"Error in Updating the User."
            });
          } else {
             const rowData = this.state.usersData
            console.log
            const apiData = responseJson.data;
            apiData.slNo = this.state.usersData.length + 1;
            console.log(apiData, "APUI DATA")
            const result=rowData.map((item:any)=>item.id == apiData.id? {...item, attributes:apiData.attributes}:item)
            console.log(result, "RESULT IN API TEST")
          //  const rowData=  [...this.state.usersData, apiData]
            this.setState(
              {
                userData: responseJson.data.attributes,
                usersData: result,
                modalMsg:"Updated Successfully!",
              //  activation_status:responseJson.data.attributes.activation_status,
                errorMsg: "",
                loading: false,
              },

              () => console.log(this.state.userData, "Response *****")
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
      if (this.workspaceApiCallId === apiRequestCallId) {
        // console.log({ data: responseJson.data }, "GET");

        if (responseJson && !responseJson.errors && responseJson.data) {
          console.log("IN THE WORKSPACE");
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            this.setState({
              workspaceData: responseJson.data,
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
      if (this.usersApiCallId === apiRequestCallId) {

        // let apiResponse=responseJson
        if (responseJson && !responseJson.errors && responseJson.data) {

          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            const apiData = responseJson?.data.map((item: any, index: any) => {
              item.slNo = index + 1;
              return item;
            });
            console.log(apiData,"API DATA")
            this.setState({
              usersData:apiData,


              errorMsg: "",
              loading: false,
            });
            console.log(this.state.userData, "USER DATA");
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
      if (this.roleApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GET ROLES FROMAPI");
        if (responseJson && !responseJson.errors) {

          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {

            this.setState({
              roleData: responseJson,
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
      if (this.deleteApiCallId === apiRequestCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson) {
          if (responseJson === 0 || responseJson?.data?.length === 0 || responseJson.data?.message) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
              modalMsg:	`${responseJson?.data?.message}`,
              isSuccessModal:true, 
              modalVarient: "error"
            });
          } else {
             const rowData = this.state.usersData.filter((item:any) => item.id!= this.state.userId)
            this.setState(
              {
                deletedData: responseJson,
                modalMsg:"Deleted Successfully!",
                isSuccessModal:true,
                usersData:rowData,
                // apiData:responseJson.data.attributes,
                // isSuccessModal: true,
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
      if (apiRequestCallId === this.updateUserApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson || !responseJson.errors && responseJson.data ) {
          console.log("HERE IN RES")
          if (responseJson?.data?.length === 0 || responseJson.data?.message) {

            this.setState({
              errorMsg: "Data Not Found",
              loading: false,

              modalMsg:`${responseJson?.data?.message}`,
              isSuccessModal:true,
              modalVarient:"error"
            });
          } else {
             const rowData = this.state.usersData

            const apiData = responseJson.data;
            apiData.slNo = this.state.usersData?.length + 1;

            const result=rowData.map((item:any)=>item.id == apiData.id? {...item, attributes:apiData.attributes}:item)

            this.setState(
              {
                userData: responseJson.data.attributes,
                usersData: result,
                modalMsg:"Updated Successfully!",

                errorMsg: "",
                loading: false,
              },

              () => console.log(this.state.userData, "Response *****")
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
      if (this.getUserStatusApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GET ROLES FROMAPI");
        if (responseJson && !responseJson.errors) {

          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
           console.log(responseJson.data.attributes.activation_status, "REs")
          //  let isChecked=responseJson.data.attributes.activation_status === "true"? true :false
          if(responseJson.data.attributes.activation_status === "true"){
            console.log("IN TRUE")
            this.setState({ isChecked:true})
          }else{
            console.log("IN False")
            this.setState({isCheckedFalse:true})

          }
            // this.setState({
            //  isChecked:isChecked,
            //   errorMsg: "",
            //   loading: false,
            // });
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
      if (this.applyApiCallId === apiRequestCallId) {
        console.log({ data: responseJson }, "GET ROLES FROMAPI");
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
              usersData: apiData,
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
              designationList: responseJson,
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


      //
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleAddAction = () => {
    console.log("api call started *************");


    var formData = new FormData();
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
      // token:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTgsImV4cCI6MTY1OTczNTI5NiwidG9rZW5fdHlwZSI6ImxvZ2luIn0.08O-3I9QAjbP4xcAN5a8KR7VbAQDqwRwasDh8a893w3sEQ9g0xveUuxkmQbbmv3ZhqvjiZ22B_tmVfmiukDCLweyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjcsImV4cCI6MTY5MTQ4ODk5NCwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.enaKYnHWPVmn01eC6pLqtE_OT5HU8jgMb43lH7UAl2E5OLS_eyeNbwXuSiLJyB56ag0NJBxR8vfR4m_edmn7Yg",
      // "Content-Type": 'application/JSON',
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

  // Customizable Area End
}
