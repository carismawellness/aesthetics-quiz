import React from "react";

function SingleChoiceQuestion({ question, options, setAnswer, setError }) {
    const handleClick = (id, value) => {
        if (question.answer === value) {
          setAnswer(id, "");
        }
        else {
            setAnswer(id, value);
            setError(null);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-1">
          {options.map((option, index) => (
            <div key={index} className={`${
                question.answer === option
                  ? "choice-selected"
                  : "border-gray-200 border custom-text-color"
              } p-4 bg-white cursor-pointer transition-all`}
              onClick={() => handleClick(question.id, option)}
              >
                <div key={index} className="flex items-center">
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="single-choice"
                        value={option}
                        className="hidden"
                        onChange={event => setAnswer(question.id, event.target.value)}
                        checked={question.answer === option}
                    />
                <span className="flex items-center text-sm mb-2 font-custom">{option}</span>
                </div>
            </div>
          ))}
        </div>
      );
}

export default SingleChoiceQuestion;