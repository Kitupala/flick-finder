interface SpinnerProps {
  text?: string;
}

function Spinner({ text }: SpinnerProps) {
  return (
    <div className="grid items-center justify-center">
      <div className="spinner"></div>
      <p className="mt-2 text-[#B7C7D7]">{text}</p>
    </div>
  );
}

export default Spinner;
