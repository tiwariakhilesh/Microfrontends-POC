export const Reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  export const getItemStyle = (isDragging, draggableStyle) => {
    return {
      userSelect: "none",
      padding: 10,
      textAlign: "left",
      border: "1px solid #ccc",
      background: isDragging ? "lightgreen" : "white",
      ...draggableStyle
    };
  };
  
  export const getQuestionListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white"
  });
  
  export const getAnswerListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white",
    width: "100%",
    padding: 5,
    marginTop: "10px"
  });
  