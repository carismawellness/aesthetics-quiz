import React from "react";

function FreeTextField({ question, setAnswer }) {
    return (
            <div className="relative mb-4">
                <textarea
                    type="text"
                    id="additional_input"
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                    className="border-2 border-gray-200 p-2 w-full h-24 custom-text-color focus:outline-none focus:custom-border-color"
                    placeholder="Type here..."
                    rows='6'
                />
            </div>
    );
}

export default FreeTextField;