// App.js - WEB
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import WebRoutesGenerator from '../../components/src/NativeWebRouteWrapper';
import { ModalContainer } from 'react-router-modal';
import HomeScreen from '../../components/src/HomeScreen';
import TopNav from '../../components/src/TopNav';

import InfoPage from '../../blocks/info-page/src/InfoPageBlock';
import AlertBlock from '../../blocks/alert/src/AlertBlock.web';
import TaskAllocator from '../../blocks/TaskAllocator/src/TaskAllocator';
import MobileAccountLoginBlock from '../../blocks/mobile-account-login/src/MobileAccountLoginBlock';
import AdvancedSearch from '../../blocks/advancedsearch/src/AdvancedSearch';
import Download from '../../blocks/Download/src/Download';
import ProjecttaskTracking2 from '../../blocks/ProjecttaskTracking2/src/ProjecttaskTracking2';
import OTPInputAuth from '../../blocks/otp-input-confirmation/src/OTPInputAuth';
import RolesPermissions2 from '../../blocks/RolesPermissions2/src/RolesPermissions2';
import InvoiceBilling from '../../blocks/InvoiceBilling/src/InvoiceBilling';
import StatusOfInvoices from '../../blocks/StatusOfInvoices/src/StatusOfInvoices';
import PeopleManagement2 from '../../blocks/PeopleManagement2/src/PeopleManagement2';
import Customform from '../../blocks/customform/src/Customform';
import GroupChat from '../../blocks/GroupChat/src/GroupChat';
import ForgotPassword from '../../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../../blocks/forgot-password/src/NewPassword';
import DynamicContent from '../../blocks/DynamicContent/src/DynamicContent';
import Analytics from '../../blocks/analytics/src/Analytics';
import Filteritems from '../../blocks/filteritems/src/Filteritems';
import Filteroptions from '../../blocks/filteritems/src/Filteroptions';
import IntegrationWithExistingHrmsPlatform from '../../blocks/IntegrationWithExistingHrmsPlatform/src/IntegrationWithExistingHrmsPlatform';
import AdminConsole3 from '../../blocks/AdminConsole3/src/AdminConsole3';
import KanbanBoard from '../../blocks/KanbanBoard/src/KanbanBoard';
import UserProfileBasicBlock from '../../blocks/user-profile-basic/src/UserProfileBasicBlock';
import BulkUploading from '../../blocks/BulkUploading/src/BulkUploading';
import IntegrationFor3rdPartyChat from '../../blocks/IntegrationFor3rdPartyChat/src/IntegrationFor3rdPartyChat';
import ContentManagement from '../../blocks/ContentManagement/src/ContentManagement';
import CountryCodeSelector from '../../blocks/country-code-selector/src/CountryCodeSelector';
import ReviewAndApproval from '../../blocks/ReviewAndApproval/src/ReviewAndApproval';
import UploadMedia2 from '../../blocks/UploadMedia2/src/UploadMedia2';
import EditInvoices from '../../blocks/EditInvoices/src/EditInvoices';
import PhoneNumberInput from '../../blocks/mobile-account-registration/src/PhoneNumberInput';
import AdditionalDetailForm from '../../blocks/mobile-account-registration/src/AdditionalDetailForm';
import SocialMediaAccountRegistrationScreen from '../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen';
import Catalogue from '../../blocks/catalogue/src/Catalogue';
import Chat9 from '../../blocks/Chat9/src/Chat9';
import EmailAccountRegistration from '../../blocks/email-account-registration/src/EmailAccountRegistration';
import Timestamp from '../../blocks/Timestamp/src/Timestamp';
import Dashboard from '../../blocks/dashboard/src/Dashboard';
import EmailAccountLoginBlock from '../../blocks/email-account-login/src/EmailAccountLoginBlock';
import EmailNotifications from '../../blocks/EmailNotifications/src/EmailNotifications';
import CfAdditionalRoleSupport5 from '../../blocks/CfAdditionalRoleSupport5/src/CfAdditionalRoleSupport5';
import CfAutosuggestionAutoSave5 from '../../blocks/CfAutosuggestionAutoSave5/src/CfAutosuggestionAutoSave5';
import Documentation from '../../blocks/Documentation/src/Documentation';
import CfChecklistDefinition4 from '../../blocks/CfChecklistDefinition4/src/CfChecklistDefinition4';
import DataImportexportcsv from '../../blocks/DataImportexportcsv/src/DataImportexportcsv';
import CfCustomizableFilterConditions4 from '../../blocks/CfCustomizableFilterConditions4/src/CfCustomizableFilterConditions4';
import Mentionstagging from '../../blocks/Mentionstagging/src/Mentionstagging';
import ProjectTemplates from '../../blocks/ProjectTemplates/src/ProjectTemplates';
import Pagination2 from '../../blocks/Pagination2/src/Pagination2';
import Pushnotifications from '../../blocks/pushnotifications/src/Pushnotifications';
import Notifications from '../../blocks/notifications/src/Notifications';
import PostCreation from '../../blocks/postcreation/src/PostCreation';
import Posts from '../../blocks/postcreation/src/Posts';
import PostDetails from '../../blocks/postcreation/src/PostDetails';
import CfCustomizedVisualAnalytics4 from '../../blocks/CfCustomizedVisualAnalytics4/src/CfCustomizedVisualAnalytics4';
import AuditTrail from '../../blocks/AuditTrail/src/AuditTrail';
import Scheduling from '../../blocks/scheduling/src/Scheduling';
import Categoriessubcategories from '../../blocks/categoriessubcategories/src/Categoriessubcategories';
import CfColorCodeAutomation4 from '../../blocks/CfColorCodeAutomation4/src/CfColorCodeAutomation4';
import EducationalUserProfile from '../../blocks/educational-user-profile/src/EducationalUserProfile';
import CreateComment from '../../blocks/comments/src/CreateComment';
import CfTaskTrackManagementBoard from '../../blocks/CfTaskTrackManagementBoard/src/CfTaskTrackManagementBoard';
import Signup from '../../blocks/dashboard/src/Signup.web';
import Sidebar from '../../blocks/dashboard/src/Sidebar.web';
import UserManagement from '../../blocks/ContentManagement/src/UserManagement.web';
import EmailAccountLoginsBlock from '../../blocks/email-account-login/src/EmailAccountLoginsBlock.web';
import ForgotPasswords from '../../blocks/forgot-password/src/ForgotPasswords.web';
import ForgotPasswordOTPs from '../../blocks/forgot-password/src/ForgotPasswordOTPs.web';
import NewPasswords from '../../blocks/forgot-password/src/NewPasswords.web';
import Generic from '../../blocks/ContentManagement/src/GenericModal.web';
// import Side from "../../blocks/dashboard/src/Side.web"
import UserRequest from '../../blocks/ContentManagement/src/UserRequest.web';

import UserProfileBlock from '../../blocks/user-profile-basic/src/UserProfileBlock.web';
import UserProfileEditBlock from '../../blocks/user-profile-basic/src/UserProfileEditBlock.web';
import ChangePassword from '../../blocks/user-profile-basic/src/ChangePassword.web';
import WorkspaceManagement from '../../blocks/PeopleManagement2/src/WorkspaceManagement.web';
import ClientManagement from '../../blocks/PeopleManagement2/src/ClientManagement.web';
import RolesPermissions from '../../blocks/RolesPermissions2/src/RolePermissions.web';
import SidebarOther from '../../blocks/dashboard/src/SidebarOther.web';
import ClientManagementSubFolders from '../../blocks/PeopleManagement2/src/ClientManagementSubFolders.web';
import TermsandCondition from '../../blocks/RolesPermissions2/src/TermsandCondition.web';
import Designation from '../../blocks/RolesPermissions2/src/Designation.web';
import AdminUserRequest from '../../blocks/ContentManagement/src/AdminUserRequest.web';
import AdminUserManagement from '../../blocks/ContentManagement/src/AdminUserManagement.web';
import ProjectTemplateDesign from '../../blocks/ProjectTemplates/src/ProjectTemplateDesign.web';
import InvoiceContent from '../../blocks/RolesPermissions2/src/InvoiceContent.web';
import AdminClientManagement from '../../blocks/AdminConsole3/src/AdminClientManagemnet.web';
import TLClientManagement from '../../blocks/AdminConsole3/src/TLClientManagement.web';
import ProjectType from '../../blocks/Pagination2/src/ProjectType.web';
import FirebaseNotification from './Notification';
import ProjectCode from '../../blocks/Pagination2/src/ProjectCode.web';
import AutoSuggestion from '../../blocks/Pagination2/src/AutoSuggestion.web';
import InAppNotification from '../../blocks/notifications/src/InAppNotification.web';

import DefineChecklistDesign from '../../blocks/ProjectTemplates/src/DefineChecklistDesign.web';
import DefineChecklistTable from '../../blocks/ProjectTemplates/src/DefineChecklistTable.web';

import AdminClientSubfolder from '../../blocks/AdminConsole3/src/AdminClientSubfolder.web';
import AdminClientManagementSubfolders from '../../blocks/AdminConsole3/src/AdminClientManagementSubFolders.web';
import EditTemplateDesign from '../../blocks/ProjectTemplates/src/EditTemplateDesign.web';
import EditTemplateDetailInfo from '../../blocks/ProjectTemplates/src/EditTemplateDetailInfo.web';
import AdminSubfolderManagement from '../../blocks/ProjectTemplates/src/AdminSubfolderManagement.web';
import ManagerViewEditChecklist from '../../blocks/ProjectTemplates/src/ManagerViewEditChecklist.web';
import TemplateDetails from '../../blocks/ProjectTemplates/src/TemplateDetails.web';
import ProjectTemplateTable from '../../blocks/ProjectTemplates/src/ProjectTemplateTable.web';
import Taskboard from "../../blocks/KanbanBoard/src/Taskboard.web";
import ProjectStatus from "../../blocks/KanbanBoard/src/ProjectStatus.web";
import ClientManagementNew from '../../blocks/AdminConsole3/src/ClientManagement.web';
import ClientSubFolder from '../../blocks/AdminConsole3/src/ClientSubfolder.web';

import WorkspaceManagament from "../../blocks/AdminConsole3/src/WorkspaceManagement.web";
import Reporting from "../../blocks/IntegrationWithExistingHrmsPlatform/src/Reporting.web"
import LeaveReport from "../../blocks/IntegrationWithExistingHrmsPlatform/src/LeaveReport.web"
import InvoicesDashboard from "../../blocks/StatusOfInvoices/src/InvoicesDashboard.web"
import PartiallyPaidInvoices from "../../blocks/StatusOfInvoices/src/PartiallyPaidInvoices.web"
import ClientInvoice from "../../blocks/StatusOfInvoices/src/ClientInvoice.web"
import GenericInvoice from "../../blocks/StatusOfInvoices/src/GenericInvoice.web"
import ClientSubfolderSuperadmin from '../../blocks/AdminConsole3/src/ClientSubfolderSuperadmin.web';
import ClientInvoicesSuperadmin from '../../blocks/AdminConsole3/src/ClientInvoicesSuperadmin.web';
import GenricInvoiceClientSuperadmin from '../../blocks/AdminConsole3/src/GenricInvoiceClientSuperadmin.web';
// import firbase from "./firebase"

const routeMap = {
  CfTaskTrackManagementBoard: {
    component: CfTaskTrackManagementBoard,
    path: '/CfTaskTrackManagementBoard'
  },

  CfAdditionalRoleSupport5: {
    component: CfAdditionalRoleSupport5,
    path: '/CfAdditionalRoleSupport5'
  },
  CfAutosuggestionAutoSave5: {
    component: CfAutosuggestionAutoSave5,
    path: '/CfAutosuggestionAutoSave5'
  },
  Documentation: {
    component: Documentation,
    path: '/Documentation'
  },
  CfChecklistDefinition4: {
    component: CfChecklistDefinition4,
    path: '/CfChecklistDefinition4'
  },
  DataImportexportcsv: {
    component: DataImportexportcsv,
    path: '/DataImportexportcsv'
  },
  CfCustomizableFilterConditions4: {
    component: CfCustomizableFilterConditions4,
    path: '/CfCustomizableFilterConditions4'
  },
  Mentionstagging: {
    component: Mentionstagging,
    path: '/Mentionstagging'
  },
  ProjectTemplates: {
    component: ProjectTemplates,
    path: '/ProjectTemplates'
  },
  Pagination2: {
    component: Pagination2,
    path: '/Pagination2'
  },
  ProjectType: {
    component: ProjectType,
    path: '/ProjectType',
    user_type: ['Superadmin']
  },
  AutoSuggestion: {
    component: AutoSuggestion,
    path: '/AutoSuggestion',
    user_type: ['Superadmin']
  },
  Pushnotifications: {
    component: Pushnotifications,
    path: '/Pushnotifications'
  },
  Notifications: {
    component: Notifications,
    path: '/Notifications'
  },
  InAppNotification: {
    component: InAppNotification,
    path: '/InAppNotification'
  },
  PostCreation: {
    component: PostCreation,
    path: '/PostCreation'
  },
  Posts: {
    component: Posts,
    path: '/Posts'
  },
  PostDetails: {
    component: PostDetails,
    path: '/PostDetails'
  },
  CfCustomizedVisualAnalytics4: {
    component: CfCustomizedVisualAnalytics4,
    path: '/CfCustomizedVisualAnalytics4'
  },
  AuditTrail: {
    component: AuditTrail,
    path: '/AuditTrail'
  },
  Scheduling: {
    component: Scheduling,
    path: '/Scheduling'
  },
  Categoriessubcategories: {
    component: Categoriessubcategories,
    path: '/Categoriessubcategories'
  },
  CfColorCodeAutomation4: {
    component: CfColorCodeAutomation4,
    path: '/CfColorCodeAutomation4'
  },
  EducationalUserProfile: {
    component: EducationalUserProfile,
    path: '/EducationalUserProfile'
  },
  InvoiceContent: {
    component: InvoiceContent,
    path: '/InvoiceContent',
    user_type: ['Superadmin']
  },
  ProjectCode: {
    component: ProjectCode,
    path: '/ProjectCode',
    user_type: ['Superadmin']
  },
  Comment: {
    component: Comment,
    path: '/Comment'
  },
  CreateComment: {
    component: CreateComment,
    path: '/CreateComment'
  },

  TaskAllocator: {
    component: TaskAllocator,
    path: '/TaskAllocator'
  },
  MobileAccountLoginBlock: {
    component: MobileAccountLoginBlock,
    path: '/MobileAccountLoginBlock'
  },
  AdvancedSearch: {
    component: AdvancedSearch,
    path: '/AdvancedSearch'
  },
  Download: {
    component: Download,
    path: '/Download'
  },
  ProjecttaskTracking2: {
    component: ProjecttaskTracking2,
    path: '/ProjecttaskTracking2'
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: '/OTPInputAuth'
  },
  RolesPermissions2: {
    component: RolesPermissions2,
    path: '/RolesPermissions2'
  },
  InvoiceBilling: {
    component: InvoiceBilling,
    path: '/InvoiceBilling'
  },
  StatusOfInvoices: {
    component: StatusOfInvoices,
    path: '/StatusOfInvoices'
  },
  PeopleManagement2: {
    component: PeopleManagement2,
    path: '/PeopleManagement2'
  },
  TermsandCondition: {
    component: TermsandCondition,
    path: '/TermsandCondition',
    user_type: ['Superadmin']
  },
  Designation: {
    component: Designation,
    path: '/Designation',
    user_type: ['Superadmin']
  },

  WorkspaceManagement: {
    component: WorkspaceManagement,
    path: '/workspaces',
    user_type: ['Superadmin']
  },
  ClientManagement: {
    component: ClientManagement,
    path: '/client',
    user_type: ['Superadmin']
  },
  ClientManagementSubFolders: {
    component: ClientManagementSubFolders,
    path: '/clientfolders',
    user_type: ['Superadmin']
  },
  Customform: {
    component: Customform,
    path: '/Customform'
  },
  GroupChat: {
    component: GroupChat,
    path: '/GroupChat'
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: '/ForgotPassword',
    user_type: ['public']
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: '/ForgotPasswordOTP',
    user_type: ['public']
  },
  NewPassword: {
    component: NewPassword,
    path: '/NewPassword',
    user_type: ['public']
  },
  DynamicContent: {
    component: DynamicContent,
    path: '/DynamicContent'
  },
  Analytics: {
    component: Analytics,
    path: '/Analytics'
  },
  Filteritems: {
    component: Filteritems,
    path: '/Filteritems'
  },
  Filteroptions: {
    component: Filteroptions,
    path: '/Filteroptions'
  },
  IntegrationWithExistingHrmsPlatform: {
    component: IntegrationWithExistingHrmsPlatform,
    path: '/IntegrationWithExistingHrmsPlatform'
  },
  AdminConsole3: {
    component: AdminConsole3,
    path: '/AdminConsole3'
  },
  KanbanBoard: {
    component: KanbanBoard,
    path: '/KanbanBoard'
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: '/UserProfileBasicBlock',
    user_type: ['Superadmin']
  },
  BulkUploading: {
    component: BulkUploading,
    path: '/BulkUploading'
  },
  IntegrationFor3rdPartyChat: {
    component: IntegrationFor3rdPartyChat,
    path: '/IntegrationFor3rdPartyChat'
  },
  ContentManagement: {
    component: ContentManagement,
    path: '/ContentManagement'
  },
  RolesPermissions: {
    component: RolesPermissions,
    path: '/RolesPermission',
    user_type: ['Superadmin']
  },
  AdminUserRequest: {
    component: AdminUserRequest,
    path: '/AdminUserRequest',
    user_type: ['Admin']
  },
  AdminUserManagement: {
    component: AdminUserManagement,
    path: '/AdminUserManagement',
    user_type: ['Admin']
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: '/CountryCodeSelector'
  },
  ReviewAndApproval: {
    component: ReviewAndApproval,
    path: '/ReviewAndApproval'
  },
  UploadMedia2: {
    component: UploadMedia2,
    path: '/UploadMedia2'
  },
  EditInvoices: {
    component: EditInvoices,
    path: '/EditInvoices'
  },
  PhoneNumberInput: {
    component: PhoneNumberInput,
    path: '/PhoneNumberInput'
  },
  AdditionalDetailForm: {
    component: AdditionalDetailForm,
    path: '/AdditionalDetailForm'
  },
  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: '/SocialMediaAccountRegistrationScreen'
  },
  Catalogue: {
    component: Catalogue,
    path: '/Catalogue'
  },
  Chat9: {
    component: Chat9,
    path: '/Chat9'
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: '/EmailAccountRegistration',
    user_type: ['public']
  },
  Timestamp: {
    component: Timestamp,
    path: '/Timestamp'
  },
  Dashboard: {
    component: Dashboard,
    path: '/Dashboard'
  },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: '/EmailAccountLoginBlock',
    user_type: ['public']
  },
  EmailNotifications: {
    component: EmailNotifications,
    path: '/EmailNotifications'
  },
  Signup: {
    component: Signup,
    path: '/signup',
    user_type: ['public']
  },
  //  Sidebar:{
  //   component:Sidebar,
  //  path:"/sidebar"
  //  },
  UserManagement: {
    component: UserManagement,
    path: '/UserManagement',
    user_type: ['Superadmin']
  },
  UserRequest: {
    component: UserRequest,
    path: '/UserRequest',
    user_type: ['Superadmin']
  },
  //  Side:{
  //   component:Side,
  //   path:"/side"
  //  },

  Home: {
    component: Signup,
    path: '/',
    exact: true
  },
  Generic: {
    component: Generic,
    path: '/generic'
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: '*/AlertWeb',
    modal: true
  },

  EmailAccountLoginsBlock: {
    component: EmailAccountLoginsBlock,
    path: '/EmailAccountLoginsBlock',
    user_type: ['public']
  },

  ForgotPasswords: {
    component: ForgotPasswords,
    path: '/ForgotPasswords',
    user_type: ['public']
  },

  ForgotPasswordOTPs: {
    component: ForgotPasswordOTPs,
    path: '/ForgotPasswordOTPs',
    user_type: ['public']
  },

  NewPasswords: {
    component: NewPasswords,
    path: '/NewPasswords',
    user_type: ['public']
  },

  UserProfileBlock: {
    component: UserProfileBlock,
    path: '/userprofile',
    user_type: ['Superadmin', 'Admin', 'Designer/QC/QA', 'TL/Manager']
  },

  UserProfileEditBlock: {
    component: UserProfileEditBlock,
    path: '/profileupdate',
    user_type: ['Superadmin', 'Admin', 'Designer/QC/QA', 'TL/Manager']
  },

  ChangePassword: {
    component: ChangePassword,
    path: '/changepassword',
    user_type: ['Superadmin', 'Admin', 'Designer/QC/QA', 'TL/Manager']
  },

  ProjectTemplateDesign: {
    component: ProjectTemplateDesign,
    path: '/template',
    user_type: ['Superadmin','Admin']
  },
  AdminSubfolderManagement: {
    component: AdminSubfolderManagement,
    path: '/reviewChecklist',
    user_type: ['Superadmin', 'Admin']
  },
  EditTemplateDesign: {
    component: EditTemplateDesign,
    path: '/edittemplate',
    user_type: ['Superadmin','Admin']
  },
  EditTemplateDetailInfo: {
    component: EditTemplateDetailInfo,
    path: '/edittemplatedetailinfo',
    user_type: ['Superadmin','Admin']
  },
  Reporting: {
    component: Reporting,
    path: '/reporting',
    user_type: ['Superadmin','Admin']
  },  
  LeaveReport: {
    component: LeaveReport,
    path: '/leaveReport',
    user_type: ['Superadmin','Admin']
  }, 
  InvoicesDashboard: {
    component: InvoicesDashboard,
    path: '/invoicesDashboard',
    user_type: ['Superadmin','Admin']
  }, 
  PartiallyPaidInvoices:{
    component: PartiallyPaidInvoices,
    path: '/partiallyPaidInvoices',
    user_type: ['Superadmin','Admin']
  },
  ClientInvoice:{
    component: ClientInvoice,
    path: '/ClientInvoice',
    user_type: ['Superadmin','Admin']
  },
  GenericInvoice:{
    component: GenericInvoice,
    path: '/genericInvoice',
    user_type: ['Superadmin','Admin']
  },
  TemplateDetails: {
    component: TemplateDetails,
    path: '/templateDetails',
    user_type: ['Superadmin','Admin']
  },

  DefineChecklistDesign: {
    component: DefineChecklistDesign,
    path: '/definechecklist',
    user_type: ['Superadmin','Admin']
  },

  DefineChecklistTable: {
    component: DefineChecklistTable,
    path: '/definechecktable',
    user_type: ['Superadmin','Admin']
  },

  ProjectTemplateTable:{
    component:ProjectTemplateTable,
    path:'/projectlist',
    user_type:['Superadmin','Admin']
  },

  AdminClientManagement: {
    component: AdminClientManagement,
    path: '/clientmanagement',
    user_type: ['Admin']
  },

  TLClientManagement: {
    component: TLClientManagement,
    path: '/clientmanage',
    user_type: ['TL/Manager']
  },

  AdminClientSubfolder: {
    component: AdminClientSubfolder,
    path: '/subfolder',
    user_type: ['Admin']
  },

  AdminClientManagementSubfolders: {
    component: AdminClientManagementSubfolders,
    path: '/clientsubfolders',
    user_type: ['Admin']
  },
  ManagerViewEditChecklist: {
    component: ManagerViewEditChecklist,
    path: '/managereditchecklist',
    user_type: ['TL/Manager']
  },
  Taskboard:{
    component: Taskboard,
    path: '/taskboard',
    user_type: ['Admin','TL/Manager','Designer/QC/QA']
  },

  TaskStatus:{
    component: ProjectStatus,
    path: '/projectStatus',
    user_type: ['Admin','TL/Manager','Designer/QC/QA']
  },

  ClientManagement1:{
    component : ClientManagementNew,
    path: '/clients',
    user_type:['Superadmin'],
  },
  ClientSubFolder:{
    component : ClientSubFolder,
    path: '/clientSubFolder1',
    user_type:['Superadmin'],
  },

  WorkspaceManagament:{
    component: WorkspaceManagament,
    path: "/workspacemanagement",
    user_type: ["Superadmin"]
  },


  ClientSubfolderSuperadmin: {
    component: ClientSubfolderSuperadmin,
    path: "/client_subfolder",
    user_type: ["Superadmin"]
  },

  ClientInvoicesSuperadmin: {
    component: ClientInvoicesSuperadmin,
    path: "/client_invoices_superadmin",
    user_type: ["Superadmin"]
  },
  GenricInvoiceClientSuperadmin: {
    component: GenricInvoiceClientSuperadmin,
    path: "/genricInvoiceClientSuperadmin",
    user_type: ["Superadmin"]
  }

  // SidebarOther: {
  //   component: SidebarOther,
  //   path: '/side'
  // }
};

// const firebaseAPI = firebase.initializeApp({
//   apiKey: 'AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4',
//   authDomain: 'rnmasterapp-c11e9.firebaseapp.com',
//   databaseURL: 'https://rnmasterapp-c11e9.firebaseio.com',
//   projectId: 'rnmasterapp-c11e9',
//   storageBucket: 'rnmasterapp-c11e9.appspot.com',
//   messagingSenderId: '649592030497',
//   appId: '1:649592030497:web:7728bee3f2baef208daa60',
//   measurementId: 'G-FYBCF3Z2W3'
// });

class App extends Component {
  // componentDidMount(){
  //    const  messaging =  firebase.messaging()
  //  messaging.requestPermission().then(()=>{
  //   console.log("App File")
  //      return messaging.getToken()
  //   }).then(token=>{

  //  localStorage.setItem('device_id',token)

  //   }).catch((err)=>{
  //     console.log('error', err)
  //   })
  // };
  render() {
    const isLoggedIn = localStorage.getItem('token');

    const role = localStorage.getItem('role_id');

    // const defaultAnalytics = firebaseAPI.analytics();
    // defaultAnalytics.logEvent('APP_Loaded');

    return (
      <>
        <FirebaseNotification />
        <View style={{ height: '100vh', width: '100vw' }}>
          {/* <TopNav /> */}
          {/* {isLoggedIn && <Sidebar />} */}
          {(isLoggedIn && role === 'Superadmin' && <Sidebar />) ||
            (isLoggedIn && <SidebarOther />)}
          {WebRoutesGenerator({ routeMap })}

          <ModalContainer />
        </View>
      </>
    );
  }
}

export default App;