import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Reorder, getItemStyle, getQuestionListStyle } from "../../utils/questions";
import SubQuestion from "./subquestions";
import classes from './index.module.css'

const getQuestions = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `question-${k}`,
    content: `question ${k}`,
    answers: [`subQuestion-1`, `subQuestion-2`, `subQuestion-3`]
  }));

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: getQuestions(3)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log(result);
      const questions = Reorder(
        this.state.questions,
        result.source.index,
        result.destination.index
      );

      this.setState({
        questions
      });
    } else {
      const answers = Reorder(
        this.state.questions[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index
      );

      const questions = JSON.parse(JSON.stringify(this.state.questions));

      questions[result.type].answers = answers;

      this.setState({
        questions
      });
    }
  }
  handleSave=()=>{
    const event= new CustomEvent('questionorder',{detail: this.state.questions });
    window.dispatchEvent(event);
  }
  render() {
    console.log(this.state.questions);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        <div className={classes.saveButton}><button className={classes.btnPrimary} onClick={this.handleSave}>Save</button></div>
        <Droppable droppableId="droppable" type="QUESTIONS">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getQuestionListStyle(snapshot.isDraggingOver)}
              className={classes.questionWrapper}
            >
              {this.state.questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className={classes.question}
                    >
                      <div {...provided.dragHandleProps}>
                        {question.content}
                        <SubQuestion questionNum={index} question={question} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Questions;
