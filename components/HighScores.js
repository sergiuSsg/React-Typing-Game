import React from "react"
import shortid from 'shortid';

function HighScores({scoreArray}) {

    const arr = scoreArray.sort((a, b) => b - a).map((score) => {
        return <li key={shortid.generate()} >{score} {scoreArray.length > 0 ? "Words!" : "--------"}</li>
    }).slice(0, 5)

    return(
        <div>
            <h1>Top 5 Scores</h1>
            <ul style={{listStyle: "none", padding: 0, margin: 0}}>{arr}</ul>
            
        </div>
    )    
}      

export default HighScores