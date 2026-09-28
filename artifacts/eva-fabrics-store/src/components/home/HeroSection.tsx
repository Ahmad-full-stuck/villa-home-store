import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'wouter'
import { SmartImage } from '@/components/ui/SmartImage'

const slides = [
  { src: 'products/tv-gallery-1.webp', alt: 'ركن معيشة بشاشة تلفزيون عريضة' },
  { src: 'products/kitchen-gallery-1.webp', alt: 'مطبخ منظم بأجهزة منزلية حديثة' },
  { src: 'products/ac-gallery-2.webp', alt: 'مكيف جداري داخل غرفة مرتبة' },
  { src: 'products/wash-gallery-1.webp', alt: 'غسالة أوتوماتيك في غرفة غسيل' },
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
          <span className="eyebrow"><Sparkles size={14} />أجهزة منزلية مختارة</span>
          <h1>اختاري <span>جهازك المناسب</span><br />لبيتك</h1>
          <p>تشكيلة منتقاة من الأجهزة المنزلية مع مواصفات واضحة وصور صادقة، لتأخذ قرارك قبل أن تطلب.</p>
          <div className="hero-actions">
            <Link href="/catalog" className="button button-primary">تصفحي المنتجات <ArrowLeft size={16} /></Link>
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
          <div className="hero-vertical-label" aria-hidden="true">VILLA · HOME</div>
        </div>
      </section>
    </>
  )
}
