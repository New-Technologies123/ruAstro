import React, { useState } from 'react';
import Styles from './question-form.module.scss';
import { QuestionForm } from './QuestionForm';

export const QuestionFormWrapper: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        setIsOpen(false);
    };

    return (
        <>
            <button className={Styles.openButton} onClick={() => setIsOpen(true)}>
                Задать вопрос
            </button>

            {isOpen && (
                <div className={Styles.overlay} onClick={() => setIsOpen(false)}>
                    <div
                        className={Styles.modal}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className={Styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>

                        <h2>Задать вопрос</h2>

                        <QuestionForm
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
