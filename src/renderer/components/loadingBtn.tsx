const LoadingBtn = ({ loading, label, ...rest }) => {
  return (
    <button disabled={loading} {...rest}>
      {loading && (
        <div className="spinner-border spinner-border-sm me-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {label}
    </button>
  );
};

export default LoadingBtn;
