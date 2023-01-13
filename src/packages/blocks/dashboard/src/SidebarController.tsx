import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { date } from "yup";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}
interface S {
    // Customizable Area Start
    dashboardData: any;
    signUpData: any;
    token: string;
    errorMsg: string;
    loading: boolean;
    isErr: boolean;
    isValid: boolean;
    modalOpen: boolean;
    checkedB: boolean;
    isErrorPassword: boolean;
    initialPageLoad: boolean;
    page: boolean;
    birthDate: Date | null;
    email: string,
    contactNo: string,
    confirmpwd: string,
    // success:boolean,
    isSuccessModal: boolean,
    isopen: any,
    peopleOpen: boolean,
    achorEl: null | HTMLElement;
    drawerList: any;
    isStatusModalVisible:boolean;
    StatusModalMessage:any;
    // Customizable Area End
}
interface SS {
    id: any;
}

export default class SidebarController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    apiDashboardItemCallId: string = "";
    dashboardApiCallId: string = "";
    apiGetQueryStrinurl: string = "";
    signUpAPICallId: string = "";
    getDrawerApiCallId: string = "";
    logoutApiCallId: string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        console.disableYellowBox = true;
        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionSaveMessage),
            getName(MessageEnum.SessionResponseMessage)
        ];

        this.state = {
            dashboardData: [],
            signUpData: [],
            errorMsg: "",
            token: "",
            isErr: false,
            isValid: false,
            loading: false,
            modalOpen: false,
            checkedB: false,
            isErrorPassword: false,
            initialPageLoad: true,
            page: true,
            birthDate: null,
            email: "",
            contactNo: "",
            confirmpwd: "",
            isSuccessModal: false,
            isopen: false,
            peopleOpen: false,
            achorEl: null,
            drawerList: "",
            isStatusModalVisible:false,
            StatusModalMessage:""
            // logoutData:

        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        this.getToken();
        this.getClientAndSubclient()
        console.log(this.props, "COMPONENT PROPS")
        if (this.isPlatformWeb() === false) {
            this.props.navigation.addListener('willFocus', () => {
                this.getToken();
            });
        }
        // Customizable Area Start
        // Customizable Area End
    }

    getToken = () => {
        const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
        this.send(msg);
    }
    handleEdit = () => {
        this.props.navigation.navigate("UserManagement");
        // this.getUsers();
    };

    getsignUpData(): boolean {
        // Customizable Area Start
        const header = {
            "Content-Type": configJSON.dashboarContentType,
            token: this.state.token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.apiDashboardItemCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.dashboardGetUrl
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.dashboarApiMethodType
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        // Customizable Area End
        return true;
    }
    getClientAndSubclient(): boolean {
        // Customizable Area Start
        const header = {
            'token': window.localStorage.getItem('token'),
            // token:
            //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
            "Content-Type": "application/JSON",
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getDrawerApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "client_subfolder_list"
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            header
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"
            //   configJSON.dashboarApiMethodType
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        // Customizable Area End
        return true;
    }
    handleDeviceId = () => {
        console.log("api call started *************");

        const data = {

            data:{
                "device_id": localStorage.getItem('device_id')
            }

        }
        const body= data
        console.log(body, "In Body")

        const header = {
            'token': window.localStorage.getItem('token'),
            // token:
            //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTgsImV4cCI6MTY1OTczNTI5NiwidG9rZW5fdHlwZSI6ImxvZ2luIn0.08O-3I9QAjbP4xcAN5a8KR7VbAQDqwRwasDh8a893w3sEQ9g0xveUuxkmQbbmv3ZhqvjiZ22B_tmVfmiukDCLweyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjcsImV4cCI6MTY5MTQ4ODk5NCwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.enaKYnHWPVmn01eC6pLqtE_OT5HU8jgMb43lH7UAl2E5OLS_eyeNbwXuSiLJyB56ag0NJBxR8vfR4m_edmn7Yg",
            // "Content-Type": 'application/JSON',
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.logoutApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "logout_device"
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(body)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "POST"
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    };

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.setState({ token: token, loading: true }, () => {
                // this.getDashboardData();
                this.getsignUpData()
            });
        }

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            var responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            var responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (apiRequestCallId === this.signUpAPICallId) {

                console.log("U there **********", responseJson)
                if (responseJson && !responseJson.errors && responseJson.data) {
                    if (responseJson.data.length === 0) {
                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false
                        });
                    } else {
                        this.setState({
                            signUpData: responseJson.data.attributes,
                            isSuccessModal: true,
                            errorMsg: "",
                            loading: false
                        }, () => console.log(this.state.signUpData, 'Response *****'));
                    }
                } else {
                    var errorReponse = message.getData(
                        getName(MessageEnum.RestAPIResponceErrorMessage)
                    );
                    if (errorReponse === undefined) {
                        this.setState({
                            errorMsg: "Something went wrong",
                            loading: false
                        });
                    } else {
                        this.setState({
                            errorMsg: errorReponse,
                            loading: false
                        });
                    }
                }
            }
            if (this.getDrawerApiCallId === apiRequestCallId) {
                console.log({ data: responseJson }, "GET ROLES FROMAPI");
                if (responseJson && !responseJson.errors) {

                    if (responseJson.length === 0) {
                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false,
                        });
                    } else {

                        this.setState({
                            drawerList: responseJson.data,
                            errorMsg: "",
                            loading: false,
                        });
                    }
                } else {
                    if(responseJson?.errors[0].token){
                        this.handleOpenStatusModal(responseJson?.errors[0].token);          
                    }
                    const errorReponse = message.getData(
                        getName(MessageEnum.RestAPIResponceErrorMessage)
                    );

                    if (errorReponse === undefined) {
                        this.setState({
                            errorMsg: "Something went wrong",
                            loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: errorReponse,
                            loading: false,
                        });
                    }
                }
            }
            if (apiRequestCallId === this.logoutApiCallId) {
                console.log("U there **********", responseJson);
                if (responseJson || !responseJson.errors && responseJson.data) {
                    console.log("HERE IN RES")
                    if (responseJson?.data?.length === 0 || responseJson.data?.message) {

                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false,
                        });
                    } else {
                        this.handleLogout()
                        //  const rowData = this.state.usersData

                        // const apiData = responseJson.data;
                        // apiData.slNo = this.state.usersData.length + 1;

                        // const result=rowData.map((item:any)=>item.id == apiData.id? {...item, attributes:apiData.attributes}:item)

                        this.setState(
                            {
                                // logoutData: responseJson,


                                loading: false,
                            },


                        );
                    }
                } else {
                    var errorReponse = message.getData(
                        getName(MessageEnum.RestAPIResponceErrorMessage)
                    );
                    if (errorReponse === undefined) {
                        this.setState({
                            errorMsg: "Something went wrong",
                            loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: errorReponse,
                            loading: false,
                        });
                    }
                }
            }


        }

        // Customizable Area End
    }

    // Customizable Area Start
    handleSubmitApiCall = () => {
        console.log("api call started *************")
        const attrs = {

            date_of_birth: this.state.birthDate,
            full_phone_number: this.state.contactNo,
            email: this.state.email,

            confirm_password: this.state.confirmpwd

        }
        const data = {
            type: "email_account",
            attributes: attrs
        }
        const body = {
            data: data,
        }
        // var formData = new FormData();
        // formData.append('first_name', this.state.firstname);
        // // @ts-ignore
        // formData.append('last_name', this.state.lastname);
        // formData.append('date_of_birth', this.state.birthDate || null );
        // formData.append('full_phone_number', this.state.contactNo);
        // formData.append('email', this.state.email);
        // formData.append('password', this.state.password);
        // formData.append('confirm_password', this.state.confirmpwd)


        const header = {
            // 'token': window.localStorage.getItem('authToken'),
            "Content-Type": 'application/JSON',
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.signUpAPICallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            'account_block/accounts'
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(body)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            'POST'
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true
    }
    handleLogout = () => {
        console.log("Logging out")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("id")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("role_id")
        localStorage.removeItem("modelname")
        localStorage.removeItem("isopen")
        localStorage.removeItem("peopleOpen")
        localStorage.removeItem("user_type")
        localStorage.removeItem("device_id")

    }

    handleCloseStatusModal = ()=>{
        this.setState({isStatusModalVisible:false});
      }
    
      handleOpenStatusModal = (errorMsg:any)=>{
         if(errorMsg == "Admin has changed your role."){
            this.setState({StatusModalMessage:"Your role has been changed!"});
         }else{
            this.setState({StatusModalMessage:errorMsg});
         }
        setTimeout(()=>{
            this.setState({isStatusModalVisible:true});
        })
      }  

    handleRoleChangeRedirect=()=>{
        this.handleLogout();
        window.location.href = "EmailAccountLoginsBlock";
    }

    // Customizable Area End

}
