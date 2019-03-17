import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
`;

// use avatar with image from db
const HandleUnMoveable = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 10px;
  margin-right: 8px;
`;

const HandleMoveable = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 10px;
  margin-right: 8px;
`;

class Employee extends Component {
  render() {
    return (
      <Draggable
        isDragDisabled={this.props.employee.moveable === "1" ? false : true}
        draggableId={this.props.employee.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
        		<Container
	            {...provided.draggableProps}
	            {...provided.dragHandleProps}
	            ref={provided.innerRef}
	            isDragging={snapshot.isDragging}
	          >
	            {this.props.employee.moveable === "1" ? (
	              <HandleMoveable />
	            ) : (
	              <HandleUnMoveable />
	            )}
	            {this.props.employee.content}
	          </Container>
        )}
      </Draggable>
    );
  }
}

export default Employee;
