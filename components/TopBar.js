import React from "react"

function TopBar({startTime}) {
    return (
    <div>
        <h1>Speed Typing Game</h1>
        <h4>How many words can you type in {startTime} seconds?</h4>
    </div>
    )
}

export default TopBar
