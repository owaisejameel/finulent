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
  newFieldAddedCallback?: any;
  fieldsData?: any;
  isChooseTemplateFlow?: boolean;
}
interface S {
  openAddField: boolean,
  titleError: string;
  typeError: string;
  valueError: string;
  fieldName: string;
  fieldType: any;
  mandatoryField: string;
  filterReq: string;
  dropdownValues: any;
  singleVal: string;
  fieldsData: any
}
interface SS {
  id: any
}
export default class AddFieldController extends BlockComponent<Props, S, SS>{
  addFieldApiId: string = "";
  query: any = new URLSearchParams(this.props.history?.location?.search);

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.handleAddButtonAction = this.handleAddButtonAction.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.state = {
      openAddField: false,
      titleError: "",
      typeError: "",
      valueError: "",
      fieldName: "",
      fieldType: null,
      mandatoryField: "no",
      filterReq: "no",
      dropdownValues: [],
      singleVal: "",
      fieldsData: []
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() { 
    console.log('this.query', this.props.history?.location?.search)
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

  handleAddDrpdwnValues = (e: any) => {
    e.preventDefault()
    if ((e.target.value).trim() !== '') {
      this.setState({
        dropdownValues: [...this.state.dropdownValues, e.target.value],
        singleVal: ''
      })
    }
  }

  handleDeleteValues = (e: any) => {
    const valueText = e.target.previousSibling.innerHTML;
    const updatedDropdownValues = this.state.dropdownValues.filter((val: any) => {
      return val !== valueText
    })
    this.setState({
      dropdownValues: updatedDropdownValues
    })
  }

  handleMandatoryRadioClick = (e: any) => {
    const valueText = e.target.nextSibling.innerHTML;
    console.log(valueText);
    this.setState({
      mandatoryField: valueText.toLowerCase()
    })
  }

  handleFilterRadioClick = (e: any) => {
    if (this.state.fieldType?.label !== 'Text') {
      const valueText = e.target.nextSibling.innerHTML;
      this.setState({
        filterReq: valueText.toLowerCase()
      })
    }
  }

  isChecked = (arr: any, name: any) => {
    for (let value of arr) {
      if (value.field_name === name) {
        return true;
      }
    }
    return false;
  };
  ternaryAlternative = (confition: any, trueStatement: any, falseStatement: any): any => {
    if (confition) return trueStatement;
    else return falseStatement;
  }

  andAlternative = (confition: any, statement: any): any => {
    if (confition) return statement;
    else return null
  }

  handleValidation = (): boolean => {
    const duplicateField = this.state?.fieldsData?.find((field: any) => field.field_name?.toUpperCase() == this.state?.fieldName?.toUpperCase()) || false
    console.log('duplicateField',duplicateField)
    if (this.state.fieldName === '' || this.state.fieldType === null) {
      if (this.state.fieldName === '') {
        this.setState({
          titleError: "Field name can't be empty"
        })
      }
      if (this.state.fieldType === null) {
        this.setState({
          typeError: "Please select field type"
        })
      }
      return false
    }
    else if(duplicateField){
      this.setState({
        titleError: "Field with same name is already added, please enter valid name."
      })
      return false
    }
    else if (this.state.fieldType.label === 'Dropdown' && this.state.dropdownValues.length === 0) {
      this.setState({
        valueError: "Value can't be empty"
      })
      return false
    }
    return true
  }

  handleAddFieldToData = () => {
    const lastItem = this.state.fieldsData[this.state.fieldsData.length - 1];
    const lastFieldSeq = lastItem?.sequence_no || 0;
    const newField = {
      field_name: this.state.fieldName, //form field
      field_type: this.state.fieldType?.value === 'Calendar' ? 'Calendar' : this.state.fieldType?.value, //form field
      field_values: this.state.dropdownValues || [], //form field
      associated_class_name: "",
      is_frozen: false,
      mandatory: this.state.mandatoryField === 'yes' ? true : false, //form field
      quick_filter: this.state.filterReq === 'yes' ? true : false, //form field
      visibility: true,
      sequence_no: lastFieldSeq + 1, // last sequence + 1
      custom_field: true,
      auto_filled: false
    }
    const updatedFields = [...this.state.fieldsData];
    updatedFields.push(newField);
    this.props.newFieldAddedCallback(updatedFields);
    this.setState({
      openAddField: false,
      fieldName: '',
      fieldType: null,
      mandatoryField: 'no',
      filterReq: 'no',
      dropdownValues: [],
      singleVal: '',
      fieldsData: updatedFields
    })
  }

  handleAddButtonAction = () => {
    console.log(this.state)
    console.log(this.state.fieldType?.value);
    if (this.handleValidation()) {
      if(this.props.isChooseTemplateFlow){
        this.handleAddFieldToData();
      }
      else this.addFieldToSavedTemplate();
    }
  }

  addFieldToSavedTemplate = () => {
    const header = {
      "Content-Type": 'application/json',
      token: localStorage.getItem('token')
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.addFieldApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/template_fields`
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
            field_data: {
              field_name: this.state.fieldName, //form field
              field_type: this.state.fieldType?.value, //form field
              field_values: this.state.dropdownValues || [], //form field
              mandatory: this.state.mandatoryField === 'yes' ? true : false, //form field
              quick_filter: this.state.filterReq === 'yes' ? true : false, //form field
            }
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

  handleButtonCancel = () => {
    this.setState({
      openAddField: false,
      titleError: "",
      typeError: "",
      valueError: "",
      fieldName: "",
      fieldType: null,
      mandatoryField: "no",
      filterReq: "no",
      dropdownValues: [],
      singleVal: "",
    })
  }

  handleApiAddFieldSuccessRes = (responseJson: any) => {
    this.props.newFieldAddedCallback();
    this.setState({
      openAddField: false,
      fieldName: '',
      fieldType: null,
      mandatoryField: 'no',
      filterReq: 'no',
      dropdownValues: [],
      singleVal: '',
    })
    if (responseJson.status === 500) {
      toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    else {
      toast.success("Field Added", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
  }

  handleApiAddFieldFailure = (responseJson: any) => {
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
        if (this.addFieldApiId === apiRequestCallId) {
          this.handleApiAddFieldSuccessRes(responseJson)
        }
      }
      else {
        if (this.addFieldApiId === apiRequestCallId) {
          this.handleApiAddFieldFailure(responseJson)
        }
      }
    }
  }
}
// Customizable Area End