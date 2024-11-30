import React, { useEffect, useState } from "react";
import Address from "./Address";
import PersonalDetails from "./PersonalDetails";

const config = [
    {
        label: "PersonalDetails",
        key: "personalDetails",
        component: (props) => <PersonalDetails {...props} />,
    },
    {
        label: "Address",
        key: "address",
        component: (props) => <Address {...props} />,
    },
    {
        label: "Address",
        key: "address",
        component: (props) => <Address {...props} />,
    },
];
const formField = {
    personalDetails: {
        name: "",
        lastName: "",
    },
    address: {
        city: "",
        state: "",
        pincode: "",
    },
};

const Validators = {
    name: (value) => {
        if (!value) return { isValid: false, message: "Name is required" };
        if (value.length <= 3)
            return { isValid: false, message: "Name is should be of length 3" };
        return { isValid: true, message: "" };
    },
    lastName: (value) => ({ isValid: true, message: value }),
    city: (value) => ({ isValid: true, message: value }),
    state: (value) => ({ isValid: true, message: value }),
    pincode: (value) => ({ isValid: true, message: value }),
};

export const StepperForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(formField);
    const [error, setError] = useState(formField);
    const [showErrors, setShowErrors] = useState(false);

    const changeHandler = (parentKey, key, value) => {
        console.log(parentKey, key, value);
        setFormData((formData) => {
            return {
                ...formData,
                [parentKey]: { ...formData[parentKey], [key]: value },
            };
        });
    };

    const isFormValid = () => {
        const currentForm = formData[config[currentStep].key];
        const error = {};

        Object.keys(currentForm).forEach((key) => {
            error[key] = Validators[key](currentForm[key]);
        });

        setError((prevError) => {
            return {
                ...prevError,
                [config[currentStep].key]: {
                    ...prevError[config[currentStep].key],
                    ...error,
                },
            };
        });
        const isFormValid = Object.entries(error).reduce(
            (acc, [key, value]) => {
                return acc && value.isValid;
            },
            true,
        );

        return isFormValid;
    };

    const nextStep = () => {
        if (isFormValid(formData)) setCurrentStep((s) => s + 1);
        else {
            setShowErrors(true);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log("formData", formData);
    };

    useEffect(() => {
        console.log("error", error);
    });

    return (
        <form onSubmit={submitForm}>
            <div>{showErrors && "resolve"}</div>
            <div>{config[currentStep].label}</div>
            {config[currentStep].component({
                formData: formData[config[currentStep].key],
                changeHandler,
                error,
            })}

            <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep <= 0}>
                Previous
            </button>
            <button
                onClick={() => nextStep()}
                disabled={currentStep >= config.length - 1}>
                Next
            </button>
            {currentStep === config.length - 1 && (
                <button type='submit'>Submit</button>
            )}
        </form>
    );
};
