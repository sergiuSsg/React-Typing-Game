import React from "react"


function TextArea({textAreaRef, isRunning, changeHandler, text}) {
    return <textarea ref={textAreaRef} disabled={!isRunning} onChange={changeHandler} value={text} />
}

export default TextArea