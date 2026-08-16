import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, X } from 'lucide-react'
import {
  getTokenImageAnimationOptions,
  getTokenImageMotionFrames,
  getTokenImageTargetRect,
  rectValues,
  tokenProofImageSource
} from '../lib/tokenImageMotion'

export default function TokenProofPreview() {
  const [preview, setPreview] = useState(null)
  const hasPreview = Boolean(preview)
  const triggerRef = useRef(null)
  const imageRef = useRef(null)
  const closeButtonRef = useRef(null)
  const animationRef = useRef(null)

  const openPreview = useCallback(() => {
    if (!triggerRef.current) return

    setPreview({
      key: Date.now(),
      source: rectValues(triggerRef.current.getBoundingClientRect()),
      target: getTokenImageTargetRect({ width: window.innerWidth, height: window.innerHeight }),
      phase: 'opening'
    })
  }, [])

  const closePreview = useCallback(async () => {
    if (!preview || preview.phase === 'closing' || !imageRef.current) return

    animationRef.current?.cancel()
    setPreview((current) => (current ? { ...current, phase: 'closing' } : current))

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = imageRef.current.animate(
      getTokenImageMotionFrames('flip-3d', 'close', preview.source, preview.target, reducedMotion),
      getTokenImageAnimationOptions('flip-3d', 'close', reducedMotion)
    )
    animationRef.current = animation

    try {
      await animation.finished
    } catch {
      return
    }

    if (animationRef.current !== animation) return
    animation.cancel()
    animationRef.current = null
    setPreview(null)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }, [preview])

  useEffect(() => {
    if (!preview || preview.phase !== 'opening' || !imageRef.current) return undefined

    const image = imageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    image.style.visibility = 'visible'
    const animation = image.animate(
      getTokenImageMotionFrames('flip-3d', 'open', preview.source, preview.target, reducedMotion),
      getTokenImageAnimationOptions('flip-3d', 'open', reducedMotion)
    )
    animationRef.current = animation
    let cancelled = false

    animation.finished
      .then(() => {
        if (cancelled || animationRef.current !== animation) return
        animation.cancel()
        animationRef.current = null
        setPreview((current) =>
          current?.key === preview.key ? { ...current, phase: 'open' } : current
        )
        window.requestAnimationFrame(() => closeButtonRef.current?.focus())
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [preview])

  useEffect(() => {
    if (!hasPreview) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [hasPreview])

  useEffect(() => {
    if (!preview) return undefined

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
  }, [preview, closePreview])

  useEffect(() => () => animationRef.current?.cancel(), [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="home-token-proof"
        onClick={openPreview}
        aria-label="放大查看 Codex 个人使用数据卡片"
        title="放大查看数据卡片"
      >
        <img src={tokenProofImageSource} alt="Codex 个人使用数据卡片" draggable="false" />
        <span className="home-token-proof-indicator" aria-hidden="true">
          <Maximize2 size={13} />
        </span>
      </button>

      {preview &&
        createPortal(
          <div
            className={`token-proof-lightbox${preview.phase === 'closing' ? ' is-closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Codex 个人使用数据卡片预览"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePreview()
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="token-proof-lightbox-close"
              onClick={closePreview}
              aria-label="关闭图片预览"
              title="关闭图片预览"
            >
              <X size={20} />
            </button>
            <img
              ref={imageRef}
              className="token-proof-lightbox-image"
              src={tokenProofImageSource}
              alt="Codex 个人使用数据卡片放大预览"
              draggable="false"
              style={{
                left: `${preview.target.left}px`,
                top: `${preview.target.top}px`,
                width: `${preview.target.width}px`,
                height: `${preview.target.height}px`
              }}
            />
            <div className="token-proof-lightbox-caption">
              <strong>Codex 使用记录</strong>
              <span>历史截图 306亿</span>
              <small>首页当前累计 40B+</small>
            </div>
          </div>,
          document.body
        )}

      <style jsx global>{`
        .token-proof-lightbox {
          position: fixed;
          inset: 0;
          z-index: 2200;
          background: rgba(0, 0, 0, 0.86);
          backdrop-filter: blur(8px);
          animation: token-proof-backdrop-in 180ms ease-out both;
        }

        .token-proof-lightbox.is-closing {
          pointer-events: none;
          animation: token-proof-backdrop-out 700ms ease-in both;
        }

        .token-proof-lightbox-image {
          position: fixed;
          z-index: 2;
          visibility: hidden;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 8px;
          background: #fff;
          object-fit: contain;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
          transform-style: preserve-3d;
          will-change: left, top, width, height, transform, opacity;
        }

        .token-proof-lightbox-close {
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

        .token-proof-lightbox-close:focus-visible {
          outline: 2px solid var(--accent-purple);
          outline-offset: 3px;
        }

        .token-proof-lightbox-caption {
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

        .token-proof-lightbox-caption span,
        .token-proof-lightbox-caption small {
          margin: 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: inherit;
          font-weight: 400;
        }

        .token-proof-lightbox-caption small {
          margin-left: auto;
        }

        @keyframes token-proof-backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes token-proof-backdrop-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @media (max-width: 620px) {
          .token-proof-lightbox-close {
            top: 14px;
            right: 14px;
          }

          .token-proof-lightbox-caption {
            bottom: 18px;
            align-items: flex-start;
            flex-direction: column;
            gap: 0.2rem;
            width: calc(100% - 2rem);
          }

          .token-proof-lightbox-caption small {
            margin-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .token-proof-lightbox,
          .token-proof-lightbox.is-closing {
            animation-duration: 1ms;
          }
        }
      `}</style>
    </>
  )
}
