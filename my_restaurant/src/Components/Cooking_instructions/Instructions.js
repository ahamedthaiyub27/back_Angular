import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import styles from './Instruction.module.css';

const Instructions = () => {
  // State for the instructions input
  const [instructions, setInstructions] = useState('');
  const [hasSavedInstructions, setHasSavedInstructions] = useState(false);

  // Load saved instructions when component mounts
  useEffect(() => {
    const savedInstructions = localStorage.getItem('cookingInstructions');
    if (savedInstructions) {
      setInstructions(savedInstructions);
      setHasSavedInstructions(true);
    }
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setInstructions(e.target.value);
    setHasSavedInstructions(false);
  };

  // Save instructions to localStorage
  const saveInstructions = () => {
    if (instructions.trim()) {
      localStorage.setItem('cookingInstructions', instructions);
      setHasSavedInstructions(true);
      alert('Instructions saved successfully!');
    } else {
      alert('Please enter some instructions before saving.');
    }
  };

  // Clear instructions from localStorage
  const clearInstructions = () => {
    localStorage.removeItem('cookingInstructions');
    setInstructions('');
    setHasSavedInstructions(false);
    alert('Instructions cleared.');
  };

  return (
    <>
      <Header />
      <section className={styles.container}>
        <h1 className={styles.title}>Cooking Instructions</h1>
        <textarea
          value={instructions}
          onChange={handleInputChange}
          maxLength={900}
          className={styles.inputBox}
          placeholder="Enter your cooking instructions..."
        />
        <p className={styles.description}>
          {hasSavedInstructions 
            ? "Your instructions are saved. They'll be available next time you visit."
            : "Please provide any specific cooking details or requests."}
        </p>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.cancel} 
            onClick={clearInstructions}
          >
            Clear Instructions
          </button>
          <button 
            className={styles.addOrder} 
            onClick={saveInstructions}
          >
            {hasSavedInstructions ? 'Update Instructions' : 'Save Instructions'}
          </button>
        </div>
      </section>
    </>
  );
};

export default Instructions;