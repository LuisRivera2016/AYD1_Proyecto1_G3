import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Alerta({clase, titulo, texto }) {
  const [showAlert, setShowAlert] = useState(true);
  const [alertClass, setAlertClass] = useState(clase);
  const [alertTitle, setAlertTitle] = useState(titulo);
  const [alertText, setAlertText] = useState(texto);

  return (
    <Modal show={showAlert} onHide={() => setShowAlert(false)}>
      <Modal.Header closeButton className={`alerta-${alertClass}`}>
        <Modal.Title>{alertTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`alerta-${alertClass}`}>{alertText}</Modal.Body> 
      <Modal.Footer className={`alerta-${alertClass}`}>
        <Button onClick={() => setShowAlert(false)} variant={`${alertClass}`}>
          ACEPTAR
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Alerta;
