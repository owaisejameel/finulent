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
  history: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  projects: any;
  history: any;
  projectStatusColors: any;
  loader: boolean;
  clientDropDown: any;
  selectedClient: any;
  selectedProjectData: any;
  dateRange: any;
  client_type: any;
  client_id: any;
  from: any;
  to: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TaskboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  allProjectApiCallId: string ="";
  allColorApiCallId: string = "";
  allClientDropDownId: string = "";
  selectedProjectApiId: string = "";
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
      loader: true,
      projects: {},
      projectStatusColors: {},
      history: this.props.history,
      clientDropDown: [],
      selectedClient: "All",
      selectedProjectData: {},
      dateRange: null,
      client_type: "",
      client_id: "",
      from: "",
      to: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (!responseJson?.error && responseJson) {
        
        switch (apiRequestCallId) {
          case this.allProjectApiCallId:
            this.setState({ projects: { ...responseJson } });
            this.setState({ loader: false });
            break;

          case this.allColorApiCallId:
            this.setState({ projectStatusColors: { ...responseJson } });
            break;

          case this.allClientDropDownId:
            
            return this.setState({ clientDropDown: [...responseJson] });

          case this.selectedProjectApiId:
            this.setState({ projects: { ...responseJson }, loader: false });
            break;
          default:
            break;
        }
      } else{
        this.setState({ loader: false,projects:{}});
      }
    }
    // Customizable Area End

    // Customizable Area Start

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

  getAllProjectData = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.allColorApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allProjectColorApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  getAllStatusColor = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.allProjectApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allProjectApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  getAllClientDropDown = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.allClientDropDownId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allClientDropDownApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };


  handleDatePicker = (a: any) => {
    if (a == null){
      this.setState({
        dateRange: null,
        from: "",
        to: "",
      })
      return
    }
    
    this.setState({
      dateRange:a,
      from: new Date(a[0]).toLocaleDateString(),
      to: new Date(a[1]).toLocaleDateString(),
    })
  }

  getSelectedProjects = (reqType: any, data1: any, data2: any) => {
    let clientDropDownOption:any;
    let dateRangePart:any;
    if(reqType == "dropDown"){
      clientDropDownOption = !data1 ? `` : `client_id=${data1}&client_type=${data2}`;
      dateRangePart = !this.state.from ? `` : `from=${this.state.from}&to=${this.state.to}&`;

    }else if(reqType == "date"){
      dateRangePart = !this.state.dateRange ? `` : `from=${data1}&to=${data2}&`;
      clientDropDownOption = !this.state.client_id ? `` : `client_id=${this.state.client_id}&client_type=${this.state.client_type}`
    }


    const selectedProjectsApi = `bx_block_kanbanboard/kanbanboard?${dateRangePart+clientDropDownOption}`;
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.selectedProjectApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      selectedProjectsApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  async componentDidMount() {
    this.setState({loader:true});
    this.getAllProjectData();
    this.getAllStatusColor();
    this.getAllClientDropDown();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<S>,
    snapshot?: SS | undefined
  ): void {
    if (this.state.dateRange && this.state.dateRange !== prevState.dateRange) {
      this.setState({ loader: true });
      const fromDate = new Date(this.state.dateRange[0]).toLocaleDateString();
      const toDate = new Date(this.state.dateRange[1]).toLocaleDateString();
      this.getSelectedProjects("date",fromDate,toDate);
    }else if(!this.state.dateRange && this.state.dateRange !== prevState.dateRange){
      this.setState({ loader: true });
      // this.setState({from:null,to:null})
      this.getSelectedProjects("date",null,null);
    }
  }

  handleClientChange = (e: any) => {
    this.setState({ 
      selectedClient: e.target.value,
     });
    this.setState({ loader: true });
    if (e.target.value !== "All") {
      const obj = JSON.parse(e.target.value);
      this.setState({ client_id: obj.client_id, client_type: obj.client_type },()=>{
        this.getSelectedProjects("dropDown", obj.client_id, obj.client_type);
      });
      
    } else {
      this.getSelectedProjects("dropDown",null,null);
      this.setState({ client_id: "", client_type: "" });
    }
  };

  // Customizable Area End
}
