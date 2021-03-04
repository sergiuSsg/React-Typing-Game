import React from "react"

function BottomBar({startGame, timeRemaining, isRunning, wordCount, startTime, setScoreArray}) {

    return(
        <div>
            <h4>Time Remaining: {timeRemaining ? timeRemaining : "Time's up!"}</h4>
            <button disabled={isRunning} onClick={startGame}>Start Game</button>
            <br />
            <button onClick={() => setScoreArray([])} >Reset Score</button>
            <h1>
                {
                    !wordCount ? `Word Count: -` :
                    `Word Count: ${wordCount} words in ${startTime} seconds!`
                }
            </h1>
        </div>
    )
}

export default BottomBar