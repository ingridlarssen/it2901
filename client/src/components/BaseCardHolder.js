import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import styled from "styled-components";
import { connect } from "react-redux"
import { updateMovedEmployee } from "../actions/movedEmployeeAction"


const Container = styled.div`
	display: flex;
`;

// TODO: Replace this.state with this.props.data and connect with redux

class BaseCardHolder extends Component {

	// this is the place to call the API endpoint to notify of reorder after handleDragging() completes
	onDragEnd = result => {
		this.handleDragging(result);
	};

	handleDragging = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = this.props.data.columns[source.droppableId];
		const finish = this.props.data.columns[destination.droppableId];

		// when an item is dropped in the same column
		if (start === finish){
		/* For rearranging items within the same column. For now, nothing happens

			const newEmployeeIds = Array.from(start.employeeIds);
			newEmployeeIds.splice(source.index, 1);
			newEmployeeIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				employeeIds: newEmployeeIds,
			};


			const newState = {
				...this.props.data,
				columns: {
					...this.props.data.columns,
					[newColumn.id]: newColumn,
				},
			};
		
		*/
			return;
		}
		// if dest column is different than source column
		const employeeId = result.draggableId.substr(-1);
		const baseId = result.destination.droppableId.substr(-1);
		const date = this.props.date;
		this.props.updateMovedEmployee(baseId, employeeId, date);

	}

  render() {
    return (
    	// NB! Advised to wrap entire app in DragDropContext: https://github.com/atlassian/react-beautiful-dnd#dragdropcontext
    	<DragDropContext onDragEnd={this.onDragEnd}>
    		<Container>
		    	{this.props.data.columnOrder.map(columnId => {
			    	const column = this.props.data.columns[columnId];
			    	const employees = column.employeeIds.map(employeeId => this.props.data.employees[employeeId]);

			    	return <Column key={column.id} column={column} employees={employees} />;
		    	})}
	    	</Container>
    	</DragDropContext>
    );
  }

}

const mapDispatchToProps = dispatch => {
	return {
		updateMovedEmployee: (baseId, employeeId, date) => dispatch(updateMovedEmployee(baseId, employeeId, date))
	};
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(BaseCardHolder);