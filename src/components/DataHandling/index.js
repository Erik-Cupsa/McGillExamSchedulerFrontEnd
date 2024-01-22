import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss';

const DataHandling = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const className = params.get('name');

    if (className) {
      axios.get(`http://localhost:8080/api/v1/exam?className=${encodeURIComponent(className)}`)
        .then(response => {
          setExamData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Section</th>
            <th>Course Title</th>
            <th>Exam Type</th>
            <th>Exam Start Time</th>
            <th>Exam End Time</th>
            <th>Building</th>
            <th>Room</th>
            <th>Rows</th>
            <th>Row Start</th>
            <th>Row End</th>
          </tr>
        </thead>
        <tbody>
          {examData.map(exam => (
            <tr key={`${exam.course}-${exam.section}`}>
              <td>{exam.course}</td>
              <td>{exam.section}</td>
              <td>{exam.course_title}</td>
              <td>{exam.exam_type}</td>
              <td>{exam.exam_start_time}</td>
              <td>{exam.exam_end_time}</td>
              <td>{exam.building}</td>
              <td>{exam.room}</td>
              <td>{exam.rows}</td>
              <td>{exam.rowStart}</td>
              <td>{exam.rowEnd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataHandling;
