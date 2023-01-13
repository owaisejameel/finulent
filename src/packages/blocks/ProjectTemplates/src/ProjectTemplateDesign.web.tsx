import React from "react";

// Customizable Area Start
import { Box, Grid, Card, Typography } from "@material-ui/core";
import "./style.css";
// Customizable Area End

// Customizable Area Start
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
export const configJSONBaseURL = require("../../../framework/src/config");
// Customizable Area End

import ProjectTemplatesController, {
  Props,
} from "./ProjectTemplatesController";

export default class ProjectTemplateDesign extends ProjectTemplatesController {
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
    return window?.history?.back()
  };

  handleBreadCrumbUpdate = (name: string) => {
    const data = localStorage.getItem('breadcrumb_data');
    if(data && data != "" && typeof data === 'string') {
      const breadCrumbs = JSON?.parse(data);
      breadCrumbs.template_name = name;
      localStorage.setItem('breadcrumb_data', JSON.stringify(breadCrumbs))
    }
  }
  // Customizable Area End

  render() {
    const query = new URLSearchParams(this.props.history?.location?.search);
   
    return (
      // Customizable Area Start
      
      <Box style={webStyle.background} className="background-content">
        
        <Box style={webStyle.contentd} >
          <div className="heading">
            <ArrowLeftRoundedIcon
              style={webStyle.arrow}
              onClick={this.handleHomePage}
            />
            <Typography className="template-title">
              Choose Base template
              </Typography>
          </div>
   
        
          <div style={webStyle.cardContent}>
            <Grid container spacing={1}>
              {this.state?.getTemplatesDetail?.map((item: any,index:number) => {
                return (
                  <Grid item xs={12} sm={9} md={6} lg={4} xl={3} key={index}>
                    <Card
                      style={webStyle.cards}
                      onClick={() => {
                        localStorage.setItem("templateId", item?.id);
                        localStorage.setItem("templateName", item?.attributes?.title);
                        this.handleBreadCrumbUpdate(item?.attributes?.title)
                        if(query.get('sfid')===null)
                        {
                         this.props.history.push(`/templateDetails?cid=${query.get('cid')}&tid=${item?.id}`)
                        }
                        else{
   
                         this.props.history.push(`/templateDetails?cid=${
                           query.get('cid')
                         }&sfid=${query.get('sfid')}&tid=${item?.id}`);
                       }

                        }}


                    >
                      <div style={webStyle.maincard}>
                        {item?.attributes?.image === null ? <img src={this.loadStaticTemplateImgs(item.id)} style={webStyle.tempImg} /> : <img src={`${item?.attributes?.image}`} style={webStyle.tempImg} />}
                        <Typography style={webStyle.header}>
                          {item?.attributes?.title}
                        </Typography>
                        <p style={webStyle.paragraph} className="paragraphs">
                          {item?.attributes?.description}
                        </p>
                      </div>
                    </Card>
                  </Grid>
                )
              })}

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
  contentd: {
    marginTop: "50px",
     right: "0px",
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
    width: "360px",
    margin: 10,
    position: 'relative',
    display:'flex'
  } as React.CSSProperties,

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#2c2c2c",
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: 700,
    textAlign: "center",
  } as React.CSSProperties,

  paragraph: {
    color: "#8f8e8e",
    // width: "320px",
    padding:"0px 20px",
    height: "70",
    overflowX: 'auto',
    align: "justify",
    marginBottom: 20
  } as React.CSSProperties,

  title: {
    margin: 10,
    color: "#252631", 
    fontFamily: "OpenSans-Semibold",
    fontSize: "16px",
    fontWeight: 600,
  },

  cardContent: {
    margin: 20,
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none'
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
  maincard: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "360px",
    padding:"10px",
    alignItems: "center",
    marginTop: 20
  } as React.CSSProperties,
};
// Customizable Area End
  