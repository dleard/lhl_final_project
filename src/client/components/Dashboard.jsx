const Dashboard = ({ handleClose, show }) => {
  const showHideClassName = show ? "dashboard display-block" : "dashboard display-none";

  return (
    <div className={showHideClassname}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};