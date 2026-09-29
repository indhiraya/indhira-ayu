export default function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 150" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F8FD" />
        </linearGradient>
        <filter id="cloudSoften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Bayangan bawah — dikurangi supaya tidak menarik warna keabuan/biru ke bawah */}
      <g filter="url(#cloudSoften)" fill="#E3EEF9" opacity="0.4">
        <ellipse cx="95" cy="98" rx="55" ry="26" />
        <ellipse cx="150" cy="92" rx="70" ry="30" />
        <ellipse cx="205" cy="98" rx="50" ry="25" />
        <ellipse cx="150" cy="105" rx="95" ry="20" />
      </g>

      {/* Badan awan utama — sekarang solid putih */}
      <g filter="url(#cloudSoften)" fill="url(#cloudBody)">
        <ellipse cx="70" cy="80" rx="34" ry="26" />
        <ellipse cx="95" cy="60" rx="42" ry="34" />
        <ellipse cx="135" cy="45" rx="50" ry="40" />
        <ellipse cx="180" cy="55" rx="44" ry="36" />
        <ellipse cx="215" cy="70" rx="38" ry="30" />
        <ellipse cx="235" cy="85" rx="28" ry="22" />
        <ellipse cx="150" cy="88" rx="95" ry="30" />
      </g>

      {/* Highlight — dinaikkan opacity-nya biar makin cerah */}
      <g fill="#FFFFFF" opacity="0.95">
        <ellipse cx="120" cy="40" rx="30" ry="20" />
        <ellipse cx="170" cy="45" rx="26" ry="18" />
      </g>
    </svg>
  );
}