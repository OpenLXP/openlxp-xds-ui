import { useState } from "react";

const InputEmail = (props) => {
    const error = props.error || "";
    const handleChange = props.handleChange;
    const errorMessage = error ? (
        <div className="font-thin text-xs text-red-500 px-2">{error}</div>
    ) : null;
    let inputStyle =
        error === ""
            ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-blue focus:border-base-blue"
            : "appearance-none block w-full px-3 py-2 border ring-red-500 border-red-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-blue focus:border-base-blue";

    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Email
            </label>
            <div className="mt-1">
                <input
                    onChange={handleChange}
                    required
                    type="text"
                    className={inputStyle}
                />
            </div>
            {errorMessage}
        </div>
    );
};

export default InputEmail;
