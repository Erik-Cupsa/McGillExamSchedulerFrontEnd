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
          <button class="button" onClick={handleExportCalendar}>
            <span class="button_lg">
                <span class="button_sl"></span>
                <span class="button_text">Download Now</span>
            </span>
            </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;