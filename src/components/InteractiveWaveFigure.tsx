import React, { useMemo, useState } from 'react';

export const InteractiveWaveFigure: React.FC = () => {
  const [wavelengthNm, setWavelengthNm] = useState<number>(1550);
  const [tempK, setTempK] = useState<number>(77);

  const curve = useMemo(() => {
    const detune = Math.abs(wavelengthNm - 1550) / 30;
    const thermal = (tempK / 295) * 0.14;
    const points = Array.from({ length: 64 }, (_, i) => {
      const x = i / 63;
      const y =
        0.09 +
        detune * 0.12 +
        thermal +
        Math.sin(x * Math.PI * (3 + detune * 2.5)) * (0.04 + thermal * 0.35);
      return { x, y };
    });

    const rms = Math.sqrt(points.reduce((a, p) => a + p.y * p.y, 0) / points.length);
    return { points, rms };
  }, [wavelengthNm, tempK]);

  const width = 680;
  const height = 170;
  const padY = 22;
  const plotH = height - padY * 2;

  const pathD = curve.points
    .map((p, i) => {
      const px = p.x * width;
      const py = padY + plotH - Math.min(1, p.y / 0.45) * plotH;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(' ');

  return (
    <figure className="my-10 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/60 p-6 sm:p-8 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
          Interactive Figure · Interferometric Phase Drift Profile
        </span>
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          RMS Residual: {curve.rms.toFixed(3)} nm
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Interactive optical phase stability waveform"
      >
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          className="stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <path
          d={pathD}
          fill="none"
          className="stroke-zinc-950 dark:stroke-zinc-100"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label htmlFor="fig-lambda" className="text-zinc-600 dark:text-zinc-400">
              Cavity Wavelength
            </label>
            <span className="font-mono text-zinc-950 dark:text-white">
              {wavelengthNm.toFixed(1)} nm
            </span>
          </div>
          <input
            id="fig-lambda"
            type="range"
            min={1520}
            max={1580}
            step={0.5}
            value={wavelengthNm}
            onChange={(e) => setWavelengthNm(Number(e.target.value))}
            className="w-full silver-slider"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label htmlFor="fig-temp" className="text-zinc-600 dark:text-zinc-400">
              Cryostat Temperature
            </label>
            <span className="font-mono text-zinc-950 dark:text-white">
              {tempK.toFixed(1)} K
            </span>
          </div>
          <input
            id="fig-temp"
            type="range"
            min={4}
            max={295}
            step={1}
            value={tempK}
            onChange={(e) => setTempK(Number(e.target.value))}
            className="w-full silver-slider"
          />
        </div>
      </div>

      <figcaption className="text-xs text-zinc-500 dark:text-zinc-400">
        Adjust cavity wavelength and cryostat temperature to observe phase residual shift across a 300 mm scan span.
      </figcaption>
    </figure>
  );
};
