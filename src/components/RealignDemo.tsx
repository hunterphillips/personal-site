import { useEffect, useRef, useState, type CSSProperties } from 'react';

// Back to front.
const WINDOWS = ['editor', 'term', 'browser', 'notes'] as const;
const MODIFIERS = ['⌃', '⌥', '⌘'];

// Looping demo for the Realign landing page. The scene and its timeline are
// CSS (the .rd rules in AppLandingPage.css); this component only pauses it.
export default function RealignDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    // Dev aid: /apps/realign?t=5.5 freezes the loop at 5.5 seconds.
    const freezeAt = import.meta.env.DEV
      ? new URLSearchParams(window.location.search).get('t')
      : null;
    if (freezeAt !== null) {
      node.style.setProperty('--t', `${freezeAt}s`);
      node.style.setProperty('--play', 'paused');
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setOffscreen(!entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const paused = userPaused || offscreen;

  return (
    <>
      <div className="al-stage-inner">
        <div
          ref={ref}
          className="rd"
          role="img"
          aria-label="A window layout on a laptop is saved with Control-Option-Command-S. Two windows are dragged out of place, and Control-Option-Command-R moves them back. A monitor is plugged in and the windows move to the layout saved for both displays. The monitor is unplugged and the windows return to the laptop layout."
          style={paused ? ({ '--play': 'paused' } as CSSProperties) : undefined}
        >
          <div className="rd-external rd-a">
            <div className="rd-neck" />
            <div className="rd-foot" />
            <svg
              className="rd-cable rd-a"
              viewBox="0 0 640 384"
              aria-hidden="true"
            >
              <path
                d="M 226 282 C 252 316, 318 310, 337 283"
                fill="none"
                stroke="#b4b4bb"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="333"
                y="278"
                width="12"
                height="6"
                rx="2"
                fill="#9a9aa2"
              />
            </svg>
            <div className="rd-monitor">
              <div className="rd-screen rd-lit rd-a">
                <div className="rd-menubar" />
              </div>
            </div>
          </div>
          <div className="rd-box rd-deck rd-a" />
          <div className="rd-box rd-screen rd-laptop rd-a">
            <div className="rd-menubar">
              <div className="rd-mb-icon" />
              <div className="rd-ping rd-a" />
            </div>
          </div>
          {WINDOWS.map((name) => (
            <div key={name} className={`rd-box rd-win rd-${name} rd-a`}>
              <div className="rd-bar" />
              <div className="rd-dots" />
              <div className="rd-ln" />
              <div className="rd-ln" />
              <div className="rd-ln" />
              <div className="rd-ln" />
              <div className="rd-ln" />
            </div>
          ))}
          <svg
            className="rd-cursor rd-a"
            viewBox="0 0 15 15"
            aria-hidden="true"
          >
            <path
              d="M2 1l10 7.2-4.6.5L5 13z"
              fill="#1d1d1f"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <div className="rd-keys rd-a" aria-hidden="true">
            {MODIFIERS.map((key) => (
              <div key={key} className="rd-key rd-a">
                <span>{key}</span>
              </div>
            ))}
            <div className="rd-key rd-a">
              <span className="rd-alt rd-alt-s">S</span>
              <span className="rd-alt rd-alt-r">R</span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="al-pause"
        aria-pressed={userPaused}
        aria-label="Pause animation"
        onClick={() => setUserPaused((value) => !value)}
      >
        {userPaused ? (
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 1.5h3v11H3zM8 1.5h3v11H8z" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
}
