const Loading = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className="fs-1">Please wait a second</p>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="fs-1">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
