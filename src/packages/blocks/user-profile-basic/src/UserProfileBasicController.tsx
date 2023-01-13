import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
export const configJSONBase = require("../../../framework/src/config");
import { appendFile } from "fs";
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
  // Customizable Area Start
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any[];
  passwordHelperText: String;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;

  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;

  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;

  saveButtonDisable: boolean;

  ftname: any;
  ltname: any;
  btdate: any;
  cellno: any;
  oemail: any;
  design: any;
  descrp: any;
  worksp: any;
  phonen: any;
  roleid: any;
  ctrycd: any;
  status: any;
  actype: any;
  create: any;
  update: any;
  device: any;
  active: any;
  unauth: any;
  pimage: any;
  passwd: any;
  repswd: any;
  mobnum: any;
  jtdate: any;
  imagep: any;
  images: any;
  isErpd: boolean;
  isErro: boolean;
  isErcf: boolean;
  updated: boolean;
  modalOpen: boolean;
  isSuccessModal: boolean;
  visibility: boolean;
  visibilityretype: boolean;
  visible: boolean;
  password: any;
  isOldErr: boolean;
  workspace: any;
  oldpasswd: any;
  imagechanged:boolean;
  errormessage: any;
  errmsggdisplay: any;
  responseerror: any;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  labelFirstName: string;
  lastName: string;
  labelArea: string;
  labelMobile: string;
  labelEmail: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelRePassword: string;
  btnTextCancelPasswordChange: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;

  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = "";
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = "";
  authToken: any;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  userAttr: any;
  userGetApiCallId:any;
  userAttributes:any;

  apiEditUserProfile: any;
  apiEditUserProfilePassword: any;
  apiNewPasswordCallId: string = "";
  apiChangePasswordCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
   
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      currentCountryCode: configJSON.hintCountryCode,
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,

      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",

      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,

      ftname: "",
      ltname: "",
      btdate: "",
      cellno: "",
      oemail: "",
      design: "",
      descrp: "",
      worksp: "",
      phonen: "",
      roleid: "",
      ctrycd: "",
      status: "",
      actype: "",
      create: "",
      update: "",
      device: "",
      active: "",
      unauth: "",
      imagep: "",
      pimage: null,
      images: [],
      passwd: "",
      repswd: "",
      mobnum: "",
      jtdate: "",
      isErpd: false,
      isErro: false,
      isErcf: false,
      updated: false,
      modalOpen: false,
      isSuccessModal: false,
      visibility: false,
      visibilityretype: false,
      visible: false,
      password: "",
      workspace: [],
      isOldErr: false,
      oldpasswd: "",
      imagechanged:false,
      errormessage: [],
      errmsggdisplay: "",
      responseerror: false,
    };

    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");

    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelArea = configJSON.labelArea;
    this.labelMobile = configJSON.labelMobile;
    this.labelEmail = configJSON.labelEmail;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      var selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );

      if (selectedCode !== undefined) {
        this.setState({
          currentCountryCode:
            selectedCode.indexOf("+") > 0
              ? selectedCode.split("+")[1]
              : selectedCode
        });
      }
    }


    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

     

      if (responseJson) {
        if (responseJson && this.apiEditUserProfile === apiRequestCallId) {
          if(responseJson?.errors) {
            alert("Error!")
          } else {
            console.clear()
            console.log(responseJson, "response Json analysis")
            console.log(responseJson.data.attributes.description, "desc")
            console.log("image link", this.state.pimage)
            console.log("images", this.state.images)
            console.log("imagename", this.state.images.name)
            // console.log(configJSON.imageurl, "imageurl required")
            // let image = localStorage.setItem( "image: ", responseJson.data.attributes)
            console.log("local storage image")
            console.log("images locally", responseJson.data.attributes.image)
            let img = localStorage.setItem("img", responseJson.data.attributes.image)
            // console.log("respimage", URL.createObjectURL(responseJson.data.attributes.image))
            // alert("Profile Updated successfully")
            // localStorage.setItem("description", responseJson.data.attributes.description)
            // this.props.navigation.navigate("UserProfileBlock")
            // this.setState({descrp: localStorage.getItem("description")})
            this.setState({descrp: responseJson.data.attributes.description})
            this.setState({btdate: responseJson.data.attributes.date_of_birth})
            this.setState({cellno: responseJson.data.attributes.full_phone_number})
            this.setState({pimage: responseJson.data.attributes.image})
            this.setState({images: responseJson.data.attributes.image})
            this.setState({imagep: responseJson.data.attributes.image})
            console.log(this.state.imagep, "imageppp in response")
            this.setState({isSuccessModal: true});
            this.setState({modalOpen: true});
            
            // this.setState({updated: true})
            // this.getUser()
            
            
          }
        }
      }

      if (responseJson) {
        if (responseJson && this.apiEditUserProfilePassword === apiRequestCallId) {
          if(responseJson?.errors) {
            alert("Error!")
          } else {
            console.clear()
            console.log(responseJson, "response Json analysis")
            console.log(responseJson.data.attributes.description, "desc")
            
            // alert("Profile Updated successfully")
            // localStorage.setItem("description", responseJson.data.attributes.description)
            // this.props.navigation.navigate("UserProfileBlock")
            // this.setState({descrp: localStorage.getItem("description")})
            // this.setState({descrp: responseJson.data.attributes.description})
            // this.setState({btdate: responseJson.data.attributes.date_of_birth})
            // this.setState({cellno: responseJson.data.attributes.full_phone_number})
            // this.setState({passwd: localStorage.getItem("passwordnew")})
            this.setState({isSuccessModal: true});
            this.setState({modalOpen: true});
            
            // this.setState({updated: true})
            // this.getUser()
            
            
          }
        }
      }

      if (apiRequestCallId === this.userGetApiCallId) {
        if(responseJson && responseJson.data?.attributes) {
          // console.log("response json ==>", responseJson)
          // console.log("attributes ==>", responseJson.data.attributes)
          // this.props.navigation.navigate("UserProfileEditBlock")
          this.userAttributes = responseJson.data?.attributes
          // if (this.userAttr !== null && this.userAttr !== undefined) {
            let firstname = this.userAttributes.first_name;
            let lastname  = this.userAttributes.last_name;
            let offemail  = this.userAttributes.email;
            let contactno = this.userAttributes.full_phone_number;
            let designatn = this.userAttributes.designation;
            let descriptn = this.userAttributes.description;
            let workspace = this.userAttributes.workspace_name;
            let birthdate = this.userAttributes.date_of_birth;
            let phonenumb = this.userAttributes.phone_number;
            let roleid    = this.userAttributes.role_id;
            let countrycd = this.userAttributes.country_code;
            let status    = this.userAttributes.status;
            let type      = this.userAttributes.type;
            let createdat = this.userAttributes.created_at;
            let updatedat = this.userAttributes.updated_at;
            let deviceid  = this.userAttributes.device_id;
            let activated = this.userAttributes.activated;
            let joiningdt = this.userAttributes.joining_date;
            let uniqueauth = this.userAttributes.unique_quth_id;
            let image      = this.userAttributes.image;
            let contactnum = "+" + countrycd + " " +  phonenumb;
            let imagesconfig = configJSONBase.baseURL+image;
            let workspaceup = this.userAttributes.workspace;
            let fname = this.userAttributes?.first_name
            let lname = this.userAttributes?.last_name
            let profile_pic = this.userAttributes?.image
            console.log("Workspace updated: ", workspaceup)
            console.log(contactnum)
            console.log(image)
            console.log(configJSONBase, "configg")
            console.log(configJSONBase.baseURL+image, "configimages in the response")
            localStorage.setItem("fname",fname);
            localStorage.setItem("lname",lname);
            localStorage.setItem("profile_pic",profile_pic);
            // console.log(baseURL)
            this.setState({
              oemail: offemail,
              ftname: firstname,
              ltname: lastname,
              design: designatn,
              descrp: descriptn,
              worksp: workspace,
              cellno: contactno,
              btdate: birthdate,
              phonen: phonenumb,
              roleid: roleid,
              ctrycd: countrycd,
              status: status,
              actype: type,
              create: createdat,
              update: updatedat,
              device: deviceid,
              active: activated,
              jtdate: joiningdt,
              unauth: uniqueauth,
              pimage: image,
              workspace: workspaceup,
              // imagep: configJSON.imageurl.this.state.images.name,
              // imagep: configJSON.baseURL.image,
              imagep: imagesconfig,
              // imagep: configJSON.imagep,
              // imagep: `https://finulentproject2-187250-ruby.b187250.dev.eastus.az.svc.builder.cafe/${image}`,
              mobnum: contactnum,
            });
            if(this.state.updated) {
              this.setState({
                descrp: localStorage.getItem("description")
              })
            }
            localStorage.setItem("workspace_id", this.state?.workspace?.id)
        }
      }

      if (apiRequestCallId === this.apiChangePasswordCallId) {
        if(responseJson?.errors) {
          this.setState({responseerror: true})
          // console.clear()
          console.log("CHANGE PASSWORD ERROR==>", responseJson?.errors)
          this.setState({errormessage: responseJson?.errors})
          console.log("RESPONSE SAVED::")
          console.log(this.state.errormessage)
          if(this.state.errormessage[0].message === "Please enter valid old password") {
            console.log("MESSAGE SAVED")
            // this.setState({errmsggdisplay: "Old password entered incorrectly"})
            this.setState({errmsggdisplay: this.state.errormessage[0].message})
          }
          if(this.state.errormessage[0].oldnew_password_check) {
            console.log("NOT MESSAGE BUT OLD NEW PASSWORD CHECK")
            this.setState({errmsggdisplay: this.state.errormessage[0].oldnew_password_check})
          } 
          else {
            console.log("Some other validation")
          }        
        }
        else{
          // console.clear()
          console.log("RESPONSE FOR CHANGE PASSWORD==>", responseJson)
          this.setState({isSuccessModal: true});
          this.setState({modalOpen: true});
          let newtoken = responseJson.token;
          let oldtoken = localStorage.getItem("token")
          console.log("old_token", oldtoken)
          console.log("newtoken", newtoken)
          localStorage.setItem("token", responseJson.token)
          let changedToken = localStorage.getItem("token")
          console.log("old:::", oldtoken)
          console.log("new:::", newtoken)
          console.log("changed", changedToken)
          if(newtoken === changedToken) {
            console.log("Identical")
          }
          else {
            console.log("Non identical")
          }
            // localStorage.setItem("token", responseJson.token)
            // console.log('local storage token: ', localStorage.getItem('token'))

        }
      }

      if (apiRequestCallId === this.apiNewPasswordCallId) {
        if(responseJson?.errors){
          console.log("error mana", responseJson.errors)
          // this.handleUpdatePassword()
          // localStorage.setItem("passwordnew", this.state.passwd)
        }
        else {
          this.handleUpdatePassword()

          // alert("Password Changes")
          // console.log("password mana", this.state.passwd)
          // this.setState({isSuccessModal: true});
          // this.setState({modalOpen: true});
        }
    }

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.validationApiCallId && responseJson) {
          this.arrayholder = responseJson.data;

          if (this.arrayholder && this.arrayholder.length !== 0) {
            let regexData = this.arrayholder[0];

            if (regexData) {
              if (regexData.password_validation_regexp) {
                this.passwordReg = new RegExp(
                  regexData.password_validation_regexp
                );
              }

              if (regexData.email_validation_regexp) {
                this.emailReg = new RegExp(regexData.email_validation_regexp);
              }

              if (regexData.email_validation_regexp) {
                this.setState({
                  passwordHelperText: regexData.password_validation_rules
                });
              }
            }
          }
        } else if (apiRequestCallId === this.userProfileGetApiCallId) {
          if (
            responseJson &&
            !responseJson.errors &&
            responseJson.data &&
            responseJson.data.attributes
          ) {
            //On User Profile Success

            this.userAttr = responseJson.data.attributes;

            if (this.userAttr !== null && this.userAttr !== undefined) {
              let email = this.userAttr.email;
              let firstName = this.userAttr.first_name;
              let lastName = this.userAttr.last_name;
              let currentCountryCode = this.userAttr.country_code;
              let phoneNumber = this.userAttr.phone_number
                ? this.userAttr.phone_number
                : "";

              this.setState({
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
              });

              //@ts-ignore
              this.txtInputFirstNameProps.value = firstName;

              //@ts-ignore
              this.txtInputLastNameProps.value = lastName;

              //@ts-ignore
              this.txtInputEmailProps.value = email;

              //@ts-ignore
              this.txtInputPhoneNumberProps.value = phoneNumber;

              this.registrationAndLoginType = this.userAttr.type;

              if (this.userAttr.country_code) {
                this.setState({ currentCountryCode: currentCountryCode });
              }

              if (
                configJSON.ACCOUNT_TYPE_EMAIL === this.registrationAndLoginType
              ) {
                this.setState({
                  edtEmailEnabled: false,
                  llChangePwdDummyShowContainerVisible: true
                });
                this.txtInputEmailProps.editable = false;
              } else if (
                configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType
              ) {
                this.setState({
                  edtEmailEnabled: false,
                  llChangePwdDummyShowContainerVisible: false,
                  llDoChangePwdContainerVisible: false
                });
                this.txtInputEmailProps.editable = false;
              } else if (
                configJSON.ACCOUNT_TYPE_PHONE === this.registrationAndLoginType
              ) {
                this.setState({
                  llChangePwdDummyShowContainerVisible: true,
                  edtMobileNoEnabled: false,
                  countryCodeEnabled: false
                });
                this.txtInputPhoneNumberProps.editable = false;
              }
            }
          } else {
            //Check Error Response
            if (
              responseJson.errors &&
              responseJson.errors.length > 0 &&
              responseJson.errors[0].token
            ) {
              this.showAlert("Session Expired", "Please Log in again.");
            } else {
              this.parseApiErrorResponse(responseJson);
            }
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (apiRequestCallId === this.apiChangePhoneValidation) {
          if (responseJson != null && responseJson.errors === undefined) {
            //On Change Phone Validation Success
            this.validateAndUpdateProfile();
          } else {
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        } else if (
          apiRequestCallId === this.apiCallMessageUpdateProfileRequestId
        ) {
          if (responseJson != null && responseJson.errors === undefined) {
            //On Change Phone Validation Success

            this.showAlert("Success", "Profile updated successfully.");
            this.enableDisableEditPassword(false);
            this.getUserProfile();
          } else {
            this.parseApiErrorResponse(responseJson);
          }
        }
      }
    } else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let requesterId = message.getData(
        getName(MessageEnum.SessionRequestedBy)
      );

      if (requesterId === this.uniqueSessionRequesterId) {
        const sessionToken = message.getData(
          getName(MessageEnum.SessionResponseToken)
        );
        this.authToken = sessionToken;

        this.getUserProfile();
      }
    }

    // Customizable Area End
  }

  validateMobileAndThenUpdateUserProfile() {
    let countryCode: any = this.state.currentCountryCode;
    let mobileNo: any = this.state.phoneNumber;

    let error: any = "";

    error = this.validateCountryCodeAndPhoneNumber(countryCode, mobileNo);

    if (error) {
      this.showAlert(configJSON.errorTitle, error);

      return;
    }

    if (this.userAttr) {
      const countryCodeOld = this.userAttr.country_code;
      const mobileNoOld = this.userAttr.phone_number;

      if (
        Number.parseInt(countryCode) === Number.parseInt(countryCodeOld) ||
        countryCode === configJSON.hintCountryCode
      ) {
        countryCode = null;
      }

      if (
        Number.parseInt(this.state.phoneNumber) === Number.parseInt(mobileNoOld)
      ) {
        mobileNo = null;
      }
    }

    if (mobileNo && countryCode) {
      this.validateMobileOnServer(
        this.state.currentCountryCode,
        this.state.phoneNumber
      );
    } else {
      this.validateAndUpdateProfile();
    }
  }

  validateEmail(email: string) {
    let error = null;

    if (!this.isValidEmail(email)) {
      error = configJSON.errorEmailNotValid;
    }

    return error;
  }

  validateLastName(lastName: String) {
    return !this.isNonNullAndEmpty(lastName)
      ? "Last name " + configJSON.errorBlankField
      : null;
  }

  validateFirstName(firstName: String) {
    return !this.isNonNullAndEmpty(firstName)
      ? "First name " + configJSON.errorBlankField
      : null;
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (
        !this.isNonNullAndEmpty(String(countryCode)) ||
        configJSON.hintCountryCode === countryCode
      ) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (
      this.isNonNullAndEmpty(countryCode) &&
      configJSON.hintCountryCode !== countryCode
    ) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }

  validateAndUpdateProfile() {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let countryCode: any = this.state.currentCountryCode;

    let mobileNo = this.state.phoneNumber;
    let email = this.state.email;

    let currentPwd = this.state.currentPasswordText;
    let newPwd = this.state.newPasswordText;
    let reTypePwd = this.state.reTypePasswordText;

    const errorFirstName = this.validateFirstName(firstName);
    const errorLastName = this.validateLastName(lastName);

    const errorMobileNo = this.validateCountryCodeAndPhoneNumber(
      countryCode,
      mobileNo
    );
    const errorEmail = this.validateEmail(email);

    const errorCurrentPwd = this.validateCurrentPwd(currentPwd);
    const errorNewPwd = this.validatePassword(newPwd);
    const errorRetypePwd = this.validateRePassword(reTypePwd);

    let isValidForSignUp: boolean = true;

    if (errorFirstName != null) {
      this.showAlert(configJSON.errorTitle, errorFirstName);
      return false;
    } else if (errorLastName != null) {
      this.showAlert(configJSON.errorTitle, errorLastName);
      return false;
    }

    if (configJSON.ACCOUNT_TYPE_EMAIL === this.registrationAndLoginType) {
      if (errorMobileNo !== null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);
        return false;
      }
    } else if (
      configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType
    ) {
      if (errorMobileNo != null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);
        return false;
      }
    } else if (
      configJSON.ACCOUNT_TYPE_PHONE === this.registrationAndLoginType
    ) {
      if (errorEmail != null) {
        this.showAlert(configJSON.errorTitle, errorEmail);

        return false;
      }
    } else {
      if (errorMobileNo != null) {
        this.showAlert(configJSON.errorTitle, errorMobileNo);

        return false;
      } else if (errorEmail != null) {
        this.showAlert(configJSON.errorTitle, errorEmail);

        return false;
      }
    }

    if (
      configJSON.ACCOUNT_TYPE_SOCIAL !== this.registrationAndLoginType &&
      this.state.llDoChangePwdContainerVisible
    ) {
      if (errorCurrentPwd != null) {
        this.showAlert(configJSON.errorTitle, errorCurrentPwd);
        return false;
      } else if (errorNewPwd != null) {
        this.showAlert(configJSON.errorTitle, errorNewPwd);
        return false;
      } else if (errorRetypePwd != null) {
        this.showAlert(configJSON.errorTitle, errorRetypePwd);
        return false;
      } else if (newPwd !== reTypePwd) {
        this.showAlert(
          configJSON.errorTitle,
          configJSON.errorBothPasswordsNotSame
        );
        return false;
      } else if (currentPwd === newPwd) {
        this.showAlert(
          configJSON.errorTitle,
          configJSON.errorCurrentNewPasswordMatch
        );
        return false;
      }
    }

    //Call update API
    if (this.userAttr) {
      let firstNameOld = this.userAttr.first_name;
      let lastNameOld = this.userAttr.last_name;
      let countryCodeOld = this.userAttr.country_code + "";
      let mobileNoOld = this.userAttr.phone_number + "";
      let emailOld = this.userAttr.email;
      this.registrationAndLoginType = this.userAttr.type;

      if (this.isNonNullAndEmpty(firstName) && firstName === firstNameOld) {
        firstName = null;
      }

      if (this.isNonNullAndEmpty(lastName) && lastName === lastNameOld) {
        lastName = null;
      }

      if (
        this.isNonNullAndEmpty(countryCode) &&
        countryCode === countryCodeOld
      ) {
        countryCode = null;
      }

      if (this.isNonNullAndEmpty(mobileNo) && mobileNo === mobileNoOld) {
        mobileNo = null;
      }

      if (countryCode != null || mobileNo != null) {
        if (countryCode == null) {
          countryCode = countryCodeOld;
        }

        if (mobileNo == null) {
          mobileNo = mobileNoOld;
        }
      }

      if (this.isNonNullAndEmpty(email) && email === emailOld) {
        email = null;
      }
    }

    if (
      this.isNonNullAndEmpty(firstName) ||
      this.isNonNullAndEmpty(lastName) ||
      this.isNonNullAndEmpty(countryCode) ||
      this.isNonNullAndEmpty(mobileNo) ||
      this.isNonNullAndEmpty(email) ||
      (this.isNonNullAndEmpty(currentPwd) && this.isNonNullAndEmpty(newPwd))
    ) {
      const header = {
        "Content-Type": configJSON.contentTypeApiUpdateUser,
        token: this.authToken
      };

      let data: any = {
        first_name: this.state.firstName,
        last_name: this.state.lastName
      };

      if (this.state.edtMobileNoEnabled) {
        if (
          configJSON.hintCountryCode !== countryCode &&
          this.isNonNullAndEmpty(String(countryCode)) &&
          this.isNonNullAndEmpty(String(mobileNo))
        ) {
          data = {
            ...data,
            ...{ new_phone_number: String(countryCode) + String(mobileNo) }
          };
        }
      }

      if (this.isNonNullAndEmpty(email)) {
        data = { ...data, ...{ new_email: email } };
      }

      if (
        this.isNonNullAndEmpty(currentPwd) &&
        this.isNonNullAndEmpty(newPwd)
      ) {
        data = {
          ...data,
          ...{ current_password: currentPwd, new_password: newPwd }
        };
      }

      const httpBody = {
        data: data
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.apiCallMessageUpdateProfileRequestId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.apiEndPointUpdateUser
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
        configJSON.apiUpdateUserType
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  validateCurrentPwd(currentPwd: any) {
    if (!this.isNonNullAndEmpty(currentPwd)) {
      return configJSON.errorCurrentPasswordNotValid;
    } else {
      return null;
    }
  }

  validatePassword(newPwd: any) {
    if (!this.passwordReg.test(newPwd)) {
      return configJSON.errorNewPasswordNotValid;
    } else {
      return null;
    }
  }

  validateRePassword(reTypePwd: any) {
    if (!this.passwordReg.test(reTypePwd)) {
      return configJSON.errorReTypePasswordNotValid;
    } else {
      return null;
    }
  }

  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateMobileOnServer(countryCode: any, mobileNo: any) {
    const header = {
      "Content-Type": configJSON.contenttypeApiValidateMobileNo,
      token: this.authToken
    };

    const data = {
      new_phone_number: countryCode + mobileNo
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiChangePhoneValidation = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiValidateMobileNo
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
      configJSON.callTypeApiValidateMobileNo
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  enableDisableEditPassword(isEditable: boolean) {
    if (configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType) {
      this.setState({
        edtEmailEnabled: false,
        llDoChangePwdContainerVisible: false,
        llChangePwdDummyShowContainerVisible: false
      });
    } else {
      if (isEditable) {
        this.setState({
          llDoChangePwdContainerVisible: true,
          llChangePwdDummyShowContainerVisible: false
        });
      } else {
        this.setState({
          llDoChangePwdContainerVisible: false,
          llChangePwdDummyShowContainerVisible: true,
          currentPasswordText: "",
          newPasswordText: "",
          reTypePasswordText: ""
        });
      }
    }
  }

  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  requestSessionData() {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.uniqueSessionRequesterId = msg.messageId;
    this.send(msg);
  }

  getUserProfile() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.authToken
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
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
  txtInputFirstNameProps = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNameProps.value = text;
    }

  };

  txtInputLastNameProps = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });

      //@ts-ignore
      this.txtInputLastNameProps.value = text;
    }
  };

  txtInputPhoneNumberlWebProps = {
     onChangeText: (text:string) => 
     {
       if (this.txtInputPhoneNumberlWebProps.editable) {
        this.setState({ phoneNumber: text })
     
        //@ts-ignore
        this.txtInputPhoneNumberProps.value = text;
       }
    },
    editable: true
  };

  txtInputPhoneNumberlMobileProps = {
    ...this.txtInputPhoneNumberlWebProps,
    autoCompleteType:"tel",
    keyboardType: "phone-pad",
  };

  txtInputPhoneNumberProps = this.isPlatformWeb()
    ? this.txtInputPhoneNumberlWebProps
    : this.txtInputPhoneNumberlMobileProps;

  txtInputEmailWebProps  = {
    value: "",
    editable: true,
    onChangeText: (text:string) => {
      if (this.txtInputEmailProps.editable) {
        this.setState({ email: text })
        this.txtInputEmailProps.value = text
      }
    }
  }

  txtInputEmailMobileProps  = {
    ...this.txtInputEmailWebProps,
    keyboardType: "email-address",
  }

  txtInputEmailProps = this.isPlatformWeb()
  ? this.txtInputEmailWebProps
  : this.txtInputEmailMobileProps;
  
  btnEnableEditPasswordProps = {
    onPress: () => this.enableDisableEditPassword(true)
  }

  txtInputCurrentPasswordProps = {
    onChangeText: (text:string) => {
      this.setState({ currentPasswordText: text })
      this.txtInputCurrentPasswordProps.value = text
    },
    value: "",
    secureTextEntry: true
  }

  btnPasswordShowHideButtonProps = {
    onPress: () => { 
      this.setState({ enablePasswordField: !this.txtInputCurrentPasswordProps.secureTextEntry });
      this.txtInputCurrentPasswordProps.secureTextEntry = !this.txtInputCurrentPasswordProps.secureTextEntry
      this.imgPasswordShowhideProps.source = this.txtInputCurrentPasswordProps.secureTextEntry  ? imgPasswordVisible : imgPasswordInVisible
    }
  }

  imgPasswordShowhideProps = {
    source: imgPasswordVisible
  }

  txtInputNewPasswordProps = {
    onChangeText: (text:string) => {
      this.setState({ newPasswordText: text })
      this.txtInputNewPasswordProps.value = text
    },
    value: "",
    secureTextEntry: true
  }

  btnNewPasswordShowHideButtonProps = {
    onPress: () => {
      this.setState({ 
        enableNewPasswordField: !this.txtInputNewPasswordProps.secureTextEntry });
        this.txtInputNewPasswordProps.secureTextEntry = !this.txtInputNewPasswordProps.secureTextEntry
        this.imgNewPasswordShowhideProps.source =  this.txtInputNewPasswordProps.secureTextEntry  ? imgPasswordVisible : imgPasswordInVisible
    }
  }

  imgNewPasswordShowhideProps = {
    source: imgPasswordVisible
  }

  txtInputReTypePasswordProps = {
    onChangeText:(text:string) => {
      this.setState({ reTypePasswordText: text })
      this.txtInputReTypePasswordProps.value = text
    },
    secureTextEntry: true,
    value: ""
  }

  imgReTypePasswordShowhideProps = {
    source: imgPasswordVisible
  }

  btnReTypePasswordShowHideProps = {
    onPress: () => {
      this.setState({ 
        enableReTypePasswordField: !this.txtInputReTypePasswordProps.secureTextEntry });
        this.txtInputReTypePasswordProps.secureTextEntry = !this.txtInputReTypePasswordProps.secureTextEntry
        this.imgReTypePasswordShowhideProps.source =  this.txtInputNewPasswordProps.secureTextEntry  ? imgPasswordVisible : imgPasswordInVisible
    }
  }

  btnDisableEditPasswordProps = {
    onPress: () => this.enableDisableEditPassword(false)
  }

  getUser =() => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetAPIEndPoint
    );

    const header = {
      token: localStorage.getItem("token")
      // "Content-Type": configJSON.contentTypeApiGetUserProfile,
      // token: this.authToken
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleUpdate = () => {
    let token = localStorage.getItem("token")
    let password = localStorage.getItem("password")
    console.log(token, "token==> update");
    console.log(password, "password ==> update");
    console.log("passwd", this.state.passwd)
    this.setState({ password: password})

    console.log("image link", this.state.pimage)
    console.log("images", this.state.images)
    // let image = localStorage.setItem("image", this.state.pimage)
    // console.log("pimage", image)
    // let images = localStorage.getItem("image")

    // if(this.userAttributes){
    //   let descriptionnew = this.state.descrp;
    //   let phonenumbernew = this.state.cellno;
    //   let dateofbirthnew = this.state.btdate;
    //   console.log("description new", descriptionnew);
    //   console.log("phonenumber new", phonenumbernew);
    //   console.log("dateofbirth new", dateofbirthnew)
    // }

    let data: any = {
      description: this.state.descrp,
      date_of_birth: this.state.btdate,
      full_phone_number: this.state.cellno,
    };  
    let formData = new FormData();
        formData.append('date_of_birth', this.state.btdate || null );
        formData.append('full_phone_number', this.state.cellno);
        formData.append('description', this.state.descrp);
        if(this.state.imagechanged){
          formData.append("image", this.state.images)
        }else{
          
        }
        // if(this.state.images !== null) {
        // formData.append("image", this.state.images);
        // }
        // else {
        //   formData.append("image", this.state.imagep)
        // }
        if(this.state.passwd !== null) {
          formData.append("password", this.state.passwd)
        }
         else {
          formData.append("password", this.state.password)
        }
    const header = {
      "token" : token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.apiEditUserProfile = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.EditAPIEndPoint
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      // JSON.stringify(httpBody)
      // JSON.stringify(formData)
      formData
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT",
      // configJSON.updateAPI,
      // configJSON.loginAPiMethod,
    );
  
    runEngine.sendMessage(requestMessage.id, requestMessage);
  
    return true;
  }

  setNewPassword =() => {
    // let tokennew = localStorage.getItem("token")
    let emailVal = localStorage.getItem("email")
  const header = {
    "Content-Type" : "application/json",
  };
  const httpBody = {
    // token: tokennew,
    email: emailVal,
    new_password: this.state.passwd,
    confirm_password: this.state.repswd
  };
  
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  
  this.apiNewPasswordCallId = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    configJSON.resetPassword
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
    // configJSON.loginAPiMethod,
    "POST"
  );
  
  runEngine.sendMessage(requestMessage.id, requestMessage);
  
  return true;
  }
  
  handleClose = () => {
  
    this.setState({ modalOpen: false });
    this.setState({isSuccessModal:false})
    // this.props.navigation.navigate("UserProfileBlock")
    // localStorage.removeItem("token");
    // localStorage.removeItem("email")
    // localStorage.removeItem("password")
    // localStorage.removeItem("id")
    // localStorage.removeItem("refresh_token")
    // localStorage.removeItem("role_id")
    // localStorage.removeItem("modelname")
    // localStorage.removeItem("open")
    // localStorage.removeItem("peopleOpen")
    // localStorage.removeItem("user_type")
    // localStorage.removeItem("img")
    // localStorage.removeItem("saveUserInfo")
    // localStorage.removeItem("workspace_id")
    this.props.history.push("/userprofile")
  };


  handleUpdatePassword = () => {
    let token = localStorage.getItem("token")
    let password = localStorage.getItem("password")
    console.log(token, "token==> update");
    console.log(password, "password ==> update");
    console.log("passwd", this.state.passwd)
    this.setState({ password: password})

    let formData = new FormData();
        // formData.append('date_of_birth', this.state.btdate || null );
        // formData.append('full_phone_number', this.state.cellno);
        // formData.append('description', this.state.descrp);
        // formData.append("image", this.state.pimage);
        if(this.state.passwd !== null) {
          formData.append("password", this.state.passwd)
        }
         else {
          formData.append("password", this.state.password)
        }
    const header = {
      "token" : token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.apiEditUserProfilePassword = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.EditAPIEndPoint
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      // JSON.stringify(httpBody)
      // JSON.stringify(formData)
      formData
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT",
      // configJSON.updateAPI,
      // configJSON.loginAPiMethod,
    );
  
    runEngine.sendMessage(requestMessage.id, requestMessage);
  
    return true;
  }
  
  handleSavePassword = () => {
    let token = localStorage.getItem("token");
    const header = {
      "token" : token,
      "Content-Type" : "application/json",
    };
    const data = {
      // token: token,
      old_password: this.state.oldpasswd,
      new_password: this.state.passwd,
      confirm_password: this.state.repswd
    }
    const httpBody = {
      // token: token,
      // old_password: this.state.oldpasswd,
      // new_password: this.state.passwd,
      // confirm_password: this.state.repswd
      data: data
    };
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    this.apiChangePasswordCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      // configJSON.resetPassword
      'change_password'
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
      // configJSON.loginAPiMethod,
      "POST"
    );
    
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
    return true;

  }
  // Customizable Area End

}
