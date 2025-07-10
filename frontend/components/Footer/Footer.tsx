"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Về chúng tôi",
      links: [
        { label: "Giới thiệu", href: "/about" },
        { label: "Tuyển dụng", href: "/careers" },
        { label: "Tin tức", href: "/news" },
        { label: "Đối tác", href: "/partners" },
      ],
    },
    {
      title: "Dịch vụ",
      links: [
        { label: "Sản phẩm", href: "/products" },
        { label: "Giải pháp", href: "/solutions" },
        { label: "Hỗ trợ", href: "/support" },
        { label: "Tư vấn", href: "/consulting" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { label: "Trung tâm trợ giúp", href: "/help" },
        { label: "Liên hệ", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Báo lỗi", href: "/report" },
      ],
    },
    {
      title: "Pháp lý",
      links: [
        { label: "Điều khoản sử dụng", href: "/terms" },
        { label: "Chính sách bảo mật", href: "/privacy" },
        { label: "Cookie", href: "/cookies" },
        { label: "Bản quyền", href: "/copyright" },
      ],
    },
  ]

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "https://facebook.com", label: "Facebook" },
    { icon: "fab fa-twitter", href: "https://twitter.com", label: "Twitter" },
    { icon: "fab fa-instagram", href: "https://instagram.com", label: "Instagram" },
    { icon: "fab fa-linkedin-in", href: "https://linkedin.com", label: "LinkedIn" },
    { icon: "fab fa-youtube", href: "https://youtube.com", label: "YouTube" },
    { icon: "fab fa-tiktok", href: "https://tiktok.com", label: "TikTok" },
  ]

  return (
    <>
      <footer className="footer">
        {/* Main Footer */}
        <div className="footer-main">
          <div className="container">
            <div className="row">
              {/* Company Info */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="footer-brand">
                  <div className="brand-logo">
                    <i className="fas fa-rocket"></i>
                    <span className="brand-name">Dltoan</span>
                  </div>
                  <p className="brand-description">
                    Chúng tôi cung cấp các giải pháp công nghệ hiện đại và dịch vụ chất lượng cao để giúp doanh nghiệp
                    của bạn phát triển mạnh mẽ trong thời đại số.
                  </p>

                  {/* Contact Info */}
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Hà Nội</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <span>+84 978 636 933</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <span>Daylatoan1310@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              {footerSections.map((section, index) => (
                <div key={index} className="col-lg-2 col-md-6 col-sm-6 mb-4">
                  <div className="footer-section">
                    <h5 className="footer-title">{section.title}</h5>
                    <ul className="footer-links">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a href={link.href} className="footer-link">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="newsletter-section">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="newsletter-content">
                    <h4 className="newsletter-title">
                      <i className="fas fa-paper-plane me-2"></i>
                      Đăng ký nhận tin tức
                    </h4>
                    <p className="newsletter-description">
                      Nhận thông tin mới nhất của chúng tôi!!!
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <form className="newsletter-form">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control newsletter-input"
                        placeholder="Nhập email của bạn..."
                        required
                      />
                      <button className="btn newsletter-btn" type="submit">
                        <i className="fas fa-paper-plane"></i>
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="copyright">
                  <p>&copy; {currentYear} Dltoan. Tất cả quyền được bảo lưu.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Về đầu trang"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          position: relative;
        }

        .footer-main {
          padding: 60px 0 40px;
          position: relative;
        }

        .footer-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }

        /* Brand Section */
        .footer-brand {
          padding-right: 20px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .brand-logo i {
          font-size: 2rem;
          color: #3498db;
          margin-right: 10px;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .brand-description {
          color: #bdc3c7;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .contact-info {
          margin-top: 20px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          color: #bdc3c7;
        }

        .contact-item i {
          width: 20px;
          color: #3498db;
          margin-right: 10px;
        }

        /* Footer Sections */
        .footer-section {
          margin-bottom: 30px;
        }

        .footer-title {
          color: white;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: #3498db;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-link {
          color: #bdc3c7;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #3498db;
          text-decoration: none;
          padding-left: 5px;
        }

        /* Newsletter Section */
        .newsletter-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 30px;
          margin-top: 40px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-title {
          color: white;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .newsletter-description {
          color: #bdc3c7;
          margin-bottom: 0;
        }

        .newsletter-form {
          margin-top: 20px;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 25px 0 0 25px;
          padding: 12px 20px;
        }

        .newsletter-input::placeholder {
          color: #bdc3c7;
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #3498db;
          color: white;
          box-shadow: none;
        }

        .newsletter-btn {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border: none;
          color: white;
          border-radius: 0 25px 25px 0;
          padding: 12px 25px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          background: linear-gradient(135deg, #2980b9 0%, #1f5f8b 100%);
          transform: translateY(-1px);
        }

        /* Footer Bottom */
        .footer-bottom {
          background: rgba(0, 0, 0, 0.2);
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright p {
          margin: 0;
          color: #bdc3c7;
        }

        .social-links {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bdc3c7;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: #3498db;
          color: white;
          transform: translateY(-2px);
          text-decoration: none;
        }

        /* Back to Top Button */
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }

        .back-to-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer-main {
            padding: 40px 0 30px;
          }

          .newsletter-section {
            padding: 20px;
            margin-top: 30px;
          }

          .newsletter-form {
            margin-top: 15px;
          }

          .social-links {
            justify-content: center;
            margin-top: 15px;
          }

          .copyright {
            text-align: center;
          }

          .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
          }
        }

        @media (max-width: 576px) {
          .footer-brand {
            padding-right: 0;
            margin-bottom: 30px;
          }

          .newsletter-section {
            padding: 15px;
          }

          .newsletter-input,
          .newsletter-btn {
            border-radius: 25px;
            margin-bottom: 10px;
          }

          .newsletter-form .input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}
