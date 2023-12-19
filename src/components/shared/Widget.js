function Widget({ children, heading }) {
  return (
    <section className="shadow p-3 d-flex flex-column rounded-2">
      <h2 className="fw-semibold text-center my-5">{heading}</h2>
      {children}
    </section>
  );
}

export default Widget;
