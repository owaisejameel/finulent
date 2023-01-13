import React, { Component } from "react";

import {
  Box,
  Button,
  InputLabel,
  Typography,
  // Customizable Area Start
  Table,
  TableContainer,
  TextField,
  TableRow,
  TableCell, TableBody,
  Modal,
  Select,
  FormControl
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { AiFillCaretLeft, AiOutlineDelete } from "react-icons/ai";
import "./Generic.css";
import { finulentImageInvoice } from "./assets";
import { IoCloseSharp } from "react-icons/io5";

// Customizable Area End
import GenericInvoiceController, { Props } from "./GenericInvoiceController";

export default class GenericInvoice extends GenericInvoiceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <>
        <Box bgcolor={"#EEEEEE"} width={"85vw"} marginLeft={"15vw"}>
          <Centered>
            <Box width={"95%"}>
              <Box
                margin={"20px 0px"}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    className={"hoverPointer"}
                    marginRight={"10px"}
                    borderRadius={"5px"}
                    padding={"10px 10px"}
                    bgcolor={"white"}
                    color={"black"}
                    onClick={this.handleBack}
                  >
                    <AiFillCaretLeft />
                  </Box>
                  <Box className="buttonText">
                    {this.state.pageType ? "Invoice" : "Edit Invoice"}
                  </Box>
                </Box>

                {this.state.pageType ? (
                  <Button
                    color={"default"}
                    variant={"contained"}
                    style={{ textTransform: "none" }}
                    onClick={this.switchToEdit}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Button
                      style={{ textTransform: "none", fontWeight: "bold" }}
                      color={"default"}
                      variant={"contained"}
                      onClick={this.switchToView}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#4EABF8",
                        textTransform: "none",
                        fontWeight: "bold",
                        marginLeft: "10px",
                      }}
                      variant={"contained"}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>

              <Box bgcolor={"white"}>
                {/* Image */}
                <Box margin={"10px 0px"} height={"25vh"} width={"100%"}>
                  <img src={finulentImageInvoice} className={"finImage"} />
                </Box>
                <Box />

                <Centered>
                  <Box className="genText" width={"88%"}>
                    <Box
                      alignItems={"center"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box width={"40%"}>
                        <Typography>Finulent Solutions LLP</Typography>
                        <Typography>
                          216, Link Way Industrial Estate,Malad (W)
                        </Typography>
                        <Typography>Mumbai - 400 064, India</Typography>
                      </Box>

                      <Box width={"55%"}>
                        <AddressTable />
                      </Box>
                    </Box>

                    <TermsTable />
                    <BillingTable data={this.state}/>
                    <Box marginY={"5vh"} component={"hr"} />
                    <OtherChargesTable  data={this.state}/>
                    <Bill />
                    <Comment data={this.state}/>
                    <Box marginY={"3.5vh"} component={"hr"} />
                    <AccountDetails data={this.state}/>
                  </Box>
                </Centered>
              </Box>
            </Box>
          </Centered>
        </Box>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
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

class AddressTable extends Component {
  constructor(props: any) {
    super(props);
  }

  createData = (name: string, calories: number) => {
    return { name, calories };
  };

  rows = [this.createData("Frozen yoghurt", 159)];

  render() {
    return (
      <>
        <Box margin={"10px 0px"} border={"1px solid gray"}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableRow
                className="tHead"
                style={{ backgroundColor: "#F6A724" }}
              >
                <TableCell align="center">Invoice#</TableCell>
                <TableCell align="center">From Date</TableCell>
                <TableCell align="center">To Date</TableCell>
              </TableRow>
              <TableBody>
                {this.rows.map((row) => (
                  <TableRow key={row.name} className={"tCell"}>
                    <TableCell align="center">FS LLP/22-23/055</TableCell>
                    <TableCell align="center">22 Mar 22</TableCell>
                    <TableCell align="center">21 June 22</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

class TermsTable extends Component {
  constructor(props: any) {
    super(props);
  }

  createData = (name: string, calories: string) => {
    return { name, calories };
  };

  rows = [
    this.createData("Mark Jones", "GST not charged as covered under LUT"),
    this.createData("Address -", "(ARN: AD2702220272320)"),
  ];

  render() {
    return (
      <>
        <Box border={"1px solid gray"} marginTop={"5vh"} marginBottom={"2vh"}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableRow
                className="tHead"
                style={{ backgroundColor: "#F6A724" }}
              >
                <TableCell align="center">BILL TO</TableCell>
                <TableCell align="center">Terms</TableCell>
              </TableRow>
              <TableBody>
                {this.rows.map((row) => (
                  <TableRow key={row.name} className={"tCell"}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

class Bill extends Component {
  render(): React.ReactNode {
    return (
      <>
        {/* Total Amount Section Start*/}
        <Centered>
          <Box className={"totalAmount"} width={"95%"}>
            <Box fontWeight={"bolder"} component={"div"}>
              <Box>Total Amount</Box>
              <Box>₹6640</Box>
            </Box>
            <Box marginTop={"15px"} component={"div"}>
              <Box color={"#868686"} fontSize={"10px"}>
                Tax Details
              </Box>
              <Box />
            </Box>
            <Box margin={"10px 0px"} component={"div"}>
              <Box>CGST</Box>
              <Box>₹120</Box>
            </Box>
            <Box margin={"10px 0px"} component={"div"}>
              <Box>IGST</Box>
              <Box>₹100</Box>
            </Box>
            <Box margin={"10px 0px"} component={"div"}>
              <Box>SGST</Box>
              <Box>₹120</Box>
            </Box>
            <Box margin={"10px 0px"} component={"div"}>
              <Box>Other Tax</Box>
              <Box>₹170</Box>
            </Box>
            <Box component={"hr"} />
            <Box fontWeight={"bolder"} margin={"15px 0px"} component={"div"}>
              <Box>Gross Total</Box>
              <Box>₹7180</Box>
            </Box>
          </Box>
        </Centered>
        {/* Total Amount Section End*/}
      </>
    );
  }
}

class Comment extends Component<{data:any}> {
  comment =
    "Et quidem exercitus quid ex eo delectu rerum, quem ad id est eligendi optio, cumque nihil ut et ultimum bonorum, quod omnium philosophorum sententia tale debet esse, quid malum, sensu ludicari, sed animo etiam erga nos causae confidere, sed et aperta iudicari etenim quoniam detractis.";

  constructor(props: any) {
    super(props);
  }

  render() {
    const {pageType} = this.props.data;
    return (
      <>
        <Box marginTop={"3.5vh"}>
          <Box fontWeight={"bold"} fontSize={"14px"} marginBottom={"1.5vh"}>
            Comment
          </Box>

          {!pageType && (
            <TextField
              inputProps={{
                style: {
                  fontSize: "13px",
                  padding: "0px 10px",
                  color: "#B1B0B6",
                },
              }}
              multiline
              variant="outlined"
              value={this.comment}
              maxRows={4}
              fullWidth
            />
          )}
          {pageType && (
            <Box marginTop={"15px"} color={"#B1B0B6"} fontSize={"13px"}>
              {this.comment}
            </Box>
          )}
        </Box>
      </>
    );
  }
}

class AccountDetails extends Component<{data:any}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const {pageType} = this.props.data;
    return (
      <>
        <Centered>
          <Box width={"95%"}>
            <Box marginBottom={"2.5vh"}>
              I have no objection if the amount is credited to my bank directly.
              Bank details are given below:
            </Box>

            <Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Account Number</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box>Finulent Solution LLP</Box>
                  ) : (
                    <TextField
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={"Finulent Solution LLP"}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>A/C Number</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box>7384937265ICIC</Box>
                  ) : (
                    <TextField
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={"7384937265ICIC"}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>MICR Code</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box> ICIC79932</Box>
                  ) : (
                    <TextField
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={"ICIC79932"}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Branch IFSC Code</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box>8948372</Box>
                  ) : (
                    <TextField
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={"8948372"}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Swift Code</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box>7801</Box>
                  ) : (
                    <TextField
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={"7801"}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Branch Address</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box>
                      216, Link Way Industrial Estate, Malad (W) Mumbai -
                      400064, India
                    </Box>
                  ) : (
                    <TextField
                      multiline
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={`216, Link Way Industrial Estate, Malad (W) Mumbai - 400064, India`}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"2vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>
                  Whether the tax is payable under the Reverse charge
                </Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"45%"} fontWeight={"bolder"}>
                  {pageType ? (
                    <Box>No</Box>
                  ) : (
                    <TextField
                      fullWidth
                      size={"small"}
                      variant={"outlined"}
                      value={"No"}
                    />
                  )}
                </Box>
              </Box>
              <Box marginY={"4vh"} display={"flex"} alignItems={"center"}>
                <Box width={"18%"}>Signature</Box>
                <Box marginX={"5px"}>:</Box>
                <Box width={"27%"} fontWeight={"bolder"}>
                  <img
                    src={`https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Oprah-Winfrey-Signature-1.png`}
                    width={"100%"}
                    height={"100px"}
                    className={"signature"}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Centered>
        <Box marginBottom={"2vh"} color={"#9A9A9A"} display={"flex"} justifyContent={"flex-end"}>
              <Box>India : +91 97694 92539</Box>
              <Box marginX={"0.5vh"}>|</Box>
              <Box>info@finulent.com</Box>
              <Box marginX={"0.5vh"}>|</Box>
              <Box>US: +1 97831 055 45</Box>      
        </Box>
      </>
    );
  }
}

class BillingTable extends Component<{data:any}>{
  constructor(props: any) {
    super(props);
  }

  createData = (name: string, calories: number) => {
    return { name, calories };
  };

  rows = [
    this.createData("Frozen yoghurt", 159),
    this.createData("Frozen yoghurt", 159),
    this.createData("Frozen yoghurt", 159),
    this.createData("Frozen yoghurt", 159),
  ];

  render() {
    const {pageType} = this.props.data;

    return (
      <>
        <Box marginY={"3vh"}>
          <TableContainer >
            <Table aria-label="simple table">
              <TableRow
                className="tHead billLastRow"
                style={{
                  backgroundColor: "#F6A724",
                  border: "1px solid black",
                }}
              >
                <TableCell align="center">S no.</TableCell>
                <TableCell align="center">Project Date</TableCell>
                <TableCell align="center">Project Id</TableCell>
                <TableCell align="center">Project Name</TableCell>
                <TableCell align="center">Project Type</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
              <TableBody>
                {this.rows.map((row, i) => (
                  <TableRow key={i} className={"billTable"}>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell align="center">22 Mar 22</TableCell>
                    <TableCell align="center">12BA643829A</TableCell>
                    <TableCell align="center">
                      Setup batteries at client site for first, second floor and
                      third roof
                    </TableCell>
                    <TableCell align="center">Enhancement</TableCell>
                    <TableCell align="center" >
                      <Box display={"flex"} alignItems={"center"}>
                      <Box>₹1200</Box>
                      {!pageType && (
                      <Box  className={"icon"} style={{ border: "none",transform:"translate(30px, 0px)"}}>
                        <AiOutlineDelete />
                      </Box>
                    )}
                      </Box> </TableCell>
                    
                  </TableRow>
                ))}
                <TableRow className={"billLastRow"}>
                  <TableCell
                    style={{ borderLeft: "1px solid black" }}
                    colSpan={2}
                    align="center"
                  >
                    {!pageType && (
                      <AddProjectModal/>
                    )}
                  </TableCell>
                  <TableCell colSpan={2} align="center" />
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    Billing Amount
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bolder",
                      borderRight: "1px solid black",
                    }}
                    align="center"
                  >
                    ₹6240
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

class OtherChargesTable extends Component<{data:any}> {
  constructor(props: any) {
    super(props);
  }

  createData = (name: string, calories: number) => {
    return { name, calories };
  };

  rows = [
    this.createData("Frozen yoghurt", 159),
    this.createData("Frozen yoghurt", 159),
    this.createData("Frozen yoghurt", 159),
    this.createData("Frozen yoghurt", 159),
  ];

  render() {
    const {pageType} = this.props.data;
    return (
      <>
        <Box marginY={"3vh"}>
          <Box marginY={"2vh"} fontWeight={"bolder"} fontSize={"20px"}>Others</Box>
          <TableContainer >
            <Table aria-label="simple table">
              <TableRow
                className="tHead billLastRow"
                style={{
                  backgroundColor: "#F6A724",
                  border: "1px solid black",
                }}
              >
                <TableCell align="center">S no.</TableCell>
                <TableCell align="center">Project Date</TableCell>
                <TableCell align="center">Project Id</TableCell>
                <TableCell align="center">Project Name</TableCell>
                <TableCell align="center">Project Type</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
              <TableBody>
                {this.rows.map((row, i) => (
                  <TableRow key={i} className={"billTable"}>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell align="center">22 Mar 22</TableCell>
                    <TableCell align="center">12BA643829A</TableCell>
                    <TableCell align="center">
                      Setup batteries at client site for first, second floor and
                      third roof
                    </TableCell>
                    <TableCell align="center">Enhancement</TableCell>
                    <TableCell align="center">
                      <Box display={"flex"} alignItems={"center"}>
                      <Box>₹1200</Box>
                      {!pageType && (
                      <Box  className={"icon"} style={{ border: "none",transform:"translate(30px, 0px)"}}>
                        <AiOutlineDelete />
                      </Box>
                    )}
                      </Box> </TableCell>
                    
                  </TableRow>
                ))}
                <TableRow className={"billLastRow"}>
                  <TableCell
                    style={{ borderLeft: "1px solid black" }}
                    colSpan={2}
                    align="center"
                  >
                    {!pageType && (
                      <AddProjectModal/>
                    )}
                  </TableCell>
                  <TableCell colSpan={2} align="center" />
                  <TableCell style={{ fontWeight: "bolder" }} align="center">
                    Billing Amount
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bolder",
                      borderRight: "1px solid black",
                    }}
                    align="center"
                  >
                    ₹6240
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

function getModalStyle(){
  const top = 50;
  const left = 50;
  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: "35%",
    border: "1px solid #000",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
    padding: "25px 10px",
    
  };
}

class AddProjectModal extends Component<{}, { open: boolean }> {
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
          <Box fontSize={"20px"} fontWeight={"bold"}>Add Project</Box>
          <Box onClick={this.handleClose} className={"icon"} fontSize={"20px"} fontWeight={"bold"}><IoCloseSharp/></Box>
        </Box>

        <Box component={"hr"} />
        <Centered>
        <Box width={"90%"}>
        <Box marginY={"2.5vh"}>
          <Box className={"modalLabel"} fontSize={"13px"}>Project Date</Box>
          <Box><TextField type={"date"}  variant={"outlined"} fullWidth size={"small"} placeholder="Project Id goes here"/></Box>
        </Box>
        <Box marginY={"2.5vh"}>
          <Box className={"modalLabel"} fontSize={"13px"}>Project Id</Box>
          <Box><TextField variant={"outlined"} fullWidth size={"small"} placeholder="Project Id goes here"/></Box>
        </Box>
        <Box marginY={"2.5vh"}>
          <Box className={"modalLabel"} fontSize={"13px"}>Project Name</Box>
          <Box><TextField variant={"outlined"} fullWidth size={"small"} placeholder="Project name goes here"/></Box>
        </Box>
        <Box marginY={"2.5vh"}>
          <Box className={"modalLabel"} fontSize={"13px"}>Project Type</Box>
          <Box><FormControl size="small" fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">Select</InputLabel>
        <Select
          native
          // value={state.age}
          // onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl></Box>
        </Box>
        <Box marginY={"2.5vh"}>
          <Box className={"modalLabel"} fontSize={"13px"}>Project Amount</Box>
          <Box><TextField variant={"outlined"} fullWidth size={"small"} placeholder="Enter Project Amount here"/></Box>
        </Box>
        </Box>
        </Centered>
        <Box component={"hr"} />
        <Box display={"flex"} justifyContent={"end"}>
            <Button onClick={this.handleClose} style={{textTransform:"none"}} variant={"contained"} color={"default"}>Cancel</Button>
            <Button variant={"contained"} color={"default"} style={{marginLeft:"15px",backgroundColor:"#4EABF8",textTransform:"none"}}>Add</Button>
        </Box>
    </Box>
  );

  return (
    <>
      <Box>
          <Button
            onClick={this.handleOpen}
            size={"small"}
            variant={"contained"}
            style={{
              backgroundColor: "#4FABF6",
              textTransform: "none",
              color: "white",
              padding: "10px 15px"
            }}
          >
            Add Project
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