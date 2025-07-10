"use client"
import { useState } from "react"
import Link from "next/link"
import SearchBar from "../SearchBar/SearchBar"
import Navbar from "../Navbar/Navbar"
import AuthModal from "../../pages/auth"
import UserProfile from "../../pages/UserProfile"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "0123456789",
    address: "123 Đường ABC, Hà Nội",
  })

  const handleSearch = (searchValue: string) => {
    console.log("Searching for:", searchValue)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleUserClick = () => {
    if (isLoggedIn) {
      setShowUserProfile(true)
    } else {
      setShowAuthModal(true)
    }
  }

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    console.log("Login:", email, password)
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulate register
    console.log("Register:", name, email, password)
    setUser({ ...user, name, email })
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowUserProfile(false)
  }

  const customMenuItems = [
    { icon: "fas fa-home", label: "Trang chủ", href: "/" },
    { icon: "fas fa-user", label: "Hồ sơ", href: "/profile" },
    { icon: "fas fa-shopping-cart", label: "Giỏ hàng", href: "/cart" },
    { icon: "fa-brands fa-affiliatetheme", label: "Affiliate", href: "/affiliate" },
    { icon: "fas fa-bell", label: "Thông báo", href: "/notifications" },
    { icon: "fas fa-heart", label: "Yêu thích", href: "/favorites" },
    { icon: "fa-regular fa-futbol", label: "FootBall", href: "/football" },
    { icon: "fas fa-question-circle", label: "Trợ giúp", href: "/help" },
    { icon: "fas fa-sign-out-alt", label: "Đăng xuất", href: "/logout" },
  ]

  return (
    <>
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          {/* Desktop Layout */}
          <div className="row align-items-center py-3 d-none d-md-flex">
            <div className="col-auto">
              <button
                className={`btn btn-link text-dark p-2 border-0 rounded-circle hover-bg ${isMenuOpen ? "active" : ""}`}
                type="button"
                style={{ fontSize: "1.5rem" }}
                onClick={toggleMenu}
              >
                <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
              </button>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <div style={{ width: "100%", maxWidth: "500px" }}>
                  <SearchBar placeholder="Search..." onSearch={handleSearch} />
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="user-section">
                <button
                  className="btn btn-link text-dark p-2 border-0 rounded-circle hover-bg"
                  type="button"
                  style={{ fontSize: "1.5rem" }}
                  onClick={handleUserClick}
                >
                  {isLoggedIn ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt="User Avatar"
                      className="rounded-circle"
                      style={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <i className="fas fa-user-circle"></i>
                  )}
                </button>
                {isLoggedIn && (
                  <div className="user-info">
                    <small className="text-muted d-block">{user.name}</small>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="d-md-none mobile-header">
            <div className="mobile-row">
              <div className="d-flex justify-content-center">
                <div className="mobile-user-container" onClick={handleUserClick}>
                  <button
                    className="btn btn-primary rounded-circle p-3 shadow-sm"
                    type="button"
                    style={{ fontSize: "1.8rem" }}
                  >
                    {isLoggedIn ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt="User Avatar"
                        className="rounded-circle"
                        style={{ width: "32px", height: "32px" }}
                      />
                    ) : (
                      <i className="fas fa-user-circle text-white"></i>
                    )}
                  </button>
                  <span className="mobile-user-text">{isLoggedIn ? user.name : "Tài khoản"}</span>
                </div>
              </div>
            </div>
            <div className="mobile-row">
              <div className="mobile-search-container">
                <SearchBar placeholder="Tìm kiếm..." onSearch={handleSearch} />
              </div>
            </div>
            <div className="mobile-row">
              <div className="mobile-menu-grid">
                {customMenuItems.slice(0, 8).map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="mobile-menu-item"
                    style={{ textDecoration: "none" }}
                    onClick={closeMenu}
                  >
                    <div className="mobile-menu-icon">
                      <i className={item.icon}></i>
                    </div>
                    <span className="mobile-menu-label">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <Navbar
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={customMenuItems}
        user={isLoggedIn ? user : null}
        onLogout={handleLogout}
      />

      {/* Auth Modal */}
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* User Profile Modal */}
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        user={user}
        onLogout={handleLogout}
        onUpdateUser={setUser}
      />

      {/* FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      {/* Bootstrap CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

      <style jsx>{`
        .hover-bg:hover {
          background-color: #f8f9fa !important;
        }
        .hover-bg.active {
          background-color: #e9ecef !important;
          transform: rotate(90deg);
          transition: all 0.3s ease;
        }
        .user-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .user-info {
          text-align: center;
        }
        .mobile-header {
          padding: 20px 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .mobile-row {
          margin-bottom: 20px;
        }
        .mobile-row:last-child {
          margin-bottom: 0;
        }
        .mobile-user-container {
          text-align: center;
          cursor: pointer;
        }
        .mobile-user-text {
          display: block;
          color: white;
          font-weight: 500;
          margin-top: 8px;
          font-size: 14px;
        }
        .mobile-search-container {
          padding: 0 10px;
        }
        .mobile-menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          padding: 0 5px;
        }
        .mobile-menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: white;
          padding: 15px 8px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
        .mobile-menu-item:hover,
        .mobile-menu-item:active {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }
        .mobile-menu-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin-bottom: 8px;
          font-size: 18px;
        }
        .mobile-menu-label {
          font-size: 11px;
          font-weight: 500;
          text-align: center;
          line-height: 1.2;
        }
        @media (max-width: 767.98px) {
          .container-fluid {
            padding: 0;
          }
        }
        @media (max-width: 480px) {
          .mobile-menu-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          .mobile-menu-item {
            padding: 12px 5px;
          }
          .mobile-menu-icon {
            width: 35px;
            height: 35px;
            font-size: 16px;
          }
          .mobile-menu-label {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  )
}
