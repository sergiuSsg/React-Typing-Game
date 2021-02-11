import React, { useState, useEffect, useRef } from "react"
import useWordGame from "./hooks/useWordGame"
import "./styles.css"

function App() {

    const {
        textAreaRef,
        isRunning,
        changeHandler,
        text,
        timeRemaining,
        startGame,
        wordCount,
        START_TIME
    } = useWordGame(5)

    return (
        <div>
            <h1>Speed Typing Game</h1>
            <textarea ref={textAreaRef} disabled={!isRunning} onChange={changeHandler} value={text} />
            <h4>Time Remaining: {timeRemaining ? timeRemaining : "Time's up!"}</h4>
            <button disabled={isRunning} onClick={startGame}>Start Game</button>
            <h1>
                {
                    !wordCount ? `Word Count: ${wordCount}` :
                        `Word Count: ${wordCount} words in ${START_TIME} seconds!`
                }
            </h1>
        </div>
    )
}

export default App