import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history:any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  allClientData: any;
  loader: boolean;
  workspacesData: any;
  selectedWorkspaceNames: any;
  isAddClientModal: any;
  handleAddClientModalOpen: any;
  handleAddClientModalClose: any;
  isButtonLoading: any;
  isSnackBarVisible: any;
  snackBarMessage: any;
  handleSnackbarVisibleOpen: any;
  handleSnackbarVisibleClose: any;
  snackStatus: any;
  isDeleteClientModalVisible: any;
  handleDeleteClientModalOpen: any;
  handleDeleteClientModalClose: any;
  deleteClient: any;
  isEditClientModalVisible: any;
  handleEditClientModalOpen: any;
  handleEditClientModalClose: any;
  updateClient: any;
  searchedTL: any;
  selectedTL: any;
  getTeamLead: any;
  available_tl: any;
  unavailable_tl: any;
  handleSelectTl: any;
  removeSelectedTl: any;
  workspace_id: any;
  handleWorkspaceId: any;
  clientIdToBeRemove: any;
  teamLeadSearch: any;
  handleTeamLeadValue: any;
  searchClientValue:any;
  history:any;
  isStatusModalVisible:any;
  handleEmptySnackBar:any;
  popOverBoolean:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ClientManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  searchFunction: any;
  tlSearchFunction: any;
  getAllClientsApiId: string = "";
  getAllWorkspacesId: string = "";
  getSearchWorkspaceId: string = "";
  postAddClientId: string = "";
  deleteClientId: string = "";
  updateClientId: string = "";
  getSearchTlID: string = "";

  workspaceSearchEndPoint: string = "";
  clientsearchValue: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      history:this.props.history,
      allClientData: [],
      loader: true,
      workspacesData: [],
      selectedWorkspaceNames: [],
      isAddClientModal: false,
      handleAddClientModalOpen: () => this.setState({ isAddClientModal: true, snackBarMessage:""}),
      handleAddClientModalClose: () =>
        this.setState({
          isAddClientModal: false,
          available_tl: [],
          unavailable_tl: [],
          selectedTL: [],
          workspace_id: "",
        }),
      isButtonLoading: false,
      isSnackBarVisible: false,
      snackBarMessage: "",
      handleSnackbarVisibleOpen: () =>
        this.setState({ isSnackBarVisible: true }),
      handleSnackbarVisibleClose: () =>
        this.setState({ isSnackBarVisible: false }),
      snackStatus: "",
      isDeleteClientModalVisible: false,
      handleDeleteClientModalOpen: () =>
        this.setState({ isDeleteClientModalVisible: true }),
      handleDeleteClientModalClose: () =>
        this.setState({ isDeleteClientModalVisible: false }),
      deleteClient: (id: any) => this.deleteClientRequest(id),
      isEditClientModalVisible: false,
      handleEditClientModalOpen: (arr: any, id: any) => {
        this.setState({
          isEditClientModalVisible: true,
          workspace_id: id,
          snackBarMessage:""
        });

        setTimeout(() => {
          this.setState({ selectedTL: [...arr] });
        }, [1000]);
      },
      handleEditClientModalClose: () =>
        this.setState({
          isEditClientModalVisible: false,
          available_tl: [],
          unavailable_tl: [],
          selectedTL: [],
        }),
      updateClient: (formData: any, id: any) =>
        this.updateClientRequest(formData, id),
      searchedTL: [],
      selectedTL: [],
      handleSelectTl: (arr: any) =>
        (this.state.selectedTL.filter((e:any) => e.id === arr.id).length == 0) &&
        this.setState({ selectedTL: [...this.state.selectedTL, arr] }),
      removeSelectedTl: (arr: any) =>
        this.setState({
          selectedTL: [
            ...this.state.selectedTL.filter((el: any) => el.id != arr.id),
          ],
        }),
      available_tl: [],
      unavailable_tl: [],
      getTeamLead: (value: any, workspace_id: any) =>
        this.handleSearchTlDebouncer(value, workspace_id),
      workspace_id: "",
      handleWorkspaceId: (value: any) => this.setState({ workspace_id: value }),
      clientIdToBeRemove: "",
      teamLeadSearch: "",
      handleTeamLeadValue: (value: any) =>
        this.setState({ teamLeadSearch: value }),
        searchClientValue:"",
        isStatusModalVisible:false,
        handleEmptySnackBar:()=>{this.setState({snackBarMessage:""})},
        popOverBoolean:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
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
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.error) {
        switch (apiRequestCallId) {
          case this.getAllClientsApiId:
            this.handleGetAllClientApiResponse(responseJson);
            break;

          case this.getAllWorkspacesId:
            this.handleGetAllWorkspaceApiResponse(responseJson);
            break;

          case this.getSearchWorkspaceId:
            this.handleGetSearchWorkspaceApiResponse(responseJson);
            break;

          case this.postAddClientId:
            this.handlePostAddClientApiResponse(responseJson);
            break;

          case this.deleteClientId:
            this.handleDeleteClientApiResponse(responseJson);
            break;

          case this.updateClientId:
            this.handleUpdateClientApiResponse(responseJson);
            break;

          case this.getSearchTlID:
            this.handleGetSearchTlidApiResponse(responseJson);
            break;

          default:
            break;
        }
      } else {
        this.setState({ loader: false, isButtonLoading: false });
      }
    }
    // Customizable Area End
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

  getAllClients = () => {
    // Customizable Area Start
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllClientsApiId = requestMessage.messageId;
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
  };

  getAllWorkspaces = () => {
    // Customizable Area Start
    const header = {
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllWorkspacesId = requestMessage.messageId;
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
  };

  getSearchedWorkspace = (value: any) => {
    // Customizable Area Start
    const header = {
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSearchWorkspaceId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CLIENT_SEARCH_URL + `?` + value
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
  };

  postAddClient = (formData: any) => {
    this.setState({ isButtonLoading: true });
    const header = {
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postAddClientId = requestMessage.messageId;
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
      formData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POST_METHOD_TYPE
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  updateClientRequest = (formData: any, id: any) => {
    this.setState({ isButtonLoading: true });
    const header = {
      token: localStorage.getItem("token"),
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateClientId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CLIENT_GET_URL + "/" + id
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
      configJSON.PUT_METHOD_TYPE
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  deleteClientRequest = (id: any) => {
    // Customizable Area Start
    this.setState({ clientIdToBeRemove: id });
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteClientId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.CLIENT_GET_URL + "/" + id
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
  };

  getSearchTl = (value: any, wokspace_id: any) => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSearchTlID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `search_TL_manager?search=${value}&id=${wokspace_id}`
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
  };

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<S>,
    snapshot?: SS | undefined
  ): void {
    this.state.teamLeadSearch != prevState.teamLeadSearch &&
      this.state.workspace_id &&
      this.handleSearchTlDebouncer(
        this.state.teamLeadSearch,
        this.state.workspace_id
      );

    this.state.workspace_id != prevState.workspace_id &&
      this.handleSearchTlDebouncer(
        this.state.teamLeadSearch,
        this.state.workspace_id
      );

    this.state.workspace_id !== prevState.workspace_id &&
      this.setState({ selectedTL: [], available_tl: [], unavailable_tl: [] });
  }

  async componentDidMount(): Promise<void> {
    document.body.style.backgroundColor = "#EEEEEE";
    document.body.style.fontFamily = "sans-serif";
    this.getAllClients();
    this.getAllWorkspaces();

  }


  handleAddClientModalOpen = () => {
    this.setState({ isAddClientModal: true });
  };

  handleAddClientModalClose = () => {
    this.setState({ isAddClientModal: false });
  };

  handleSearchTlDebouncer = (value: any, workspace_id: any) => {
    if (this.tlSearchFunction) {
      clearInterval(this.tlSearchFunction);
    }

    this.tlSearchFunction = setTimeout(() => {
      value.trim().length != 0 && this.getSearchTl(value, workspace_id);
      value.trim().length == 0 &&
        this.setState({ available_tl: [], unavailable_tl: [] });
    }, 1000);
  };

  handleChangeWorkspaceandClientSearch = (event: any, type: any) => {
    type == "dropDown" && this.handleChangeWorkspace(event);
    type == "else" && this.handleChangeSearch(event);
  };

  handleClearSearch=()=>{
    const events = {target:{value:""}};
    this.setState({searchClientValue:""});
    this.clientsearchValue="";
    this.handleChangeSearch(events);
  }

  handleChangeWorkspace = (event: any) => {
    const {
      target: { value },
    } = event;

    if (value[value.length - 1] === "all") {
      this.setState({
        selectedWorkspaceNames:
          this.state.selectedWorkspaceNames.length ===
          this.state.workspacesData.length
            ? []
            : this.state.workspacesData,
      });
      const dataArray =
        this.state.selectedWorkspaceNames.length ===
        this.state.workspacesData.length
          ? []
          : this.state.workspacesData;
      const idArray = dataArray.map((el: any) => `workspace_id[]=${el.id}&`);
      this.workspaceSearchEndPoint = idArray.join("");
      idArray.join("").trim().length != 0 &&
        this.getSearchedWorkspace(
          this.workspaceSearchEndPoint + `search=${this.clientsearchValue}`
        );
      idArray.join("").trim().length == 0 &&
        this.setState({ allClientData: [] });
      return;
    }

    const searchEndPoint =
      this.clientsearchValue.trim().length != 0 &&
      this.workspaceSearchEndPoint.trim().length != 0
        ? `search=${this.clientsearchValue}`
        : "";
    this.setState({ selectedWorkspaceNames: value, loader: true });
    const idArray = value.map((el: any) => `workspace_id[]=${el.id}&`);
    this.workspaceSearchEndPoint = idArray.join(``);
    this.workspaceSearchEndPoint.trim().length !== 0 &&
      this.getSearchedWorkspace(this.workspaceSearchEndPoint + searchEndPoint);
    this.workspaceSearchEndPoint.trim().length === 0 &&
      this.setState({ loader: false, allClientData: [] });
  };

  handleChangeSearch = (event: any) => {
    this.clientsearchValue = event.target.value;
    this.setState({searchClientValue:event.target.value});
    if (this.searchFunction) {
      clearTimeout(this.searchFunction);
    }

    const searchEndPoint = `search=${this.clientsearchValue}`;

    this.setState({ loader: true });
    this.searchFunction = setTimeout(() => {
      this.state.selectedWorkspaceNames.length !== 0 &&
        this.getSearchedWorkspace(
          this.workspaceSearchEndPoint + searchEndPoint
        );
      this.state.selectedWorkspaceNames.length === 0 &&
        this.setState({ loader: false });
    }, 1000);
  };

  handleGetAllClientApiResponse = (responseJson: any) => {
    this.setState({
      allClientData: [...responseJson.data],
      loader: false,
    });
    responseJson.errors && this.setState({ allClientData: [], loader: false });
  };

  handleGetAllWorkspaceApiResponse = (responseJson: any) => {
    this.setState({
      workspacesData: [...responseJson.data],
      selectedWorkspaceNames: [...responseJson.data],
    });
  };

  handleGetSearchWorkspaceApiResponse = (responseJson: any) => {
    !responseJson.errors &&
      this.setState({
        allClientData: [...responseJson.data],
        loader: false,
      });
    responseJson.errors && this.setState({ allClientData: [], loader: false });
  };

  handlePostAddClientApiResponse = (responseJson: any) => {
    responseJson.data && this.handleClientOrder(responseJson)
     
    responseJson.errors &&
      this.setState({
        snackBarMessage:
          "Client already exist",
        selectedTL: [],
        available_tl: [],
        unavailable_tl: [],
      });
  };

  handleClientOrder=(responseJson:any)=>{
      let arr = [responseJson.data,...this.state.allClientData];
     arr = arr.sort((a,b)=>a.attributes.client_name.trim().localeCompare(b.attributes.client_name.trim()));

      this.setState({
        // snackStatus: "success",
        allClientData: [...arr],
        snackBarMessage: "Client Added",
        isButtonLoading: false,
        isAddClientModal: false,
        isStatusModalVisible:true
        // isSnackBarVisible: true,
      });


  }

  handleDeleteClientApiResponse = (responseJson: any) => {
    responseJson.message &&
      this.setState({
        // snackStatus: "success",
        allClientData: this.state.allClientData.filter(
          (el: any) => el.id != this.state.clientIdToBeRemove
        ),
        snackBarMessage: "Client Deleted",
        isButtonLoading: false,
        isDeleteClientModalVisible: false,
        isStatusModalVisible:true,
        selectedTL: [],
        available_tl: [],
        unavailable_tl: [],
      });

    responseJson.errors &&
      this.setState({
        snackStatus: "info",
        snackBarMessage: responseJson.errors[0].message,
        isButtonLoading: false,
        isDeleteClientModalVisible: false,
      });
  };

  handleUpdateClientApiResponse = (responseJson: any) => {
    responseJson.data &&
      this.setState({
        snackStatus: "success",
        popOverBoolean:!this.state.popOverBoolean,
        snackBarMessage: "Client Updated",
        isButtonLoading: false,
        isEditClientModalVisible: false,
        // isSnackBarVisible: true,
        isStatusModalVisible:true,
        allClientData: this.state.allClientData.map((el: any) =>
          responseJson.data.id == el.id ? responseJson.data : el
        ),
      });

    responseJson.errors &&
      this.setState({
        snackBarMessage: "Client Already exist",
        // snackStatus: "info",
        // isButtonLoading: false,
        // isDeleteClientModalVisible: false,
        // isSnackBarVisible: true,
      });
  };

  handleGetSearchTlidApiResponse = (responseJson: any) => {
    responseJson.available_tl &&
      this.setState({
        available_tl: [...responseJson.available_tl.data],
        unavailable_tl: [...responseJson.unavailable_tl.data],
      });
    responseJson.errors &&
      this.setState({ available_tl: [], unavailable_tl: [] });
  };

  handleCloseStatusModal = ()=>{
    this.setState({isStatusModalVisible:false});
  }

  handleOpenStatusModal = ()=>{
    this.setState({isStatusModalVisible:true});
  }

  // Customizable Area End
}
