import React from "react";

class EmployeeDetails extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <h1>
          {this.props.selectedEmployee.first_name +
            " " +
            this.props.selectedEmployee.last_name}
        </h1>
        <p>
          Stillingstype:{" "}
          {this.props.selectedEmployee.position === "1"
            ? "Fast Ansatt"
            : "Vikar"}
        </p>
      </div>
    );
  }
}

const style = {
  wrapper: {
    marginTop: "10px"
  }
};

export default EmployeeDetails;