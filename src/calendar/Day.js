import React, { useState, useRef } from "react";
import { useClickOutside } from '../utilities/clickOutside';

const Event = ({ event, methods }) => {
    const [ showDetails, changeShowDetails ] = useState(false);

    const wrapperRef = useRef(null);

    const hide = () => changeShowDetails(false);

    const { startHideListener, stopHideListener } = useClickOutside (wrapperRef, () => hide());

    const show = () => {
        if (!showDetails) {
            changeShowDetails(true);
            startHideListener();
        }
    };

    function handleEventChange(e) {
        methods.editEvent(event.id, e.target.name, e.target.value);
    };

    function deleteEvent() {
        methods.deleteEvent(event.id);
        stopHideListener();
        hide();
    }

    return (
        <div
            className='Event'
            ref={ wrapperRef }
            onClick={ show }>
            { showDetails && (
                <div className='EventDetails' event={ event }>
                    <div><input
                        type='text'
                        name='subject'
                        value={ event.subject }
                        onChange={ handleEventChange }
                    /></div>
                    <div><input
                        type='text'
                        name='time'
                        value={ event.time }
                        onChange={ handleEventChange }
                    /></div>
                    <div><input
                        type='text'
                        name='details'
                        value={ event.details }
                        onChange={ handleEventChange }
                    /></div>
                    <div className='DeleteEvent' onClick={ deleteEvent }>Delete</div>
                </div>
            ) }
            <div className='EventLabel'>
                <div className='EventTime'>{ event.time }</div>
                <div className='EventSubject'>{ event.subject }</div>
            </div>
        </div>
    );
};


export const Day = ({ year, month, day, isToday, events, methods } ) => {

    return (
        <div className={ isToday ? 'MonthDay today' : 'MonthDay' }>
            <div className='dayName'>{ day }</div>
            <div className='Events'>
                { events && events
                    .filter(event => event.year === year && event.month === month && event.day === day)
                    .map((event, i) => <Event key={i} event={ event } methods={ methods } />) }
                <div className='AddEvent' onClick={ ()=>methods.addEvent(year, month, day, '09:00', 'New event', '') }>+</div>
            </div>
        </div>
    );
};