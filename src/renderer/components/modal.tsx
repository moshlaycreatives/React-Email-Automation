import { ReactNode } from 'react';

const Modal = ({ children, open }: { children: any; open: string }) => {
  return (
    <div
      className="modal fade"
      id="modify"
    //   id={`${open}`}
      tabIndex="-1"
      aria-labelledby={`${open}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${open}Label`}>
              {open}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.Button = ({
  className,
  onClick,
  target,
  children,
}: {
  className: string;
  onClick: () => void;
  target: string;
  children: ReactNode;
}) => {
  debugger;
  return (
    <button
      className={className}
      onClick={onClick}
      data-bs-toggle="modal"
      data-bs-target={`#${target}`}
    >
      {children}
    </button>
  );
};
