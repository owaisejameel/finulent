// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSONBase = require("../../../framework/src/config");
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  that?: any;
  history?: any;
  match?: any;
  cid?: any;
  sfid?: any;
  tid?: any;
  fieldsData?: any;
  fieldDeleteCallback?: any;
  isChooseTemplateFlow?: boolean;
}
interface S {
  openDeleteField: boolean,
  selectedDelField: any,
  fieldsData: any,
  invalidSelect: boolean,
}
interface SS {
  id: any
}
export default class DeleteFieldController extends BlockComponent<Props, S, SS>{
  ApiDeleteFieldId: string = "";
  sequenceAddId: string = "";
  query: any = new URLSearchParams(this.props.history?.location?.search);

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.handleDeleteButtonAction = this.handleDeleteButtonAction.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.state = {
      openDeleteField: false,
      selectedDelField: [],
      fieldsData: [],
      invalidSelect: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState({
      fieldsData: this.props.fieldsData
    })
  }

  async componentWillReceiveProps(nextProps: any) {
    console.log('nextProps', nextProps)
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.fieldsData !== this.state.fieldsData) {
      this.setState({ fieldsData: nextProps.fieldsData });
    }
  }

  ternaryAlternative = (confition: any, trueStatement: any, falseStatement: any): any => {
    if (confition) return trueStatement;
    else return falseStatement;
  }

  andAlternative = (confition: any, statement: any): any => {
    if (confition) return statement;
    else return null
  }

  // web events
  isChecked = (arr: any, name: any):boolean => {
    for (let value of arr) {
      if (value.field_name === name) {
        return true;
      }
    }
    return false;
  }

  deleteFieldFromSavedTemplate = () => {
    const deleteFieldsid = this.state?.selectedDelField?.map((item: any) => item?.id);
    const header = {
      "Content-Type": 'application/json',
      token: localStorage.getItem('token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.ApiDeleteFieldId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/template_fields/?ids=[${deleteFieldsid}]`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'DELETE'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleChangeSeqApiCall = () => {
    const formatedData = this.state.fieldsData?.filter((i: any) => !this.state.selectedDelField.find((f: any) => f.sequence_no == i.sequence_no))
    .map(({id}: any, index: number) => ({ id, sequence_no: index + 1}));
    
    const header = {
      "Content-Type": 'application/json',
      token: localStorage.getItem('token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.sequenceAddId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_dashboard/template_fields/update_sequence`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
        template_field: {
          template_id: this.query.get('tid'),
          client_id: this.query.get('cid'),
          client_subfolder_id: this.query.get('sfid') == null ? "" : this.query.get('sfid'),
          fields: [...formatedData]
        }
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'PUT'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleDeleteButtonAction = () => {
    if (this.props.isChooseTemplateFlow) {
      let updatedFields = [...this.state.fieldsData]
      const newData = updatedFields.filter(i => !this.state.selectedDelField.find((f: any) => f.sequence_no == i.sequence_no));
      // ? update sequence if field is deleted.
      const updatedData = newData?.map((i: any, index: number) => ({ ...i, sequence_no: index + 1 }));
      this.props.fieldDeleteCallback(updatedData);
      this.setState({ fieldsData: newData, openDeleteField: false, selectedDelField: [] })
    }
    else {
      this.deleteFieldFromSavedTemplate();
    }
  }

  handleButtonCancel = () => {
    this.setState({
      openDeleteField: false,
      fieldsData: this.props.fieldsData,
      selectedDelField: []
    })
  }

  handleApiDeleteFieldSuccessRes = (responseJson: any) => {
    this.handleChangeSeqApiCall();
    toast.success(responseJson?.message, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
  }

  handleApiDeleteFieldFailure = (responseJson: any) => {
    if (typeof responseJson?.errors == 'string') {
      toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if (typeof responseJson?.error == 'string') {
      toast.error(responseJson?.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if (responseJson?.errors?.length) {
      responseJson?.errors?.map((i: string) => toast.error(i, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 }))
    }
    else toast.error('Something went wrong, please try again later.', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson?.errors && !responseJson?.error) {
        if (this.ApiDeleteFieldId === apiRequestCallId) {
          this.handleApiDeleteFieldSuccessRes(responseJson);
        }
        if (this.sequenceAddId === apiRequestCallId) {
          this.setState({ openDeleteField: false, selectedDelField: [] });
          this.props.fieldDeleteCallback();
        }
      }
      else {
          this.handleApiDeleteFieldFailure(responseJson);
      }
    }
  }
}
// Customizable Area End