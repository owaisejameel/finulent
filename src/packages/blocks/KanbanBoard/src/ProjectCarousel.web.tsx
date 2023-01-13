
import React, { Component } from "react";
import {
  // Customizable Area Start
  Box,
  Avatar
  // Customizable Area End
} from "@material-ui/core";
import "./ProjectCard.css";

// Customizable Area Start
import Carousel from "react-multi-carousel";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineMessage
} from "react-icons/ai";
import "react-multi-carousel/lib/styles.css";
import { ImAttachment } from "react-icons/im";



export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  history:any;
  // Customizable Area End
}


// Customizable Area End

export default class ProjectCarousel extends Component<{data:any,projectStatus:any}> {
  carouselRef:React.RefObject<Carousel>
  constructor(props: any) {
    super(props);
    // Customizable Area Start
      this.carouselRef = React.createRef();

    // Customizable Area End
  }

  // Customizable Area Start

  render() {
    const {projectStatus} = this.props;
    const {projects,history,projectStatusColors} = this.props.data;

    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

    
   

    // Customizable Area End

    return (
      // Customizable Area Start
      <>
        <Box bgcolor={"white"} marginTop={"20"} paddingTop={"1.2vh"}>
          <Box
            marginTop={"10px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box>
              <Box
                padding={"5px"}
                borderRadius={"0px 30px 30px 0px;"}
                component={"span"}
                color={"white"}
                bgcolor={ projectStatusColors[projectStatus] ? `#${projectStatusColors[projectStatus]}` :  "#F6C03D"}
              >
                {projectStatus}
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              className={"leftRightDir"}
            >
              <Box component={"div"} padding={"5"} bgcolor={"#F3F4F6"}>
              
                <AiOutlineLeft onClick={()=>{
                  // @ts-expect-error
                  this.carouselRef.current?.previous()}
                  }/>
              </Box>
              <Box
                marginRight={"2vw"}
                component={"div"}
                padding={"5"}
                bgcolor={"#F3F4F6"}
              >
                <AiOutlineRight onClick={()=>{
                  // @ts-expect-error
                  this.carouselRef.current?.next()
                  }}/>
              </Box>
            </Box>
          </Box>


          <Carousel
            ref = {this.carouselRef}
            arrows={false}
            slidesToSlide={1}
            renderButtonGroupOutside={true}
            responsive={responsive}
          >
           
            {projects[projectStatus].map((el:any,i:number)=>{
              return (
                <ProjectCard key={i}  data={{"projectData":el,"history":history,"dotColor":projectStatusColors[projectStatus] ? `#${projectStatusColors[projectStatus]}` : "red", projectStatusColors: projectStatusColors }}  priority={i == 2}/>
              )
            })}


          </Carousel>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

class ProjectCard extends Component<{data:any,priority:any}>{
  constructor(props: any) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  
  render() {
    const {history,projectData,dotColor, projectStatusColors} = this.props.data;
    const {client_name,attachment_count, priority, is_overdue, id} = projectData;
    let newDate = projectData.Project_created ? projectData.Project_created.split("/") : null;
    newDate = newDate ? [newDate[1],newDate[0],newDate[2]].join("/") : null;
    const projectDate = new Date(newDate).toDateString();
    let stringProjectDate = projectDate.split(" ");
    const [year,month,day] = [stringProjectDate[3],stringProjectDate[1],stringProjectDate[2]];
    
    let tags: string[] = []
    let output = ""

    const handleTags = () => {
      
      if(is_overdue){
        tags.push("Overdue")
      }
      if(priority == "Yes"){
        tags.push("Priority")
      }
      
      let arr:any = []
      
      if(tags.length > 0){
        tags.forEach((el,index)=>{
          if(index != 0){
            arr.push(<Box component={"span"} marginX={'5px'} style={{borderLeft: '1px solid red', height: '50px', opacity: 0.8}}></Box>)
          }
         arr.push(el)
        })
      }

      tags = arr
      return <Box  display={"flex"} justifyContent= {"flex-end"}>
              <Box fontSize= {"0.8rem"} paddingX={"2px"} style={{borderRadius: '0 3px 0 3px'}} bgcolor={"#FFD3D2"} border= {"1px solid red"}>{tags.map((item, index)=>{
                if(index > 0){
                  output += " | " 
                }
                return item
              })}</Box>
            </Box>
    }
    // Customizable Area End

    return (
      // Customizable Area Start
      <>
        <Box
          onClick={()=>{history.push("/projectStatus",{id:id, data:projectData, projectStatusColors: projectStatusColors})}}
          border={(priority == "Yes" || is_overdue) ? "1px solid red" : "1px solid darkgrey"}
          bgcolor= {(priority == "Yes" || is_overdue) ? "#FEF4F3" : ""}  
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          className={"projectCard"}
        >
            {(priority == "Yes" || is_overdue) && handleTags()}
          <Box
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
            display={"flex"}
            marginTop={(is_overdue || priority == "Yes") ? "0" : "1.7vh"}
            >
            <Dot color={dotColor} />
            <Box className="lightText" margin={"1.2vh"}>
              Project Id
            </Box>
            <Box className="darkText"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '68%'
            }}
            >{projectData?.project_id }</Box>
          </Box>
          <Box
            className={"projectCardSection"}
            display={"flex"}
            alignItems={"center"}
            height={"14%"}
            component={"div"}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <Box className="darkText">{projectData["project_name"]}</Box>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
          >
            <Box className="lightText">Client</Box>
            <Box className="darkText" margin={"1.2vh"}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            >
               {client_name}
            </Box>
          </Box>
          <Box
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
            display={"flex"}
            alignItems={"center"}
          >
            <Box className="lightText">Type </Box>
            <Box className="darkText" margin={"1.2vh"}>
               {projectData?.type?.project_type}
            </Box>
          </Box>
          <Box
            bgcolor={priority == "Yes" ? "#f5e4e5" : '#F3F7FA'}
            className={"projectCardSection"}
            component={"div"}
            style={{ height: "24%" }}
            display={"flex"}
            marginLeft={0}
          >
            <TeamPlayer data={
              {
                designer:{fname: this.props.data?.projectData?.designer?.first_name, lname: this.props.data?.projectData?.designer?.last_name},
                IQA:{fname: this.props.data?.projectData["internal_qa"]?.first_name, lname: this.props.data?.projectData["internal_qa"]?.last_name},
                IQC:{fname: this.props.data?.projectData["internal_qc"]?.first_name, lname: this.props.data?.projectData["internal_qc"]?.last_name}
            }} 
            for="designer" />
            <div style={{borderLeft: '0.5px solid grey', height: '100%', opacity: 0.5}}></div>
            <TeamPlayer data={
              {
                designer:{fname: this.props.data?.projectData?.designer?.first_name, lname: this.props.data?.projectData?.designer?.last_name},
                IQA:{fname: this.props.data?.projectData["internal_qa"]?.first_name, lname: this.props.data?.projectData["internal_qa"]?.last_name},
                IQC:{fname: this.props.data?.projectData["internal_qc"]?.first_name, lname: this.props.data?.projectData["internal_qc"]?.last_name}
            }} 
            for="IQA" 
            />
            <div style={{borderLeft: '0.5px solid grey', height: '100%', opacity: 0.5}}></div>
            <TeamPlayer data={
              {
                designer:{fname: this.props.data?.projectData?.designer?.first_name, lname: this.props.data?.projectData?.designer?.last_name},
                IQA:{fname: this.props.data?.projectData["internal_qa"]?.first_name, lname: this.props.data?.projectData["internal_qa"]?.last_name},
                IQC:{fname: this.props.data?.projectData["internal_qc"]?.first_name, lname: this.props.data?.projectData["internal_qc"]?.last_name}
            }} 
            for="IQC" 
            />

          </Box>
          <Box
            className={"projectCardSection"}
            height={"14%"}
            component={"div"}
            display={"flex"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              className="lightText"
              height={"100%"}
              width={"17%"}      
              gridGap={5}
            >
              <AiOutlineMessage /> {projectData.project_comments_count}
            </Box>
            <Box
              
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              className="lightText"
              height={"100%"}
              width={"17%"}
              gridGap={5}
            >
              <ImAttachment /> {attachment_count}
            </Box>
            <Box width={"64%"} display={"flex"} justifyContent={"center"}>
              <Box className="lightText" fontSize={"0.8rem"}>
                Project Created
              </Box>
              <Box className="darkText" fontSize={"0.8rem"} marginLeft={"5px"}>
                {day+" "+month+" "+year}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
class TeamPlayer extends Component<{data:any,for:string}>{

  forPropValue = () => {
    if(this.props.for == "IQA")
      return "Internal QA"
    else if(this.props.for == "IQC")
      return "Internal QC"
    else
      return "Designer"
  }
  fname = this.props.data[this.props.for]?.fname;
  image = this.props.data[this.props.for]?.image || undefined;
  render(): React.ReactNode {
    return <>
        <Box
            height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={"32.8%"}
        >
          <Box alignItems={"center"} display={"flex"} justifyContent={"space-evenly"} height={"40%"}>
            <Avatar src={this.image} style={{ width: "1.5rem", height: "1.5rem" }} />
            <Box className="darkText nameText">{this.fname || "NA"}</Box>
          </Box>
          <Box height={"40%"} justifyContent={"center"} display={"flex"}>
            <Box className="lightText">{this.forPropValue}</Box>
          </Box>
        </Box>
      </>
  }
}


class Dot extends Component<{color:string}>{
  render(): React.ReactNode {
    const {color} = this.props;
      return <>
          <Box
          borderRadius={"50%"}
          bgcolor={color}
          width={"7"}
          height={"7"}
        />
      </>
  }
}


// Customizable Area End
