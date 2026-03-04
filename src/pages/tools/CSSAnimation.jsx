import { useState, useEffect, useId } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'

const KEYFRAMES_CSS = `
@keyframes csstools-fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes csstools-fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes csstools-slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes csstools-slideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes csstools-slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes csstools-slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes csstools-scaleIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
@keyframes csstools-scaleOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.7); } }
@keyframes csstools-bounce { 0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(-28px); animation-timing-function: cubic-bezier(0,0,0.2,1); } }
@keyframes csstools-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes csstools-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.75; } }
@keyframes csstools-shake { 0%, 100% { transform: translateX(0); } 15%, 45%, 75% { transform: translateX(-10px); } 30%, 60%, 90% { transform: translateX(10px); } }
@keyframes csstools-flip { from { transform: perspective(400px) rotateY(0deg); } to { transform: perspective(400px) rotateY(360deg); } }
@keyframes csstools-swing { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(14deg); } 75% { transform: rotate(-14deg); } }
@keyframes csstools-rubberBand { 0% { transform: scale(1,1); } 30% { transform: scale(1.28,0.72); } 40% { transform: scale(0.75,1.25); } 50% { transform: scale(1.15,0.85); } 65% { transform: scale(0.95,1.05); } 75% { transform: scale(1.05,0.95); } 100% { transform: scale(1,1); } }
@keyframes csstools-blurIn { from { opacity: 0; filter: blur(12px); } to { opacity: 1; filter: blur(0); } }
@keyframes csstools-heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.15); } 28% { transform: scale(1); } 42% { transform: scale(1.15); } 70% { transform: scale(1); } }
`

const PRESETS = [
  { value: 'fadeIn',      label: 'Fade In' },
  { value: 'fadeOut',     label: 'Fade Out' },
  { value: 'slideUp',     label: 'Slide Up' },
  { value: 'slideDown',   label: 'Slide Down' },
  { value: 'slideInLeft', label: 'Slide Left' },
  { value: 'slideInRight',label: 'Slide Right' },
  { value: 'scaleIn',     label: 'Scale In' },
  { value: 'scaleOut',    label: 'Scale Out' },
  { value: 'bounce',      label: 'Bounce' },
  { value: 'spin',        label: 'Spin' },
  { value: 'pulse',       label: 'Pulse' },
  { value: 'shake',       label: 'Shake' },
  { value: 'flip',        label: 'Flip 3D' },
  { value: 'swing',       label: 'Swing' },
  { value: 'rubberBand',  label: 'Rubber Band' },
  { value: 'blurIn',      label: 'Blur In' },
  { value: 'heartbeat',   label: 'Heartbeat' },
]

const EASINGS = [
  { value: 'ease', label: 'ease' },
  { value: 'ease-in', label: 'ease-in' },
  { value: 'ease-out', label: 'ease-out' },
  { value: 'ease-in-out', label: 'ease-in-out' },
  { value: 'linear', label: 'linear' },
]

const FILL_MODES = ['none', 'forwards', 'backwards', 'both']
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse']

const LOOP_PRESETS = new Set(['bounce', 'spin', 'pulse', 'shake', 'swing', 'rubberBand', 'heartbeat'])

const PREVIEW_LABEL = {
  fadeIn: 'Fade In', fadeOut: 'Fade Out', slideUp: 'Rise Up', slideDown: 'Drop Down',
  slideInLeft: 'Slide Left', slideInRight: 'Slide Right', scaleIn: 'Scale In', scaleOut: 'Scale Out',
  bounce: 'Bounce', spin: '✦', pulse: 'Pulse', shake: 'Shake!', flip: 'Flip',
  swing: 'Swing', rubberBand: 'Stretch', blurIn: 'Blur In', heartbeat: '♥',
}

const KFMAP = {
  fadeIn: 'fadeIn', fadeOut: 'fadeOut', slideUp: 'slideUp', slideDown: 'slideDown',
  slideInLeft: 'slideInLeft', slideInRight: 'slideInRight',
  scaleIn: 'scaleIn', scaleOut: 'scaleOut', bounce: 'bounce', spin: 'spin',
  pulse: 'pulse', shake: 'shake', flip: 'flip', swing: 'swing',
  rubberBand: 'rubberBand', blurIn: 'blurIn', heartbeat: 'heartbeat',
}

const KF_DISPLAY = {
  fadeIn:      `@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}`,
  fadeOut:     `@keyframes fadeOut {\n  from { opacity: 1; }\n  to   { opacity: 0; }\n}`,
  slideUp:     `@keyframes slideUp {\n  from { opacity: 0; transform: translateY(30px); }\n  to   { opacity: 1; transform: translateY(0); }\n}`,
  slideDown:   `@keyframes slideDown {\n  from { opacity: 0; transform: translateY(-30px); }\n  to   { opacity: 1; transform: translateY(0); }\n}`,
  slideInLeft: `@keyframes slideInLeft {\n  from { opacity: 0; transform: translateX(-40px); }\n  to   { opacity: 1; transform: translateX(0); }\n}`,
  slideInRight:`@keyframes slideInRight {\n  from { opacity: 0; transform: translateX(40px); }\n  to   { opacity: 1; transform: translateX(0); }\n}`,
  scaleIn:     `@keyframes scaleIn {\n  from { opacity: 0; transform: scale(0.7); }\n  to   { opacity: 1; transform: scale(1); }\n}`,
  scaleOut:    `@keyframes scaleOut {\n  from { opacity: 1; transform: scale(1); }\n  to   { opacity: 0; transform: scale(0.7); }\n}`,
  bounce:      `@keyframes bounce {\n  0%, 100% { transform: translateY(0);\n             animation-timing-function: cubic-bezier(0.8,0,1,1); }\n  50%       { transform: translateY(-28px);\n             animation-timing-function: cubic-bezier(0,0,0.2,1); }\n}`,
  spin:        `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}`,
  pulse:       `@keyframes pulse {\n  0%, 100% { transform: scale(1); opacity: 1; }\n  50%       { transform: scale(1.12); opacity: 0.75; }\n}`,
  shake:       `@keyframes shake {\n  0%, 100%      { transform: translateX(0); }\n  15%, 45%, 75% { transform: translateX(-10px); }\n  30%, 60%, 90% { transform: translateX(10px); }\n}`,
  flip:        `@keyframes flip {\n  from { transform: perspective(400px) rotateY(0deg); }\n  to   { transform: perspective(400px) rotateY(360deg); }\n}`,
  swing:       `@keyframes swing {\n  0%, 100% { transform: rotate(0deg); }\n  25%       { transform: rotate(14deg); }\n  75%       { transform: rotate(-14deg); }\n}`,
  rubberBand:  `@keyframes rubberBand {\n  0%   { transform: scale(1, 1); }\n  30%  { transform: scale(1.28, 0.72); }\n  40%  { transform: scale(0.75, 1.25); }\n  50%  { transform: scale(1.15, 0.85); }\n  65%  { transform: scale(0.95, 1.05); }\n  75%  { transform: scale(1.05, 0.95); }\n  100% { transform: scale(1, 1); }\n}`,
  blurIn:      `@keyframes blurIn {\n  from { opacity: 0; filter: blur(12px); }\n  to   { opacity: 1; filter: blur(0); }\n}`,
  heartbeat:   `@keyframes heartbeat {\n  0%, 100% { transform: scale(1); }\n  14%       { transform: scale(1.15); }\n  28%       { transform: scale(1); }\n  42%       { transform: scale(1.15); }\n  70%       { transform: scale(1); }\n}`,
}

export default function CSSAnimation() {
  const [preset, setPreset]       = useState('fadeIn')
  const [duration, setDuration]   = useState(600)
  const [delay, setDelay]         = useState(0)
  const [iterations, setIterations] = useState(1)
  const [fillMode, setFillMode]   = useState('both')
  const [direction, setDirection] = useState('normal')
  const [easing, setEasing]       = useState('ease')
  const [playState, setPlayState] = useState('running')
  const [animKey, setAnimKey]     = useState(0)

  useEffect(() => {
    let style = document.getElementById('csstools-kf-style')
    if (!style) {
      style = document.createElement('style')
      style.id = 'csstools-kf-style'
      document.head.appendChild(style)
    }
    style.textContent = KEYFRAMES_CSS
    return () => {}
  }, [])

  const iterValue  = iterations === 0 ? 'infinite' : String(iterations)
  const kfName     = `csstools-${KFMAP[preset]}`
  const animValue  = `${kfName} ${duration}ms ${easing} ${delay}ms ${iterValue} ${direction} ${fillMode}`
  const cleanValue = `${preset} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ''} ${iterValue} ${direction} ${fillMode}`
  const codeStr    = `${KF_DISPLAY[preset]}\n\n.element {\n  animation: ${cleanValue};\n}`

  const replay = () => {
    setPlayState('running')
    setAnimKey(k => k + 1)
  }

  const isLoop     = LOOP_PRESETS.has(preset)
  const label      = PREVIEW_LABEL[preset] || preset

  return (
    <>
      <SEOMeta title="CSS Animation" description="Build CSS animations with keyframe presets, timing, iteration count, and direction control." path="/tools/animation" />
      <ToolLayout
        name="CSS Animation"
        category="Animation"
        description="Compose CSS @keyframe animations with 17 prebuilt presets and full timing control"
        declarations={[{ property: 'animation', value: cleanValue }]}
        codeOverride={codeStr}
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                key={animKey}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 32px',
                  height: 68,
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(109,40,217,0.15))',
                  border: '1px solid rgba(168,85,247,0.35)',
                  borderRadius: 12,
                  fontSize: isLoop ? 30 : 20,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.4px',
                  animation: animValue,
                  animationPlayState: playState,
                  transformOrigin: preset === 'swing' ? 'top center' : 'center',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {label}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={replay}
                style={{
                  padding: '6px 20px', background: 'var(--accent-muted)',
                  border: '1px solid rgba(168,85,247,0.3)', borderRadius: 6,
                  color: 'var(--accent)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                ↺ Replay
              </button>
              <button
                onClick={() => setPlayState(s => s === 'running' ? 'paused' : 'running')}
                style={{
                  padding: '6px 20px', background: 'var(--surface-overlay)',
                  border: '1px solid var(--border-subtle)', borderRadius: 6,
                  color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}
              >
                {playState === 'running' ? '⏸ Pause' : '▶ Resume'}
              </button>
            </div>
          </div>
        }
      >
        <ButtonGroup label="Preset" options={PRESETS} value={preset} onChange={v => { setPreset(v); setAnimKey(k => k + 1); setPlayState('running') }} />
        <Slider label="Duration" min={100} max={3000} step={50} value={duration} onChange={setDuration} unit="ms" />
        <Slider label="Delay" min={0} max={1000} step={50} value={delay} onChange={setDelay} unit="ms" />
        <Slider label={iterations === 0 ? 'Iterations — infinite' : 'Iterations'} min={0} max={10} step={1} value={iterations} onChange={setIterations} />
        <ButtonGroup label="Easing" options={EASINGS} value={easing} onChange={setEasing} />
        <ButtonGroup label="Fill Mode" options={FILL_MODES} value={fillMode} onChange={setFillMode} />
        <ButtonGroup label="Direction" options={DIRECTIONS} value={direction} onChange={setDirection} />
      </ToolLayout>
    </>
  )
}
