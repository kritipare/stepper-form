import React from "react";

const PersonalDetails = ({ formData, changeHandler, error }) => {
    return (
        <div>
            {Object.keys(formData).map((formField) => {
                return (
                    <>
                        <label>{formField}</label>
                        <input
                            type='text'
                            name={formField}
                            id={formField}
                            value={formData[formField]}
                            onChange={(e) =>
                                changeHandler(
                                    "personalDetails",
                                    formField,
                                    e.target.value,
                                )
                            }
                        />
                        {!error["personalDetails"][formField].isValid && (
                            <span>
                                {error["personalDetails"][formField].message}
                            </span>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default PersonalDetails;
