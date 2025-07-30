import React, {useState, useRef, useEffect} from 'react'

function Timer(){
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [userOption, setUserOption] = useState("Stop")
    const [secValue, setSecValue] = useState("seconds")
    const [minValue, setMinValue] = useState("minutes")
    const [isDisabled, setIsDisabled] = useState(false)
    const [isDisabled2, setIsDisabled2] = useState(true)
    const [hasStarted, setHasStarted] = useState(false)
    const numArray= []

    for(let i = 0; i < 60; i++){
        numArray.push(i)
    }

    const nums = numArray.map((num) => <option key={num} value={num}>{num}</option>)

    const handleMinuteOption = (e) => {
        setMinute(e.target.value)
        setMinValue(e.target.value)
    }
    const handleSecondOption = (e) => {
        setSecond(e.target.value)
        setSecValue(e.target.value)
    }

    function run(){
        startCountDown()
        setIsDisabled(true)
        setIsDisabled2(false)
        setHasStarted(true)

        setMinValue("Minutes")
        setSecValue("Seconds")
    }
    
    const handleStart = () => {
        if (second > 0 || minute > 0){
            run()
        }else{
            alert("Invalid timer selected")
        }
    }
    
    const ID = useRef(null)

    function startCountDown () {
        ID.current = setInterval(() => {
            setSecond(t => t - 1)
        }, 1000)
    } 

    useEffect(() => {
        if(minute > 0 && second < 0 ){
            setMinute(m => m - 1)
            setSecond(59)
        }
        
        if(second === 0 && minute === 0 && hasStarted){
            clearInterval(ID.current)
            setIsDisabled(false)
            setHasStarted(false)
            console.log("working")
            alert("Time UP")
        }

    }, [second, minute])

    const stopCountDown = () => {
        if(userOption === "Stop"){
            setUserOption("Continue")
            clearInterval(ID.current)
        }else{
            setUserOption("Stop")
            startCountDown()
        }
    }
    
    const resetTimer = () => {
        clearInterval(ID.current)
        setSecond(0)
        setMinute(0)
        setIsDisabled(false)
        setIsDisabled2(true)
        setHasStarted(false)
        setUserOption("Stop")
    }

    function format(num){
        if (num < 10){
            return "0" + num
        }else{
            return num
        }
    }

    return(
        <section>
            <div className='parent'>
                <h1>Count-Down Timer</h1>
                <div>
                    <select className="option" id="" value={minValue} onChange = {(e) => handleMinuteOption(e)} disabled = {isDisabled}>
                        <option value="minutes"disabled>Minutes</option>
                        {nums}
                    </select>

                    <select className="option" id="" value={secValue} onChange = {(e) => handleSecondOption(e)} disabled = {isDisabled}>
                        <option value="seconds" disabled>Seconds</option>
                        {nums}
                    </select>
                </div>

                <p>{format(minute)}:{format(second)}</p>
                <div className='child'>
                    <button disabled = {isDisabled} onClick={handleStart}>Start</button>
                    <button onClick={stopCountDown} disabled = {isDisabled2}>{userOption}</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </section>
    )
}
export default Timer