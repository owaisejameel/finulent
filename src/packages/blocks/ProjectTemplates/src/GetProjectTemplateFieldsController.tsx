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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  that?: any;
  history?: any;
  match?: any;

  // Customizable Area End
}
interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
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
  defineInvoiceModal: any,  
  templateId: string;
  csvResponse: boolean;
  getTemplatesDetail: any;
  fieldsData: any,
  action: 'save'|'next';
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
  subfolderClientNameForDefineInvoice: any;
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
  addSubfolderDescriptionForInvoice: any;
  currencyData: any;
  subfolderWorkspaceName: any;
  subfolderClientName: any;
  subfolderClientId: any;
  workspaceId: any;
  clientId: any;
  
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GetProjectTemplateFieldsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  ApiUpdateSequenceId: string = "";
  ApiDeleteFieldId: string = "";
  ApiGetTemplateId: string = "";
  ApiGetFieldId: string = "";
  SaveTemplateApiId: string = "";
  query: any = new URLSearchParams(this.props.history?.location?.search);
  clientDataApiCallId: any;
  checkInvoiceStatusApiCallId: any;
  showInvoiceApiCallId: any;
  getAllProjectTypeApiCallId: any;
  defineInvoiceApiCallId: any;
  currencyDataApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      defineInvoiceModal: false,  
      fieldsData: [],
      templateId: "",
      csvResponse: false,
      getTemplatesDetail: [],
      action: "next",
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
      subfolderClientNameForDefineInvoice : "",
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
      addSubfolderDescriptionForInvoice: "",
      currencyData: [], 
      subfolderWorkspaceName: "",
      subfolderClientName: "",
      subfolderClientId: "",
      workspaceId: "",
      clientId: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    console.log(this.props.history?.location?.search);
    if(this.props.history?.location?.search)
    {
    this.getFields();
    this.getClientData();
    this.handleCurrencyList();
    }

  }

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

  updateFieldsDataLocally = (updatedFieldsData: any) => {
    this.setState({ fieldsData: updatedFieldsData })
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

    ternaryAlternative = (confition: any, trueStatement: any, falseStatement: any):any => {
      if (confition) return trueStatement;
      else return falseStatement;
    }

    andAlternative = (confition: any, statement: any):any => {
      if (confition) return statement;
      else return null
    }
  
    getFields = () =>{
      const header = {
            "Content-Type": 'application/json',
            token: localStorage.getItem('token')
          };
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          //GO TO REQUEST STATE
          this.ApiGetFieldId = requestMessage.messageId;
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_dashboard/templates/${this.query.get('tid')}`
          );
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
          );
      
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            'GET'
          );
      
          runEngine.sendMessage(requestMessage.id, requestMessage);
          return true;
    }

  saveTemplateData = () => {
    const header = {
      "Content-Type": 'application/json',
      token: localStorage.getItem('token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.SaveTemplateApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/template_fields/create_base_template_fields`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      "template_fields": {
        "template_id": this.query.get('tid'),
        "client_id": this.query.get('cid'),
        "client_subfolder_id": this.query.get('sfid') == null ? "" : this.query.get('sfid'),
        "fields": [...this.state.fieldsData]
      }
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'POST'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

    handleApiGetFieldFailure = (responseJson:any)=>{
      toast.error(responseJson.errors,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})   
    }
    handleApiGetTempApiFailure = (responseJson:any)=>{
      toast.error(responseJson.errors,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})   
    }
    
    handleApiGetFieldSucc = (responseJson:any)=>{
      this.setState({
        fieldsData: responseJson?.data,
    })
    }

    handleApiGetTemplateId = (responseJson: any)=>{
      this.setState({getTemplatesDetail:responseJson.data});
    }

  handleSaveTemplateRes = (responseJson: any) => {
    toast.info(responseJson.message, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 });
    if (this.state.action === 'save') this.props.history.push("/userprofile");
    else if (this.state.action === 'next') {
      if (!this.query.get('sfid')) {
        this.props.history.push(`/definechecklist?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`)
      }
      else {
        this.props.history.push(`/definechecklist?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`)
      }
    }
  }

    handleSaveTemplateErr = (responseJson: any) => {
      if (typeof responseJson.errors === "string") {
        toast.error(responseJson?.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
      }
      else responseJson?.errors?.map((errs: string) => toast.error(JSON.stringify(errs), { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 }))
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
      currencyDataApiCall=(responseJson:any, apiRequestCallId:any)=>{
              if(responseJson && !responseJson.errors && apiRequestCallId ==this.currencyDataApiCallId){
                      this.handleCurrencyDataResponse(responseJson)
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

     

      

    async receive(from: string, message: Message) {
      
      console.log('receive', message)
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
        this.checkInvoiceStatusApiCall(responseJson, apiRequestCallId)
        this.showInvoiceApiCall(responseJson, apiRequestCallId)

        this.defineInvoiceApiCall(responseJson, apiRequestCallId)
         this.getAllProjectTypeApiCall(responseJson, apiRequestCallId)
        if (responseJson && !responseJson?.errors && !responseJson?.error) {
          switch (apiRequestCallId) {
            case this.clientDataApiCallId :
            return this.handleClientDetailResponse(responseJson)
            case this.ApiGetFieldId:
              return this.handleApiGetFieldSucc(responseJson)
            case this.ApiGetTemplateId:
              return this.handleApiGetTemplateId(responseJson)
              case this.SaveTemplateApiId:
                return this.handleSaveTemplateRes(responseJson)
            default:
              break;
          }
        } else {
          switch (apiRequestCallId) {
            case this.ApiGetFieldId:
              return this.handleApiGetFieldFailure(responseJson)
            case this.ApiGetTemplateId:
              return this.handleApiGetTempApiFailure(responseJson)
              case this.SaveTemplateApiId:
                return this.handleSaveTemplateErr(responseJson)
            default:
              break;
          }
        } 
      // Customizable Area End
    }
  }
  // Customizable Area End
}
