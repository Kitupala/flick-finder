const LabeledText = ({
  label,
  value,
  genres,
}: {
  label: string;
  value?: string | string[] | number;
  genres?: string[];
}) => {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-5 max-w-2xl">
      <p className="text-gray-100 mb-2">{label}</p>
      {genres ? (
        <div className="flex flex-row gap-2">
          {genres?.map((item) => (
            <p
              key={item}
              className="text-white text-sm bg-[rgba(34,31,61,1)] px-3 py-2 rounded-sm w-fit"
            >
              {item}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-white">{value}</p>
      )}
    </div>
  );
};

export default LabeledText;
