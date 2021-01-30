import React, { useEffect } from 'react';

const Timer: React.FC<{ 
    isOn: boolean;
    minutes: number; seconds: 
    number; 
    minutesHandler: (min: number) => void; 
    secondsHandler: (sec: number) => void;
    timerOff: () => void;
    appOff: () => void;
    }> 
    = (props) => {

    useEffect(() => {
        if(props.isOn){
            let myInterval = setInterval(() => {
                if (props.seconds > 0) {
                    props.secondsHandler(props.seconds - 1);
                }
                if (props.seconds === 0) {
                    if (props.minutes === 0) {
                        clearInterval(myInterval);
                        props.appOff();
                        props.timerOff();
                    } else {
                        props.minutesHandler(props.minutes - 1);
                        props.secondsHandler(59);
                    }
                } 
            }, 1000);
    
            return () => {
                clearInterval(myInterval);
            };
        }
    });

    return (
        <div>
            <h1> {props.minutes}:{props.seconds < 10 ?  `0${props.seconds}` : props.seconds}</h1> 
        </div>
    );
}

export default Timer;