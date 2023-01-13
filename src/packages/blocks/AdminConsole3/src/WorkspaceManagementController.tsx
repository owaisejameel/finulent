import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSONBase = require("../../../framework/src/config");
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  addworkspaceModal: any;
  editworkspaceModal: any;
  workspaceList: any;
  showWorkspace: any;
  uploadedworkspaceimage: any;
  editWorkspaceName: any;
  editWorkspacedescription: any;
  editWorkspaceAdmin: any;
  searchWorkspaceAdmin: any;
  adminSearchValue: any;
  workspaceAdmins: any;
  availableAdmin: any;
  unavailableAdmin: any;
  Admins: any;
  adminString: any;
  editWorkspaceImage: any;
  editworkspace_id: any;
  addWorkspaceName: any;
  addWorkspaceDescription: any;
  addWorkspaceAdmin: any;
  validateWorkspaceName: any;
  validateWorkspaceDescription: any;
  validateWorkspaceAdmins: any;
  successAlertModal: any;
  modalsuccessmessage: any;
  isEditMode: any;
  addWorkspaceImage: any;
  clientnameunique: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class WorkSpaceManagementController extends BlockComponent<Props, S, SS> {

  // Customizable Area Start
    workspaceApiCallId: any;
    showWorkspaceApiCallId: any;
    showAdminApiCallId: any;
    editWorkspaceApiCallId: any;
    addWorksapceApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      addworkspaceModal: false,
      editworkspaceModal: false,
      workspaceList: [],
      showWorkspace: [],
      uploadedworkspaceimage: "",
      editWorkspaceName: "",
      editWorkspacedescription: "",
      editWorkspaceAdmin: "",
      searchWorkspaceAdmin: "",
      adminSearchValue: "",
      workspaceAdmins: [],
      availableAdmin: [],
      unavailableAdmin: [],
      Admins: [],
      adminString: "",
      editWorkspaceImage: "",
      editworkspace_id: "",
      addWorkspaceName: "",
      addWorkspaceDescription: "",
      addWorkspaceAdmin: "",
      validateWorkspaceName: "",
      validateWorkspaceDescription: "",
      validateWorkspaceAdmins: "",
      successAlertModal: false,
      modalsuccessmessage: "",
      isEditMode: false,
      addWorkspaceImage: "",
      clientnameunique: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  handleaddWorkspace = () => {
    this.setState({Admins: []})
    this.setState({addworkspaceModal: true})
  }

  handleEditWorkspace = (id: any, e: any) => {
    this.handleShowWorkspace(id);
    this.setState({editworkspaceModal: true})
    this.state.workspaceList.map((workspace: any) => {
        if (workspace.id === id) {
          const adminString = workspace.attributes.admins.data.map((user: any) =>`${user.attributes.first_name} ${user.attributes.last_name}`).join("; ");
          this.setState(
            (prev) => {
              return {
                ...prev,
                Admins: workspace.attributes.admins.data,
                adminString,
              };
            },
          );
          return workspace;
        }
        return undefined;
      });
  }

  handleClose = () => {
    this.setState({addworkspaceModal: false})
    this.setState({searchWorkspaceAdmin: ""})
    this.setState({availableAdmin: []})
    this.setState({unavailableAdmin: []})
    this.setState({validateWorkspaceName: ""})
    this.setState({validateWorkspaceDescription: ""})
    this.setState({validateWorkspaceAdmins: ""})
    this.setState({addWorkspaceName: ""})
    this.setState({addWorkspaceDescription: ""})
    this.setState({addWorkspaceAdmin: ""})
    this.setState({addWorkspaceImage: ""})
    this.setState({clientnameunique: ""})
  }

  handleCloseEdit = () => {
    this.setState({editworkspaceModal: false})
    this.setState({searchWorkspaceAdmin: ""})
    this.setState({availableAdmin: []})
    this.setState({unavailableAdmin: []})
    this.setState({validateWorkspaceName: ""})
    this.setState({validateWorkspaceDescription: ""})
    this.setState({validateWorkspaceAdmins: ""})
    this.setState({isEditMode: false})
    this.setState({clientnameunique: ""})
  }

  handleImageEdit = (e: any) => {
    this.setState({isEditMode: true})
    this.setState({uploadedworkspaceimage: e.target.files[0],})
  }

  handleImage = (e: any) => {
    this.setState({addWorkspaceImage: e.target.files[0],})
  }

  searchAdmin = (e: any) => {
    {this.setState({searchWorkspaceAdmin: e.target.value})}
    this.setState({ adminSearchValue: e.target.value.toLocaleLowerCase()});
    this.getAdmin()
   }

   renderAdmins() {
    const admins = this.state.Admins.map(
      (user: any) =>
        `${user.attributes.first_name} ${user.attributes.last_name}`
    );
  
    this.setState({ adminString: admins.join("; ") });
  }

  nerfNames = (data: string) => {
    if (data) {
      const charLength = 10;
      if (data.length > 8) {
        const processedString = data.substring(0, charLength).concat("..");
        return processedString.length <= 11 ? data : processedString;
      }
    }
    return data;
  }

   handleSearchItemClick(payload: any) {
    const data = this.state.Admins.filter(
      (user: any) => user.id === payload.id
    ).length;
    if (data) return;
    this.setState(
      (prev) => {
        return {
          ...prev,
          Admins: prev.Admins.concat(payload),
        };
      },
      () => {
        this.renderAdmins();
      }
    );
  }

  
  handleSearchCloseClick(id: string) {
    this.setState({Admins: this.state.Admins.filter((user: any) => String(user.id) !== id)},
    () => {this.renderAdmins();}
    );
  }

  handleSaveEdit = (id: any, e: any) => {
    if(this.state.editWorkspaceName != 0 && this.state.editWorkspacedescription != 0 && this.state.Admins.length != 0) {
        this.handleUpdatedWorkspace(id)
    } 
    else {
        this.setState({editworkspaceModal: true})
        this.setState({validateWorkspaceName: "Workspace name required"})
        this.setState({validateWorkspaceDescription: "Description required"})
        this.setState({validateWorkspaceAdmins: "Admin required"})
    } 
  }


  handleAddWorkspace = () => {
    if(this.state.addWorkspaceName != 0 && this.state.addWorkspaceDescription != 0 && this.state.Admins.length != 0) {
        this.handleWorkspaceAdded()
    }
    else {
        this.setState({addworkspaceModal: true})
        this.setState({validateWorkspaceName: "Workspace name required"})
        this.setState({validateWorkspaceDescription: "Description required"})
        this.setState({validateWorkspaceAdmins: "Admin required"})
    }
  }


  parseImg(img: string | null) {
    if (!img) return undefined;
    const imageLink = configJSONBase.baseURL;
    const imageFragment =
      typeof img === "string" && img.split("/").includes("rails");
    const imgSrc = imageFragment ? `${imageLink}/${img}` : img;
    return imgSrc;
  }

  handleGetWorkspace = () => {
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.workspaceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),"bx_block_workspace_management/workspaces");
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleGetWorkspaceResponse = (responseJson: any) => {
    console.log(responseJson.data, "==>> workspace data Manasa");
    this.setState({workspaceList: responseJson.data})
    console.log("worklist: ==> ", this.state.workspaceList)
  }

  handleGetWorkspaceErrorResponse = (responseJson: any) => {
    console.log("Error in response for getWorksapce ==>", responseJson)
  }

  handleShowWorkspace = (id: any) => {
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.showWorkspaceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`bx_block_workspace_management/workspaces/${id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleShowWorkspaceResponse = (responseJson: any) => {
    this.setState({showWorkspace: responseJson.data})
    this.setState({editworkspace_id :responseJson?.data?.id})
    this.setState({editWorkspaceName: responseJson?.data?.attributes?.name})
    this.setState({editWorkspacedescription: responseJson?.data?.attributes?.description})
    this.setState({editWorkspaceImage: responseJson?.data?.attributes?.image})
    console.log("Show workspace::", this.state.showWorkspace)
  }

  handleShowWorkspaceErrorResponse = (responseJson: any) => {
    console.log("Error in the showResponse==>", responseJson)
  }

  getAdmin = () => {
    let workspace_id
    if(this.state.editworkspaceModal) {
     workspace_id = this.state.editworkspace_id
    }
    if(this.state.addworkspaceModal) {
      workspace_id = ""
    }
    const header = {
      'token': window.localStorage.getItem('token'),
      "Content-Type": 'application/JSON',
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.showAdminApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`/search_user?workspace_id=${workspace_id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"GET");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  handleShowAdminResponse = (responseJson: any) => {
    console.log("calling the showAdminAPI===>")
    this.setState({workspaceAdmins: responseJson?.data})
    this.setState({availableAdmin: responseJson?.available_admin?.data})
    this.setState({unavailableAdmin: responseJson?.unavailable_admin?.data})
    console.log("available admins and unavailable admins:: ==>", this.state.availableAdmin, this.state.unavailableAdmin)
  }

  handleUpdatedWorkspace = (id: any) => {
    const header = {
      'token': window.localStorage.getItem('token'),
    };
    let formData = new FormData();
    formData.append('name',this.state.editWorkspaceName)
    formData.append('description',this.state.editWorkspacedescription)
    for (const admin of this.state.Admins) {
      formData.append("admin_ids[]", admin.id);
    }
    if(this.state.isEditMode){
      formData.append('image', this.state.uploadedworkspaceimage);
      }
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.editWorkspaceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`bx_block_workspace_management/workspaces/${id}`);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),formData);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"PUT");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  handleEditSaveWorkspaceResponse = (responseJson: any) => {
    // this.setState({showWorkspace: responseJson.data})
    this.setState({editworkspaceModal: false})
    this.setState({successAlertModal: true})
    this.setState({modalsuccessmessage: "Workspace updated"})
    this.setState({availableAdmin: []})
    this.setState({unavailableAdmin: []})
    this.setState({adminSearchValue: ""})
    this.setState({searchWorkspaceAdmin: ""})
    this.setState({isEditMode: false})
    this.setState({validateWorkspaceName: ""})
    this.setState({validateWorkspaceDescription: ""})
    this.setState({validateWorkspaceAdmins: ""})
    this.setState({clientnameunique: ""});
    this.handleGetWorkspace()
  }

  handleEditSaveWorkspaceErrorResponse = (responseJson: any) => {
    console.log("Error in edit response", responseJson)
    if(responseJson?.errors[0]?.name) {
      this.setState({clientnameunique: "Workspace name already exist"})
    }
  }

  handleWorkspaceAdded = () => {
    const header = {
      'token': window.localStorage.getItem('token'),
    };
    let formData = new FormData();
    formData.append('name', this.state.addWorkspaceName)
    formData.append('description', this.state.addWorkspaceDescription);
    for (const admin of this.state.Admins) {
      formData.append("admin_ids[]", admin.id);
    }
    if(this.state.addWorkspaceImage != 0) {
      formData.append('image', this.state.addWorkspaceImage);
    }

    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.addWorksapceApiCallId = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),"bx_block_workspace_management/workspaces");
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage),formData);
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),"POST");
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;

  }

  handleAddWorkspaceResponse = (responseJson: any) => {
    console.log(responseJson, "Added Successfully")
    this.handleGetWorkspace()
    this.setState({addworkspaceModal: false})
    this.setState({addWorkspaceName: ""})
    this.setState({addWorkspaceDescription: ""})
    this.setState({addWorkspaceAdmin: ""})
    this.setState({successAlertModal: true})
    this.setState({modalsuccessmessage: "Workspace added"})
    this.setState({availableAdmin: []})
    this.setState({unavailableAdmin: []})
    this.setState({adminSearchValue: ""})
    this.setState({searchWorkspaceAdmin: ""})
    this.setState({addWorkspaceImage: ""})
    this.setState({validateWorkspaceName: ""})
    this.setState({validateWorkspaceDescription: ""})
    this.setState({validateWorkspaceAdmins: ""})
    this.setState({clientnameunique: ""})
  }
  handleAddWorkspaceErrorResponse = (responseJson: any) => {
    console.log("Error in add workspace response ==>", responseJson)
    if(responseJson?.errors[0]?.name) {
      this.setState({clientnameunique: "Workspace name already exist"})
    }
  }

  handleSuccessAlertModalClose = () => {
    this.setState({successAlertModal: false})
  }
  // Customizable Area End


  async receive(from: string, message: Message) {
    // Customizable Area Start  
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if(responseJson && !responseJson.errors && responseJson.data) {
        switch(apiRequestCallId) {
          case this.workspaceApiCallId :
            return this.handleGetWorkspaceResponse(responseJson)
          case this.showWorkspaceApiCallId :
            return this.handleShowWorkspaceResponse(responseJson)
          case this.editWorkspaceApiCallId :
            return this.handleEditSaveWorkspaceResponse(responseJson)
          case this.addWorksapceApiCallId : 
            return this.handleAddWorkspaceResponse(responseJson)
        }
      }
      else {
        switch(apiRequestCallId) {
          case this.showAdminApiCallId :
            return this.handleShowAdminResponse(responseJson)
          case this.workspaceApiCallId: 
            return this.handleGetWorkspaceErrorResponse(responseJson)
          case this.showWorkspaceApiCallId :
            return this.handleShowWorkspaceErrorResponse(responseJson)
          case this.editWorkspaceApiCallId :
            return this.handleEditSaveWorkspaceErrorResponse(responseJson)
          case this.addWorksapceApiCallId : 
            return this.handleAddWorkspaceErrorResponse(responseJson)
        }
      }
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
 }
}
