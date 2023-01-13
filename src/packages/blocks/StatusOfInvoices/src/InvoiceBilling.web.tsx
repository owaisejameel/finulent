
import {
  Typography
} from "@material-ui/core";

// Customizable Area Start
const invoiceIcon = require('../assets/InvoiceIcon.png');
// Customizable Area End

import InvoiceBillingController, {
  Props
} from "./InvoiceBillingController";

export default class InvoiceBilling extends InvoiceBillingController {
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
      {/*@ts-ignore */}
      <div style={styles.mainDiv}>
        <img src={invoiceIcon} alt="" />
        {/* @ts-ignore */}
        <Typography style={styles.invoiceTitle}>Client Invoices</Typography>
      </div>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = {
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: "30px",
    marginLeft: "60px"
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
  invoiceTitle: {
    color: "#2c2c2c",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: "700",
  }
};
// Customizable Area End
