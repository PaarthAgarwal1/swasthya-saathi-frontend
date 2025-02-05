import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './patient/pages/welcome';
import PatientID from './patient/pages/PatientID';
import Registration from './patient/pages/Registration';
import Questionnaire from './patient/pages/Questionnaire';
import PatientSelection from './patient/pages/patientSelection';
import DoctorAiSelection from './patient/pages/doctorAiSelection';




function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/patientselection" element={<PatientSelection/>} />
                <Route path='/patient-id' element={<PatientID />} />
                <Route path='/registration' element={<Registration />} /> 
                <Route path='/doctor-ai' element={<DoctorAiSelection/>}/>
                <Route path='/questionnaire' element={<Questionnaire />} />
                {/* <Route path='/symptoms' element={< Symptoms />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
