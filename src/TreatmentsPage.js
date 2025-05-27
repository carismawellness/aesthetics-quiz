import React from 'react';
import { useEffect, useState } from 'react';
import BotoxIcon from './assets/thumbnails/Botox.png';
import CollagenIcon from './assets/thumbnails/Collagen.png';
import DermalFillersIcon  from './assets/thumbnails/DermalFiller.png';
import HydraFacialIcon  from './assets/thumbnails/Hydrafacial.png';
import MesotherapyIcon  from './assets/thumbnails/Mesotherapy.png';
import MicroneedlingIcon  from './assets/thumbnails/Microneedling.png';
import PRPIcon from './assets/thumbnails/PRP.png';
import ThreadLiftIcon from './assets/thumbnails/ThreadLift.png';
import UnderChinReductionIcon from './assets/thumbnails/UnderChinReduction.png';
import MFUIcon from './assets/thumbnails/MFU.png';
import LipFillersIcon from './assets/thumbnails/LipFiller.png';



function TreatmentsPage() {
    const [data, setData] = useState([]);
    const treatmentsMap = {
        "Acne": [ { image: CollagenIcon, link: "https://www.carismaaesthetics.com/collagen-stimulator" }, 
            { image: MicroneedlingIcon, link: "https://www.carismaaesthetics.com/microneedlingmalta" }, 
            { image: PRPIcon, link: "https://www.carismaaesthetics.com/prpmalta" }],
        "Dark circles": [ { image: DermalFillersIcon, link: "https://www.carismaaesthetics.com/dermalfillersmalta" }, 
            { image: PRPIcon, link: "https://www.carismaaesthetics.com/prpmalta" },
            { image: MicroneedlingIcon, link : "https://www.carismaaesthetics.com/microneedlingmalta" },
            { image: MesotherapyIcon, link: "https://www.carismaaesthetics.com/mesotherapymalta" }],
        "Double chin": [ { image: UnderChinReductionIcon, link: "https://www.carismaaesthetics.com/chinfatreductionmalta" },
            { image: DermalFillersIcon, link: "https://www.carismaaesthetics.com/dermalfillersmalta" },
            { image: CollagenIcon, link: "https://www.carismaaesthetics.com/collagen-stimulator" }],
        "Dry skin": [ { image: HydraFacialIcon, link : "https://www.carismaaesthetics.com/hydrafacialmalta" },
            { image: MesotherapyIcon, link: "https://www.carismaaesthetics.com/mesotherapymalta" },
            { image: MicroneedlingIcon, link: "https://www.carismaaesthetics.com/microneedlingmalta" },
            { image: PRPIcon, link: "https://www.carismaaesthetics.com/prpmalta" }],
        "Facial volumising": [ { image: DermalFillersIcon, link:  "https://www.carismaaesthetics.com/dermalfillersmalta" },
            { image: CollagenIcon, link: "https://www.carismaaesthetics.com/collagen-stimulator" },
            { image: ThreadLiftIcon, link: "https://www.carismaaesthetics.com/threadliftmalta" },
            { image: UnderChinReductionIcon, link: "https://www.carismaaesthetics.com/chinfatreductionmalta" }],
        "Oily skin": [ { image: PRPIcon, link: "https://www.carismaaesthetics.com/prpmalta" }, 
            { image: MicroneedlingIcon, link: "https://www.carismaaesthetics.com/microneedlingmalta" },
            { image: BotoxIcon, link: "https://www.carismaaesthetics.com/botoxmalta" }],
        "Thin lips": [ { image: LipFillersIcon, link: "https://www.carismaaesthetics.com/lipfillersmalta" }],
        "Uneven skin tone": [ { image: HydraFacialIcon, link: "https://www.carismaaesthetics.com/hydrafacialmalta" },
            { image: MesotherapyIcon, link: "https://www.carismaaesthetics.com/mesotherapymalta" },
            { image: MicroneedlingIcon, link: "https://www.carismaaesthetics.com/microneedlingmalta" },
            { image: PRPIcon, link: "https://www.carismaaesthetics.com/prpmalta" },
            { image: BotoxIcon, link: "https://www.carismaaesthetics.com/botoxmalta"}],
        "Wrinkles": [ { image: BotoxIcon, link: "https://www.carismaaesthetics.com/botoxmalta" },
            { image: DermalFillersIcon, link: "https://www.carismaaesthetics.com/dermalfillersmalta" },
            { image: CollagenIcon, link: "https://www.carismaaesthetics.com/collagen-stimulator" },
            { image: ThreadLiftIcon, link: "https://www.carismaaesthetics.com/threadliftmalta" },
            { image: MesotherapyIcon, link: "https://www.carismaaesthetics.com/mesotherapymalta" }],
    } 

    useEffect(() => {
        const storedData = localStorage.getItem('questionnaireData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            return <div> <h1> Loading...</h1></div> ;
        }
    }, []);

    let firstName = 'You'
    if (data[4]) {
        firstName = data[4].first_name;
    }

    return (
        <div className='min-h-screen flex items-start justify-center lg:pt-8'>
            <div className="min-h-screen p-1 lg:min-h-0 w-full">
                <div className='w-full mx-auto max-w-2xl bg-white p-1 lg:p-10'>
                    <h2 className='font-custom custom-text-color text-center text-1xl font-semibold mb-4'>Recommendations</h2>
                    <h1 className='font-custom custom-text-color text-center text-3xl font-semibold mb-4'>Made for {firstName}</h1>
                    {data && data[3] === 'In person consult (€35)' ? 
                    <p className='font-custom custom-text-color'>We have received your contact information and will be reaching out to you soon to schedule your appointment.
                      <br></br>Below are possible treatments options typically suggested for your skin concerns. Kindly note that every individual is different and we look forward to discussing the best treatment plan 
                      to address your unique needs. 
                      </p> : 
                       <p className='font-custom custom-text-color'>Please find below treatments options tailored to your skin concerns.
                       <br></br>Kindly note that every individual is different and we highly recommend booking a consultation with one of our qualified practitioners to discuss what treatments would best address your unique needs.
                       </p>
                    }
                    <div className='border border-gray-100 mt-6'> </div>
                </div>
                <div className='w-full mx-auto max-w-3xl bg-white p-2 lg:p-4'>
                    {data && data[0] && data[0].map((concern, index) => {
                        const thumbnails = treatmentsMap[concern];
                        return (
                            <div key={index}>
                                <div className="mb-4 mx-auto">
                                        <h2 className='font-custom custom-text-color text-1xl mt-8 '>
                                        Suggested treatments for <br></br> <b>{concern}</b></h2>
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center justify-around content-around gap-2 mb-2'>
                                    {thumbnails.map(({image, link}, index) => {
                                        return (
                                            <div className="flex justify-center items-center">
                                                <a href={link} target="_blank" rel="noopener noreferrer">
                                                    <img key={index} src={image} className="w-48 h-48 m-2 transform hover:scale-110 transition-transform duration-200 space-around" />
                                                </a>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default TreatmentsPage;
