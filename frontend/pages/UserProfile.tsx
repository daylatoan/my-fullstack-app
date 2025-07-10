"use client"
import { useState } from "react"
import type React from "react"

interface User {
  name: string
  email: string
  avatar: string
  phone: string
  address: string
}

interface UserProfileProps {
  show: boolean
  onClose: () => void
  user: User
  onLogout: () => void
  onUpdateUser: (user: User) => void
}

export default function UserProfile({ show, onClose, user, onLogout, onUpdateUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateUser(formData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogout = () => {
    onLogout()
    onClose()
  }

  if (!show) return null

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-user-circle me-2"></i>
              Thông tin cá nhân
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="rounded-circle shadow"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <button className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0">
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
                <h5 className="mt-3 mb-1">{user.name}</h5>
                <p className="text-muted">{user.email}</p>
              </div>

              <div className="col-md-8">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
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
                        required
                      />
                    </div>
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
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        <i className="fas fa-phone me-2"></i>Số điện thoại
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        <i className="fas fa-map-marker-alt me-2"></i>Địa chỉ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success">
                        <i className="fas fa-save me-2"></i>Lưu
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                        <i className="fas fa-times me-2"></i>Hủy
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="info-item mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-user me-2 text-primary"></i>Họ tên
                      </label>
                      <p className="mb-0">{user.name}</p>
                    </div>
                    <div className="info-item mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-envelope me-2 text-primary"></i>Email
                      </label>
                      <p className="mb-0">{user.email}</p>
                    </div>
                    <div className="info-item mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-phone me-2 text-primary"></i>Số điện thoại
                      </label>
                      <p className="mb-0">{user.phone}</p>
                    </div>
                    <div className="info-item mb-3">
                      <label className="form-label fw-bold">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>Địa chỉ
                      </label>
                      <p className="mb-0">{user.address}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-edit me-2"></i>Chỉnh sửa
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer border-0">
            <div className="d-flex justify-content-between w-100">
              <div>
                <button className="btn btn-outline-primary me-2">
                  <i className="fas fa-key me-2"></i>Đổi mật khẩu
                </button>
                <button className="btn btn-outline-info">
                  <i className="fas fa-cog me-2"></i>Cài đặt
                </button>
              </div>
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
