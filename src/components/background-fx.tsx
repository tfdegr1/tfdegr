// Fixed, full-viewport ambient background: grid, radial glows, scan beam.
export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div className="grid-bg grid-bg-fade absolute inset-0 opacity-70" />
      <div className="absolute -top-40 left-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[36rem] w-[36rem] translate-x-1/3 rounded-full bg-neon-magenta/10 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-neon-violet/10 blur-[130px]" />
      <div className="scanbeam absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon-cyan/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
