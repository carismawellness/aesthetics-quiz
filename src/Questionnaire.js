import React, { useState } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleInputsQuestion from './MultipleInputsQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import { useNavigate } from 'react-router-dom';
import ConsultationQuestion from './ConsultationQuestion';
import { sendDataToGHL } from './api';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { ReactComponent as USPIcon } from './assets/icons/uspicon.svg';


function Questionnaire() {
  const [questionnaire, setQuestionnaire] = useState([
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Share your concerns, instantly receive  your personalised recommendations',
      options: ['Wrinkles', 
        'Thin lips', 
        'Facial volumising', 
        'Uneven skin tone', 
        'Acne', 
        'Double chin',
        'Dark circles',
        'Dry skin',
        'Oily skin',
      ],
      answer: '',
    },
    {
      id: 2,
      type: 'single-choice',
      question: 'Please select your skin type',
      options: ['Combination', 'Dry', 'Oily', 'Acne', 'Sensitive'],
      answer: '',
    },
    {
        id: 3,
        type: 'single-choice',
        question: 'Comfortable with Injectables?',
        description: '(e.g., Botox, Fillers)',
        options: ['Yes', 'No'],
        answer: '',
    },
    {
        id: 4,
        type: 'single-choice',
        question: 'Which kind of treatments would you be interested in?',
        options: ['Botox', 'Lip Fillers', 'Dermal Fillers', 'Fat Disolving', 'Mesotherapy', 'PRP', 'Thread Lift', 'Chemical Peels', 'Microneedling', 'Collagen-Stimulator', 'MFU-Ultight', 'Advanced Hydrating Facial' ],
        answer: '',
    },
    {
        id: 5,
        type: 'single-choice',
        question: 'Where did you hear about us?',
        options: ['Social Media', 'Google', 'Hotel', 'Company partnership', 'Influencer' , 'Family/Friend', 'Repeat customer' , 'Other'],
        answer: '',
    },
    {
        id: 6,
        type: 'consultation-question',
        question: '',
        description: 'For a limited time we are offering free virtual consultations with qualified medical professionals to discuss your concerns, share cutting edge treatment options available to you and answer any of your questions.',
        options: ['Free virtual consult (Newsletter)', 'In person consult (€50)', 'No consultation'],
        answer: '',
    },
    {
      id: 7,
      type: 'multiple-inputs',
      question: '',
      answer: { first_name: '', surname: '' , email: '', phone: '' },
    }
  ]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState(null);
    useNavigate();

    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = () => {
        console.log('handleSubmit triggered / next button clicked');
        if (![5, 6].includes(currentQuestionIndex) && !questionnaire[currentQuestionIndex].answer[0]) {
            setError('Please select an answer and try again');
            return;
        } else {
            setError(null);
        }
        if (currentQuestionIndex === 6) {
            if (!validateEmail(questionnaire[6].answer.email)) {
                setError('Please enter a valid email address.');
                return;
            }
            if (!isPossiblePhoneNumber(questionnaire[6].answer.phone)) {
                setError('Please enter a valid phone number.');
                return;
            }
            if (!questionnaire[6].answer.first_name || !questionnaire[6].answer.surname) {
                setError("Please enter your name.");
                return;
            }
        }
        if (currentQuestionIndex === 5 && questionnaire[5].answer === 'No consultation') {
            storeAndRedirect();
        } else if (currentQuestionIndex < questionnaire.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            storeAndRedirect();
        }
    }

    const storeAndRedirect = async () => {
        const answers = questionnaire.map((q) => q.answer);
        // Redirect based on the answers
        // add switch case for each answer combination
        localStorage.setItem('questionnaireData', JSON.stringify(answers));
        await sendDataToGHL(answers);
        //navigate('/treatments');
        window.top.location.href = 'https://www.carismaaesthetics.com/quiz-results';
    }
  

    const handleAnswerChange = (id, value) => {
        setQuestionnaire((prev) =>
        prev.map((q) => (q.id === id ? { ...q, answer: value } : q))
        );
    };

    const handleBackButtonClick = () => {
        if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

  function renderQuestionComponent(question) {
    switch (question.type) {
        case 'single-choice':
            return (
            <SingleChoiceQuestion
                question={question}
                options={question.options}
                setAnswer={handleAnswerChange}
                setError={setError}
            />
            );
        case 'multiple-choice':
            return (
                <MultipleChoiceQuestion
                    question={question}
                    options={question.options}
                    setAnswer={handleAnswerChange}
                    setError={setError}
                    />
            );
        case 'multiple-inputs':
            return (
            <MultipleInputsQuestion 
                className="text-left"
                question={question}
                options={question.options}
                setAnswer={handleAnswerChange}
                setError={setError}
                consultType={questionnaire[4].answer}
            />
            );
        case 'consultation-question':
            return (
            <ConsultationQuestion
                question={question}
                options={question.options}
                setAnswer={handleAnswerChange}
                setError={setError}
            />
            );
        default:
            return null;
    }
  }

  function getbuttonClass(answer) {
    const isArrayCondition = Array.isArray(answer) && answer.length !== 0;
    const objectCondition = typeof answer === "object"  && !Array.isArray(answer) && Object.values(answer).every(field => field !== '');
    if (typeof answer === 'string' && answer !== '') return 'custom-button-color-ready';
    if (isArrayCondition) return 'custom-button-color-ready';
    if (objectCondition) return 'custom-button-color-ready';
    return 'custom-button-color';
  }
  
  

  return (
    <div className="min-h-screen flex items-start justify-center lg:pt-8">
        <div className='w-full lg:w-1/2'>
            <div className="min-h-screen p-1 lg:min-h-0 w-full mx-auto">
            <h2 className="text-left mb-4 mt-4 font-custom font-thin custom-text-color w-full">
                {questionnaire[currentQuestionIndex].question}
            </h2>
                {questionnaire[currentQuestionIndex].description ?  
                    <div className="flex items-center justify-center mb-6">
                        <p className="text-sm custom-text-color font-light text-justify mb-2 font-roboto">{questionnaire[currentQuestionIndex].description}</p>
                    </div> 
                    : null
                }
            <div className="space-y-4">
                    {renderQuestionComponent(questionnaire[currentQuestionIndex])}
                    {console.log("answer: ", questionnaire[currentQuestionIndex].answer)}
                    {error && <p className="custom-text-color">{error}</p>}
                    <div className="flex justify-between">
                    {currentQuestionIndex > 0 && (
                        <button
                        onClick={handleBackButtonClick}
                        className="sm:static sm:ml-0 sm:mb-0 custom-border-color h-12 custom-text-color font-custom py-2 px-6  text-sm mr-4 mb-4 whitespace-nowrap"
                        >
                        &larr; Back
                        </button>
                    )}
                    <button
                        className={`${getbuttonClass(questionnaire[currentQuestionIndex].answer)} sm:static sm:mr-0 sm:mb-0 w-full py-2 h-12 font-custom`}
                        onClick={handleSubmit}
                        >
                        {currentQuestionIndex === questionnaire.length - 1 ? 'Submit' : 'Next'}
                    </button>
                    </div>
                </div>
                <div className="flex justify-start items-center">
                    <USPIcon className='h-20 mt-12'></USPIcon>   
                </div>
            </div>
        </div>
    </div>
  );
}

export default Questionnaire;