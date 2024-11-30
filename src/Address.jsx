import React from "react";

const Address = ({ formData, changeHandler, error }) => {
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
                                    "address",
                                    formField,
                                    e.target.value,
                                )
                            }
                        />
                        <span>{error[formField]}</span>
                    </>
                );
            })}
        </div>
    );
};

export default Address;
