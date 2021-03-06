import React from "react"
import { useState, useEffect, useRef } from "react"
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import HighScores from "./components/HighScores";
import "./styles.css"

function App() {
    const START_TIME = 10;
    const localData = localStorage.getItem('scoreArray') 
    const parsedLocalData = localData ? JSON.parse(localData) : []
    const [scoreArray, setScoreArray] = useState(parsedLocalData) 
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

    function endGame() {
        setIsRunning(false)
        setWordCount(wordCounter(text))
        setUpdateScore(true)
    }

    useEffect(() => {
        localStorage.setItem('scoreArray', JSON.stringify(scoreArray))
    }, [scoreArray])

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(prevTime => prevTime - 1)
            }, 1000)
            return () => {
                clearTimeout(timer);
            }
        }  else if (timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining])

    return (
        <div>
            <TopBar startTime={START_TIME}/>
            <textarea ref={textAreaRef} disabled={!isRunning} onChange={changeHandler} value={text} />
            <BottomBar 
                startGame={startGame} 
                setScoreArray={setScoreArray}
                startTime={START_TIME}
                timeRemaining={timeRemaining} 
                isRunning={isRunning} 
                wordCount={wordCount} 
            />
            <HighScores scoreArray={scoreArray}/>
        </div>
    )
}

export default App
