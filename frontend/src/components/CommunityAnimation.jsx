import React from "react";

const CommunityAnimation = () => (
  <svg
    className="absolute inset-0 w-full h-full z-0 animate-none pointer-events-none"
    viewBox="0 0 600 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ minHeight: '100%', minWidth: '100%' }}
  >
    {/* Animated gradient blobs */}
    <g>
      {/* Main blobs */}
      <ellipse>
        <animate attributeName="cx" values="100;500;100" dur="12s" repeatCount="indefinite" />
        <animate attributeName="cy" values="100;500;100" dur="14s" repeatCount="indefinite" />
        <animate attributeName="rx" values="80;120;80" dur="10s" repeatCount="indefinite" />
        <animate attributeName="ry" values="60;100;60" dur="11s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.15;0.3" dur="8s" repeatCount="indefinite" />
        <stop offset="0%" stopColor="#a18fff" />
        <stop offset="100%" stopColor="#ffb6ea" />
      </ellipse>
      <ellipse cx="500" cy="150" rx="70" ry="50" fill="url(#grad1)" opacity="0.18">
        <animate attributeName="cy" values="150;400;150" dur="13s" repeatCount="indefinite" />
        <animate attributeName="rx" values="70;100;70" dur="9s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="300" cy="500" rx="90" ry="60" fill="url(#grad2)" opacity="0.13">
        <animate attributeName="cy" values="500;200;500" dur="15s" repeatCount="indefinite" />
        <animate attributeName="rx" values="90;120;90" dur="12s" repeatCount="indefinite" />
      </ellipse>
      {/* Extra blobs for more color and movement */}
      <ellipse cx="120" cy="480" rx="40" ry="28" fill="url(#grad3)" opacity="0.16">
        <animate attributeName="cy" values="480;350;480" dur="10s" repeatCount="indefinite" />
        <animate attributeName="rx" values="40;60;40" dur="8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="520" cy="80" rx="30" ry="22" fill="url(#grad4)" opacity="0.14">
        <animate attributeName="cy" values="80;200;80" dur="11s" repeatCount="indefinite" />
        <animate attributeName="rx" values="30;50;30" dur="7s" repeatCount="indefinite" />
      </ellipse>
    </g>
    {/* Floating chat bubbles - more and varied */}
    <g>
      {/* Original and new bubbles */}
      {[...Array(8)].map((_, idx) => {
        // Vary position, size, color, and animation duration
        const cx = [180, 420, 350, 520, 100, 250, 480, 320][idx];
        const cy = [350, 420, 120, 300, 200, 100, 250, 400][idx];
        const r = [18, 14, 10, 12, 8, 16, 11, 13][idx];
        const fill = ["#a18fff", "#ffb6ea", "#a18fff", "#ffb6ea", "#a18fff", "#ffb6ea", "#a18fff", "#ffb6ea"][idx];
        const opacity = [0.25, 0.22, 0.18, 0.20, 0.15, 0.19, 0.17, 0.21][idx];
        const dur = [10, 12, 9, 8, 7, 11, 10, 13][idx];
        const move = idx % 2 === 0 ? 50 : -50;
        return (
          <g key={idx}>
            <circle cx={cx} cy={cy} r={r} fill={fill} opacity={opacity}>
              <animate attributeName="cy" values={`${cy};${cy + move};${cy}`} dur={`${dur}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${cx};${cx + move};${cx}`} dur={`${dur + 2}s`} repeatCount="indefinite" />
            </circle>
            <rect x={cx - r/1.5} y={cy - r/1.5} width={r*1.2} height={r*0.7} rx={r/4} fill="#fff" opacity={opacity * 0.7}>
              <animate attributeName="y" values={`${cy - r/1.5};${cy - r/1.5 + move};${cy - r/1.5}`} dur={`${dur}s`} repeatCount="indefinite" />
              <animate attributeName="x" values={`${cx - r/1.5};${cx - r/1.5 + move};${cx - r/1.5}`} dur={`${dur + 2}s`} repeatCount="indefinite" />
            </rect>
          </g>
        );
      })}
    </g>
    {/* Sparkles/lines - more and varied */}
    <g>
      {[...Array(6)].map((_, idx) => {
        const x1 = [100, 500, 300, 200, 400, 150][idx];
        const y1 = [100, 500, 300, 200, 400, 350][idx];
        const x2 = [120, 520, 320, 220, 420, 170][idx];
        const y2 = [120, 520, 320, 220, 420, 370][idx];
        const color = ["#fff", "#a18fff", "#ffb6ea", "#6ee7b7", "#f472b6", "#fff"][idx];
        const opacity = [0.18, 0.15, 0.22, 0.16, 0.19, 0.13][idx];
        const dur = [4, 5, 3, 6, 4, 5][idx];
        return (
          <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" opacity={opacity}>
            <animate attributeName="opacity" values={`${opacity};0.5;${opacity}`} dur={`${dur}s`} repeatCount="indefinite" />
          </line>
        );
      })}
      {/* Sparkle dots */}
      {[...Array(5)].map((_, idx) => {
        const cx = [300, 120, 480, 220, 400][idx];
        const cy = [300, 180, 420, 350, 250][idx];
        const r = [3, 2, 4, 2.5, 3.5][idx];
        const color = ["#fff", "#a18fff", "#ffb6ea", "#6ee7b7", "#f472b6"][idx];
        const dur = [3, 2, 4, 3, 2.5][idx];
        return (
          <circle key={idx} cx={cx} cy={cy} r={r} fill={color} opacity="0.22">
            <animate attributeName="r" values={`${r};${r*2};${r}`} dur={`${dur}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.22;0.5;0.22" dur={`${dur}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </g>
    {/* Gently moving chat/message/user icons (as simple SVG paths) */}
    <g>
      {/* Chat bubble icon */}
      <g opacity="0.18">
        <rect x="370" y="80" width="38" height="24" rx="12" fill="#a18fff">
          <animate attributeName="y" values="80;100;80" dur="8s" repeatCount="indefinite" />
        </rect>
        <polygon points="390,104 400,120 410,104" fill="#a18fff">
          <animate attributeName="points" values="390,104 400,120 410,104;390,114 400,130 410,114;390,104 400,120 410,104" dur="8s" repeatCount="indefinite" />
        </polygon>
      </g>
      {/* User icon */}
      <g opacity="0.15">
        <circle cx="520" cy="200" r="12" fill="#ffb6ea">
          <animate attributeName="cy" values="200;220;200" dur="10s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="520" cy="220" rx="16" ry="8" fill="#ffb6ea">
          <animate attributeName="cy" values="220;240;220" dur="10s" repeatCount="indefinite" />
        </ellipse>
      </g>
      {/* Message icon */}
      <g opacity="0.13">
        <rect x="80" y="420" width="36" height="20" rx="8" fill="#6ee7b7">
          <animate attributeName="y" values="420;440;420" dur="9s" repeatCount="indefinite" />
        </rect>
        <rect x="90" y="430" width="16" height="4" rx="2" fill="#fff" />
        <rect x="110" y="430" width="8" height="4" rx="2" fill="#fff" />
      </g>
    </g>
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a18fff" />
        <stop offset="100%" stopColor="#ffb6ea" />
      </linearGradient>
      <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffb6ea" />
        <stop offset="100%" stopColor="#a18fff" />
      </linearGradient>
      <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#a18fff" />
      </linearGradient>
      <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#a18fff" />
      </linearGradient>
    </defs>
  </svg>
);

export default CommunityAnimation; 