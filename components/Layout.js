import Link from 'next/link'
import { GitHubIcon, XiaohongshuIcon, TwitterIcon, JikeIcon } from './SocialIcons'

const navigation = [
  { label: '首页', href: '/' },
  { label: '项目', href: '/projects' },
  { label: '案例', href: '/cases' },
  { label: '文章', href: '/articles' },
  { label: '关于', href: '/about' },
  { label: '联系', href: '/contact' }
]

export default function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="nav" aria-label="主导航">
        <div className="nav-shell">
          <Link href="/" className="logo" aria-label="梅炎栋个人网站首页">
            梅炎栋
          </Link>
          <div className="nav-links">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="main">{children}</div>

      <footer className="footer">
        <div className="footer-shell">
          <div className="footer-brand">
            <strong>梅炎栋</strong>
            <span>AI 内容运营 / Vibe Coding</span>
            <a href="mailto:2557900463@qq.com">2557900463@qq.com</a>
          </div>
          <div className="social-links">
            <a href="https://github.com/MeiYanDong" target="_blank" rel="noopener noreferrer" className="social-link">
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a href="https://www.xiaohongshu.com/user/profile/64800729000000000f006c55" target="_blank" rel="noopener noreferrer" className="social-link">
              <XiaohongshuIcon size={16} />
              <span>小红书</span>
            </a>
            <a href="https://x.com/MYanDong1" target="_blank" rel="noopener noreferrer" className="social-link">
              <TwitterIcon size={16} />
              <span>推特</span>
            </a>
            <a href="https://okjk.co/gjPeyX" target="_blank" rel="noopener noreferrer" className="social-link">
              <JikeIcon size={16} />
              <span>即刻</span>
            </a>
            <span className="wechat">微信：MYanDong-</span>
          </div>
          <p className="copyright">&copy; 2026 梅炎栋</p>
        </div>
      </footer>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border-color);
          background: rgba(15, 15, 15, 0.9);
          backdrop-filter: blur(16px);
        }

        .nav-shell,
        .footer-shell {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem;
        }

        .nav-shell {
          display: flex;
          gap: 2rem;
          align-items: center;
          justify-content: space-between;
          min-height: 64px;
        }

        .logo {
          flex: 0 0 auto;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 800;
        }

        .logo:hover {
          color: var(--accent-purple);
        }

        .nav-links {
          display: flex;
          gap: 1.75rem;
          align-items: center;
          min-width: 0;
        }

        .nav-links a {
          flex: 0 0 auto;
          color: var(--text-secondary);
          font-size: 0.84rem;
          font-weight: 600;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .main {
          flex: 1;
          min-width: 0;
          padding: 2rem 0;
        }

        .footer {
          margin-top: 4rem;
          border-top: 1px solid var(--border-color);
          background: rgba(18, 18, 18, 0.92);
        }

        .footer-shell {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) auto auto;
          gap: 2.5rem;
          align-items: end;
          padding-top: 2.5rem;
          padding-bottom: 2.5rem;
        }

        .footer-brand {
          display: grid;
          gap: 0.18rem;
        }

        .footer-brand strong {
          font-size: 0.95rem;
        }

        .footer-brand span,
        .footer-brand a,
        .copyright {
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.25rem;
          align-items: center;
          justify-content: flex-end;
        }

        .social-link {
          display: inline-flex;
          gap: 0.4rem;
          align-items: center;
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .social-link:hover {
          color: var(--accent-purple);
        }

        .wechat {
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .copyright {
          margin: 0;
          white-space: nowrap;
        }

        @media (max-width: 860px) {
          .footer-shell {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            align-items: start;
          }

          .social-links {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .nav-shell,
          .footer-shell {
            padding-right: 1rem;
            padding-left: 1rem;
          }

          .nav-shell {
            gap: 1rem;
          }

          .nav-links {
            gap: 1.15rem;
            overflow-x: auto;
            padding: 0.7rem 0;
            scrollbar-width: none;
          }

          .nav-links::-webkit-scrollbar {
            display: none;
          }

          .nav-links a {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}
