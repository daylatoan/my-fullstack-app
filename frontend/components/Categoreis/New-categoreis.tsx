"use client"

export default function NewsCategories() {
  const categories = [
    { name: "Tất cả", icon: "fas fa-globe", active: true, count: 245 },
    { name: "Công nghệ", icon: "fas fa-laptop-code", active: false, count: 89 },
    { name: "Kinh tế", icon: "fas fa-chart-line", active: false, count: 67 },
    { name: "Thể thao", icon: "fas fa-futbol", active: false, count: 45 },
    { name: "Giải trí", icon: "fas fa-music", active: false, count: 34 },
    { name: "Sức khỏe", icon: "fas fa-heartbeat", active: false, count: 28 },
    { name: "Du lịch", icon: "fas fa-plane", active: false, count: 23 },
    { name: "Ẩm thực", icon: "fas fa-utensils", active: false, count: 19 },
  ]

  return (
    <>
      <section className="news-categories">
        <div className="container">
          <div className="categories-wrapper">
            <div className="categories-header">
              <h2 className="categories-title">
                <i className="fas fa-th-large"></i>
                Danh mục tin tức
              </h2>
              <div className="categories-nav">
                <button className="nav-btn prev-btn">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="nav-btn next-btn">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="categories-list">
              {categories.map((category, index) => (
                <div key={index} className={`category-item ${category.active ? "active" : ""}`}>
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="category-count">{category.count} bài viết</span>
                  </div>
                  <div className="category-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .news-categories {
          padding: 60px 0;
          background: white;
        }

        .categories-wrapper {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .categories-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .categories-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          display: flex;
          align-items: center;
          margin: 0;
        }

        .categories-title i {
          color: #667eea;
          margin-right: 15px;
        }

        .categories-nav {
          display: flex;
          gap: 10px;
        }

        .nav-btn {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: white;
          color: #6c757d;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-btn:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .categories-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .category-item {
          background: white;
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        .category-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          border-color: #667eea;
        }

        .category-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
        }

        .category-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          background: rgba(102, 126, 234, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          transition: all 0.3s ease;
        }

        .category-item.active .category-icon {
          background: rgba(255, 255, 255, 0.2);
        }

        .category-icon i {
          font-size: 24px;
          color: #667eea;
        }

        .category-item.active .category-icon i {
          color: white;
        }

        .category-content {
          flex: 1;
        }

        .category-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0 0 5px 0;
        }

        .category-item.active .category-name {
          color: white;
        }

        .category-count {
          font-size: 14px;
          color: #6c757d;
        }

        .category-item.active .category-count {
          color: rgba(255, 255, 255, 0.8);
        }

        .category-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .category-item:hover .category-arrow,
        .category-item.active .category-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .category-arrow i {
          color: #667eea;
        }

        .category-item.active .category-arrow i {
          color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .categories-wrapper {
            padding: 25px;
          }

          .categories-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .categories-title {
            font-size: 1.5rem;
          }

          .categories-list {
            grid-template-columns: 1fr;
          }

          .category-item {
            padding: 20px;
          }

          .category-icon {
            width: 50px;
            height: 50px;
            margin-right: 15px;
          }

          .category-icon i {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  )
}
