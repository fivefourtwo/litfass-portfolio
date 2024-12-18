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
      <Canvas shadows camera={{ position: [5, 3, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        {/* Pass openModal function as a prop to Experience component */}
        <Experience onPosterClick={openModal} />
      </Canvas>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div>
          <h2>Project Details</h2>
          <p>{modalContent}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  );
}

export default App;
