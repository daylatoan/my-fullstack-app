"use client"
import { useState } from "react"
import type React from "react"

interface AuthModalProps {
  show: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
  onRegister: (name: string, email: string, password: string) => void
}

export default function AuthModal({ show, onClose, onLogin, onRegister }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      onLogin(formData.email, formData.password)
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Mật khẩu không khớp!")
        return
      }
      onRegister(formData.name, formData.email, formData.password)
    }
    setFormData({ name: "", email: "", password: "", confirmPassword: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!show) return null

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">
              <i className="fas fa-user-circle me-2"></i>
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-user me-2"></i>Họ tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ tên của bạn"
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-envelope me-2"></i>Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-lock me-2"></i>Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-lock me-2"></i>Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    required={!isLogin}
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100 mb-3">
                <i className={`fas ${isLogin ? "fa-sign-in-alt" : "fa-user-plus"} me-2`}></i>
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </button>
            </form>

            <div className="text-center">
              <p className="mb-2">{isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}</p>
              <button type="button" className="btn btn-outline-primary" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </div>

            <hr className="my-4" />

            <div className="social-login-section">
              <p className="text-center text-muted mb-3">Hoặc đăng nhập bằng</p>

              <div className="social-icons-container">
                <button className="social-icon google-icon" title="Đăng nhập với Google">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <button className="social-icon facebook-icon" title="Đăng nhập với Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button className="social-icon apple-icon" title="Đăng nhập với Apple">
                  <i className="fab fa-apple"></i>
                </button>

                <button className="social-icon github-icon" title="Đăng nhập với GitHub">
                  <i className="fab fa-github"></i>
                </button>

                <button className="social-icon twitter-icon" title="Đăng nhập với Twitter">
                  <i className="fab fa-twitter"></i>
                </button>

                <button className="social-icon linkedin-icon" title="Đăng nhập với LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>
            </div>

            <style jsx>{`
              .social-login-section {
                margin-top: 1.5rem;
              }

              .social-icons-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
                flex-wrap: wrap;
                padding: 10px 0;
              }

              .social-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }

              .social-icon:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
              }

              .social-icon:active {
                transform: translateY(-1px);
              }

              /* Google */
              .google-icon {
                background: #fff;
                color: #757575;
                border: 2px solid #dadce0;
              }

              .google-icon:hover {
                background: #f8f9fa;
                border-color: #4285f4;
              }

              /* Facebook */
              .facebook-icon {
                background: linear-gradient(135deg, #1877f2 0%, #166fe5 100%);
                color: white;
              }

              .facebook-icon:hover {
                background: linear-gradient(135deg, #166fe5 0%, #1464d6 100%);
                color: white;
              }

              /* Apple */
              .apple-icon {
                background: linear-gradient(135deg, #000 0%, #333 100%);
                color: white;
              }

              .apple-icon:hover {
                background: linear-gradient(135deg, #333 0%, #555 100%);
                color: white;
              }

              /* GitHub */
              .github-icon {
                background: linear-gradient(135deg, #333 0%, #24292e 100%);
                color: white;
              }

              .github-icon:hover {
                background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
                color: white;
              }

              /* Twitter */
              .twitter-icon {
                background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
                color: white;
              }

              .twitter-icon:hover {
                background: linear-gradient(135deg, #0d8bd9 0%, #0a7bc4 100%);
                color: white;
              }

              /* LinkedIn */
              .linkedin-icon {
                background: linear-gradient(135deg, #0077b5 0%, #005885 100%);
                color: white;
              }

              .linkedin-icon:hover {
                background: linear-gradient(135deg, #005885 0%, #004a6b 100%);
                color: white;
              }

              /* Ripple effect */
              .social-icon::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.3s ease, height 0.3s ease;
              }

              .social-icon:hover::before {
                width: 100%;
                height: 100%;
              }

              /* Responsive */
              @media (max-width: 480px) {
                .social-icon {
                  width: 50px;
                  height: 50px;
                  font-size: 20px;
                }

                .social-icons-container {
                  gap: 12px;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  )
}
