import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
export const configJSONBase = require("../../../framework/src/config");
const Solar = require("../assets/Slar.png");
const Telecom = require("../assets/Telecom_template.png");
const Basic = require("../assets/Basic_template.png");
const FireSafety = require("../assets/firesafety_template.png");
// Customizable Area End
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  that?: any;
  history?: any;
  match?:any;

  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  openAddField: boolean;
  openDeleteField: boolean;
  openSequence: boolean;
  titleError: string;
  typeError: string;
  valueError: string;
  fieldName: string;
  fieldType: any;
  mandatoryField: string;
  filterReq: string;
  dropdownValues: any;
  singleVal: string;
  selectedSeqField: string;
  selectedDelField:  any;
  sequenceData: any;
  sequenceDataCopy: any;
  invalidMoveUp: boolean;
  invalidSelect:  boolean;
  sequenceLoader: boolean;
  templateId: string;
  csvResponse: boolean;
  getTemplatesDetail: any;

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProjectTemplatesController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  ApiGetTemplateId: string = ''
    
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    
    this.getTemplates = this.getTemplates.bind(this)
 
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
      openAddField: false,
      openSequence: false,
      openDeleteField: false,
      titleError: '',
      typeError: '',
      valueError: '',
      fieldName: '',
      fieldType: null,
      mandatoryField: 'no',
      filterReq: 'no',
      dropdownValues: [],
      singleVal: '',
      selectedSeqField: '',
      selectedDelField: [],
      sequenceData: [],
      sequenceDataCopy: [],
      invalidMoveUp: true,
      invalidSelect: true,
      sequenceLoader: true,
      templateId: '',
      csvResponse: false,
      getTemplatesDetail: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
  this.getTemplates();
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
    
    setInputValue = (text: string) => {
      this.setState({ txtInputValue: text });
    };
  
    setEnableField = () => {
      this.setState({ enableField: !this.state.enableField });
    };
  
  
  loadStaticTemplateImgs = (itemId: string) => {
    switch (itemId) {
      case '1':
        return Solar;
      case '2':
        return Telecom;
      case '3':
        return FireSafety;
      default:
        return Basic;
    }
  }

  handleAddDrpdwnValues = (e: any) => {
    e.preventDefault()
    this.setState({
      dropdownValues: [...this.state.dropdownValues, e.target.value],
      singleVal: ''
    })
  }

  handleDeleteValues = (e: any) => {
    const valueText = e.target.previousSibling.innerHTML;
    const updatedDropdownValues = this.state.dropdownValues.filter((val: any) => {
      return val !== valueText
    })
    this.setState({
      dropdownValues: updatedDropdownValues
    })
  }

  handleMandatoryRadioClick = (e: any) => {
    const valueText = e.target.nextSibling.innerHTML;
    this.setState({
      mandatoryField: valueText.toLowerCase()
    })
  }

  handleFilterRadioClick = (e: any) => {
    const valueText = e.target.nextSibling.innerHTML;
    this.setState({
      filterReq: valueText.toLowerCase()
    })
  }

  ternaryAlternative = (confition: any, trueStatement: any, falseStatement: any):any => {
    if (confition) return trueStatement;
    else return falseStatement;
  }

  andAlternative = (confition: any, statement: any):any => {
    if (confition) return statement;
    else return null
  }

  getTemplates = () => {
    const header = {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.ApiGetTemplateId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "/bx_block_dashboard/templates"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
          if (responseJson && !responseJson?.errors) {
              if(this.ApiGetTemplateId === apiRequestCallId){
                this.setState({getTemplatesDetail:responseJson.data});
              }
          }else {
          }
      // Customizable Area End
    }
  }
  // Customizable Area End
}
