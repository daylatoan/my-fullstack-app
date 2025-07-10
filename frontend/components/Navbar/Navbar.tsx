"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface MenuItem {
  icon: string
  label: string
  href: string
}

interface NavbarProps {
  isOpen: boolean
  onClose: () => void
  menuItems?: MenuItem[]
}

export default function Navbar({ isOpen, onClose, menuItems }: NavbarProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const defaultMenuItems: MenuItem[] = [
    { icon: "fas fa-home", label: "Trang chủ", href: "/" },
    { icon: "fas fa-user", label: "Hồ sơ", href: "/profile" },
    { icon: "fas fa-shopping-cart", label: "Giỏ hàng", href: "/cart" },
    { icon: "fa-brands fa-affiliatetheme", label: "Affiliate", href: "/affiliate" },
    { icon: "fas fa-bell", label: "Thông báo", href: "/notifications" },
    { icon: "fas fa-heart", label: "Yêu thích", href: "/favorites" },
    { icon: "fa-regular fa-futbo", label: "FootBall", href: "/football" },
    { icon: "fas fa-question-circle", label: "Trợ giúp", href: "/help" },
    { icon: "fas fa-sign-out-alt", label: "Đăng xuất", href: "/logout" },
  ]

  const items = menuItems || defaultMenuItems

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleMenuItemClick = (href: string) => {
    onClose()
    router.push(href)
  }

  return (
    <>
      <div ref={menuRef} className={`sidebar-menu ${isOpen ? "show" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title">
            <i className="fas fa-list me-2"></i>
            Menu
          </div>
          <button className="btn btn-sm btn-link text-white p-0" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Menu Items */}
        <div className="sidebar-content">
          {items.map((item, index) => (
            <div
              key={index}
              className="sidebar-item"
              onClick={() => handleMenuItemClick(item.href)}
              role="button"
            >
              <i className={`${item.icon} sidebar-icon`}></i>
              <span className="sidebar-label">{item.label}</span>
              <i className="fas fa-chevron-right sidebar-arrow"></i>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-details">
              <div className="user-name">Người dùng</div>
              <div className="user-email">user@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <style jsx>{`
        .sidebar-menu {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: white;
          border-right: 1px solid #dee2e6;
          box-shadow: 2px 0 15px rgba(0,0,0,0.1);
          width: 320px;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1050;
          display: flex;
          flex-direction: column;
        }

        .sidebar-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }

        .sidebar-header {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .sidebar-title {
          font-weight: 600;
          font-size: 18px;
          display: flex;
          align-items: center;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 10px 0;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          color: #212529;
          text-decoration: none;
          transition: all 0.3s ease;
          border-bottom: 1px solid #f8f9fa;
          position: relative;
          cursor: pointer;
        }

        .sidebar-item:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          padding-left: 30px;
        }

        .sidebar-item:hover .sidebar-arrow {
          opacity: 1;
          transform: translateX(5px);
        }

        .sidebar-item:hover::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #ffd700;
        }

        .sidebar-icon {
          width: 25px;
          text-align: center;
          font-size: 16px;
          margin-right: 15px;
        }

        .sidebar-label {
          flex: 1;
          font-weight: 500;
        }

        .sidebar-arrow {
          opacity: 0;
          transition: all 0.3s ease;
          font-size: 12px;
        }

        .sidebar-footer {
          border-top: 1px solid #e9ecef;
          padding: 20px;
          background: #f8f9fa;
        }

        .sidebar-user-info {
          display: flex;
          align-items: center;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          margin-right: 15px;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          color: #212529;
          margin-bottom: 2px;
        }

        .user-email {
          font-size: 12px;
          color: #6c757d;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1040;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        /* Scrollbar styling */
        .sidebar-content::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .sidebar-content::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .sidebar-content::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        @media (max-width: 480px) {
          .sidebar-menu {
            width: 280px;
          }
        }
      `}</style>
    </>
  )
}
