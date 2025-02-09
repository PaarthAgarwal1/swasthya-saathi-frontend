import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './patient/pages/welcome';
import PatientID from './patient/pages/PatientID';
import Registration from './patient/pages/Registration';
import Questionnaire from './patient/pages/Questionnaire';
import PatientSelection from './patient/pages/patientSelection';
import DoctorAiSelection from './patient/pages/doctorAiSelection';
import Feedback from './patient/pages/FeedBack';

import DiagnosticQuestions from './patient/pages/getQuestions';
import AIInteraction from './patient/pages/aiIntraction';
import Diagnosis from './patient/pages/aiDiagnosis';




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
                <Route path='/feedback' element={<Feedback/>}/>
                <Route path='/ai-interaction' element={<AIInteraction/>}/>
                <Route path='/diagnostic-questions' element={<DiagnosticQuestions/>}/>
                <Route path='/ai-diagnosis' element={<Diagnosis/>}/>
                {/* <Route path='/symptoms' element={< Symptoms />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
