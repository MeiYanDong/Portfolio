import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, Check, Maximize2, RotateCw, X } from 'lucide-react'
import {
  getTokenImageAnimationOptions,
  getTokenImageMotionFrames,
  getTokenImageTargetRect,
  rectValues,
  tokenProofImageSource
} from '../../../lib/tokenImageMotion'

const motionVariants = [
  {
    id: 'symmetric-spin',
    index: '01',
    title: '双向整圈',
    label: '视觉最强',
    summary: '打开时顺时针旋转一周，关闭时逆时针旋转一周，并完整返回缩略图位置。',
    timing: '打开 850ms / 关闭 720ms'
  },
  {
    id: 'single-spin',
    index: '02',
    title: '单向整圈',
    label: '推荐方案',
    summary: '打开时完成一次 360° 平面旋转，关闭时只快速缩回，保留动效记忆点但减少重复。',
    timing: '打开 700ms / 关闭 360ms'
  },
  {
    id: 'flip-3d',
    index: '03',
    title: '3D 翻转',
    label: '立体表现',
    summary: '图片绕 Y 轴翻转一周并放大，关闭时反向翻回，呈现更强的空间层次。',
    timing: '打开 880ms / 关闭 700ms'
  },
  {
    id: 'scale-only',
    index: '04',
    title: '克制缩放',
    label: '低干扰',
    summary: '不旋转，仅通过位置、尺寸、透明度和轻微模糊完成过渡，用来对照旋转是否真的必要。',
    timing: '打开 430ms / 关闭 300ms'
  }
]

function MotionSpecimen({ variant, selected, onPreview, onSelect }) {
  return (
    <article className={`motion-method${selected ? ' is-selected' : ''}`}>
      <div className="motion-method-heading">
        <span>{variant.index}</span>
        <div>
          <div className="motion-method-title">
            <h2>{variant.title}</h2>
            <small>{variant.label}</small>
          </div>
          <p>{variant.summary}</p>
        </div>
      </div>

      <div className="motion-specimen">
        <div className="motion-specimen-metric">
          <div className="motion-metric-copy">
            <strong>40B+</strong>
            <span>Token 累计使用</span>
            <small>Claude Code + Codex</small>
          </div>
          <button
            type="button"
            className="motion-proof-trigger"
            onClick={(event) => onPreview(variant, event.currentTarget)}
            aria-label={`预览${variant.title}动效`}
            title={`预览${variant.title}动效`}
          >
            <img src={tokenProofImageSource} alt="Codex 个人使用数据卡片" />
            <span aria-hidden="true">
              <Maximize2 size={14} />
            </span>
          </button>
        </div>
        <div className="motion-specimen-footer">
          <span>{variant.timing}</span>
          <button type="button" onClick={() => onSelect(variant.id)}>
            <Check size={15} />
            {selected ? '当前选择' : '选择此方案'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function TokenImageMotionLab() {
  const [selectedId, setSelectedId] = useState('flip-3d')
  const [activePreview, setActivePreview] = useState(null)
  const hasActivePreview = Boolean(activePreview)
  const lightboxImageRef = useRef(null)
  const closeButtonRef = useRef(null)
  const originButtonRef = useRef(null)
  const animationRef = useRef(null)

  const openPreview = useCallback((variant, trigger) => {
    originButtonRef.current = trigger
    setActivePreview({
      key: `${variant.id}-${Date.now()}`,
      variant,
      source: rectValues(trigger.getBoundingClientRect()),
      target: getTokenImageTargetRect({ width: window.innerWidth, height: window.innerHeight }),
      phase: 'opening'
    })
  }, [])

  const closePreview = useCallback(async () => {
    if (!activePreview || activePreview.phase === 'closing' || !lightboxImageRef.current) return

    animationRef.current?.cancel()
    setActivePreview((current) => (current ? { ...current, phase: 'closing' } : current))

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = lightboxImageRef.current.animate(
      getTokenImageMotionFrames(
        activePreview.variant.id,
        'close',
        activePreview.source,
        activePreview.target,
        reducedMotion
      ),
      getTokenImageAnimationOptions(activePreview.variant.id, 'close', reducedMotion)
    )
    animationRef.current = animation

    try {
      await animation.finished
    } catch {
      return
    }

    animation.cancel()
    animationRef.current = null
    setActivePreview(null)
    window.requestAnimationFrame(() => originButtonRef.current?.focus())
  }, [activePreview])

  useEffect(() => {
    if (!activePreview || activePreview.phase !== 'opening' || !lightboxImageRef.current)
      return undefined

    const image = lightboxImageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    image.style.visibility = 'visible'
    const animation = image.animate(
      getTokenImageMotionFrames(
        activePreview.variant.id,
        'open',
        activePreview.source,
        activePreview.target,
        reducedMotion
      ),
      getTokenImageAnimationOptions(activePreview.variant.id, 'open', reducedMotion)
    )
    animationRef.current = animation
    let cancelled = false

    animation.finished
      .then(() => {
        if (cancelled) return
        animation.cancel()
        animationRef.current = null
        setActivePreview((current) =>
          current?.key === activePreview.key ? { ...current, phase: 'open' } : current
        )
        window.requestAnimationFrame(() => closeButtonRef.current?.focus())
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [activePreview])

  useEffect(() => {
    if (!hasActivePreview) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [hasActivePreview])

  useEffect(() => {
    if (!activePreview) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePreview()
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePreview, closePreview])

  const selectedVariant = motionVariants.find((variant) => variant.id === selectedId)

  return (
    <>
      <Head>
        <title>Token 图片动效实验 - 梅炎栋</title>
        <meta name="description" content="用真实 Token 数据图片比较四种放大与旋转动效。" />
      </Head>

      <main className="motion-lab-shell">
        <nav className="motion-lab-nav">
          <Link href="/projects/lab">
            <ArrowLeft size={16} />
            返回项目布局实验
          </Link>
          <span>首页已应用：03 3D 翻转</span>
        </nav>

        <header className="motion-lab-header">
          <div>
            <p>交互动效实验</p>
            <h1>同一张真实图片，比较四种放大路径。</h1>
            <span>点击每个缩略图触发动效；选择操作只记录当前判断，不会修改首页。</span>
          </div>
          <aside>
            <RotateCw size={20} />
            <span>当前选择</span>
            <strong>{selectedVariant.title}</strong>
            <small>{selectedVariant.timing}</small>
          </aside>
        </header>

        <section className="motion-method-grid" aria-label="Token 图片动效方案">
          {motionVariants.map((variant) => (
            <MotionSpecimen
              key={variant.id}
              variant={variant}
              selected={selectedId === variant.id}
              onPreview={openPreview}
              onSelect={setSelectedId}
            />
          ))}
        </section>

        <footer className="motion-lab-note">
          <strong>对比边界</strong>
          <p>
            四套方案使用相同图片、起点、中央尺寸、遮罩和关闭逻辑，差异只来自旋转方式与时间曲线。
          </p>
          <small>图片是历史截图：图内记录 306亿，首页当前累计数据为 40B+。</small>
        </footer>
      </main>

      {activePreview && (
        <div
          className={`motion-lightbox${activePreview.phase === 'closing' ? ' is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${activePreview.variant.title}动效预览`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePreview()
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="motion-lightbox-close"
            onClick={closePreview}
            aria-label="关闭动效预览"
            title="关闭动效预览"
          >
            <X size={20} />
          </button>
          <img
            ref={lightboxImageRef}
            className="motion-lightbox-image"
            src={tokenProofImageSource}
            alt="Codex 个人使用数据卡片放大预览"
            style={{
              left: `${activePreview.target.left}px`,
              top: `${activePreview.target.top}px`,
              width: `${activePreview.target.width}px`,
              height: `${activePreview.target.height}px`
            }}
          />
          <div className="motion-lightbox-caption">
            <strong>{activePreview.variant.title}</strong>
            <span>{activePreview.variant.timing}</span>
            <small>历史截图 306亿 · 首页当前累计 40B+</small>
          </div>
        </div>
      )}

      <style jsx global>{`
        .motion-lab-shell {
          width: min(1380px, calc(100% - 3rem));
          margin: 0 auto;
          color: var(--text-primary);
        }

        .motion-lab-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 0 1.5rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .motion-lab-nav a {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: inherit;
        }

        .motion-lab-nav a:hover {
          color: var(--accent-purple);
        }

        .motion-lab-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 260px;
          gap: 4rem;
          align-items: end;
          padding: 3.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .motion-lab-header p {
          margin: 0 0 0.65rem;
          color: var(--accent-purple);
          font-size: 0.76rem;
          font-weight: 800;
        }

        .motion-lab-header h1 {
          max-width: 820px;
          margin: 0;
          font-size: 2.7rem;
          line-height: 1.12;
        }

        .motion-lab-header > div > span {
          display: block;
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 0.86rem;
        }

        .motion-lab-header aside {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.3rem 0.65rem;
          align-items: center;
          padding-left: 1.25rem;
          border-left: 1px solid var(--border-color);
        }

        .motion-lab-header aside svg {
          grid-row: 1 / 4;
          color: var(--accent-purple);
        }

        .motion-lab-header aside span,
        .motion-lab-header aside small {
          color: var(--text-secondary);
          font-size: 0.7rem;
        }

        .motion-lab-header aside strong {
          font-size: 1.08rem;
        }

        .motion-method-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-left: 1px solid var(--border-color);
        }

        .motion-method {
          display: flex;
          min-width: 0;
          min-height: 420px;
          flex-direction: column;
          padding: 2rem;
          border-right: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.008);
        }

        .motion-method.is-selected {
          background: rgba(179, 157, 219, 0.04);
          box-shadow: inset 0 2px 0 var(--accent-purple);
        }

        .motion-method-heading {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 1rem;
        }

        .motion-method-heading > span {
          color: var(--accent-purple);
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.2;
        }

        .motion-method-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .motion-method-title h2 {
          margin: 0;
          font-size: 1.35rem;
        }

        .motion-method-title small {
          color: var(--accent-purple);
          font-size: 0.68rem;
          font-weight: 800;
        }

        .motion-method-heading p {
          max-width: 560px;
          margin: 0.65rem 0 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.75;
        }

        .motion-specimen {
          margin-top: auto;
          border: 1px solid var(--border-color);
          background: #0c0c0c;
        }

        .motion-specimen-metric {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 128px;
          gap: 0.75rem;
          align-items: center;
          min-height: 124px;
          padding: 1.35rem 1.25rem;
        }

        .motion-metric-copy {
          display: grid;
          min-width: 0;
        }

        .motion-metric-copy strong {
          font-size: 2rem;
          line-height: 1;
        }

        .motion-metric-copy span {
          margin-top: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .motion-metric-copy small {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .motion-proof-trigger {
          position: relative;
          display: block;
          width: 128px;
          height: 78px;
          overflow: hidden;
          justify-self: end;
          border: 0;
          border-radius: 5px;
          padding: 0;
          background: #fff;
          cursor: zoom-in;
        }

        .motion-proof-trigger:focus-visible {
          outline: 2px solid var(--accent-purple);
          outline-offset: 3px;
        }

        .motion-proof-trigger img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: filter 0.2s ease;
        }

        .motion-proof-trigger > span {
          position: absolute;
          right: 4px;
          bottom: 4px;
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border: 1px solid rgba(0, 0, 0, 0.18);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          color: #111;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .motion-proof-trigger:hover img {
          filter: contrast(0.9);
        }

        .motion-proof-trigger:hover > span,
        .motion-proof-trigger:focus-visible > span {
          opacity: 1;
        }

        .motion-specimen-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: 54px;
          padding: 0.7rem 1rem;
          border-top: 1px solid var(--border-color);
        }

        .motion-specimen-footer > span {
          color: var(--text-secondary);
          font-size: 0.7rem;
        }

        .motion-specimen-footer button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 0;
          padding: 0.35rem 0;
          background: transparent;
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        .motion-lab-note {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr) auto;
          gap: 1.5rem;
          align-items: center;
          padding: 1.5rem 0;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .motion-lab-note strong {
          color: var(--text-primary);
        }

        .motion-lab-note p {
          max-width: 760px;
          margin: 0;
        }

        .motion-lab-note small {
          text-align: right;
        }

        .motion-lightbox {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.86);
          backdrop-filter: blur(8px);
          animation: motion-backdrop-in 180ms ease-out both;
        }

        .motion-lightbox.is-closing {
          pointer-events: none;
          animation: motion-backdrop-out 360ms ease-in both;
        }

        .motion-lightbox-image {
          position: fixed;
          z-index: 2;
          visibility: hidden;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 8px;
          background: #fff;
          object-fit: contain;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
          transform-style: preserve-3d;
          will-change: left, top, width, height, transform, opacity, filter;
        }

        .motion-lightbox-close {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 4;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 50%;
          padding: 0;
          background: rgba(10, 10, 10, 0.72);
          color: #fff;
          cursor: pointer;
        }

        .motion-lightbox-close:focus-visible {
          outline: 2px solid var(--accent-purple);
          outline-offset: 3px;
        }

        .motion-lightbox-caption {
          position: fixed;
          bottom: 24px;
          left: 50%;
          z-index: 3;
          display: flex;
          align-items: baseline;
          gap: 0.85rem;
          width: min(900px, calc(100% - 3rem));
          transform: translateX(-50%);
          color: #fff;
          font-size: 0.78rem;
        }

        .motion-lightbox-caption span,
        .motion-lightbox-caption small {
          color: rgba(255, 255, 255, 0.68);
        }

        .motion-lightbox-caption small {
          margin-left: auto;
        }

        @keyframes motion-backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes motion-backdrop-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @media (max-width: 820px) {
          .motion-lab-header {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .motion-lab-header aside {
            max-width: 300px;
          }

          .motion-method-grid {
            grid-template-columns: 1fr;
          }

          .motion-lab-note {
            grid-template-columns: 1fr;
            gap: 0.45rem;
          }

          .motion-lab-note small {
            text-align: left;
          }
        }

        @media (max-width: 620px) {
          .motion-lab-shell {
            width: min(100% - 2rem, 1380px);
          }

          .motion-lab-header {
            padding: 2.5rem 0;
          }

          .motion-lab-header h1 {
            font-size: 2rem;
          }

          .motion-method {
            min-height: 390px;
            padding: 1.25rem;
          }

          .motion-method-heading {
            grid-template-columns: 32px minmax(0, 1fr);
            gap: 0.75rem;
          }

          .motion-method-title {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.25rem;
          }

          .motion-specimen-metric {
            position: relative;
            grid-template-columns: minmax(0, 1fr);
          }

          .motion-proof-trigger {
            position: absolute;
            top: 1.35rem;
            right: 1.25rem;
            width: 56px;
            height: 34px;
          }

          .motion-proof-trigger > span {
            display: none;
          }

          .motion-specimen-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.35rem;
          }

          .motion-lightbox-close {
            top: 14px;
            right: 14px;
          }

          .motion-lightbox-caption {
            bottom: 18px;
            align-items: flex-start;
            flex-direction: column;
            gap: 0.2rem;
            width: calc(100% - 2rem);
          }

          .motion-lightbox-caption small {
            margin-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-proof-trigger img,
          .motion-proof-trigger > span,
          .motion-lightbox,
          .motion-lightbox.is-closing {
            transition: none;
            animation-duration: 1ms;
          }
        }
      `}</style>
    </>
  )
}
