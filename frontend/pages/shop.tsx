"use client"

import type React from "react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
  colors?: string[]
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Áo Thun Premium Cotton",
    price: 299000,
    originalPrice: 399000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Áo Nam",
    rating: 4.5,
    reviews: 128,
    isSale: true,
    colors: ["#000000", "#FFFFFF", "#808080"],
  },
  {
    id: 2,
    name: "Quần Jeans Skinny Fit",
    price: 599000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Quần Nữ",
    rating: 4.8,
    reviews: 89,
    isNew: true,
    colors: ["#1e3a8a", "#000000", "#6b7280"],
  },
  {
    id: 3,
    name: "Giày Sneaker Lifestyle",
    price: 899000,
    originalPrice: 1199000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Giày",
    rating: 4.6,
    reviews: 234,
    isSale: true,
    colors: ["#FFFFFF", "#000000", "#ef4444"],
  },
  {
    id: 4,
    name: "Túi Xách Da Thật",
    price: 1299000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Phụ Kiện",
    rating: 4.9,
    reviews: 67,
    isNew: true,
    colors: ["#8b4513", "#000000", "#d4d4d4"],
  },
  {
    id: 5,
    name: "Hoodie Oversized",
    price: 499000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Áo Nam",
    rating: 4.4,
    reviews: 156,
    colors: ["#808080", "#000000", "#FFFFFF"],
  },
  {
    id: 6,
    name: "Váy Midi Elegant",
    price: 699000,
    originalPrice: 899000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Váy",
    rating: 4.7,
    reviews: 92,
    isSale: true,
    colors: ["#000000", "#dc2626", "#1e40af"],
  },
  {
    id: 7,
    name: "Blazer Công Sở",
    price: 899000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Áo Nữ",
    rating: 4.6,
    reviews: 75,
    colors: ["#000000", "#374151", "#1f2937"],
  },
  {
    id: 8,
    name: "Giày Cao Gót Classic",
    price: 799000,
    originalPrice: 999000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Giày",
    rating: 4.3,
    reviews: 112,
    isSale: true,
    colors: ["#000000", "#dc2626", "#d4d4d4"],
  },
  {
    id: 9,
    name: "Áo Sơ Mi Linen",
    price: 399000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Áo Nam",
    rating: 4.5,
    reviews: 98,
    colors: ["#FFFFFF", "#f3f4f6", "#e5e7eb"],
  },
]

const categories = ["Tất cả", "Áo Nam", "Áo Nữ", "Quần Nữ", "Giày", "Phụ Kiện", "Váy"]

export default function FashionApp() {
  const [currentPage, setCurrentPage] = useState<"shop" | "cart">("shop")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [email, setEmail] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.")
    setCart([])
    setCurrentPage("shop")
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert("Cảm ơn bạn đã đăng ký nhận tin!")
      setEmail("")
    }
  }

  const filteredProducts = products
    .filter((product) => selectedCategory === "Tất cả" || product.category === selectedCategory)
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const renderShopPage = () => (
    <div style={styles.fashionShop}>
      {/* Hero Banner */}
      <section style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Bộ Sưu Tập Mới</h2>
          <p style={styles.heroText}>Khám phá xu hướng thời trang mới nhất</p>
          <button
            style={styles.heroBtn}
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          >
            Khám phá ngay
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main style={styles.mainContent} id="products">
        <div style={styles.container}>
          {/* Filters */}
          <div style={styles.filtersSection}>
            <div style={styles.categoriesFilter}>
              {categories.map((category) => (
                <button
                  key={category}
                  style={{
                    ...styles.categoryBtn,
                    ...(selectedCategory === category ? styles.categoryBtnActive : {}),
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div style={styles.sortFilter}>
              <i className="fas fa-filter" style={styles.filterIcon}></i>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.sortSelect}>
                <option value="default">Sắp xếp</option>
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productImageContainer}>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} style={styles.productImage} />

                  {/* Badges */}
                  <div style={styles.productBadges}>
                    {product.isNew && <span style={{ ...styles.badge, ...styles.badgeNew }}>Mới</span>}
                    {product.isSale && (
                      <span style={{ ...styles.badge, ...styles.badgeSale }}>
                        -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button
                    style={{
                      ...styles.wishlistBtn,
                      ...(wishlist.includes(product.id) ? styles.wishlistBtnActive : {}),
                    }}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    {wishlist.includes(product.id) ? (
                      <i className="fas fa-heart"></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>

                  {/* Quick Actions */}
                  <div style={styles.productActions}>
                    <button style={styles.quickViewBtn} onClick={() => alert(`Xem chi tiết: ${product.name}`)}>
                      Xem nhanh
                    </button>
                    <button style={styles.addToCartBtn} onClick={() => addToCart(product)}>
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>

                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>

                  {/* Colors */}
                  {product.colors && (
                    <div style={styles.productColors}>
                      {product.colors.map((color, index) => (
                        <span key={index} style={{ ...styles.colorDot, backgroundColor: color }}></span>
                      ))}
                    </div>
                  )}

                  {/* Rating */}
                  <div style={styles.productRating}>
                    <div style={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="fas fa-star"
                          style={i < Math.floor(product.rating) ? styles.starFilled : styles.star}
                        ></i>
                      ))}
                    </div>
                    <span style={styles.reviews}>({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div style={styles.productPrice}>
                    <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span style={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={styles.noProducts}>
              <i className="fas fa-search" style={{ fontSize: "48px", marginBottom: "1rem" }}></i>
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>
      </main>

      {/* Newsletter */}

    </div>
  )

  const renderCartPage = () => (
    <div style={styles.cartPage}>
      <div style={styles.container}>


        {cart.length === 0 ? (
          <div style={styles.emptyCart}>
            <i className="fas fa-shopping-cart" style={{ fontSize: "64px", color: "#ccc", marginBottom: "1rem" }}></i>
            <h3>Giỏ hàng trống</h3>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <button style={styles.shopNowBtn} onClick={() => setCurrentPage("shop")}>
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div style={styles.cartContent}>
            <div style={styles.cartItems}>
              <h3>Sản phẩm ({getTotalItems()} sản phẩm)</h3>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItemLarge}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} style={styles.cartItemImageLarge} />
                  <div style={styles.cartItemInfo}>
                    <h4 style={styles.cartItemNameLarge}>{item.name}</h4>
                    <p style={styles.cartItemCategory}>Danh mục: {item.category}</p>
                    <div style={styles.cartItemPriceSection}>
                      <span style={styles.cartItemPriceLarge}>{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span style={styles.cartItemOriginalPrice}>{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                  <div style={styles.cartItemActions}>
                    <div style={styles.quantityControlsLarge}>
                      <button
                        style={styles.quantityBtnLarge}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span style={styles.quantityTextLarge}>{item.quantity}</span>
                      <button
                        style={styles.quantityBtnLarge}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div style={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</div>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.checkoutSection}>
              <div style={styles.orderSummary}>
                <h3>Tóm tắt đơn hàng</h3>
                <div style={styles.summaryRow}>
                  <span>Tạm tính:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Giảm giá:</span>
                  <span>0₫</span>
                </div>
                <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <div style={styles.customerForm}>
                <h3>Thông tin giao hàng</h3>
                <div style={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    style={styles.formInput}
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <input
                    type="email"
                    placeholder="Email"
                    style={styles.formInput}
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    style={styles.formInput}
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <textarea
                    placeholder="Địa chỉ giao hàng"
                    style={{ ...styles.formInput, height: "80px", resize: "vertical" as const }}
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    required
                  />
                </div>
                <button
                  style={styles.checkoutBtn}
                  onClick={() => {
                    if (customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address) {
                      handleCheckout()
                    } else {
                      alert("Vui lòng điền đầy đủ thông tin giao hàng")
                    }
                  }}
                >
                  <i className="fas fa-credit-card"></i> Đặt hàng ({formatPrice(getTotalPrice())})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

 
 



      {/* Page Content */}
      {currentPage === "shop" && renderShopPage()}
      {currentPage === "cart" && renderCartPage()}

      {/* Floating Cart Button */}
      <div style={styles.floatingCart} onClick={() => setCurrentPage("cart")}>
        <i className="fas fa-shopping-cart" style={styles.floatingCartIcon}></i>
        {getTotalItems() > 0 && <span style={styles.floatingCartBadge}>{getTotalItems()}</span>}
      </div>
    </>
  )
}

const styles = {
  fashionShop: {
    minHeight: "100vh",
    fontFamily: '"Inter", sans-serif',
    lineHeight: 1.6,
    color: "#333",
    backgroundColor: "#fff",
  },
  headerMain: {
    background: "#fff",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0",
    gap: "2rem",
  },
  logo: {},
  logoText: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#000",
    letterSpacing: "-0.5px",
    margin: 0,
  },
  logoAccent: {
    color: "#e11d48",
  },
  searchBoxDesktop: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    background: "#f8f9fa",
    borderRadius: "25px",
    padding: "0.5rem 1rem",
    minWidth: "300px",
  },
  searchBox: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    background: "#f8f9fa",
    borderRadius: "25px",
    padding: "0.5rem 1rem",
    width: "100%",
  },
  searchIcon: {
    color: "#6c757d",
    marginRight: "0.5rem",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    flex: 1,
    fontSize: "0.9rem",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  actionBtn: {
    background: "none",
    border: "none",
    padding: "0.75rem",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative" as const,
    color: "#333",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    background: "#e11d48",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "0.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
  },
  mobileSearch: {
    background: "#fff",
    borderBottom: "1px solid #e9ecef",
    padding: "1rem 0",
  },
  heroBanner: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "4rem 0",
    textAlign: "center" as const,
    marginBottom: "3rem",
  },
  heroContent: {},
  heroTitle: {
    fontSize: "3rem",
    fontWeight: 700,
    marginBottom: "1rem",
    letterSpacing: "-1px",
  },
  heroText: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    opacity: 0.9,
  },
  heroBtn: {
    background: "#fff",
    color: "#333",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "50px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  mainContent: {
    padding: "2rem 0",
  },
  filtersSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
    flexWrap: "wrap" as const,
    gap: "1rem",
  },
  categoriesFilter: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
  },
  categoryBtn: {
    background: "#f8f9fa",
    border: "2px solid transparent",
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.3s ease",
    color: "#333",
  },
  categoryBtnActive: {
    background: "#000",
    color: "white",
  },
  sortFilter: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  filterIcon: {
    color: "#6c757d",
  },
  sortSelect: {
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    padding: "0.5rem 1rem",
    background: "white",
    cursor: "pointer",
    outline: "none",
    fontWeight: 500,
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  productCard: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  productImageContainer: {
    position: "relative" as const,
    overflow: "hidden",
    aspectRatio: "3 / 4",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "transform 0.5s ease",
  },
  productBadges: {
    position: "absolute" as const,
    top: "1rem",
    left: "1rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  badgeNew: {
    background: "#10b981",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  badgeSale: {
    background: "#e11d48",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  wishlistBtn: {
    position: "absolute" as const,
    top: "1rem",
    right: "1rem",
    background: "rgba(255, 255, 255, 0.9)",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  wishlistBtnActive: {
    background: "#e11d48",
    color: "white",
  },
  productActions: {
    position: "absolute" as const,
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
    display: "flex",
    gap: "0.5rem",
  },
  quickViewBtn: {
    flex: 1,
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
  },
  addToCartBtn: {
    flex: 1,
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "#000",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  productInfo: {
    padding: "1.5rem",
  },
  productName: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
    color: "#333",
    lineHeight: 1.4,
  },
  productColors: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  colorDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "2px solid #e9ecef",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  productRating: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  stars: {
    display: "flex",
    gap: "0.25rem",
  },
  star: {
    color: "#e9ecef",
    fontSize: "0.9rem",
  },
  starFilled: {
    color: "#fbbf24",
    fontSize: "0.9rem",
  },
  reviews: {
    fontSize: "0.85rem",
    color: "#6c757d",
  },
  productPrice: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  currentPrice: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#e11d48",
  },
  originalPrice: {
    fontSize: "1rem",
    color: "#6c757d",
    textDecoration: "line-through",
  },


  // Cart Page Styles
  cartPage: {
    minHeight: "100vh",
    background: "#f8f9fa",
    padding: "2rem 0",
  },
  cartHeader: {
    marginBottom: "2rem",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#6c757d",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  cartTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#333",
    margin: 0,
  },
  emptyCart: {
    textAlign: "center" as const,
    padding: "4rem 0",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  shopNowBtn: {
    background: "#e11d48",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "2rem",
  },
  cartContent: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
  },
  cartItems: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  cartItemLarge: {
    display: "flex",
    gap: "1.5rem",
    padding: "1.5rem 0",
    borderBottom: "1px solid #e9ecef",
    alignItems: "center",
  },
  cartItemImageLarge: {
    width: "120px",
    height: "120px",
    objectFit: "cover" as const,
    borderRadius: "8px",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemNameLarge: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#333",
  },
  cartItemCategory: {
    color: "#6c757d",
    marginBottom: "0.75rem",
  },
  cartItemPriceSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  cartItemPriceLarge: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#e11d48",
  },
  cartItemOriginalPrice: {
    fontSize: "1rem",
    color: "#6c757d",
    textDecoration: "line-through",
  },
  cartItemActions: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
  },
  quantityControlsLarge: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "0.5rem",
  },
  quantityBtnLarge: {
    background: "white",
    border: "1px solid #e9ecef",
    width: "36px",
    height: "36px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  quantityTextLarge: {
    fontWeight: 600,
    minWidth: "30px",
    textAlign: "center" as const,
    fontSize: "1.1rem",
  },
  itemTotal: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#333",
  },
  removeBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2rem",
  },
  orderSummary: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  totalRow: {
    borderTop: "2px solid #e9ecef",
    paddingTop: "1rem",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#333",
  },
  customerForm: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  formInput: {
    width: "100%",
    padding: "1rem",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
  },
  checkoutBtn: {
    width: "100%",
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "1.25rem",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  floatingCart: {
    position: "fixed" as const,
    bottom: "2rem",
    left: "2rem",
    width: "60px",
    height: "60px",
    background: "#e11d48",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(225, 29, 72, 0.3)",
    transition: "all 0.3s ease",
    zIndex: 1000,
    border: "none",
  },
  floatingCartIcon: {
    color: "white",
    fontSize: "1.5rem",
  },
  floatingCartBadge: {
    position: "absolute" as const,
    top: "-5px",
    right: "-5px",
    background: "#fff",
    color: "#e11d48",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    border: "2px solid #e11d48",
  },
}
