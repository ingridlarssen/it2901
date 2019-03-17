import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddEmployee from "../EmployeeTools/AddEmployee";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Adder extends Component {
  constructor(props) {
    super(props);
    this.state = { icon: true, open: false, selectedIndex: null };
  }

  addTemp = () => {
    this.setState({ open: false });
    this.props.addTempToBase(
      this.props.date,
      this.state.selectedIndex,
      this.props.base.id
    );
  };

  render() {
    return (
      <div>
        {" "}
        {this.state.icon ? (
          <div
            className="addButton"
            onMouseOver={() => this.setState({ icon: false })}
          >
            <div className="ic" key="1">
              <MaterialIcon icon="add" color="white" size={18} />
            </div>
          </div>
        ) : (
          <div
            className="addText"
            onMouseLeave={() => this.setState({ icon: true })}
            onClick={() => this.setState({ open: true })}
          >
            <div className="txt">Legg til vikar på base</div>
            <div className="ic" key="2">
              <MaterialIcon icon="add" color="white" size={18} />
            </div>
          </div>
        )}
        <Dialog
          open={this.state.open}
          onEscapeKeyDown={() => this.setState({ open: false })}
          onBackdropClick={() => this.setState({ open: false })}
        >
          <DialogTitle> Legg til vikar på {this.props.base.name} </DialogTitle>
          <DialogContent>
            <div style={style.window}>
              <div style={style.new}>
                <div>Legg til ny: </div>
                <AddEmployee />
              </div>
              <List style={style.list} component="nav">
                {this.props.freeTemps.map(employee => (
                  <ListItem
                    style={
                      employee.id === this.state.selectedIndex
                        ? style.listItemSelected
                        : employee.position === 1
                        ? style.listItemRegular
                        : style.listItemTemporary
                    }
                    button
                    key={employee.id}
                    onClick={() =>
                      this.setState({ selectedIndex: employee.id })
                    }
                  >
                    <ListItemText
                      primary={employee.first_name + " " + employee.last_name}
                    />
                  </ListItem>
                ))}
              </List>
              {this.state.selectedIndex && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addTemp}
                >
                  Legg til
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const style = {
  window: {
    padding: "5%"
  },
  list: {
    width: "100%",
    border: "5px",
    maxHeight: "300px",
    overflow: "auto"
  },
  listItemRegular: {
    margin: "2px",
    backgroundColor: "#43a047"
  },
  listItemTemporary: {
    margin: "2px",
    backgroundColor: "#fb8c00"
  },
  listItemSelected: {
    margin: "2px",
    backgroundColor: "#0091ea"
  },
  new: {
    display: "flex",
    justifyContent: "space-around"
  }
};

export default Adder;