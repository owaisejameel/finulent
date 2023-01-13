import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// import firebase from '../../../web/src/firebase'
import firebase from 'firebase';

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { mail, password } from "../../dashboard/src/assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // history:string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  isErrorMail: boolean;
  isMail: boolean;
  isPassword: boolean;
  showPassword: boolean;
  visibility: boolean;
  visibilityretype: boolean;
  passwordError: boolean;
  termsModalClose: boolean;
  termsModalOpen: boolean;
  termsandcondition: any;
  errorMsg: any;
  loading: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  apiLoginCallId: string = "";
  termsandconditionApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      isMail: false,
      isErrorMail: false,
      isPassword: false,
      visibility: false,
      visibilityretype: false,
      showPassword: false,
      passwordError: false,
      termsModalOpen: false,
      termsModalClose: false,
      termsandcondition: "",
      errorMsg: "",
      loading: false,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    this.handleIfLoggeInAlready();
    this.getTermsandCondition();
    // Customizable Area End
  }

  // Customizable Area Start

  handleIfLoggeInAlready=()=>{
    let token = localStorage.getItem("token");
    if(token){
      this.props.history.push('/userprofile');       
    }
  }

  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin(),
  };

  btnEmailLogInProps = {
    onPress: () => this.doEmailLogIn(),
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  // Web Event Handling
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };

  setEmail = (text: string) => {
    this.setState({
      email: text,
    });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setRememberMe = (value: boolean) => {
    this.setState({ checkedRememberMe: value });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword(),
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      const userName = message.getData(getName(MessageEnum.LoginUserName));

      const password = message.getData(getName(MessageEnum.LoginPassword));

      const countryCode = message.getData(
        getName(MessageEnum.LoginCountryCode)
      );

      if (!countryCode && userName && password) {
        this.setState({
          email: userName,
          password: password,
          checkedRememberMe: true,
        });

        //@ts-ignore
        this.txtInputEmailProps.value = userName;

        //@ts-ignore
        this.txtInputPasswordProps.value = password;

        this.CustomCheckBoxProps.isChecked = true;
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if(responseJson) {
        switch(apiRequestCallId) {
          case this.apiLoginCallId :
            return this.handleLoginResponse(responseJson)
          case this.termsandconditionApiCallId : 
            return this.termsAndConditionResponse(responseJson, errorReponse)
          case this.apiEmailLoginCallId : 
            return (this.apiEmailLoginCallIdResponse(responseJson),this.parseApiCatchErrorResponse(errorReponse))
          case this.validationApiCallId : 
            return this.validationApiCallIdResponse(responseJson)

        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {

    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
 // Customizable Area Start

 apiEmailLoginCallIdResponse = (responseJson: any) => {
  if (responseJson && responseJson.meta && responseJson.meta.token) {

    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
    this.saveLoggedInUserData(responseJson);
    this.sendLoginSuccessMessage();
    this.openInfoPage();
  } else {
    //Check Error Response
    this.parseApiErrorResponse(responseJson);
    this.sendLoginFailMessage();
  }
 }

 validationApiCallIdResponse = (responseJson: any) => {
  if(responseJson !== undefined) {
    var arrayholder = responseJson.data;

    if (arrayholder && arrayholder.length !== 0) {
      let regexData = arrayholder[0];

      if (regexData && regexData.email_validation_regexp) {
        this.emailReg = new RegExp(regexData.email_validation_regexp);
      }
    }
  }

 }
 
 handleLogin = () => {
  const header = {
    "Content-Type" : "application/json",
  };

  const attrs = {
    "email": this.state.email,
    "password": this.state.password,
    "device_id":localStorage.getItem('device_id')
  };

  const data = {
    type: "email_account",
    attributes: attrs,
  };

  const httpBody = {
    data: data,
  };

  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.apiLoginCallId = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    configJSON.loginAPIEndPoint
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestBodyMessage),
    JSON.stringify(httpBody)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    configJSON.loginAPiMethod,
    // "POST"
  );

  runEngine.sendMessage(requestMessage.id, requestMessage);

  return true;
}

handleLoginResponse = (responseJson: any) => {
  if(responseJson?.errors) {
    console.log("error===>", responseJson?.errors)
    this.setState({passwordError: true})
    this.sendLoginFailMessage();
  } else {
    let token = responseJson.meta.token;
    let refresh_token = responseJson.meta.refresh_token;
    let role_id = responseJson.meta.role_id;
    let id = responseJson.meta.id;
    let mail = this.state.email;
    let pass = this.state.password;
    console.log(id, mail,pass, "id mail pass")
    localStorage.setItem("token", token)
    localStorage.setItem("refresh_token", refresh_token)
    localStorage.setItem("id", id)
    localStorage.setItem("email", mail)
    localStorage.setItem("role_id", role_id)
    localStorage.setItem("modelname","Profile")
    localStorage.setItem("user_type",role_id);
    this.props.history.push('/userprofile');
  };
}

getTermsandCondition(): boolean {
  const header = {
    'token': window.localStorage.getItem('token'),
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
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  return true;
}

termsAndConditionResponse = (responseJson: any, errorReponse: any) => {
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
      });
    }
  } else {
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

  // Customizable Area End
}
