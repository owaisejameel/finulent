import React, { Component } from "react";

import {
  Box,
  Button,
  InputLabel,
  InputAdornment,
  // Customizable Area Start
  TextField,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  TableHead,
  Avatar,
  MenuItem, Popover,
  FormControl,
  Select,
  Modal,
  makeStyles,
  Menu
} from "@material-ui/core";

// Customizable Area Start
import ClientInvoiceController, { Props } from "./ClientInvoiceController";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { SlEye } from "react-icons/sl";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDownloadLine } from "react-icons/ri";
import "./Invoice.css";

// Customizable Area End


export default class ClientInvoice extends ClientInvoiceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {

    // Modal Content End
    function createData(
      name: string,
      calories: number,
      fat: number,
      carbs: number,
      protein: number
    ) {
      return { name, calories, fat, carbs, protein };
    }

    const rows: any = [
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    ];

    return (
      // Customizable Area Start
      <>
        <Box
          fontSize={"15px"}
          fontFamily={"sans-serif"}
          bgcolor={"#EEEEEE"}
          width={"85vw"}
          marginLeft={"15vw"}
        >
          <Centered>
            {/* Top part Start */}

            <Box
              padding={"2vh 0px"}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"space-between"}
              width={"95%"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Box>
                  <Box
                    borderRadius={"5px"}
                    padding={"10px 10px"}
                    bgcolor={"white"}
                    color={"black"}
                  >
                    <AiFillCaretLeft />
                  </Box>
                </Box>
                <Box fontWeight={"bold"} margin={"0 2vh"}>
                  Client Invoices
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box fontSize={"3vh"}>
                  <FilterPopOver />
                </Box>
                <Box>
                  <TextField
                    style={{
                      backgroundColor: "white",
                      overflow: "hidden",
                      margin: "0 2vh",
                      fontSize: "0.5vh",
                    }}
                    InputProps={{
                      startAdornment: (
                        <Box>
                          <InputAdornment position={"start"}>
                            <GoSearch />
                          </InputAdornment>
                        </Box>
                      ),
                    }}
                    size={"small"}
                    placeholder="Search Invoices"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <GenerateInvoiceModal />
                </Box>
              </Box>
            </Box>
            {/* Top part End */}
          </Centered>
          <Centered>
            {/* Table Start */}
            <Box marginTop={"10px"} width={"95%"}>
              <TableContainer>
                <Table

                //    sx={{ minWidth: 650 }} aria-label="simple table"
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#E4E4E4" }}>
                      <TableCell align="center">S.No</TableCell>
                      <TableCell align="center">Client Name</TableCell>
                      <TableCell align="center">Client Id</TableCell>
                      <TableCell align="center">From Date</TableCell>
                      <TableCell align="center">To Date</TableCell>
                      <TableCell align="center">Overdue Date</TableCell>
                      <TableCell align="center">Invoice Status</TableCell>
                      <TableCell align="center">Invoice Amount</TableCell>
                      <TableCell align="center">Finulent Admin</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((el: any, i: number) => (
                      
                      <TableRow
                        className="cells"
                        style={{ backgroundColor: "white" }}
                        key={i + 1}
                        //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>Tata Power</TableCell>
                        <TableCell>23333FGH</TableCell>
                        <TableCell>11/10/2022</TableCell>
                        <TableCell>22/12/2022</TableCell>
                        <TableCell>7/11/2022</TableCell>
                        <TableCell>Approved by Client</TableCell>
                        <TableCell>₹10,000</TableCell>
                        <TableCell>
                          <Admin/>
                        </TableCell>
                        <TableCell>
                          <Actions data={this.state}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Centered>

          {/* Table End */}
        </Box>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

class Admin extends Component {
  render(): React.ReactNode {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Avatar
              alt="Remy Sharp"
              src="https://hybridtechwebinars.com/wp-content/uploads/2017/10/speaker3-min.jpg"
              style={{ width: "2.19vh", height: "2.19vh" }}
            />
          </Box>
          <Box className={"nameText"} textOverflow={"none"} marginLeft={"5px"}>
            Shivanshu Mishra Shivanshu Mishr Shivanshu Mishr
          </Box>
        </Box>
      </>
    );
  }
}

class Centered extends Component<{ children: any }> {
  render() {
    return (
      <>
        <Box display={"flex"} justifyContent={"center"}>
          {this.props.children}
        </Box>
      </>
    );
  }
}

interface MenuState {
  anchorEl: any;
}
interface MenuStateI {
  anchorEle: any;
}
class Actions extends Component<{data:any}, MenuStateI> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEle: null,
    };
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEle: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEle: null });
  };

  render() {
    const {history} = this.props.data;
    return (
      <>
        <Box>
          <Box
            color={"black"}
            width={"80%"}
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box className={"actionButton"} onClick={()=>{history.push("genericInvoice")}}>
              <SlEye />
            </Box>
            <Box className={"actionButton"}>
              <HiOutlinePencil />
            </Box>
            <Box
              component={"div"}
              className={"actionButton"}
              // ref={anchorRef}
              {...{ ref: this.state.anchorEle }}
              onClick={this.handleClick}
            >
              <RiDownloadLine />
            </Box>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEle}
            keepMounted
            open={Boolean(this.state.anchorEle)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>.pdf</MenuItem>
            <MenuItem onClick={this.handleClose}>.xls</MenuItem>
            <MenuItem onClick={this.handleClose}>.docx</MenuItem>
          </Menu>
        </Box>
      </>
    );
  }
}

class FilterPopOver extends Component<{}, MenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render(): React.ReactNode {
    return (
      <>
        <Box>
          <Box
            className={"actionButton"}
            // aria-describedby={id}
            onClick={this.handleClick}
          >
            <BiFilterAlt />
          </Box>
          <Popover
            // id={id}
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box style={{ padding: "10px" }}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>Filter</Box>
                <Box style={{ textDecoration: "underline" }}>Clear Filter</Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                margin={"3vh 0px"}
              >
                <Box width={"48%"}>
                  <Box fontWeight={"bold"}>From Date</Box>
                  <Box>
                    <TextField variant={"outlined"} type={"date"} />
                  </Box>
                </Box>
                <Box width={"48%"}>
                  <Box fontWeight={"bold"}>To Date</Box>
                  <Box>
                    <TextField variant={"outlined"} type={"date"} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box fontWeight={"bold"}>Status</Box>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      variant={"outlined"}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Select"
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box marginTop={"3vh"} display={"flex"} justifyContent={"end"}>
                <Button
                  style={{ width: "48%", textTransform: "none" }}
                  variant="contained"
                  onClick={this.handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    width: "48%",
                    textTransform: "none",
                    backgroundColor: "#4EABF8",
                  }}
                  variant="contained"
                >
                  Generate
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>
      </>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "25%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: "2px solid #000",
    fontStyle: "sans-serif",
  },
}));


   function getModalStyle(){
      const top = 50;
      const left = 50;
      

      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        position: "absolute",
        width: "30%",
        border: "2px solid #000",
        fontFamily: "sans-serif",
        backgroundColor: "white",
        // boxShadow: theme.shadows[5],
        padding: "40px",
        
      };
    }
    
  class GenerateInvoiceModal extends Component<{}, { open: boolean }> {
    modalStyle:any = getModalStyle();
  constructor(props: any) {
    super(props);
    
    this.state = {
      open: false,
    };
  }

  handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

   

  render(): React.ReactNode {
    const body = (
      <Box
      style = {this.modalStyle}
      // className = {this.classes.paper}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box fontWeight={"bolder"} fontSize={"22px"}>
            Generate Invoice
          </Box>
          <Box
            fontWeight={"bolder"}
            fontSize={"22px"}
            onClick={this.handleClose}
            className={"actionButton"}
          >
            <IoCloseSharp />
          </Box>
        </Box>
        <Box component={"hr"} />

        <Box margin={"20px 0"}>
          <Box className={"modalLabel"}>Client Name</Box>
          <TextField
            style={{ backgroundColor: "#EBEBEB" }}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            disabled={true}
            value={"Tata Power"}
          />
        </Box>
        <Box margin={"20px 0"}>
          <Box className={"modalLabel"}>Client id</Box>
          <TextField
            style={{ backgroundColor: "#EBEBEB" }}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            disabled={true}
            value={"Tata Power"}
          />
        </Box>
        <Box margin={"20px 0"}>
          <Box className={"modalLabel"}>Project Invoicing Structure</Box>
          <TextField
            style={{ backgroundColor: "#EBEBEB" }}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            disabled={true}
            value={"Tata Power"}
          />
        </Box>

        <Box margin={"20px 0"}>
          <Box className={"modalLabel"}>Overdue Date*</Box>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            type={"date"}
          />
        </Box>

        <Box
          margin={"20px 0"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box width={"45%"}>
            <Box className={"modalLabel"} fontWeight={"bold"}>
              From Date
            </Box>
            <Box>
              <TextField
                fullWidth
                size={"small"}
                variant={"outlined"}
                type={"date"}
              />
            </Box>
          </Box>
          <Box width={"45%"}>
            <Box className={"modalLabel"} fontWeight={"bold"}>
              To Date
            </Box>
            <Box>
              <TextField
                fullWidth
                size={"small"}
                variant={"outlined"}
                type={"date"}
              />
            </Box>
          </Box>
        </Box>

        <Box
          margin={"20px 0"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Button
            style={{ width: "48%", textTransform: "none" }}
            variant="contained"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "48%",
              textTransform: "none",
              backgroundColor: "#4EABF8",
            }}
            variant="contained"
          >
            Generate
          </Button>
        </Box>
      </Box>
    );

    return (
      <>
        <Box>
            <Button
              onClick={this.handleOpen}
              style={{
                backgroundColor: "#4EABF8",
                color: "white",
                padding: "10px 15px",
                textTransform: "none",
              }}
              variant={"contained"}
            >
              Generate Invoices
            </Button>
            <Modal
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </Box>
      </>
    );
  }
}

// Customizable Area End