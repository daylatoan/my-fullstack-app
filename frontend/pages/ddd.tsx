"use client"
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

interface Order {
  id: number
  date: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  customerName: string
  customerEmail: string
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

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      date: "2024-01-15",
      items: [
        { ...products[0], quantity: 2 },
        { ...products[1], quantity: 1 },
      ],
      total: 1197000,
      status: "completed",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
    },
    {
      id: 2,
      date: "2024-01-14",
      items: [{ ...products[2], quantity: 1 }],
      total: 899000,
      status: "processing",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
    },
    {
      id: 3,
      date: "2024-01-13",
      items: [
        { ...products[3], quantity: 1 },
        { ...products[4], quantity: 2 },
      ],
      total: 1797000,
      status: "pending",
      customerName: "Lê Văn C",
      customerEmail: "levanc@email.com",
    },
    {
      id: 4,
      date: "2024-01-12",
      items: [{ ...products[5], quantity: 1 }],
      total: 699000,
      status: "cancelled",
      customerName: "Phạm Thị D",
      customerEmail: "phamthid@email.com",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const updateOrderStatus = (orderId: number, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const getTotalRevenue = () => {
    return orders.filter((order) => order.status === "completed").reduce((total, order) => total + order.total, 0)
  }

  const getPendingOrders = () => {
    return orders.filter((order) => order.status === "pending").length
  }

  const getProcessingOrders = () => {
    return orders.filter((order) => order.status === "processing").length
  }

  const getCompletedOrders = () => {
    return orders.filter((order) => order.status === "completed").length
  }

  const filteredOrders = orders
    .filter((order) => statusFilter === "all" || order.status === statusFilter)
    .filter(
      (order) =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery),
    )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

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

      <div style={styles.adminPage}>
        {/* Header */}
        <header style={styles.adminHeader}>
          <div style={styles.container}>
            <div style={styles.headerContent}>
              <div style={styles.headerLeft}>
                <a href="/" style={styles.backToShop}>
                  <i className="fas fa-arrow-left"></i> Quay lại Shop
                </a>
                <h1 style={styles.adminTitle}>
                  <i className="fas fa-cog"></i> Quản lý cửa hàng
                </h1>
              </div>
              <div style={styles.headerRight}>
                <div style={styles.adminInfo}>
                  <i className="fas fa-user-shield"></i>
                  <span>Admin Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div style={styles.container}>
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#28a745" }}>
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>{formatPrice(getTotalRevenue())}</h3>
                <p style={styles.statLabel}>Tổng doanh thu</p>
                <small style={styles.statSubtext}>Từ {getCompletedOrders()} đơn hàng hoàn thành</small>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#ffc107" }}>
                <i className="fas fa-clock"></i>
              </div>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>{getPendingOrders()}</h3>
                <p style={styles.statLabel}>Đơn chờ xử lý</p>
                <small style={styles.statSubtext}>Cần xử lý ngay</small>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#17a2b8" }}>
                <i className="fas fa-spinner"></i>
              </div>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>{getProcessingOrders()}</h3>
                <p style={styles.statLabel}>Đang xử lý</p>
                <small style={styles.statSubtext}>Đơn hàng đang được chuẩn bị</small>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: "#6f42c1" }}>
                <i className="fas fa-box"></i>
              </div>
              <div style={styles.statInfo}>
                <h3 style={styles.statValue}>{products.length}</h3>
                <p style={styles.statLabel}>Sản phẩm</p>
                <small style={styles.statSubtext}>Trong kho</small>
              </div>
            </div>
          </div>

          {/* Orders Management */}
          <div style={styles.adminSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <i className="fas fa-list-alt"></i> Quản lý đơn hàng
              </h2>
              <div style={styles.sectionActions}>
                <div style={styles.searchBox}>
                  <i className="fas fa-search" style={styles.searchIcon}></i>
                  <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>

            <div style={styles.ordersTable}>
              <div style={styles.tableHeader}>
                <div style={styles.tableCell}>Mã đơn</div>
                <div style={styles.tableCell}>Ngày đặt</div>
                <div style={styles.tableCell}>Khách hàng</div>
                <div style={styles.tableCell}>Sản phẩm</div>
                <div style={styles.tableCell}>Tổng tiền</div>
                <div style={styles.tableCell}>Trạng thái</div>
                <div style={styles.tableCell}>Hành động</div>
              </div>

              {filteredOrders.map((order) => (
                <div key={order.id} style={styles.tableRow}>
                  <div style={styles.tableCell}>
                    <strong>#{order.id.toString().padStart(4, "0")}</strong>
                  </div>
                  <div style={styles.tableCell}>
                    <div>{new Date(order.date).toLocaleDateString("vi-VN")}</div>
                    <small style={styles.dateTime}>{new Date(order.date).toLocaleTimeString("vi-VN")}</small>
                  </div>
                  <div style={styles.tableCell}>
                    <div style={styles.customerInfo}>
                      <strong>{order.customerName}</strong>
                      <small>{order.customerEmail}</small>
                    </div>
                  </div>
                  <div style={styles.tableCell}>
                    <div style={styles.itemsCount}>{order.items.length} sản phẩm</div>
                    <small style={styles.itemsDetail}>
                      {order.items.reduce((total, item) => total + item.quantity, 0)} món
                    </small>
                  </div>
                  <div style={styles.tableCell}>
                    <strong style={styles.orderTotal}>{formatPrice(order.total)}</strong>
                  </div>
                  <div style={styles.tableCell}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...(order.status === "completed" && styles.statusCompleted),
                        ...(order.status === "processing" && styles.statusProcessing),
                        ...(order.status === "pending" && styles.statusPending),
                        ...(order.status === "cancelled" && styles.statusCancelled),
                      }}
                    >
                      {order.status === "completed" && "Hoàn thành"}
                      {order.status === "processing" && "Đang xử lý"}
                      {order.status === "pending" && "Chờ xử lý"}
                      {order.status === "cancelled" && "Đã hủy"}
                    </span>
                  </div>
                  <div style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        style={styles.statusSelect}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                      <button style={styles.viewBtn} onClick={() => alert(`Chi tiết đơn hàng #${order.id}`)}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div style={styles.noOrders}>
                  <i className="fas fa-inbox" style={{ fontSize: "48px", color: "#ccc", marginBottom: "1rem" }}></i>
                  <p>Không tìm thấy đơn hàng nào</p>
                </div>
              )}
            </div>
          </div>

          {/* Products Management */}
          <div style={styles.adminSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <i className="fas fa-box-open"></i> Quản lý sản phẩm
              </h2>
              <div style={styles.sectionActions}>
                <button style={styles.addProductBtn}>
                  <i className="fas fa-plus"></i> Thêm sản phẩm
                </button>
              </div>
            </div>

            <div style={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} style={styles.adminProductCard}>
                  <div style={styles.productImageSection}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      style={styles.adminProductImage}
                    />
                    <div style={styles.productBadges}>
                      {product.isNew && <span style={styles.newBadge}>Mới</span>}
                      {product.isSale && <span style={styles.saleBadge}>Sale</span>}
                    </div>
                  </div>
                  <div style={styles.adminProductInfo}>
                    <h4 style={styles.productTitle}>{product.name}</h4>
                    <div style={styles.productMeta}>
                      <span style={styles.productCategory}>
                        <i className="fas fa-tag"></i> {product.category}
                      </span>
                      <span style={styles.productRating}>
                        <i className="fas fa-star"></i> {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div style={styles.productPricing}>
                      <span style={styles.currentPrice}>{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span style={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <div style={styles.adminProductActions}>
                      <button style={styles.editBtn} onClick={() => alert(`Chỉnh sửa: ${product.name}`)}>
                        <i className="fas fa-edit"></i> Sửa
                      </button>
                      <button style={styles.duplicateBtn} onClick={() => alert(`Nhân bản: ${product.name}`)}>
                        <i className="fas fa-copy"></i> Sao chép
                      </button>
                      <button style={styles.deleteBtn} onClick={() => alert(`Xóa: ${product.name}`)}>
                        <i className="fas fa-trash"></i> Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Section */}
          <div style={styles.adminSection}>
            <h2 style={styles.sectionTitle}>
              <i className="fas fa-chart-bar"></i> Thống kê bán hàng
            </h2>
            <div style={styles.analyticsGrid}>
              <div style={styles.analyticsCard}>
                <h4>Doanh thu theo tháng</h4>
                <div style={styles.chartPlaceholder}>
                  <i className="fas fa-chart-line" style={{ fontSize: "48px", color: "#ccc" }}></i>
                  <p>Biểu đồ doanh thu</p>
                </div>
              </div>
              <div style={styles.analyticsCard}>
                <h4>Sản phẩm bán chạy</h4>
                <div style={styles.topProducts}>
                  {products.slice(0, 5).map((product, index) => (
                    <div key={product.id} style={styles.topProductItem}>
                      <span style={styles.productRank}>#{index + 1}</span>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        style={styles.topProductImage}
                      />
                      <div style={styles.topProductInfo}>
                        <span style={styles.topProductName}>{product.name}</span>
                        <span style={styles.topProductSales}>{product.reviews} đã bán</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
  adminPage: {
    minHeight: "100vh",
    background: "#f8f9fa",
    fontFamily: '"Inter", sans-serif',
  },
  adminHeader: {
    background: "#fff",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 0",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  backToShop: {
    color: "#6c757d",
    textDecoration: "none",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  adminTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#333",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  headerRight: {},
  adminInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#e11d48",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  statCard: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    transition: "transform 0.2s ease",
  },
  statIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#333",
    margin: "0 0 0.25rem 0",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#6c757d",
    margin: "0 0 0.25rem 0",
  },
  statSubtext: {
    fontSize: "0.85rem",
    color: "#adb5bd",
  },
  adminSection: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap" as const,
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    margin: 0,
  },
  sectionActions: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  searchBox: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute" as const,
    left: "1rem",
    color: "#6c757d",
  },
  searchInput: {
    padding: "0.75rem 1rem 0.75rem 2.5rem",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    outline: "none",
    fontSize: "0.9rem",
    minWidth: "250px",
  },
  filterSelect: {
    padding: "0.75rem 1rem",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    outline: "none",
    fontSize: "0.9rem",
    background: "white",
    cursor: "pointer",
  },
  addProductBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  ordersTable: {
    display: "flex",
    flexDirection: "column" as const,
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "100px 140px 200px 120px 140px 120px 180px",
    gap: "1rem",
    padding: "1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    fontWeight: 600,
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "100px 140px 200px 120px 140px 120px 180px",
    gap: "1rem",
    padding: "1.5rem 1rem",
    borderBottom: "1px solid #e9ecef",
    alignItems: "center",
    transition: "background-color 0.2s ease",
  },
  tableCell: {
    fontSize: "0.9rem",
  },
  customerInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
  },
  dateTime: {
    color: "#6c757d",
  },
  itemsCount: {
    fontWeight: 600,
  },
  itemsDetail: {
    color: "#6c757d",
  },
  orderTotal: {
    color: "#e11d48",
    fontSize: "1rem",
  },
  statusBadge: {
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  statusCompleted: {
    background: "#d4edda",
    color: "#155724",
  },
  statusProcessing: {
    background: "#fff3cd",
    color: "#856404",
  },
  statusPending: {
    background: "#cce5ff",
    color: "#004085",
  },
  statusCancelled: {
    background: "#f8d7da",
    color: "#721c24",
  },
  actionButtons: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  statusSelect: {
    padding: "0.5rem",
    border: "1px solid #e9ecef",
    borderRadius: "4px",
    fontSize: "0.8rem",
    background: "white",
  },
  viewBtn: {
    background: "#17a2b8",
    color: "white",
    border: "none",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noOrders: {
    textAlign: "center" as const,
    padding: "3rem 0",
    color: "#6c757d",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "1.5rem",
  },
  adminProductCard: {
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "1.5rem",
    transition: "transform 0.2s ease",
    border: "1px solid #e9ecef",
  },
  productImageSection: {
    position: "relative" as const,
    marginBottom: "1rem",
  },
  adminProductImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
    borderRadius: "8px",
  },
  productBadges: {
    position: "absolute" as const,
    top: "0.5rem",
    left: "0.5rem",
    display: "flex",
    gap: "0.5rem",
  },
  newBadge: {
    background: "#28a745",
    color: "white",
    padding: "0.25rem 0.5rem",
    borderRadius: "12px",
    fontSize: "0.7rem",
    fontWeight: 600,
  },
  saleBadge: {
    background: "#e11d48",
    color: "white",
    padding: "0.25rem 0.5rem",
    borderRadius: "12px",
    fontSize: "0.7rem",
    fontWeight: 600,
  },
  adminProductInfo: {},
  productTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
    color: "#333",
  },
  productMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    fontSize: "0.85rem",
    color: "#6c757d",
  },
  productCategory: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  productRating: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  productPricing: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  currentPrice: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#e11d48",
  },
  originalPrice: {
    fontSize: "0.9rem",
    color: "#6c757d",
    textDecoration: "line-through",
  },
  adminProductActions: {
    display: "flex",
    gap: "0.5rem",
  },
  editBtn: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    fontSize: "0.85rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    flex: 1,
    justifyContent: "center",
  },
  duplicateBtn: {
    background: "#6c757d",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    fontSize: "0.85rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    flex: 1,
    justifyContent: "center",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    fontSize: "0.85rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    flex: 1,
    justifyContent: "center",
  },
  analyticsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
  },
  analyticsCard: {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "1.5rem",
  },
  chartPlaceholder: {
    textAlign: "center" as const,
    padding: "3rem 0",
    color: "#6c757d",
  },
  topProducts: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  topProductItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.75rem",
    background: "white",
    borderRadius: "8px",
  },
  productRank: {
    fontWeight: 700,
    color: "#e11d48",
    minWidth: "30px",
  },
  topProductImage: {
    width: "40px",
    height: "40px",
    objectFit: "cover" as const,
    borderRadius: "6px",
  },
  topProductInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  topProductName: {
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  topProductSales: {
    fontSize: "0.8rem",
    color: "#6c757d",
  },
}
