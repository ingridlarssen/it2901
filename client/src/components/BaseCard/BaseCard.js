import React, { Component } from "react";
import moment from "moment";
import BaseCardList from "./BaseCardList";
import BaseCardHeader from "./BaseCardHeader";
import ChildrenPresent from "./ChildrenPresent";
import ChildrenAbsentIncDec from "./ChildrenAbsentIncDec";
import EmployeesAtBase from "./EmployeesAtBase";
import EmployeesNeeded from "./EmployeesNeeded";
import "./BaseCard.css";
import Adder from "./Adder";
import Colors from "../../constants/Colors";
import { Divider } from "@material-ui/core";

// the proposed number of employees / children
const FACTOR = 0.16;

class BaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = { icon: true };
  }

  calculateEmployeesAtBase = () => {
    var employees = [];
    let totalEmployeesAtBase = 0;
    this.props.employees.forEach(employee => {
      if (employee.base_id === this.props.base.id) {
        totalEmployeesAtBase++;
      }
    });
    employees.push(totalEmployeesAtBase);
    return employees;
  };

  colorRendering = value => {
    let color = Colors.BaseColors.ok;
    if (value >= 0) {
      color = Colors.BaseColors.good;
    } else if (value < -1) {
      color = Colors.BaseColors.bad;
    }
    return color;
  };

  render() {
    let employeesAtBase = this.calculateEmployeesAtBase();
    // calc of needed employees
    const employeesPresent = this.props.dragEmployees.length;
    const childrenPresent =
      this.props.absence.total_children - this.props.absence.children;
    const neededEmployees =
      employeesPresent - Math.round(childrenPresent * FACTOR);
    const color = this.colorRendering(neededEmployees);
    console.log(neededEmployees);

    return (
      <div className="baseCard">
        <BaseCardHeader baseName={this.props.base.name} />
        <div
          style={{
            margin: "auto",
            borderRadius: "2px",
            backgroundColor: color,
            width: "100%",
            height: "10px"
          }}
        />
        <Divider />
        <div className="childrenHolder">
          <ChildrenPresent
            base={this.props.absence.base_id}
            absent={this.props.absence.children}
            totalChildren={this.props.absence.total_children}
          />
          <ChildrenAbsentIncDec
            base={this.props.absence.base_id}
            absent={this.props.absence.children}
            date={moment(this.props.absence.date).format("YYYY-MM-DD")}
            totalChildren={this.props.absence.total_children}
            update={this.props.update}
          />
        </div>
        <EmployeesAtBase
          baseEmployees={employeesAtBase}
          employeesPresent={employeesPresent}
        />
        <EmployeesNeeded neededEmployees={neededEmployees} />
        <BaseCardList
          key={this.props.dragBase.id}
          dragBase={this.props.dragBase}
          dragEmployees={this.props.dragEmployees}
        />
        <Adder
          freeTemps={this.props.freeTemps}
          base={this.props.base}
          addTempToBase={this.props.addTempToBase}
          date={moment(this.props.absence.date).format("YYYY-MM-DD")}
        />
      </div>
    );
  }
}

export default BaseCard;
