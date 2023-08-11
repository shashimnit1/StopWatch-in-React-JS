import React, { useState } from "react";
import "./StopWatch.css"


const StopWatch = () => {
    var [state, setState] = useState(1);
    var [Times, SetTime] = useState({ h: 0, m: 0, s: 0, ms: 0 });
    var [IntervalID, SetIntervalID] = useState();
    var UpdatedHr = Times.h, UpdatedMin = Times.m, UpdatedSec = Times.s, UpdatedMSec = Times.ms;

    const Run = () => {

        UpdatedMSec = UpdatedMSec + 1;
        if (UpdatedMSec > 99) {
            UpdatedSec = UpdatedSec + 1
            UpdatedMSec = 0;
        }
        if (UpdatedSec > 59) {
            UpdatedMin = UpdatedMin + 1
            UpdatedSec = 0;
        }
        if (UpdatedMin > 59) {
            UpdatedHr = UpdatedHr + 1
            UpdatedMin = 0;
        }
        console.log(UpdatedMSec);
        return (SetTime({ h: UpdatedHr, m: UpdatedMin, s: UpdatedSec, ms: UpdatedMSec }));
    }

    const Increment = () => {
        SetIntervalID(setInterval(Run, 10));
        setState(2);
    }

    const Stop = () => {
        clearInterval(IntervalID);
        setState(3);
    }

    const Reset = () => {
        clearInterval(IntervalID);
        SetTime({ h: 0, m: 0, s: 0, ms: 0 })
        setState(1);
    }
    const Resume = () => {
        SetIntervalID(setInterval(Run, 10));

        setState(2);
    }
    return (
        <>
            <div className="Body">
                <div className="MainContainer">
                    <br />
                    <Timer Times={Times} />
                    <div className="ButtonGroup">
                        <ButtonGroup state={state} setState={setState} Increment={Increment} Stop={Stop} Reset={Reset} Resume={Resume} />
                    </div>
                </div>

            </div>
        </>
    );
}

const ButtonGroup = (Props) => {
    if (Props.state === 1) {
        return (
            <>
                <button onClick={Props.Increment}>Start</button>
            </>
        );
    }
    if (Props.state === 2) {
        return (
            <>
                <button onClick={Props.Stop}>Stop</button>
                <button onClick={Props.Reset}>Reset</button>
            </>
        );
    }
    if (Props.state === 3) {
        return (
            <>
                <button onClick={Props.Resume}>Resume</button>
                <button onClick={Props.Reset}>Reset</button>
            </>
        );
    }
}

const Timer = (Props) => {
    var { h, m, s, ms } = Props.Times

    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m
    }
    if (s < 10) {
        s = "0" + s
    }
    if (ms < 10) {
        ms = "0" + ms
    }
    return (
        <>
            <div className="display">
                <span>{h}</span>:<span>{m}</span>:<span>{s}</span>:<span>{ms}</span>
            </div>
        </>
    );
}

export default StopWatch;