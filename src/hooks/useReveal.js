import { useEffect, useRef, useState } from 'react'

export const useReveal = (options = {}) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    if (options.once !== false) observer.unobserve(node)
                } else if (options.once === false) {
                    setVisible(false)
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [options.once, options.rootMargin, options.threshold])

    return [ref, visible]
}

export const useCountUp = (target, duration = 1600, trigger = false) => {
    const [value, setValue] = useState(0)
    const started = useRef(false)

    useEffect(() => {
        if (!trigger || started.current) return
        started.current = true

        const start = performance.now()
        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setValue(Math.round(easeOutExpo(progress) * target))
            if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }, [trigger, target, duration])

    return value
}