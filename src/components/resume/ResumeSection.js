import React, { useEffect, useRef } from 'react';
import { Typography } from "@mui/material";
import styles from './ResumeSection.module.scss';

export default function ResumeSection({ title, content }) {
    const sectionRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div ref={sectionRef} className={styles.sectionContainer}>
            <Typography variant="h2" className={styles.sectionTitle}>{title}</Typography>
            <Typography variant="body1" className={styles.sectionContent}>{content}</Typography>
        </div>
    );
}
