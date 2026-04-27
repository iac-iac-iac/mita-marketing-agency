/** Общие классы визуала превью — для главной и лендингов услуг */

export const mitaBg = 'bg-[#0D0D0D]'

export const mitaGoldText = 'text-[#D4A84B]'

export const mitaGoldGrad =
  'bg-gradient-to-b from-[#F5E1A4] via-[#D4A84B] to-[#9A7B2C] bg-clip-text text-transparent'

export const mitaGlassFill = 'bg-white/[0.05] backdrop-blur-[10px]'

/** Карточка как в превью: border золотой 20%, glass, тень */
export const mitaGlassCard =
  'rounded-2xl border border-[#D4A84B]/20 shadow-lg ' + mitaGlassFill


export const mitaServiceCard =
  'group relative overflow-hidden rounded-2xl border border-white/[0.08] border-t-[#D4A84B]/35 p-6 ' +
  mitaGlassFill +
  ' transition-all duration-500 hover:-translate-y-1 hover:border-[#D4A84B]/40 hover:bg-white/[0.07] ' +
  'hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(212,168,75,0.28)]'

export const mitaCtaGradient =
  '!border-0 !bg-gradient-to-r from-[#B8892E] to-[#F5E1A4] !text-[#0D0D0D] !shadow-[0_0_24px_rgba(212,168,75,0.4)]'

export const mitaHeaderBar = 'bg-[#0D0D0D]/85 backdrop-blur-md border-b border-white/10'

export const mitaTextMuted = 'text-white/60'
