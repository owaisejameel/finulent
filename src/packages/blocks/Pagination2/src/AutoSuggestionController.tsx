import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { date } from "yup";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
    navigation: any;
    id: string;
    token: string;
    // Customizable Area Start
    // Customizable Area End
}
interface S {
    // Customizable Area Start





    isLoader: boolean;
    loading: boolean;
    token: string;
    open: boolean;
    title: string;
    desc: string;
    search: string;
    errorMsg: string;
    roleId: any;
    isSuccessModal: boolean;
    modalMsg: string;
    isEdit: boolean;
    termsandcondition: any;
    companyname: string;
    sameValue: boolean;
    projectcodeData: any;
    selectedName: string;
    name: string;

    projectCode: string;
    codeData: any;
    removeData: any;
    selectedCode: any;
    page: boolean;
    newResult: any;
    selectedType: string;
    typeData: any;
    newNames: any;
    initial: any;


    // Customizable Area End
}
interface SS {
    id: any;
}

export default class AutoSuggestionController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    apiDashboardItemCallId: string = "";
    updateTermsConditionApiCallId: string = "";
    typeApiCallId: string = "";
    addprojectcodeApiCallId: string = "";
    codeByIdApiCallId: string = "";
    deleteAutoCallId: string = "";
    addSuggestionApiCallId: string = "";

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
            getName(MessageEnum.SessionResponseMessage),
        ];

        this.state = {


            loading: false,
            isLoader: true,
            token: "",
            open: false,
            title: "",
            desc: "",
            projectcodeData: [],

            errorMsg: '',
            roleId: "",
            isSuccessModal: false,
            modalMsg: "",
            isEdit: false,
            termsandcondition: "",
            companyname: "",
            selectedName: "",
            search: "",
            projectCode: "",
            codeData: [],
            removeData: [],
            selectedCode: "",
            page: true,
            newResult: [],
            sameValue: false,
            selectedType: "",
            typeData: [],
            name: "",
            newNames: [],
            initial: [],

            // success:true
        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        this.setState({ isLoader: true, selectedType: "AHJ" })

        this.getAll("AHJ")
        this.getToken();



        if (this.isPlatformWeb() === false) {
            this.props.navigation.addListener("willFocus", () => {
                this.getToken();
            });
        }

        // Customizable Area Start
        // Customizable Area End
    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };
    getAll(name: any): boolean {
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
        this.typeApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_download/auto_suggestion/all_suggestion?suggestion_type=${name}`
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            header
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"

        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        // Customizable Area End
        return true;
    }
    handleAddSuggestion = () => {
        console.log("api call started *************");
        const body = {
            suggestion_type: this.state.selectedType,
            name: this.state.newNames
        }


        const header = {
            'token': window.localStorage.getItem('token'),
            "Content-Type": 'application/JSON',
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.addSuggestionApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            "bx_block_download/auto_suggestion"
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
    updateTermsConditions = () => {

        const body = {

            description: this.state.termsandcondition
        }
        const header = {
            'token': window.localStorage.getItem('token'),
            // token:
            //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTgsImV4cCI6MTY1OTczNTI5NiwidG9rZW5fdHlwZSI6ImxvZ2luIn0.08O-3I9QAjbP4xcAN5a8KR7VbAQDqwRwasDh8a893w3sEQ9g0xveUuxkmQbbmv3ZhqvjiZ22B_tmVfmiukDCLweyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjcsImV4cCI6MTY5MTQ4ODk5NCwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.enaKYnHWPVmn01eC6pLqtE_OT5HU8jgMb43lH7UAl2E5OLS_eyeNbwXuSiLJyB56ag0NJBxR8vfR4m_edmn7Yg",
            "Content-Type": 'application/JSON',
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.updateTermsConditionApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_profile_bio/terms_and_condition/update_terms?id=1`
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
            "PUT"
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    };
    getProjectCodeById(id: any): boolean {
        console.log("HERE IN THE CAl")
        // Customizable Area Start
        const body = {

            workspace_id: id
        }
        const header = {
            'token': window.localStorage.getItem('token'),
            // token:
            //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjAzOTc5MTMsInRva2VuX3R5cGUiOiJsb2dpbiJ9.UVZRsL6ASo-02xh4SQDEsHs64R9suItplATxMRwLWDbueZatJqkQgSAxKpvnJcMYnh_VTrc8jmAXYgA1btLGlQ",
            "Content-Type": "application/JSON",
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.codeByIdApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `project_code_list?workspace_id=${id}`
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
    deleteAuto(): boolean {
        // Customizable Area Start
        const body = {
            name: this.state.removeData,

        }
        const header = {
            'token': window.localStorage.getItem('token'),
            // token:
            //   "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTA5LCJleHAiOjE2NjExNzU2NDcsInRva2VuX3R5cGUiOiJsb2dpbiJ9.bzaCwsk1Dyn2Ua42wMhn8zR89Jm_mNOkIhb3EOb1CT7Tr-rlh70rX4dReOlju0vH5ggntnr7WVppzmCGWLNS-w",
            "Content-Type": "application/JSON",
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.deleteAutoCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_download/auto_suggestion`
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
            "DELETE"
            //   configJSON.dashboarApiMethodType
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        // Customizable Area End
        return true;
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.setState({ token: token, loading: true }, () => {

            });
        }

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );


            if (this.typeApiCallId === apiRequestCallId) {
                console.log({ data: responseJson }, "GETTERMS  FROMAPI");
                if (responseJson && !responseJson.errors) {

                    if (responseJson.data?.length === 0) {
                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false,
                        });
                    } else {
                        console.log("HERE IN THE INVOICE", responseJson)
                        let result = responseJson.map((item: any) => item.name)
                        console.log(result, "KANYA")
                        this.setState({
                            typeData: responseJson,
                            newResult: result,

                            errorMsg: "",
                            loading: false,
                            isLoader: false,
                            initial: result,
                        });
                    }
                } else {
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
            if (apiRequestCallId === this.addSuggestionApiCallId) {
                console.log("U there **********", responseJson);
                if (responseJson.errors || responseJson.message) {
                    console.log("Here")
                    if (responseJson.message && !responseJson.data) {

                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false,
                            modalMsg: "Autosuggested item already exists!",
                            isSuccessModal: true,
                            newNames: "",
                            newResult: this.state.initial,
                        });
                    } else {

                        const apiData = responseJson;
                        console.log(apiData, "API@#")

                        console.log("BEFORE SETSTATE")
                        this.setState(
                            {
                                typeData: [...this.state.typeData, apiData],

                                modalMsg: "Added Successfully!",
                                isSuccessModal: true,

                                errorMsg: "",
                                loading: false,
                                newNames: "",
                            },

                            () => console.log("Response *****")
                        );
                    }
                } else {
                    let errorReponse = message.getData(
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
            if (this.codeByIdApiCallId === apiRequestCallId) {
                console.log({ data: responseJson }, "GETTERMS  FROMAPI");
                if (responseJson && !responseJson.errors) {

                    if (responseJson.data?.length === 0) {
                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false,
                        });
                    } else {
                        console.log("HERE IN THE INVOICE", responseJson[0])
                        this.setState({
                            codeData: responseJson[0],
                            errorMsg: "",
                            loading: false,
                            isLoader: false
                        });
                    }
                } else {
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
            if (this.deleteAutoCallId === apiRequestCallId) {
                console.log("U there **********", responseJson);
                if (responseJson && !responseJson.errors && responseJson) {
                    if (responseJson === 0) {
                        this.setState({
                            errorMsg: "Data Not Found",
                            loading: false,
                            modalMsg: "Error in delete! ."
                        });
                    } else {
                        const filteredElements = this.state.typeData.filter(function (obj: any) {
                            return !responseJson?.some(function (obj2: any) {
                                return obj.id === obj2.id;
                            });
                        });
                        console.log("Rowdata", filteredElements)
                        this.setState(
                            {

                                modalMsg: "Deleted Successfully!",
                                isSuccessModal: true,
                                typeData: filteredElements,
                                errorMsg: "",
                                loading: false,
                            },

                            () => console.log("Console")

                        );
                    }
                } else {
                let errorReponse = message.getData(
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

            //
        }
        // Customizable Area End
    }

    // Customizable Area Start


    // Customizable Area End
}
