import React, { useEffect, useState } from 'react'

import Navbar from './Navbar'

import { Navigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


export default function AssessmentPage() {
    
    const questions = [
        "Our church's ministry strategy is firm but flexible to accommodate unexpected game changers such as AI.",
        "Our leadership team knows of the potential risks and rewards of leveraging AI.",
        "Our leadership team understands the value of tapping experts to educate our staff about AI."
    ];

    const [navigateTo, setNavigateTo] = useState("");
    const [progressWidth, setProgressWidth] = useState("0");
    const [questionNumber, setQuestionNumber] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answersData, setAnswersData] = useState([]);

    useEffect(() => {
        if(questionNumber === null) {
            setTimeout(() => {
                setQuestionNumber(1);
            }, 2000);
        }
        else{
            let pw = (questionNumber/questions.length * 100).toFixed(0);
            setProgressWidth(`${pw}%`);
        }
    }, [questionNumber])
    
    const selectAnswer = (answer) => {
        setSelectedAnswer(answer);
        let a = answersData;
        a[questionNumber-1] = answer;
        setAnswersData(d => a);
        if(questionNumber !== questions.length){
            setTimeout(() => {
                if(answersData[questionNumber]){
                    setSelectedAnswer(answersData[questionNumber]);
                }
                else{
                    setSelectedAnswer(null);
                }
                setQuestionNumber(questionNumber => questionNumber + 1);
            }, 1000);
        }
    }

    const goBack = () => {
        if(questionNumber !== 1){
            setQuestionNumber(q => q-1);
            setSelectedAnswer(answersData[questionNumber-2]);
        }
        else{
            setNavigateTo("/");
            reset();
        }
    }
    
    const goNext = () => {
        if(questionNumber !== questions.length){
            setQuestionNumber(q => q+1);
            if(answersData[questionNumber]){
                setSelectedAnswer(answersData[questionNumber]);
            }
        }
    }
    
    const reset = () => {
        setProgressWidth("0%");
        setQuestionNumber(null);
        setSelectedAnswer(null);
        setAnswersData([]);
    }
    
  return (
    <div className='assessment'>
        {
            navigateTo !== "" && <Navigate to={navigateTo} />
        }
        <Navbar />
        <div className="main">
            {
                questionNumber ?
                <div className='progress'>
                    <div className='progressPercentage' style={{width: progressWidth}}>{progressWidth}</div>
                    <div className='progressBar'>
                        <div style={{width: progressWidth}} className='currentProgress'>
                        </div>
                    </div>
                    <div className='questionCategory'>STRATEGY</div>
                    <div className="questionNumber"><b>{questionNumber}</b>/{questions.length}</div>
                    <div className='question'>{questions[questionNumber - 1]}</div>
                    <div className='answers'>
                        <div className="answerBar"></div>
                            <div className='answerProgressBar'>
                                <div className='progressTail' style={{ width: selectedAnswer ? `calc(${(selectedAnswer - 1)*25}% + 10px)` : '0px'}}></div>
                                {selectedAnswer && <div className='progressHead'>
                                    <div className="headbox"></div>
                                </div>}
                            </div>
                        <div>
                            <div className='answerBox' onClick={() => selectAnswer(1)}>
                                <div className='answerPoint'></div>
                                <div className={`${selectedAnswer === 1 && 'selectedAnswer'}`}>Strongly Disagree</div>
                            </div>
                            <div className='answerBox' onClick={() => selectAnswer(2)}>
                                <div className='answerPoint'></div>
                                <div className={`${selectedAnswer === 2 && 'selectedAnswer'}`}>Disagree</div>
                            </div>
                            <div className='answerBox' onClick={() => selectAnswer(3)}>
                                <div className='answerPoint'></div>
                                <div className={`${selectedAnswer === 3 && 'selectedAnswer'}`}>Neutral</div>
                            </div>
                            <div className='answerBox' onClick={() => selectAnswer(4)}>
                                <div className='answerPoint'></div>
                                <div className={`${selectedAnswer === 4 && 'selectedAnswer'}`}>Agree</div>
                            </div>
                            <div className='answerBox' onClick={() => selectAnswer(5)}>
                                <div className='answerPoint'></div>
                                <div className={`${selectedAnswer === 5 && 'selectedAnswer'}`}>Strongly Agree</div>
                            </div>
                        </div>
                    </div>
                    <div className='buttonsFlex'>
                        <div className='button' onClick={() => goBack()}><FaArrowLeftLong /> Prev</div>
                        {answersData[questionNumber-1] && <div className='button' onClick={() => goNext()}>Next <FaArrowRightLong /></div>}
                    </div>
                </div> : 
                <div className="loader">
                    <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#6e0cf9"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                </div>
            }
        </div>
    </div>
  )
}
