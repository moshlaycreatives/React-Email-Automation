// import { ReactNode } from 'react';

// const Modal = ({ children, open }: { children: any; open: string }) => {
//   return (
//     <div
//       className="modal fade"
//       id="modify"
//     //   id={`${open}`}
//       tabIndex="-1"
//       aria-labelledby={`${open}Label`}
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h1 className="modal-title fs-5" id={`${open}Label`}>
//               {open}
//             </h1>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { useState } from 'react';
import Modal from 'react-modal';

let customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root');

function ReactModal({modalIsOpen,closeModal,children,title=""}) {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle?.style?.color = '#f00';
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={title}
      >
        {children}
      </Modal>
    </div>
  );
}

export default ReactModal;