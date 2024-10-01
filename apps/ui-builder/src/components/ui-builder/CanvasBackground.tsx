export function CanvasBackground() {
  return (
    <div
      className="absolute inset-0 bg-grid bg-center"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98h-98z' stroke='%23E5E7EB' fill='none' stroke-width='0.5'/%3E%3C/svg%3E\")",
        backgroundSize: '25px 25px',
      }}
    ></div>
  );
}
