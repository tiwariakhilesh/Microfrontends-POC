import React, { useEffect, useState } from 'react'
import SubQuestion from './subQuestion';
export default function () {
    const [questions,setQuestions]=useState([]);
   
    useEffect(()=>{
        window.addEventListener('questionorder',handleQuestionOder);
    },[])
    const handleQuestionOder=event=>{
        const reorderedQuestions= event && event.detail;
        setQuestions(reorderedQuestions);
    }
    const renderQuestions=()=>{
        return  questions.map((question,index)=>{
            return (
                <div className="question-container" key={index}>
                    {question.content}
                    {question.answers && question.answers.length ? <SubQuestion options={question.answers}/>:null}
                </div>
            )
        })
    }
    return (
        <div>
            {renderQuestions()}
        </div>
    )
}
