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

  const handleExportCalendar = () => {
    const jcalData = {
      prodid: '//My Exam Calendar//EN',
      events: selectedExams.map((exam) => ({
        uid: exam.examKey,
        summary: `${exam.course} - ${exam.exam_type}`,
        start: exam.exam_start_time,
        end: exam.exam_end_time,
        description: `Room: ${exam.room}, Building: ${exam.building}`,
      })),
    };

    const jcalStr = JSON.stringify(jcalData);
    const jcalDataURI = `data:text/calendar;charset=utf-8,${encodeURIComponent(jcalStr)}`;

    const link = document.createElement('a');
    link.href = jcalDataURI;
    link.download = 'exam_calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
