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
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  token:any;
  invoiceStatus: boolean;
  invoiceId: any;
  isSubfolderClientNameForDefineInvoiceError: boolean;
  isSelectedCurrencyError: boolean;
  isSelectedFrequencyError: boolean;
  isProjectTypesError: boolean;
  isKwStructureError: boolean;
  isAdditionalCostPerFileError: boolean;
  isCgtsError: boolean;
  isIgstError: boolean;
  isSgstError: boolean;
  isOtherTaxError: boolean;
  projectTypes:any;
  kwStructure:any;
  selectedInvoiceMethodTab:any;
  selectedCurrency:any;
  selectedFrequency:any;
  projectInvoicingStructure:any;
  cgst:any;
  igst:any;
  sgst:any;
  otherTax:any;
  additionalCostPerFile:any;
  addClientSubfolderModal: any;
  defineInvoiceModal: any;
  editClientSubfolderModal: any;
  successAlertModal: any;
  isEditMode: any;
  menuoption: any;
  addSubfolderImage: any;
  uploadedSubfolderImage: any;
  editSubfolderImage: any;
  subfolderWorkspaceName: any;
  subfolderClientName: any;
  subfolderClientNameForDefineInvoice: any;
  subfolderClientId: any;
  addSubfolderTeamTitle: any;
  editSubfolderTeamtitle: any;
  addSubfolderDescription: any;
  addSubfolderDescriptionForInvoice: any;
  editsubfolderDescription: any;
  searchSubfolderTeamLeader: any;
  validateSubfolderDescription: any;
  anchorEl: any;
  subfolderList: any;
  currencyData: any;
  workspaceId: any;
  clientId: any;
  addworkspaceModal: any;
  editworkspaceModal: any;
  workspaceList: any;
  showWorkspace: any;
  uploadedworkspaceimage: any;
  editWorkspaceName: any;
  editWorkspacedescription: any;
  editWorkspaceAdmin: any;
  searchWorkspaceAdmin: any;
  adminSearchValue: any;
  workspaceAdmins: any;
  availableAdmin: any;
  unavailableAdmin: any;
  Admins: any;
  adminString: any;
  editWorkspaceImage: any;
  editworkspace_id: any;
  addWorkspaceName: any;
  addWorkspaceDescription: any;
  addWorkspaceAdmin: any;
  validateWorkspaceName: any;
  validateWorkspaceDescription: any;
  validateWorkspaceAdmins: any;
  modalsuccessmessage: any;
  addWorkspaceImage: any;
  clientnameunique: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ClientSubFolderController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
    defineInvoiceApiCallId: any;
    showInvoiceApiCallId: any;
    checkInvoiceStatusApiCallId: any;
    getAllProjectTypeApiCallId: any;
    currencyDataApiCallId: any;
    clientDataApiCallId: any;
    subfolderApiCallId: any;
    subfolderDataApiCallId: any;
    addSubfolderApiCallId: any;
    showTLApiCallId: any;
    showAdminApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      // arrayHolder: [],
      token: "",
      invoiceStatus: false,
      invoiceId: "",
      isSubfolderClientNameForDefineInvoiceError: false,
      isSelectedCurrencyError: false,
      isSelectedFrequencyError: false,
      isProjectTypesError: false,
      isKwStructureError: false,
      isAdditionalCostPerFileError: false,
      isCgtsError: false,
      isIgstError: false,
      isSgstError: false,
      isOtherTaxError: false,
      projectTypes: [],
      kwStructure: [
        {
          "from": "",
          "to": "",
          "price_per_unit": ""
      }
      ],
      selectedInvoiceMethodTab: 0,
      selectedCurrency: "",
      selectedFrequency: "",
      projectInvoicingStructure: "project_creation_date",
      cgst: "",
      igst: "",
      sgst: "",
      otherTax: "",
      additionalCostPerFile: "",
      addClientSubfolderModal: false,
      defineInvoiceModal: true,
      editClientSubfolderModal: false,
      successAlertModal: false,
      isEditMode: false,
      menuoption: false,
      addSubfolderImage: "",
      uploadedSubfolderImage: "",
      editSubfolderImage: "",
      subfolderWorkspaceName: "",
      subfolderClientName: "",
      subfolderClientNameForDefineInvoice: "",
      subfolderClientId: "",
      addSubfolderTeamTitle: "",
      editSubfolderTeamtitle: "",
      addSubfolderDescription: "",
      addSubfolderDescriptionForInvoice: "",
      editsubfolderDescription: "",
      searchSubfolderTeamLeader: "",
      validateSubfolderDescription: "",
      anchorEl: null,
      subfolderList: [],
      currencyData: [],
      workspaceId: "",
      clientId: "",
      addworkspaceModal: false,
      editworkspaceModal: false,
      workspaceList: [],
      showWorkspace: [],
      uploadedworkspaceimage: "",
      editWorkspaceName: "",
      editWorkspacedescription: "",
      editWorkspaceAdmin: "",
      searchWorkspaceAdmin: "",
      adminSearchValue: "",
      workspaceAdmins: [],
      availableAdmin: [],
      unavailableAdmin: [],
      Admins: [],
      adminString: "",
      editWorkspaceImage: "",
      editworkspace_id: "",
      addWorkspaceName: "",
      addWorkspaceDescription: "",
      addWorkspaceAdmin: "",
      validateWorkspaceName: "",
      validateWorkspaceDescription: "",
      validateWorkspaceAdmins: "",
      modalsuccessmessage: "",
      addWorkspaceImage: "",
      clientnameunique: "",
    // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleMenuOption = (e: any) => {
    this.setState({menuoption: true})
    this.setState({anchorEl: e.currentTarget})
  }

  handleMenuClose = () => {
    this.setState({menuoption: false})
    this.setState({anchorEl: null})
  }
  handleAddSubfolderModalOpen = () => {
    this.setState({addClientSubfolderModal: true})
  }
  handleCloseAddSubfolderModal = () => {
    this.setState({addClientSubfolderModal: false})
  }
  handleDefineInvoiceModalOpen = () => {
    this.setState({defineInvoiceModal: true})
  }
  handleCloseDefineInvoiceModal = () => {
    this.setState({defineInvoiceModal: false})
  }
  handleChangeCurrency = (e: any) => {
    this.setState({ selectedCurrency: e.target.value, isSelectedCurrencyError:false },()=>{
      console.log('selectedCurrency', this.state.selectedCurrency)
    });
  };
  handleChangeFrequency = (e: any) => {
    this.setState({ selectedFrequency: e.target.value, isSelectedFrequencyError: false },()=>{
      console.log('selectedFrequency', this.state.selectedFrequency)
    });
  };

  handleEditSubfolderModalOpen =(id: any, e: any) => {
    this.handleMenuClose()
    this.showSubfolderData(id)
    this.setState({editClientSubfolderModal: true})
  }

  handleCloseEditSubfolderModal = () => {
    this.setState({editClientSubfolderModal: false})
  }

  handleSuccessAlertModalClose = () => {
    this.setState({successAlertModal: false})
  }

  handleImageEdit = (e: any) => {
    this.setState({isEditMode: true})
    this.setState({uploadedSubfolderImage: e.target.files[0],})
  }

  handleImage = (e: any) => {
    this.setState({addSubfolderImage: e.target.files[0],})
  }


  getClientData = () => {
    let client_id = sessionStorage.getItem("client_id")
    const header = {
      "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.clientDataApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`/bx_block_client_management/clients/${client_id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleClientDetailResponse = (responseJson: any) => {
    console.clear()
    console.log("client Data: ", responseJson)
    this.checkInvoiceStatus(responseJson?.data?.id);
    this.setState({subfolderClientName: responseJson?.data?.attributes?.client_name})
    this.setState({subfolderClientNameForDefineInvoice: responseJson?.data?.attributes?.client_name})
    this.setState({subfolderWorkspaceName: responseJson?.data?.attributes?.workspace?.name})
    this.setState({clientId: responseJson?.data?.id})
    this.setState({workspaceId: responseJson?.data?.attributes?.workspace?.id})
    this.setState({subfolderClientId: responseJson?.data?.attributes?.client_id})

  }

  handleClientDetailResponseError = (responseJson: any) => {
    console.log("client details Error: ", responseJson)
  }

  handleGetSubfolderList =() => {
    let client_id = sessionStorage.getItem("client_id")
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.subfolderApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`subfolder_index?id=${client_id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  editDefineInvoice = () => {
    console.log('Callling editDefineInvoice ==================');
    
  }

  getDefinedInvoice =(invoiceId:any) => {

    if(!invoiceId){
      return;
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.showInvoiceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), `bx_block_invoicebilling/define_invoice/${invoiceId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  checkInvoiceStatus =(clientManagementsId:any) => {

    if(!clientManagementsId){
      return;
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.checkInvoiceStatusApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.checkInvoiceStatus+`?client_managements_id=${clientManagementsId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  getProjectTypes =() => {
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getAllProjectTypeApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getAllProjectType);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  handleCurrencyList =() => {
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.currencyDataApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`bx_block_download/invoice/all_currency`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  handleGetSubfolderResponse = (responseJson: any) => {
    this.setState({subfolderList: responseJson?.data})
  }

  handleCurrencyDataResponse = (responseJson: any) => {
    console.log("ResponseJson client responseJson?.Currency_code: ", responseJson?.Currency_code)
    this.setState({currencyData: responseJson?.Currency_code})
  }

  handleGetSubfolderResponseError = (responseJson: any) => {
    console.log("ResponseJson client subfolder Error: ", responseJson)
  }

  showSubfolderData = (id: any) => {
    let subfolder_id = id
    const header = {
      "Content-Type": configJSON.CONTENT_TYPE,
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.subfolderDataApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`show_subfolder/${subfolder_id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleShowSubfolderDataResponse = (responseJson: any) => {
    console.log("Show response", responseJson)
    this.setState({editSubfolderTeamtitle: responseJson?.data?.attributes?.team_title})
    this.setState({editsubfolderDescription: responseJson?.data?.attributes?.description})
    this.setState({editSubfolderImage: responseJson?.data?.attributes?.image})
  }

  addSubfolderData = () => {
    const header = {
      'token': window.localStorage.getItem('token'),
    };
    let formData = new FormData();
    formData.append('workspace_id', this.state.workspaceId)
    formData.append('client_management_id', this.state.clientId)
    formData.append('team_title', this.state.addSubfolderTeamTitle)
    formData.append('description', this.state.addSubfolderDescription);
    for (const team_leaders of this.state.searchSubfolderTeamLeader) {
      formData.append("team_leader_ids[]", team_leaders.id);
    }
    if(this.state.addSubfolderImage != 0) {
      formData.append('image', this.state.addSubfolderImage);
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.addSubfolderApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),"bx_block_workspace_management/workspaces");
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),formData);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"POST");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleAddSubfolderResponse = (responseJson: any) => {
    console.log("Add subfolder", responseJson)
  }

  // Customizable Area End


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
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    
      if(responseJson && !responseJson.errors && apiRequestCallId ==this.currencyDataApiCallId){
        this.handleCurrencyDataResponse(responseJson)
      }

      if(responseJson && !responseJson.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.clientDataApiCallId :
            return this.handleClientDetailResponse(responseJson)
          case this.subfolderApiCallId :
            return this.handleGetSubfolderResponse(responseJson)
          case this.subfolderDataApiCallId :
            return this.handleShowSubfolderDataResponse(responseJson)
          case this.addSubfolderApiCallId : 
            return this.handleAddSubfolderResponse(responseJson)
        }
      }
      else {
        switch(apiRequestCallId) {
          case this.clientDataApiCallId :
            return this.handleClientDetailResponseError(responseJson)
          case this.subfolderApiCallId :
            return this.handleGetSubfolderResponseError(responseJson)
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
  async componentDidMount(): Promise<void> {
    document.body.style.backgroundColor = "#EEEEEE";
    document.body.style.fontFamily = "sans-serif";
  }
  // Customizable Area End
}
