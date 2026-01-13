import Head from 'next/head'
import { useState } from 'react'
import { GitHubIcon, XiaohongshuIcon, TwitterIcon, WechatIcon, JikeIcon } from '../components/SocialIcons'
import { Bot, TrendingUp, Wallet, Mail, Target } from 'lucide-react'

export default function Contact() {
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    })
  }

  const contactMethods = [
    {
      icon: <GitHubIcon size={48} className="social-icon" />,
      title: 'GitHub',
      description: '查看我的代码和项目',
      value: 'MeiYanDong',
      link: 'https://github.com/MeiYanDong',
      copyText: 'MeiYanDong'
    },
    {
      icon: <XiaohongshuIcon size={48} className="social-icon" />,
      title: '小红书',
      description: '分享AI绘画和视频',
      value: 'MYanDong',
      link: 'https://www.xiaohongshu.com/user/profile/64800729000000000f006c55',
      copyText: 'MYanDong'
    },
    {
      icon: <TwitterIcon size={48} className="social-icon" />,
      title: '推特',
      description: 'AI x Web3 成长分享',
      value: '@MYanDong1',
      link: 'https://x.com/MYanDong1',
      copyText: 'MYanDong1'
    },
    {
      icon: <JikeIcon size={48} className="social-icon" />,
      title: '即刻',
      description: '分享个人思考和生活感悟',
      value: '即刻主页',
      link: 'https://okjk.co/gjPeyX',
      copyText: 'https://okjk.co/gjPeyX'
    },
    {
      icon: <WechatIcon size={48} className="social-icon" />,
      title: '微信',
      description: '深度交流和合作洽谈',
      value: 'MYanDong-',
      copyText: 'MYanDong-'
    }
  ]

  return (
    <>
      <Head>
        <title>联系我 - 梅炎栋</title>
        <meta name="description" content="通过多种方式与梅炎栋取得联系，交流学习心得或合作机会" />
      </Head>

      <div className="container">
        {/* Hero 部分 */}
        <section className="contact-hero">
          <h1>联系我</h1>
          <p className="hero-text">
            很高兴能与你连接！无论是技术交流、学习心得分享，还是项目合作，<br/>
            我都很乐意与志同道合的朋友深入交流。
          </p>
        </section>

        {/* 联系方式卡片 */}
        <section className="contact-methods">
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p className="contact-description">{method.description}</p>
                <div className="contact-value">{method.value}</div>
                <div className="contact-actions">
                  {method.link && (
                    <a 
                      href={method.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      访问
                    </a>
                  )}
                  <button 
                    onClick={() => copyToClipboard(method.copyText, method.title)}
                    className="btn btn-copy"
                  >
                    {copied === method.title ? '已复制!' : '复制'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 交流主题 */}
        <section className="topics">
          <h2>我们可以聊什么？</h2>
          <div className="topics-grid">
            <div className="topic-card">
              <div className="topic-icon"><Bot size={32} /></div>
              <h3>AIGC创作</h3>
              <p>人工智能在内容创作中的应用、工具使用心得、创作技巧分享</p>
            </div>
            <div className="topic-card">
              <div className="topic-icon"><TrendingUp size={32} /></div>
              <h3>个人成长</h3>
              <p>习惯养成、目标管理、时间规划、自我提升的心得体会</p>
            </div>
            <div className="topic-card">
              <div className="topic-icon"><Wallet size={32} /></div>
              <h3>理财投资</h3>
              <p>定投策略、资产配置、理财规划、投资心理学探讨</p>
            </div>
          </div>
        </section>

        {/* 回复时间说明 */}
        <section className="response-info">
          <div className="info-card">
            <h3><Mail size={20} style={{display: 'inline', marginRight: '8px', verticalAlign: 'middle'}} />回复时间</h3>
            <p>
              我通常会在24小时内回复消息。如果是紧急事务，
              建议通过微信联系，我会尽快回复。
            </p>
          </div>
          <div className="info-card">
            <h3><Target size={20} style={{display: 'inline', marginRight: '8px', verticalAlign: 'middle'}} />最佳联系方式</h3>
            <p>
              <strong>深度合作</strong>：微信联系
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        .contact-hero {
          text-align: center;
          padding: 3rem 0 4rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-hero h1 {
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-text {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .contact-methods {
          margin-bottom: 4rem;
        }

        .methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .contact-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px var(--shadow);
        }

        .contact-icon {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .social-icon {
          color: var(--accent-purple);
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .contact-card:hover .social-icon {
          color: #D1C4E9;
          transform: scale(1.1);
        }

        .contact-card h3 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .contact-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .contact-value {
          color: var(--accent-purple);
          font-weight: 500;
          font-family: 'Monaco', 'Menlo', monospace;
          background: rgba(179, 157, 219, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .contact-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--accent-purple);
          color: var(--accent-purple);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-outline:hover {
          background: var(--accent-purple);
          color: var(--bg-primary);
        }

        .btn-copy {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-copy:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
        }

        .topics {
          margin-bottom: 4rem;
        }

        .topics h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .topic-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: border-color 0.2s ease;
        }

        .topic-card:hover {
          border-color: var(--accent-purple);
        }

        .topic-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent-purple);
        }

        .topic-card h3 {
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .topic-card p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .response-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .info-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .info-card h3 {
          margin-bottom: 1rem;
          color: var(--accent-purple);
        }

        .info-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .methods-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .topics-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .response-info {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
} 
