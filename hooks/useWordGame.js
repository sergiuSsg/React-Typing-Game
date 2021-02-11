import { useState, useEffect, useRef } from "react"

function useWordGame(startingTime = 10) {
    const WORD_COUNT = 0
    const [text, setText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(startingTime);
    const [isRunning, setIsRunning] = useState(false);
    const [wordCount, setWordCount] = useState(WORD_COUNT);
    const textAreaRef = useRef(null)

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
        setTimeRemaining(startingTime)
        setWordCount(WORD_COUNT)
        setText("")
        //we give the prop of text area (disabled prop) to false so we can focus because js runs these lines asyncronous and runs 
        //textAreaRef.current.focus() before finishing         setIsRunning(true)
        textAreaRef.current.disabled = false;
        textAreaRef.current.focus()
    }

    function endGame() {
        setIsRunning(false)
        setWordCount(wordCounter(text))
        console.log(isRunning)
    }

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            const time = setTimeout(() => {
                setTimeRemaining(prevTime => prevTime - 1)
                console.log("every time")
            }, 1000)

            //          return () => {
            //              clearTimeout(time);
            //         }
        } else if (timeRemaining === 0) {
            endGame()
        }

    }, [timeRemaining, isRunning])

    return { textAreaRef, isRunning, changeHandler, text, timeRemaining, startGame, wordCount }

}

export default useWordGame
