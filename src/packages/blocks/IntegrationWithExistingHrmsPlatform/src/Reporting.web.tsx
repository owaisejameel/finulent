import React from "react";

// Customizable Area Start
import {
  Box,
  Grid,
  Card,
  Typography
} from "@material-ui/core";
export const configJSONBase = require("../../../framework/src/config");

// Customizable Area End
 
// Customizable Area Start
// Customizable Area End

import ReportingController, {
  Props,
} from "./ReportingController";

export default class Reporting extends ReportingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleTemplatePage = () => {
    console.log("clickable for the cards");
    this.props.history.push("/solartemplate");
  };

  handleHomePage = () => {
    console.log("moving back to home page, for now it is Workspace management");
  };
  handleFileSelect = (event:any)=>{
    this.setState({editImg:event.target.files[0]});
    this.updateTemplateImg(event.target.files[0]);
  }
  handleDescription= ()=>{
    if(localStorage.getItem('Admin')) this.props.history.push('/templateDetails');
  }
  // Customizable Area End

  render() {
    const sampleData = [
      {
        name: "Solar",
        pathName: "solar"
      },
      {
        name: "Telecom",
        pathName: "telecom"
      },
      {
        name: "Firesafety",
        pathName: "firesafety"
      },
    ]
    return (
      // Customizable Area Start
      <Box style={webStyle.background} className="background-content"> 
        <Box style={webStyle.content} >
          <div className="heading">
            <Typography style={webStyle.title}>Reporting</Typography>
          </div>
          <div style={webStyle.cardContent}>
            <Grid container>
                {sampleData.map((item:any,index:number)=>{
                    return(
                        <Grid item xs={12} sm={9} md={6} lg={4} key={index}>
                <Card style={webStyle.cards}>
               
                  <div style={webStyle.maincard} onClick={()=>{
                   
                  }}>
                          <Typography style={webStyle.header}>
                            {item?.name}
                          </Typography>
                         
                  </div>
                </Card>
              </Grid>
                    )
                })}
                  <Grid item xs={12} sm={9} md={6} lg={4} >
                <Card style={webStyle.cards}>
               
                  <div style={webStyle.maincard} onClick={()=>{
                    this.props.history.push("leaveReport")
                  }}>
                          <Typography style={webStyle.header}>
                          Leave Report
                          </Typography>
                         
                  </div>
                </Card>
              </Grid>

                </Grid>
          </div>
        </Box>
      </Box>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  background: {
    backgroundColor: "#eeeeee",
    height: "100%",
    color: "#5f5f5f",
    fontFamily: "sans-serif",
    width: "85vw",
    right: 0,
    overflow: 'scroll'
  },
  content: {
    right: "0px",
    marginTop: "50px",
    justifyContent: "space-between",
  },
  tempImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "320px",
    height: "146px",
    borderRadius: "4px",
    border: "1px dashed #dbdbdb",
  },
  arrow: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    marginLeft: 30,
    borderRadius: 8,
  },
  cards: {
    height: "auto",
    margin: 10,
    position: 'relative',
    display: 'flex'
  } as React.CSSProperties,

  maincard: {
    cursor :"pointer",
    width : "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding : "4rem 0",
  } as React.CSSProperties,
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#2c2c2c",
     fontSize: "18px",
    fontWeight: 700,
    textAlign: "center",
  } as React.CSSProperties,

  paragraph: {
    color: "#8f8e8e",
    padding: '0px 20px',
    height: "70",
    overflowX: 'auto',
    align:"justify",
    marginBottom: 20
  } as React.CSSProperties,

  title: {
    margin: '0px 30px',
    color: "#252631",
    fontSize: "20px",
    fontWeight: 600,
  },

  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none'
  } as React.CSSProperties,
  
  modalCardRoot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 350,
    minHeight: "50%",
    maxHeight: "80%",
    fontSize: "16px",
    overflowY: "scroll",
  } as React.CSSProperties,
  modalRoot: {
    display: "flex",
    gap: 1,
    fontSize: "16px",
    justifyContent: "space-between",
    borderBlockStart: "1px solid #ccc",
    paddingBlock: "2rem", 
    overflow: "scroll",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modalCardHeader: {
    paddingInline: "1rem",
  },
  modalCardHeaderText: {
    fontWeight: 600,
  },
  modalCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "16px",
  } as React.CSSProperties,
  modalFieldName: {
    fontSize: "14px",
    fontWeight: 600,
    margin: "10px 0px",
  } as React.CSSProperties,
  modalForm: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    margin: "10px",
  } as React.CSSProperties,
  modalHeader:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  } as React.CSSProperties,
  modalUpdateImage: {
    backgroundColor: "white",
    margin: "10px",
    fontSize: "15px",
    color: "#0096ff",
    borderRadius: "5%",
    textTransform: "capitalize",
    fontWeight: 600
  } as React.CSSProperties,
  modalCardActionsContainer: { display: "flex", gap: "1.5rem" },
  modalCardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: "1rem",
  },
  modalCardCancelButton: {
    backgroundColor: "#e8e8e8",
    borderRadius: "8px",
    textTransform: "none",
    width: "140px",
    fontWeight: 800,
    height: "50px",
  } as React.CSSProperties,
  modalCardActionButton: {
    backgroundColor: "#4eabf8",
    color: "white",
    borderRadius: "4px",
    width: "140px",
    textTransform: "none",
    height: "50px",
    fontWeight: 800,
  } as React.CSSProperties,
  modalCardAdminActionButton: {
    backgroundImage:"radial-gradient(rgb(246 168 34), rgb(171 114 24))",

    color: "black",
    borderRadius: "4px",
    width: "140px",
    textTransform: "none",
    height: "50px",
    fontWeight: 800,
  } as React.CSSProperties,
  editIconWrapper: {
    position: 'absolute',
    right: 0,
    background: '#F5F5F5',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  } as React.CSSProperties,
  Textareastyle: {
    fontFamily: "sans-serif",
    fontSize: '16px',
    fontWeight: '0px',
    padding: 13,
    border: '1px solid #d1d5da',
    borderRadius: '4px'
  } as unknown as React.CSSProperties
};
// Customizable Area End
