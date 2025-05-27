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
import ChemicalPeelIcon from './assets/thumbnails/ChemicalPeel.png';
import TopicalSkincareIcon from './assets/thumbnails/TopicalSkinCare.png';
import AdvancedFacialIcon from './assets/thumbnails/adv-hydrofacial.png';
import {ReactComponent as IconWrinkles} from "./assets/icons/Wrinkles.svg";
import {ReactComponent as IconThinLips} from "./assets/icons/ThinLips.svg";
import {ReactComponent as IconFacialVolumising} from "./assets/icons/FacialVolumising.svg";
import {ReactComponent as IconUnevenSkinTone} from "./assets/icons/UnevenSkinTone.svg";
import {ReactComponent as IconAcne} from "./assets/icons/Acne.svg";
import {ReactComponent as IconDoubleChin} from "./assets/icons/DoubleChin.svg";
import {ReactComponent as IconDarkCircles} from "./assets/icons/DarkCircles.svg";
import {ReactComponent as IconDrySkin} from "./assets/icons/DrySkin.svg";
import {ReactComponent as IconOilySkin} from "./assets/icons/OilySkin.svg";



function Treatments() {
    const [data, setData] = useState([]);
    const [treatments, setTreatments] = useState(new Set());
   // store all treatments in a hashmap with the key being the treatment and the values being the images, links, descriptions and list of concerns
    const treatmentsMap = {
        "Collagen": { title: "Collagen stimulators", image: CollagenIcon, link: "https://www.carismaaesthetics.com/collagen-stimulator-malta", description: "Collagen stimulators are used to stimulate the body’s own collagen production. They are injected into the skin and work by stimulating the body’s own collagen production. Collagen stimulators are used to treat wrinkles, facial volume loss, acne scars and cellulite.", concerns: ["Wrinkles", "Facial volumising", "Acne", "Double chin"] },
        "Botox":   { title: "Botox", image: BotoxIcon, link: "https://www.carismaaesthetics.com/botox-malta", description: "Botox is a drug that temporarily paralyzes muscle. In small doses is used to treat wrinkles, facial slimming, decrease the oil production, excessive sweating and migraines.", concerns: ["Wrinkles", "Oily skin"] },
        "DermalFillers": { title: "Dermal Fillers", image: DermalFillersIcon, link: "https://www.carismaaesthetics.com/dermal-fillers-malta", description: "Dermal fillers are used to restore volume loss in the face. They are injected into the skin and are used to treat wrinkles, facial volume loss, thin lips, facial slimming and acne scars.", concerns: ["Wrinkles", "Facial volumising", "Acne", "Double chin"] },
        "HydraFacial": { title: "Hydrafacial", image: HydraFacialIcon, link: "https://www.carismaaesthetics.com/hydrafacial-malta", description: "HydraFacial is a medical grade facial that uses patented technology to cleanse, extract and hydrate the skin. It is used to treat acne, uneven skin tone, dry skin and wrinkles.", concerns: ["Uneven skin tone", "Acne", "Dry skin"] },
        "Advanced Hydrating Facial": { title: "Advanced Hydrating Facial", image: AdvancedFacialIcon, link: "https://www.carismaaesthetics.com/aqualab-advanced-hydrating-facial", description: "The Advanced Hydrating Facial is a 30-40 minute, non-invasive treatment that cleanses, exfoliates, extracts, and hydrates the skin. Using cutting-edge technology, it delivers immediate and lasting results for up to 4-5 weeks. Personalized serums address specific concerns like dryness, aging, acne, and sensitivity.", concerns: ["Wrinkles", "Uneven skin tone", "Acne", "Dry skin"]},
        "Mesotherapy": { title: "Mesotherapy", image: MesotherapyIcon, link: "https://www.carismaaesthetics.com/mesotherapy-malta", description: "Mesotherapy is a treatment that involves injecting a cocktail of vitamins, minerals and hyaluronic acid into the skin. It is used to treat dark circles, acne scars, uneven skin tone and dry skin.", concerns: ["Dark circles", "Dry skin", "Uneven skin tone"] },
        "Microneedling": { title: "Microneedling", image: MicroneedlingIcon, link: "https://www.carismaaesthetics.com/microneedling-malta", description: "Microneedling is a treatment that involves using a device with tiny needles to create micro-injuries in the skin. It is used to treat acne scars, dark circles, dry skin, uneven skin tone and wrinkles.", concerns: ["Acne", "Dark circles", "Dry skin", "Uneven skin tone", "Wrinkles"] },
        "PRP": { title: "PRP", image: PRPIcon, link: "https://www.carismaaesthetics.com/prp-malta", description: "PRP (Platelet Rich Plasma) is a treatment that involves taking a sample of your blood, spinning it in a centrifuge to separate the plasma and then injecting the plasma into the skin. It is used to treat dark circles, acne scars, dry skin and wrinkles.", concerns: ["Dark circles", "Dry skin", "Acne", "Wrinkles"] },
        "ThreadLift": { title: "Thread lift", image: ThreadLiftIcon, link: "https://www.carismaaesthetics.com/thread-lift-malta", description: "Thread lifts are a non-surgical alternative to a facelift. They involve inserting dissolvable threads into the skin to lift and tighten the skin. They are used to treat wrinkles and facial volume loss.", concerns: ["Wrinkles", "Facial volumising"] },
        "UnderChinReduction": { title: "Fat Dissolving", image: UnderChinReductionIcon, link: "https://www.carismaaesthetics.com/chin-fat-reduction-malta", description: "Under chin reduction is a treatment that involves injecting a fat dissolving solution into the skin. It is used to treat double chin.", concerns: ["Double chin"] },
        // "MFU": { title: "MFU", image: MFUIcon, link: "https://www.carismaaesthetics.com/mfu-ultight-malta", description: "MFU (Micro Focused Ultrasound) is a treatment that uses ultrasound energy to tighten the skin and reduce under chin fat. It is used to treat wrinkles and facial volume loss too.", concerns: ["Wrinkles", "Double chin", "Facial volumising"] },
        "LipFillers": { title: "Lip Fillers", image: LipFillersIcon, link: "https://www.carismaaesthetics.com/lip-fillers-malta", description: "Lipfillers are a cosmetic procedure where an injection is used to make lips appear fuller.", concerns: ["Thin lips"] },
        "Chemical Peel": { title: "Chemical Peel", image: ChemicalPeelIcon, link: "https://www.carismaaesthetics.com/chemical-peels-malta", description: "Chemical peels are a treatment that involves applying a chemical solution to the skin to exfoliate the skin and stimulate new skin growth. They are used to treat acne, acne scars, dark circles, dry skin and uneven skin tone.", concerns: ["Acne", "Dark circles", "Dry skin", "Uneven skin tone"] },
        "Topical Skincare": { title: "Topical Skincare", image: TopicalSkincareIcon, link: "https://www.carismaspa.com/home-care-carisma-spa-phytomer.html", description: "Topical skincare is a treatment that involves applying a cream to the skin. It is used to treat acne, dark circles, dry skin and uneven skin tone.", concerns: ["Acne", "Dark circles", "Dry skin", "Uneven skin tone"] },
    // get the treatments by concern using a map of concerns to treatments including the needle question
    }
    const withNeedleMap = { 
        "Acne": ["Collagen", "Microneedling", "DermalFillers", "PRP", "Advanced Hydrating Facial"], 
        "Dark circles": ["PRP", "Microneedling", "Mesotherapy"], 
        "Double chin": ["UnderChinReduction", "DermalFillers", "Collagen"], 
        "Dry skin": [ "Mesotherapy", "Microneedling", "PRP", "Advanced Hydrating Facial"], 
        "Facial volumising": ["DermalFillers", "Collagen", "ThreadLift"], 
        "Oily skin": ["Botox"], 
        "Thin lips": ["LipFillers"], 
        "Uneven skin tone": ["Mesotherapy", "Microneedling", "Advanced Hydrating Facial"], 
        "Wrinkles": ["Botox", "DermalFillers", "Collagen", "ThreadLift", "Microneedling", "Mesotherapy", "PRP", "Advanced Hydrating Facial"]
    }
    // non-needlemap
    const withoutNeedleMap = {
        "Acne": ["Chemical Peel", "Topical Skincare", "Advanced Hydrating Facial"],
        "Dark circles": ["Chemical Peel"],
        "Double chin": [],
        "Dry skin": ["Advanced Hydrating Facial"],
        "Facial volumising": [],
        "Oily skin": ["Chemical Peel"],
        "Uneven skin tone": ["Chemical Peel", "Advanced Hydrating Facial"],
        "Thin Lips": [],
        "Wrinkles": ["Chemical Peel", "Advanced Hydrating Facial"]
    }

    const optionsData = {
        'Wrinkles': { icon: IconWrinkles, link: "https://www.carismaaesthetics.com/wrinkles-and-fine-lines" },
        'Thin lips': { icon: IconThinLips, link: "https://www.carismaaesthetics.com/thin-lips" },
        'Facial volumising': { icon: IconFacialVolumising, link: "https://www.carismaaesthetics.com/facial-volumising-and-contouring" },
        'Uneven skin tone': { icon: IconUnevenSkinTone, link: "https://www.carismaaesthetics.com/uneven-skin-tone" },
        'Acne': { icon: IconAcne, link: "https://www.carismaaesthetics.com/acne-and-acne-scarring" },
        'Double chin': { icon: IconDoubleChin, link: "https://www.carismaaesthetics.com/double-chin-jaw-line" },
        'Dark circles': { icon: IconDarkCircles, link: "https://www.carismaaesthetics.com/dark-circles" },
        'Dry skin': { icon: IconDrySkin, link: "https://www.carismaaesthetics.com/dehydrated-skin" },
        'Oily skin': { icon: IconOilySkin, link: "https://www.carismaaesthetics.com/oily-skin" }
    };

    useEffect(() => {
        const storedData = localStorage.getItem('questionnaireData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            return <div> <h1> Loading...</h1></div> ;
        }
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            let tempTreatments = new Set();
            if (data[2] === 'Yes') {
                data[0].forEach(concern => {
                    withNeedleMap[concern].forEach((treatment) => {
                        tempTreatments.add(treatment);
                    })
                });
            } else {
                data[0].forEach(concern => {
                    if (withoutNeedleMap[concern]) {
                        withoutNeedleMap[concern].forEach((treatment) => {
                            tempTreatments.add(treatment);
                        })
                    }
                    })
            };
            setTreatments(tempTreatments);
        }
    }, [data]);

    let firstName = 'You'
    if (data[5]) {
        if (data[5].first_name)
            firstName = data[5].first_name;
    }

    return (
        <div className='min-h-screen flex items-start justify-center lg:pt-8'>
            <div className="min-h-screen p-1 lg:min-h-0 w-full">
                <div className='w-full mx-auto bg-white p-1 lg:p-10'>
                    <h1 className='uppercase font-custom custom-text-color text-center text-2xl font-thin mb-1'>Recommendations</h1>
                    <h1 className='uppercase font-custom custom-text-color text-center text-2xl font-thin mb-2'>Curated for {firstName}</h1>
                    <div className='border border-gray-100 mt-6'> </div>
                </div>
                <div className='w-full mx-auto bg-white p-2 lg:p-4'>
                    {treatments.size > 0 && Array.from(treatments).map((treatment) => {
                        const treatmentData = treatmentsMap[treatment];
                        if (!treatmentData) {
                            return `We are sorry but due to your preferences for no needles, we cannot recommend any treatments for ${treatment}.`;
                        } else {
                            return (
                                <div key={treatment} className='mt-4'>
                                    <div className='flex flex-col items-center sm:flex-row border-b border-gray-200 pb-4'>
                                        <div className='flex flex-col items-center sm:flex-row'>
                                            <div className='w-64 h-72 bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${treatmentData.image})` }} alt={treatment.title}></div>
                                        </div>
                                        <div className='flex flex-col m-4'>
                                            <h2 className='text-left lowercase font-trajan custom-text-color text-2xl mb-2'>{treatmentData.title}</h2>
                                            <p className='font-thin custom-text-color text-justify'>{treatmentData.description}</p>
                                            <div className='col-span-1 sm:col-span-2 my-4'>
                                                <h2 className='uppercase text-left font-custom custom-text-color text-1xl font-light' >Skin concerns addressed</h2>
                                            </div>
                                            <div className='grid grid-cols-4 sm:grid-cols-6 gap-1'>
                                                {treatmentData.concerns.map((concern, index) => {
                                                    const Icon = optionsData[concern].icon;
                                                    const link = optionsData[concern].link;
                                                    return (
                                                        <div key={index} className='flex flex-col'>
                                                            <a href={link} target="_blank" rel="noopener noreferrer">
                                                                <Icon className="w-8 h-8 mx-auto" alt={concern} />
                                                                <p className='text-xs mt-2 custom-text-color'>{concern}</p>
                                                            </a>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <a href={treatmentData.link} target="_blank" rel="noopener noreferrer" className="sm:static sm:mr-0 sm:mb-0 w-full 
                                            py-2 h-10 text-white uppercase font-custom sandy-button mt-2">Learn more</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Treatments;
