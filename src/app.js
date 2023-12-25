import React, { Component } from 'react'

import HomePage from './components/HomePage'
import AssessmentPage from './components/AssessmentPage';

import { Routes, Route } from "react-router-dom";

export default class app extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    )
  }
}
