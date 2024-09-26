export const MaturiteProgress = ({ value = 0 }: { value?: number }) => {
  const progress = Math.min(1, Math.max(0, value * 0.2));

  return (
    <div className="relative mr-2 flex items-center justify-center">
      <span className="absolute">{value}</span>
      <div style={{ width: "27px", height: "27px" }}>
        <svg viewBox="0 0 27 27" width="27" height="27">
          <circle r="12" cx="13.5" cy="13.5" fill="transparent" stroke="#e3e3fd" strokeWidth="3" />
          <circle
            r="12"
            cx="13.5"
            cy="13.5"
            fill="transparent"
            stroke="#000091"
            strokeWidth="3"
            strokeDasharray={2 * Math.PI * 12}
            strokeDashoffset={2 * Math.PI * 12 * (1 - progress)}
            transform="rotate(-90 13.5 13.5)"
            strokeLinecap="butt"
          />
        </svg>
      </div>
    </div>
  );
};
