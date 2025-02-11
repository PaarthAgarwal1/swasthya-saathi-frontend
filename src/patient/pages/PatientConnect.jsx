import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const PatientConnect = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Connecting...');
  const [meetingLink, setMeetingLink] = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [doctorMessage, setDoctorMessage] = useState(null);
  const [showMeeting, setShowMeeting] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('https://swathya-saathi-signaling-server.onrender.com', {
      query: { role: 'PATIENT' },
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setStatus('Connected. Searching for a doctor...');
      console.log('Patient connected to socket server!');
    });

    socket.on('ROOM_CREATED', (data) => {
      console.log('Room Created:', data.roomId);
    });

    socket.on('MEETING_LINK', (data) => {
      console.log('Meeting Link:', data.meetingLink);
      setMeetingLink(data.meetingLink);
      setStatus('Meeting Found. Click below to join.');
    });

    socket.on('NEW_MESSAGE', (data) => {
      console.log('Doctor message:', data);
      setDoctorMessage(data.message);
    });

    socket.on('DISCONNECT', () => {
      setStatus('Disconnected from the session.');
      socket.disconnect();
    });

    socket.on('FORCE_DISCONNECT', () => {
      setStatus('Doctor has ended the session.');
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      setStatus('Disconnected. Trying to reconnect...');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinMeeting = () => {
    if (meetingLink) {
      setShowMeeting(true);
      setStatus('In a meeting');
    }
  };

  const handleEndCall = () => {
    const socket = socketRef.current;
    if (socket) {
      socket.emit('PATIENT_CUT_CALL');
      socket.disconnect();
      setStatus('Call disconnected by patient.');
      setShowMeeting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-300 text-white p-6 flex flex-col items-start space-y-6">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <p className="text-lg">
          Status: <span className="font-semibold">{status}</span>
        </p>

        {meetingLink && !showMeeting && (
          <button
            onClick={handleJoinMeeting}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Join Meeting
          </button>
        )}

        {showMeeting && (
          <button
            onClick={handleEndCall}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            End Call
          </button>
        )}

        {prescription && (
          <div className="bg-white text-gray-800 p-4 rounded-xl shadow-md w-full">
            <h2 className="text-lg font-semibold mb-2">Doctor's Prescription</h2>
            <p>{prescription}</p>
          </div>
        )}

        {doctorMessage && (
          <div className="bg-yellow-200 text-gray-800 p-4 rounded-xl shadow-md w-full">
            <h2 className="text-lg font-semibold mb-2">Doctor's Message</h2>
            <p className="whitespace-pre-line">{doctorMessage}</p>
          </div>
        )}
      </div>

      {/* Main Content (Meeting Section) */}
      <div className="flex-1 p-6">
        {showMeeting && meetingLink ? (
          <iframe
            src={`${meetingLink}#userInfo.displayName=%22Patient%22`}
            title="Doctor Meeting"
            className="w-full h-[85vh] rounded-lg border border-gray-300 shadow-lg"
            allow="camera; microphone; fullscreen"
          />
        ) : (
          <p className="text-blue-500 animate-pulse">Waiting for a doctor...</p>
        )}
      </div>
    </div>
  );
};

export default PatientConnect;