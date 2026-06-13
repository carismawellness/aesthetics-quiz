import React, { useEffect} from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function MultipleInputsQuestion({ question, setAnswer, setShowError, consultType }) {

    useEffect(() => {
        ['first_name', 'surname', 'email'].forEach((property) => {
            const input = document.getElementById(property);
            if (input) {
                const label = input.previousElementSibling;
                if (label) {
                    if (question.answer[property]) {
                        label.classList.remove('mt-3', 'text-sm');
                        label.classList.add('text-[9px]', 'mt-1');
                    } else {
                        label.classList.remove('text-[9px]', 'mt-1');
                        label.classList.add('mt-3', 'text-sm');
                    }
                }
            }
        });
    }, [question.answer]);
    

    
    return (
        <div>
            <div className="relative mb-4">
                <p className="text-sm custom-text-color mb-2 font-custom">
                    Please share your contact details where you would like us to reach you on to schedule your consultation
                </p>
            </div>
        <div className="grid grid-cols-2 gap-1">
            <div className="relative mb-4">
                <label htmlFor="first_name" className="font-custom absolute text-sm top-0 left-0 ml-3 mt-3 custom-text-color transition-all duration-200">
                    First Name
                </label>
                <input
                    type="text"
                    id="first_name"
                    value={question.answer.first_name}
                    onChange={(e) => setAnswer(question.id, {
                        ...question.answer,
                        first_name: e.target.value,
                    })
                    }
                    className="w-full border rounded border-gray-300  p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="name" className="font-custom absolute text-sm top-0 left-0 ml-3 mt-3 custom-text-color transition-all duration-200">
                    Surname
                </label>
                <input
                    type="text"
                    id="surname"
                    value={question.answer.surname}
                    onChange={(e) => setAnswer(question.id, {
                        ...question.answer,
                        surname: e.target.value,
                    })
                    }
                    className="w-full border rounded border-gray-300 p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            <div className="relative mb-4">
                <label htmlFor="email" className="font-custom absolute text-sm top-0 left-0 ml-3 mt-3 custom-text-color transition-all duration-200">
                Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={question.answer.email}
                    onChange={(e) =>
                    setAnswer(question.id, {
                        ...question.answer,
                        email: e.target.value,
                    })
                    }
                    className="w-full border rounded border-gray-300 p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
            
            <div className="relative mb-4">
                <label htmlFor="phone" className="font-custom absolute top-0 left-0 ml-3 text-[9px] mt-1 custom-text-color">
                    Phone
                </label>
                <PhoneInput
                    international
                    defaultCountry="MT"
                    countryCallingCodeEditable={false}
                    id="phone"
                    value={question.answer.phone || ''}
                    onChange={phone =>
                        setAnswer(question.id, {
                            ...question.answer,
                            phone: phone || '',
                        })
                    }
                    className="w-full border rounded border-gray-300 p-3 focus:outline-none focus:custom-border-color"
                />
            </div>
        </div>
            {consultType === "Free virtual consult (Newsletter)" ? 
            <div className="relative mb-4">
                <p className="custom-text-color text-xs font-custom"> You will be subscribed to our email list. See our <a className="underline" rel="noreferrer" target="_blank" href="https://www.carismaaesthetics.com/privacy-policy">Privacy Policy</a> for more information.</p>
            </div>
            : null
            }
        </div>
    );     
}

export default MultipleInputsQuestion;