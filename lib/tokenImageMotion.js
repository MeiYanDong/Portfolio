export const tokenProofImageSource = '/evidence/codex-profile-card.png'
export const tokenProofImageRatio = 998 / 612

/**
 * @typedef {{ left: number, top: number, width: number, height: number }} MotionRect
 * @typedef {'symmetric-spin' | 'single-spin' | 'flip-3d' | 'scale-only'} MotionVariant
 * @typedef {'open' | 'close'} MotionDirection
 */

/** @param {{ left: number, top: number, width: number, height: number }} rect */
export function rectValues(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  }
}

/** @param {{ width: number, height: number }} viewport */
export function getTokenImageTargetRect(viewport) {
  const sidePadding = viewport.width <= 620 ? 14 : 36
  const verticalPadding = viewport.width <= 620 ? 150 : 130
  const availableWidth = Math.min(998, viewport.width - sidePadding * 2)
  const availableHeight = Math.max(180, viewport.height - verticalPadding)
  const width = Math.min(availableWidth, availableHeight * tokenProofImageRatio)
  const height = width / tokenProofImageRatio

  return {
    left: (viewport.width - width) / 2,
    top: (viewport.height - height) / 2,
    width,
    height
  }
}

/**
 * @param {MotionRect} rect
 * @param {string} [transform]
 * @param {number} [opacity]
 * @param {string} [filter]
 */
function motionFrame(rect, transform = 'none', opacity = 1, filter = 'none') {
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transform,
    opacity,
    filter,
    borderRadius: rect.width < 160 ? '5px' : '8px'
  }
}

/**
 * @param {MotionVariant} variantId
 * @param {MotionDirection} direction
 * @param {MotionRect} source
 * @param {MotionRect} target
 * @param {boolean} reducedMotion
 */
export function getTokenImageMotionFrames(variantId, direction, source, target, reducedMotion) {
  const opening = direction === 'open'
  const from = opening ? source : target
  const to = opening ? target : source

  if (reducedMotion) {
    return [
      motionFrame(from, 'none', opening ? 0.55 : 1),
      motionFrame(to, 'none', opening ? 1 : 0.45)
    ]
  }

  if (variantId === 'symmetric-spin') {
    return [
      motionFrame(from, 'rotateZ(0deg)'),
      motionFrame(to, `rotateZ(${opening ? 360 : -360}deg)`)
    ]
  }

  if (variantId === 'single-spin') {
    return opening
      ? [motionFrame(from, 'rotateZ(0deg)'), motionFrame(to, 'rotateZ(360deg)')]
      : [motionFrame(from, 'rotateZ(0deg)'), motionFrame(to, 'rotateZ(0deg)', 0.72)]
  }

  if (variantId === 'flip-3d') {
    return [
      motionFrame(from, 'perspective(1200px) rotateY(0deg)'),
      motionFrame(to, `perspective(1200px) rotateY(${opening ? 360 : -360}deg)`)
    ]
  }

  return [
    motionFrame(from, 'scale(0.98)', opening ? 0.25 : 1, opening ? 'blur(5px)' : 'none'),
    motionFrame(to, 'scale(1)', opening ? 1 : 0.18, opening ? 'none' : 'blur(4px)')
  ]
}

/**
 * @param {MotionVariant} variantId
 * @param {MotionDirection} direction
 * @param {boolean} reducedMotion
 */
export function getTokenImageAnimationOptions(variantId, direction, reducedMotion) {
  if (reducedMotion) {
    return { duration: 160, easing: 'ease-out', fill: 'both' }
  }

  const opening = direction === 'open'
  const durationMap = {
    'symmetric-spin': opening ? 850 : 720,
    'single-spin': opening ? 700 : 360,
    'flip-3d': opening ? 880 : 700,
    'scale-only': opening ? 430 : 300
  }

  return {
    duration: durationMap[variantId],
    easing: opening ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'both'
  }
}
