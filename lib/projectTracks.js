export const projectTrackOrder = ['web2', 'web3']

export const projectTracks = {
  web2: {
    id: 'web2',
    label: 'Web2',
    title: '产品、内容与 AI 自动化',
    shortTitle: '产品与内容',
    href: '/projects/web2',
    description:
      '围绕真实用户、内容生产与工作流程，把需求转化为可运行产品、可复用方法和可验证结果。',
    metaDescription: '梅炎栋的 Web2 项目：AI 内容运营、产品工作台、智能体系统与个人效率工具。'
  },
  web3: {
    id: 'web3',
    label: 'Web3',
    title: '链上策略与自动化系统',
    shortTitle: '链上策略',
    href: '/projects/web3',
    description: '围绕市场机会、策略判断、链上执行与风险边界，展示从发现问题到真实证据的完整路径。',
    metaDescription: '梅炎栋的 Web3 项目：预测市场、链上雷达、多钱包工作台与自动化监控。'
  }
}

export function getProjectTrack(track) {
  return projectTracks[track] || projectTracks.web2
}

export function getTrackProjects(projects, track) {
  return projects
    .filter((project) => project.track === track)
    .sort((a, b) => (a.trackOrder || 999) - (b.trackOrder || 999))
}
