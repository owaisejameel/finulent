import React from "react";

// Customizable Area Start
import {
    Box,
    Button,
    Link,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Checkbox,
    CircularProgress,
    Modal,
    Menu,
    MenuItem,
    TextField,
    InputLabel,
    Grid,
    createMuiTheme,
    Divider,
    Select
} from "@material-ui/core";
import "./style.css";
import moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// Customizable Area End
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from "material-ui-pickers";
const filterIcon = require("../assets/iconquickfilter.png");
// Customizable Area Start
import AddFieldModal from "./AddFieldModal.web";
import SearchBar from "material-ui-search-bar";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Pagination from '@material-ui/lab/Pagination';
import CloseIcon from "@material-ui/icons/Close";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";

const materialTheme = createMuiTheme({
    overrides: {
      // @ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8":"rgb(171 114 24)",
          color: "black",
          backgroundImage:   localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8":"radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        },
      },
      MuiPickersDay: {
        day: {
          color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
        },
        daySelected: {
          backgroundColor:localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "rgb(171 114 24)",
          backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        },
        dayDisabled: {
          color:localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "rgb(171 114 24)",
        },
        current: {
          color:localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "rgb(171 114 24)",
        },
        isSelected: {
          color: localStorage.getItem('user_type')=='Superadmin'?"black":"white",
          backgroundColor: localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8":"rgb(171 114 24)",
          backgroundImage: localStorage.getItem('user_type')=='Superadmin'?"#e8e8e8": "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        },
      },
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "10px",
          },
          "*::-webkit-scrollbar-track": {
            background: "#E4EFEF",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "#1D388F61",
            borderRadius: "2px",
          },
        },
      },
      MuiPickersToolbarButton: {
        toolbarBtn: {
            color:  localStorage.getItem('user_type')=='Superadmin'?"black":"white",
        },
        toolbarBtnSelected: {
            color:  localStorage.getItem('user_type')=='Superadmin'?"black":"white"
        },
     },
      palette: {
        primary: "red", // works
      },
      MuiButton: {
        textPrimary: {
          color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
        },
      },

      MuiPickersModal: {
        dialogAction: {
          color: "#8bc34a",
        },
      },
      myComponent: {
        "& .MuiPickersDay-isSelected": {
          backgroundColor: "red",
        },
      },

      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: "white",
          color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
        },
        dayLabel: {
          color: localStorage.getItem('user_type')=='Superadmin'?"black":"rgb(171 114 24)",
        },
      },
    },
  });


// Customizable Area End

import ProjectTemplateTableController, {
    Props,
} from "./ProjectTemplateTableController";
import UpdateSequenceModal from "./UpdateSequenceModal.web";
import AddProjectModal from "./AddProjectModal.web";
import DeleteFieldModal from "./DeleteFieldModal.web";
import TemplateBreadcrumbs from "./TemplateBreadcrumbs.web";
export default class ProjectTemplateTable extends ProjectTemplateTableController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    handleBack = () => {
        if (this.query.get('sfid')) {
            this.props.history.push(`/definechecktable?cid=${this.query.get('cid')}&sfid=${this.query.get('sfid')}&tid=${this.query.get('tid')}`);
        } else {
            this.props.history.push(`/definechecktable?cid=${this.query.get('cid')}&tid=${this.query.get('tid')}`);
        }
    };

    handleSave = () => {
        this.props.history.push("/userprofile");
    };

    handleNext = () => {
        this.props.history.push({
            pathname: "/definechecklist",
            state: { header: "Solar Template", parent: "Solar", child: "Tata Power" },
        });
    };

    replaceUndersocotWithSpace = /_/g;
    replaceCaseFormation = /(^\w{1})|(\s+\w{1})/g;

    handleFilters = (htmlElement: EventTarget, headerItem: any) => {
        if (headerItem?.attributes?.quick_filter) {
            this.setState({selectedFilterId: headerItem?.id});
            switch (headerItem?.attributes?.field_type) {
                case 'Number':
                    this.setState({ isOpenNumberFilterModal: true, errorText: headerItem.attributes?.field_name })
                    break;
                case 'Dropdown': {
                    this.handleFilteTypeDropDown(htmlElement, headerItem);
                    break;
                }
                case 'Calendar': {
                    this.setState({ isOpenDateFilterModal: 'DATE_FILTER', fromDate: "", toDate: "" })
                    break;
                }
            }
        }
    }

    renderHeader = () => (
        <div className="heading" style={webStyle.pageheader}>
            <TemplateBreadcrumbs
                navigation={""}
                id={""}
                that={this}
                history={this.props.history} />
            <div>
                <Link style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.btn : webStyle.adminbtn}>Refresh</Link>
            </div>
        </div>
    )

    renderActionButtons = () => (
        <div style={webStyle.cardContentOption}>
            <Button onClick={() => this.getProjectList('sample')} className="btnshadow" disableElevation style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.btn : webStyle.adminbtn}>Download sample .CSV file</Button>
            <Button style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.btn : webStyle.adminbtn}>Upload .CSV file</Button>
            <Button onClick={() => this.handleDownloadCompleteData()} style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.btn : webStyle.adminbtn}>Download complete data</Button>
            <AddFieldModal
                isChooseTemplateFlow={false}
                navigation={""}
                id={""}
                history={this.props.history}
                fieldsData={this.state.fieldsData}
                newFieldAddedCallback={() => {this.getFields(); this.getProjectList()}}
            />
            {localStorage.getItem('user_type') == 'Superadmin' &&
                <DeleteFieldModal
                    isChooseTemplateFlow={false}
                    navigation={""}
                    id={""}
                    that={this}
                    history={this.props.history}
                    fieldsData={this.state.fieldsData}
                    fieldDeleteCallback={() => {this.getFields(); this.getProjectList()}}
                />
            }
            <UpdateSequenceModal
                isChooseTemplateFlow={false}
                navigation={""}
                id={""}
                history={this.props.history}
                fieldsData={this.state.fieldsData}
                sequenceUpdatedCallback={() => {this.getFields(); this.getProjectList()} }
            />
            {!this.state.loading && (
                <AddProjectModal
                    navigation={""}
                    id={""}
                    that={this}
                    history={this.props.history}
                    fieldsData={this.filterAutoFilled(this.state?.fieldsData)}
                    newProjectAddedCallback={() => this.getProjectList()}
                    projectTypes={this.state.projectTypes}
                    updateProjectData={this.state.updateProjectData}
                    isEditProject={this.state.isEditProject}
                    editProjectId={this.state.editProjectId}
                    QAandQc={this.state.QAandQc}
                />
            )}
            <Button onClick={() => this.getProjectList("current")} style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.btn : webStyle.adminbtn}>Download current Data</Button>
        </div>
    )

    renderStickyTabel = () => (
        <div >
            <Table
                stickyHeader
                // aria-label="sticky table"
                className="template-tab"
                style={{paddingBottom:"17px",}}
            >
                <TableHead>
                    <TableRow className="template-table-header" style={{ backgroundColor: "darkgrey" }}>
                        {this.state?.projectListAllData?.fields?.map((headerItem: any, headerindex: any) =>
                            headerItem?.attributes?.is_frozen && (
                                <TableCell align="left" style={webStyle.tableHead} key={headerindex} className={localStorage.getItem('user_type') == 'Superadmin' ? "tablehead" : "admintablehead"}>
                                    <Typography style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => this.handleFilters(e.target, headerItem)}>
                                        <span>{headerItem?.attributes?.field_name}</span>
                                        {headerItem?.attributes?.quick_filter && (<span>
                                            <img style={{ marginLeft: 10,backgroundColor:(localStorage.getItem('user_type')=='Superadmin'?"":"#FFD580"),color:"black"}} src={filterIcon} />
                                        </span>
                                        )}
                                    </Typography>
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state?.projectListAllData?.projects?.map((projectItem: any, projectindex: number) =>
                    (<TableRow key={projectindex}>
                        {this.state?.projectListAllData?.fields?.map((headerItem: any, headerindex: any) =>
                        this.renderTabelCell(projectItem, headerItem, headerindex, true)
                        )}
                    </TableRow>)
                    )}
                </TableBody>
            </Table>
        </div >
    )

    renderNonStickyTable = () => (
        <div className="template-table">
            <div>
            <Table
                stickyHeader

                // aria-label="sticky table"
                className="template-tab"
                style={{height:"100%",position: 'sticky',
                top: 0,}}
            >
                <TableHead>
                    <TableRow className="template-table-header" style={{ backgroundColor: "darkgrey" }}>
                        {this.state?.projectListAllData?.fields?.map((headerItem: any, headerindex: any) =>
                            !headerItem?.attributes?.is_frozen && (
                                <TableCell align="left" style={webStyle.tableNonHead} key={headerindex} className={localStorage.getItem('user_type') == 'Superadmin' ? "tablehead" : "admintablehead"}>
                                    <Typography style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => this.handleFilters(e.target, headerItem)}>
                                        <span>{headerItem?.attributes?.field_name}</span>
                                        {headerItem?.attributes?.quick_filter && (<span>
                                            <img style={{ marginLeft: 5,backgroundColor:(localStorage.getItem('user_type')=='Superadmin'?"":"#FFD580") }} src={filterIcon} />
                                        </span>
                                        )}
                                    </Typography>
                                </TableCell>
                            ))}
                            <TableCell align="left" style={webStyle.tableNonHead} className={localStorage.getItem('user_type') == 'Superadmin' ? "tablehead" : "admintablehead"}>
                                    <Typography>
                                        Actions
                                    </Typography>
                                </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state?.projectListAllData?.projects?.map((projectItem: any, projectindex: number) =>
                    (<TableRow key={projectindex}>
                        {this.state?.projectListAllData?.fields?.map((headerItem: any, headerindex: any) =>
                        this.renderTabelCell(projectItem, headerItem, headerindex, false)
                        )}
                        <TableCell align="left" style={ localStorage.getItem('user_type')=='Superadmin'?webStyle.tableCell:webStyle.tableAdminCell}  >
                            <div style={{ height: 10, display: 'inline-flex', alignItems: 'center' }}>
                                <EditOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => this.handleEdit(projectItem)} />
                                <Checkbox checked={this.returnChecked(projectItem?.id)} onChange={(e) => this.handleCheckboxClick(e.target.checked, projectItem?.id)} />
                            </div>
                        </TableCell>
                    </TableRow>)
                    )}
                </TableBody>
            </Table>
            </div>
        </div>
    )

    returnInitials = (name: string) => {
        return name?.split(' ')?.map(name => name[0])?.join('')?.toUpperCase()
    }

    handleSelectTabelCellAcc = (value: string) => {
        this.handleEditProject(value, this.state.selectedFieldId, this.state.selectedProjectId)
        this.setState({tabelCellSelectAccAnchorEl: null, tabelCellSelectAccSearchText: "", tabelCellSelectAccOptions: [], tabelCellSelectAccOptionsBySearch: []})
    }

    searchableMenuForAccounts = () => {
       return (
       <Menu
        className="searchable-menu-for-accs"
        style={webStyle.dropDownFilterMenu}
        keepMounted={true}
        // @ts-ignore
        anchorEl={this.state.tabelCellSelectAccAnchorEl}
        id="account-menu"
        open={this.state.tabelCellSelectAccAnchorEl != null ? true : false}
        onClose={() => this.setState({ tabelCellSelectAccAnchorEl: null, tabelCellSelectAccSearchText: "", tabelCellSelectAccOptions: [], tabelCellSelectAccOptionsBySearch: [] })}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
        <MenuItem disableTouchRipple={true} style={{background: 'white'}}>
            <SearchBar
                placeholder="Search"
                style={{width: '200'}}
                onChange={(e) => this.filterMenuOptions(e, 'cell')}
                value={this.state.filterTypeDDSearchText}
                // @ts-ignore
                onKeyDown={(e: any):void => {
                    if (e.key !== "Escape") {
                      e.stopPropagation();
                    }
                  }}
                onCancelSearch={() => this.setState({tabelCellSelectAccOptionsBySearch: this.state.tabelCellSelectAccOptions})}
            />
        </MenuItem>
        <MenuItem value="NA" onClick={() => this.handleSelectTabelCellAcc("NA")}>NA</MenuItem>
        {this.state?.tabelCellSelectAccOptionsBySearch?.map((i: any, key: number) =>
            <MenuItem onClick={() => this.handleSelectTabelCellAcc(i.value)} disableTouchRipple={true} key={key} style={{display:"flex"}} >
                <div style={webStyle.accNameInitials}>{this.returnInitials(i.label)}</div>
                {i.label}
            </MenuItem>)}
    </Menu>)
    }

    handleOpenTabelCellAcc = (element: EventTarget, field_values: any, associated_class_name: any, projectItem: any, headerId: any) => {
        const options = this.createOptions(field_values, associated_class_name);
        this.setState({tabelCellSelectAccAnchorEl: element, tabelCellSelectAccOptions: options, tabelCellSelectAccOptionsBySearch: options, selectedProjectId: projectItem?.id, selectedFieldId: headerId})
    }

    renderFilledCell = (projectItem: any, headerItem: any, headerindex: any, isFrozen: boolean, fieldItem: any) => {
        if (headerItem?.attributes?.is_frozen === isFrozen && fieldItem?.template_field_id == headerItem?.id) {
            if (headerItem?.attributes?.associated_class_name === 'AccountBlock::Account') {
                return (<TableCell
                    align="left"
                    size="small"
                    key={headerindex}
                    style={{ ...webStyle.tableCell, width: 'auto', backgroundColor: this.renderDynamicBG(fieldItem), padding: '0px 10px' }}
                >
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"

                        value={fieldItem?.data}
                        disableUnderline
                        style={{ maxWidth: "auto", cursor: 'pointer', color: 'black', }}
                        disabled
                        onClick={(e) => this.handleOpenTabelCellAcc(e.target, headerItem?.attributes?.field_values, headerItem?.attributes?.associated_class_name, projectItem, headerItem?.id)}
                    >
                        <MenuItem value="NA">NA</MenuItem>
                        {this.createOptions(headerItem?.attributes?.field_values, headerItem?.attributes?.associated_class_name)?.map((i: any, index: number) => {
                            return (

                                <MenuItem style={{ maxWidth: "auto", cursor: 'pointer', color: 'black',display:"flex" }}
                                    key={index}

                                    value={i.value}>
                                    <div className="designerselect">
                                    <span style={{...webStyle.accNameInitials, marginRight: 3}}>
                                        {this.returnInitials(i.label)}
                                    </span>&nbsp;
                                    <span>{i.label}</span>
                                    </div>
                                </MenuItem>)
                        }
                        )}
                    </Select>
                </TableCell>)
            }
            if (headerItem?.attributes?.field_type == 'Dropdown' && headerItem?.attributes?.field_name !== 'Type' && headerItem?.attributes?.field_name !== 'Finulent Status') {
                return (<TableCell
                    align="left"
                    size="small"
                    key={headerindex}
                    style={{ ...webStyle.tableCell, backgroundColor: this.renderDynamicBG(fieldItem), padding: '0px 10px' }}
                >
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={fieldItem?.data}
                        disableUnderline
                        style={{ maxWidth: isFrozen ? "5vw" : "auto" }}
                        onChange={(e: any) => this.handleEditProject(e.target.value, headerItem?.id, projectItem?.id)}
                    >
                        {this.createOptions(headerItem?.attributes?.field_values, headerItem?.attributes?.associated_class_name)?.map((i: any, index: number) => {
                            return (<MenuItem key={index} value={i.value}>{i.label}</MenuItem>)
                        }
                        )}
                    </Select>
                </TableCell>)
            }
            else if (headerItem?.attributes?.field_type == 'Calendar') return (
                <TableCell
                    align="left"
                    size="small"
                    key={headerindex}
                    style={{ ...webStyle.tableCell, backgroundColor: this.renderDynamicBG(fieldItem) }}
                >
                    <Typography style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-evenly' }}><span>{moment(fieldItem?.data)?.format('DD MMM YY')}</span>&nbsp;<span><CalendarTodayIcon style={{ opacity: 0.7 }} /></span></Typography>
                </TableCell>
            );
            else return (
                <TableCell
                    align="left"
                    size="small"
                    key={headerindex}

                    style={{ ...webStyle.tableCell, backgroundColor: this.renderDynamicBG(fieldItem)} }
                >
                    <Typography>{fieldItem?.display_value || fieldItem?.data || 'NA'}</Typography>
                </TableCell>)
        }
    }

    renderEmptyCell = (projectItem: any, headerItem: any, headerindex: any, isFrozen: any) => {
        if (headerItem?.attributes?.associated_class_name === 'AccountBlock::Account') {
                    return (<TableCell
                        align="left"
                        size="small"
                        key={headerindex}
                        style={{ ...webStyle.tableCell, padding: '0px 10px', backgroundColor:(localStorage.getItem('user_type')=='Superadmin'?"white":"e8e8e8")}}
                    >
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={"NA"}
                            disableUnderline
                            style={{ maxWidth: isFrozen ? "5vw" : "auto", cursor: 'pointer', color: 'black', display:"flex"}}
                            disabled
                            onClick={(e) => this.handleOpenTabelCellAcc(e.target, headerItem?.attributes?.field_values, headerItem?.attributes?.associated_class_name, projectItem, headerItem?.id)}
                        >
                            <MenuItem value="NA" className="designerselect">NA</MenuItem>
                            {this.createOptions(headerItem?.attributes?.field_values, headerItem?.attributes?.associated_class_name)?.map((i: any, index: number) => {
                                return (<MenuItem key={index} value={i.value} className="designerselect">{i.label}</MenuItem>)
                            }
                            )}
                        </Select>
                    </TableCell>)
                }
        else return (
                <TableCell
                    align="left"
                    size="small"
                    key={headerindex}
                    style={(localStorage.getItem('user_type') == 'Superadmin' ? webStyle.tableCell : webStyle.tableAdminCell)}
                >
                    <Typography></Typography>
                </TableCell>)
    }

    renderTabelCell = (projectItem: any, headerItem: any, headerindex: any, isFrozen: boolean) => {
        if (projectItem?.missingKeysInProject?.includes(headerItem?.id) && headerItem?.attributes?.is_frozen === isFrozen) {
            return this.renderEmptyCell(projectItem, headerItem, headerindex, isFrozen);
        }
        else return projectItem?.attributes?.project_data?.map((fieldItem: any) => {
            return this.renderFilledCell(projectItem, headerItem, headerindex, isFrozen, fieldItem);
        })
    }

    renderProjectListTabel = () => {
        if (this.state.loading) return (<Box style={webStyle.loader}><CircularProgress size={50} /></Box>)
        else if (this.state?.projectListAllData?.projects?.length) return (<Box style={{ minHeight: '55vh' }} sx={{ bgcolor: "#e8e8e8", p: 2 }}>
            <div style={webStyle.secondbtn}>
                <SearchBar
                    placeholder="Search"
                    value={this.state.searchTerm}
                    onChange={(e) => this.handleSearch(e)}
                    onCancelSearch={() => this.cancelSearch()}
                />
                <div style={{ justifyContent: "end" }}>
                    <Link onClick={() => this.handleClearAllFilters()} style={localStorage.getItem('user_type') == 'Superadmin' ? webStyle.quickLink : webStyle.adminquickLink} underline="none">Clear Quick Filter</Link>
                    <Button disabled={!this?.state?.selectedProjects?.length} onClick={() => this.deleteProjects()} variant="contained" style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.deletebtn : webStyle.admindeletebtn}>
                        Delete Selected
                    </Button>
                </div>
            </div>
            <Box>
                <div style={webStyle.cardContent}>
                    <div  style={{display:"flex",flexDirection:"row",}}>
                        {this.renderStickyTabel()}
                        {this.renderNonStickyTable()}
                    </div>
                    <Pagination style={{ alignSelf: 'center', marginTop: 40}} page={this.state?.paginationPage} onChange={(e, value) => this.handlePagination(value)} count={this.state?.projectListAllData?.meta?.total_pages} />
                </div>
            </Box>
        </Box>)
        else return (<Box style={{ minHeight: '55vh' }} sx={{ bgcolor: "#e8e8e8", p: 2 }}>
                        <div style={webStyle.secondbtn}>
                <SearchBar
                    placeholder="Search"
                    value={this.state.searchTerm}
                    onChange={(e) => this.handleSearch(e)}
                    onCancelSearch={() => this.cancelSearch()}
                />
                <div style={{ justifyContent: "end" }}>
                    <Link onClick={() => this.handleClearAllFilters()} style={localStorage.getItem('user_type') == 'Superadmin' ? webStyle.quickLink : webStyle.adminquickLink} >Clear Quick Filter</Link>
                    <Button onClick={() => this.deleteProjects()} variant="contained" style={localStorage.getItem('user_type') == "Superadmin" ? webStyle.deletebtn : webStyle.admindeletebtn}>
                        Delete Selected
                    </Button>
                </div>
            </div>
            <div style={webStyle.noData}>No Data Found</div>
        </Box>)
    }

    returnDateRangeFilterModal = () => {
        return (<Modal
            className="modal-backdrop"
            open={this.state.isOpenDateFilterModal !== 'CLOSE'}
            onClose={this.handleCancelBtn}
            style={{
                overflow: "auto",
            }}
        >
            <div
                style={webStyle.dateFilterStyle}
            >
                <div style={webStyle.mainModalStyle}>
                <h1 style={webStyle.modalHeadStyle}>{this.state.isOpenDateFilterModal === 'DATE_FILTER' ? 'Date Filter' : 'Download Complete Data'}</h1>
                <CloseIcon onClick={this.handleCancelBtn}/>
                </div>

                    <Divider/>
                    <h3 style={webStyle.modalSecondHeadStyle}>Please select the date range {this.state.isOpenDateFilterModal === 'DATE_FILTER' ? '' : 'to download'}</h3>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <InputLabel style={webStyle.dateHeader}>From</InputLabel>
                        <MuiPickersUtilsProvider
                            utils={MomentUtils}
                            style={{ background: "orange" }}
                        >
                            <ThemeProvider theme={materialTheme}>
                                <DatePicker
                                    keyboard
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    maxDate={new Date().setDate(new Date().getDate() )}
                                    placeholder="MM/DD/YYYY"
                                    format={"MM/DD/YYYY"}
                                    style={{backgroundColor:"white"}}
                                    mask={(value) =>
                                        value
                                            ? [
                                                /\d/,
                                                /\d/,
                                                "/",
                                                /\d/,
                                                /\d/,
                                                "/",
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                            ]
                                            : []
                                    }
                                    value={this.returnDateValue('start')}
                                    onChange={(e) => this.handleDateChange(e, 'start')}
                                    disableOpenOnEnter
                                    animateYearScrolling={false}
                                    autoOk={true}
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item sm={6}>
                        <InputLabel style={webStyle.dateHeader}>To</InputLabel>
                        <MuiPickersUtilsProvider
                            utils={MomentUtils}
                            style={{ background: "orange" }}
                        >
                            <ThemeProvider theme={materialTheme}>
                                <DatePicker
                                    keyboard
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    maxDate={new Date().setDate(new Date().getDate() )}
                                    placeholder="MM/DD/YYYY"
                                    format={"MM/DD/YYYY"}
                                    mask={(value) =>
                                        value
                                            ? [
                                                /\d/,
                                                /\d/,
                                                "/",
                                                /\d/,
                                                /\d/,
                                                "/",
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                            ]
                                            : []
                                    }
                                    value={this.returnDateValue('end')}
                                    onChange={(e) => this.handleDateChange(e, 'end')}
                                    disableOpenOnEnter
                                    animateYearScrolling={false}
                                    autoOk={true}
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                <Divider />

                        <div style={{ padding: "20px", display: "flex", justifyContent: "end" }}>
                            {this.renderCancelOrRemoveButton(() => this.handleRemoveFilter(), () => this.handleCancelBtn())}
                            <Button
                                disabled={!this.state.fromDate || !this.state.toDate}
                                onClick={() => this.handleDateFilterAdd()}
                                style={localStorage.getItem('user_type') == 'Superadmin' ? webStyle.addpopbtn : webStyle.adminaddpopbtn}
                            // style={{ backgroundColor: "#0096FF " }}
                            >
                                {this.state.isOpenDateFilterModal === 'DATE_FILTER' ? 'Add' : 'Download'}
                            </Button>
                        </div>
                    </Grid>

                </Grid>
            </div>
        </Modal>)
    }

    renderCancelOrRemoveButton = (removeCallBack: any, cancelCallBack: any) => {
        const foundFilter = this.state.filterData.find((i: any) => i.template_field_id == this.state.selectedFilterId);
        if (foundFilter && (this.state.isOpenDateFilterModal !== 'DOWNLOAD_COMPLETE_DATA')) return (
            <Button onClick={() => removeCallBack()} style={webStyle.cancelCalenderBtn}>
                Remove
            </Button>
        )
        else return (
            <Button onClick={() => cancelCallBack()} style={webStyle.cancelCalenderBtn}>
                Cancel
            </Button>
        )
    }

    returnNumberFilterModal = () => {
        return (<Modal
            className="modal-backdrop"
            //   open={false}
            open={this.state.isOpenNumberFilterModal}
            onClose={this.handleCancelBtn}
            style={{
                overflow: "auto",
            }}
        >
            <div
                // className="modal-successcontent"
                style={{
                    zIndex: 10,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    width: "25%",
                    // height: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    overflow: "auto",
                    borderRadius:"5px"
                    // padding:"20px"
                }}
            >
                <Grid>
                    <div
                        style={{ textAlign: "center" }}
                    >
                        <div className="confirm-heading" style={{ padding: "10px" }} >
                            <Typography style={{ fontWeight: 900,marginLeft:"10px" }}>{(this.state.errorText)} filter</Typography>
                            <CloseIcon onClick={this.handleCancelBtn} />
                        </div>
                        <Divider />
                         <p style={webStyle.range}>Enter range</p>
                        {/* <InputLabel style={webStyle.modalhead}>Enter range</InputLabel> */}
                        <div style={{ padding: "20px", display: "flex", gap: "10px", alignItems: "left", justifyContent: "left" }} className="confirmbody">

                            <div>
                                <InputLabel style={webStyle.modalhead}>From</InputLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    placeholder="0"
                                    type="number"
                                    name="firstname"
                                    style={{ marginTop: "10px" }}
                                    value={this.returnNumValue('start')}
                                    onChange={(e) => this.handleNumChange(e.target.value, 'start')}
                                />
                            </div>
                            <div>
                                <InputLabel style={webStyle.modalhead}>To</InputLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    placeholder="To"
                                    type="number"
                                    name="firstname"
                                    style={{ marginTop: "10px" }}
                                    value={this.returnNumValue('end')}
                                    onChange={(e) => this.handleNumChange(e.target.value, 'end')}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div style={{ padding: "20px" }}>
                            {this.renderCancelOrRemoveButton(() => this.handleRemoveFilter(), () => this.handleCancelBtn())}
                            <Button
                                disabled={this.state.fromNumberFilter === "" || this.state.toNumberFilter === "" || this.state.toNumberFilter === 0}
                                onClick={() => this.handleNumberFilterAdd()}
                                style={localStorage.getItem('user_type') == 'Superadmin' ? webStyle.addpopbtn : webStyle.adminaddpopbtn}
                            >
                                Apply
                            </Button>
                        </div>
                        {/* </div> */}
                    </div>
                </Grid>
            </div>
        </Modal>)
    }

    returnSelectFilterModal = () => {
        return (
            <Menu
                style={webStyle.dropDownFilterMenu}
                keepMounted={true}
                // @ts-ignore
                anchorEl={this.state.menuAnchorEl}
                id="account-menu"
                open={this.state.menuAnchorEl != null ? true : false}
                onClose={() => this.setState({ menuAnchorEl: null, filterTypeDDSearchText: "", filterTypeDDOptionsBySearch: [], filterTypeDDOptions: [] })}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
                <MenuItem style={{background: 'white', width: '100%', display: 'flex', justifyContent: 'center' }} disableTouchRipple={true}>
                    <SearchBar
                        style={{ width: '200' }}
                        placeholder="Search"
                        onChange={(e) => this.filterMenuOptions(e, 'header')}
                        value={this.state.filterTypeDDSearchText}
                        // @ts-ignore
                        onKeyDown={(e: any): void => {
                            if (e.key !== "Escape") {
                                e.stopPropagation();
                            }
                        }}
                        onCancelSearch={() => this.setState({filterTypeDDOptionsBySearch: this.state.filterTypeDDOptions})}
                    />
                </MenuItem>
                {this.state?.filterTypeDDOptionsBySearch?.map((i: any, key: number) =>
                    <MenuItem  disableTouchRipple={true} key={key}><Checkbox checked={this.returnIfFilterIsApplied(i)} onChange={() => this.handleSelectFilterValueChange(i)} />{i.label}</MenuItem>)}
            </Menu>
        )
    }

    returnTextFilterModal = () => {
        return (<Modal
            className="modal-backdrop"
            //   open={false}
            open={this.state.codeModal}
            onClose={this.handleCancelBtn}
            style={{
                overflow: "auto",
            }}
        >
            <div
                // className="modal-successcontent"
                style={{
                    zIndex: 10,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    width: "25%",
                    // height: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    overflow: "auto"
                    // padding:"20px"
                }}
            >
                <Grid>
                    <div
                        style={{ textAlign: "center" }}
                    >
                        <div className="confirm-heading" style={{ padding: "10px" }} >
                            <Typography style={{ fontWeight: 900 }}>{(this.state.errorText)?.replace(this.replaceUndersocotWithSpace, " ")?.replace(this.replaceCaseFormation, letter => letter?.toUpperCase())} Enter Code</Typography>
                            <CloseIcon onClick={this.handleCancelBtn} />
                        </div>
                        <Divider />
                        <div style={{ padding: "20px", display: "flex", gap: "10px", alignItems: "left", justifyContent: "left" }} className="confirmbody">
                            <div>
                                <InputLabel
                                    style={webStyle.modalhead}

                                >
                                    Code
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    placeholder="Enter Code"
                                    type="text"
                                    name="lastname"
                                //   value={this.state.lastname}
                                //   onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div style={{ padding: "20px" }}>
                            <Button
                                onClick={this.handleCancelBtn}
                                style={webStyle.cancelbtn}
                            // className="cancelbtn"
                            >
                                Cancel
                            </Button>
                            <Button
                                // onClick={() => this.handleYes()}
                                style={localStorage.getItem('user_type') == 'Superadmin' ? webStyle.addpopbtn : webStyle.adminaddpopbtn}
                            // style={{ backgroundColor: "#0096FF " }}
                            >
                                Add
                            </Button>
                        </div>
                        {/* </div> */}
                    </div>
                </Grid>
            </div>
        </Modal>)
    }

    // Customizable Area End

    render() {
        // Customizable Area Start
        // Customizable Area End
        return (
            // Customizable Area Start
            <>
                <Box style={webStyle.background}>
                    <Box style={webStyle.content} className="background-content">
                        {this.renderHeader()}
                        <Divider />
                        {this.renderActionButtons()}
                        {this.renderProjectListTabel()}
                    </Box>
                </Box>
                {this.returnDateRangeFilterModal()}
                {this.returnSelectFilterModal()}
                {this.returnNumberFilterModal()}
                {this.returnTextFilterModal()}
                {this.searchableMenuForAccounts()}


            </>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const webStyle = {
    modalRoot: {
        display: "flex",
        gap: 1,
        fontSize: "16px",
        justifyContent: "center",
        borderBlockStart: "1px solid #ccc",
        paddingBlock: "2rem", //
        backdropFilter: "blur(5px)",
        overflow: "scroll",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    cancelbtn: {
        color: "black",
        marginLeft: "15px",
        padding: "10px 35px 10px 35px ",
        fontFamily: "sans-serif",
        fontSize: 16,
        textTransform: "none",
        width: "40%",
        fontWeight: "bold",
        /* height: 30%; */
        backgroundColor: "#e8e8e8",
    } as React.CSSProperties,
    secondbtn: {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 0px 20px 0px",
    } as React.CSSProperties,
    background: {
        backgroundColor: "white",
        // height: "100vh",
        fontFamily: "sans-serif",
    },
    content: {
        top: "50px",
        right: "0px",
        width: "85vw",
        height: "fit-content",
        padding: "50px 20px 10px",
        justifyContent: "space-between",
    },

    pageheader: {
        display: "flex",
        justifyContent: "space-between",
    },
    btn: {
        color: "rgb(0, 150, 255)",
        textTransform: "none",
        marginRight: "20px",
        boxShadow:"none",
        outline:0
    } as React.CSSProperties,
    adminbtn: {
        color: "orange",
        textTransform: "none",
        marginRight: "20px"
    } as React.CSSProperties,
    deletebtn: {
        backgroundColor: "rgb(0, 150, 255)",
        color: "white",
        textTransform:"none",
        fontFamily: "sans-serif",
        fontWeight:"bold",
        fontSize:14
    } as React.CSSProperties,
    admindeletebtn: {
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
        // backgroundColor: "rgb(0, 150, 255)",
        color: "black",
        textTransform:"none",
        fontFamily: "sans-serif",
        fontWeight:"bold",
        fontSize:15
    } as React.CSSProperties,
    quickLink: {
        marginRight: "10px",
        // color: "rgb(0, 150, 255)",
        color: "grey",
        cursor: 'pointer'
    },
    modalHeadStyle:{
        fontFamily: "sans-serif",
        fontWeight:"bold",
        fontSize:16,
        alignItems:"left"
    } as React.CSSProperties,
    modalSecondHeadStyle:{
        fontFamily: "sans-serif",
        fontWeight:"bold",
        fontSize:14,
        color:"grey"
    } as React.CSSProperties,


    pagename: {
        display: "flex",
        // flexDirection: row,
    },
    modalhead: {
        fontFamily: "sans-serif",
        color: "#6a6f7a",
        marginBottom: 10,
        fontWeight: 700,
        fontSize: "16px",
        textAlign: "left",
        marginTop: "15px",
        alignItems: "left"
    } as React.CSSProperties,

    arrowbox: {
        backgroundColor: "#eeeeee",
        width: 35,
        height: 35,
        margin: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
    },
    addpopbtn: {
        color: "white",
        marginLeft: "15px",
        padding: "10px 45px 10px 45px ",
        fontFamily: "sans-serif",
        fontSize: 16,
        textTransform: "none",
        width: "40%",
        fontWeight: "bold",
        backgroundColor: "#0096FF "
        /* height: 30%; */
        //   backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    } as React.CSSProperties,
    adminaddpopbtn: {
        color: "black",
        marginLeft: "15px",
        padding: "10px 45px 10px 45px ",
        fontFamily: "sans-serif",
        fontSize: 16,
        textTransform: "none",
        width: "40%",
        fontWeight: "bold",
        // backgroundColor: "#0096FF "
        /* height: 30%; */
        backgroundImage: "radial-gradient(rgb(246 168 34), rgb(171 114 24))",
    } as React.CSSProperties,
    arrow: {
        // backgroundColor: "#eeeeee",
        width: 20,
        height: 20,
        // marginLeft: 30,
        // borderRadius: 8,
    },

    title: {
        margin: 10,
        marginTop: 2,
        color: "#42454e",
        // fontFamily: "Open Sans",
        fontSize: "20px",
        fontWeight: 100,
    },

    breadcrumb: {
        marginLeft: 10,
        marginTop: -10,
    },

    savebutton: {
        marginRight: 10,
        width: "193px",
        height: "50px",
        borderradius: "8px",
        background: "#e8e8e8",
    },

    nextbutton: {
        width: "193px",
        height: "50px",
        borderradius: "4px",
        background: "#4eabf8",
    },
    range:{
        fontFamily: "sans-serif",
        fontSize: 16,
        textAlign:"left",
        marginLeft:"20px"
    } as React.CSSProperties,

    cardContent: {
        margin: "20px 0px",
        display: 'flex',
        flexDirection: 'column',
    } as React.CSSProperties,

    cardContentOption: {
        margin: "20px 0px",
    },

    secondrowbutton: {
        color: "#0096ff",
    },

    tablescroll: {
        overflowX: "scroll",
    },
    gridMargin: { marginBlockEnd: "0" },
    gridLess: { paddingInline: 0 },
    gridMore: { paddingInline: "1rem" },
    uploadImage: {
        padding: "5rem",
        border: "2px dashed rgba(155, 155, 155, .2)",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    filterContainer: {
        // height: "5rem",
        paddingBlock: ".5rem",
        overflow: "scroll",
    },
    formTypography: {
        paddingBlockEnd: 1,
        marginBottom: "5px",
        fontSize: "14px",
        fontWeight: 600,
        color: "#424242",
    },
    modalCardCancelButton: {
        backgroundColor: "rgba(230, 230, 230, 1)",
        borderRadius: "4px",
        textTransform: "none",
        width: "100px",
        fontWeight: 500,
    } as React.CSSProperties,
    modalCardCancelButtonSuccess: {
        backgroundColor: "rgba(230, 230, 230, 1)",
        borderRadius: "4px",
        textTransform: "none",
        fontWeight: 500,
    } as React.CSSProperties,
    modalCardActionButton: {
        backgroundColor: "#42a5f5",
        color: "white",
        borderRadius: "4px",
        width: "100px",
        textTransform: "none",
    } as React.CSSProperties,
    modalCardActionsContainer: { display: "flex", gap: "0.5rem" },
    modalCardActions: {
        display: "flex",
        justifyContent: "flex-end",
        paddingInline: "1rem",
    },
    modalCardContent: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        fontSize: "16px",
    } as React.CSSProperties,
    sequenceModalCardContent: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "1rem",
        paddingRight: "1rem",
        fontSize: "16px",
    } as React.CSSProperties,

    modalCardHeader: {
        // borderBottom: "1px solid #ccc",
        paddingInline: "1rem",
    },
    modalCardHeaderText: {
        fontWeight: 600,
    },
    modalCardRoot: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        minHeight: "50%",
        maxHeight: "80%",
        fontSize: "16px",
        overflowY: "scroll",
    } as React.CSSProperties,
    modalBackdropProps: {
        backgroundColor: "rgba(0, 0, 0, .7)",
        backdropFilter: "blur(10px)",
    },
    titleText: {
        fontSize: "medium",
        fontWeight: 600,
        textAlign: "center",
    } as React.CSSProperties,
    titleButtonStyle: {
        textTransform: "none",
        backgroundColor: "#42a5f5",
        color: "white",
    } as React.CSSProperties,
    alignRoot: {
        display: "grid",
        gridTemplateColumns: "15vw minmax(85vw, auto)",
    } as React.CSSProperties,
    secondaryGrid: {
        border: "none",
        gap: "1rem",
    },
    rootContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
    } as React.CSSProperties,
    mainGrid: {
        flexGrow: 1,
        backgroundColor: "rgba(200, 200, 200, .5)",
        zIndex: -1,
    },
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem", //
        height: 450,
    },
    cardActions: {
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBlockStart: "1px solid #ccc",
        minHeight: "60px",
    },
    alert: {
        display: "flex",
        position: "fixed",
        top: 80,
        right: 1,
        zIndex: 4000,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    } as React.CSSProperties,
    gutter: {
        marginBlockEnd: "0.4rem",
    },

    loadingRoot: {
        display: "flex",
        flexDirection: "column",
    } as React.CSSProperties,
    loadingGutter: {
        marginBlockEnd: 4,
    },
    skeletonStart: { paddingTop: "40%", marginBlockEnd: 6 },
    skeletonEnd: { paddingTop: "10%", marginBlockStart: 6 },
    circularRoot: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    progressCircle: {
        color: "#6e6e6e",
    },
    badgeButton: {
        borderRadius: "6px",
        textTransform: "none",
        backgroundColor: "rgba(222, 227, 230, 1)",
    } as React.CSSProperties,
    badgeTypography: {
        paddingBlock: ".2rem",
        paddingInline: ".3rem",
    },

    badgeCardRoot: {
        height: "200px",
        width: "100%",
    },

    workspaceAvatar: { width: 32, height: 32 },
    workspaceCardRoot: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        padding: "1rem",
        height: 450,
    } as React.CSSProperties,
    workspaceIconButton: { padding: "1rem" },
    workspaceStyledCard: { height: "175px" },
    workspaceId: {
        fontSize: "small",
    },
    workspaceName: { fontWeight: 600, fontSize: "medium" },
    descriptionContainer: {
        height: "100px",
        overflow: "scroll",
    },

    formRoot: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(155, 155, 155, .5)",
        gap: "0.1rem",
        borderRadius: "4px",
        paddingInline: "8px",
        paddingBlock: "0.2rem",
        color: "rgba(155, 155, 155, 1)",
    },
    formActivePick: { backgroundColor: "#42a5f5", color: "#fff" },
    formAvatar: { width: 32, height: 32, backgroundColor: "#5f5f5f" },
    formTextContainer: { cursor: "pointer" },
    formToolTypography: {
        display: "flex",
        flexWrap: "nowrap",
        fontSize: "small",
    } as React.CSSProperties,

    hide: {
        display: "none",
    },
    secondaryModalRoot: {
        display: "flex",
        gap: 1,
        fontSize: "16px",
        justifyContent: "center",
        borderBlockStart: "1px solid #ccc",
        backdropFilter: "blur(5px)",
        overflow: "scroll",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    modalCardRootSuccess: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: "37%",
        maxHeight: 300,
        fontSize: "16px",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "0",
    } as React.CSSProperties,
    secondaryModalCardContent: {
        padding: 0,
    },

    secondaryModalContentContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "16px",
        alignItems: "center",
    } as React.CSSProperties,

    modalImageBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        width: "200px",
        height: "100px",
        aspectRatio: "1/1",
        marginBlockEnd: "25px",
    },
    modalSucessTextContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "16px",
    } as React.CSSProperties,
    descriptionText: {
        fontSize: "16px",
    },
    modalFormControl: {
        // border: "none",
        // textDecorationColor: "purple",
        // textDecoration: "none",
    } as React.CSSProperties,
    modalTextField: {
        borderRadius: "4px",
        paddingBlock: "18px",
        paddingInline: "14.5px",
        fontSize: "16px",
        border: "1px solid rgba(0, 0, 0, .3)",
    },
    modalTextArea: {
        paddingBlock: "18px",
        paddingInline: "14.5px",
        boxSizing: "border-box",
        border: "1px solid rgba(0, 0, 0, .3)",
        borderRadius: "4px",
        fontSize: "16px",
        resize: "none",
        fontFamily: "sans-serif",
    } as React.CSSProperties,

    modalTextAreaError: {
        paddingBlock: "18px",
        paddingInline: "14.5px",
        boxSizing: "border-box",
        borderRadius: "4px",
        fontSize: "16px",
        resize: "none",
        fontFamily: "sans-serif",
        backgroundColor: "#fdf5f5",
        border: "1px solid red",
    } as React.CSSProperties,

    modalTextFieldError: {
        borderRadius: "4px",
        paddingBlock: "18px",
        paddingInline: "14.5px",
        fontSize: "16px",
        backgroundColor: "#fdf5f5",
        border: "1px solid red",
    },
    modalFormHelper: {
        paddingBlock: "0",
        paddingInline: "0",
    },
    modalFormHelperImage: {
        alignSelf: "center",
        paddingBlock: "0",
        paddingInline: "0",
    },
    excessIcon: {
        color: "white",
    },
    adminquickLink: {
        marginRight: "10px",
        color: "grey",
        cursor: 'pointer'
    },
    noData: {
        height: '55vh',
        display: 'grid',
        placeItems: 'center'
    } as React.CSSProperties,
    loader: {
        minHeight: '55vh',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    } as React.CSSProperties,
    tableHead: {
        width:"3px",
        height:"100px",
        // maxWidth:"3vw",
        backgroundColor: localStorage.getItem('user_type') == "Superadmin" ? "darkgrey" : "orange",
        // borderRadius:"2px solid black"
    } as React.CSSProperties,
    tableNonHead: {
        // width:"3px",
        // minHeight:"50vh",
        // maxWidth:"3vw",
        height:"100px",
        backgroundColor: localStorage.getItem('user_type') == "Superadmin" ? "darkgrey" : "orange",
        // borderRadius:"2px solid black"
    } as React.CSSProperties,

    tableHeadSticky: {
        background: 'white',
        padding: 0,
        width: 200,
    } as React.CSSProperties,
    tableCellSticky: {
        background: 'white',
        width: 200,
        padding: 0,
        border: 'none'
    } as React.CSSProperties,
    tableCell: {
        background: 'white',
        border: "1px solid #BDBDBD",
        height:"10vh"
    } as React.CSSProperties,
    tableAdminCell: {
        background: '#e8e8e8',
        border: "1px solid #BDBDBD",
        height:"10vh",

    } as React.CSSProperties,
    dateHeader:{
        fontFamily: "sans-serif",
        fontSize:16,
        fontWeight:600,
        marginTop:"10px",
        paddingBottom:"20px"
    } as React.CSSProperties,
    cancelCalenderBtn:{
        color: "black",
        marginLeft: "15px",
        padding: "10px 45px 10px 45px ",
        fontFamily: "sans-serif",
        fontSize: 16,
        textTransform: "none",
        width: "40%",
        fontWeight: "bold",
        /* height: 30%; */
        backgroundColor: "#e8e8e8",
    } as React.CSSProperties,
    dropDownFilterMenu:{
        boxSizing: 'border-box',
        maxHeight: 400,
        width: 'auto',
        overFlowY: 'auto'
    } as React.CSSProperties,
    dateFilterStyle:{
        zIndex: 10,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        // alignItems: "center",
        // gap: "20px",
        overflow: "auto",
        padding: "20px"
    } as React.CSSProperties,
    accNameInitials:{
        background: "darkgrey",
        width: "35px",
        height: "35px",
        // fontSize: 13,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginRight: 10
    } as React.CSSProperties,
    mainModalStyle:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
    } as React.CSSProperties
};
// Customizable Area End
