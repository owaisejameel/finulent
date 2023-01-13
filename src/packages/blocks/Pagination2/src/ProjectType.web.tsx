import React from "react";
import PhoneInput from "react-phone-input-2";
import MomentUtils from "@date-io/moment";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from "material-ui-pickers";
import "./projecttype.css"
import Avatar from "@material-ui/core/Avatar";
import GenericSuccessModal from "../../ContentManagement/src/GenericSuccessModal.web";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import {
    Container,
    Box,
    Button,
    Input,
    Typography,
    IconButton,
    Checkbox,
    InputLabel,
    TextField,
    InputAdornment,
    Grid,
    Paper,
    TextareaAutosize,
    Select,
    MenuItem,
    Divider,
    Modal,
    FormControl,
    TableContainer,
    TablePagination,
    Link,
    CircularProgress,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,

    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../../dashboard/src/Sidebar.web";
import SearchBar from "material-ui-search-bar";
import FilterAltIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearIcon from '@material-ui/icons/Clear';
// import "./invoice.css";
// Customizable Area End

import ProjectTypeContentController, { Props } from "./ProjectTypeController";

import { widthFromPercentage } from "../../../framework/src/Utilities";
import { classNames } from "react-select/src/utils";

// const  isLoggedIn = localStorage.getItem('token')

export default class ProjectType extends ProjectTypeContentController {
    // static get isLoggedIn(){
    //     return {isLoggedIn:localStorage.getItem('token')}
    // }

    constructor(props: Props) {
        super(props);
    }
    handleEdit = () => {
        this.setState({ isEdit: true, subEdit: false });
    };
    handleCancelbtn = () => {
        this.setState({ isEdit: false });
    };

    handleCodeChange = (e: any) => {
        const val = {
            ...this.state,
            [e.target.name]: e.target.value,
        };
        this.setState(val);
    }


    handleAddProjectCode = () => {

        this.setState({ projectCode: "", open: true, subEdit: true,selectedColor: "", typeName: "", page: true, templateErr: false  })
    }
    modalClose = () => {
        this.setState({ isSuccessModal: false, modalMsg: "" });
    };
    handleProjectTypeClose = () => {
        this.setState({ open: false, isEdit: false, subEdit: false, selectedColor: "", typeName: "", page: true, templateErr: false })
    }
    successErrModalBody = () => (
        <>
            <div>
                <Typography
                    className="success-message-modal"
                >
                    {/* {this.state.isEditMode ? "User Updated Succesfully!": } */}
                    {this.state.modalMsg && this.state.modalMsg}

                </Typography>


            </div>
        </>
    );
    editProjectTypeModal = (e: any, id: any) => {
        this.setState({ open: true, isEdit: true, projectId: id, subEdit: false })
        this.state.allData?.map((item: any) => {
            if (item.id === id) {

                this.setState((prev) => {
                    return {
                        ...prev,

                        typeName: item.attributes.project_type,
                        selectedColor: item.attributes.colour
                    }
                })

            }
        })
    }
    editCode = (e: any, name: any, id: any) => {

        this.setState({ isEdit: true, selectedName: name, workspaceId: id });
    }

    handleChange = (e: any) => {
        const val = {
            ...this.state,
            [e.target.name]: e.target.value,
        };
        this.setState(val);
    }
    handleSelectColor = (item: any) => {
        this.setState({ selectedColor: item.attributes.code})
    }
    saveProjectType = () => {

        if (this.state.page) {
            this.setState({ page: false });
        }
        if (this.state.templateId === "") {
            this.setState({ templateErr: true })
        }
        if (this.state.typeName && this.state.selectedColor && this.state.templateId) {

            if (this.state.subEdit) {
                this.addProjectTypeAction()
            }
            else {
                this.updateProjectType()
            }
            this.setState({ open: false, isEdit: false, typeName: "", selectedColor: "", subEdit: false, templateErr: false, })
        }


    }
    addProjectType = () => (
        <Modal
            className="modal-designation-backdrop"

            open={this.state.open}
            // onClose={this.handleDesignationClose}
            style={{
                overflow: "auto",
            }}
        >
            <div
                className="modal-designation-content1"
                style={{ zIndex: 10, position: "absolute", height: "80vh" }}
            >
                <div className="designationcontent1">
                    <div className="headingdata1">
                        <div>
                            {this.state.subEdit ? <Typography className="mainheading">
                                Add Project Type
                            </Typography> : <Typography className="mainheading">
                                Edit Project Type
                            </Typography>}

                        </div>

                        <div>
                            <CloseIcon onClick={this.handleProjectTypeClose} />
                        </div>
                    </div>
                    <Divider />

                    <Box>
                        <Typography className="inputdesignationlabel"> Project Type</Typography>
                        <TextField

                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            placeholder="Type project type here"
                            type="text"
                            name="typeName"
                            value={this.state.typeName}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" />,
                            }}
                        />
                        {this.state.typeName === "" && !this.state.page && (
                            <>
                                <p
                                    className="errMsg"
                                >

                                    Project Type is required
                                </p>
                            </>
                        )}
                    </Box>
                    <Box>
                        <InputLabel className="inputLabel">Select Color</InputLabel>
                        <Box style={{ flexGrow: 1 }}>
                            <Grid container>
                                {this.state.colorsData && this.state.colorsData?.map((item: any) => (
                                    <Grid item xs={6} >
                                        <div onClick={() => this.handleSelectColor(item)} style={{ backgroundColor: item.attributes.code === this.state.selectedColor ? "#e8e8e8" : "white" }}>
                                            <Box className="color-mainbox" >
                                                <Box style={{ width: "25px", height: "25px", backgroundColor: `${item.attributes.code}` }}>

                                                </Box>
                                                <p className="colorfont">{item.attributes.code}</p>
                                            </Box>
                                        </div>
                                    </Grid>

                                ))}
                            </Grid>
                            {this.state.selectedColor === "" && !this.state.page && (
                                <>
                                    <p
                                        className="errMsg"
                                    >

                                        Select Color is required
                                    </p>
                                </>
                            )}
                        </Box>
                        {this.state.templateErr ? <p className="messageErr">Template Name required</p> : ""}
                    </Box>
                    <div className="divideradmin" >
                        <Divider />
                    </div>

                    <div style={{ textAlign: "end", marginBottom: "30px" }}>
                        <Button
                            onClick={this.handleProjectTypeClose}
                            className="btn-cancel-designation"

                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.saveProjectType}
                            className="btn-add-designation"
                        >
                            {this.state.subEdit ? "Add" : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )

    handleTemplateName = (id: any) => {

        this.setState({ templateId: id})
        this.getDataByTemplateName(id)
    }
    handleProjectTypeDelete = (e: any, id: any) => {
        this.setState({deleteId:id})
        this.deleteProjectType(id)

    }
    render() {
        // const { navigation } = this.props;
        // const isLoggedIn = localStorage.getItem("token");

        return (
            <>

                {this.state.open && this.addProjectType()}

                {this.state.isSuccessModal &&
                    <GenericSuccessModal
                        isOpen={this.state.isSuccessModal}
                        succesModalBody={this.successErrModalBody}

                        close={this.modalClose}
                    />
                }
                <Box
                    sx={{
                        height: "100%",
                        overflow: "scroll",
                        width: "85vw",
                        top: "50px",

                        right: 0,
                        boxSizing: "border-box",
                        padding: "50px 20px 10px 20px",
                        position: "absolute",

                        // spacing:2
                    }}
                    style={{ backgroundColor: "#e8e8e8" }}
                >
                    <Box

                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Typography className="terms-heading">
                            {this.state.isEdit
                                ? "Editing Types of Projects"
                                : "Types of Projects "}
                        </Typography>

                        <div className="maincodediv">
                            <Box>


                                    <div style={{ display: "flex" }}>
                                        <Button className="add-project" onClick={this.handleAddProjectCode}>Add project type</Button>

                                    </div>

                            </Box>
                        </div>
                    </Box>
                    <Grid>

                        {this.state?.templateData && this.state.templateData?.map((temp: any) => {

                            return (
                                <>
                                    <Button style={{ backgroundColor: this.state.templateId == temp.id ? "white" : "#D3D3D3 " }} className="template-btn" onClick={() => this.handleTemplateName(temp.id)}>{temp.attributes?.title}</Button>
                                </>
                            )
                        })}

                        <Box className="template-box table-data">
                            {this.state.isLoader ? <Box className="progres">  <CircularProgress style={{ color: "#6e6e6e" }} size={50} /> </Box> : <>
                                <div className="maindiv-table">
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead className="tableheadercolor">
                                                <TableRow>
                                                    <TableCell className="projecttypename" >S.no</TableCell>
                                                    <TableCell className="projecttypename">Type</TableCell>
                                                    <TableCell className="projecttypename" >Color</TableCell>
                                                    <TableCell  className="projecttypename"></TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {this.state.allData && this.state.allData?.map((row: any, index: any) => (
                                                    <TableRow
                                                        key={row}
                                                        style={{ backgroundColor: index >= 6 ? "white" : "#e8e8e8" }}
                                                    //  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >

                                                        <TableCell >{index + 1}</TableCell>
                                                        <TableCell>{row?.attributes?.project_type}</TableCell>
                                                        <TableCell>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                                <div style={{ width: "15px", height: "15px", backgroundColor: `${row?.attributes?.colour}`, borderRadius: "50%" }}>

                                                                </div>
                                                                {row?.attributes?.colour}
                                                            </div> </TableCell>
                                                        <TableCell>{index >= 6 ? (<><EditOutlinedIcon onClick={(e) => this.editProjectTypeModal(e, row.id)} />  <DeleteOutlinedIcon onClick={(e) => this.handleProjectTypeDelete(e, row.id)} /> </>) : ""}</TableCell>


                                                    </TableRow>
                                                ))}

                                            </TableBody>


                                        </Table>
                                    </TableContainer>
                                </div>


                            </>}

                        </Box>
                    </Grid>
                </Box>
            </>
        );
    }
}

const webStyle = {
    boxes: {
        marginTop: "10px",
    },
};
