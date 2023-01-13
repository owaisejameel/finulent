import React from 'react';
// Customizable Area Start
import {
    Box,
    Grid,
    Button,
    Link,
    Avatar,
} from "@material-ui/core";
import "../../../web/public/index.css";
import "./style.css";
import moment from "moment";
import UserProfileBasicController, { Props } from "./UserProfileBasicController";
// Customizable Area End

// Customizable Area Start
export default class UserProfileBlock extends UserProfileBasicController {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): any {
        let token = localStorage.getItem("token")
        if(token) {
            this.getUser()
            console.log("calling get user")
        }
        console.log("imagep", this.state.imagep)
    }

    handleEdit = () => {
        this.props.history.push("/profileupdate") 
    }

    handlePassword = () => {
        this.props.history.push("/changepassword")
    }

    handleChange = () => {
        this.props.history.push("/changepassword")
    }

    rendervalidationfunction = () => {
        if(this.state.ctrycd === null && this.state.phonen === null && this.state.cellno === null) {
            return <p style={webStyle.paragraph}>N/A</p>
        }
        else if(this.state.ctrycd === null && this.state.phonen === null && this.state.cellno != null) {
            return <p style={webStyle.paragraph}>+{this.state.cellno}</p>
        }
        else {
            return (<p style={webStyle.paragraph}>{this.state.mobnum}</p>)
        }
    }


    render() {
        return (

            <>
            <div style={webStyle.container} className="boxcontainer">
                <div style={webStyle.divnav}>
                    {(localStorage.getItem("role_id") != "Superadmin") && (<h3 style={webStyle.headnav} className="headnavbar">My Profile</h3>)}
                </div>
                <div className="content1" style={webStyle.contentBody}>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <Avatar src={this.state.imagep} style={webStyle.image}>
                                {console.log(this.state.imagep, "in return image ")}
                                <img src={this.state.imagep} style={webStyle.image} />
                            </Avatar>
                        </Grid>
                        <Grid item sm={6} style={webStyle.editGrid}>

                            <Button style={(localStorage.getItem('role_id') === "Superadmin")? (webStyle.editButton) : (webStyle.editButtonOther)} onClick={this.handleEdit}>
                            <span className="buttontext">Edit</span>
                            </Button>

                        </Grid>
                    </Grid>

                </div>
                <div className="body content"style={webStyle.body}>

                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>First Name</h4>
                                <p style={webStyle.paragraph}>{this.state.ftname}</p>
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Last Name</h4>
                                <p style={webStyle.paragraph}>{this.state.ltname}</p>
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>


                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Birthdate</h4>
                                {this.state.btdate === null ? <p style={webStyle.paragraph}>N/A</p> :
                                <p style={webStyle.paragraph}>{moment(this.state.btdate).format("DD/MM/YYYY")}</p>
                                }
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Contact Number</h4>
                                {this.rendervalidationfunction()}
                                
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>


                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Official Email id</h4>
                                <p style={webStyle.paragraph}>{this.state.oemail}</p>
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Role</h4>
                                {this.state.roleid === null ? <p style={webStyle.paragraph}>N/A</p> :
                                <p style={webStyle.paragraph}>{this.state.roleid}</p>
                                }
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>


                    <Grid container spacing={2}>

                        <Grid item sm={4}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Designation</h4>
                                {this.state.design === "not found" ? <p style={webStyle.paragraph}>N/A</p> :
                                <p style={webStyle.paragraph}>{this.state.design}</p>
                                }
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                        <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Workspace</h4>
                                {this.state.workspace === "not found" ? <p style={webStyle.paragraph}>N/A</p> :
                                <p style={webStyle.paragraph}>{this.state.workspace?.name}</p>
                                }
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>


                    <Grid container spacing={2}>

                        <Grid item sm={4}>


                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Joining Date</h4>
                                {this.state.jtdate === null ? <p style={webStyle.paragraph}>N/A</p> :
                                <p style={webStyle.paragraph}>{moment(this.state.jtdate).format("DD/MM/YYYY")}</p>
                                }
                            </Box>

                        </Grid>

                        <Grid item sm={1}></Grid>

                        <Grid item sm={5}>

                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Password</h4>
                                <Button onClick={this.handleChange} style={(localStorage.getItem('role_id') === "Superadmin") ? (webStyle.paragraphlink) : (webStyle.paragraphlinkOther)}>
                                    <span className='buttontext'>Change Password</span>
                                </Button>
                                <Link style={webStyle.paragraphlink}>
                                </Link>
                            </Box>

                        </Grid>

                        <Grid item sm={2}></Grid>

                    </Grid>

                    <Grid container spacing={2}>

                        <Grid item sm={4}>
                            <Box style={webStyle.box}>
                                <h4 style={webStyle.heading}>Description</h4>
                                {this.state.descrp === null || this.state.descrp === "" ? <p style={webStyle.paragraph}>N/A</p> :
                                <p style={webStyle.paragraph}>{this.state.descrp}</p>
                                }
                            </Box>

                        </Grid>
                    </Grid>

                </div>

            </div>

            </>

        )
    }
}
// Customizable Area End

// Customizable Area Start

const webStyle ={

    container: {
        backgroundColor: "#eeeeee",
        color: "#5f5f5f",
        fontFamily: "sans-serif",
        height: "fit-content",
        width: "85vw",
        top: "50px",
        right:0,
        padding:"30px 20px 10px 0px",
        minHeight: "100vh",
        maxHeight: "fit-content",
    },

    contentBody: {
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 0,
    },

    image: {
        width: 120,
        height: 110
    },

    editGrid: {
        display: "flex",
        alignContent: "end", 
        justifyContent: "end"
    },

    buttoncontainer: {
        display: "flex", 
        alignContent: "end", 
        justifyContent: "end"
    },

    editButton: {
        display: "flex",
        width: "100px",
        border: "1px solid #cecece",
        height: "35px",
        backgroundColor: "#e8e8e8",
        fontWeight: 600,
        marginRight: -35,
    },

    editButtonOther: {
        display: "flex",
        width: "100px",
        border: "1px solid #cecece",
        height: "35px",
        backgroundColor: "white",
        color: "rgb(243 180 21)",
        fontWeight: 600,
        marginRight: -35,
    },

    body: {
        marginLeft: 60,
        marginTop: 30,
    },

    box: {
        marginTop: 10,
        marginBottom: 10
    },

    heading: {
        margin: 10
    },

    paragraph: {
        margin: 0,
        paddingLeft: 12,
    },

    paragraphlink: {
        margin: 0,
        paddingLeft: 12,
        color: "#64b1f3",
        fontWeight: 600,
    },

    paragraphlinkOther: {
        margin: 0,
        paddingLeft: 12,
        color: "rgb(243 180 21)",
        fontWeight: 600,
    },

    divnav: {
        display: "flex",
        justifyContent: "flex-start",
    },

    headnav: {
        marginLeft: 50,
        marginTop: -55,
        zIndex: 1300
    }



}
// Customizable Area End