import Table from '../../components/tables';

const EmailLists = () => {
  return (
    <div>
      <div className="actions d-flex gap-2">
        <button className="flex-grow-1 flex-shrink-1 btn btn-success">
          Add New
        </button>
        <button className="flex-grow-1 flex-shrink-1 btn btn-success">
          Modify
        </button>
        <button className="flex-grow-1 flex-shrink-1 btn btn-danger">
          Delete
        </button>
      </div>

          <Table
            thead={['name', 'description']}
            items={[
              {
                name: 1,
                description: 'hellow',
              },
              {
                name: 2,
                description: 'new text',
              },
            ]}
            classes={{
              table: 'table table-bordered w-100 rounded overflow-hidden mt-5',
            }}
          />
    </div>
  );
};

export default EmailLists;
