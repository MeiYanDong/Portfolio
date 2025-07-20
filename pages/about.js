import Head from 'next/head'
import { GitHubIcon, XiaohongshuIcon, TwitterIcon, WechatIcon } from '../components/SocialIcons'

export default function About() {
  const skills = [
    { category: 'AIGC创作', items: ['ChatGPT', 'Midjourney', 'KLing', 'Cursor'] },
    { category: '自动化',   items: ['影刀RPA',  'Coze'] },
    { category: '生活技能', items: ['阅读书籍', '运动健身', '理财规划', '时间管理'] }
  ]

  const timeline = [
    { year: '2023中', event: '第一次暑假工家教，工资3000，转给父母朋友2000+' },
    { year: '2023下', event: '认知觉醒，开始广泛阅读书籍，微信读书与得到总时长1000+小时' },
    { year: '2023末', event: '开启定投BTC之旅，截止202507，收益率至100%+，出本金' },
    { year: '2024中', event: '完成人生首次半马' },
    { year: '2024下', event: '开始接触AI绘画和视频，开启AIGC创作' },
    { year: '2025初', event: 'AI之路继续深入：AI Agent、AI Coding等' },
    { year: '2025中', event: '成为 「YouWare」Founding Creator，并独立开发第一款产品：「习惯飞轮」' }
  ]

  return (
    <>
      <Head>
        <title>关于我 - 梅炎栋</title>
        <meta name="description" content="了解梅炎栋的成长历程、技能专长和人生理念" />
      </Head>

      <div className="container">
        {/* Hero 部分 */}
        <section className="about-hero">
          <div className="hero-content">
            <div className="avatar-large">
              <img src="/avatar.jpg" alt="梅炎栋" />
            </div>
            <div className="hero-text">
              <h1>关于我</h1>
              <p className="lead">
                我是梅炎栋，一个普通但不甘于平庸的大学生。<br/>
                相信通过持续学习和实践，每个人都能在自己的领域闪闪发光。
              </p>
            </div>
          </div>
        </section>

        {/* 个人理念 */}
        <section className="philosophy">
          <h2>我的理念</h2>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="icon">📚</div>
              <h3>终身学习</h3>
              <p>保持好奇心，持续学习新知识新技能，让自己始终处于成长状态。</p>
            </div>
            <div className="philosophy-card">
              <div className="icon">🎯</div>
              <h3>目标导向</h3>
              <p>设定明确目标，制定可行计划，用行动将想法变为现实。</p>
            </div>
            <div className="philosophy-card">
              <div className="icon">💡</div>
              <h3>创新实践</h3>
              <p>拥抱新技术，特别是AIGC领域，用创新思维解决实际问题。</p>
            </div>
            <div className="philosophy-card">
              <div className="icon">⚖️</div>
              <h3>平衡发展</h3>
              <p>技术学习、身体健康、财务规划并重，追求全面的个人发展。</p>
            </div>
          </div>
        </section>

        {/* 性格测试与个人特质 */}
        <section className="personality">
          <h2>性格测试与个人特质</h2>
          
          {/* 性格测试结果 */}
          <div className="personality-tests">
            <h3>性格测试结果</h3>
            <div className="tests-grid">
              <div className="test-card">
                <div className="test-label">MBTI性格测试</div>
                <div className="test-result">INTP</div>
                <div className="test-description">逻辑学家型人格</div>
              </div>
              <div className="test-card">
                <div className="test-label">霍兰德职业兴趣测试</div>
                <div className="test-result">ECR</div>
                <div className="test-description">主导兴趣: 企业</div>
              </div>
            </div>
          </div>

          {/* 个人特质 */}
          <div className="personality-traits">
            <h3>个人特质</h3>
            <div className="traits-grid">
              <div className="trait-card">
                <div className="trait-icon">🌅</div>
                <h4>乐观自信</h4>
                <p>总能于黑暗中见光明<br/>
                  因为黑夜无论怎样悠长，白昼总会到来</p>
              </div>
              <div className="trait-card">
                <div className="trait-icon">🔄</div>
                <h4>反思复盘</h4>
                <p>时刻反思当下，调整行为<br/>
                  周期性复盘生活，指导未来方向</p>
              </div>
              <div className="trait-card">
                <div className="trait-icon">💪</div>
                <h4>不抱怨，不后悔</h4>
                <p>知道自己无法穿越时空回到过去<br/>
                  所以宁愿抱怨后悔<br/>
                  不如从现在开始，端正态度，奋发图强<br/>
                  让未来的自己不会后悔当下的自己</p>
              </div>
            </div>
          </div>
        </section>

        {/* 技能专长 */}
        <section className="skills">
          <h2>技能专长</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-group">
                <h3>{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 成长时间线 */}
        <section className="timeline">
          <h2>成长历程</h2>
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 联系方式 */}
        <section className="contact-preview">
          <h2>让我们连接</h2>
          <p>如果你对我的项目感兴趣，或者想要交流学习心得，随时欢迎联系我！</p>
          <div className="contact-links">
            <a href="https://github.com/MeiYanDong" target="_blank" rel="noopener" className="contact-link">
              <GitHubIcon size={20} className="contact-icon" />
              <span>GitHub</span>
            </a>
            <a href="https://www.xiaohongshu.com/user/profile/64800729000000000f006c55" target="_blank" rel="noopener" className="contact-link">
              <XiaohongshuIcon size={20} className="contact-icon" />
              <span>小红书</span>
            </a>
            <a href="https://x.com/mei_yandon12585" target="_blank" rel="noopener" className="contact-link">
              <TwitterIcon size={20} className="contact-icon" />
              <span>推特</span>
            </a>
            <div className="contact-link">
              <WechatIcon size={20} className="contact-icon" />
              <span>微信: MYanDong-</span>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-hero {
          padding: 3rem 0 4rem;
          text-align: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .avatar-large {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--accent-purple);
          transition: transform 0.3s ease;
        }

        .avatar-large:hover {
          transform: rotate(5deg) scale(1.05);
        }

        .avatar-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-text h1 {
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lead {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .philosophy {
          margin: 4rem 0;
        }

        .philosophy h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .philosophy-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          text-align: center;
          transition: transform 0.2s ease;
        }

        .philosophy-card:hover {
          transform: translateY(-4px);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .philosophy-card h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .philosophy-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .personality {
          margin: 4rem 0;
        }

        .personality h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .personality-tests {
          margin-bottom: 3rem;
        }

        .personality-tests h3 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--accent-purple);
          font-size: 1.5rem;
        }

        .tests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .test-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          text-align: center;
          transition: transform 0.2s ease;
        }

        .test-card:hover {
          transform: translateY(-4px);
        }

        .test-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .test-result {
          font-size: 2rem;
          font-weight: bold;
          color: var(--accent-purple);
          margin-bottom: 0.5rem;
        }

        .test-description {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .personality-traits h3 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--accent-purple);
          font-size: 1.5rem;
        }

        .traits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .trait-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          text-align: center;
          transition: transform 0.2s ease;
        }

        .trait-card:hover {
          transform: translateY(-4px);
        }

        .trait-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .trait-card h4 {
          margin-bottom: 1rem;
          color: var(--text-primary);
          font-size: 1.25rem;
        }

        .trait-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .skills {
          margin: 4rem 0;
        }

        .skills h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-group {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .skill-group h3 {
          margin-bottom: 1.5rem;
          color: var(--accent-purple);
          border-bottom: 2px solid rgba(179, 157, 219, 0.2);
          padding-bottom: 0.5rem;
        }

        .skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-tag {
          background: rgba(179, 157, 219, 0.1);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          border: 1px solid rgba(179, 157, 219, 0.2);
        }

        .timeline {
          margin: 4rem 0;
        }

        .timeline h2 {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .timeline-list {
          max-width: 600px;
          margin: 0 auto;
        }

        .timeline-item {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .timeline-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .timeline-year {
          flex-shrink: 0;
          width: 80px;
          font-weight: 600;
          color: var(--accent-purple);
          font-size: 1.125rem;
        }

        .timeline-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .contact-preview {
          margin: 4rem 0 2rem;
          text-align: center;
        }

        .contact-preview h2 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .contact-preview p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 25px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .contact-link:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
          transform: translateY(-2px);
        }

        .contact-icon {
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .contact-link:hover .contact-icon {
          color: var(--accent-purple);
        }

        @media (max-width: 768px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .tests-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .traits-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .timeline-item {
            flex-direction: column;
            gap: 0.5rem;
          }

          .timeline-year {
            width: auto;
          }

          .contact-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  )
} 
