//Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
export const configJSONBase = require("../../../framework/src/config");
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import moment from "moment";

toast.configure();
export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  that?: any;
  history?: any;
  newProjectAddedCallback?: any;
  sequenceData?: any;
  projectTypes?: any;
  updateProjectData?: any;
  editProjectId?: any;
  isEditProject: boolean;
  fieldsData: any;
  QAandQc: any;
}
interface S {
  testData: any;
  errors: any;
  fieldsData: any;
  loader: boolean;
  projectTypes: any;
  fieldsDataCopy: any;
}

interface SS {
  id: any;
}
export default class AddProjectController extends BlockComponent<Props, S, SS>{
  ApiAddProjectId: string = "";
  ApiGetAllFieldId: string = "";
  internalApiCallId: string = "";
  ApiEditProjectId: string = "";
  query: any = new URLSearchParams(this.props.history?.location?.search);
  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.state = {
      loader: true,
      errors: [],
      testData: {},
      fieldsData: [],
      projectTypes: [],
      fieldsDataCopy: []
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState({ loader: true })
    let fieldsData = this.props.fieldsData
    fieldsData = fieldsData?.filter((i: any) => !i?.attributes?.auto_filled)
    this.setState({
      projectTypes: this.props.projectTypes,
      fieldsData: fieldsData,
      fieldsDataCopy: fieldsData
    })
  }

  async componentWillReceiveProps(nextProps: any) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.projectTypes !== this.state.projectTypes) {
      this.setState({ projectTypes: nextProps.projectTypes });
    }
    if (nextProps.fieldsData !== this.state.fieldsData) {
      let data = [];
      if (nextProps?.isEditProject) data = nextProps.updateProjectData 
      else data = nextProps.fieldsData;
      let updateProjectData = data?.map((i: any) => !nextProps?.isEditProject && (i?.field_name === "Date" || i?.field_name === "Finulent Status") ? ({
        ...i, 
        template_field_id: i?.id,
        data: i?.field_name == "Date" ? moment().format('yyyy-MM-DD') : 'Project in Queue'
      }) : ({
        ...i,
        template_field_id: i?.id,
        data: i?.data || "",
      }))
      this.setState({ fieldsData: updateProjectData, loader: false, fieldsDataCopy: updateProjectData });
    }
  }

  options = [{ value: 'Option1', label: 'Option1' }, { value: 'Option2', label: 'Option2' }];

  handleValidation = () => {
    let fieldIdsWithError: any[] = [];
    this.state?.fieldsData?.map((item: any) => {
      if (item?.create_mandatory === true && item.data == '') {
        fieldIdsWithError.push(item?.template_field_id?.toString())
      }
    })
    this.setState({ errors: fieldIdsWithError });
    if(fieldIdsWithError?.length == 0) return true;
    return false;
  }

  handleChange = (value: any, field: any) => {
    let fieldsData = [...this.state.fieldsData]
    let errors = [...this.state.errors]
    fieldsData = fieldsData.map((i: any) => i?.template_field_id == field?.id ? { ...i, data: value } : { ...i });
    if (field?.create_mandatory) {
      if (value !== "") errors = errors?.filter((id: any) => id !== field?.id);
      else errors.push(field?.id)
    }
    this.setState({ fieldsData: fieldsData, errors: errors });
  }

  renderValue = (value: any, associated_class_name?: string, options?: any) => {
    const optionValue = {
      label: "",
      value: ""
    }
    if(this.props.isEditProject || value === "Project in Queue"){
      // ? have to make options like this coz of react-select => defaultValue takes option object.
      if (associated_class_name == 'AccountBlock::Account') {
        const matchAccount = this.props.that.state?.QAandQc?.find((i: any) => i?.id == value)
        optionValue.label = matchAccount?.attributes?.first_name + " " + matchAccount?.attributes?.last_name;
        optionValue.value = matchAccount?.id;
      }
      if (associated_class_name == 'BxBlockDashboard::TypeOfProject') {
        const matchTypeOfProj = this.state?.projectTypes?.find((i: any) => i?.id == value)
        optionValue.label = matchTypeOfProj?.attributes?.project_type;
        optionValue.value = matchTypeOfProj?.id;
      }
      else if (options?.length) {
        optionValue.label = value;
        optionValue.value = value;
      }
      if(optionValue?.label && optionValue?.value) return optionValue;
      else return value;
    }
    return value;
  }

  createOptions = (fieldValues: any, associated_class_name: string) => {
    if (associated_class_name == 'AccountBlock::Account') {
      return this.props.that.state.QAandQc?.map((i: any) => ({
        label: i?.attributes?.first_name + " " + i?.attributes?.last_name,
        value: i?.id
      }))
    }
    if (associated_class_name == 'BxBlockDashboard::TypeOfProject') {
      return this.state.projectTypes?.map((i: any) => ({
        label: i?.attributes?.project_type,
        value: i?.id
      }))
    }
    else if (fieldValues?.length) {
      return fieldValues?.map((i: any) => ({ value: i, label: i }));
    }
    else return this.options;
  }

  renderError = (id: string) => {
    return this.state.errors.includes(id)
  }

  renderhelperText = (id: string, name: string) => {
    return this.state.errors.includes(id) ?  <p  style={{color:"red",fontFamily:"sans-serif",fontSize:14,textAlign:'left',margin:"5px"}}> Please fill {name}  </p>: ''
  }

  ternaryAlternative = (condition: any, trueStatement: any, falseStatement: any): any => {
    if (condition) return trueStatement;
    else return falseStatement;
  }

  andAlternative = (confition: any, statement: any): any => {
    if (confition) return statement;
    else return null
  }

  handleCancel = () => {
    this.setState({
      errors: [],
      fieldsData: [],
      fieldsDataCopy: [],
    })
    this.props.that.setState({
      openAddProject: false,
      isEditProject: false
    })
  }

  handleEditProject = () => {
    if (this.handleValidation()) {
      const fieldsData = this.state.fieldsData?.map(({ template_field_id, data }: any) => ({ template_field_id, data }));
      const fieldsDataCopy = this.state.fieldsDataCopy?.map(({ template_field_id, data }: any) => ({ template_field_id, data }));
      const changedFields = fieldsData?.filter((i: any) => fieldsDataCopy?.find((j: any) => i?.template_field_id == j?.template_field_id && i?.data !== j?.data));
      if (changedFields?.length) {
        const header = {
          "Content-Type": 'application/json',
          token: localStorage.getItem('token')
        };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        //GO TO REQUEST STATE
        this.ApiEditProjectId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `/bx_block_dashboard/template_field_data/${this.props.editProjectId}`
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );

        const data = {
          project: {
            template_id: this.query.get('tid'),
            client_id: this.query.get('cid'),
            client_subfolder_id: this.query.get('sfid') == null ? "" : this.query.get('sfid'),
            project_data: changedFields
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
    }
  }

  handleAddProject = () => {
    if(this.handleValidation()){
      const formData = this.state?.fieldsData?.filter(({template_field_id, data}: any) => data && ({template_field_id, data}))
      const header = {
        "Content-Type": 'application/json',
        token: localStorage.getItem('token')
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      //GO TO REQUEST STATE
      this.ApiAddProjectId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_dashboard/template_field_data`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const data = {
        project: {
            template_id: this.query.get('tid'),
            client_id: this.query.get('cid'),
            client_subfolder_id: this.query.get('sfid') == null ? "" : this.query.get('sfid'),
            project_data: formData
          }
      }

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        'POST'
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  }

  handleApiAddProjectSuccessRes = (responseJson: any) => {
    this.props.newProjectAddedCallback();
    this.handleCancel();
    if (responseJson.status === 500) {
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else {
      toast.success("Project added successfully", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
  }

  handleApiAddProjectFailure = (responseJson: any) => {
    if (typeof responseJson.errors === "string") {
      toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if(typeof responseJson.errors?.[0] === "string") responseJson.errors?.map((errs: string) => toast.error(errs, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 }))
  else toast.error("Something went wrong, please try again later.", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
  }

  handleEdiProjectSucc = (responseJson: any) => {
    this.props.newProjectAddedCallback();
    this.handleCancel();
    if (responseJson.status === 500) {
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else {
      toast.success("Project updated successfully", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
  }

  handleEditProjectFailure = (responseJson: any) => {
    if (typeof responseJson.errors === "string") {
      toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else if(typeof responseJson.errors?.[0] === "string") responseJson.errors?.map((errs: string) => toast.error(errs, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 }))
  else toast.error("Something went wrong, please try again later.", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
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
        if (this.ApiAddProjectId === apiRequestCallId) {
          this.handleApiAddProjectSuccessRes(responseJson)
        }
        else if (this.ApiEditProjectId === apiRequestCallId) {
          this.handleEdiProjectSucc(responseJson);
        }
      }
      else {
        if (this.ApiAddProjectId === apiRequestCallId) {
          this.handleApiAddProjectFailure(responseJson)
        }
        if (this.ApiEditProjectId === apiRequestCallId) {
          this.handleEditProjectFailure(responseJson)
        }
      }
    }
  }
}
//Customizable Area End