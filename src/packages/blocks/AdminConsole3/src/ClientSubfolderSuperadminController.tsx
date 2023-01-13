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

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  copy_projectTypes:any;
  copy_subfolderClientNameForDefineInvoice:any;
  copy_selectedCurrency:any;
  copy_selectedFrequency:any;
  copy_cgst:any;
  copy_igst:any;
  copy_sgst:any;
  copy_additionalCostPerFile:any;
  copy_otherTax:any;
  copy_addSubfolderDescriptionForInvoice:any;
  copy_kwStructure:any;
  copy_projectInvoicingStructure:any;
  copy_selectedInvoiceMethodTab:any;
  invoiceStatus: boolean;
  invoiceId: any;
  isSubfolderClientNameForDefineInvoiceError: boolean;
  isSelectedCurrencyError: boolean;
  isSelectedFrequencyError: boolean;
  isProjectTypesError: boolean;
  isKwStructureError: boolean;
  isKwStructureDataError: boolean;
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
  defineInvoiceModal: any;
  subfolderClientNameForDefineInvoice: any;
  addSubfolderDescriptionForInvoice: any;
  currencyData: any;
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
  addWorkspaceImage: any;
  clientnameunique: any;
  addClientSubfolderModal: any;
  editClientSubfolderModal: any;
  deleteClientSubfolderModal: any;
  successAlertModal: any;
  isEditMode: any;
  menuoption: any;
  addSubfolderImage: any;
  uploadedSubfolderImage: any;
  editSubfolderImage: any;
  subfolderWorkspaceName: any;
  subfolderClientName: any;
  subfolderClientId: any;
  addSubfolderTeamTitle: any;
  editSubfolderTeamtitle: any;
  addSubfolderDescription: any;
  editsubfolderDescription: any;
  searchSubfolderTeamLeader: any;
  validateSubfolderDescription: any;
  anchorEl: any;
  subfolderList: any;
  workspaceId: any;
  clientId: any;
  subfolder_id: any;
  deleteClientSubfolderName: any;
  selectedSubfolder: any;
  teamLeadSearchValue :any;
  subfolderteamleads: any;
  availableTL: any;
  unavailableTL :any;
  teamLeaders: any;
  teamLeaderString: any;
  modalsuccessmessage: any;
  teamTitleValidation: any;
  imageValidation: any;
  teamLeaderValidation: any;
  searchsubclient:any;
  errorRes :any;
  errorInAddEdit: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ClientSubfolderSuperadminController extends BlockComponent<Props, S, SS> {

  // Customizable Area Start
    clientDataApiCallId: any;
    subfolderApiCallId: any;
    subfolderDataApiCallId: any;
    addSubfolderApiCallId: any;
    showTLApiCallId: any;
    showAdminApiCallId: any;
    updateSubfolderApiCallId: any;
    deleteSubfolderCallId: any;
    defineInvoiceApiCallId: any;
    showInvoiceApiCallId: any;
    checkInvoiceStatusApiCallId: any;
    getAllProjectTypeApiCallId: any;
    currencyDataApiCallId: any;
    query: any = new URLSearchParams(this.props.history?.location?.search);
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      addClientSubfolderModal: false,
      editClientSubfolderModal: false,
      deleteClientSubfolderModal: false,
      successAlertModal: false,
      isEditMode: false,
      menuoption: false,
      addSubfolderImage: "",
      uploadedSubfolderImage: "",
      editSubfolderImage: "",
      subfolderWorkspaceName: "",
      subfolderClientName: "",
      subfolderClientId: "",
      addSubfolderTeamTitle: "",
      editSubfolderTeamtitle: "",
      addSubfolderDescription: "",
      editsubfolderDescription: "",
      searchSubfolderTeamLeader: "",
      validateSubfolderDescription: "",
      anchorEl: null,
      subfolderList: [],
      workspaceId: "",
      clientId: "",
      subfolder_id: "",
      deleteClientSubfolderName: "",
      selectedSubfolder: "",
      teamLeadSearchValue: "",
      subfolderteamleads: [],
      availableTL: [],
      unavailableTL: [],
      teamLeaders: [],
      teamLeaderString: "",
      modalsuccessmessage: "",
      teamTitleValidation: "",
      imageValidation: "",
      teamLeaderValidation: "",
      searchsubclient: "",
      invoiceStatus: false,
      invoiceId: "",
      isSubfolderClientNameForDefineInvoiceError: false,
      isSelectedCurrencyError: false,
      isSelectedFrequencyError: false,
      isProjectTypesError: false,
      isKwStructureError: false,
      isKwStructureDataError: false,
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
      copy_projectTypes:"",
      copy_subfolderClientNameForDefineInvoice:"",
      copy_selectedCurrency:"",
      copy_selectedFrequency:"",
      copy_cgst:"",
      copy_igst:"",
      copy_sgst:"",
      copy_additionalCostPerFile:"",
      copy_otherTax:"",
      copy_addSubfolderDescriptionForInvoice:"",
      copy_kwStructure:"",
      copy_projectInvoicingStructure:"",
      copy_selectedInvoiceMethodTab: 0,
      selectedInvoiceMethodTab: 0,
      selectedCurrency: "",
      selectedFrequency: "",
      projectInvoicingStructure: "project_creation_date",
      cgst: "",
      igst: "",
      sgst: "",
      otherTax: "",
      additionalCostPerFile: "",     
      defineInvoiceModal: false,    
      subfolderClientNameForDefineInvoice: "",      
      addSubfolderDescriptionForInvoice: "",      
      currencyData: [],      
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
      addWorkspaceImage: "",
      clientnameunique: "",
      errorRes: "",
      errorInAddEdit: false,

    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  handleDefineInvoiceModalOpen = () => {
    this.setState({defineInvoiceModal: true,
      copy_projectTypes: this.state.projectTypes,
      copy_subfolderClientNameForDefineInvoice: this.state.subfolderClientNameForDefineInvoice,
      copy_selectedCurrency: this.state.selectedCurrency,
      copy_selectedFrequency: this.state.selectedFrequency,
      copy_cgst: this.state.cgst,
      copy_igst: this.state.igst,
      copy_sgst: this.state.sgst,
      copy_additionalCostPerFile: this.state.additionalCostPerFile,
      copy_otherTax: this.state.otherTax,
      copy_addSubfolderDescriptionForInvoice: this.state.addSubfolderDescriptionForInvoice,
      copy_kwStructure: this.state.kwStructure,
      copy_projectInvoicingStructure: this.state.projectInvoicingStructure,
      copy_selectedInvoiceMethodTab: this.state.selectedInvoiceMethodTab
    })
  };

  handleCloseDefineInvoiceModal = () => {
    this.setState({defineInvoiceModal: false,
    isSubfolderClientNameForDefineInvoiceError:false,
    isSelectedFrequencyError:false,
    isSelectedCurrencyError:false,
    isKwStructureError:false,
    isKwStructureDataError:false,
    isProjectTypesError:false,
    isAdditionalCostPerFileError:false,
    isCgtsError:false,
    isIgstError:false,
    isSgstError:false,
    isOtherTaxError:false,
    })

    if(this.state.invoiceStatus){      
      this.setState({
        projectTypes: this.state.copy_projectTypes,
        subfolderClientNameForDefineInvoice: this.state.copy_subfolderClientNameForDefineInvoice,
        selectedCurrency: this.state.copy_selectedCurrency,
        selectedFrequency: this.state.copy_selectedFrequency,
        cgst: this.state.copy_cgst,
        igst: this.state.copy_igst,
        sgst: this.state.copy_sgst,
        additionalCostPerFile: this.state.copy_additionalCostPerFile,
        otherTax: this.state.copy_otherTax,
        addSubfolderDescriptionForInvoice: this.state.copy_addSubfolderDescriptionForInvoice,
        kwStructure: this.state.copy_kwStructure,
        projectInvoicingStructure: this.state.copy_projectInvoicingStructure,
        selectedInvoiceMethodTab: this.state.copy_selectedInvoiceMethodTab
      })
    }else{
      let updatedProjectType = [];
    
              for (const element of this.state.projectTypes) {
                let item = {
                    "project_type": element.project_type,
                    "price_per_file": ""
                };
    
                updatedProjectType.push(item);
              }

            this.setState({
              projectTypes:updatedProjectType,
              subfolderClientNameForDefineInvoice:this.state.copy_subfolderClientNameForDefineInvoice,
              selectedCurrency:"",
              selectedFrequency:"",
              cgst:"",
              igst:"",
              sgst:"",
              additionalCostPerFile:"",
              otherTax:"",
              addSubfolderDescriptionForInvoice: "",
              kwStructure: [
                {
                  "from": "",
                  "to": "",
                  "price_per_unit": ""
              }
              ],
            });
    }
  };

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

  handleMenuOption = (e: any, id: any, title :any) => {
    this.setState({menuoption: true})
    this.setState({selectedSubfolder: id})
    this.setState({deleteClientSubfolderName: title})
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
    this.setState({teamLeaders: []})
    this.setState({searchSubfolderTeamLeader: ""})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.setState({imageValidation: ""})
    this.setState({teamLeaderValidation: ""})
    this.setState({teamTitleValidation: ""})
    this.setState({searchSubfolderTeamLeader: ""})
    this.setState({addSubfolderImage: ""})
    this.setState({addSubfolderTeamTitle: ""})
    this.setState({addSubfolderDescription: ""})
    this.setState({errorInAddEdit: false})
  }
  handleEditSubfolderAdminModalOpen =(id: any, e: any) => {
    this.handleMenuClose()
    this.showSubfolderData(id)
    this.setState({editClientSubfolderModal: true})
    this.state.subfolderList.map((subfolder: any) => {
      if (subfolder.id === id) {
        const teamLeaderString = subfolder.attributes.team_leaders.data.map((user: any) =>`${user.attributes.first_name} ${user.attributes.last_name}`).join("; ");
        this.setState(
          (prev) => {
            return {
              ...prev,
              teamLeaders: subfolder.attributes.team_leaders.data,
              teamLeaderString,
            };
          },
        );
        return subfolder;
      }
      return undefined;
    });
  }

  handleEditSubfolderModalOpen =(id: any, e: any) => {
    // this.setState({selectedSubfolder: id})
    this.handleMenuClose()
    this.showSubfolderData(this.state.selectedSubfolder)
    this.setState({editClientSubfolderModal: true})
    this.state.subfolderList.map((subfolder: any) => {
      if (subfolder.id === id) {
        const teamLeaderString = subfolder.attributes.team_leaders.data.map((user: any) =>`${user.attributes.first_name} ${user.attributes.last_name}`).join("; ");
        this.setState(
          (prev) => {
            return {
              ...prev,
              teamLeaders: subfolder.attributes.team_leaders.data,
              teamLeaderString,
            };
          },
        );
        return subfolder;
      }
      return undefined;
    });
  }

  handleCloseEditSubfolderModal = () => {
    this.setState({editClientSubfolderModal: false})
    this.setState({teamLeaders: []})
    this.setState({searchSubfolderTeamLeader: ""})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.setState({imageValidation: ""})
    this.setState({teamLeaderValidation: ""})
    this.setState({teamTitleValidation: ""})
    this.setState({searchSubfolderTeamLeader: ""})
  }

  handleDeleteSubfolderModalOpen = (id: any, name: any, e: any) => {
    this.handleMenuClose()
    this.setState({deleteClientSubfolderModal: true})
  }

  handleCloseDeleteSubfolderModalOpen = () => {
    this.setState({deleteClientSubfolderModal: false})
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


  editDefineInvoice = () => {

    if(this.isError()){
      return;
    }

    if(this.state.selectedInvoiceMethodTab == 1){ //kw_structure
      let prev:any = null;

      for (let index = 0; index < this.state.kwStructure?.length; index++) {
        const element = this.state.kwStructure[index];
        if(element.from >= element.to){
          this.setState({isKwStructureDataError: true});
          return;
        }
        if(element.from <= prev?.to){
          this.setState({isKwStructureDataError: true});
          return;
        }
        prev = element;
      }
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "content-type": "application/json"
    };

    let reqBody:any = {
            // "client_managements_id": parseInt(this.state.clientId),
            "client_name": this.state.subfolderClientNameForDefineInvoice,
            "currency": this.state.selectedCurrency,
            "invoice_frequency": this.state.selectedFrequency, 
            "description": this.state.addSubfolderDescriptionForInvoice,
            "project_invoicing_structure": this.state.projectInvoicingStructure,
            "invoice_generation_method": this.getInvoiceGenerateionMethod(),
            "cgst":  this.state.cgst,
            "igst": this.state.igst,
            "sgst": this.state.sgst,
            "other_tax": this.state.otherTax,
    };

      let updatedProjectTypes = this.getUpdatedProjectTypes()
      
      reqBody.method_data = updatedProjectTypes;
      reqBody.additional_cost_per_file= this.state.additionalCostPerFile;

       let updatedkwStructure = this.state.kwStructure.map((e:any)=>{
      return {
        "kw_id": e?.id ? e?.id : "",
        "from": e?.from,
        "to": e?.to,
        "price_per_unit":e?.price_per_unit,
      }
    });
      reqBody.text_component = updatedkwStructure;
    // }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.defineInvoiceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`bx_block_invoicebilling/define_invoice/update_define_invoice?id=${this.state.invoiceId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),JSON.stringify(reqBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"PUT");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }

  isError=()=>{
    let isError = false; 
    if(this.state.subfolderClientNameForDefineInvoice?.length == ""){
      this.setState({isSubfolderClientNameForDefineInvoiceError:true});
      isError = true;
    }
    if(this.state.selectedCurrency == ""){
      this.setState({isSelectedCurrencyError:true});
      isError = true;
    }
    if(this.state.selectedFrequency == ""){
      this.setState({isSelectedFrequencyError:true});
      isError = true;
    }
    if(this.state.selectedInvoiceMethodTab == 1){ //kw_structure
      for (const element of this.state.kwStructure) {
        if(element.from == "" || element.to == "" || element.price_per_unit == ""){
          this.setState({isKwStructureError:true});
          isError = true;
        }
      }
    }
  
    
    isError = this.isError2(isError)

    return isError;
  }

  isError2=(isError1:any)=>{
    let isError = isError1;
    if(this.state.selectedInvoiceMethodTab == 0){ //Type and side elevation structure
      for (const el of this.state.projectTypes) {
        if(el.price_per_file == ""){
          this.setState({isProjectTypesError:true});
          isError = true;
        }
      }
    }
    if(this.state.selectedInvoiceMethodTab == 0 && this.state.additionalCostPerFile?.length == ""){
      this.setState({isAdditionalCostPerFileError:true});
      isError = true;
    }
    if(this.state.cgst?.length == ""){
      this.setState({isCgtsError:true});
      isError = true;
    }
    if(this.state.igst?.length == ""){
      this.setState({isIgstError:true});
      isError = true;
    }
    if(this.state.sgst?.length == ""){
      this.setState({isSgstError:true});
      isError = true;
    }
    if(this.state.otherTax?.length == ""){
      this.setState({isOtherTaxError:true});
      isError = true;
    }

    return isError;
  }

  getUpdatedProjectTypes=()=>{
    return this.state.projectTypes.map((e:any)=>{
      return {
      "ts_id": e?.id ? e?.id : "",
      "project_type": e?.project_type,
      "price_per_file": e?.price_per_file
    }
  });
  }

  getInvoiceGenerateionMethod=()=>{
    return this.state.selectedInvoiceMethodTab ? "kw_structure" : "type_side_elevation_structure"
  }

  saveDefineInvoice = () => {
    if(this.isError()){
      return;
    }

    if(this.state.selectedInvoiceMethodTab == 1){ //kw_structure
      let prev:any = null;

      for (let index = 0; index < this.state.kwStructure?.length; index++) {
        const element = this.state.kwStructure[index];
        if(element.from >= element.to){
          this.setState({isKwStructureDataError: true});
          return;
        }
        if(element.from <= prev?.to){
          this.setState({isKwStructureDataError: true});
          return;
        }
        prev = element;
      }
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "content-type": "application/json"
    };

    let reqBody:any = {
            "client_managements_id": parseInt(this.state.clientId),
            "client_name": this.state.subfolderClientNameForDefineInvoice,
            "currency": this.state.selectedCurrency,
            "invoice_frequency": this.state.selectedFrequency, 
            "description": this.state.addSubfolderDescriptionForInvoice,
            "project_invoicing_structure": this.state.projectInvoicingStructure,
            "invoice_generation_method": this.state.selectedInvoiceMethodTab ? "kw_structure" : "type_side_elevation_structure",
            "cgst":  this.state.cgst,
            "igst": this.state.igst,
            "sgst": this.state.sgst,
            "other_tax": this.state.otherTax,
    };

    if(this.state.selectedInvoiceMethodTab == 0){
      reqBody.method_data = this.state.projectTypes;
      reqBody.additional_cost_per_file= this.state.additionalCostPerFile;
    }else{
      reqBody.text_component = this.state.kwStructure;
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.defineInvoiceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),"bx_block_invoicebilling/define_invoice/create_define_invoice");
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),JSON.stringify(reqBody));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"POST");
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getDefinedInvoice =(invoiceId:any) => {

    if(!invoiceId){
      return;
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/json',
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
      "Content-Type": 'application/json',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.checkInvoiceStatusApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.checkInvoiceStatus+`?client_managements_id=${clientManagementsId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  getProjectTypes =(clientManagementsId:any) => {

    if(!clientManagementsId){
      return;
    }

    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/json',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getAllProjectTypeApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.getAllProjectType+`?client_managements_id=${clientManagementsId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  handleCurrencyList =() => {
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/json',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.currencyDataApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`bx_block_download/invoice/all_currency`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  handleCurrencyDataResponse = (responseJson: any) => {
    console.log("ResponseJson client responseJson?.Currency_code: ", responseJson?.Currency_code)
    this.setState({currencyData: responseJson?.Currency_code})
  }

  getClientData = () => {
    let client_id = this.query.get('cid');
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

  currencyDataApiCall=(responseJson:any, apiRequestCallId:any)=>{
    if(responseJson && !responseJson.errors && apiRequestCallId ==this.currencyDataApiCallId){
            this.handleCurrencyDataResponse(responseJson)
          }
      }
    defineInvoiceApiCall=(responseJson:any, apiRequestCallId:any)=>{
    if(responseJson && !responseJson.errors && apiRequestCallId ==this.defineInvoiceApiCallId){
            console.log('defineInvoiceApiCallId ========== ', responseJson);       
            this.setState({defineInvoiceModal: false})
          }
    }
    showInvoiceApiCall=(responseJson:any, apiRequestCallId:any)=>{
    if(responseJson && !responseJson.errors && apiRequestCallId ==this.showInvoiceApiCallId){
            console.log('showInvoiceApiCallId ========== ', responseJson);
    
              this.setState({subfolderClientNameForDefineInvoice: responseJson?.define_invoice?.client_name,
                selectedCurrency: responseJson?.define_invoice?.currency,
                selectedFrequency: responseJson?.define_invoice?.invoice_frequency, 
                addSubfolderDescriptionForInvoice: responseJson?.define_invoice?.description,
                projectInvoicingStructure: responseJson?.define_invoice?.project_invoicing_structure,
                selectedInvoiceMethodTab: responseJson?.define_invoice?.invoice_generation_method == "type_side_elevation_structure" ? 0 : 1,
                cgst: responseJson?.define_invoice?.cgst,
                igst: responseJson?.define_invoice?.igst,
                sgst: responseJson?.define_invoice?.sgst,
                otherTax: responseJson?.define_invoice?.other_tax,
                additionalCostPerFile: responseJson?.define_invoice?.additional_cost_per_file,
              });        
    
              if(responseJson?.type_side_elevation_structure?.length > 0){
                this.setState({projectTypes: responseJson?.type_side_elevation_structure})
              }
              if(responseJson?.kw_structure_data?.length > 0){
                this.setState({kwStructure: responseJson?.kw_structure_data})
              }
          }
    }
    getAllProjectTypeApiCall=(responseJson:any, apiRequestCallId:any)=>{
    if(responseJson && !responseJson.errors && apiRequestCallId ==this.getAllProjectTypeApiCallId){
            console.log('getAllProjectTypeApiCallId ========== ', responseJson);   
    
            let data = [];
    
            if(Array.isArray(responseJson)){
              for (const element of responseJson) {
                let item = {
                    "project_type": element,
                    "price_per_file": ""
                };
    
                data.push(item);
              }
            }
            this.setState({projectTypes: data})   
          }
    }
    checkInvoiceStatusApiCall=(responseJson:any, apiRequestCallId:any)=>{
    if(responseJson && !responseJson.errors && apiRequestCallId ==this.checkInvoiceStatusApiCallId){
            console.log('checkInvoiceStatusApiCallId ========== ', responseJson);
            this.setState({invoiceStatus: responseJson?.define_invoice_status,
              invoiceId: responseJson?.define_invoice_id});
    
              if(responseJson?.define_invoice_id){
                this.getDefinedInvoice(responseJson.define_invoice_id)
              }
          }
    }

  handleClientDetailResponse = (responseJson: any) => {
    this.checkInvoiceStatus(responseJson?.data?.id);
    this.getProjectTypes(responseJson?.data?.id);
    this.setState({subfolderClientName: responseJson?.data?.attributes?.client_name})
    this.setState({subfolderClientNameForDefineInvoice: responseJson?.data?.attributes?.client_name})
    this.setState({subfolderWorkspaceName: responseJson?.data?.attributes?.workspace?.name})
    this.setState({clientId: responseJson?.data?.id})
    this.setState({workspaceId: responseJson?.data?.attributes?.workspace?.id})
    this.setState({subfolderClientId: responseJson?.data?.attributes?.client_id})

  }

  handleClientDetailResponseError = (responseJson: any) => {
    this.setState({errorRes: "Error in response"})
  }

  handleGetSubfolderList =() => {
    let client_id = this.query.get('cid');
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/json',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.subfolderApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`subfolder_index?id=${client_id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;  
  }

  handleGetSubfolderResponse = (responseJson: any) => {
    this.setState({subfolderList: responseJson?.data})
    if(responseJson?.messag){
      this.getClientData()
      this.setState({subfolderList: []})
    }

  }

  handleGetSubfolderResponseError = (responseJson: any) => {
    if(responseJson?.message){
      this.getClientData()
      this.setState({subfolderList: []})
    }
    
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
    this.setState({editSubfolderTeamtitle: responseJson?.data?.attributes?.team_title})
    this.setState({editsubfolderDescription: responseJson?.data?.attributes?.description})
    this.setState({editSubfolderImage: responseJson?.data?.attributes?.image})
    this.setState({subfolder_id: responseJson?.data?.id})
    this.setState({subfolderteamleads: responseJson?.data?.attributes?.team_leaders})
  }

  handleAddSubfolderValidation =() => {
    if(this.state.addSubfolderImage != 0 && this.state.addSubfolderTeamTitle != 0 && this.state.teamLeaders.length != 0){
      this.addSubfolderData()
    }
    else {
      this.setState({teamTitleValidation:  "Subfolder name required"})
      this.setState({imageValidation: "Image required"})
      this.setState({teamLeaderValidation: "Team leader required"})
    }
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
    for (const team_leaders of this.state.teamLeaders) {
      formData.append("team_leader_ids[]", team_leaders.id);
    }
    if(this.state.addSubfolderImage != 0) {
      formData.append('image', this.state.addSubfolderImage);
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.addSubfolderApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),"/subfolder_create");
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),formData);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"POST");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleAddSubfolderResponse = (responseJson: any) => {
    this.setState({addClientSubfolderModal: false})
    this.setState({successAlertModal: true})
    this.setState({modalsuccessmessage: "Subfolder Added"})
    this.handleGetSubfolderList()
    this.setState({teamLeaders: []})
    this.setState({searchSubfolderTeamLeader: ""})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
    this.setState({addSubfolderImage: ""})
    this.setState({addSubfolderTeamTitle: ""})
    this.setState({addSubfolderDescription: ""})
    this.setState({errorInAddEdit: false})
  }

  handleAddSubfolderResponseError = (responseJson: any) => {
    this.setState({errorInAddEdit: true})
  }

  handleUpdateSubfoldervalidation = (id: any, e: any) => {
    if(this.state.isEditMode){
      if(this.state.uploadedSubfolderImage != 0  && this.state.editSubfolderTeamtitle != 0 && this.state.teamLeaders.length != 0){
        this.updateSubfolderData(id, e);
      }
    }
    else {
      if(this.state.editSubfolderImage != 0  && this.state.editSubfolderTeamtitle != 0 && this.state.teamLeaders.length != 0){
        this.updateSubfolderData(id, e);
      }
      else {
        this.setState({teamTitleValidation: "Subfolder name required"})
        this.setState({imageValidation: "Image required"})
        this.setState({teamLeaderValidation: "Team leader required"})
      }
    }
      
  }

  updateSubfolderData = (id: any, e: any) => {
    const header = {
      'token': window.localStorage.getItem('token'),
    };
    let formData = new FormData();
    formData.append('workspace_id', this.state.workspaceId)
    formData.append('client_management_id', this.state.clientId)
    formData.append('team_title', this.state.editSubfolderTeamtitle)
    formData.append('description', this.state.editsubfolderDescription);
    for (const team_leaders of this.state.teamLeaders) {
      formData.append("team_leader_ids[]", team_leaders.id);
    }
    if(this.state.isEditMode){
      formData.append('image', this.state.uploadedSubfolderImage);
      }
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.updateSubfolderApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`/subfolder_update/${id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),formData);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"PUT");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  handleEditSaveSubfolderResponse = (responseJson: any) => {
    this.setState({editClientSubfolderModal: false})
    this.setState({successAlertModal: true})
    this.setState({modalsuccessmessage: "Subfolder updated"})
    this.handleGetSubfolderList()
    this.setState({teamLeaders: []})
    this.setState({searchSubfolderTeamLeader: ""})
    this.setState({availableTL: []})
    this.setState({unavailableTL: []})
  }

  handleEditSaveSubfolderErrorResponse = (responseJson: any) => {
    this.setState({errorRes: "Error in edit response"})
    this.setState({errorInAddEdit: true})
  }

  deleteSubfolderData = (id: any, e: any) => {
    const header = {
      token: window.localStorage.getItem("token"),
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.deleteSubfolderCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`/subfolder_delete/${id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"DELETE");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  handleDeleteResponse = (responseJson: any) => {
    this.handleGetSubfolderList()
    this.setState({deleteClientSubfolderModal: false})
    this.setState({successAlertModal: true})
    this.setState({modalsuccessmessage: "Subfolder deleted"})
    this.getClientData()
  }

  handleDeleteResponseError = (responseJson: any) => {
    this.setState({deleteClientSubfolderModal: false})
    this.setState({successAlertModal: true})
    this.setState({modalsuccessmessage: "Subfolder deleted"})
    this.handleGetSubfolderList()
    this.getClientData()

  }

  searchTeamLead = (e: any) => {
    this.setState({searchSubfolderTeamLeader: e.target.value})
    this.setState({ teamLeadSearchValue: e.target.value.toLocaleLowerCase()});
    this.getTeamLead(this.state.searchSubfolderTeamLeader)
   }

   getTeamLead = (searchword: any) => {
    const header = {
      'token': window.localStorage.getItem('token'),
        "Content-Type": 'application/json',
      };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.showTLApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`search_TL_manager?search=${searchword}&id=${this.state.workspaceId}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
      requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
  }

  handleShowTLAPICallIdSuccess = (responseJson: any) => {
    this.setState({subfolderteamleads: responseJson?.data})
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
      this.setState({errorRes: "Error in response"})
    }
  }

   renderTeamLeaders() {
    const admins = this.state.teamLeaders.map(
      (user: any) =>
        `${user.attributes.first_name} ${user.attributes.last_name}`
    );
  
    this.setState({ teamLeaderString: admins.join("; ") });
  }

  nerfNames = (data: string) => {
    if (data) {
      const charLength = 10;
      if (data.length > 8) {
        const processedString = data.substring(0, charLength).concat("..");
        return processedString.length <= 11 ? data : processedString;
      }
    }
    return data;
  }

   handleSearchItemClick(payload: any) {
    const data = this.state.teamLeaders.filter(
      (user: any) => user.id === payload.id
    ).length;
    if (data) return;
    this.setState(
      (prev) => {
        return {
          ...prev,
          teamLeaders: prev.teamLeaders.concat(payload),
        };
      },
      () => {
        this.renderTeamLeaders();
      }
    );
  }

  
  handleSearchCloseClick(id: string) {
    this.setState({teamLeaders: this.state.teamLeaders.filter((user: any) => String(user.id) !== id)},
    () => {this.renderTeamLeaders();}
    );
  }

  requestSearch = (e: any) => {
    this.setState({searchsubclient: e})
  };
  
  cancelSearch = () => {
    this.setState({searchsubclient:""})
    this.requestSearch(this.state.searchsubclient);
    this.setState({searchsubclient:""})
  }

  // Customizable Area End


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

      this.currencyDataApiCall(responseJson, apiRequestCallId)
this.defineInvoiceApiCall(responseJson, apiRequestCallId)
this.showInvoiceApiCall(responseJson, apiRequestCallId)
this.getAllProjectTypeApiCall(responseJson, apiRequestCallId)
this.checkInvoiceStatusApiCall(responseJson, apiRequestCallId)

      
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
            case this.updateSubfolderApiCallId :
              return this.handleEditSaveSubfolderResponse(responseJson)
            case this.deleteSubfolderCallId : 
              return this.handleDeleteResponse(responseJson)
            case this.showTLApiCallId : 
              return this.handleShowTLAPICallIdFailure(responseJson)
        }
      }
      else {
        switch(apiRequestCallId) {
          case this.clientDataApiCallId :
            return this.handleClientDetailResponseError(responseJson)
          case this.subfolderApiCallId :
            return this.handleGetSubfolderResponseError(responseJson)
          case this.updateSubfolderApiCallId : 
            return this.handleEditSaveSubfolderErrorResponse(responseJson)
          case this.deleteSubfolderCallId : 
            return this.handleDeleteResponseError(responseJson)
            case this.showTLApiCallId :
              return this.handleShowTLAPICallIdSuccess(responseJson)
            case this.addSubfolderApiCallId : 
              return this.handleAddSubfolderResponseError(responseJson)

        }
      }
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
 }
}
