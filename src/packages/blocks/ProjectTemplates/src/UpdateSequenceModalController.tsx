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
  sequenceUpdatedCallback?: any;
  isChooseTemplateFlow?: boolean;
}
interface S {
  openSequence: boolean;
  selectedSeqField: string;
  fieldsData: any;
  sequenceDataCopy: any;
  invalidMoveUp: boolean;
  invalidMoveDown: boolean;
  sequenceLoader: boolean;
}
interface SS {
  id: any
}
export default class UpdateSequenceModalController extends BlockComponent<Props, S, SS>{
  sequenceAddId: string = "";
  query: any = new URLSearchParams(this.props.history?.location?.search);

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.state = {
      openSequence: false,
      selectedSeqField: "",
      fieldsData: [],
      sequenceDataCopy: [],
      invalidMoveUp: true,
      invalidMoveDown: true,
      sequenceLoader: true,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState({
      fieldsData: this.props.fieldsData,
      sequenceDataCopy: this.props.fieldsData
    })
  }

  async componentWillReceiveProps(nextProps: any) {
    console.log('nextProps', nextProps)
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.fieldsData !== this.state.fieldsData) {
      this.setState({ fieldsData: nextProps.fieldsData, sequenceDataCopy: nextProps.fieldsData });
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

  handleMoveSequenceUp = () => {
    // ? using JSON parse and stringify to avoid deep level references issue.
    const updatedSeq = JSON.parse(JSON.stringify(this.state.sequenceDataCopy));
    let tmpSelected = Number(this.state.selectedSeqField)
    let moveUp = {};
    let moveDown = {};
    let tmp1 = updatedSeq.map((data: any) => {
      return data.sequence_no
    });
    if (updatedSeq[tmp1.indexOf(tmpSelected) - 1].is_frozen !== true) {
      moveUp = updatedSeq[tmp1.indexOf(tmpSelected)].sequence_no;
      moveDown = updatedSeq[tmp1.indexOf(tmpSelected) - 1].sequence_no;
      updatedSeq[tmp1.indexOf(tmpSelected)].sequence_no = moveDown;
      updatedSeq[tmp1.indexOf(tmpSelected) - 1].sequence_no = moveUp;
      updatedSeq.sort((a: any, b: any) => {
        return a.sequence_no - b.sequence_no
      })
      this.setState({
        sequenceDataCopy: updatedSeq,
        selectedSeqField: (updatedSeq[tmp1.indexOf(tmpSelected) - 1].sequence_no).toString()
      })

      if (updatedSeq[tmp1?.indexOf(tmpSelected) - 2]?.is_frozen === true) {
        this.setState({ invalidMoveUp: true });
      }
      if (Number((updatedSeq[tmp1.indexOf(tmpSelected)].sequence_no)) === updatedSeq.length) {
        this.setState({ invalidMoveDown: false });
      }
      document.querySelector(".active-border")?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }

  handleMoveSequenceDown = () => {
    // ? using JSON parse and stringify to avoid deep level references issue.
    const updatedSeq = JSON.parse(JSON.stringify(this.state.sequenceDataCopy));
    let moveUpField = {};
    let moveDownField = {};
    let tmpSelected = Number(this.state.selectedSeqField)
    let tmp1 = updatedSeq.map((data: any) => {
      return data.sequence_no
    });
    if (tmp1.indexOf(tmpSelected) + 1 < updatedSeq.length) {
      moveUpField = updatedSeq[tmp1.indexOf(tmpSelected)].sequence_no;
      moveDownField = updatedSeq[tmp1.indexOf(tmpSelected) + 1].sequence_no;
      updatedSeq[tmp1.indexOf(tmpSelected)].sequence_no = moveDownField;
      updatedSeq[tmp1.indexOf(tmpSelected) + 1].sequence_no = moveUpField;
      updatedSeq.sort((a: any, b: any) => {
        return a.sequence_no - b.sequence_no
      })
      this.setState({
        sequenceDataCopy: updatedSeq,
        selectedSeqField: (updatedSeq[tmp1.indexOf(tmpSelected) + 1].sequence_no).toString()
      })

      if (updatedSeq[tmp1?.indexOf(tmpSelected) - 1]?.is_frozen) {
        this.setState({ invalidMoveUp: false });
      }
      if (Number(updatedSeq[tmp1?.indexOf(tmpSelected) + 1]?.sequence_no) === updatedSeq?.length) {
        this.setState({ invalidMoveDown: true });
      }
      document.querySelector(".active-border")?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }

  handleChangeSeqApiCall = () => {
    const formatedData = this.state.sequenceDataCopy?.map(({id, sequence_no}: any) => ({ id, sequence_no}))
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

  handleSequence = () => {
    if(this.props.isChooseTemplateFlow){
      this.props.sequenceUpdatedCallback(this.state.sequenceDataCopy);
      this.setState({
        openSequence: false,
        fieldsData: this.state.sequenceDataCopy,
        sequenceDataCopy: this.state.sequenceDataCopy,
        selectedSeqField: ''
      })
    }
    else {
      this.handleChangeSeqApiCall();
    }
  }

  handleSeqApiSuccessRes = (responseJson: any) => {
    console.log(responseJson);
    if (responseJson.message === "duplicate sequence_nos present") {
      this.setState({
        openSequence: false
      })
      toast.error(responseJson.message, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else {
      this.props.sequenceUpdatedCallback();
      this.setState({
        openSequence: false,
        selectedSeqField: ''
      })
      toast.success("Sequence Updated Successfully", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
  }

  handleButtonCancel = () => {
    this.setState({
      openSequence: false,
      selectedSeqField: "",
      fieldsData: this.props.fieldsData,
      sequenceDataCopy: this.props.fieldsData,
      invalidMoveUp: true,
      invalidMoveDown: true,
      sequenceLoader: true,
    })
  }

  handleSeqApiFailure = (responseJson: any) => {
    if(typeof responseJson?.errors == 'string') {
      toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
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
        if (this.sequenceAddId === apiRequestCallId) {
          this.handleSeqApiSuccessRes(responseJson)
        }
      }
      else {
        if (this.sequenceAddId === apiRequestCallId) {
          this.handleSeqApiFailure(responseJson)
        }
      }
    }
  }
}
// Customizable Area End