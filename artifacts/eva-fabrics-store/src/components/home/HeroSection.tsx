import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'wouter'
import { SmartImage } from '@/components/ui/SmartImage'

const slides = [
  { src: 'fabrics/hero.jpg', alt: 'نماذج من أقمشة إيفا ستور' },
  { src: 'fabrics/rose.jpg', alt: 'قماش مطرز بلون وردي من تشكيلة إيفا' },
  { src: 'fabrics/blue.jpg', alt: 'قماش أزرق ناعم من تشكيلة إيفا' },
  { src: 'fabrics/emerald.jpg', alt: 'قماش أخضر مرن من تشكيلة إيفا' },
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const timerRef = useRef<number | undefined>(undefined)

  const restart = () => {
    window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 4200)
  }

  const goSlide = (step: number) => {
    setActiveSlide((current) => (current + step + slides.length) % slides.length)
    restart()
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return undefined
    restart()
    const onVisibility = () => {
      if (document.hidden) window.clearInterval(timerRef.current)
      else restart()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <>
      <section className="home-hero glass-hero container-eva">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} />معرض أقمشة عربي</span>
          <h1>اختاري <span>القماش المثالي</span><br />لكل إبداع</h1>
          <p>تشكيلة منتقاة من الأقمشة الفاخرة والمريحة، مع شرح واضح للخامة قبل أن تضيفيها إلى مشروعك.</p>
          <div className="hero-actions">
            <Link href="/catalog" className="button button-primary">تصفحي الأقمشة <ArrowLeft size={16} /></Link>
            <Link href="/catalog?sort=newest" className="button button-outline">اكتشفي الجديد <ArrowRight size={16} /></Link>
          </div>
          <div className="hero-note"><span className="note-dot" />توصيل إلى جميع محافظات العراق <span className="note-divider" /><span className="note-alt">دفع عند استلام الطلب</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-slides" aria-live="off">
            {slides.map((slide, index) => (
              <div className={`hero-slide ${index === activeSlide ? 'is-active' : ''}`} key={slide.src} aria-hidden={index !== activeSlide}>
                {index === activeSlide || index === (activeSlide + 1) % slides.length
                  ? <SmartImage src={slide.src} alt={slide.alt} sizes="(max-width: 820px) 92vw, 52vw" priority={index === 0} />
                  : null}
              </div>
            ))}
          </div>
          <div className="hero-visual-overlay" />
          {slides.length > 1 && <>
            <button type="button" className="hero-arrow hero-next" onClick={() => goSlide(1)} aria-label="الصورة التالية"><ChevronLeft size={18} /></button>
            <button type="button" className="hero-arrow hero-prev" onClick={() => goSlide(-1)} aria-label="الصورة السابقة"><ChevronRight size={18} /></button>
            <div className="hero-dots" role="tablist" aria-label="صور الغلاف">
              {slides.map((slide, index) => <button key={slide.src} type="button" role="tab" aria-selected={index === activeSlide} aria-label={slide.alt} className={index === activeSlide ? 'is-active' : ''} onClick={() => { setActiveSlide(index); restart() }} />)}
            </div>
          </>}
          <div className="hero-vertical-label" aria-hidden="true">EVA · FABRICS</div>
        </div>
      </section>
    </>
  )
}
