import React from "react";
import "./autosuggestion.css"
import {

    Box,
    Button,
    Typography,
    InputAdornment,
    Modal,
    Grid,
    Divider,
    TextField
} from "@material-ui/core";

import SearchBar from "material-ui-search-bar";
import ClearIcon from '@material-ui/icons/Clear';
import GenericSuccessModal from "../../ContentManagement/src/GenericSuccessModal.web";

// import "./invoice.css";
// Customizable Area End

import AutoSuggestionController, { Props } from "./AutoSuggestionController";


export default class AutoSuggestion extends AutoSuggestionController {
    // static get isLoggedIn(){
    //     return {isLoggedIn:localStorage.getItem('token')}
    // }

    constructor(props: Props) {

        super(props);
    }

    handleEdit = () => {

        this.setState({ isEdit: true });


    };
    handleCancelbtn = () => {

        if (this.state.removeData.length > 0) {
            this.setState({ newResult: [...this.state.newResult, ...this.state.removeData] })
        }
        if (this.state.newNames.length > 0) {
            const filteredData = this.state.newResult.filter(((item: any) => {
                return this.state.newNames.indexOf(item) == -1
            }))
            this.setState({ newResult: filteredData, newNames: [] })
        }
        this.setState({ isEdit: false, page: true, removeData: [], });
    };
    saveTerms = () => {
        this.updateTermsConditions();
        this.setState({ isEdit: false });
    };
    handleChange = (e: any) => {
        const val = {
            ...this.state,
            [e.target.name]: e.target.value,
        };
        this.setState(val, () => {
            this.setState({
                sameValue: this.state.newResult.filter((item: any) => (
                    item.toLowerCase() == this.state.name.toLowerCase()
                )).length > 0 ? true : false
            })


        });

    }


    handleAddProjectCode = () => {
        if (this.state.page) {
            this.setState({ page: false });
        }

        if (this.state.name.length) {
            this.setState(({
                newResult: [...this.state.newResult, this.state.name], name: "", page: true,
                newNames: [...this.state.newNames, this.state.name]
            }))
        }


    }
    modalClose = () => {
        this.setState({ isSuccessModal: false, modalMsg: "" });
    };
    successErrModalBody = () => (
        <>
            <div>
                <Typography
                    className="success-message-modal"
                >

                    {this.state.modalMsg}

                </Typography>
            </div>
        </>
    );
    editCode = (e: any, name: any, id: any) => {

        this.getProjectCodeById(id)
        this.setState({ isEdit: true, selectedName: name });
    }

    handleCodeDelete = (code: any) => {
        const result = this.state.newResult.filter((item: any) => item != code)
        this.setState({ newResult: result, removeData: [...this.state.removeData, code] })

    }
    requestSearch = (e: any) => {
        this.setState({ search: e })
    };
    cancelSearch = () => {
        this.setState({ search: "" })
        this.requestSearch(this.state.search);
        this.setState({ search: "" })
    };
    handleSelectedType = (e: any) => {
        this.setState({ selectedType: e.target.value })
        this.getAll(e.target.value)
    }
    handleAutoSuggestionDelete = (code: any) => {
        let autosuggest = this.state.removeData.includes(code) ?
            (
                this.setState({ removeData: this.state.removeData.filter((item: any) => item !== code) })
            )
            : (this.state.removeData.push(code),
                this.setState({ selectedCode: code }))
        return autosuggest
    }

    handleSaveBtnCode = () => {
        if (this.state.removeData.length > 0) {
            this.deleteAuto()
            this.setState({ removeData: [] })

        } else {
            if (this.state.selectedType.length > 0 && this.state.newNames.length > 0) {
                this.handleAddSuggestion()
            }

        }
    }


    editAutoSuggestion = () => (
        <>
            <Grid className="edit-maingrid" xs={12}>
                <Box className="box-maingrid">
                    <Grid xs={12}>
                        <div className="subgrid" >
                            {this.state.newResult && this.state.newResult.filter((item: any) => {
                                if (!this.state.search) return true
                                if (item.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase())) return true
                            }).map((code: any) => {
                                console.log(code)
                                return (

                                    <div style={{ marginRight: "10px" }}>

                                        <Button onClick={() => this.handleCodeDelete(code)} variant="outlined" style={{ textTransform: "none" }} >
                                            {code}
                                            <ClearIcon />
                                        </Button>
                                    </div>

                                )
                            })}
                            <div>
                            </div>
                        </div>
                    </Grid>
                    <div>
                        <Typography className="add-auto-heading">{`Add ${this.state.selectedType}  Auto Suggestion`}</Typography>
                        <div className="input-add-code">
                            <TextField
                                variant="outlined"
                                size="small"
                                required
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }}
                            />

                            <div className="add-auto-btn-code">
                                <Button className="add-auto-code" onClick={this.handleAddProjectCode} disabled={this.state.sameValue} >Add |</Button>
                                <p className="add-auto-code" >Import Sample .CSV |</p>
                                <p className="add-auto-code" >Download Sample .CSV</p>
                            </div>

                        </div>
                        {this.state.name === "" && !this.state.page && (
                            <>
                                <p
                                    className="messageErr"

                                >

                                    Name is required
                                </p>
                            </>
                        )}
                        {this.state.sameValue && (
                            <>
                                <p
                                    className="messageErr"

                                >

                                    Same  Name is  there
                                </p>
                            </>
                        )}

                    </div>
                </Box>
            </Grid>

        </>
    )
    render() {

        return (
            <>

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
                                ? `Edit Auto Suggestions`
                                : `Auto Suggestions`}
                        </Typography>

                        <div className="maincodediv">
                            <Box>
                                {this.state.isEdit ? (
                                    <div className="subdiv-code-btn">
                                        <Button
                                            className="cancel-code-btn"
                                            onClick={this.handleCancelbtn}
                                        >
                                            Back
                                        </Button>
                                        <Button className="save-code-btn" onClick={this.handleSaveBtnCode}>
                                            Save
                                        </Button>
                                    </div>
                                ) : (
                                    <Button className="editcodebtn" onClick={this.handleEdit}>
                                        Edit
                                    </Button>
                                )}
                            </Box>
                        </div>
                    </Box>
                    <div style={{ display: "flex", }} onClick={(e) => this.handleSelectedType(e,)}>
                        <button className="btn-ahj" style={{ backgroundColor: this.state.selectedType == "AHJ" ? "white" : "#D3D3D3" }} value={"AHJ"} >AHJ</button>
                        <button className="btn-ahj" style={{ backgroundColor: this.state.selectedType == "Utilities" ? "white" : "#D3D3D3" }} value="Utilities">Utilities</button>
                    </div>

                    <Grid style={{ height: "100%", backgroundColor: "white", overflow: "scroll", marginTop: "20px" }}>
                        <Box style={{ marginTop: "20px" }} className="table-data1">

                            <SearchBar
                                placeholder={`Search ${this.state.selectedType}`}
                                value={this.state.search}
                                onChange={this.requestSearch}
                                onCancelSearch={this.cancelSearch}

                                style={{ width: "25vw" }}
                            />
                        </Box>
                        <p className="subhead-heading">{this.state.isEdit ? " " : `${this.state.selectedType} Auto Suggestions`}</p>
                        {this.state.isEdit ? this.editAutoSuggestion() :
                            <Box className="table-data1">
                                {this.state.newResult && this.state.newResult.filter((item: any) => {
                                    if (!this.state.search) return true
                                    if (item.toLocaleLowerCase()?.includes(this.state.search.toLocaleLowerCase())) return true
                                }).map((item: any) => (
                                    < div className="textdata"><p>{item}</p><Divider /></div>
                                ))}
                            </Box>
                        }

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
