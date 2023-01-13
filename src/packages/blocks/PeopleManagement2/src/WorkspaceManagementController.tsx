import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import RestAPIResponceMessage from "../../../framework/src/Messages/RestAPIResponceMessage";
import React from "react";
import { SolarImage } from "./assets";

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  open: boolean;
  alertMsg: string;
  alertSeverity: "error" | "warning" | "info" | "success";
  modalAlertMsg: string;
  modalAlertSeverity: "error" | "warning" | "info" | "success";
  descriptionError: string;
  coverImgError: string;
  inputError: string;
  titleError: string;
  adminStringError: string;
  token: string;
  workspaces: any;
  edit: boolean;
  searchValue: string;
  description: string;
  username: string;
  title: string;
  coverImg: any;
  coverImgFile: any;
  workspace_id: string;
  workspaceAdminData: any;
  admins: any;
  adminString: string;
  modalSuccessAlert: string;
  [field: string]: unknown;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class WorkspaceManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  workspaceItemCallId: string = "";
  workspaceSearchItemCallId: string = "";
  workspaceUpdateItemCallId: string = "";
  workspaceDeleteItemCallId: string = "";
  dashboardApiCallId: string = "";
  imageItemCallId: string = "";
  workspaceCreateItemCallId: string = "";
  apiGetQueryStrinurl: string = "";

  workspaceTitleText = configJSON.workspaceTitleText;
  workspaceTitleButtonText = configJSON.workspaceTitleButtonText;
  errorInDescription: string = configJSON.errorInDescription;
  errorInTitleAndDescription: string = configJSON.errorInTitleAndDescription;
  errorInTitle: string = configJSON.errorInTitle;
  descriptionWarning = configJSON.maxDescriptionError;
  workspaceCreateError = configJSON.workspaceCreateError;

  actionButtonText: string;
  actionButtonAddText = configJSON.actionButtonAddText;
  actionButtonSaveText = configJSON.actionButtonSaveText;
  cancelButtonText = configJSON.actionButtonCancelText;
  modalAddTitle = configJSON.workspaceModalAddTitle;
  modalEditTitle = configJSON.workspaceModalEditTitle;

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
      description: "",
      username: "",
      title: "",
      token: "",
      coverImg: "",
      workspace_id: "",
      adminString: "",
      alertMsg: "",
      modalAlertMsg: "",
      alertSeverity: "warning",
      modalAlertSeverity: "warning",
      modalSuccessAlert: "",
      descriptionError: "",
      adminStringError: "",
      coverImgError: "",
      inputError: "",
      titleError: "",
      loading: false,
      open: false,
      edit: false,
      coverImgFile: null,
      workspaceAdminData: [],
      workspaces: [],
      admins: [],
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

  getAdminData(edit: boolean): boolean {
    // Customizable Area Start
    const header = {
      // "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.workspaceSearchItemCallId = requestMessage.messageId;
    const url = `${configJSON.WORKSPACE_SEARCH_URL}?workspace_id=${this.state.workspace_id}`
    // edit ? `${configJSON.WORKSPACE_SEARCH_URL}?workspace_id=${this.state.workspace_id
    //   }` :
    //   configJSON.WORKSPACE_SEARCH_ADMIN_URL
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      url
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

  createWorkspace(formdata: FormData): boolean {
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
      configJSON.WORKSPACE_GET_URL
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

  updateWorkspace(formdata: FormData): boolean {
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
      `${configJSON.WORKSPACE_GET_URL}/${this.state.workspace_id}`
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

  deleteWorkspace(id: string): boolean {
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
      `${configJSON.WORKSPACE_GET_URL}/${id}`
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

      if (this.workspaceCreateItemCallId === apiRequestCallId) {
        if (errorReponse) {
          this.setState({
            alertMsg: errorReponse,
            alertSeverity: "error",
            loading: false,
          });
          return;
        }

        if (responseJson.data) {
          this.setState(
            (prev) => {
              return {
                ...prev,
                modalSuccessAlert: "Workspace Added Successfully",
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
            alertMsg: errorMsg,
            alertSeverity: "error",
          });
        }
      }

      if (this.workspaceSearchItemCallId === apiRequestCallId) {
        if (errorReponse) {
          this.setState({
            alertMsg: errorReponse,
            alertSeverity: "error",
            loading: false,
          });
          return;
        }

        if (responseJson.data) {
          this.setState((prev) => {
            return {
              ...prev,
              workspaceAdminData: responseJson.data,
            };
          });
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
            modalAlertMsg: errorMsg,
            modalAlertSeverity: "info",
          });
        }
      }

      if (this.workspaceUpdateItemCallId === apiRequestCallId) {
        if (errorReponse) {
          this.setState({
            alertMsg: errorReponse,
            alertSeverity: "error",
            loading: false,
          });
          return;
        }

        if (responseJson.data) {
            console.log(responseJson)
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
                // alertMsg: "Workspace Updated Successfully",
                alertSeverity: "success",
                modalSuccessAlert: "Workspace Updated Successfully",
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
            alertMsg: errorMsg,
            alertSeverity: "error",
          });
        }
      }
      if (this.workspaceDeleteItemCallId === apiRequestCallId) {
        if (errorReponse) {
          this.setState({
            alertMsg: errorReponse,
            alertSeverity: "error",
            //   loading: false,
          });
          return;
        }

        if (responseJson && !responseJson.errors) {
          this.setState(
            {
              loading: true,
              alertMsg: "Workspace Removed Successfully",
              alertSeverity: "success",
            },
            () => {
              this.getWorkspaceData();
            }
          );
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
              //   loading: false,
              alertMsg: errorMsg,
              alertSeverity: "error",
            });
          }
        }
      }

      if (this.workspaceItemCallId === apiRequestCallId) {
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
        if (errorReponse) {
          this.setState({
            alertMsg: errorReponse,
            alertSeverity: "error",
            // loading: false,
          });
          return;
        }

        if (responseJson && !responseJson.errors && responseJson.data) {
          if (responseJson.data.length === 0) {
            this.setState({
              alertMsg: "Workspace Data was Not Found, try reloading!",
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
        }
        return;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  createForm() {
    const formData = new FormData();
    formData.append("name", this.state.title.trim());
    formData.append("description", this.state.description);
    for (const admin of this.state.admins) {
      formData.append("admin_ids[]", admin.id);
    }
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
    if (isInvalid) {
      this.triggerWarning(errors, isExist);
      return;
    }

    this.createWorkspace(this.createForm());
    this.resetWorkspace();
    return;
  };

  saveWorkspace() {
    if (!this.state.workspace_id) return;
    const { isInvalid, errors, isExist } = this.validate();
    if (isInvalid) {
      this.triggerWarning(errors, isExist);
      return;
    }

    console.log({ admins: this.state.admins, string: this.state.adminString });

    this.updateWorkspace(this.createForm());
    this.resetWorkspace();
    return;
  }

  validate(errorsArray: string[] = [], current: string[] = []) {
    const requiredArray = [
      "title",
      "description",
      "coverImg",
      "adminString"
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
      .map((workspace: any) => {
        if (workspace.id === this.state.workspace_id) {
          current = current.concat(workspace.attributes.name.toLowerCase());
        }
        return workspace.attributes.name.toLowerCase();
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

  resetWorkspace() {
    this.setState((prev) => {
      return {
        ...prev,
        open: false,
        edit: false,
        coverImgFile: null,
        description: "",
        coverImg: "",
        title: "",
        searchValue: "",
        adminString: "",
        admins: [],
        workspaceAdminData: [],
        modalAlertMsg: "",
        modalSuccessAlert: "",
        descriptionError: "",
        inputError: "",
        titleError: "",
        coverImgError: "",
        adminStringError: "",
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
      title: isExist
        ? configJSON.workspaceCreateError
        : configJSON.workspaceValidation,
      workspace_id: configJSON.workspaceValidation,
      description: configJSON.descriptionValidation,
      clientAddress: configJSON.clientAddressValidation,
      clientContact: configJSON.clientContactValidation,
      clientOfficialEmail: configJSON.clientOfficialEmailValidation,
      coverImg: configJSON.coverImgValidation,
      adminString: configJSON.adminValidation,
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
