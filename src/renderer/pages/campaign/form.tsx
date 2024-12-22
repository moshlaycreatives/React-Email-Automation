import { useContext, useState } from 'react';
import Richtext from '../../components/richtext';
import ReactModal from '../../components/modal';
import AccountsForm from './accountForm';
import EmailListForm from './emaillistForm';
import { CampaignContext } from './campaignContext';

const GmailAccountForm = ({ item, handleClose, handleSave }) => {
  const { input, onChange, richText, setRichText, sunRef } =
    useContext(CampaignContext);
  const [open, setOpen] = useState<string | boolean>(false);
  const accountsModal = open === 'accounts';
  const emaillistModal = open === 'emaillist';

  return (
    <div className="" style={{ width: '500px' }}>
      <ReactModal
        modalIsOpen={accountsModal}
        title="accounts"
        closeModal={handleClose}
      >
        <AccountsForm item={item} handleClose={() => setOpen('')} />
      </ReactModal>
      <ReactModal
        modalIsOpen={emaillistModal}
        title="emaillist"
        closeModal={handleClose}
      >
        <EmailListForm item={item} handleClose={() => setOpen('')} />
      </ReactModal>
      <div className="d-flex justify-content-between mb-2 align-items-center">
        <h3>Campaign</h3>
      </div>
      <div className="d-flex justify-content-end gap-2 mb-2 flex-wrap">
        <button className="btn btn-primary" onClick={() => setOpen('accounts')}>
          Accounts
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setOpen('emaillist')}
        >
          EmailLists
        </button>
      </div>
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
        <label htmlFor="name" className="form-label w-50 fw-bold ">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="Name"
          value={input?.Name}
          onChange={onChange}
          placeholder="Please enter name"
        />
      </div>
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
        <label htmlFor="description" className="form-label w-50 fw-bold ">
          Description
        </label>
        <textarea
          rows={3}
          className="form-control"
          id="descrption"
          name="Description"
          value={input?.Description}
          onChange={onChange}
          placeholder="Please enter description"
        ></textarea>
      </div>
      <div className="d-flex gap-2 align-items-start flex-row mb-2">
        <label htmlFor="subject" className="form-label w-50 fw-bold ">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          name="Subject"
          value={input?.Subject}
          onChange={onChange}
          placeholder="Please enter subject"
        />
      </div>
      <div>
        <Richtext
          name="Body"
          value={richText}
          onChange={setRichText}
          sunRef={sunRef}
        />
      </div>

      <div className="d-flex gap-2 align-items-center flex-row-reverse mb-2">
        <button className="btn btn-success" onClick={() => handleSave(input)}>
          Save
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GmailAccountForm;
