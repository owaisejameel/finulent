import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import moment from "moment";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  key: any;
  navigation: any;
  id: string;
  // Customizable Area Start
  history: any;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  projects: any;
  history: any;
  projectStatusColors: any;
  loader: boolean;
  clientDropDown: any;
  selectedClient: any;
  selectedProjectData: any;
  // Customizable Area End
  filterOpen: null | HTMLElement;
  leaveFromDate: Date | null;
  draftData: any;
  workspaceData: any;
  workspace_id: any;
  modalFromDate: string;
  modalToDate: string;
  selectedClientsName: any;
  clientsData: any;
  filterFromDateError:any;
  filterToDateError : any;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class InvoicesDashboardController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  allProjectApiCallId: string = "";
  allColorApiCallId: string = "";
  allClientDropDownId: string = "";
  selectedProjectApiId: string = "";
  getAllprojectsApiCallId: string = "";
  getAllWorkspaceApiCallId: string = "";
  getAllClientsApiCallId:string="";
  getProjectsWithFilterApiCallId:string="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      filterFromDateError:false,
      filterToDateError : false,
      loader: true,
      projects: {},
      projectStatusColors: {},
      history: this.props.history,
      clientDropDown: [],
      selectedClient: "All",
      selectedProjectData: {},
      filterOpen: null,
      leaveFromDate: null,
      draftData: [],
      workspaceData: [],
      workspace_id: "",
      modalFromDate: "",
      modalToDate: "",
      selectedClientsName: [],
      clientsData: [
        {
          id: "169",
          type: "client_list",
          attributes: {
            client_id: "FS169",
            client_name: "ss",
          },
        },
        {
          id: "263",
          type: "client_list",
          attributes: {
            client_id: "SL263",
            client_name: "son",
          },
        },
      ],

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors) {
        switch (apiRequestCallId) {
          case this.allProjectApiCallId:
            // let nRes = {
            //   "Project in Queue": [
            //     {
            //       id: 7,
            //       designer: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qc_id: "146",
            //       internal_qa_id: "146",
            //       internal_qc: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qa: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       comments: "",
            //       attachments: [],
            //       comment_count: 0,
            //       attachment_count: 0,
            //       date: "1/4/2009",
            //       site_name: "raktec221",
            //       project_id: "774",
            //       project_name: "sdfd",
            //       side_elevation: "tert",
            //       no_of_roofs: "yyds",
            //       dropdown: "fdgfd",
            //       testing: "fvhsdgf",
            //       ahj: "dfds",
            //       utility: "7r7",
            //       solar_type: "1",
            //       site_id: "si11",
            //       bu_id: "u22",
            //       jurisdiction: "avc",
            //       photosim: "ty",
            //       photosim_by: "we",
            //       site_type: "ty",
            //       type: "tyi",
            //       internal_errors: "45",
            //       target_production_start_date: "1/4/2009",
            //       target_time_from_production_initiated: "qerty",
            //       target_time_from_qc_initiated: "uio",
            //       finulent_status: "Project in Queue",
            //       number_of_roofs: "2",
            //       code: "58",
            //       state: "indore",
            //       s_no: 1,
            //       file_completed: "",
            //       client_revision_reason: "",
            //       internal_comments: "",
            //       file_link: "",
            //       priority: "",
            //       production_assigned_date_time: "",
            //       production_initiated: "",
            //       production_sent_for_qc: "",
            //       duration_of_production: "",
            //       qc_initiated: "",
            //       file_sent_for_corrections: "",
            //       revised_file_sent_for_qc: "",
            //       solar_files_overdue_for_production: "",
            //       design_corrections_initiated: "",
            //       external_errors: "",
            //       lag_between_design_corrections_initiated_and_revised_file_sent_for_qc:
            //         "",
            //       lag_between_production_sent_for_qc_and_qc_initiated: "",
            //       new_test: "",
            //     },
            //     {
            //       id: 7,
            //       designer: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qc_id: "146",
            //       internal_qa_id: "146",
            //       internal_qc: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qa: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       comments: "",
            //       attachments: [],
            //       comment_count: 0,
            //       attachment_count: 0,
            //       date: "1/4/2009",
            //       site_name: "raktec221",
            //       project_id: "774",
            //       project_name: "sdfd",
            //       side_elevation: "tert",
            //       no_of_roofs: "yyds",
            //       dropdown: "fdgfd",
            //       testing: "fvhsdgf",
            //       ahj: "dfds",
            //       utility: "7r7",
            //       solar_type: "1",
            //       site_id: "si11",
            //       bu_id: "u22",
            //       jurisdiction: "avc",
            //       photosim: "ty",
            //       photosim_by: "we",
            //       site_type: "ty",
            //       type: "tyi",
            //       internal_errors: "45",
            //       target_production_start_date: "1/4/2009",
            //       target_time_from_production_initiated: "qerty",
            //       target_time_from_qc_initiated: "uio",
            //       finulent_status: "Project in Queue",
            //       number_of_roofs: "2",
            //       code: "58",
            //       state: "indore",
            //       s_no: 1,
            //       file_completed: "",
            //       client_revision_reason: "",
            //       internal_comments: "",
            //       file_link: "",
            //       priority: "",
            //       production_assigned_date_time: "",
            //       production_initiated: "",
            //       production_sent_for_qc: "",
            //       duration_of_production: "",
            //       qc_initiated: "",
            //       file_sent_for_corrections: "",
            //       revised_file_sent_for_qc: "",
            //       solar_files_overdue_for_production: "",
            //       design_corrections_initiated: "",
            //       external_errors: "",
            //       lag_between_design_corrections_initiated_and_revised_file_sent_for_qc:
            //         "",
            //       lag_between_production_sent_for_qc_and_qc_initiated: "",
            //       new_test: "",
            //     },
            //     {
            //       id: 7,
            //       designer: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qc_id: "146",
            //       internal_qa_id: "146",
            //       internal_qc: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qa: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       comments: "",
            //       attachments: [],
            //       comment_count: 0,
            //       attachment_count: 0,
            //       date: "1/4/2009",
            //       site_name: "raktec221",
            //       project_id: "774",
            //       project_name: "sdfd",
            //       side_elevation: "tert",
            //       no_of_roofs: "yyds",
            //       dropdown: "fdgfd",
            //       testing: "fvhsdgf",
            //       ahj: "dfds",
            //       utility: "7r7",
            //       solar_type: "1",
            //       site_id: "si11",
            //       bu_id: "u22",
            //       jurisdiction: "avc",
            //       photosim: "ty",
            //       photosim_by: "we",
            //       site_type: "ty",
            //       type: "tyi",
            //       internal_errors: "45",
            //       target_production_start_date: "1/4/2009",
            //       target_time_from_production_initiated: "qerty",
            //       target_time_from_qc_initiated: "uio",
            //       finulent_status: "Project in Queue",
            //       number_of_roofs: "2",
            //       code: "58",
            //       state: "indore",
            //       s_no: 1,
            //       file_completed: "",
            //       client_revision_reason: "",
            //       internal_comments: "",
            //       file_link: "",
            //       priority: "",
            //       production_assigned_date_time: "",
            //       production_initiated: "",
            //       production_sent_for_qc: "",
            //       duration_of_production: "",
            //       qc_initiated: "",
            //       file_sent_for_corrections: "",
            //       revised_file_sent_for_qc: "",
            //       solar_files_overdue_for_production: "",
            //       design_corrections_initiated: "",
            //       external_errors: "",
            //       lag_between_design_corrections_initiated_and_revised_file_sent_for_qc:
            //         "",
            //       lag_between_production_sent_for_qc_and_qc_initiated: "",
            //       new_test: "",
            //     },
            //     {
            //       id: 7,
            //       designer: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qc_id: "146",
            //       internal_qa_id: "146",
            //       internal_qc: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qa: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       comments: "",
            //       attachments: [],
            //       comment_count: 0,
            //       attachment_count: 0,
            //       date: "1/4/2009",
            //       site_name: "raktec221",
            //       project_id: "774",
            //       project_name: "sdfd",
            //       side_elevation: "tert",
            //       no_of_roofs: "yyds",
            //       dropdown: "fdgfd",
            //       testing: "fvhsdgf",
            //       ahj: "dfds",
            //       utility: "7r7",
            //       solar_type: "1",
            //       site_id: "si11",
            //       bu_id: "u22",
            //       jurisdiction: "avc",
            //       photosim: "ty",
            //       photosim_by: "we",
            //       site_type: "ty",
            //       type: "tyi",
            //       internal_errors: "45",
            //       target_production_start_date: "1/4/2009",
            //       target_time_from_production_initiated: "qerty",
            //       target_time_from_qc_initiated: "uio",
            //       finulent_status: "Project in Queue",
            //       number_of_roofs: "2",
            //       code: "58",
            //       state: "indore",
            //       s_no: 1,
            //       file_completed: "",
            //       client_revision_reason: "",
            //       internal_comments: "",
            //       file_link: "",
            //       priority: "",
            //       production_assigned_date_time: "",
            //       production_initiated: "",
            //       production_sent_for_qc: "",
            //       duration_of_production: "",
            //       qc_initiated: "",
            //       file_sent_for_corrections: "",
            //       revised_file_sent_for_qc: "",
            //       solar_files_overdue_for_production: "",
            //       design_corrections_initiated: "",
            //       external_errors: "",
            //       lag_between_design_corrections_initiated_and_revised_file_sent_for_qc:
            //         "",
            //       lag_between_production_sent_for_qc_and_qc_initiated: "",
            //       new_test: "",
            //     },
            //     {
            //       id: 7,
            //       designer: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qc_id: "146",
            //       internal_qa_id: "146",
            //       internal_qc: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       internal_qa: {
            //         id: "146",
            //         type: "account",
            //         attributes: {
            //           first_name: "Amarjeet",
            //           last_name: "Kaur",
            //           email: "amarjeet.kaur@builder.ai",
            //           full_phone_number: "12345678",
            //           phone_number: null,
            //           description: null,
            //           role_id: "Designer/QC/QA",
            //           date_of_birth: "2022-11-09",
            //           country_code: null,
            //           status: "Approved",
            //           approved_by: null,
            //           approved_datetime: null,
            //           type: "EmailAccount",
            //           joining_date: "Tue Nov 08 2022 10:52:00 GMT+0530",
            //           activation_status: "true",
            //           created_at: "2022-11-22T05:21:42.523Z",
            //           updated_at: "2022-11-22T05:22:37.921Z",
            //           device_id: null,
            //           activated: false,
            //           unique_auth_id: null,
            //           fcm_token: [
            //             "cFG_bSh1ygtynR1IsGs24M:APA91bFoAZCzTkervF5a04DxR-lvLoSS9h-fIB5muLUGZE1ubnwWw0vy5S0WG_n7YsVlOYYtn3bvybRj6JHLR0x1jWCd1_yEGYzURyRfJmn0O69_tYO0DrjrjyIbCodtQVfZWZF1mn6C",
            //           ],
            //           designation: "Designer",
            //           image: null,
            //           workspace: {
            //             id: 3,
            //             name: "Firesaftey",
            //             description: "workspace1",
            //             created_at: "2022-11-03T03:59:45.470Z",
            //             updated_at: "2022-11-28T09:20:50.405Z",
            //             project_code: ["1", "2", "kkk", "6"],
            //           },
            //         },
            //       },
            //       comments: "",
            //       attachments: [],
            //       comment_count: 0,
            //       attachment_count: 0,
            //       date: "1/4/2009",
            //       site_name: "raktec221",
            //       project_id: "774",
            //       project_name: "sdfd",
            //       side_elevation: "tert",
            //       no_of_roofs: "yyds",
            //       dropdown: "fdgfd",
            //       testing: "fvhsdgf",
            //       ahj: "dfds",
            //       utility: "7r7",
            //       solar_type: "1",
            //       site_id: "si11",
            //       bu_id: "u22",
            //       jurisdiction: "avc",
            //       photosim: "ty",
            //       photosim_by: "we",
            //       site_type: "ty",
            //       type: "tyi",
            //       internal_errors: "45",
            //       target_production_start_date: "1/4/2009",
            //       target_time_from_production_initiated: "qerty",
            //       target_time_from_qc_initiated: "uio",
            //       finulent_status: "Project in Queue",
            //       number_of_roofs: "2",
            //       code: "58",
            //       state: "indore",
            //       s_no: 1,
            //       file_completed: "",
            //       client_revision_reason: "",
            //       internal_comments: "",
            //       file_link: "",
            //       priority: "",
            //       production_assigned_date_time: "",
            //       production_initiated: "",
            //       production_sent_for_qc: "",
            //       duration_of_production: "",
            //       qc_initiated: "",
            //       file_sent_for_corrections: "",
            //       revised_file_sent_for_qc: "",
            //       solar_files_overdue_for_production: "",
            //       design_corrections_initiated: "",
            //       external_errors: "",
            //       lag_between_design_corrections_initiated_and_revised_file_sent_for_qc:
            //         "",
            //       lag_between_production_sent_for_qc_and_qc_initiated: "",
            //       new_test: "",
            //     },
            //   ],
            // };

            // let nRes = {
            //   Draft: [
            //     {
            //       id: 1,
            //       from_date: "2000-01-01",
            //       to_date: "2006-02-01",
            //       define_invoice_id: 1,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "41.58",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T07:41:55.558Z",
            //       updated_at: "2023-01-03T07:41:55.558Z",
            //       client_id: 1,
            //       invoice_id: "FS LLP/22-23/207",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 2,
            //       from_date: "2000-01-01",
            //       to_date: "2006-02-01",
            //       define_invoice_id: 1,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "41.58",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T08:56:03.596Z",
            //       updated_at: "2023-01-03T08:56:03.596Z",
            //       client_id: 1,
            //       invoice_id: "FS LLP/22-23/934",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 3,
            //       from_date: "2000-01-01",
            //       to_date: "2006-02-01",
            //       define_invoice_id: 1,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "0.0",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T09:54:21.610Z",
            //       updated_at: "2023-01-03T09:54:21.610Z",
            //       client_id: 1,
            //       invoice_id: "FS LLP/22-23/878",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 4,
            //       from_date: "2000-01-01",
            //       to_date: "2006-02-01",
            //       define_invoice_id: 1,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "0.0",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T14:02:58.779Z",
            //       updated_at: "2023-01-03T14:02:58.779Z",
            //       client_id: 1,
            //       invoice_id: "FS LLP/22-23/874",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 5,
            //       from_date: "2000-01-01",
            //       to_date: "2006-02-01",
            //       define_invoice_id: 1,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "0.0",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T14:07:49.867Z",
            //       updated_at: "2023-01-03T14:07:49.867Z",
            //       client_id: 1,
            //       invoice_id: "FS LLP/22-23/455",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 6,
            //       from_date: "2000-01-01",
            //       to_date: "2006-02-01",
            //       define_invoice_id: 1,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "0.0",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T14:08:06.201Z",
            //       updated_at: "2023-01-03T14:08:06.201Z",
            //       client_id: 1,
            //       invoice_id: "FS LLP/22-23/217",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 7,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "37.8",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T16:10:32.903Z",
            //       updated_at: "2023-01-03T16:10:32.903Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/436",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 8,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "31.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T16:29:11.952Z",
            //       updated_at: "2023-01-03T16:29:11.952Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/457",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 9,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "31.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-03T16:30:53.071Z",
            //       updated_at: "2023-01-03T16:30:53.071Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/487",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 10,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "31.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T04:51:14.696Z",
            //       updated_at: "2023-01-04T04:51:14.696Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/444",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 11,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "31.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T05:06:37.314Z",
            //       updated_at: "2023-01-04T05:06:37.314Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/963",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 12,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "0.0",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T05:08:41.867Z",
            //       updated_at: "2023-01-04T05:08:41.867Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/556",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 13,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "31.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T05:26:00.383Z",
            //       updated_at: "2023-01-04T05:26:00.383Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/839",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 14,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "31.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T05:35:57.520Z",
            //       updated_at: "2023-01-04T05:35:57.520Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/572",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 15,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "147.4",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T05:45:50.265Z",
            //       updated_at: "2023-01-04T05:45:50.265Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/654",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 16,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "73.7",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T07:44:06.895Z",
            //       updated_at: "2023-01-04T07:44:06.895Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/382",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 17,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "73.7",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T07:47:03.445Z",
            //       updated_at: "2023-01-04T07:47:03.445Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/710",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 18,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "73.7",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T07:49:43.573Z",
            //       updated_at: "2023-01-04T07:49:43.573Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/744",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 19,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "73.7",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T07:52:19.032Z",
            //       updated_at: "2023-01-04T07:52:19.032Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/4",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 20,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "40.2",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T08:23:59.849Z",
            //       updated_at: "2023-01-04T08:23:59.849Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/318",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 21,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "40.2",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T08:26:16.555Z",
            //       updated_at: "2023-01-04T08:26:16.555Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/419",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 22,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "33.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T08:30:06.583Z",
            //       updated_at: "2023-01-04T08:30:06.583Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/842",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 23,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "33.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T08:31:49.409Z",
            //       updated_at: "2023-01-04T08:31:49.409Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/782",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 25,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "33.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T10:29:30.301Z",
            //       updated_at: "2023-01-04T10:29:30.301Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/768",
            //       workspace_id: null,
            //     },
            //     {
            //       id: 26,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "33.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T10:33:44.625Z",
            //       updated_at: "2023-01-04T10:33:44.639Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/567",
            //       workspace_id: 2,
            //     },
            //   ],
            //   Sent: [
            //     {
            //       id: 28,
            //       from_date: "2000-01-01",
            //       to_date: "2022-02-01",
            //       define_invoice_id: 2,
            //       overdue_date: "2022-02-02",
            //       invoice_amount: "33.5",
            //       finulent_admin: 2,
            //       invoice_status: "Draft",
            //       created_at: "2023-01-04T10:33:44.625Z",
            //       updated_at: "2023-01-04T10:33:44.639Z",
            //       client_id: 2,
            //       invoice_id: "FS LLP/22-23/567",
            //       workspace_id: 2,
            //     },
            //   ],
            //   Approved_by_client: [],
            //   Partially_paid: [],
            //   Fully_paid: [],
            //   Overdue: [],
            //   Write_Off: [],
            // };
            // this.setState({ projects: { ...nRes } });
            return true;
          case this.allColorApiCallId:
            this.setState({ projectStatusColors: { ...responseJson } });
            this.setState({ loader: false });
            break;

          case this.allClientDropDownId:
            return this.setState({ clientDropDown: [...responseJson] });

          case this.selectedProjectApiId:
            this.setState({ projects: { ...responseJson } });
            this.setState({ loader: false });
            break;
          case this.getAllprojectsApiCallId:
            console.log("RSS", responseJson[0]);
            this.setState({
              projects: responseJson[0],
            });
            return true;
            case this.getProjectsWithFilterApiCallId:
              console.log("RSS", responseJson[0]);
              this.setState({
                projects: responseJson[0],
                filterOpen:null
              });
              return true;  
          case this.getAllWorkspaceApiCallId:
            console.log("RESPONSE", responseJson);
            this.setState({ workspaceData: responseJson.data });
            return true;
            case this.getAllClientsApiCallId:
              console.log("RESPONSE", responseJson);
              this.setState({ clientsData: responseJson.data });
              return true;  
          default:
            break;
        }
      } else {
        this.setState({ loader: false });
      }
    }
    // Customizable Area End

    // Customizable Area Start

    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  getAllProjectData = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.allColorApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allProjectColorApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  getAllStatusColor = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.allProjectApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allProjectApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  getAllClientDropDown = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.allClientDropDownId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allClientDropDownApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  getSelectedProjects = (
    client_id: string,
    client_type: string,
    value: string
  ) => {
    const clientDropDownOption =
      value !== "All"
        ? `?client_id=${client_id}&client_type=${client_type}`
        : ``;
    console.log("clientDropDownOption", clientDropDownOption);
    const selectedProjectsApi = `/bx_block_kanbanboard/kanbanboard${clientDropDownOption}`;
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.selectedProjectApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      selectedProjectsApi
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.typeForGetMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };

  async componentDidMount() {
    this.getAllProjectData();
    this.getAllStatusColor();
    this.getAllClientDropDown();
    this.getAllInvoices();
    this.getAllWorkspace();
    this.getAllClientsData()
  }

  handleClientChange = (e: any) => {
    this.setState({ selectedClient: e.target.value });
    this.setState({ loader: true });
    if (e.target.value !== "All") {
      const obj = JSON.parse(e.target.value);
      this.getSelectedProjects(obj.client_id, obj.client_type, e.target.value);
    } else {
      this.getSelectedProjects("", "", e.target.value);
    }
  };

  getAllInvoices = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllprojectsApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/invoice_dashboard/invoice_list_dashborad"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };
  getAllWorkspace = () => {
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllWorkspaceApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_workspace_management/workspaces"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };
  getApply = () => {
    // Customizable Area Start
    
    let URL = `bx_block_invoicebilling/invoice_dashboard/invoice_list_dashborad?`;
    if (this.state.workspace_id) {
      URL = URL + `&workspace_id=${this.state.workspace_id}`;
    }
    if (this.state.modalFromDate) {
      URL =
        URL +
        `&from_date=${moment(this.state.modalFromDate).format("YYYY-MM-DD")}`;
    }

    if (this.state.modalToDate) {
      URL =
        URL + `&to_date=${moment(this.state.modalToDate).format("YYYY-MM-DD")}`;
    }

    const header = {
      token: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProjectsWithFilterApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      URL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  };
  handleChangeWorkspaceandClientSearch = (event: any, type: any) => {
    console.log("VVVVAl",event.target.value)
    type == "dropDown" && this.handleChangeWorkspace(event);
  };
  handleChangeWorkspace = (event: any) => {
    console.log("EVE",event)
    const {
      target: { value },
    } = event;
    console.log("VVVV",value)
    if (value[value.length - 1] === "all") {
      this.setState({
        selectedClientsName:
          this.state.selectedClientsName.length ===
          this.state.clientsData.length
            ? []
            : this.state.clientsData,
      });
      
      return;
    }
    else{
      this.setState({ selectedClientsName: value});

    }

    
  };
  getAllClientsData=()=>{
    const header = {
      token: localStorage.getItem("token"),
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllClientsApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_invoicebilling/invoice_dashboard/list_client"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }
  handleReset=()=>{
    this.getAllInvoices();
    this.setState({modalFromDate:"",modalToDate:"",selectedClientsName:[],workspace_id:"",filterToDateError:false})
  }


  // Customizable Area End
}
