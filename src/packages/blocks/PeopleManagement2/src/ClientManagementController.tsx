import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history:any;
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  open: boolean;
  menuOpen: boolean;
  anchorEl: null | HTMLElement;
  errorMsg: string;
  alertMsg: string;
  alertSeverity: "error" | "warning" | "info" | "success";
  modalAlertMsg: string;
  modalAlertSeverity: "error" | "warning" | "info" | "success";
  token: string;
  workspaces: any;
  clientSources: any;
  edit: boolean;
  editModal: boolean;
  deleteModal: boolean;
  titleModal: boolean;
  searchValue: string;
  adminSearchValue: string;
  description: string;
  username: string;
  title: string;
  adminString: string;
  coverImg: any;
  coverImgFile: any;
  workspace_id: string;
  workspaceItem: any;
  clientPairs: any;
  workspaceMultipleName: any;
  spaceCheck: boolean;
  admins: any;
  workspaceName: string;
  teamLeaders: any;
  clientName: string;
  clientID: string;
  clientAddress: string;
  clientContact: string;
  clientOfficialEmail: string;
  modalSuccessAlert: string;
  coverImgError: string;
  adminStringError: string;
  clientNameError: string;
  workspace_idError: string;
  descriptionError: string;
  clientAddressError: string;
  clientContactError: string;
  clientOfficialEmailError: string;
  teamLeaderappend: string;
  [field: string]: unknown;
  isemailnotvalid: boolean;
  isemailvalid: boolean;
  availableTL: any;
  unavailableTL: any;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ClientManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  workspaceItemCallId: string = "";
  clientItemCallId: string = "";
  searchClientSpaceItemCallId: string = "";
  clientSearchItemCallId: string = "";
  workspaceUpdateItemCallId: string = "";
  workspaceDeleteItemCallId: string = "";
  dashboardApiCallId: string = "";
  imageItemCallId: string = "";
  workspaceCreateItemCallId: string = "";
  apiGetQueryStrinurl: string = "";

  clientTitleText = configJSON.clientTitleText;
  clientTitleButtonText = configJSON.clientTitleButtonText;
  actionButtonText: string;
  actionButtonAddText = configJSON.actionButtonAddText;
  actionButtonSaveText = configJSON.actionButtonSaveText;
  cancelButtonText = configJSON.actionButtonCancelText;
  modalAddTitle = configJSON.clientModalAddTitle;
  modalEditTitle = configJSON.clientModalEditTitle;
  imageLink: string = configJSON.imageLink;
  clientSaveError = configJSON.clientSaveError;
  subfolderLink: string = configJSON.subfolderLink;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      loading: false,
      open: false,
      menuOpen: false,
      edit: false,
      titleModal: false,
      editModal: false,
      deleteModal: false,
      spaceCheck: false,

      errorMsg: "",
      username: "",
      title: "",
      token: "",
      alertMsg: "",
      modalAlertMsg: "",
      alertSeverity: "warning",
      modalAlertSeverity: "warning",

      searchValue: "",
      adminSearchValue: "",
      workspaceName: "",
      clientName: "",
      clientID: "",
      workspace_id: "",
      description: "",
      coverImg: "",
      modalSuccessAlert: "",
      clientAddress: "",
      clientContact: "",
      adminString: "",
      clientOfficialEmail: "",
      coverImgError: "",
      adminStringError: "",
      clientNameError: "",
      workspace_idError: "",
      descriptionError: "",
      clientAddressError: "",
      clientContactError: "",
      clientOfficialEmailError: "",
      teamLeaderappend: "",
      isemailnotvalid: false,
      isemailvalid: false,

      anchorEl: null,
      coverImgFile: null,
      admins: [],
      workspaces: [],
      clientSources: [],
      workspaceItem: [],
      workspaceMultipleName: [],
      teamLeaders: [],
      clientPairs: {},
      availableTL: [],
      unavailableTL: [],
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getAdminData(): boolean {
    // Customizable Area Start
    const header = {
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.clientSearchItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.CLIENT_TL_SEARCH}?id=${this.state.workspace_id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GET_METHOD_TYPE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getClientData(): boolean {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.clientItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CLIENT_GET_URL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GET_METHOD_TYPE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  searchClientData(): boolean {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const workspaceMap = this.state.workspaceMultipleName
      .map((name: string) => {
        return `&workspace_id[]=${name}`;
      })
      .join("");

    this.searchClientSpaceItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.CLIENT_SEARCH_URL}?search=${this.state.searchValue
      }${workspaceMap}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GET_METHOD_TYPE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  getWorkspaceData(): boolean {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.workspaceItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.WORKSPACE_GET_URL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GET_METHOD_TYPE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  createWorkspace(formdata: any): boolean {
    // Customizable Area Start
    const header = {
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.workspaceCreateItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CLIENT_GET_URL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POST_METHOD_TYPE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  updateWorkspace(formdata: any): boolean {
    // Customizable Area Start
    const header = {
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.workspaceUpdateItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.CLIENT_GET_URL}/${this.state.clientID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PUT_METHOD_TYPE
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  deleteWorkspace(): boolean {
    // Customizable Area Start
    const header = {
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.workspaceDeleteItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.CLIENT_GET_URL}/${this.state.clientID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DELETE_METHOD_TYPE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  handleWorkspaceCreateItemCallIdError= (errorReponse: any) => {
    this.setState({
      alertMsg: errorReponse,
      alertSeverity: "error",
    });
    return;
  }

  handleWorkspaceCreateItemCallIdResponse = (responseJson: any) => {
    this.setState(
      {
        loading: true,
        modalSuccessAlert: "Client Added Successfully",
        alertSeverity: "success",
      },
      () => {
        this.getClientData();
      }
    );
  }

  handleWorkspaceCreateItemCallIdResponseError = (responseJson: any) => {
    if (responseJson.errors) {
      let errorMsg;
      if (responseJson.errors[0].message) {
        errorMsg = responseJson.errors[0].message;
      }

      if (responseJson.errors[0].token) {
        errorMsg = responseJson.errors[0].token;
      }

      this.setState({
        alertMsg: errorMsg,
        alertSeverity: "error",
      });
    }
  }

  handleWorkspaceUpdateItemCallIdError = (errorReponse: any) => {
    console.clear()
    this.setState({
      alertMsg: errorReponse,
      alertSeverity: "error",
    });
    return;
  }

  handleWorkspaceUpdateItemCallIdResponse = (responseJson: any) => {
    this.setState(
      {
        loading: true,
        modalSuccessAlert: "Client Updated Successfully",
        alertSeverity: "success",
      },
      () => {
        this.getClientData();
      }
    );
  }

  handleWorkspaceUpdateItemCallIdResponseError = (responseJson: any) => {
      let errorMsg;
      if (responseJson.errors[0].message) {
        errorMsg = responseJson.errors[0].message;
      }

      if (responseJson.errors[0].token) {
        errorMsg = responseJson.errors[0].token;
      }

      this.setState({
        alertMsg: errorMsg,
        alertSeverity: "error",
      });
  }

  handleWorkspaceDeleteIteCallIdError = (errorReponse: any) => {
    this.setState({
      alertMsg: errorReponse,
      alertSeverity: "error",
    });
    return;
  }

  handleWorkspaceDeleteItemCallIdResponse = (responseJson: any) => {
    this.setState(
      {
        loading: true,
        modalSuccessAlert: "Client Removed Successfully",
        alertSeverity: "success",
      },
      () => {
        this.getClientData();
      }
    );
  }

  handleWorkspaceDeleteItemCallIdResponseError = (responseJson: any) => {
    if (responseJson.errors) {
      let errorMsg;
      if (responseJson.errors[0].message) {
        errorMsg = responseJson.errors[0].message;
      }

      if (responseJson.errors[0].token) {
        errorMsg = responseJson.errors[0].token;
      }

      this.setState({
        alertMsg: errorMsg,
        alertSeverity: "error",
      });
    }
  }

  handleWorkspaceItemCallIdResponse = (responseJson: any) => {
    const nameListPair: any = {};
    const nameList = responseJson.data.map((workspace: any) => {
      nameListPair[workspace.id] = workspace.attributes.name;
      return workspace;
    });
    const selectNameList = Object.keys(nameListPair);

    this.setState({
      clientSources: nameList,
      workspaceMultipleName: selectNameList,
      spaceCheck: true,
      workspaceItem: selectNameList,
      clientPairs: nameListPair,
    });
    return;
  }

  handleclientItemCallIdResponse = (responseJson: any) => {
    this.setState({
      loading: false,
      workspaces: responseJson.data,
    });
  }

  handleClientItemCallIdResponseError = (responseJson: any) => {
    if (responseJson.errors) {
      let errorMsg;
      if (responseJson.errors[0].message) {
        errorMsg = responseJson.errors[0].message;
      }

      if (responseJson.errors[0].token) {
        errorMsg = responseJson.errors[0].token;
      }

      this.setState({
        loading: false,
        workspaces: [],
        alertMsg: errorMsg,
        alertSeverity: "error",
      });
    }

    if (responseJson.message) {
      this.setState({
        alertMsg: responseJson.message,
        loading: false,
      });
    }

    if (responseJson.error) {
      let errorMsg = responseJson.error;
      this.setState({
        workspaceAdminData: [],
        alertMsg: errorMsg,
        alertSeverity: "error",
      });
    }
    return;
  }

  handleClientSearchItemCallIdResponse = (responseJson: any) => {
    if (responseJson?.errors) {
      this.setState({tlresponsemessage: responseJson?.errors[0].message})
    } else {
    this.setState({clientteamleads: responseJson?.data})
    this.setState({teamleaddisplay: true})
    this.setState({availableTL: responseJson?.available_tl?.data})
    this.setState({unavailableTL: responseJson?.unavailable_tl?.data})
  }
  }

  handleSearchClientSpaceItemCallIdResponse = (responseJson: any) => {
    this.setState({
      workspaces: responseJson.data,
      alertMsg: "",
      loading: false,
    });
  }

  handleSearchClientSpaceItemCallIdResponseError = (responseJson: any) => {
    if (responseJson.errors) {
      let errorMsg;
      if (responseJson.errors[0].message) {
        errorMsg = responseJson.errors[0].message;
      }

      if (responseJson.errors[0].token) {
        errorMsg = responseJson.errors[0].token;
      }

      this.setState(
        {
          alertMsg: errorMsg,
          alertSeverity: "info",
        }
      );
    }
    return;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token, loading: true }, () => {
        this.getWorkspaceData();
        this.getClientData();
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if(errorReponse) {
        switch(apiRequestCallId) {
          case this.workspaceCreateItemCallId :
            return this.handleWorkspaceCreateItemCallIdError(errorReponse)
          case this.workspaceUpdateItemCallId : 
          return this.handleWorkspaceUpdateItemCallIdError(errorReponse)
          case this.workspaceDeleteItemCallId :
            return this.handleWorkspaceDeleteIteCallIdError(errorReponse)
        }
      } 

      if(responseJson && !responseJson.errors) {
        switch(apiRequestCallId) {
          case this.workspaceCreateItemCallId :
            return this.handleWorkspaceCreateItemCallIdResponse(responseJson)
          case this.workspaceUpdateItemCallId :
            return this.handleWorkspaceUpdateItemCallIdResponse(responseJson)
          case this.workspaceDeleteItemCallId :
            return this.handleWorkspaceDeleteItemCallIdResponse(responseJson)
        }
      } else {
        switch(apiRequestCallId) {
          case this.workspaceCreateItemCallId :
            return this.handleWorkspaceCreateItemCallIdResponseError(responseJson)
          case this.workspaceUpdateItemCallId :
            return this.handleWorkspaceUpdateItemCallIdResponseError(responseJson)
            case this.workspaceDeleteItemCallId :
              return this.handleWorkspaceDeleteItemCallIdResponseError(responseJson)
        }
      }

      if(responseJson && !responseJson.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.workspaceItemCallId: 
          return this.handleWorkspaceItemCallIdResponse(responseJson)
          case this.clientItemCallId :
            return this.handleclientItemCallIdResponse(responseJson)
          case this.searchClientSpaceItemCallId :
            return this.handleSearchClientSpaceItemCallIdResponse(responseJson)
        }
      }
      else {
        switch(apiRequestCallId) {
          case this.clientItemCallId :
            return this.handleClientItemCallIdResponseError(responseJson)
          case this.searchClientSpaceItemCallId :
            return this.handleSearchClientSpaceItemCallIdResponseError(responseJson)
        }
      }

      if(responseJson || !responseJson.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.clientSearchItemCallId :
            return this.handleClientSearchItemCallIdResponse(responseJson)
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  createForm() {    
    const formData = new FormData();
    formData.append("client_name", this.state.clientName.trim());
    formData.append("description", this.state.description);
    formData.append("workspace_id", this.state.workspace_id);
    formData.append("client_address", this.state.clientAddress);
    formData.append("client_email", this.state.clientOfficialEmail);
    formData.append("contack_details", this.state.clientContact);
    
    const team_leader_data = this.state.teamLeaders.reduce((result: any, item: any) => {
      return `${result}${item.id},`
    }, '');
    console.log("Leader datas:", team_leader_data)
    formData.append("team_leader_ids", team_leader_data)

    if (this.state.coverImgFile) {
      formData.append(
        "image",
        this.state.coverImgFile,
        `${this.state.title}-img.png`
      );
    }

    return formData;
  }

  addWorkspace = () => {
    const { isInvalid, errors, isExist } = this.validate();
    
    console.log("Validation of email::",  this.state.isemailnotvalid)
    if (isInvalid) {
      console.log("Validate errorss::: ")
      this.triggerWarning(errors, isExist);
      return;
    }

     this.createWorkspace(this.createForm());
     this.resetWorkspace();
  };

  saveWorkspace() {
    const { isInvalid, errors, isExist } = this.validate();
    if (isInvalid) {
      this.triggerWarning(errors, isExist);
      return;
    }

    this.updateWorkspace(this.createForm());
    this.resetWorkspace();
    return;
  }

  validate(errorsArray: string[] = [], current: string[] = []) {
    console.log("Validate called")
    const requiredArray = [
      "clientName",
      "workspace_id",
    ] as const;

    const emailvalidation = this.state.clientOfficialEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    const isRequiredCheck = requiredArray
      .map((field: string) => {
        if (!this.state[field]) {
          const fieldError = field.concat("Error");
          errorsArray = [...errorsArray, fieldError];
        }
        return Boolean(this.state[field]);
      })
      .includes(false);

    const isExistCheck = this.state.workspaces
      .map((client: any) => {
        if (client.id === this.state.clientID) {
          current = current.concat(client.attributes.client_name.toLowerCase());
        }
        return client.attributes.client_name.toLowerCase().trim();
      })
      .includes(this.state.clientName.toLowerCase().trim());
    const salt = current.includes(this.state.clientName.toLowerCase().trim());
    const isExistAndSalt = isExistCheck && !salt;

    if (isExistAndSalt) {
      errorsArray = [...errorsArray, "clientNameError"];
      console.log("Error::", errorsArray)
    }

    if(emailvalidation == null) {
      this.setState({isemailnotvalid: true})
      errorsArray = [...errorsArray, "clientOfficialEmailError"]
    }
    else {
        this.setState({isemailnotvalid: false})
    }
    const emailInvalid = this.state.isemailnotvalid

    const isInvalid = (isRequiredCheck || isExistAndSalt || emailInvalid) && true;

    return { isInvalid, errors: errorsArray, isExist: isExistAndSalt };
  }

  resetWorkspace() {
    this.setState((prev) => {
      return {
        ...prev,
        coverImg: "",
        title: "",
        searchValue: "",
        adminSearchValue: "",
        adminString: "",
        workspaceName: "",
        clientName: "",
        clientNameError: "",
        EmailNotProperError: "",
        clientID: "",
        workspace_id: "",
        workspace_idError: "",
        description: "",
        descriptionError: "",
        clientAddress: "",
        clientAddressError: "",
        clientContact: "",
        clientContactError: "",
        clientOfficialEmail: "",
        clientOfficialEmailError: "",
        coverImgError: "",
        adminStringError: "",
        modalAlertMsg: "",
        modalSuccessAlert: "",
        open: false,
        edit: false,
        editModal: false,
        titleModal: false,
        deleteModal: false,
        coverImgFile: null,
        isemailnotvalid: false,
        isemailvalid: false,
        teamLeaders: [],
        admins: [],
      };
    });
  }

  parseImg(img: string | null) {
    if (!img) return undefined;
    const imageLink = configJSONBase.baseURL;
    const imageFragment =
      typeof img === "string" && img.split("/").includes("rails");
    const imgSrc = imageFragment ? `${imageLink}/${img}` : img;
    return imgSrc;
  }

  triggerModalWarning(modalAlertMsg: string) {
    this.setState({
      modalAlertSeverity: "warning",
      modalAlertMsg,
    });
  }

  triggerWarning(errorClasses: any, isExist: boolean) {
    const messageBody: any = {
      clientName: isExist
        ? configJSON.clientCreateError
        : configJSON.clientNameValidation,
      workspace_id: configJSON.workspaceValidation,
    };

    this.setState((prev) => {
      const errorMsg: any = {};
      for (const error of errorClasses) {
        const [body] = error.split("Error");
        const message = messageBody[body];
        errorMsg[error] = message;
      }

      return {
        ...prev,
        ...errorMsg,
      };
    });

    return;
  }
  // Customizable Area End
}