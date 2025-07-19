export const DaySectionDesktopSkeleton = () => {
  return (
    <div
      dir="rtl"
      className="flex justify-between last-of-type:!mb-0 px-3 py-[0.625rem] rounded-lg"
    >
      <div className="flex flex-col items-start gap-1">
        <div className="skeleton w-12 h-[0.875rem] rounded-lg" />
        <div className="skeleton w-16 h-[1.375rem] rounded-lg" />
      </div>
      <div className="skeleton w-5 h-6 rounded-lg" />
    </div>
  );
};

export const DaySectionMobileSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-y-1 w-20 mx-auto">
      <div className="skeleton w-10 h-[0.875rem] rounded-lg" />
      <div className="flex h-[1.438rem] items-center">
        <span className="skeleton w-16 h-full rounded-lg me-1" />
        <span className="skeleton w-5 h-full rounded-lg" />
      </div>
    </div>
  );
};
