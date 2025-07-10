"use client"

export default function NewsGrid() {
  const newsArticles = [
    {
      id: 1,
      title: "Breakthrough in Quantum Computing Technology",
      excerpt:
        "Scientists achieve major milestone in quantum computing with new processor design that could revolutionize computing industry.",
      image: "/placeholder.svg?height=250&width=400",
      category: "Công nghệ",
      author: "Dr. Sarah Johnson",
      publishDate: "1 giờ trước",
      readTime: "4 phút đọc",
      featured: true,
    },
    {
      id: 2,
      title: "Global Economy Shows Signs of Recovery",
      excerpt: "Economic indicators suggest positive growth trends across major markets worldwide.",
      image: "/placeholder.svg?height=250&width=400",
      category: "Kinh tế",
      author: "Michael Chen",
      publishDate: "2 giờ trước",
      readTime: "3 phút đọc",
      featured: false,
    },
    {
      id: 3,
      title: "Climate Change Summit Reaches Historic Agreement",
      excerpt: "World leaders unite on ambitious climate goals for the next decade.",
      image: "/placeholder.svg?height=250&width=400",
      category: "Môi trường",
      author: "Emma Rodriguez",
      publishDate: "3 giờ trước",
      readTime: "6 phút đọc",
      featured: false,
    },
    {
      id: 4,
      title: "Revolutionary Medical Treatment Shows Promise",
      excerpt: "New gene therapy treatment shows remarkable results in clinical trials.",
      image: "/placeholder.svg?height=250&width=400",
      category: "Sức khỏe",
      author: "Dr. James Wilson",
      publishDate: "4 giờ trước",
      readTime: "5 phút đọc",
      featured: false,
    },
    {
      id: 5,
      title: "Space Exploration Reaches New Milestone",
      excerpt: "Private space company successfully launches mission to Mars.",
      image: "/placeholder.svg?height=250&width=400",
      category: "Khoa học",
      author: "Lisa Park",
      publishDate: "5 giờ trước",
      readTime: "4 phút đọc",
      featured: false,
    },
    {
      id: 6,
      title: "Artificial Intelligence in Education",
      excerpt: "AI-powered learning platforms transform traditional education methods.",
      image: "/placeholder.svg?height=250&width=400",
      category: "Giáo dục",
      author: "Robert Kim",
      publishDate: "6 giờ trước",
      readTime: "3 phút đọc",
      featured: false,
    },
  ]

  return (
    <>
      <section className="news-grid">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-newspaper"></i>
              Tin tức mới nhất
            </h2>
            <div className="section-filters">
              <button className="filter-btn active">Mới nhất</button>
              <button className="filter-btn">Phổ biến</button>
              <button className="filter-btn">Xu hướng</button>
            </div>
          </div>

          <div className="news-grid-container">
            {newsArticles.map((article, index) => (
              <article
                key={article.id}
                className={`news-card ${article.featured ? "featured" : ""} ${index === 0 ? "large" : ""}`}
              >
                <div className="news-image">
                  <img src={article.image || "/placeholder.svg"} alt={article.title} />
                  <div className="image-overlay">
                    <div className="category-badge">{article.category}</div>
                    <button className="bookmark-btn">
                      <i className="fas fa-bookmark"></i>
                    </button>
                  </div>
                </div>

                <div className="news-content">
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-excerpt">{article.excerpt}</p>

                  <div className="news-meta">
                    <div className="author-info">
                      <div className="author-avatar">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="author-details">
                        <span className="author-name">{article.author}</span>
                        <span className="publish-date">{article.publishDate}</span>
                      </div>
                    </div>
                    <div className="read-time">
                      <i className="fas fa-clock"></i>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="news-actions">
                  <button className="action-btn like-btn">
                    <i className="fas fa-heart"></i>
                    <span>24</span>
                  </button>
                  <button className="action-btn comment-btn">
                    <i className="fas fa-comment"></i>
                    <span>8</span>
                  </button>
                  <button className="action-btn share-btn">
                    <i className="fas fa-share"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="load-more-section">
            <button className="load-more-btn">
              <i className="fas fa-plus"></i>
              Xem thêm tin tức
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .news-grid {
          padding: 60px 0;
          background: #f8f9fa;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2c3e50;
          display: flex;
          align-items: center;
          margin: 0;
        }

        .section-title i {
          color: #667eea;
          margin-right: 15px;
        }

        .section-filters {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          padding: 10px 20px;
          border: 2px solid #e9ecef;
          background: white;
          color: #6c757d;
          border-radius: 25px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
        }

        .news-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .news-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          position: relative;
        }

        .news-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .news-card.large {
          grid-column: span 2;
        }

        .news-card.featured {
          border: 2px solid #667eea;
        }

        .news-image {
          position: relative;
          overflow: hidden;
        }

        .news-image img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .news-card:hover .news-image img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px;
        }

        .category-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .bookmark-btn {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bookmark-btn:hover {
          background: #667eea;
          color: white;
          transform: scale(1.1);
        }

        .news-content {
          padding: 25px;
        }

        .news-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 15px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-excerpt {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .author-info {
          display: flex;
          align-items: center;
        }

        .author-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          margin-right: 10px;
        }

        .author-details {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: #2c3e50;
          font-size: 13px;
        }

        .publish-date {
          font-size: 11px;
          color: #6c757d;
        }

        .read-time {
          display: flex;
          align-items: center;
          color: #6c757d;
          font-size: 12px;
        }

        .read-time i {
          margin-right: 5px;
        }

        .news-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 25px 25px;
          border-top: 1px solid #e9ecef;
          padding-top: 20px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 8px 12px;
          border-radius: 20px;
        }

        .action-btn:hover {
          background: #f8f9fa;
          color: #667eea;
        }

        .like-btn:hover {
          color: #e74c3c;
        }

        .comment-btn:hover {
          color: #3498db;
        }

        .share-btn:hover {
          color: #2ecc71;
        }

        .load-more-section {
          text-align: center;
        }

        .load-more-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .load-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        /* Responsive */
        @media (max-width: 992px) {
          .news-card.large {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .news-grid-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .news-content {
            padding: 20px;
          }

          .news-actions {
            padding: 0 20px 20px;
          }
        }
      `}</style>
    </>
  )
}
