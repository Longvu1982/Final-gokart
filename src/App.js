import React, { Component, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client";
import Header from "./components/Header";
import InfoSection from "./components/InfoSection";
import MainView from "./pages/MainView";
import Form from "./pages/Form";

const App = () => {
  const [step, setStep] = useState(1);
  const getStep = () => {
    const stepItem = steps.find((item) => item.step === step);
    return stepItem.component;
  };
  const steps = [
    {
      step: 1,
      component: <Form setStep={setStep} />,
    },
    {
      step: 2,
      component: <MainView />,
    },
  ];

  return (
    <>
      <Header />
      {getStep()}
    </>
  );
};

export default App;
