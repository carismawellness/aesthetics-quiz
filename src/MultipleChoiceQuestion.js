import React from "react";
import { ReactComponent as IconWrinkles } from "./assets/icons/Wrinkles.svg";
import { ReactComponent as IconThinLips } from "./assets/icons/ThinLips.svg";
import { ReactComponent as IconFacialVolumising } from "./assets/icons/FacialVolumising.svg";
import { ReactComponent as IconUnevenSkinTone } from "./assets/icons/UnevenSkinTone.svg";
import { ReactComponent as IconAcne } from "./assets/icons/Acne.svg";
import { ReactComponent as IconDoubleChin } from "./assets/icons/DoubleChin.svg";
import { ReactComponent as IconDarkCircles } from "./assets/icons/DarkCircles.svg";
import { ReactComponent as IconDrySkin } from "./assets/icons/DrySkin.svg";
import { ReactComponent as IconOilySkin } from "./assets/icons/OilySkin.svg";






function MultipleChoiceQuestion({ question, options, setAnswer, setError }) {
    const optionIcons = {
        'Wrinkles': IconWrinkles,
        'Thin lips': IconThinLips,
        'Facial volumising': IconFacialVolumising,
        'Uneven skin tone': IconUnevenSkinTone,
        'Acne': IconAcne,
        'Double chin': IconDoubleChin,
        'Dark circles': IconDarkCircles,
        'Dry skin': IconDrySkin,
        'Oily skin': IconOilySkin,
    };
    const handleOptionsChange = (option) => {
        // if the option is already selected, remove it from the array
        if (question.answer.includes(option)) {
            setAnswer(question.id, question.answer.filter((o) => o !== option)
            );
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