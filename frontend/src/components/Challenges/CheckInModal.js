"use client";

import { useState } from 'react';
import styles from './CheckInModal.module.css';

export default function CheckInModal({ challenge, onSubmit, onClose }) {
    const [checkInText, setCheckInText] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkInText.trim()) {
            setError('Check-in text is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit({ text: checkInText.trim() });
            // Modal will be closed by parent component
        } catch (err) {
            console.error('Check-in error:', err);
            setError(err.message || 'Failed to submit check-in. Please try again.');
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Daily Check-in</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.challengeInfo}>
                    <h3>{challenge.title}</h3>
                    <p className={styles.streakInfo}>
                        Current Streak: Day {challenge.currentDay} of {challenge.totalDays}
                    </p>
                </div>

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.checkInForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="checkInText" className={styles.label}>
                            What did you accomplish today? *
                        </label>
                        <textarea
                            id="checkInText"
                            className={styles.textarea}
                            placeholder="Describe what you did today for this challenge..."
                            value={checkInText}
                            onChange={(e) => setCheckInText(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Or upload a proof (image or text file)
                        </label>
                        <div className={styles.fileInputContainer}>
                            <label htmlFor="proofFile" className={styles.fileInputLabel}>
                                Choose file
                            </label>
                            <input
                                type="file"
                                id="proofFile"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                                accept="image/*,.txt,.pdf"
                            />
                            <span className={styles.fileName}>
                                {file ? file.name : 'No file chosen'}
                            </span>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Check-in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
