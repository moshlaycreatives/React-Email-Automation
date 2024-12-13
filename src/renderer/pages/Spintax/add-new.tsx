import React from 'react';
import Table from '../../components/tables';

const AddNewSpintax = () => {
  return (
    <div
      className="text-white"
      style={{
        height: '100vh',
        background:
          'linear-gradient(180deg, #250E42 0%, #3C1B64 25%, #532886 50%)',
      }}
    >
      <div className="container">
        <div className='ms-5 me-4'>
          <h1 className="pt-4 pb-2">Spintax</h1>
          <div className="mb-3 row">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label col-2 fw-bold"
            >
              Email address
            </label>
            <input
              style={{
                width: '211px',
                height: '30px',
                borderRadius: '5px',
              }}
              type="email"
              className="form-control col-3"
              id="exampleFormControlInput1"
              placeholder="Name Here"
            />
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="spintax-description"
              className="form-label col-2 fw-bold"
            >
              Description
            </label>
            <textarea
              style={{
                width: '308px',
                height: '69px',
                borderRadius: '5px',
              }}
              className="form-control col-3"
              id="spintax-description"
              placeholder="Description Here"
            ></textarea>
          </div>
          <div className="row ms-1">
            <div className="col-5 d-flex justify-content-end">
              <button
                style={{
                  width: '111px',
                  height: '33px',
                  borderRadius: '5px',
                }}
                className="btn btn-success"
              >
                Save
              </button>
            </div>
          </div>
          <div
            className="row align-items-center gap-2 mb-3"
            style={{
              marginTop: '100px',
            }}
          >
            <label htmlFor="spintax-value" className="form-label col-2 fw-bold">
              Spintax Value:
            </label>
            <div className="col-4">
              <input
                style={{
                  width: '211px',
                  height: '30px',
                  borderRadius: '5px',
                }}
                type="email"
                className="form-control"
                id="spintax-value"
                placeholder="Value here"
              />
            </div>
            <button style={{}} className="btn btn-success col-1">
              Add
            </button>
            <button style={{}} className="btn btn-danger col-1">
              Delete
            </button>
          </div>
        </div>
        <div className="row">
          <Table
            thead={['id', 'value']}
            items={[
              {
                id: 1,
                value: 'hellow',
              },
              {
                id: 2,
                value: 'new text',
              },
            ]}
            classes={{
              table: 'table table-bordered w-75 rounded overflow-hidden',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewSpintax;
