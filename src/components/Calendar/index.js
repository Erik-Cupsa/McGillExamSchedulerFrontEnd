// Calendar.js

import React, { useState, useEffect } from 'react';
import ICAL from 'ical.js';

const Calendar = () => {
  const [selectedExams, setSelectedExams] = useState([]);

  useEffect(() => {
    // Load existing calendar from local storage on component mount
    const storedCalendar = JSON.parse(localStorage.getItem('calendar')) || [];
    setSelectedExams(storedCalendar);
  }, []);

  const handleRemoveExam = (examKey) => {
    const updatedExams = selectedExams.filter((exam) => exam.examKey !== examKey);

    // Update state and local storage with the new set of exams
    setSelectedExams(updatedExams);
    localStorage.setItem('calendar', JSON.stringify(updatedExams));
  };

// ... (Your imports and other code)

const handleExportCalendar = () => {
    const formatDateTime = (dateTime) => {
      const isoDateTime = new Date(dateTime).toISOString();
      return isoDateTime.replace(/[-:]/g, '').slice(0, -5); // Format as "YYYYMMDDTHHmmss"
    };
  
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
            'LOCATION:Event Location', // You can customize this line
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
  
  // ... (The rest of your component)
  
  
  

  return (
    <div>
      <h2>Your Exam Schedule</h2>
      {selectedExams.length === 0 ? (
        <p>No exams in your schedule.</p>
      ) : (
        <div>
          <ul>
            {selectedExams.map((exam) => (
              <li key={exam.examKey}>
                <strong>{exam.course}</strong> - {exam.exam_type} - {exam.exam_start_time} to {exam.exam_end_time}
                <button onClick={() => handleRemoveExam(exam.examKey)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleExportCalendar}>Export to iCal</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
