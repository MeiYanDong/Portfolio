import Link from 'next/link'
import { GitHubIcon, XiaohongshuIcon, TwitterIcon, JikeIcon } from './SocialIcons'

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* 导航栏 */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              Portfolio
            </Link>
            <div className="nav-links">
              <Link href="/">首页</Link>
              <Link href="/projects">项目</Link>
              <Link href="/about">关于</Link>
              <Link href="/contact">联系</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="main">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 Portfolio. 用心设计，极简至上。</p>
            <div className="social-links">
              <a href="https://github.com/MeiYanDong" target="_blank" rel="noopener" className="social-link">
                <GitHubIcon size={16} />
                <span>GitHub</span>
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/64800729000000000f006c55" target="_blank" rel="noopener" className="social-link">
                <XiaohongshuIcon size={16} />
                <span>小红书</span>
              </a>
              <a href="https://x.com/MYanDong1" target="_blank" rel="noopener" className="social-link">
                <TwitterIcon size={16} />
                <span>推特</span>
              </a>
              <a href="https://okjk.co/gjPeyX" target="_blank" rel="noopener" className="social-link">
                <JikeIcon size={16} />
                <span>即刻</span>
              </a>
              <span className="wechat">微信: MYanDong-</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .nav {
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-purple);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--text-secondary);
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .nav-links a:hover {
          color: var(--accent-purple);
        }

        .main {
          flex: 1;
          padding: 2rem 0;
        }

        .footer {
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
          padding: 2rem 0;
          margin-top: 4rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .social-link:hover {
          color: var(--accent-purple);
        }

        .wechat {
          color: var(--text-secondary);
          font-size: 0.875rem;
          padding: 0.25rem 0.75rem;
          background: var(--bg-primary);
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .nav-content {
            flex-direction: column;
            gap: 1rem;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .social-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
} 