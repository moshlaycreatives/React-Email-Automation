const Loading = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p>Please wait a second</p>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
