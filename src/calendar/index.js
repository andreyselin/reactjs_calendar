import React, { useState } from 'react';
import './calendar.css';
import { Month } from './Month';
import update from 'immutability-helper';

const getEvents = () => [
    { id: 'random_id', year: 2020, month: 7, day: 5, time:'22:00', subject: 'Hi!', details: 'Some details' }
];

export const Calendar = () => {

    const [ events, setEvents ] = useState(getEvents());

    // Show current month by default
    const currentDate = new Date();
    const [ calendarMonth, setCalendarMonth ] = useState({
        month: currentDate.getMonth(),
        year:  currentDate.getFullYear()
    });

    function navigate(dir) {
        let newMonth = calendarMonth.month + dir;
        let newYear  = calendarMonth.year;

        if (newMonth === -1) {
            newMonth = 11;
            newYear --;
        } else if (newMonth === 12) {
            newMonth = 0;
            newYear ++;
        }
        setCalendarMonth({ month: newMonth, year: newYear });
    }

    function navigateToToday() {
        const currentDate = new Date();
        setCalendarMonth({
            month: currentDate.getMonth(),
            year:  currentDate.getFullYear()
        });
    }

    function addEvent(year, month, day, time, subject, details) {
        const id = Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
        setEvents([
            ...events,
            { id, year, month, day, time, subject, details }
        ])
    }
    function editEvent(id, name, value) {
        const index = events.findIndex(el=> el.id === id);

        const updatedEvent = update(events[index], { [name]: { $set: value } });
        const newEvents = update(events, {
            $splice: [[ index, 1, updatedEvent ]]
        });
        setEvents(newEvents);
    }
    function deleteEvent(id) {
        const index = events.findIndex(el=> el.id === id);
        const newEvents = update(events, {
            $splice: [[ index, 1 ]]
        });
        setEvents(newEvents);
    }
    function deleteEventsByMonth(year, month) {
        setEvents(events
            .filter(event => !(event.year === year && event.month === month)));
    }

    return (<Month
        methods={ { navigate, navigateToToday, addEvent, editEvent, deleteEvent, deleteEventsByMonth } }
        events={ events }
        year={ calendarMonth.year }
        month={ calendarMonth.month }
    />);

};