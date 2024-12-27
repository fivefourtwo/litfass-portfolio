import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Modal from 'react-modal'; // Import Modal from react-modal
import { Leva } from 'leva';

Modal.setAppElement('#root'); // Required for accessibility

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [modalContent, setModalContent] = useState(''); // State to store modal content

  // Function to open modal with content
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Leva />
      <div style={{width: '100%', height: '100%', background: '#FAF9F6', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 80, display: 'inline-flex'}}>
        <div style={{backgroundColor: '#FAF9F6', flex: '1 1 0', alignSelf: 'stretch', paddingTop: 120, paddingLeft: 120, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: 'black', fontSize: 20, fontFamily: 'Corporate A Pro', fontWeight: '300', wordWrap: 'break-word'}}>Hi I’m Fabrice,<br/>an Interaction Designer from the HfG in Schwäbisch Gmünd</div>
        </div>

        <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <Canvas shadows camera={{ position: [5, 3, 10], fov: 30 }}>
            <color attach="background" args={["#FAF9F6"]} />
            {/* Pass openModal function as a prop to Experience component */}
            <Experience onPosterClick={openModal} />
          </Canvas>
        </div>

        {/* Modal Component */}
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <div>
            <h2>Project Details</h2>
            <p>{modalContent}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
