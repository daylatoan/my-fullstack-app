"use client"

export default function NewsHero() {
  const featuredNews = {
    title: "Công nghệ AI đang thay đổi cách chúng ta làm việc",
    excerpt:
      "Trí tuệ nhân tạo không chỉ là xu hướng mà đã trở thành một phần không thể thiếu trong cuộc sống hiện đại, từ công việc đến giải trí.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Công nghệ",
    author: "Nguyễn Văn A",
    publishDate: "2 giờ trước",
    readTime: "5 phút đọc",
  }

  const sideNews = [
    {
      title: "Thị trường chứng khoán Việt Nam tăng trưởng mạnh",
      image: "/placeholder.svg?height=120&width=180",
      category: "Kinh tế",
      publishDate: "3 giờ trước",
    },
    {
      title: "Giải pháp năng lượng xanh cho tương lai bền vững",
      image: "/placeholder.svg?height=120&width=180",
      category: "Môi trường",
      publishDate: "4 giờ trước",
    },
    {
      title: "Xu hướng du lịch mới sau đại dịch COVID-19",
      image: "/placeholder.svg?height=120&width=180",
      category: "Du lịch",
      publishDate: "5 giờ trước",
    },
  ]

  return (
    <>
      <section className="news-hero">
        <div className="container">
          <div className="row">
            {/* Featured Article */}
            <div className="col-lg-8">
              <div className="featured-article">
                <div className="featured-image">
                  <img src={featuredNews.image || "/placeholder.svg"} alt={featuredNews.title} />
                  <div className="category-badge">{featuredNews.category}</div>
                </div>
                <div className="featured-content">
                  <h1 className="featured-title">{featuredNews.title}</h1>
                  <p className="featured-excerpt">{featuredNews.excerpt}</p>
                  <div className="article-meta">
                    <div className="author-info">
                      <div className="author-avatar">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="author-details">
                        <span className="author-name">{featuredNews.author}</span>
                        <span className="publish-date">{featuredNews.publishDate}</span>
                      </div>
                    </div>
                    <div className="read-time">
                      <i className="fas fa-clock"></i>
                      <span>{featuredNews.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side News */}
            <div className="col-lg-4">
              <div className="side-news">
                <h3 className="side-news-title">
                  <i className="fas fa-fire"></i>
                  Tin nổi bật
                </h3>
                <div className="side-news-list">
                  {sideNews.map((news, index) => (
                    <div key={index} className="side-news-item">
                      <div className="side-news-image">
                        <img src={news.image || "/placeholder.svg"} alt={news.title} />
                        <div className="side-category-badge">{news.category}</div>
                      </div>
                      <div className="side-news-content">
                        <h4 className="side-news-title-text">{news.title}</h4>
                        <div className="side-news-meta">
                          <i className="fas fa-clock"></i>
                          <span>{news.publishDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .news-hero {
          padding: 40px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 15px;
        }

        .featured-article {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .featured-article:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .featured-image {
          position: relative;
          overflow: hidden;
        }

        .featured-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .featured-article:hover .featured-image img {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .featured-content {
          padding: 30px;
        }

        .featured-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .featured-excerpt {
          font-size: 1.1rem;
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .article-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .author-info {
          display: flex;
          align-items: center;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          margin-right: 12px;
        }

        .author-details {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: #2c3e50;
          font-size: 14px;
        }

        .publish-date {
          font-size: 12px;
          color: #6c757d;
        }

        .read-time {
          display: flex;
          align-items: center;
          color: #6c757d;
          font-size: 14px;
        }

        .read-time i {
          margin-right: 5px;
        }

        /* Side News */
        .side-news {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .side-news-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }

        .side-news-title i {
          color: #e74c3c;
          margin-right: 10px;
        }

        .side-news-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .side-news-item {
          display: flex;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .side-news-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .side-news-item:hover {
          transform: translateX(5px);
        }

        .side-news-image {
          position: relative;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .side-news-image img {
          width: 80px;
          height: 60px;
          object-fit: cover;
        }

        .side-category-badge {
          position: absolute;
          top: 5px;
          left: 5px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
        }

        .side-news-content {
          flex: 1;
        }

        .side-news-title-text {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          line-height: 1.4;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .side-news-meta {
          display: flex;
          align-items: center;
          color: #6c757d;
          font-size: 12px;
        }

        .side-news-meta i {
          margin-right: 5px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .side-news {
            margin-top: 30px;
          }
        }

        @media (max-width: 768px) {
          .featured-title {
            font-size: 1.5rem;
          }

          .featured-content {
            padding: 20px;
          }

          .article-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .side-news-item {
            flex-direction: column;
          }

          .side-news-image {
            width: 100%;
          }

          .side-news-image img {
            width: 100%;
            height: 120px;
          }
        }
      `}</style>
    </>
  )
}
