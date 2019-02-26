import React, { Component } from "react";
import BaseCardList from "./BaseCardList";

class BaseCard extends Component {
  render() {
    return (
      <div style={Container}>
        {this.props.column.title}
        <BaseCardList
          key={this.props.key}
          column={this.props.column}
          employees={this.props.employees}
        />
      </div>
    );
  }
}

export default BaseCard;

const Container = {
  border: "1px solid black",
  margin: "10px",
  minHeight: "300px"
};
