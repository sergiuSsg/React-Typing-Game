import React from "react"
import { useState, useEffect, useRef } from "react"
import BottomBar from "./components/BottomBar";
import TextArea from "./components/TextArea"
import TopBar from "./components/TopBar"
import HighScores from "./components/HighScores";
import "./styles.css"


function App() {

    const localData = localStorage.getItem('arrayTest') 

    const parsedLocalData = localData ? JSON.parse(localData) : []


    const [scoreArray, setScoreArray] = useState(parsedLocalData) 


    const START_TIME = 5;
    const [text, setText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isRunning, setIsRunning] = useState(false);    
    const [updateScore, setUpdateScore] = useState(false);
    const [wordCount, setWordCount] = useState(null);
    const textAreaRef = useRef(null);

    if(timeRemaining === 0 && updateScore ){
        setScoreArray((oldScoreArray) => [...oldScoreArray, wordCount])
        setUpdateScore(false)
    }

    useEffect(() => {
        localStorage.setItem('arrayTest', JSON.stringify(scoreArray))
    }, [scoreArray])

    function changeHandler(event) {
        const { value } = event.target
        setText(value)
    }

    function wordCounter(string) {
        const counter = string.trim().split(" ").filter(word => word !== "")
        return counter.length
    }

    function startGame() {
        setIsRunning(true)
        setTimeRemaining(START_TIME)
        setWordCount(0)
        setText("")
        textAreaRef.current.disabled = false;
        textAreaRef.current.focus()
    }

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            const time = setTimeout(() => {
                setTimeRemaining(prevTime => prevTime - 1)
            }, 1000)
            return () => {
                clearTimeout(time);
            }
        }  else if (timeRemaining === 0) {
            setIsRunning(false)
            setWordCount(wordCounter(text))
            setUpdateScore(true)
        }
    }, [timeRemaining])

    return (
        <div>
            <TopBar />
            <TextArea textAreaRef={textAreaRef} isRunning={isRunning} changeHandler={changeHandler} text={text}/>
            <BottomBar 
                startGame={startGame} 
                timeRemaining={timeRemaining} 
                isRunning={isRunning} 
                wordCount={wordCount} 
                startTime={START_TIME}
                setScoreArray={setScoreArray}
            />
            <HighScores scoreArray={scoreArray}/>
        </div>
    )
}

export default App
