import { useRef, useEffect, useState, type ReactNode } from 'react';
import './StatCard.css';

type CardVariant = 'blue' | 'purple' | 'green' | 'orange' | 'grey';

interface StatCardBigTextProps {
  title: string;
  description: string;
  bigText: string;
  variant?: CardVariant;
  bgVariant?: CardVariant;
  wide?: boolean;
}

export function StatCardBigText({
  title,
  description,
  bigText,
  variant = 'blue',
  bgVariant,
  wide = false,
}: StatCardBigTextProps) {
  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState('0 0 600 180');

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const bbox = textEl.getBBox();
    const padX = bbox.height * 0.05;
    setViewBox(
      `${bbox.x - padX} ${bbox.y} ${bbox.width + padX * 2} ${bbox.height}`
    );
  }, [bigText]);

  const classes = [
    'stat-card',
    `stat-card--${variant}`,
    bgVariant && `stat-card--bg-${bgVariant}`,
    wide && 'stat-card--wide',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        <p className="stat-card__description">{description}</p>
      </div>

      <div className="stat-card__big-text-wrapper">
        <svg
          className="stat-card__big-text-svg"
          viewBox={viewBox}
          preserveAspectRatio="xMinYMax meet"
          aria-label={bigText}
          role="img"
        >
          <text
            ref={textRef}
            x="0"
            y="0"
            dominantBaseline="auto"
            textAnchor="start"
            fontSize="216"
          >
            {bigText}
          </text>
        </svg>
      </div>
    </div>
  );
}

interface StatCardGraphicProps {
  title: string;
  description: string;
  graphic: string;
  graphicAlt?: string;
  variant?: CardVariant;
  bgVariant?: CardVariant;
  wide?: boolean;
}

export function StatCardGraphic({
  title,
  description,
  graphic,
  graphicAlt = '',
  variant = 'blue',
  bgVariant,
  wide = false,
}: StatCardGraphicProps) {
  const classes = [
    'stat-card',
    `stat-card--${variant}`,
    bgVariant && `stat-card--bg-${bgVariant}`,
    wide && 'stat-card--wide',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        <p className="stat-card__description">{description}</p>
      </div>

      <div className="stat-card__graphic-wrapper">
        <img
          className="stat-card__graphic"
          src={graphic}
          alt={graphicAlt}
        />
      </div>
    </div>
  );
}

interface BarChartItem {
  value: number;
  displayValue?: string;
  unit?: string;
  label: string;
}

interface StatCardBarChartProps {
  title: string;
  description: string;
  bars: BarChartItem[];
  variant?: CardVariant;
  bgVariant?: CardVariant;
  wide?: boolean;
}

export function StatCardBarChart({
  title,
  description,
  bars,
  variant = 'blue',
  bgVariant,
  wide = false,
}: StatCardBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.9 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const maxValue = Math.max(...bars.map(b => b.value));

  const classes = [
    'stat-card',
    `stat-card--${variant}`,
    bgVariant && `stat-card--bg-${bgVariant}`,
    wide && 'stat-card--wide',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        <p className="stat-card__description">{description}</p>
      </div>

      <div className="stat-card__bar-chart-wrapper" ref={chartRef}>
        <div className="stat-card__bar-chart">
          {bars.map((bar, i) => {
            const heightPct = (bar.value / maxValue) * 100;
            const durationScale = bar.value / maxValue;
            return (
              <div className="stat-card__bar-column" key={i}>
                <div
                  className={`stat-card__bar ${inView ? 'stat-card__bar--animate' : ''}`}
                  style={{
                    '--bar-height': `${heightPct}%`,
                    '--bar-duration-scale': durationScale,
                  } as React.CSSProperties}
                >
                  <span className="stat-card__bar-value">
                    {bar.displayValue ?? bar.value.toLocaleString('sv-SE')}
                    {bar.unit && <span className="stat-card__bar-unit">{bar.unit}</span>}
                  </span>
                </div>
                <span className="stat-card__bar-label">{bar.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface SemiCircleSegment {
  value: number;
  label: string;
  displayValue?: string;
}

interface StatCardSemiCircleProps {
  title: string;
  description: string;
  segments: SemiCircleSegment[];
  variant?: CardVariant;
  bgVariant?: CardVariant;
  wide?: boolean;
}

export function StatCardSemiCircle({
  title,
  description,
  segments,
  variant = 'blue',
  bgVariant,
  wide = false,
}: StatCardSemiCircleProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.9 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const maxValue = Math.max(...segments.map(s => s.value));

  const innerR = 50;
  const outerRMax = 140;
  const maxThickness = outerRMax - innerR;
  const cx = outerRMax;
  const cy = outerRMax;
  const totalDuration = 1; // 1s total, same as bar charts

  // Flat edge at bottom, arc opens upward
  // Start at left (π), sweep through top to right (2π)
  let currentAngle = Math.PI;
  let cumulativeDelay = 0;

  const segmentData = segments.map((seg) => {
    const sweep = (seg.value / total) * Math.PI;
    const segOuterR = innerR + (seg.value / maxValue) * maxThickness;
    const midR = (innerR + segOuterR) / 2;
    const strokeW = segOuterR - innerR;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;

    // Stroked arc path at midR
    const x1 = cx + midR * Math.cos(startAngle);
    const y1 = cy + midR * Math.sin(startAngle);
    const x2 = cx + midR * Math.cos(endAngle);
    const y2 = cy + midR * Math.sin(endAngle);
    const largeArc = sweep > Math.PI ? 1 : 0;

    const d = `M ${x1} ${y1} A ${midR} ${midR} 0 ${largeArc} 1 ${x2} ${y2}`;
    const arcLength = sweep * midR;

    // Duration proportional to sweep
    const duration = (sweep / Math.PI) * totalDuration;
    const delay = cumulativeDelay;
    cumulativeDelay += duration;

    return { d, strokeW, arcLength, duration, delay };
  });

  const classes = [
    'stat-card',
    `stat-card--${variant}`,
    bgVariant && `stat-card--bg-${bgVariant}`,
    wide && 'stat-card--wide',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        <p className="stat-card__description">{description}</p>
      </div>

      <div className="stat-card__semi-circle-wrapper" ref={chartRef}>
        <svg
          className="stat-card__semi-circle-svg"
          viewBox={`0 0 ${outerRMax * 2} ${outerRMax}`}
          preserveAspectRatio="xMidYMax meet"
        >
          {segmentData.map(({ d, strokeW, arcLength, duration, delay }, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              className={`stat-card__semi-circle-segment stat-card__semi-circle-segment--${i}`}
              strokeWidth={strokeW}
              strokeDasharray={arcLength}
              strokeDashoffset={inView ? 0 : arcLength}
              style={{
                transition: `stroke-dashoffset ${duration}s var(--ease-linear) ${delay}s`,
              }}
            />
          ))}
        </svg>

        <div className="stat-card__semi-circle-legend">
          {segments.map((seg, i) => (
            <div className="stat-card__semi-circle-legend-item" key={i}>
              <span className={`stat-card__semi-circle-dot stat-card__semi-circle-dot--${i}`} />
              <span className="stat-card__semi-circle-legend-text">
                {seg.label} {seg.displayValue ?? `${seg.value}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardMarqueeProps {
  title: string;
  description: string;
  items: string[];
  variant?: CardVariant;
  bgVariant?: CardVariant;
  wide?: boolean;
}

export function StatCardMarquee({
  title,
  description,
  items,
  variant = 'blue',
  bgVariant,
  wide = false,
}: StatCardMarqueeProps) {
  const marqueeText = items.join(' · ') + ' · ';

  const classes = [
    'stat-card',
    `stat-card--${variant}`,
    bgVariant && `stat-card--bg-${bgVariant}`,
    wide && 'stat-card--wide',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        <p className="stat-card__description">{description}</p>
      </div>

      <div className="stat-card__marquee-wrapper">
        <div className="stat-card__marquee-track">
          <span className="stat-card__marquee-text">{marqueeText}</span>
          <span className="stat-card__marquee-text">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
}

interface StatCardGridProps {
  children: ReactNode;
}

export function StatCardGrid({ children }: StatCardGridProps) {
  return <div className="stat-card-grid">{children}</div>;
}
