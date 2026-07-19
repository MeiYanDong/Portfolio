import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Github,
  Mail,
  MessageCircle,
  Phone
} from 'lucide-react'
import profilesData from '../data/profiles.json'

export default function Contact() {
  const profile = profilesData[0]
  const [copied, setCopied] = useState('')

  const contactMethods = [
    {
      id: 'email',
      icon: Mail,
      label: '邮箱',
      value: profile.contact.email,
      note: '岗位、实习与项目沟通',
      href: profile.contact.emailHref
    },
    {
      id: 'phone',
      icon: Phone,
      label: '电话',
      value: profile.contact.phone,
      note: '需要即时沟通时使用',
      href: profile.contact.phoneHref
    },
    {
      id: 'wechat',
      icon: MessageCircle,
      label: '微信',
      value: profile.contact.wechat,
      note: '添加时请注明来意'
    },
    {
      id: 'github',
      icon: Github,
      label: 'GitHub',
      value: profile.contact.github,
      note: '查看代码、提交与开源项目',
      href: profile.contact.githubHref,
      external: true
    },
    {
      id: 'twitter',
      icon: ExternalLink,
      label: '推特',
      value: profile.contact.twitter,
      note: 'AI、产品与 Web3 记录',
      href: profile.contact.twitterHref,
      external: true
    },
    {
      id: 'xiaohongshu',
      icon: ExternalLink,
      label: '小红书',
      value: 'MYanDong',
      note: 'AI 工具与内容实践',
      href: 'https://www.xiaohongshu.com/user/profile/64800729000000000f006c55',
      external: true
    }
  ]

  const copyToClipboard = async (value, id) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(id)
      window.setTimeout(() => setCopied(''), 1800)
    } catch (error) {
      setCopied('')
    }
  }

  return (
    <>
      <Head>
        <title>联系 - 梅炎栋</title>
        <meta
          name="description"
          content="联系梅炎栋，沟通 AI 内容运营、AI 产品内容、Vibe Coding 与内容自动化相关机会。"
        />
      </Head>

      <main className="contact-shell">
        <section className="contact-hero">
          <div>
            <p className="contact-kicker">联系</p>
            <h1>一起把想法做成内容与系统。</h1>
            <p>
              我正在寻找 AI 内容运营、AI 产品内容与内容自动化相关的实习机会。请优先通过邮箱或微信联系，并简单说明岗位或合作背景。
            </p>
          </div>
          <div className="contact-availability">
            <span>到岗安排</span>
            <strong>{profile.availability}</strong>
            <small>{profile.education}</small>
          </div>
        </section>

        <section className="contact-methods" aria-label="联系方式">
          <div className="contact-section-heading">
            <span>公开联系方式</span>
            <strong>{contactMethods.length} 种联系与主页入口</strong>
          </div>
          <div className="contact-list">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.id} className="contact-row">
                  <Icon size={20} />
                  <div>
                    <span>{method.label}</span>
                    <strong>{method.value}</strong>
                  </div>
                  <p>{method.note}</p>
                  <div className="contact-row-actions">
                    {method.href && (
                      <a
                        href={method.href}
                        target={method.external ? '_blank' : undefined}
                        rel={method.external ? 'noopener noreferrer' : undefined}
                        title={`打开${method.label}`}
                        aria-label={`打开${method.label}`}
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => copyToClipboard(method.value, method.id)}
                      title={`复制${method.label}`}
                      aria-label={`复制${method.label}`}
                    >
                      {copied === method.id ? <Check size={17} /> : <Copy size={17} />}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="contact-context">
          <div className="contact-section-heading">
            <span>适合沟通</span>
            <h2>我可以参与的工作</h2>
          </div>
          <div className="contact-topic-list">
            <div>
              <span>01</span>
              <strong>AI 工具内容运营</strong>
              <p>选题、研究、内容制作、平台发布、数据复盘和用户教育。</p>
            </div>
            <div>
              <span>02</span>
              <strong>AI 产品内容</strong>
              <p>把复杂能力转化为用户能理解、能选择、能上手的内容。</p>
            </div>
            <div>
              <span>03</span>
              <strong>内容自动化</strong>
              <p>用 Prompt、Skill 与脚本提升素材整理、生产和发布准备效率。</p>
            </div>
          </div>
        </section>

        <section className="contact-documents">
          <div>
            <span>先了解我的工作</span>
            <h2>岗位档案与简历</h2>
            <p>岗位档案展开能力、案例和相关项目；PDF 简历便于直接下载、转发或进入招聘流程。</p>
          </div>
          <div>
            <Link href="/profiles/ai-content-operations">
              <FileText size={18} />
              <span>
                AI 内容运营岗位档案
                <small>能力、案例、项目与协作方式</small>
              </span>
              <ArrowUpRight size={17} />
            </Link>
            <a href={profile.resume.file} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              <span>
                PDF 简历
                <small>{profile.resume.label}</small>
              </span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .contact-shell {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        .contact-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 4rem;
          align-items: end;
          padding: 4.5rem 0 3rem;
          border-bottom: 1px solid var(--border-color);
        }

        .contact-kicker,
        .contact-section-heading > span,
        .contact-availability > span,
        .contact-documents > div:first-child > span {
          color: var(--accent-purple);
          font-size: 0.74rem;
          font-weight: 800;
        }

        .contact-hero h1 {
          max-width: 850px;
          margin-top: 0.6rem;
          font-size: 4.5rem;
          line-height: 1;
        }

        .contact-hero > div:first-child > p:last-child {
          max-width: 720px;
          color: var(--text-secondary);
          line-height: 1.85;
        }

        .contact-availability {
          display: grid;
          min-width: 0;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .contact-availability strong {
          margin-top: 0.4rem;
        }

        .contact-availability small {
          color: var(--text-secondary);
          font-size: 0.74rem;
        }

        .contact-methods,
        .contact-context {
          padding: 4.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .contact-section-heading {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .contact-section-heading h2 {
          margin: 0;
          font-size: 2.5rem;
        }

        .contact-section-heading > strong {
          font-size: 0.8rem;
        }

        .contact-list {
          border-bottom: 1px solid var(--border-color);
        }

        .contact-row {
          display: grid;
          grid-template-columns: 38px 230px minmax(0, 1fr) auto;
          gap: 1rem;
          align-items: center;
          min-width: 0;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
        }

        .contact-row > svg {
          color: var(--accent-purple);
        }

        .contact-row > div:nth-child(2) {
          display: grid;
          min-width: 0;
        }

        .contact-row > div:nth-child(2) span {
          color: var(--text-secondary);
          font-size: 0.72rem;
        }

        .contact-row > div:nth-child(2) strong {
          overflow-wrap: anywhere;
          font-size: 0.9rem;
        }

        .contact-row > p {
          max-width: none;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .contact-row-actions {
          display: flex;
          gap: 0.45rem;
        }

        .contact-row-actions a,
        .contact-row-actions button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-secondary);
          background: transparent;
          cursor: pointer;
        }

        .contact-row-actions a:hover,
        .contact-row-actions button:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
        }

        .contact-context {
          display: grid;
          grid-template-columns: minmax(240px, 0.65fr) minmax(0, 1.35fr);
          gap: 4rem;
        }

        .contact-context .contact-section-heading {
          display: block;
        }

        .contact-context .contact-section-heading h2 {
          margin-top: 0.5rem;
        }

        .contact-topic-list {
          border-bottom: 1px solid var(--border-color);
        }

        .contact-topic-list > div {
          display: grid;
          grid-template-columns: 46px 190px minmax(0, 1fr);
          gap: 1rem;
          align-items: baseline;
          padding: 1.15rem 0;
          border-top: 1px solid var(--border-color);
        }

        .contact-topic-list > div > span {
          color: var(--accent-purple);
          font-size: 0.76rem;
          font-weight: 800;
        }

        .contact-topic-list p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.84rem;
          line-height: 1.7;
        }

        .contact-documents {
          display: grid;
          grid-template-columns: minmax(260px, 0.65fr) minmax(0, 1.35fr);
          gap: 4rem;
          padding: 4.5rem 0 1rem;
        }

        .contact-documents h2 {
          margin-top: 0.5rem;
          font-size: 2.5rem;
        }

        .contact-documents p {
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .contact-documents > div:last-child {
          border-bottom: 1px solid var(--border-color);
        }

        .contact-documents > div:last-child > * {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.75rem;
          align-items: center;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          color: inherit;
        }

        .contact-documents > div:last-child > *:hover {
          color: var(--accent-purple);
        }

        .contact-documents > div:last-child span {
          display: grid;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .contact-documents > div:last-child small {
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 500;
        }

        @media (max-width: 860px) {
          .contact-hero,
          .contact-context,
          .contact-documents {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 720px) {
          .contact-shell {
            padding: 0 1rem 4rem;
          }

          .contact-hero {
            padding: 2.5rem 0 2rem;
          }

          .contact-hero h1 {
            font-size: 2.75rem;
          }

          .contact-methods,
          .contact-context,
          .contact-documents {
            padding: 3.5rem 0;
          }

          .contact-section-heading h2,
          .contact-documents h2 {
            font-size: 1.9rem;
          }

          .contact-row {
            grid-template-columns: 28px minmax(0, 1fr) auto;
            gap: 0.75rem;
          }

          .contact-row > p {
            grid-column: 2 / -1;
          }

          .contact-row-actions {
            grid-column: 3;
            grid-row: 1;
          }

          .contact-topic-list > div {
            grid-template-columns: 36px minmax(0, 1fr);
            gap: 0.75rem;
          }

          .contact-topic-list p {
            grid-column: 2;
          }
        }
      `}</style>
    </>
  )
}
