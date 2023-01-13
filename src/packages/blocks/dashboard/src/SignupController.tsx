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
    signUpData:any;
    token: string;
    errorMsg: string;
    loading: boolean;
    password: any;
    firstname: any;
    lastname: any;
    isErr: boolean;
    isValid: boolean;
    modalOpen: boolean;
    checkedB: boolean;
    isErrorPassword: boolean;
    initialPageLoad: boolean;
    page: boolean;
    birthDate: Date | null;
    email: any,
    contactNo: string,
    confirmpwd: any,
    visibility :boolean,
    // success:boolean,
    isSuccessModal:boolean,
    isErrorFirstName:boolean,
    isErrorLastName:boolean,
    isErrorEmail:boolean,
    termsandcondition:string,

    submenu:boolean,

    confirmvisibility:boolean,

    // Customizable Area End
}
interface SS {
    id: any;
}

export default class SignupController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    apiDashboardItemCallId: string = "";
    dashboardApiCallId: string = "";
    apiGetQueryStrinurl: string = "";
    signUpAPICallId: string= "";
    termsandconditionApiCallId:string="";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        console.disableYellowBox = true;
        // Customizable Area Start
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionSaveMessage),
            getName(MessageEnum.SessionResponseMessage)
        ];

        this.state = {
            dashboardData: [],
            signUpData:[],
            errorMsg: "",
            token: "",
            password: "",
            isErr: false,
            isValid: false,
            firstname: '',
            lastname: '',
            loading: false,
            modalOpen: false,
            checkedB: false,
            isErrorPassword: false,
            initialPageLoad: true,
            page: true,
            birthDate: null,
            email: '',
            contactNo: "",
            confirmpwd: "",
            isSuccessModal:false,
            isErrorFirstName:false,
            isErrorLastName:false,
            visibility :false,
            isErrorEmail:false,
            termsandcondition:"",
            submenu:false,

            confirmvisibility:false,

            // success:true
        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        this.getToken();
        this.getTermsandCondition();
        if (this.isPlatformWeb() === false) {
            this.props.navigation.addListener('willFocus', () => {
                this.getToken();
            });
        }
        // Customizable Area Start
        this.handleIfLoggeInAlready();
        // Customizable Area End
    }

    getToken = () => {
        const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
        this.send(msg);
    }
    getTermsandCondition(): boolean {
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
        this.termsandconditionApiCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `bx_block_profile_bio/terms_and_condition/all_terms`
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
                    if (responseJson && !responseJson.errors && responseJson.data|| responseJson && responseJson?.data?.message) {
                        if (responseJson.data.length === 0|| responseJson && responseJson?.data?.message) {
                            this.setState({
                                // errorMsg: "Data Not Found",
                                loading: false,
                                isSuccessModal:true,
                                errorMsg: `${responseJson.data.message}`,
                            });
                        } else {
                            this.setState({
                                signUpData: responseJson.data.attributes,
                                isSuccessModal:true,
                                errorMsg: "Account created successfully!!",
                                submenu:true,
                                loading: false
                            },() => console.log(this.state.signUpData, 'Response *****'));
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
              if (this.termsandconditionApiCallId === apiRequestCallId) {
                console.log({ data: responseJson }, "GETTERMS  FROMAPI");
                if (responseJson && !responseJson.errors) {

                  if (responseJson.length === 0) {
                    this.setState({
                      errorMsg: "Data Not Found",
                      loading: false,
                    });
                  } else {

                    this.setState({
                     termsandcondition: responseJson.data[0]?.attributes.description,
                      errorMsg: "",
                      loading: false,
                    //   isLoader:false
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


        }
        // Customizable Area End
    }

    // Customizable Area Start
    handleDateChange(date: any) {
        this.setState({ birthDate: date });
      }
    handleChange = (e: any) => {
        let char, email;
        e.persist();
        if (e.target.name == "password") {
          console.log(e.target.value, "88888");
          let password = e.currentTarget.value;
          console.log(password);
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
          !regex.test(password) || password.length < 5
            ? this.setState({ isErrorPassword: true })
            : this.setState({ isErrorPassword: false });
          this.setState({ password: e.currentTarget.value });
        } else if (e.target.name == "firstname") {
          char = /^[a-zA-Z ]*$/.test(e.currentTarget.value);
          char
            ? this.setState({
                isErrorFirstName: false,
                firstname: e.currentTarget.value,
              })
            : this.setState({ isErrorFirstName: true });
        } else if (e.target.name == "lastname") {
          char = /^[a-zA-Z ]*$/.test(e.currentTarget.value);
          char
            ? this.setState({
                isErrorLastName: false,
                lastname: e.currentTarget.value,
              })
            : this.setState({ isErrorLastName: true });
        } else {
          const val = {
            ...this.state,
            [e.target.name]: e.target.value,
          };
          this.setState(val);
        }
      };
    
      handleSubmit = (e: any) => {
        if (this.state.page) {
          this.setState({ page: false });
        }
          if (
            this.state.firstname &&
            this.state.lastname &&
            this.state.birthDate &&
            this.state.email &&
            this.state.contactNo &&
            this.state.password &&
            this.state.confirmpwd &&
            this.state.birthDate
          ) {
            this.setState({ isErrorEmail: false });
            this.handleSubmitApiCall();
            this.setState({
    
              firstname:"",
              lastname:"",
              birthDate:null,
              email:"",
              contactNo:"",
              password:'',
              confirmpwd:'',
              isErrorFirstName:false,
              isErrorLastName:false,
              isErrorPassword:false,
              page: true,
    
            })
          }
      };

    handleSubmitApiCall = () => {
       console.log("api call started *************")
       const attrs={
        first_name:this.state.firstname,
        last_name:this.state.lastname,
        date_of_birth:this.state.birthDate,
        full_phone_number:this.state.contactNo,
        email:this.state.email,
        password: this.state.password,
        confirm_password:this.state.confirmpwd

       }
       const data ={
        type:"email_account",
        attributes:attrs
       }
       const body={
        data:data,
       }


        const header = {
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

    handleIfLoggeInAlready=()=>{
      let token = localStorage.getItem("token");
      if(token){
        window.location.href = "/userprofile"     
      }
    }

    // Customizable Area End

}
