import React from "react";

// Customizable Area Start
import {   Box,
    Grid,
    Card,
    Typography,
    Modal,
    CardHeader,
    CardContent,
    IconButton,
    Divider,
    Button,
    TextField,
    TextareaAutosize,
    CardActions,
    Input } from "@material-ui/core";
import "./style.css";
import EditIcon from "@material-ui/icons/EditOutlined";
import { Close } from "@material-ui/icons";
export const configJSONBase = require("../../../framework/src/config");

// Customizable Area End
 
// Customizable Area Start
const Solar = require("../assets/Slar.png");
const Telecom = require("../assets/Telecom_template.png");
const Basic = require("../assets/Basic_template.png");
const FireSafety = require("../assets/firesafety_template.png");
// Customizable Area End

import EditTemplateDesignController, {
  Props,
} from "./EditTemplateDesignController";

export default class EditTemplateDesign extends EditTemplateDesignController {
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
    let img= URL.createObjectURL(event.target.files[0])
    this.setState({editImg:event.target.files[0], editViewImg:img, isImageChanged: true});
  }
  handleDescription= ()=>{
    if(localStorage.getItem('Admin')) this.props.history.push('/templateDetails');
  }
  loadStaticTemplateImgs = (itemId: string) => {
    switch (itemId) {
      case '1':
        return Solar;
      case '2':
        return Telecom;
      case '3':
        return FireSafety;
      default:
        return Basic;
    }
  }
  // Customizable Area End

  render() {
    const query = new URLSearchParams(this.props.history?.location?.search);
    return (
      // Customizable Area Start
      <Box style={webStyle.background} className="background-content"> 
        <Box style={webStyle.content} >
          <div className="heading">
            <Typography style={webStyle.title}>Templates</Typography>
          </div>
          <div style={webStyle.cardContent}>
            <Grid container>
                {this.state.getTemplatesDetail.map((item:any,index:number)=>{
                    return(
                        <Grid item xs={12} sm={9} md={6} lg={4} xl={3} key={index}>
                <Card style={webStyle.cards}>
                {localStorage.getItem('user_type')=='Superadmin'&&
                  <div style={webStyle.editIconWrapper}>
                    <EditIcon 
                    onClick={() => {
                      this.setState(
                        { editTemplate: true,
                          editTemplateName:item?.attributes?.title,
                          editTemplateDesc:item?.attributes?.description,
                          editTemplateId:item?.id,
                          editImg:item?.attributes?.image,
                          editViewImg: item?.attributes?.image });
                    }}/>
                  </div>}
                  <div className="cards" style={webStyle.maincard} onClick={()=>{
                      localStorage.setItem("templateId", item?.id);
                      localStorage.setItem("templateName", item?.attributes?.title);
                       if(query.get('sfid')===null)
                       {
                        this.props.history.push(`/edittemplatedetailinfo?tid=${item.id}`)
                       }
                       else{
                        this.props.history.push(`/edittemplatedetailinfo?cid=${
                          query.get('cid')
                        }&sfid=${query.get('sfid')}&tid=${item?.id}`);
                      }
                  }}>
                  {item?.attributes?.image===null?<img src={this.loadStaticTemplateImgs(item.id)} style={webStyle.tempImg} />:<img src={`${item?.attributes?.image}`} style={webStyle.tempImg}/>}
                          <Typography style={webStyle.header}>
                            {item?.attributes?.title}
                          </Typography>
                          <p style={webStyle.paragraph} className="paragraphs" onClick={this.handleDescription}>
                            {item?.attributes?.description}
                          </p>
                  </div>
                </Card>
              </Grid>
                    )
                })}

                </Grid>
          </div>
          <Modal
            open={this.state.editTemplate}
            onClose={() => this.handleClose()}
            style={webStyle.modalRoot}
            
          >
            <Card variant="outlined" className="modalData" style={webStyle.modalCardRoot} >
              <CardHeader
                className="fdkf"
                style={webStyle.modalCardHeader}
                disableTypography={true}
                action={
                  <IconButton
                    aria-label="close"
                    onClick={() => this.handleClose()}
                  >
                    <Close />
                  </IconButton>
                }
                title={
                  <Typography style={webStyle.modalCardHeaderText}>
                    Edit Template
                  </Typography>
                }
              />
              <CardContent style={webStyle.modalCardContent}>
                <Box>
                  <Divider />
                </Box>
                <div style={webStyle.modalForm}>
                <div style={webStyle.modalHeader}>
                <img src={this?.state?.editImg ? `${this.state.editViewImg}`: this.loadStaticTemplateImgs(this.state.editTemplateId)}  style={webStyle.tempImg}/>
                  <Input
                  type="file"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  onChange={this.handleFileSelect}
                />
                <label htmlFor="icon-button-file">
                  <Button
                    component="span"
                    style={webStyle.modalUpdateImage}
                    disableRipple={true}
                  >
                    Update Image
                  </Button>
                  </label>
                  </div>
                  <Typography style={webStyle.modalFieldName}>
                    Template Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Type parameter name here"
                    value={this.state.editTemplateName}
                    onChange={(e: any) => {
                      this.setState({ editTemplateName: e.target.value });
                    }}
                  />
                  <br />
                  <Typography style={webStyle.modalFieldName}>
                    Description
                  </Typography>
                  <TextareaAutosize
                  style={webStyle.Textareastyle}
                    // aria-label="minimum height"

                    rowsMin={4}
                    placeholder="Optional"
                    value={this.state.editTemplateDesc}
                    onChange={(e:any)=>{
                      this.setState({editTemplateDesc:e.target.value});
                    }}
                  />
                </div>
                <Divider />
              </CardContent>

              <CardActions style={webStyle.modalCardActions}>
                <Box style={webStyle.modalCardActionsContainer}>
                  <Button
                    disableElevation
                    variant="contained"
                    style={webStyle.modalCardCancelButton}
                    onClick={() => this.handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    style={ localStorage.getItem('user_type')=="Admin" ? webStyle.modalCardAdminActionButton : webStyle.modalCardActionButton}
                    onClick={this.updateTemplate}
                  >
                    Save
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Modal>
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
    width:'360px',
    margin: 10,
    position: 'relative',
    display: 'flex'
  } as React.CSSProperties,

  maincard: {
    display: "flex",
    width: "360px",
    justifyContent: "center",
    flexDirection: "column",
    padding:"10px",
    alignItems: "center",
    marginTop: 20
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
    paddingBlock: "2rem", //
    // backdropFilter: "blur(5px)",
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
