import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");
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
  // Customizable Area Start
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;

  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;

  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;

  saveButtonDisable: boolean;

  ftname: any;
  ltname: any;
  btdate: any;
  cellno: any;
  oemail: any;
  design: any;
  descrp: any;
  worksp: any;
  phonen: any;
  roleid: any;
  ctrycd: any;
  status: any;
  actype: any;
  create: any;
  update: any;
  device: any;
  active: any;
  unauth: any;
  pimage: any;
  passwd: any;
  repswd: any;
  mobnum: any;
  jtdate: any;
  imagep: any;
  images: any;
  isErpd: boolean;
  isErro: boolean;
  isErcf: boolean;
  updated: boolean;
  modalOpen: boolean;
  isSuccessModal: boolean;
  visibility: boolean;
  visibilityretype: boolean;
  visible: boolean;
  password: any;
  isOldErr: boolean;
  workspace: any;
  oldpasswd: any;
  imagechanged:boolean;
  clientIddata: any;
  clientData: any;
  showclientData: any;
  isSuccessEdit: boolean;
  editModalOpen: boolean;
  isSuccessShow: boolean;
  showModalOpen: boolean;
  clientlogo: any;
  clientname: any;
  clientid: any;
  client_id: any;
  clientworkspace: any;
  clientworkspaceid: any;
  clientdescription: any;
  clientcontactno: any;
  clientcontactnoupdate: any;
  clientdetails: any;
  clientaddress: any;
  clientteamlead: any;
  clientemail: any;
  searchclient: any;
  newclientname: any;
  newclientworkspacename: any;
  newclientworkspaceid: any;
  newclientdescription: any;
  newclientcontactno: any;
  newclientaddress: any;
  newclientemail: any;
  clientteamleads: any;
  newclientteamleads: any;
  searchteamlead: any;
  newsearchteamlead: any;
  teamleaddisplay: any;
  updateteamLead: any;
  newteamLeads: any;
  teamleadid: any;
  teamleadidlist: any;
  iserroradd: any;
  iserroredit: any;
  searchedclientData: any;
  searchlistdisplay: any;
  searchlist: any;
  imageuploadclient: any;
  isEditmode: any;
  updatedclientlogo: any;
  responseError: any;
  emailvalidate: any;
  successmodalpopup: any;
  issuccessmodaldisplay: any;
  modalsuccessmessage: any;
  tlresponsemessage: any;
  imagevalue:any;
  emailvalidateupdate:any;
  addsubfoldermodal: any;
  editsubfoldermodal: any;
  moreinfosubfoldermodal: any;
  subfoldersuccessmessagemodal: any;
  addsubfoldershow: any;
  teamLeaders: any;
  adminString: any;
  admins: any;
  adminSearchValue: any;
  availableTL: any;
  unavailableTL: any;
  errorWarning: any;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class AdminClientManagementController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  labelFirstName: string;
  lastName: string;
  labelArea: string;
  labelMobile: string;
  labelEmail: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelRePassword: string;
  btnTextCancelPasswordChange: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;

  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = "";
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = "";
  authToken: any;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  userAttr: any;
  userGetApiCallId:any;
  userAttributes:any;

  clientApiCallId: any;
  showclientApiCallId: any;
  editclientApiCallId: any;
  addclientApiCallId: any;
  showTLApiCallId: any;
  searchApiCallId: any;

  apiEditUserProfile: any;
  apiEditUserProfilePassword: any;
  apiNewPasswordCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentCountryCode: configJSON.hintCountryCode,
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,

      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",

      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,

      ftname: "",
      ltname: "",
      btdate: "",
      cellno: "",
      oemail: "",
      design: "",
      descrp: "",
      worksp: "",
      phonen: "",
      roleid: "",
      ctrycd: "",
      status: "",
      actype: "",
      create: "",
      update: "",
      device: "",
      active: "",
      unauth: "",
      imagep: "",
      pimage: null,
      images: [],
      passwd: "",
      repswd: "",
      mobnum: "",
      jtdate: "",
      isErpd: false,
      isErro: false,
      isErcf: false,
      updated: false,
      modalOpen: false,
      isSuccessModal: false,
      visibility: false,
      visibilityretype: false,
      visible: false,
      password: "",
      workspace: [],
      isOldErr: false,
      oldpasswd: "",
      imagechanged:false,
      clientData: [],
      showclientData: [],
      searchedclientData: [],
      searchlistdisplay: false,
      searchlist: "",
      clientIddata: "",
      isSuccessEdit: false,
      editModalOpen: false,
      isSuccessShow: false,
      showModalOpen: false,
      clientlogo: "",
      clientname: "",
      clientid: "",
      client_id: "",
      clientworkspace: "",
      clientworkspaceid: "",
      clientdescription: "",
      clientcontactno: "",
      clientcontactnoupdate: "",
      clientdetails: "",
      clientaddress: "",
      clientteamlead: "",
      clientemail: "",
      searchclient: "",
      newclientname: "",
      newclientworkspacename: "",
      newclientworkspaceid: "",
      newclientdescription: "",
      newclientcontactno: "",
      newclientaddress: "",
      newclientemail: "",
      clientteamleads: [],
      newclientteamleads: [],
      updateteamLead: [],
      newteamLeads: [],
      searchteamlead: "",
      newsearchteamlead: "",
      teamleadid: "",
      teamleadidlist: [],
      teamleaddisplay: false,
      iserroradd: false,
      iserroredit: false,
      imageuploadclient: "",
      isEditmode: false,
      updatedclientlogo: "",
      responseError: [],
      emailvalidate: false,
      successmodalpopup: false,
      issuccessmodaldisplay: false,
      modalsuccessmessage: "",
      tlresponsemessage: "",
      imagevalue:"",
      emailvalidateupdate: false,
      addsubfoldermodal: false,
      editsubfoldermodal: false,
      moreinfosubfoldermodal: false,
      subfoldersuccessmessagemodal: false,
      addsubfoldershow: false,
      teamLeaders: [],
      adminString: "",
      admins: [],
      adminSearchValue: "",
      availableTL: [],
      unavailableTL: [],
      errorWarning: "",

    };

    this.arrayholder = [];
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelArea = configJSON.labelArea;
    this.labelMobile = configJSON.labelMobile;
    this.labelEmail = configJSON.labelEmail;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  parseImg(img: string | null) {
    if (!img) return undefined;
    const imageLink = configJSONBase.baseURL;
    const imageFragment =
      typeof img === "string" && img.split("/").includes("rails");
    const imgSrc = imageFragment ? `${imageLink}/${img}` : img;
    return imgSrc;
  }

  getClients(): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
        "Content-Type": 'application/JSON',
      };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.clientApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "list"
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

  searchrequest = (client: any) => {
    let searchworkspaceid = localStorage.getItem("workspace_id")
    const header = {
      'token': window.localStorage.getItem('token'),
        "Content-Type": 'application/JSON',
      };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.searchApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `admin_search_client?search=${this.state.searchclient}&workspace_id=${searchworkspaceid}`
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



  showClientDetails(id: any): boolean {
    // Customizable Area Start
    const header = {
      'token': window.localStorage.getItem('token'),
        "Content-Type": 'application/JSON',
      };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.showclientApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_client_management/clients/${id}`
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
  getTeamLead = (searchword: any) => {
    let workspace_id = localStorage.getItem("workspace_id")
    const header = {
      'token': window.localStorage.getItem('token'),
        "Content-Type": 'application/JSON',
      };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.showTLApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `search_TL_manager?search=${searchword}&id=${this.state.clientworkspaceid}`
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

  handleSaveClientUpdate = (id: any) => {
    const header = {
      'token': window.localStorage.getItem('token'),
      };
      let formData = new FormData();
      formData.append('workspace_id', this.state.clientworkspaceid)
      formData.append('client_name', this.state.clientname);
      formData.append('description', this.state.clientdescription);
      formData.append('contack_details', this.state.clientcontactno);
      formData.append('client_address', this.state.clientaddress);
      formData.append('client_email', this.state.clientemail);
      const team_leader_data = this.state.teamLeaders.reduce((result: any, item: any) => {
        return `${result}${item.id},`
      }, '');
      formData.append("team_leader_ids", team_leader_data)
      if(this.state.isEditmode){
      formData.append('image', this.state.updatedclientlogo);
      }

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.editclientApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_client_management/clients/${id}`
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
  // Customizable Area End
  return true;
  }

  addNewClient = () => {
    const header = {
      'token': window.localStorage.getItem('token'),
      };
      let formData = new FormData();
      formData.append('workspace_id', this.state.newclientworkspaceid)
      formData.append('client_name', this.state.newclientname);
      if(this.state.newclientdescription != 0) {
      formData.append('description', this.state.newclientdescription);
      }
      if(this.state.newclientcontactno != 0) {
      formData.append('contack_details', this.state.newclientcontactno);
      }
      if(this.state.newclientaddress != 0) {
      formData.append('client_address', this.state.newclientaddress);
      }
      if(this.state.newclientemail != 0) {
      formData.append('client_email', this.state.newclientemail);
      }
      const team_leader_data = this.state.teamLeaders.reduce((result: any, item: any) => {
        return `${result}${item.id},`
      }, '');
      formData.append("team_leader_ids", team_leader_data)
      if(this.state.imageuploadclient != 0) {
      formData.append('image', this.state.imageuploadclient);
      }

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.addclientApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        "bx_block_client_management/clients"
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
  // Customizable Area End
  return true;

  }


  handleClose = () => {

    this.setState({ modalOpen: false });
    this.setState({isSuccessModal:false})
    this.setState({newclientname: ""});
    this.setState({newclientdescription: ""});
    this.setState({newclientaddress: ""});
    this.setState({newclientcontactno: ""});
    this.setState({newclientemail: ""});
    this.setState({iserroradd: false});
    this.setState({responseError: []})
    this.setState({imageuploadclient: ""})
    this.setState({emailvalidate: false})
    this.setState({teamleaddisplay: false})
    this.setState({adminString: ""})
    this.setState({teamLeaders: []})
    this.setState({searchteamlead: ""})
    this.setState({newsearchteamlead: ""})
    this.setState({admins: []})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.getClients();
  };

  handleCloseEdit = () => {
    this.setState({editModalOpen: false});
    this.setState({isSuccessEdit: false});
    this.setState({teamleaddisplay: false})
    this.setState({emailvalidate: false})
    this.setState({adminString: ""});
    this.setState({teamLeaders: []})
    this.setState({searchteamlead: ""})
    this.setState({newsearchteamlead: ""})
    this.setState({admins: []})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.getClients();
  }

  handleCloseshow = () => {
    this.setState({showModalOpen: false});
    this.setState({isSuccessShow: false});
    this.setState({teamleaddisplay: false})
    this.setState({adminString: ""});
    this.setState({teamLeaders: []})
    this.setState({searchteamlead: ""})
    this.setState({newsearchteamlead: ""})
    this.setState({admins: []})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.getClients();
  }

  handleClosemodalpopup = () => {
    this.setState({successmodalpopup: false})
    this.setState({issuccessmodaldisplay: false})
    this.setState({emailvalidate: false})
    this.setState({adminString: ""});
    this.setState({teamLeaders: []})
    this.setState({searchteamlead: ""})
    this.setState({newsearchteamlead: ""})
    this.setState({admins: []})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.getClients()
  }
  handleCloseaddsubfolder = () => {
    this.setState({addsubfoldermodal: false})
  }


  handleClientAPICallIdSuccess = (responseJson: any) => {
    if (responseJson.message === "Client not found") {
      this.setState({newclientworkspaceid: localStorage.getItem("workspace_id")});
    } else {
      this.setState({clientData: responseJson.clients,});
      this.setState({newclientworkspacename: responseJson?.workspace?.data?.attributes?.name})
      this.setState({newclientworkspaceid: responseJson?.workspace?.data?.id})
      this.setState({clientworkspaceid: responseJson?.workspace?.data?.id})
    }
  }

  handleClientAPICallIdFailure = (responseJson: any) => {
    if(responseJson?.errors) {
      if(responseJson?.errors[0]?.token){
      localStorage.removeItem("token");
      localStorage.removeItem("email")
      localStorage.removeItem("password")
      localStorage.removeItem("id")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("role_id")
      localStorage.removeItem("modelname")
      localStorage.removeItem("open")
      localStorage.removeItem("peopleOpen")
      localStorage.removeItem("user_type")
      localStorage.removeItem("img")
      localStorage.removeItem("saveUserInfo")
      localStorage.removeItem("workspace_id")
      this.props.history.push("/EmailAccountLoginsBlock")
    }
    }
  }

  handleSearchAPICallIdSuccess = (responseJson: any) => {
    if (responseJson.data === undefined) {
      this.setState({searchlistdisplay: false});
      this.setState({searchlist: undefined})
    } else {
      this.setState({searchedclientData: responseJson.data,});
      this.setState({searchlistdisplay: true})
    }
  }

  handleSearchAPICallIdFailure = (responseJson: any) => {
    this.setState({errorWarning: "Search API error"})
  }

  handleShowClientAPICallIdSuccess = (responseJson: any) => {
    if (responseJson.data.length === 0) {
      this.setState({errorWarning: ""})
    } else {
      this.setState({showclientData: responseJson.data,});
      this.setState({clientname: responseJson?.data?.attributes?.client_name})
      this.setState({clientid: responseJson?.data?.id})
      this.setState({client_id: responseJson?.data?.attributes?.client_id})
      this.setState({clientworkspace: responseJson?.data?.attributes?.workspace?.name});
      this.setState({clientworkspaceid: responseJson?.data?.attributes?.workspace?.id});
      if(responseJson?.data?.attributes?.description === null) {
        this.setState({clientdescription: ""})
      } else{
        this.setState({clientdescription: responseJson?.data?.attributes?.description});
      }
      if(responseJson?.data?.attributes?.contack_details === null) {
        this.setState({clientcontactno: ""})
      } else {
        this.setState({clientcontactno: responseJson?.data?.attributes?.contack_details});
      }
      if(responseJson?.data?.attributes?.client_address === null) {
        this.setState({clientaddress: ""})
      } else {
        this.setState({clientaddress: responseJson?.data?.attributes?.client_address});
      }
      if(responseJson?.data?.attributes?.client_email === null) {
        this.setState({clientemail: ""})
      } else {
        this.setState({clientemail: responseJson?.data?.attributes?.client_email})
      }
      this.setState({clientlogo: responseJson?.data?.attributes?.image});
      this.setState({clientteamleads: responseJson?.data?.attributes?.team_leaders})
    }
  }

  handleShowTLAPICallIdSuccess = (responseJson: any) => {
    this.setState({clientteamleads: responseJson?.data})
    this.setState({teamleaddisplay: true})
    if(responseJson?.errors){
      this.setState({availableTL: []})
      this.setState({unavailableTL: []})
    } else {
      this.setState({availableTL: responseJson?.available_tl?.data})
      this.setState({unavailableTL: responseJson?.unavailable_tl?.data})
    }
  }

  handleShowTLAPICallIdFailure = (responseJson: any) => {
    if (responseJson?.errors) {
      this.setState({tlresponsemessage: responseJson?.errors[0].message})
    }
  }

  handleEditClientAPICallIdSuccess =(responseJson: any) => {
    if(!responseJson?.errors) {
      this.setState({clientname: responseJson?.data?.attributes?.client_name});
      this.setState({clientdescription: responseJson?.data?.attributes?.description});
      this.setState({clientcontactno: responseJson?.data?.attributes?.contack_details});
      this.setState({clientaddress: responseJson?.data?.attributes?.client_address});
      this.setState({clientemail: responseJson?.data?.attributes?.client_email});
      this.setState({clientteamlead: responseJson?.data?.attributes?.team_leaders});
      this.setState({clientlogo: responseJson?.data?.attributes?.image})
      if(this.state.iserroredit) {
        this.setState({editModalOpen: true})
      } else {
        this.setState({successmodalpopup: true})
        this.setState({issuccessmodaldisplay: true})
        this.setState({modalsuccessmessage: "Client updated"})
        this.setState({editModalOpen: false})
        this.setState({teamleaddisplay: false})
        this.setState({searchteamlead: ""})
        this.setState({newsearchteamlead: ""});
        this.setState({adminString: ""});
        this.getClients()
      }
      this.setState({updatedclientlogo: ""});
      this.setState({isEditmode: false});

    }
  }

  handleAddClientAPICallIdSuccess = (responseJson: any) => {
    if(responseJson.errors) {
      this.setState({responseError: responseJson?.errors})
    }
    else {
      this.setState({clientname: responseJson?.data?.attributes?.client_name});
      this.setState({clientdescription: responseJson?.data?.attributes?.description});
      this.setState({clientcontactno: responseJson?.data?.attributes?.contack_details});
      this.setState({clientaddress: responseJson?.data?.attributes?.client_address});
      this.setState({clientemail: responseJson?.data?.attributes?.client_email});
      this.setState({clientlogo: responseJson?.data?.attributes?.image});
      this.setState({clientteamlead: responseJson?.data?.attributes?.team_leaders});
      this.setState({editModalOpen: false})
      this.getClients()
      this.setState({newclientname: ""});
      this.setState({newclientdescription: ""});
      this.setState({newclientcontactno: ""});
      this.setState({newclientaddress: ""})
      this.setState({newclientemail: ""});
      this.setState({imageuploadclient: ""});
      this.setState({iserroradd: false});
      this.setState({successmodalpopup: true})
      this.setState({issuccessmodaldisplay: true})
      this.setState({modalsuccessmessage: "Client added"})
      this.setState({modalOpen: false})
      this.setState({isSuccessModal:false})
      this.setState({teamleaddisplay: false})
      this.setState({searchteamlead: ""})
      this.setState({newsearchteamlead: ""})
      this.setState({adminString: ""});
    }
  }

  handleAddClientAPICallIdFailure = (responseJson: any) => {
    if(responseJson?.errors) {
      this.setState({responseError: responseJson?.errors})
    } 
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if(responseJson || !responseJson?.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.clientApiCallId :
            return this.handleClientAPICallIdSuccess(responseJson)
          case this.searchApiCallId :
            return this.handleSearchAPICallIdSuccess(responseJson)
          case this.showclientApiCallId : 
            return this.handleShowClientAPICallIdSuccess(responseJson)
          case this.showTLApiCallId :
            return this.handleShowTLAPICallIdSuccess(responseJson)
          case this.editclientApiCallId :
            return this.handleEditClientAPICallIdSuccess(responseJson)
          case this.addclientApiCallId :
            return this.handleAddClientAPICallIdSuccess(responseJson)

        }
      }
      else {
        switch(apiRequestCallId) {
          case this.clientApiCallId :
            return this.handleClientAPICallIdFailure(responseJson)
          case this.searchApiCallId :
            return this.handleSearchAPICallIdFailure(responseJson)
          case this.showTLApiCallId : 
            return this.handleShowTLAPICallIdFailure(responseJson)
          case this.addclientApiCallId :
            return this.handleAddClientAPICallIdFailure(responseJson)
        }
      }
  // Customizable Area End
    }
  }
}
