import React from 'react';
// Customizable Area Start
import {
    Box,
    Grid,
    Card,
} from "@material-ui/core";
import { templateimage } from './assets';
import { checklistimage } from './assets';
import { tltemplateimage } from './assets';
import { tlchecklistimage } from './assets';
import "./style.css";
import AdminClientManagementContoller, { Props} from "./AdminClientManagementController";
// Customizable Area End

export default class TLClientManagement extends AdminClientManagementContoller {
// Customizable Area Start
    constructor(props: Props) {
        super(props);
        this.getClients()
    }

    handleCancel = () => {
        this.props.navigation.navigate("UserProfileBlock")
    }
    handleBack = () => {
        this.props.navigation.navigate("UserProfileEditBlock")
    }
    // Customizable Area End
    render() {
        // Customizable Area Start
        const {navigation} = this.props;
        // Customizable Area End
        return (
            // Customizable Area Start
            <>
            <div style={webStyle.container} className="boxcontainer">

                <div className="content1" style={webStyle.content}>
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                                <Box style={webStyle.sign} className="headnavbar">
                                        <h3 style={webStyle.headnav}>
                                            Details
                                        </h3>
                                </Box>
                            
                        </Grid>
                    </Grid>
                </div>

                <div className="content"style={webStyle.contents}>
                    <Grid container spacing={1}>
                        
                            <Card style={webStyle.twocards}>
                                <div>
                                    <div style={webStyle.iconimages}>
                                        {/* <img src={templateimage} alt="template" style={webStyle.icons} /> */}
                                        <img src={tltemplateimage} alt="template" style={webStyle.icons} />
                                    </div>
                                    <div>
                                        <h4 style={webStyle.iconname}>Template</h4>
                                    </div>
                                </div>
                            </Card>

                            <Card style={webStyle.twocards}>
                                <div>
                                    <div style={webStyle.iconimages}>
                                        {/* <img src={checklistimage} alt="checklist" style={webStyle.icons} /> */}
                                        <img src={tlchecklistimage} alt="checklist" style={webStyle.icons} />
                                    </div>
                                    <div>
                                        <h4 style={webStyle.iconnamecheck}>Checklist</h4>
                                    </div>
                                </div>
                            </Card>
                    </Grid>
                </div>
            </div>
            </>
        )
    }
}
 // Customizable Area End
 // Customizable Area Start
const webStyle = {

    container: {
        backgroundColor: "#eeeeee",
        height: "100%",
        color: "#5f5f5f",
        fontFamily: "sans-serif",
        width: "85vw",
        top: "50px",
        right:0,
        padding:"30px 20px 10px 0px",
    },

    content: {
        margin: 0
    },
    
    sign: {
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "20px",
        fontFamily: "sans-serif",
        zIndex: 1300,
    },

    
    headnav: {
        marginLeft: 10,
        marginTop: "-55px",
        zIndex: 1300,
    },

    contents: {
        marginLeft: 30
    },

    twocards: {
        display: "flex",
        height: 200,
        width: 400,
        marginRight: 30,
        marginTop: 20,
        padding: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },

    iconimages: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },

    icons: {
        width: 120,
        height: 120,
    },

    iconname: {
        marginLeft: 28,
        marginRight: 20,
    },

    iconnamecheck: {
        marginLeft: 32,
        marginRight: 20,
    }

}

// Customizable Area End