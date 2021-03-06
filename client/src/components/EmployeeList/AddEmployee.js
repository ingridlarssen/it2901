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
  withStyles
} from "@material-ui/core";
import { FaUserPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {
  insertNewEmployee,
  editEmployee
} from "../../actions/contentActions/contentEmployeeActions";
//import {updateSelectedEmployee} from "../../actions/EmployeeListActions/EmployeeListActions";
import moment from "moment";
import Colors from "../../constants/Colors";
import Alert from "react-s-alert";
import DatePicker from "react-date-picker";

const calendar2 = require("../../images/calendar2.svg");

//moment(this.props.date).format("YYYY-MM-DD")

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calendarIcon = (
      <img style={{ width: 20 }} src={calendar2} alt="calendar" />
    );
  }
  get initialState() {
    return {
      open: false,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      base_id: this.props.base_id,
      position: this.props.position,
      startDate: new Date()
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

  handleDatePick = date => {
    this.setState({
      startDate: date
    });
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  handleSubmit(event) {
    event.preventDefault();
    let startDate;
    if (parseInt(this.state.position) === 1) {
      startDate = moment(this.state.startDate).format("YYYY-MM-DD");
    } else {
      startDate = null;
    }
    const employeeData = {
      first_name: this.capitalizeFirstLetter(this.state.first_name),
      last_name: this.capitalizeFirstLetter(this.state.last_name),
      base_id: parseInt(this.state.base_id),
      position: parseInt(this.state.position),
      id: this.props.empId,
      startDate: startDate
    };
    if (this.props.empId) {
      this.props.editEmployee(this.props.empId, employeeData);
    } else {
      this.props.insertNewEmployee(
        moment(this.props.date).format("YYYY-MM-DD"),
        employeeData
      );
    }
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
    const color = Colors.EmployeeColors.moveableEmployee;

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
          <FaUserPlus color={color} />
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
                <div className={classes.formControl}>
                  <FormControl>
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
                      {this.props.bases.map(base => {
                        return (
                          <FormControlLabel
                            value={String(base.id)}
                            control={<Radio color="primary" />}
                            label={base.name}
                            disabled={this.state.position === "2"}
                          />
                        );
                      })}
                    </RadioGroup>
                    <FormLabel disabled={this.props.position === "2"}>
                      Startdato
                    </FormLabel>
                  </FormControl>
                  <div style={{ marginTop: "5px" }}>
                    <DatePicker
                      onChange={this.handleDatePick}
                      clearIcon={null}
                      value={this.state.startDate}
                      locale={"nb"}
                      showLeadingZeros={true}
                      calendarIcon={this.calendarIcon}
                      placeholderText={"Fra"}
                      disabled={this.state.position === "2"}
                    />
                  </div>
                </div>
              )}
              <div className={classes.buttons}>
                <Button type="submit" value="Submit" style={style.editButton}>
                  {buttonText}
                </Button>
                <Button
                  onClick={this.handleClickClose}
                  style={style.editButton}
                  color="secondary"
                >
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
    insertNewEmployee: (date, newEmployee) =>
      dispatch(insertNewEmployee(date, newEmployee)),
    editEmployee: (id, updatedEmployee) =>
      dispatch(editEmployee(id, updatedEmployee))
  };
};

const style = {
  editButton: {
    maxWidth: "200px",
    minWidth: "150px",
    margin: "20px 3px",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.moveableEmployee,
    color: Colors.EmployeeColors.moveableEmployee
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
    "text-align": "center",
    "justify-content": "space-evenly",
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
