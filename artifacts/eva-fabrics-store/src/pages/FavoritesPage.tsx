import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'wouter'
import type { Category, Product, ProductColor } from '@/types'
import { ProductCard } from '@/components/ProductCard'
import { GlassStyles } from '@/pages/InfoPages'

interface FavoritesPageProps {
  products: Product[]
  categories: Category[]
  wishlist: string[]
  onWish: (slug: string) => void
  onAdd: (product: Product, color: ProductColor, quantity: number) => void
}

const favoriteCountLabel = (count: number): string => {
  if (count === 1) return 'جهاز واحد بانتظارك'
  if (count === 2) return 'جهازان بانتظارك'
  if (count <= 10) return `${count} أجهزة بانتظارك`
  return `${count} جهازاً بانتظارك`
}

const fallbackSuggestions = [
  { id: 'tvs', label: 'التلفزيونات' },
  { id: 'ac', label: 'المكيفات' },
  { id: 'wash', label: 'الغسالات' },
  { id: 'fridge', label: 'الثلاجات' },
  { id: 'kitchen', label: 'أجهزة المطبخ' },
]

export function FavoritesPage({ products, categories, wishlist, onWish, onAdd }: FavoritesPageProps) {
  const favoriteProducts = products.filter((product) => wishlist.includes(product.slug))
  const suggestedCategories = categories.length > 0
    ? categories.slice(0, 5).map((category) => ({ id: category.id, label: category.name }))
    : fallbackSuggestions

  if (favoriteProducts.length === 0) {
    return (
      <>
        <GlassStyles />
        <main className="container-eva favorites-page">
          <div className="breadcrumbs"><Link href="/">الرئيسية</Link><span>›</span><span>المفضلة</span></div>
          <section className="glass empty-glass" role="status">
            <div className="empty-icon"><Heart size={25} /></div>
            <h1>لم تحفظي أجهزة بعد</h1>
            <p>اضغطي على القلب في أي جهاز لتظهر هنا، ثم أضيفيه إلى السلة بضغطة واحدة.</p>
            <div className="empty-actions">
              <Link href="/catalog" className="button button-primary">اكتشفي المنتجات <ArrowLeft size={16} /></Link>
              <Link href="/fabric-guide" className="button button-outline">دليل اختيار الجهاز <ArrowLeft size={16} /></Link>
            </div>
            <div className="local-orders">
              <span>أقسام مقترحة:</span>
              {suggestedCategories.map((category) => (
                <Link key={category.id} href={`/catalog?category=${encodeURIComponent(category.id)}`} className="chip">{category.label}</Link>
              ))}
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <GlassStyles />
      <main className="container-eva favorites-page">
        <div className="breadcrumbs"><Link href="/">الرئيسية</Link><span>›</span><span>المفضلة</span></div>
        <div className="page-title-row">
          <div>
            <span className="eyebrow">اختياراتك المحفوظة</span>
            <h1>المفضلة</h1>
            <p>{favoriteCountLabel(favoriteProducts.length)}</p>
          </div>
          <Link href="/catalog" className="underlined-link">متابعة التسوق <ArrowLeft size={15} /></Link>
        </div>

        <div className="product-grid favorites-grid">
          {favoriteProducts.map((product) => (
            <div className="glass-card favorite-tile" key={product.id}>
              <ProductCard product={product} wished onWish={onWish} onAdd={onAdd} />
              <div className="favorite-tile-actions">
                <button type="button" className="chip" onClick={() => onWish(product.slug)} aria-label={`إزالة ${product.name} من المفضلة`}>
                  <Heart size={13} />إزالة
                </button>
                <Link href={`/product/${product.slug}`} className="underlined-link">تفاصيل المنتج <ArrowLeft size={14} /></Link>
              </div>
            </div>
          ))}
        </div>

        <div className="favorites-note"><ShoppingBag size={18} /><span>اضغطي «أضيفي للسلة» على أي بطاقة لإضافتها مباشرة، أو القلب لإزالتها من هنا.</span></div>
      </main>
    </>
  )
}
