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
}
interface S {
  breadCrumbs: any;
}
interface SS {
  id: any
}
export default class TemplateBreadcrumbsController extends BlockComponent<Props, S, SS>{
  query: any = new URLSearchParams(this.props.history?.location?.search);

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.state = {
      breadCrumbs: {}
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    const data = localStorage.getItem('breadcrumb_data');
    if(data && data != "" && typeof data === 'string') this.setState({breadCrumbs: JSON.parse(data)})
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));
  }
}
// Customizable Area End