const HourSectionSkeleton = () => {
  return (
    <>
      {new Array(20).fill("").map((item) => (
        <div className="skeleton h-[2.625rem] sm:h-[2.375rem] rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm"></div>
      ))}
    </>
  );
};

export default HourSectionSkeleton;
