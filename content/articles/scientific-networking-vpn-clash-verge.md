---
title: 科学上网：购买 VPN 与配置 Clash Verge
summary: 从购买流量包、复制订阅链接，到在 Clash Verge 里管理订阅、测试节点和开启系统代理的完整流程。
date: 2026-07-06
topics: 科学上网
tags: VPN, SakuraCat, Clash Verge, 系统代理
series: scientific-networking
seriesOrder: 1
cover: /articles/scientific-networking/vpn-01-package.png
---

# 科学上网：购买 VPN 与配置 Clash Verge

这篇记录最小可用流程：先购买可用的代理服务，再把订阅导入代理客户端，最后通过系统代理让电脑接入外网。

## 一、购买 VPN

注册并登录 [SakuraCat](https://sakuracat-003.com/register?code=CzGXThKV)。

进入购买页面后，点击「不限时套餐」，购买「中量不限时流量包」。

![SakuraCat 不限时套餐购买页面](/articles/scientific-networking/vpn-01-package.png)

购买完成后回到主页，点击「复制订阅链接」。这个订阅链接后面会导入到代理客户端里。

![复制订阅链接入口](/articles/scientific-networking/vpn-02-subscription-link.png)

## 二、安装代理客户端

下载 [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/release) 最新版本。

如果暂时无法访问 GitHub，可以通过备用文档下载对应安装包：

[Clash Verge 安装包备用链接](https://my.feishu.cn/docx/GoOSdzlAhoCuiWxDTTAcJnQhnGc?from=from_copylink)

## 三、导入订阅并选择节点

在 Clash Verge 里，「订阅」页面用于管理订阅。把刚才复制的订阅链接添加进去。

![Clash Verge 订阅页面](/articles/scientific-networking/vpn-03-subscriptions-page.png)

「代理」页面用于测试延迟和选择节点。一般来说，延迟数值越低，连接越快，体验也越稳定。

![Clash Verge 代理页面](/articles/scientific-networking/vpn-04-proxy-page.png)

## 四、开启系统代理

进入「设置」页面，日常使用时打开「系统代理」即可。

「虚拟网卡模式」一般保持关闭。它默认是灰色状态，如果确实要使用，需要额外安装。

关机前建议先关闭「系统代理」。否则有概率出现开机后无线网异常，只能重新打开系统代理才能恢复网络。

![Clash Verge 设置页面](/articles/scientific-networking/vpn-05-settings-page.png)
