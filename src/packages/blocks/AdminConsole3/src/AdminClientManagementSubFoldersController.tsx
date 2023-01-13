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
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  open: boolean;
  menuOpen: boolean;
  alertMsg: string;
  anchorEl: null | HTMLElement;
  alertSeverity: "error" | "warning" | "info" | "success";
  modalAlertMsg: string;
  modalAlertSeverity: "error" | "warning" | "info" | "success";
  descriptionError: string;
  modalSuccessAlert: string;
  titleError: string;
  inputError: string;
  token: string;
  workspaces: any;
  workspaceTitle: string;
  clientName: string;
  clientID: string;
  edit: boolean;
  deleteModal: boolean;
  searchValue: string;
  adminSearchValue: string;
  description: string;
  username: string;
  title: string;
  coverImg: any;
  coverImgFile: any;
  workspace_id: string;
  folder_id: string;
  workspaceAdminData: any;
  admins: any;
  adminString: string;
  coverImgError: string;
  adminStringError: string;
  [field: string]: unknown;
  availableTL: any;
  unavailableTL: any;
  searchteamlead: any;
  newsearchteamlead: any;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class AdminClientManagementSubFoldersController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  workspaceItemCallId: string = "";
  searchSubfolderItemCallId: string = "";
  workspaceSearchItemCallId: string = "";
  workspaceUpdateItemCallId: string = "";
  workspaceDeleteItemCallId: string = "";
  clientItemCallId: string = "";
  dashboardApiCallId: string = "";
  imageItemCallId: string = "";
  workspaceCreateItemCallId: string = "";
  apiGetQueryStrinurl: string = "";

  workspaceTitleText = configJSON.subFoldersTitleText;
  workspaceSubTitleText = configJSON.subFolderSubTitleText;
  workspaceTitleButtonText = configJSON.subFolderTitleButtonText;
  errorInDescription: string = configJSON.errorInDescription;
  errorInTitleAndDescription: string = configJSON.errorInTitleAndDescription;
  errorInTitle: string = configJSON.errorInTitle;
  descriptionWarning = configJSON.maxDescriptionError;
  workspaceCreateError = configJSON.workspaceCreateError;

  actionButtonText: string;
  actionButtonAddText = configJSON.actionButtonAddText;
  actionButtonSaveText = configJSON.actionButtonSaveText;
  cancelButtonText = configJSON.actionButtonCancelText;
  modalAddTitle = configJSON.subFolderModalAddTitle;
  modalEditTitle = configJSON.subFolderModalEditTitle;
  modalDeleteTitle = configJSON.subFolderModalDeleteTitle;
  templateText = configJSON.templateText;

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
      searchValue: "",
      adminSearchValue: "",
      description: "",
      username: "",
      title: "",
      token: "",
      coverImg: "",
      workspace_id: "",
      folder_id: "",
      adminString: "",
      adminStringError: "",
      coverImgError: "",
      alertMsg: "",
      modalAlertMsg: "",
      modalSuccessAlert: "",
      alertSeverity: "warning",
      modalAlertSeverity: "warning",
      descriptionError: "",
      titleError: "",
      inputError: "",
      workspaceTitle: "",
      clientName: "",
      clientID: "",
      loading: false,
      open: false,
      edit: false,
      menuOpen: false,
      deleteModal: false,
      anchorEl: null,
      coverImgFile: null,
      workspaceAdminData: [],
      workspaces: [],
      admins: [],
      availableTL: [],
      unavailableTL: [],
      searchteamlead: "",
      newsearchteamlead: "",
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.getWorkspaceData();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getWorkspaceData(): boolean {
    console.log("get Workspace function called")
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
      `${configJSON.CLIENT_SUBFOLDER}?id=${window.sessionStorage.getItem("client_id")}`
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

  getAdminData = (searchword: any) => {
    // Customizable Area Start
    const header = {
      token: window.localStorage.getItem("token"),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.workspaceSearchItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `search_TL_manager?search=${searchword}&id=${this.state.workspace_id}`
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
      `${configJSON.CLIENT_GET_URL}/${window.sessionStorage.getItem("client_id")}`
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

  createFolder(formdata: FormData): boolean {
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
      configJSON.CLIENT_SUBFOLDER_CREATE
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

  updateFolder(formdata: FormData): boolean {
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
      `${configJSON.CLIENT_SUBFOLDER_UPDATE}/${this.state.folder_id}`
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

  searchSubFolderData(): boolean {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.searchSubfolderItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.CLIENT_SUBFOLDER_SEARCH}?id=${this.state.clientID
      }&search=${this.state.searchValue}`
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

  deleteFolder(): boolean {
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
      `${configJSON.CLIENT_SUBFOLDER_DELETE}/${this.state.folder_id}`
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

  handleWorkspaceCreateItemCallIdErrorReponse =(errorReponse: any) => {
    if (errorReponse) {
      this.setState({
        alertMsg: errorReponse,
        alertSeverity: "error",
        loading: false,
      });
      return;
    }
  }

  handleWorkSpaceCreateItemCallIdResponse = (responseJson: any) => {
    if (responseJson.data) {
      this.setState(
        (prev) => {
          return {
            ...prev,
            modalSuccessAlert: "Subfolder Added Successfully",
            alertSeverity: "success",
          };
        },
        () => {this.getWorkspaceData();}
      );
      return;
    }

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
        workspaceAdminData: [],
        availableTL: [],
        unavailableTL: [],
        alertMsg: errorMsg,
        alertSeverity: "error",
      });
    }
  }

  handleWorkSpaceSearchItemCallIdSuccess = (responseJson: any) => {
    if (responseJson?.errors) {
      this.setState({tlresponsemessage: responseJson?.errors[0].message})
    } else {
      this.setState({clientteamleads: responseJson?.data})
      this.setState({teamleaddisplay: true})
      this.setState({availableTL: responseJson?.available_tl?.data})
      this.setState({unavailableTL: responseJson?.unavailable_tl?.data})
    }
  }

  handleWorkspaceUpdateItemCallIdErrorReponse = (errorReponse: any) => {
    if (errorReponse) {
      this.setState({
        alertMsg: errorReponse,
        alertSeverity: "error",
        loading: false,
      });
      return;
    }
  }

  handleWorkspaceUpdateItemCallIdResponse = (responseJson: any) => {
    if (responseJson.data) {
      this.setState(
        (prev) => {
          return {
            ...prev,
            workspaces: prev.workspaces.map((space: any) => {
              if (space.id === responseJson.data.id) {
                return responseJson.data;
              }
              return space;
            }),
            modalSuccessAlert: "Subfolder Updated Successfully",
            alertSeverity: "success",
          };
        },
        () => {
          this.getWorkspaceData();
        }
      );
      return;
    }

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
        workspaceAdminData: [],
        availableTL: [],
        unavailableTL: [],
        alertMsg: errorMsg,
      });
    }
  }

  handleWorkspaeDeleteItemCallIdErrorReponse = (errorReponse: any) => {
    if (errorReponse) {
      this.setState({
        alertMsg: errorReponse,
        alertSeverity: "error",
      });
      return;
    }
  }

  handleWorkspaceDeleteItemCallIdResponseSuccess = (responseJson: any) => {
    console.log(responseJson)
    this.setState(
      {
        loading: true,
        modalSuccessAlert: "Subfolder Deleted Successfully",
        alertSeverity: "success",
      },
      () => {
        this.getWorkspaceData();
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

  handleWorkspaceItemCallIdResponseSuccess = (responseJson: any) => {
      if (responseJson.data.length === 0) {
        this.setState({
          alertMsg: "Workspace Data was Not Found, try reloading!",
          loading: false,
        });
      } else {
        console.log(responseJson, "Workspace data")
        this.setState({
          workspaces: responseJson.data,
          loading: false,
        }, () => {
          this.getClientData()
        });
      }
    return;
  }

  handleWorkspaceItemCallIdResponseError = (responseJson: any) => {
    if (responseJson.message) {
      this.getClientData()

      this.setState({
        workspaces: [],
        workspaceAdminData: [],
        availableTL: [],
        unavailableTL: [],
        loading: false,
        alertMsg: "",
      });
    }

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
        workspaceAdminData: [],
        availableTL: [],
        unavailableTL: [],
        alertMsg: errorMsg,
      });
    }

    if (responseJson.error) {
      let errorMsg = responseJson.error;
      this.setState({
        workspaceAdminData: [],
        availableTL: [],
        unavailableTL: [],
        alertMsg: errorMsg,
      });
    }
    return;
  }

  handleClientItemCallIdErrorReponse = (errorReponse: any) => {
      this.setState({
        alertMsg: errorReponse,
        alertSeverity: "error",
      });
      return;
  }

  handleClientItemCallIdResponseSuccess = (responseJson: any) => {
    if (responseJson && !responseJson.errors && responseJson.data) {
      const { workspaceTitle, clientID, clientName, workspace_id } = this.getAttributes(responseJson.data)
      this.setState({
        loading: false,
        workspaceTitle,
        clientID,
        clientName,
        workspace_id
      });
    }  else {
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
          alertMsg: errorMsg,
          alertSeverity: "error",
        });
      }
      return;
    }
  }

  handleSearchSubfolderItemCallIdResponseSuccess =(responseJson: any) => {
    if (responseJson && !responseJson.errors && responseJson.data) {
      if (responseJson.data.length === 0) {
        this.setState({
          alertMsg: "Workspace Data was Not Found",
          loading: false,
        });
      } else {
        this.setState({
          workspaces: responseJson.data,
          loading: false,
        });
      }
    } else {
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
          workspaceAdminData: [],
          availableTL: [],
          unavailableTL: [],
          alertMsg: errorMsg,
        });
      }
    }
  }

  handleSearchSubfolderItemCallIdErrorReponse = (errorReponse: any) => {
      this.setState({
        alertMsg: errorReponse,
        alertSeverity: "error",
      });
      return;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token, loading: true }, () => {
        this.getWorkspaceData();
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
            return this.handleWorkspaceCreateItemCallIdErrorReponse(errorReponse)
          case this.workspaceUpdateItemCallId :
            return this.handleWorkspaceUpdateItemCallIdErrorReponse(errorReponse)
          case this.workspaceDeleteItemCallId :
            return this.handleWorkspaeDeleteItemCallIdErrorReponse(errorReponse)
          case this.clientItemCallId :
            return this.handleClientItemCallIdErrorReponse(errorReponse)
          case this.searchSubfolderItemCallId :
            return this.handleSearchSubfolderItemCallIdErrorReponse(errorReponse)
        }
      }

      if(responseJson && !responseJson?.errors) {
        switch(apiRequestCallId) {
          case this.workspaceDeleteItemCallId : 
            return this.handleWorkspaceDeleteItemCallIdResponseSuccess(responseJson)
          case this.clientItemCallId :
            return this.handleClientItemCallIdResponseSuccess(responseJson)
          case this.searchSubfolderItemCallId :
            return this.handleSearchSubfolderItemCallIdResponseSuccess(responseJson)
        }
      } else {
        switch(apiRequestCallId) {
          case this.workspaceDeleteItemCallId :
            return this.handleWorkspaceDeleteItemCallIdResponseError(responseJson)
        }
      }

      if(responseJson) {
        switch(apiRequestCallId) {
          case this.workspaceCreateItemCallId :
            return this.handleWorkSpaceCreateItemCallIdResponse(responseJson)   
          case  this.workspaceUpdateItemCallId :
            return this.handleWorkspaceUpdateItemCallIdResponse(responseJson)
        }
      }

      if(responseJson || !responseJson.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.workspaceSearchItemCallId :
            return this.handleWorkSpaceSearchItemCallIdSuccess(responseJson)
        }
      }

      if(responseJson && !responseJson.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.workspaceItemCallId :
            return this.handleWorkspaceItemCallIdResponseSuccess(responseJson)
        }
      } else {
        switch(apiRequestCallId) {
          case this.workspaceItemCallId :
            return this.handleWorkspaceItemCallIdResponseError(responseJson)
        }
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  createForm() {
    const formData = new FormData();
    formData.append("client_management_id", this.state.clientID);
    formData.append("workspace_id", this.state.workspace_id);
    formData.append("team_title", this.state.title);
    formData.append("description", this.state.description);

    for (const admin of this.state.admins) {
      formData.append("team_leader_ids[]", admin.id);
    }
    if (this.state.coverImgFile) {
      formData.append(
        "image",
        this.state.coverImgFile,
        `${this.state.title}-img.png`
      );
    }
    return formData
  }

  addWorkspace = () => {
    const { isInvalid, errors, isExist } = this.validate();
    if (isInvalid) {
      this.triggerWarning(errors, isExist);
      return;
    }

    this.createFolder(this.createForm());
    this.resetWorkspace();
    return;
  };

  saveWorkspace() {
    const { isInvalid, errors, isExist } = this.validate();
    if (isInvalid) {
      this.triggerWarning(errors, isExist);
      return;
    }

    this.updateFolder(this.createForm());
    this.resetWorkspace();
    return;
  }

  resetWorkspace() {
    this.setState((prev) => {
      return {
        ...prev,
        open: false,
        edit: false,
        deleteModal: false,
        coverImgFile: null,
        description: "",
        coverImg: "",
        coverImgError: "",
        title: "",
        searchValue: "",
        adminSearchValue: "",
        searchteamlead: "",
        newsearchteamlead: "",
        adminString: "",
        adminStringError: "",
        modalAlertMsg: "",
        descriptionError: "",
        modalSuccessAlert: "",
        titleError: "",
        inputError: "",
        admins: [],
        workspaceAdminData: [],
        availableTL: [],
        unavailableTL: [],
      };
    });
  }

  validate(errorsArray: string[] = [], current: string[] = []) {
    const requiredArray = [
      "coverImg",
      "description",
      "title",
    ] as const;

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
        if (client.id === this.state.folder_id) {
          current = current.concat(client.attributes.team_title.toLowerCase());
        }
        return client.attributes.team_title.toLowerCase().trim();
      })
      .includes(this.state.title.toLowerCase().trim());
    const salt = current.includes(this.state.title.toLowerCase().trim());
    const isExistAndSalt = isExistCheck && !salt;

    if (isExistAndSalt) {
      errorsArray = [...errorsArray, "titleError"];
    }

    const isInvalid = (isRequiredCheck || isExistAndSalt) && true;

    return { isInvalid, errors: errorsArray, isExist: isExistAndSalt };
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
      modalAlertMsg,
    });
  }

  triggerWarning(errorClasses: any, isExist: boolean) {
    const messageBody: any = {
      title: isExist
        ? configJSON.clientCreateError
        : configJSON.clientNameValidation,
      description: configJSON.descriptionValidation,
      coverImg: configJSON.coverImgValidation,
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

  getAttributes(folder: any) {
    const workspaceTitle = folder?.attributes.workspace.name;
    const workspace_id = folder?.attributes.workspace.id;
    const clientID = folder?.id;
    const clientName = folder?.attributes.client_name;
    return { workspaceTitle, clientID, clientName, workspace_id }
  }
  // Customizable Area End
}
