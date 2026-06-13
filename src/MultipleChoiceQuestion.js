import React from "react";

function MultipleChoiceQuestion({ question, options, setAnswer, setError }) {
    const handleOptionsChange = (option) => {
        if (question.answer.includes(option)) {
            setAnswer(question.id, question.answer.filter((o) => o !== option));
        } else {
            setAnswer(question.id, [...question.answer, option]);
            setError(null);
        }
    };

    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-1 ">
            {options.map((option, index) => {
                return (
                    <div key={index} className={`${
                        question.answer.includes(option)
                            ? "choice-selected"
                            : "border-gray-200 border custom-text-color"
                        } h-16 p-2 rounded bg-white cursor-pointer transition-all flex flex-col text-left`}
                        onClick={() => handleOptionsChange(option)}>
                        <input
                            type="checkbox"
                            id={`option-${index}`}
                            name={`multiple-selection-${question.id}`}
                            value={option}
                            className="hidden"
                            checked={question.answer.includes(option)}
                            readOnly
                        />
                        <label htmlFor={`option-${index}`} onClick={(e) => e.stopPropagation()} className="text-xs text-left flex items-center my-2 cursor-pointer font-custom">
                            {option}
                        </label>
                    </div>
                )
            })}
        </div>
    );
}

export default MultipleChoiceQuestion;
