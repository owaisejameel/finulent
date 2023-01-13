// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum,{ getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
export const configJSONBase = require("../../../framework/src/config");
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export const configJSON = require('./config');
export interface Props{
    navigation:any;
    id:any;
    that:any;
    history:any;
    match:any;
}

interface S{
    templatesFields:any;
}

interface SS{

}

export default class EditTemplateDetailInfoController extends BlockComponent<Props,S,SS>{
    ApiGetFieldId:string = '';
    query: any = new URLSearchParams(this.props.history?.location?.search);
    
    constructor(props:Props){
        super(props);
        this.receive = this.receive.bind(this);
        this.getEditTemplateFields = this.getEditTemplateFields.bind(this);
        this.subScribedMessages=[
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.RestAPIResponceMessage)

        ];
        this.state={
            templatesFields:[]
        };
        runEngine.attachBuildingBlock(this as IBlock,this.subScribedMessages);
    }
    async componentDidMount() {
        this.getEditTemplateFields();
    }    
    getEditTemplateFields = () =>{
        const header = {
            "Content-Type": 'application/json',
            token: localStorage.getItem('token')
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.ApiGetFieldId = requestMessage.messageId;
        
        requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_dashboard/templates/${this.query.get('tid')}`);
        
        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),'GET');
        runEngine.sendMessage(requestMessage.id,requestMessage);
        return true;
    }
    handleApiGetFieldSuccess = (responseJson:any)=>{
        console.log(responseJson);
        this.setState({
            templatesFields: responseJson.data,
        })
    }
    handleApiGetFieldFailure = (responseJson:any,errorResponse:any)=>{
        toast.error(responseJson.error,{position: toast.POSITION.BOTTOM_RIGHT, autoClose:2000})
    }
    async receive(from: string, message: Message) {
        runEngine.debugLog("on receive==>"+JSON.stringify(message));
        if(getName(MessageEnum.RestAPIResponceMessage)===message.id){
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            const responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            const errorResponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );
            if(responseJson && !responseJson.errors){
                if(apiRequestCallId === this.ApiGetFieldId){
                        console.clear()
                        this.handleApiGetFieldSuccess(responseJson);
                }
            }else{
                    this.handleApiGetFieldFailure(responseJson,errorResponse);
            
            }
        }
    }
}
//Customizable Area End