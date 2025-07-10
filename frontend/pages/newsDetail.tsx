"use client"

export default function ArticleDetailPage() {
  // Sample article data
  const article = {
    id: 1,
    title: "Chính phủ thông qua dự án phát triển hạ tầng giao thông trọng điểm",
    category: "Tin nóng",
    categoryColor: "primary",
    author: "Nguyễn Văn A",
    publishTime: "2 giờ trước",
    views: "2.5k",
    likes: 125,
    comments: 45,
    excerpt:
      "Trong phiên họp chiều nay, Chính phủ đã chính thức thông qua dự án đầu tư phát triển hệ thống giao thông công cộng với tổng mức đầu tư lên tới 100.000 tỷ đồng...",
    content: `
      <h3>Dự án có ý nghĩa quan trọng</h3>
      <p>Dự án phát triển hạ tầng giao thông này được đánh giá là một trong những dự án trọng điểm của Chính phủ trong giai đoạn 2024-2030. Với tổng mức đầu tư lên tới 100.000 tỷ đồng, dự án sẽ bao gồm:</p>
      
      <ul>
        <li>Xây dựng 500km đường cao tốc mới</li>
        <li>Nâng cấp hệ thống đường sắt quốc gia</li>
        <li>Phát triển giao thông công cộng đô thị</li>
        <li>Xây dựng các cảng hàng không hiện đại</li>
      </ul>
      
      <h3>Tác động tích cực đến kinh tế</h3>
      <p>Theo các chuyên gia kinh tế, dự án này sẽ tạo ra hàng triệu việc làm mới và thúc đẩy tăng trưởng GDP của cả nước. Đặc biệt, việc cải thiện hạ tầng giao thông sẽ giúp giảm chi phí logistics và nâng cao năng lực cạnh tranh của nền kinh tế.</p>
      
      <p>Thủ tướng Chính phủ nhấn mạnh: "Đây là dự án có ý nghĩa chiến lược, góp phần hiện đại hóa hạ tầng giao thông của đất nước và tạo động lực mới cho sự phát triển kinh tế - xã hội."</p>
      
      <h3>Tiến độ thực hiện</h3>
      <p>Dự án sẽ được triển khai theo 3 giai đoạn:</p>
      <ul>
        <li><strong>Giai đoạn 1 (2024-2026):</strong> Khởi công các tuyến đường cao tốc ưu tiên</li>
        <li><strong>Giai đoạn 2 (2027-2028):</strong> Nâng cấp hệ thống đường sắt</li>
        <li><strong>Giai đoạn 3 (2029-2030):</strong> Hoàn thiện toàn bộ dự án</li>
      </ul>
    `,
    tags: ["giao thông", "hạ tầng", "đầu tư", "phát triển", "kinh tế"],
    image: "/placeholder.svg?height=500&width=800",
  }

  const relatedArticles = [
    {
      id: 3,
      title: "Dự án đường sắt tốc độ cao Bắc-Nam được phê duyệt",
      image: "/placeholder.svg?height=100&width=150",
      publishTime: "1 ngày trước",
    },
    {
      id: 4,
      title: "Thành phố thông minh: Xu hướng phát triển đô thị mới",
      image: "/placeholder.svg?height=100&width=150",
      publishTime: "2 ngày trước",
    },
    {
      id: 5,
      title: "Đầu tư công nghệ giao thông thông minh tại các thành phố lớn",
      image: "/placeholder.svg?height=100&width=150",
      publishTime: "3 ngày trước",
    },
  ]

  const comments = [
    {
      id: 1,
      author: "Nguyễn Minh C",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Dự án này thực sự cần thiết cho sự phát triển của đất nước. Hy vọng sẽ được triển khai hiệu quả.",
      time: "2 giờ trước",
      likes: 12,
    },
    {
      id: 2,
      author: "Lê Thị D",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Mong rằng việc thực hiện sẽ đúng tiến độ và chất lượng. Giao thông hiện tại quá tải rồi.",
      time: "3 giờ trước",
      likes: 8,
    },
    {
      id: 3,
      author: "Phạm Văn E",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Cần có sự giám sát chặt chẽ để tránh tình trạng chậm tiến độ như các dự án trước.",
      time: "4 giờ trước",
      likes: 15,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Bootstrap CSS and FontAwesome */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />



      <div className="container my-4">
        <div className="row">
          {/* Main Article Content */}
          <div className="col-lg-8">
            {/* Article Header */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className={`badge bg-${article.categoryColor} me-2`}>{article.category}</span>
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  {article.publishTime}
                </small>
              </div>

              <h1 className="display-5 fw-bold mb-3">{article.title}</h1>

              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    className="rounded-circle me-3"
                    alt="Author avatar"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <h6 className="mb-0">{article.author}</h6>
                    <small className="text-muted">Phóng viên</small>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <span className="me-3">
                    <i className="fas fa-eye me-1"></i>
                    {article.views} lượt xem
                  </span>
                  <div className="btn-group">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="fas fa-thumbs-up me-1"></i>
                      {article.likes}
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-comment me-1"></i>
                      {article.comments}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-4">
              <img
                src={article.image || "/placeholder.svg"}
                className="img-fluid rounded shadow-sm w-100"
                alt={article.title}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>

            {/* Article Content */}
            <div className="article-content mb-5">
              <div className="lead mb-4">{article.excerpt}</div>
              <div className="fs-6 lh-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h6>Từ khóa:</h6>
              <div>
                {article.tags.map((tag: string, index: number) => (
                  <span key={index} className="badge bg-light text-dark me-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Share - Circular Buttons */}
            <div className="border-top border-bottom py-4 mb-5">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h6 className="mb-0">Chia sẻ bài viết:</h6>
                </div>
                <div className="col-md-8">
                  <div className="d-flex justify-content-md-end gap-3">
                    <button
                      className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center social-btn"
                      style={{ width: "50px", height: "50px" }}
                      title="Facebook"
                    >
                      <i className="fab fa-facebook-f" style={{ fontSize: "18px" }}></i>
                    </button>
                    <button
                      className="btn btn-info rounded-circle d-flex align-items-center justify-content-center social-btn"
                      style={{ width: "50px", height: "50px" }}
                      title="Twitter"
                    >
                      <i className="fab fa-twitter" style={{ fontSize: "18px" }}></i>
                    </button>
                    <button
                      className="btn btn-success rounded-circle d-flex align-items-center justify-content-center social-btn"
                      style={{ width: "50px", height: "50px" }}
                      title="WhatsApp"
                    >
                      <i className="fab fa-whatsapp" style={{ fontSize: "18px" }}></i>
                    </button>
                    <button
                      className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center social-btn"
                      style={{ width: "50px", height: "50px" }}
                      title="Copy Link"
                    >
                      <i className="fas fa-link" style={{ fontSize: "18px" }}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-5">
              <h4 className="mb-4">
                <i className="fas fa-comments me-2"></i>
                Bình luận ({comments.length})
              </h4>

              {/* Comment Form */}
              <div className="card mb-4">
                <div className="card-body">
                  <h6>Để lại bình luận</h6>
                  <form>
                    <div className="mb-3">
                      <textarea className="form-control" rows={3} placeholder="Viết bình luận của bạn..."></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input type="text" className="form-control mb-2" placeholder="Tên của bạn" />
                      </div>
                      <div className="col-md-6">
                        <input type="email" className="form-control mb-2" placeholder="Email của bạn" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-paper-plane me-1"></i>Gửi bình luận
                    </button>
                  </form>
                </div>
              </div>

              {/* Comments List */}
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex">
                        <img
                          src={comment.avatar || "/placeholder.svg"}
                          className="rounded-circle me-3"
                          alt="Commenter avatar"
                          style={{ width: "50px", height: "50px" }}
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="mb-0">{comment.author}</h6>
                              <small className="text-muted">{comment.time}</small>
                            </div>
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="fas fa-thumbs-up me-1"></i>
                              {comment.likes}
                            </button>
                          </div>
                          <p className="mb-0">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Related Articles */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-newspaper me-2"></i>
                  Bài viết liên quan
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {relatedArticles.map((relatedArticle) => (
                    <a key={relatedArticle.id} href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex">
                        <img
                          src={relatedArticle.image || "/placeholder.svg"}
                          className="me-3 rounded"
                          alt="Related article"
                          style={{ width: "80px", height: "60px", objectFit: "cover" }}
                        />
                        <div>
                          <h6 className="mb-1">{relatedArticle.title}</h6>
                          <small className="text-muted">
                            <i className="fas fa-clock me-1"></i>
                            {relatedArticle.publishTime}
                          </small>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                  <i className="fas fa-envelope me-2"></i>
                  Đăng ký nhận tin
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text">Nhận tin tức mới nhất qua email</p>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Email của bạn" />
                  <button className="btn btn-success" type="button">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Advertisement */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h6 className="mb-0">
                  <i className="fas fa-bullhorn me-2"></i>
                  Quảng cáo
                </h6>
              </div>
              <div className="card-body text-center">
                <img src="/placeholder.svg?height=250&width=300" className="img-fluid rounded" alt="Advertisement" />
                <p className="mt-2 mb-0">
                  <small className="text-muted">Quảng cáo được tài trợ</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .article-content h3 {
          color: #2c3e50;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-content p {
          margin-bottom: 1.5rem;
          text-align: justify;
        }
        .article-content ul {
          margin-bottom: 1.5rem;
        }
        .article-content ul li {
          margin-bottom: 0.5rem;
        }
        .social-btn {
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .comments-list .card {
          transition: transform 0.2s;
        }
        .comments-list .card:hover {
          transform: translateX(5px);
        }
      `}</style>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
    </div>
  )
}
