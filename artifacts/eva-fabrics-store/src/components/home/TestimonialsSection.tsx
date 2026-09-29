import { Star } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

interface Testimonial {
  name: string
  city: string
  context: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'مروة الجبوري',
    city: 'بغداد',
    context: 'تلفزيون سامسونج 55',
    rating: 5,
    text: 'طلبت تلفزيون سامسونج 55 بوصة، الصور والمواصفات في الموقع كانت واضحة ومطابقة للواقع. وصلني الطلب خلال يومين إلى بغداد.',
  },
  {
    name: 'سارة عبد الله',
    city: 'البصرة',
    context: 'مكيف سبليت',
    rating: 5,
    text: 'المكيف وصل مغلفاً جيداً وتم التركيب بسرعة. شرحوا لي استهلاك الطاقة وطول الضمان قبل أن أؤكد الطلب.',
  },
  {
    name: 'نور الهدى كريم',
    city: 'أربيل',
    context: 'غسالة أوتوماتيك',
    rating: 4,
    text: 'الغسالة تعمل بهدوء والاستهلاك أقل مما توقعت. نصحوني بغسالة بسعة تناسب عائلتي وكانت النصيحة صحيحة.',
  },
  {
    name: 'ضياء فاضل',
    city: 'النجف',
    context: 'ثلاجة نوفروست',
    rating: 5,
    text: 'الثلاجة وصلت بحالة ممتازة والدفع عند الاستلام سهّل عليّ فحص الجهاز قبل إتمام المبلغ كاملاً.',
  },
  {
    name: 'آيات حسن',
    city: 'كربلاء',
    context: 'خلاط كهربائي',
    rating: 5,
    text: 'الخلاط قوي وعملي، والكمية كانت متوفرة فور الطلب. أعجبني أن الصور تُظهر الجهاز من كل الزوايا.',
  },
  {
    name: 'رفل مهدي',
    city: 'نينوى',
    context: 'مروحة سقف',
    rating: 5,
    text: 'المروحة هادئة وقوية، وصلني مع فاتورة واضحة وشرح لطريقة التركيب دون أي تعقيد.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="container-eva section-soft" aria-label="آراء العملاء" style={{ marginBlock: 'clamp(16px, 3vw, 32px)' }}>
      <SectionHeading eyebrow="آراء العملاء" title="عملاء فيلا هوم يتحدثون" description="تجارب حقيقية مع الجهاز والخدمة والطلب" linkLabel="تواصلي معنا" linkHref="/contact" />
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card glass-card" key={testimonial.name}>
            <div className="stars" role="img" aria-label={`تقييم ${testimonial.rating} من 5`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={14} style={index < testimonial.rating ? undefined : { fill: 'none' }} />
              ))}
            </div>
            <p>{testimonial.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <strong style={{ display: 'block', fontSize: 13.5 }}>{testimonial.name}</strong>
                <span style={{ color: 'var(--vh-muted)', fontSize: 11.5 }}>{testimonial.city}</span>
              </div>
              <span className="chip" style={{ display: 'inline-flex' }}>{testimonial.context}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
