import React, { useState, useEffect } from 'react';
import "./index.scss";
import AnimatedLetters from '../AnimatedLetters';

const Calendar = () => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    const storedCalendar = JSON.parse(localStorage.getItem('calendar')) || [];
    setSelectedExams(storedCalendar);

    const timer = setTimeout(() => {
        setLetterClass("text-animate-hover");
      }, 3000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);

  const handleRemoveExam = (examKey) => {
    const updatedExams = selectedExams.filter((exam) => exam.examKey !== examKey);
    setSelectedExams(updatedExams);
    localStorage.setItem('calendar', JSON.stringify(updatedExams));
  };

  const formatDateTime = (dateTime) => {
    const isoDateTime = new Date(dateTime).toISOString();
    return isoDateTime.replace(/[-:]/g, '').slice(0, -5);
  };

  const handleExportCalendar = () => {
    try {
      const calendarContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        ...selectedExams.map((exam) => {
          const uniqueId = `${exam.course}-${exam.section}-${exam.exam_start_time.replace(/\s/g, '_')}`;
          return [
            'BEGIN:VEVENT',
            `SUMMARY:${exam.course} - ${exam.exam_type}`,
            `DESCRIPTION:Room: ${exam.room}, Building: ${exam.building}`,
            `DTSTART:${formatDateTime(exam.exam_start_time)}`,
            `DTEND:${formatDateTime(exam.exam_end_time)}`,
            'LOCATION:Event Location',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'BEGIN:VALARM',
            'TRIGGER:-PT15M',
            'DESCRIPTION:Reminder',
            'ACTION:DISPLAY',
            'END:VALARM',
            'END:VEVENT',
          ].join('\n');
        }),
        'END:VCALENDAR',
      ].join('\n');

      const calendarDataURI = `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarContent)}`;

      const link = document.createElement('a');
      link.href = calendarDataURI;
      link.download = 'exam_calendar.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting calendar:', error);
    }
  };

  return (
    <div className = "container calendar-page">
        <h1 className="page-title">
            <br />
            <br />
            <AnimatedLetters letterClass={letterClass} strArray={"Calendar".split("")} idx={15} />
      </h1>
      {selectedExams.length === 0 ? (
        <h2>No exams in your schedule.</h2>
      ) : (
        <div>
          <ul>
            {selectedExams.map((exam) => (
              <li key={exam.examKey}>
                <strong>{exam.course}</strong> - {exam.exam_type} - {exam.exam_start_time} to {exam.exam_end_time}
                <button onClick={() => handleRemoveExam(exam.examKey)}>
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front text"> Remove</span>
                </button>
                <br/>
                <br/>
              </li>
            ))}
          </ul>
            <button type="button" class="button" onClick={handleExportCalendar}>
                <span class="button__text">Download</span>
                <span class="button__icon"><svg class="svg" data-name="Layer 2" id="bdd05811-e15d-428c-bb53-8661459f9307" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;