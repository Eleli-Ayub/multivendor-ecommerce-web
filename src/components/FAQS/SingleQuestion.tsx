import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface SingleQuestionProps {
    title: string;
    info: string;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ title, info }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <article className="question">
            <header>
                <h5>{title}</h5>
                <button
                    className="question-btn bg-primary-orange text-white hover:bg-secondary-orange"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </button>
            </header>
            {showInfo && <p>{info}</p>}
        </article>
    );
};

export default SingleQuestion;
