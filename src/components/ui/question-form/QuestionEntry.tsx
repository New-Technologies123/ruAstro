import React from 'react';
import { QuestionFormWrapper } from './QuestionFormWrapper';
import Styles from './questionFloating.module.scss';

export const QuestionEntry: React.FC = () => {
    return (
        <div className={Styles.floatingWrapper}>
            <QuestionFormWrapper />
        </div>
    );
};
