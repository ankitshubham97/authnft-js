export default function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="alert alert-success">
      <div className="flex-1">
        <label>{message}</label>
      </div>
    </div>
  );
}
