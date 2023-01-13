//@ts-nocheck
import React, { Component } from "react";
import {
  // Customizable Area Start
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import "./ProjectCard.css";


import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// Customizable Area Start
import "react-multi-carousel/lib/styles.css";
import { withRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { stat } from "fs";
import moment from "moment";





export interface Props {
  key: number;
  data: any;
  navigation?: any;
  id?: string;
  // Customizable Area Start
  history?:any;
  projectStatus?: any;
  // Customizable Area End
}

type StateProjectCard = {
  isMenu : any
}



// Customizable Area End
 class ProjectCarousel extends Component<Props > {
  constructor(props: Props) {
    super(props);
    
    // Customizable Area Start
      this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);          

    // Customizable Area End
  }
  next() {
     this.slider.slickNext();
      }
     previous() {
   this.slider.slickPrev();
      }
      handleFormatStatus=(status:any)=>{
        let str=status.split("_").join(" ")
        return str
      }    
  

  // Customizable Area Start

 
  render() {
    const {projectStatus} = this.props;
    const {projects,history,projectStatusColors} = this.props.data;
    console.log("DAAA",this.props.data["Draft"])
    
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows:false,
      centerMode:false,

      
      responsive: [
        {
          breakpoint: 1620,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows:false,
            centerMode:false
            
          }
        },
        {
          breakpoint: 1720,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows:false,
            centerMode:false

            
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows:false,
            centerMode:false

            
          }
        },{
          breakpoint: 1400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows:false,
            centerMode:false

            
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows:false,
            centerMode:false

            
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows:false,
            centerMode:false

          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false,
            infinite:false,
            centerMode:false,
            arrows:false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false,
            arrows:false,
            infinite:false,
            centerMode:false

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows:false,
            infinite:false,
            centerMode:false

          }
        }
      ]
    };

    

    
    // Customizable Area End

    return (
      // Customizable Area Start
      <>
        <Box bgcolor={"white"} marginTop={"20"} paddingTop={"1.2vh"} height="400">
          <Box
            marginTop={"10px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box>
              <Box
                padding={"5px 17px"}
                borderRadius={"0px 30px 30px 0px;"}
                component={"span"}
                color={"white"}
                // bgcolor={ projectStatusColors[projectStatus] ? `#${projectStatusColors[projectStatus]}` :  "#F6C03D"}
                bgcolor={"#F6C03D"}
              >
                
                {this.handleFormatStatus(projectStatus)}
              </Box>
            </Box>
          
              <Box style={{display:"flex", alignItems:"center", gap :"10px"}}>
                        <Typography
                        className="seeAllText"
                        // onClick={()=>{
                          // const {history} = this.props.data;
                          // history.push('/partiallyPaidInvoices')
                        // }}
                        onClick={()=>this.props.history.push("/partiallyPaidInvoices")}
                        >See all</Typography>
                          <Box style={webStyle.arrowbox}>
                  {/* <ArrowLeftIcon
                    onClick={()=>{
                      // @ts-expect-error
                      this.carouselRef.current?.previous()}
                    }    
                  /> */}
                  <ArrowLeftIcon className="button"
                    onClick={this.previous}    
                    style={{cursor:"pointer"}}

                  />
                </Box>
                <Box style={webStyle.arrowbox} sx={{mr:"10px"}}>
                  {/* <ArrowRightIcon
                    onClick={()=>{
                      // @ts-expect-error
                      this.carouselRef.current?.next()
                      }}
                  /> */}
                  <ArrowRightIcon className="button"
                  style={{cursor:"pointer"}}
                    onClick={this.next}
                  />
                </Box>
                    </Box>
          </Box>


          {/* <Grid container style={{marginTop : "20px"}}>

            {
               [1,2,,3,4,5,6].map( (i) => {
                return (
                  <Grid item container xs={12} sm={12} md={4} lg={4} xl={3} style={{padding : "20px"}}>
                   
                      <Grid item xs={12} className="projectCard">
                     hello
                      
                    </Grid>
                    </Grid>
                )
               })
            }
          
        </Grid> */}

          {/* <Carousel
            ref = {this.carouselRef}
            arrows={false}
            slidesToSlide={1}
            renderButtonGroupOutside={true}
            responsive={responsive}
          >
           
            {projects[projectStatus]?.map((el:any,i:number)=>{
              return (
                <ProjectCard key={i}  data={{"projectData":el,"history":history,"dotColor":projectStatusColors[projectStatus] ? `#${projectStatusColors[projectStatus]}` : "red" }}  priority={i == 2}/>
              )
            })}


          </Carousel> */}
      <Slider style={{paddingLeft:'10px!important'}} ref={c => (this.slider = c)} {...settings}>            {this.props.data[projectStatus]?.map((el:any,i:number)=>{
              return (
                <ProjectCard key={el?.id}  data={{"projectData":el,"history":history,"dotColor":"red" ? `red` : "red" }}  priority={i == 2}/>
              )
            })}
            </Slider>
            {/* <PreviousNextMethods/> */}
        </Box>
      </>
      // Customizable Area End
    );
  }
}


// Customizable Area Start
// @ts-nocheck
export default withRouter(ProjectCarousel)

class ProjectCard extends Component<{data:any,priority:any},StateProjectCard >{
  constructor(props: any) {
    super(props);
    // Customizable Area Start
    this.state ={
      isMenu : null
    }

    // Customizable Area End
  }

  // Customizable Area Start
   handleMore =(e:any) =>{
    console.warn("three dot menu",e)
    this.setState({isMenu:e.currentTarget})
  }
  
   handleMenuClose = () =>{
    this.setState({isMenu:null})
  }

  handleFormatDate=(date:any)=>{
    // let d=date.split("-").reverse().join("/")
    // return d
    return moment(date).format("DD/MM/YY")
  }

  
  render() {
    const {projectData} = this.props.data;
    const {id} = projectData;  
    console.log("FFFF",projectData)
    // Customizable Area End

    return (
      // Customizable Area Start
      <>
      <Menu
        id="simple-menu"
        anchorEl={this.state.isMenu}
        keepMounted
        open={this.state.isMenu!= null ? true:false}
        onClose={this.handleMenuClose}
        className="menu-field"
        // onClick={this.handleMenuClose}
      >
        <MenuItem 
        // className="menu-field" 
        // onClick={this.handleMenuStatus}
         >Edit</MenuItem>
        <MenuItem   
        // onClick={this.handleEdit}
        >View</MenuItem>
        <MenuItem>
        
          Download
          <Box style={{paddingLeft : "20px"}}>
            <ArrowRightIcon/>
          </Box>
     
        </MenuItem>
      </Menu>
        <Box
          // onClick={()=>{history.push("/projectStatus",{state:{data:"any"}})}}
          // border={this.props.priority ? "1px solid red" : "1px solid darkgrey"}
          border={"1px solid darkgrey"}
          // bgcolor= {this.props.priority ? "#FEF4F3" : ""}  
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          className={"projectCardForStatusOfInvoice"}
          
        >
          <Box
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
            display={"flex"}
            // marginTop={this.props.priority ? "0" : "1.7vh"}
            marginTop={"1.7vh"}
            >
            <MoreHorizIcon
            onClick={(e : any) => this.handleMore(e)}
            style={webStyle.tripleDotIcon} />
           
            <Box className="lightText" >
             <Typography>Invoice#</Typography> 
            </Box>
            <Box className="darkText" margin={"1.2vh"}><Typography>{projectData?.invoice_id}</Typography></Box>
          </Box>
          <Box
            className={"projectCardSection"}
            display={"flex"}
            justifyContent={"space-between"}
            height={"14%"}
            component={"div"}
            width={"90%"}
        >
            <Box
            display={"flex"}
            alignItems={"center"}
           >
             <Box className="lightText" >
              <Typography>
              Workspace
              </Typography>
            </Box>
            <Box className="darkText" margin={"1.2vh"}><Typography>Solar</Typography></Box>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
           >
             <Box className="lightText" >
              <Typography>
              Client Id</Typography>
            </Box>
            <Box className="darkText" margin={"1.2vh"}><Typography>{projectData?.client_id}</Typography></Box>
          </Box>

            </Box>
           

          <Box
            display={"flex"}
            alignItems={"center"}
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
          >
            <Box className="lightText"><Typography>Client</Typography></Box>
            <Box className="darkText" margin={"1.2vh"}>
               <Typography>Tata Power</Typography>
            </Box>
          </Box>
          <Box
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
            display={"flex"}
            alignItems={"center"}
          >
            <Box className="lightText"><Typography>Finulent Admin</Typography> </Box>

            <Box alignItems={"center"} display={"flex"} height={"40%"} margin={"1.2vh"}>
            <Avatar style={{ width: "1.5rem", height: "1.5rem" }} />
            <Box className="darkText" margin={"0.5vh"} ><Typography>Aaron Aimaraz</Typography> </Box>
          </Box>
         
          </Box>
          <Box
            bgcolor={"#F7F8FA"}
            className={"projectCardSection"}
            component={"div"}
            style={{ height: "24%",padding:"10px 0" }}
            display={"flex"}
            marginLeft={0}
          >
            <TeamPlayer data={{"date": this.handleFormatDate(projectData?.from_date) ,"dateType":"From Date", border : true }}/>
            <TeamPlayer data={{"date": this.handleFormatDate(projectData?.to_date) ,"dateType":"To Date", border : true }}/>
            <TeamPlayer data={{"date": this.handleFormatDate(projectData?.overdue_date) ,"dateType":"Overdue Date" }}/>
            

          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
          >
            <Box className="lightText"><Typography>Final Amount</Typography></Box>
            <Box className="darkText" margin={"1.2vh"}>
              <Typography>
            &#8377; 19200</Typography>
            </Box>
          </Box>
          
        </Box>
        
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
class TeamPlayer extends Component<{data:any}>{
  render(): React.ReactNode {
  
    const {date, dateType, border} = this.props.data;
      return <>
          <Box
            height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={"32.8%"}
          alignItems={"center"}
          borderRight={ border && '1px solid #dcdcdc'}
           >
          <Box className="darkText"><Typography>{date}</Typography></Box>
            <Box style={{marginTop:"5px",marginLeft:"10px"}}className="lightText"><Typography>{dateType}</Typography></Box>
          </Box>
       
      </>
  }
}




const webStyle = {
 arrowbox: {
    backgroundColor: "#fff",
    border : "1px solid grey",
    borderRadius: 4,
    
  },
  tripleDotIcon :{
    position : "absolute",
    right : "2%",
    top : 0,
    cursor : "pointer"
  }

};

// Customizable Area End