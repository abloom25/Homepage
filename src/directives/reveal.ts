import type { Directive, DirectiveBinding } from 'vue'

interface RevealOptions {
  delay?: number
  once?: boolean
  threshold?: number
  variant?: 'default' | 'soft' | 'mask' | 'clip'
}

type RevealValue = RevealOptions | string | undefined

const observers = new WeakMap<Element, IntersectionObserver>()

function resolve(value: RevealValue) {
  if (!value || typeof value === 'string') {
    return { delay: 0, once: true, threshold: 0.15, variant: 'default' as const }
  }
  return {
    delay: value.delay ?? 0,
    once: value.once ?? true,
    threshold: value.threshold ?? 0.15,
    variant: value.variant ?? ('default' as const),
  }
}

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealValue>) {
    const opts = resolve(binding.value)
    const base =
      opts.variant === 'soft'
        ? 'reveal reveal--soft'
        : opts.variant === 'mask'
          ? 'reveal reveal--mask'
          : opts.variant === 'clip'
            ? 'reveal reveal--clip'
            : 'reveal'
    el.classList.add(...base.split(' '))
    if (opts.delay) {
      el.style.transitionDelay = `${opts.delay}ms`
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            if (opts.once) {
              io.unobserve(el)
            }
          } else if (!opts.once) {
            el.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: opts.threshold,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    io.observe(el)
    observers.set(el, io)
  },
  unmounted(el: HTMLElement) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
