const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/CfWorkspaceMappingAndLeaveReport3/src/'),
resolveApp('../blocks/ProjectTaskTracking/src/'),

resolveApp('../blocks/CfTaskTrackManagementBoard/src/'),

resolveApp('../blocks/comments/src/'),
resolveApp('../blocks/postcreation/src/'),
resolveApp('../blocks/categoriessubcategories/src/'),
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/notifications/src/'),
resolveApp('../blocks/utilities/src/'),
resolveApp('../blocks/educational-user-profile/src/'),
resolveApp('../blocks/scheduling/src/'),
resolveApp('../blocks/DataImportexportcsv/src/'),
resolveApp('../blocks/Documentation/src/'),
resolveApp('../blocks/Mentionstagging/src/'),
resolveApp('../blocks/ProjectTemplates/src/'),
resolveApp('../blocks/AuditTrail/src/'),
resolveApp('../blocks/Pagination2/src/'),
resolveApp('../blocks/CfCustomizedVisualAnalytics4/src/'),
resolveApp('../blocks/CfChecklistDefinition4/src/'),
resolveApp('../blocks/CfColorCodeAutomation4/src/'),
resolveApp('../blocks/CfCustomizableFilterConditions4/src/'),
resolveApp('../blocks/CfAutosuggestionAutoSave5/src/'),
resolveApp('../blocks/CfAdditionalRoleSupport5/src/'),

resolveApp('../blocks/mobile-account-login/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/dashboard/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/user-profile-basic/src/'),
resolveApp('../blocks/analytics/src/'),
resolveApp('../blocks/filteritems/src/'),
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/advancedsearch/src/'),
resolveApp('../blocks/mobile-account-registration/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/customform/src/'),
resolveApp('../blocks/ProjecttaskTracking2/src/'),
resolveApp('../blocks/BulkUploading/src/'),
resolveApp('../blocks/InvoiceBilling/src/'),
resolveApp('../blocks/KanbanBoard/src/'),
resolveApp('../blocks/ReviewAndApproval/src/'),
resolveApp('../blocks/AdminConsole3/src/'),
resolveApp('../blocks/RolesPermissions2/src/'),
resolveApp('../blocks/UploadMedia2/src/'),
resolveApp('../blocks/PeopleManagement2/src/'),
resolveApp('../blocks/Download/src/'),
resolveApp('../blocks/DynamicContent/src/'),
resolveApp('../blocks/EmailNotifications/src/'),
resolveApp('../blocks/GroupChat/src/'),
resolveApp('../blocks/TaskAllocator/src/'),
resolveApp('../blocks/Chat9/src/'),
resolveApp('../blocks/ContentManagement/src/'),
resolveApp('../blocks/IntegrationWithExistingHrmsPlatform/src/'),
resolveApp('../blocks/EditInvoices/src/'),
resolveApp('../blocks/StatusOfInvoices/src/'),
resolveApp('../blocks/IntegrationFor3rdPartyChat/src/'),
resolveApp('../blocks/Timestamp/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/radar_sdk_js'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../../node_modules/react-native-password-strength-meter'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  )
  config.resolve.alias = {'react-native-maps': 'react-native-web-maps', 'react-native': 'react-native-web'};
  return config
}