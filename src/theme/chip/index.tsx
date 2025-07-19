interface ChipProps {
  label: string;
  onDismiss: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDismiss }) => {
  return (
    <div
      className="relative grid select-none items-center whitespace-nowrap rounded-lg h-10 py-1.5 px-3 text-xs font-medium border border-gray-card-border custom-border uppercase text-black"
    >
        <button
            className="!absolute top-2/4 left-1 mx-px h-5 max-h-[32px] w-5 max-w-[32px] -translate-y-2/4 select-none rounded-md text-center align-middle font-sans text-xs font-medium uppercase text-black transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={onDismiss}
        >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 end-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
      </button>
      <span className="me-5">{label}</span>
    </div>
  );
};

export default Chip;