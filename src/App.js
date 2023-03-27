import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  PasswordResetPage,
  ForgotPassPage,
  SignUpPage,
  VerifyPage,
  DialoguesPage,
  LogOutPage,
} from './Pages';
import { Navigation } from './components';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/passwordreset" element={<PasswordResetPage />} />
        <Route path="/forgotpass" element={<ForgotPassPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/dialogues/:dialogueId" element={<DialoguesPage />} />
        <Route path="/dialogues" element={<DialoguesPage />} />
        <Route path="/logout" element={<LogOutPage />} />
      </Routes>
    </>
  );
}

export default App;
