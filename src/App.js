import React, { useState } from "react";
import Header from "./components/Header";
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
			<Header step={step} setStep={setStep} />
			{getStep()}
		</>
	);
};

export default App;
