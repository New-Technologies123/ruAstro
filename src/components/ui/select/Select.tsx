import { useState, useMemo, useEffect, useRef } from 'react';
import Styles from './select.module.scss';

type TOption = {
  id: string;
  title: string;
};

type TProps = {
  options: TOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export const Select = ({ options, selectedId, onSelect }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.id === selectedId);
  }, [options, selectedId]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (id: string) => {
    setIsOpen(false);
    onSelect(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={Styles.customSelect} ref={selectRef}>
      <div 
        className={`${Styles.selectHeader} ${isOpen ? Styles.active : ''}`}
        onClick={toggleDropdown}
      >
        <span className={Styles.selectedOption}>{selectedOption?.title.slice(0, 33)}</span>
        <span className={`${Styles.arrow} ${isOpen ? Styles.up : Styles.down}`}></span>
      </div>
      
      <div className={`${Styles.options} ${isOpen ? Styles.open : ''}`}>
        {options.map((option) => (
          <div 
            key={option.id} 
            className={Styles.option} 
            onClick={() => handleOptionClick(option.id)}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  );
};