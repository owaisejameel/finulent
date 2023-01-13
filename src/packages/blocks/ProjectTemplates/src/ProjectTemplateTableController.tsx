//Customizable Area Start
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import { BlockComponent } from '../../../framework/src/BlockComponent';
import MessageEnum, { getName } from '../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../framework/src/RunEngine';
export const configJSONBase = require("../../../framework/src/config");
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    history: any;
}

interface S {
    fieldsData: any;
    QAandQc: any;
    projectList: any;
    loading: boolean;
    projectListAllData: any;
    projectTypes: any;
    selectedProjects: any;
    paginationPage: any;
    perPageRecords: any;
    isOpenDateFilterModal: 'CLOSE' | 'DATE_FILTER' | 'DOWNLOAD_COMPLETE_DATA';
    isOpenNumberFilterModal: boolean;
    errorText:string;
    startDate:any;
    endDate:any;
    focusedInput:any;
    codeModal:boolean;
    updateProjectData: any;
    openAddProject: any;
    isEditProject: any;
    editProjectId: any;
    searchTerm: string;
    textFilter: boolean;
    fromDate: any;
    toDate: any;
    menuAnchorEl: null | EventTarget;
    filterTypeDDOptions: any;
    filterTypeDDOptionsBySearch: any;
    filterTypeDDSearchText: any;
    selectedFilterId: any;
    filterData: any;
    selectFilterType: 'Options' | 'Account' | 'ProjType';
    isDateFilterUpdated: boolean;
    fromNumberFilter: number | "";
    toNumberFilter: number | "";
    isNumFilterUpdated: boolean;
    tabelCellSelectAccSearchText: string;
    tabelCellSelectAccOptions: any;
    tabelCellSelectAccOptionsBySearch: any;
    tabelCellSelectAccAnchorEl: null | EventTarget;
    selectedProjectId: string;
    selectedFieldId: string;
}

interface SS {
    id: any;
}

export default class ProjectTemplateTableController extends BlockComponent<Props, S, SS>{
    ApiGetProjectId: string = "";
    ApiGetFieldId: string = "";
    ApiGetProjectTypesId: string = "";
    ApiDeleteProjectId: string = "";
    getQaQcApiCallId: string = "";
    ApiEditProjectId: string = "";
    ApiCurrentProjectDataId: string = "";
    query: any = new URLSearchParams(this.props.history?.location?.search);
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        this.getProjectList = this.getProjectList.bind(this);
        this.handleSearch = this.debounce(this.handleSearch.bind(this), 1000);
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.RestAPIResponceMessage)
        ];

        this.state = {
            fieldsData: [],
            QAandQc: [],
            projectList: {},
            loading: true,
            projectListAllData: {},
            projectTypes: [],
            selectedProjects: [],
            paginationPage: 1,
            perPageRecords: 10,
            isOpenDateFilterModal: 'CLOSE',
            isOpenNumberFilterModal: false,
            errorText:"",
            startDate:null,
            endDate:null,
            focusedInput:null,
            codeModal:false,
            updateProjectData: [],
            openAddProject: false,
            isEditProject: false,
            editProjectId: false,
            searchTerm: "",
            textFilter: false,
            fromDate: "",
            toDate: "",
            isDateFilterUpdated: false,
            fromNumberFilter: 0,
            toNumberFilter: 0,
            isNumFilterUpdated: false,
            menuAnchorEl: null,
            filterTypeDDOptions: [],
            filterTypeDDOptionsBySearch: [],
            filterTypeDDSearchText: "",
            selectedFilterId: "",
            filterData: [],
            selectFilterType: 'Options',
            tabelCellSelectAccSearchText: "",
            tabelCellSelectAccAnchorEl: null,
            tabelCellSelectAccOptions: [],
            tabelCellSelectAccOptionsBySearch: [],
            selectedProjectId: "",
            selectedFieldId: ""
        };

        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        if (this.props.history?.location?.search) {
            this.setState({loading: true});
            this.getProjectList();
            this.getFields();
            this.getProjectTypes();
            this.getQAandQc();
        }
    }

      debounceSearchInput = (func: any, delay: any) => {
        return () => {
          setTimeout(() => {
            func()
          }, delay)
        }
    }
    
      createOptions = (fieldValues: any, associated_class_name: string) => {
        if (associated_class_name == 'AccountBlock::Account') {
          return this.state.QAandQc?.map((i: any) => ({
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
      }

      handleEditProject = (value: any, fieldId: string, projectId: string) => {
        const changedField = {
                template_field_id: fieldId,
                data: value
            }
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
          `/bx_block_dashboard/template_field_data/${projectId}`
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
              project_data: [changedField]
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


    handleCancelBtn = () => {
        this.setState({ errorText: "", isOpenNumberFilterModal: false, isOpenDateFilterModal: 'CLOSE', codeModal: false, fromDate: "", toDate: "", fromNumberFilter: 0, toNumberFilter: 0 })
    }

    renderDynamicBG = (fieldItem: any): string => {
        if(localStorage.getItem('user_type') == "Superadmin") return "white";
        else return fieldItem?.color_code;
    }

    handleDateFilterAdd = async () => {
        if (this.state.isOpenDateFilterModal === 'DATE_FILTER') {
            let filterDataCopy = [...this.state.filterData]
            const dateFilterObjFound = await filterDataCopy?.find((i: any) => i.template_field_id == this.state.selectedFilterId)
            const dateFilterObjFoundCopy = dateFilterObjFound?.start_date ? { ...dateFilterObjFound } : false;

            if (dateFilterObjFoundCopy) {
                dateFilterObjFoundCopy.start_date = this.state.fromDate;
                dateFilterObjFoundCopy.end_date = this.state.toDate;
                Object.assign(dateFilterObjFound, dateFilterObjFoundCopy);
            }
            else {
                const dateFilterObj = {
                    template_field_id: this.state.selectedFilterId,         // Date Filter
                    type: "date_range",
                    start_date: this.state.fromDate,     // Format: YYYY-MM-DD
                    end_date: this.state.toDate
                }
                filterDataCopy.push(dateFilterObj);
            }
            this.setState({ filterData: filterDataCopy, isOpenDateFilterModal: 'CLOSE' }, () => this.getProjectList());
        }
        else if (this.state.isOpenDateFilterModal === 'DOWNLOAD_COMPLETE_DATA') {
            this.getProjectList('complete')
        }
    }

    handleNumberFilterAdd = async () => {
        let filterDataCopy = [...this.state.filterData]
        const numFilterObjFound = await filterDataCopy?.find((i: any) => i.template_field_id == this.state.selectedFilterId) || false;
        const numFilterObjFoundCopy = numFilterObjFound;

        if (numFilterObjFoundCopy) {
            numFilterObjFoundCopy.start_no = this.state.fromNumberFilter;
            numFilterObjFoundCopy.end_no = this.state.toNumberFilter;
            Object.assign(numFilterObjFound, numFilterObjFoundCopy);
        }
        else {
            const numFilterObj = {
                template_field_id: this.state.selectedFilterId,         // Date Filter
                type: "number_range",
                start_no: this.state.fromNumberFilter,     // Format: YYYY-MM-DD
                end_no: this.state.toNumberFilter
            }
            filterDataCopy.push(numFilterObj);
        }
        this.setState({filterData: filterDataCopy, isOpenNumberFilterModal: false}, () => this.getProjectList());
    }

    handleRemoveFilter = async () => {
        const removedFilters = await this.state.filterData.filter((i: any) => i.template_field_id != this.state.selectedFilterId);
        this.setState({filterData: removedFilters});
        this.getProjectList();
    }

    debounce = (cb: any, delay: any) => {
        let timeout: any;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                return cb(...args);
            }, delay)
        }
    }

    handleSearch = (e: any) => {
        this.setState({ searchTerm: e }, () => this.getProjectList());
    }

    cancelSearch = async () => {
        this.setState({ searchTerm: "" }, () => this.getProjectList());
    }

    handlePagination = (page: any) => {
        this.setState({ paginationPage: page }, () => this.getProjectList());
    }

    handleDateChange = (date: any, startOrEnd: 'start' | 'end') => {
        const currentFilterItem = this.state.filterData?.find((i: any) => i.template_field_id == this.state.selectedFilterId);
        if(currentFilterItem && (this.state.isOpenDateFilterModal !== 'DOWNLOAD_COMPLETE_DATA')) this.setState({isDateFilterUpdated: true});
        if (startOrEnd === 'start') this.setState({ fromDate: date.format('YYYY-MM-DD')});
        else this.setState({ toDate: date.format('YYYY-MM-DD')});
    }

    handleNumChange = (value: any, startOrEnd: 'start' | 'end') => {
        const currentFilterItem = this.state.filterData?.find((i: any) => i.template_field_id == this.state.selectedFilterId);
        if(currentFilterItem) this.setState({isNumFilterUpdated: true});
        if (startOrEnd === 'start') this.setState({ fromNumberFilter: value});
        else this.setState({ toNumberFilter: value});
    }

    filterAutoFilled = (fields: any) => fields?.filter((i: any) => !i?.auto_filled) || [];

    handleEdit = (projectData: any) => {
        let formatedData = this.state.fieldsData.map((field: any) => ({
            ...projectData?.attributes?.project_data.find((item: any) => (item.template_field_id == field.id) && item),
            ...field
        }));
        formatedData = formatedData?.filter((i: any) => !i?.auto_filled)
        this.setState({
            updateProjectData: formatedData,
            loading: false,
            openAddProject: true,
            isEditProject: true,
            editProjectId: projectData?.id
        })
    }

    createFilterData = async (fields: any) => {
        const fieldsWithFilter = await fields?.filter((i: any) => i.quick_filter === true && i.field_type === "Dropdown");
        const filterData = await fieldsWithFilter?.map(({ id }: any) => ({
            template_field_id: id,
            type: "select",
            selected: []
        }))
        this.setState({ filterData: filterData, searchTerm: "" }, () => this.getProjectList())
    }

    returnChecked = (id: any) => {
        return this.state?.selectedProjects?.includes(id)
    }

    handleCheckboxClick = (e: any, id: any) => {
        let updatedSelectedProejcts = this.state.selectedProjects;
        if (!updatedSelectedProejcts.includes(id)) updatedSelectedProejcts.push(id);
        else {
            updatedSelectedProejcts.splice(updatedSelectedProejcts.indexOf(id), 1);  //deleting
        }
        this.setState({ selectedProjects: updatedSelectedProejcts })
    }

    handleSelectFilterValueChange = (item: any) => {
        const filterDataCopy = [...this.state.filterData]
        const currentFilterItem = filterDataCopy?.find((i: any) => i.template_field_id == this.state.selectedFilterId)
        const currentFilterItemCopy = currentFilterItem ? { ...currentFilterItem } : {}
        if (currentFilterItemCopy?.selected) {
            if (!currentFilterItemCopy?.selected?.includes(item?.value)) {          //checking weather array contain the id
                currentFilterItemCopy?.selected.push(item?.value);               //adding to array because value doesnt exists
            } else {
                currentFilterItemCopy?.selected.splice(currentFilterItemCopy?.selected.indexOf(item?.value), 1);  //deleting
            }
        }
        Object.assign(currentFilterItem, currentFilterItemCopy);
        this.setState({ filterData: filterDataCopy });
        this.getProjectList();
    }

    returnIfFilterIsApplied = (item: any): boolean => {
        const currentFilterItem = this.state.filterData?.find((i: any) => i.template_field_id == this.state.selectedFilterId)
        if (currentFilterItem?.selected) {
            if (currentFilterItem?.selected?.includes(item.value)) return true;
            else return false;
        }
        else return false;
    }

    handleClearAllFilters = () => {
        this.createFilterData(this.state.fieldsData);
    }

    handleDownloadCompleteData = async() => {
        const foundDateFieldId = await this.state.fieldsData?.find((i: any) => i?.field_name?.toLowerCase() === 'date')?.id
        this.setState({ isOpenDateFilterModal: 'DOWNLOAD_COMPLETE_DATA', fromDate: "", toDate: "", selectedFieldId: foundDateFieldId });
    }

    returnDateValue = (startOrEnd: 'start' | 'end') => {
        const currentFilterItem = this.state.filterData?.find((i: any) => i?.template_field_id == this.state?.selectedFilterId)
        if (currentFilterItem?.start_date && currentFilterItem?.end_date && !this.state.isDateFilterUpdated && this.state.isOpenDateFilterModal !== 'DOWNLOAD_COMPLETE_DATA') {
            if (startOrEnd === 'start') return currentFilterItem?.start_date;
            else if (startOrEnd === 'end') return currentFilterItem?.end_date;
        }
        else if (startOrEnd === 'start') return this.state.fromDate;
        else if (startOrEnd === 'end') return this.state.toDate;
    }

    returnNumValue = (startOrEnd: 'start' | 'end') => {
        const currentFilterItem = this.state.filterData?.find((i: any) => i?.template_field_id == this.state?.selectedFilterId)
        if (currentFilterItem?.start_no && currentFilterItem?.end_no && !this.state.isNumFilterUpdated) {
            if (startOrEnd === 'start') return currentFilterItem?.start_no;
            else if (startOrEnd === 'end') return currentFilterItem?.end_no;
        }
        else if (startOrEnd === 'start') return this.state.fromNumberFilter;
        else if (startOrEnd === 'end') return this.state.toNumberFilter;
    }

    handleFilteTypeDropDown = (htmlElement: EventTarget, headerItem: any) => {
        const { attributes } = headerItem;
        const { associated_class_name, field_values } = attributes;
        if (associated_class_name == 'AccountBlock::Account') {
             const options = this.state.QAandQc?.map((i: any) => ({
              label: i?.attributes?.first_name + " " + i?.attributes?.last_name,
              value: i?.id
            }))
            this.setState({ menuAnchorEl: htmlElement, filterTypeDDOptions: options, filterTypeDDOptionsBySearch: options,  selectFilterType: 'Account' });
          }
          if (associated_class_name == 'BxBlockDashboard::TypeOfProject') {
            const options = this.state.projectTypes?.map((i: any) => ({
              label: i?.attributes?.project_type,
              value: i?.id
            }))
            this.setState({ menuAnchorEl: htmlElement, filterTypeDDOptions: options, filterTypeDDOptionsBySearch: options, selectFilterType: 'ProjType' });
          }
        if (field_values?.length) {
            const options = field_values?.map((i: any) => ({ value: i, label: i }));
            this.setState({ menuAnchorEl: htmlElement, filterTypeDDOptions: options, filterTypeDDOptionsBySearch: options, selectFilterType: 'Options' });
        }
    }

    filterMenuOptions = (text: string, headerOrCell: "header" | "cell") => {
        const data = headerOrCell === "cell" ? this.state.tabelCellSelectAccOptions : this.state.filterTypeDDOptions;
        const menuOptions = data?.filter((obj: any) => obj?.label?.toLowerCase()?.includes(text?.trim()?.toLowerCase()));
        headerOrCell === "cell" ? 
        this.setState({
            tabelCellSelectAccSearchText: text,
            tabelCellSelectAccOptionsBySearch: menuOptions
        }) :
        this.setState({
            filterTypeDDSearchText: text,
            filterTypeDDOptionsBySearch: menuOptions
        })
    }

    getQAandQc(): boolean {
        const breadcrumbData = JSON.parse(localStorage.getItem('breadcrumb_data') || "");
        const workspaceId = breadcrumbData?.workspace?.id
        const header = {
          'token': window.localStorage.getItem('token'),
          "Content-Type": "application/JSON",
        };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getQaQcApiCallId = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          `account_filter?activation_status=true&role_id=Designer/QC/QA&workspace_id=${workspaceId || ""}`
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

    getProjectList = (downloadType?: 'sample' | 'current' | 'complete') => {
        const removeExtraFilters = this.state.filterData?.filter((i: any) => {
           const { type, selected, end_date, start_date, start_no, end_no } = i
            if ((type == 'select' && selected?.length > 0) || (type == 'date_range' && end_date && start_date) || (type == 'number_range' && start_no !== "" && end_no !== "")) {
                return { ...i }
            }
        })
        const data = {
            project: {
                template_id: this.query.get('tid'),
                client_id: this.query.get('cid'),
                client_subfolder_id: this.query.get('sfid') == null ? "" : this.query.get('sfid'),
                search: downloadType !== "complete" ? this.state.searchTerm : "",
                filters: downloadType !== "complete" ? removeExtraFilters :
                    [{
                        template_field_id: this.state.selectedFieldId,
                        type: "date_range",
                        start_date: this.state.fromDate,
                        end_date: this.state.toDate
                    }]
            }
        }
        const header = {
            "Content-Type": 'application/json',
            token: localStorage.getItem('token')
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.ApiGetProjectId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_dashboard/template_field_data/list/?page=${this.state.paginationPage || '1'}&per_page=${this.state.perPageRecords || '10'}&download=${downloadType === 'complete' || downloadType === 'current' ? true : false}&download_sample=${downloadType === 'sample' ? true : false}`
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),
            'POST'
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(data)
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    getFields = () => {
        const header = {
            "Content-Type": 'application/json',
            token: localStorage.getItem('token')
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        //GO TO REQUEST STATE
        this.ApiGetFieldId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_dashboard/template_fields?template_id=${this.query.get('tid')}&client_id=${this.query.get('cid')}&client_subfolder_id=${this.query.get('sfid') == null ? "" : this.query.get('sfid')}`
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            'GET'
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    getProjectTypes = () => {
        const header = {
            "Content-Type": 'application/json',
            token: localStorage.getItem('token')
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        //GO TO REQUEST STATE
        this.ApiGetProjectTypesId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `/bx_block_dashboard/type_of_project?template_id=${this.query.get('tid')}`
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            'GET'
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    deleteProjects = () => {
        const header = {
            "Content-Type": 'application/json',
            token: localStorage.getItem('token')
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        //GO TO REQUEST STATE
        this.ApiDeleteProjectId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_dashboard/template_field_data?ids=[${this.state.selectedProjects}]`
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            'DELETE'
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    downloadCSV = async (url:any, name:any) => {
        const response = await fetch(url);
        const data = await response.text();
        const blob = new Blob([data], { type: "data:text/csv;charset=utf-8," });
        const blobURL = window.URL.createObjectURL(blob);
    
        // Create new tag for download file
        const anchor = document.createElement("a");
        anchor.download = name;
        anchor.href = blobURL;
        anchor.dataset.downloadurl = ["text/csv", anchor.download, anchor.href].join(
          ":"
        );
        anchor.click();
    
        // Remove URL.createObjectURL. The browser should not save the reference to the file.
        setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          URL.revokeObjectURL(blobURL);
        }, 100);
      };

    handleApiGetFieldSucc = (responseJson: any) => {
        if (responseJson?.data?.length) {
            const formatedData = responseJson?.data?.map((item: any) => {
                const attr = { ...item.attributes }
                delete item.attributes
                return { ...item, ...attr }
            })
            this.createFilterData(formatedData)
            this.setState({
                fieldsData: formatedData,
            })
        }
    }

    handleApiGetFieldFailure = (responseJson: any) => {
        if(typeof responseJson?.errors == 'string') {
            toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
          }
          else toast.error('Something went wrong, please try again later.', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }

    GetProjectListSucc = (responseJson: any) => {
        if (responseJson?.projects?.length) {
            let projectListAllData = { ...responseJson };
            let projects = [...projectListAllData?.projects]
            projects = projects.map((project) => {
                return ({
                    ...project, missingKeysInProject: responseJson?.fields?.filter((headerItem: any) =>
                        !project?.attributes?.project_data?.some((projField: any) => projField?.template_field_id == headerItem?.id)
                    )
                })
            }
            )
            const formatProjects = projects?.map((i: any) => ({ ...i, missingKeysInProject: i?.missingKeysInProject?.map((j: any) => j.id) }))
            this.setState({
                projectListAllData: { ...projectListAllData, projects: formatProjects },
                loading: false,
                isOpenDateFilterModal: 'CLOSE'
            })
        }
        // ? download file response from same api.
        else if(responseJson?.file){
            this.downloadCSV(responseJson.file, "download.csv")
        }
        else {
            this.setState({
                menuAnchorEl: null,
                selectedFilterId: "",
                isDateFilterUpdated: false,
                projectListAllData: [],
                loading: false
            })
        }
    }

    GetProjectListFail = (responseJson: any) => {
        this.setState({
            menuAnchorEl: null,
            selectedFilterId: "",
            isDateFilterUpdated: false,
            loading: false,
            isOpenDateFilterModal: 'CLOSE'
        })
        toast.error(responseJson.errors, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }

    handleGetProjectTypesSucc = (responseJson: any) => {
        this.setState({
            projectTypes: responseJson?.data || []
        })
    }

    handleGetProjectTypesFailure = (responseJson: any) => {
        toast.error('Something went wrong, please try again later.', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }

    handleDeleteProjectsSucc = (responseJson: any) => {
        if (typeof responseJson?.message === 'string') {
            this.getProjectList();
            this.setState({
                selectedProjects: []
            });
            toast.info(responseJson?.message, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 });
        }
    }

    handleEdiProjectSucc = (responseJson: any) => {
        if (responseJson.status === 500) {
            toast.error(responseJson.error, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
        }
        else {
            this.getProjectList();
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
        runEngine.debugLog("on receive==>" + JSON.stringify(message));
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            const responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            if (responseJson && !responseJson?.errors && !responseJson?.error) {
                switch (apiRequestCallId) {
                    case this.ApiGetFieldId:
                        return this.handleApiGetFieldSucc(responseJson);
                    case this.ApiGetProjectId:
                        return this.GetProjectListSucc(responseJson);
                    case this.ApiGetProjectTypesId:
                        return this.handleGetProjectTypesSucc(responseJson);
                    case this.ApiDeleteProjectId:
                        return this.handleDeleteProjectsSucc(responseJson);
                    case this.getQaQcApiCallId:
                        return this.setState({ QAandQc: responseJson.data });
                    case this.ApiEditProjectId:
                        return this.handleEdiProjectSucc(responseJson);
                }
            } else {
                switch (apiRequestCallId) {
                    case this.ApiGetFieldId:
                        return this.handleApiGetFieldFailure(responseJson);
                    case this.ApiGetProjectId:
                        return this.GetProjectListFail(responseJson);
                    case this.ApiGetProjectTypesId:
                        return this.handleGetProjectTypesFailure(responseJson);
                    case this.ApiDeleteProjectId:
                        return this.handleDeleteProjectsSucc(responseJson);
                    case this.getQaQcApiCallId:
                        return this.handleGetProjectTypesFailure(responseJson);
                    case this.ApiEditProjectId:
                        return this.handleEditProjectFailure(responseJson);
                }
            }
        }
    }
}
//Customizable Area End