import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  withStyles
} from "@material-ui/core";
import { FaUserPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { insertNewEmployee } from "../../actions/newEmployeeAction";
import moment from "moment";
import Colors from "../../constants/Colors";
import Alert from "react-s-alert";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  get initialState() {
    return {
      open: false,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      base_id: this.props.base_id,
      position: this.props.position
    };
  }

  resetBuilder = () => {
    this.setState(this.initialState);
  };

  handleClickOpen = () => {
    this.setState(this.initialState);
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.resetBuilder();
  };

  handleChange = name => event => {
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.insertNewEmployee(
      this.state.first_name,
      this.state.last_name,
      this.state.base_id,
      this.state.position,
      moment(this.props.date).format("YYYY-MM-DD"),
      this.props.empId
    );
    let text;
    if (this.props.showEdit) {
      text = "Ansatt redigert";
    } else {
      this.state.position === "1"
        ? (text = "Ansatt registrert")
        : (text = "Vikar registrert");
    }
    Alert.success(text, {
      position: "bottom-right",
      effect: "jelly",
      timeout: 1500
    });
    this.handleClickClose();
  }

  render() {
    const { classes } = this.props;
    let button;
    let buttonText;
    let header;
    let showEdit = this.props.showEdit;

    if (showEdit) {
      button = (
        <Button onClick={this.handleClickOpen} style={style.editButton}>
          <FaEdit />
          Rediger ansatt
        </Button>
      );
      header = "Rediger ";
      buttonText = "Rediger";
    }
    if (!showEdit) {
      button = (
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
          size="large"
          style={styles.addButton}
        >
          <FaUserPlus color={Colors.EmployeeColors.moveableEmployee} />
        </Button>
      );
      header = "Registrer ny ";
      buttonText = "Registrer";
    }

    return (
      <div>
        {button}
        <Dialog open={this.state.open} onClose={this.handleClickClose}>
          <DialogTitle>
            {" "}
            {header} {this.props.tempOnly ? "vikar" : "ansatt"}{" "}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                required
                margin="dense"
                value={this.state.first_name}
                id="firstName"
                onChange={this.handleChange("first_name")}
                label="Fornavn"
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                required
                margin="dense"
                id="lastName"
                value={this.state.last_name}
                onChange={this.handleChange("last_name")}
                label="Etternavn"
                variant="outlined"
              />
              {!this.props.tempOnly && (
                <div>
                  <FormControl className={classes.formControl}>
                    <FormLabel> Ansettelsesform </FormLabel>
                    <RadioGroup
                      value={this.state.position}
                      onChange={this.handleChange("position")}
                    >
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Vikar"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Fast ansatt"
                      />
                    </RadioGroup>
                    <FormLabel disabled={this.props.position === "2"}>
                      {" "}
                      Avdeling{" "}
                    </FormLabel>
                    <RadioGroup
                      value={this.state.position === "1" && this.state.base_id}
                      onChange={this.handleChange("base_id")}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Gåsedammen"
                        disabled={this.state.position === "2"}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Bekkdalen"
                        disabled={this.state.position === "2"}
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio color="primary" />}
                        label="Steinbruddet"
                        disabled={this.state.position === "2"}
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio color="primary" />}
                        label="Gårdsbruket"
                        disabled={this.state.position === "2"}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
              <div className={classes.buttons}>
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  className={classes.textField}
                >
                  {buttonText}
                </Button>
                <Button variant="contained" onClick={this.handleClickClose}>
                  Avbryt
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date.selectedDate
});

const mapDispatchToProps = dispatch => {
  return {
    insertNewEmployee: (firstName, lastName, baseID, position, date, empId) =>
      dispatch(
        insertNewEmployee(firstName, lastName, baseID, position, date, empId)
      )
  };
};

const style = {
  editButton: {
    maxWidth: "200px",
    minWidth: "150px",
    margin: "20px auto",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.editEmployee,
    color: Colors.EmployeeColors.editEmployee
  }
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: 16,
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginRight: 10
  },
  buttons: {
    "text-align": "center"
  },
  addButton: {
    marginBottom: "10px"
  }
});

const styledComponent = withStyles(styles)(AddEmployee);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledComponent);
