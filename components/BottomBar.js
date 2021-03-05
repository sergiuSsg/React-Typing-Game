import React from "react"

function BottomBar({startGame, setScoreArray, startTime, timeRemaining, isRunning, wordCount}) {

    return(
        <div>
            <h3>Time Remaining: {timeRemaining ? timeRemaining : "Time's up!"}</h3>
            <button disabled={isRunning} onClick={startGame}>Start Game</button>
            <br />
            <button disabled={isRunning} onClick={() => setScoreArray([])} >Reset Score</button>
            <h3>
                {
                    !wordCount ? `Word Count: -` :
                    `Word Count: ${wordCount} words in ${startTime} seconds!`
                }
            </h3>
        </div>
    )
}

export default BottomBar
