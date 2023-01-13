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
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start

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
  joiningDate:any;
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
  usersData: any;
  workspace: string;
  isErrorFirstName: boolean;
  isErrorLastName: boolean;
  isErrorEmail: boolean;
  isMenu: null | HTMLElement;
  isSubMenu: null | HTMLElement;
  pageNo: any;
  rowsPerPage: number;
  roleData:any,
  isEditMode:boolean;
  userId:"";
  modalMsg:string;
  handleAccept:boolean;
  filterBy:string;
  approvedData:any;
  rejectedData:any;
  rejectedId:any;
  isLoader:boolean;
  isConfirm:boolean;
  search:string;
  designationList:any;

  // Customizable Area End
}
interface SS {
  id: any;
}

export default class UserRequestController extends BlockComponent<
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
  usersApiCallId: string = "";
  roleApiCallId:string="";
  updateUserApiCallId:string="";
  approvedUserApiCallId:string="";
  rejectedAPICallId:string="";
  designationApiCallId:string="";
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

      roleData:[],
      userData: [],
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
      workspace: "",
      usersData: [],
      isErrorFirstName: false,
      isErrorLastName: false,
      isErrorEmail: false,
      isMenu: null,
      isSubMenu: null,
      pageNo: 0,
      rowsPerPage: 10,
      isEditMode:false,
      userId:"",
      modalMsg:"",
      handleAccept:false,
      filterBy:"Pending",
      approvedData:[],
      joiningDate:null,
      rejectedData:[],
      rejectedId:"",
      isLoader:true,
      isConfirm:false,
      search:"",
      designationList:[]

      // success:true
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.setState({isLoader:true})
    console.log(this.props, "USER PROPS");
    this.getToken();
    this.getUsers();
    this.getWorkspaces();
    this.getRoles();
    this.getDesignations()
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


  getRoles(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
        // token:
        //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
        "Content-Type": 'application/JSON',
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

  getUsers(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.usersApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "get_status_data?status=Pending"
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
  getApprovedUsers(filterData:any): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": "application/JSON",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.usersApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `get_status_data?status=${filterData}`
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
  handleRejectAction = (id:any) => {
    console.log("api call started *************", id)
    const attrs={

      "account_id":  id,
      "status": "Rejected"

    }

     const header = {
      'token': window.localStorage.getItem('token'),
         "Content-Type": 'application/JSON',
     };

     const requestMessage = new Message(
         getName(MessageEnum.RestAPIRequestMessage)
     );

     this.rejectedAPICallId = requestMessage.messageId;

     requestMessage.addData(
         getName(MessageEnum.RestAPIResponceEndPointMessage),
         `update_status`
     );

     requestMessage.addData(
         getName(MessageEnum.RestAPIRequestHeaderMessage),
         JSON.stringify(header)
     );

     requestMessage.addData(
         getName(MessageEnum.RestAPIRequestBodyMessage),
         JSON.stringify(attrs)
     );

     requestMessage.addData(
         getName(MessageEnum.RestAPIRequestMethodMessage),
         'PUT'
     );

     runEngine.sendMessage(requestMessage.id, requestMessage);
     return true
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

  updateUser = () => {
    console.log("api call started *************");


    var formData = new FormData();

    formData.append("designation", this.state.designation);

    formData.append("role_id", this.state.role);
   formData.append("joining_date",this.state.joiningDate)
    formData.append("workspace_id", this.state.workspace)
    formData.append("status","Approved")


    const header = {
      'token': window.localStorage.getItem('token'),
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

      if (apiRequestCallId === this.addUserApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            this.setState(
              {
                userData: responseJson.data.attributes,
                isSuccessModal: true,
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
        console.log({ data: responseJson }, "GET");
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
        // console.log({ data: responseJson.data }, "GET");
        if (responseJson && !responseJson.errors && responseJson.data) {
          console.log("IN THE WORKSPACE");
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            const apiData = responseJson.data.map((item: any, index: any) => {
              item.slNo = index + 1;
              return item;
            });
            // const rowData = this.state.usersData.filter((item:any) => item.id!= this.state.userId)
            this.setState({
              usersData: apiData,
              isLoader:false,
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
      if (this.roleApiCallId  === apiRequestCallId) {
        console.log({ data: responseJson }, "GET ROLES FROMAPI");
        if (responseJson && !responseJson.errors) {
            console.log("IN THE WORKSPACE ROLE")
           console.log(responseJson, 'responseJson.data.length')
          if (responseJson.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            console.log("HERE IN ROLE RES")
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
      if (apiRequestCallId === this.updateUserApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            const apiData = responseJson.data;
            apiData.slNo = this.state.usersData.length + 1;
            const rowData = this.state.usersData.filter((item:any) => item.id!= this.state.userId)
            this.setState(
              {
                userData: responseJson.data.attributes,
                usersData: rowData,
                modalMsg:"Updated Successfully!",
                // isEditMode:false,
                // apiData:responseJson.data.attributes,
                isSuccessModal: true,
                // modalMsg:"Accepted Succesfully",
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
      if (apiRequestCallId === this.approvedUserApiCallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            const apiData = responseJson.data;
            apiData.slNo = this.state.usersData.length + 1;
            this.setState(
              {
                approvedData: responseJson.data,
                // usersData: [...this.state.usersData, apiData],
                // modalMsg:"Updated Succesfully",
                // isEditMode:false,
                // apiData:responseJson.data.attributes,
                // isSuccessModal: true,
                errorMsg: "",
                loading: false,
                isLoader:false,
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
      if (apiRequestCallId === this.rejectedAPICallId) {
        console.log("U there **********", responseJson);
        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              errorMsg: "Data Not Found",
              loading: false,
            });
          } else {
            const rowData = this.state.usersData.filter((item:any) => item.id!= this.state.rejectedId)
            this.setState(
              {
                rejectedData: responseJson,
                modalMsg:"Rejected Successfully!",
                isSuccessModal:true,
                usersData:rowData,
                // apiData:responseJson.data.attributes,
                // isSuccessModal: true,
                errorMsg: "",
                loading: false,
                // rejectedData: responseJson,
                // usersData: rowData,
                // modalMsg:"Rejected Succesfully!",
                // isSuccessModal:true,
                // errorMsg: "",
                // loading: false,
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
    //    const attrs={
    //     first_name:this.state.firstname,
    //     last_name:this.state.lastname,
    //     date_of_birth:this.state.birthDate,
    //     full_phone_number:this.state.contactNo,
    //     email:this.state.email,
    //     password: this.state.password,
    //     confirm_password:this.state.confirmpwd

    //    }
    //    const data ={
    //     type:"email_account",
    //     attributes:attrs
    //    }

    var formData = new FormData();
    formData.append("first_name", this.state.firstname);
    // @ts-ignore
    formData.append("last_name", this.state.lastname);
    formData.append("date_of_birth", this.state.birthDate);
    formData.append("full_phone_number", this.state.contactNo);
    formData.append("email", this.state.email);
    formData.append("description", this.state.desc);
    formData.append("designation", this.state.designation);
    formData.append("role_id", "admin");
    formData.append("password", this.state.password);
    formData.append("image", this.state.fileData);

    // const body={
    //     data:formData,
    //    }
    //    console.log(body, 'in api body')
    const header = {
      'token': window.localStorage.getItem('token'),
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
