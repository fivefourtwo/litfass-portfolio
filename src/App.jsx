import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Modal from 'react-modal';
import { Leva } from 'leva';
import styles from './App.module.css';

Modal.setAppElement('#root');

const MODAL_CONTENT = {
  0: {
    title: "AccessAbility",
    description: "Detailed information about AccessAbility project...",
    image: "/flyers/AccessAbility.png"
  },
  1: {
    title: "Project 2",
    description: "Detailed information about Project 2...",
    image: "/flyers/project02.png"
  },
  // Add content for all 8 posters
};

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
    posterIndex: null
  });

  const [collapsedSections, setCollapsedSections] = useState({
    projects: true,
    contact: true
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const openModal = (content) => {
    setModalState({
      isOpen: true,
      content: MODAL_CONTENT[content.posterIndex],
      posterIndex: content.posterIndex
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      content: null,
      posterIndex: null
    });
  };

  return (
    <>
      <Leva hidden/>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.introText}>
            <span className={`${styles.animateText}`}>Hi I'm Fabrice,</span>
            <span className={`${styles.animateText}`}>an Interaction designer from the HfG in Schwäbisch Gmünd</span>
          </div>
          
          <div className={styles.sectionContainer}>
            <div className={styles.section}>
              <div 
                className={`${styles.sectionTitle} ${styles.animateText} ${styles.collapsible}`}
                onClick={() => toggleSection('projects')}
              >
                Projects {collapsedSections.projects ? '▼' : '▲'}
              </div>
              <div className={`${styles.sectionContent} ${collapsedSections.projects ? styles.collapsed : ''}`}>
                <div className={styles.sectionText}>
                  <span className={`${styles.animateText}`}>AccessAbility</span>
                  <span className={`${styles.animateText}`}>Tripadvisor Redesign</span>
                  <span className={`${styles.animateText}`}>CareSense</span>
                  <span className={`${styles.animateText}`}>Sonification</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={`${styles.sectionTitle} ${styles.animateText}`}>About me</div>
            </div>

            <div className={styles.section}>
              <div 
                className={`${styles.sectionTitle} ${styles.animateText} ${styles.collapsible}`}
                onClick={() => toggleSection('contact')}
              >
                Contact {collapsedSections.contact ? '▼' : '▲'}
              </div>
              <div className={`${styles.sectionContent} ${collapsedSections.contact ? styles.collapsed : ''}`}>
                <div className={styles.sectionText}>
                  <span className={`${styles.animateText}`}>E-Mail</span>
                  <span className={`${styles.animateText}`}>LinkedIn</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={`${styles.sectionTitle} ${styles.animateText}`}>Legal notice</div>
            </div>
          </div>
        </div>

        <div className={styles.canvasContainer}>
          <Canvas 
            shadows 
            camera={{ 
              position: [5, 3, 10], 
              fov: 30,
              near: 0.1,
              far: 1000
            }}
          >
            <color attach="background" args={["#FAF9F6"]} />
            <Experience onPosterClick={openModal} />
          </Canvas>
        </div>

        <Modal 
          isOpen={modalState.isOpen} 
          onRequestClose={closeModal}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          {modalState.content && (
            <div className={styles.modalInner}>
              <h2 className={styles.modalTitle}>{modalState.content.title}</h2>
              <img 
                src={modalState.content.image} 
                alt={modalState.content.title}
                className={styles.modalImage}
              />
              <p className={styles.modalDescription}>{modalState.content.description}</p>
              <button className={styles.closeButton} onClick={closeModal}>Close</button>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default App;