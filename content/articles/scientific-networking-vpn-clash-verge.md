---
title: 科学上网：购买 VPN 与配置 Clash Verge
summary: 从白月光、SakuraCat 的购买与订阅，到在 Clash Verge 里管理订阅、测试节点和开启系统代理的完整流程。
date: 2026-07-06
topics: 科学上网
tags: VPN, 白月光, SakuraCat, Clash Verge, 系统代理
series: scientific-networking
seriesOrder: 1
cover: /articles/scientific-networking/vpn-baiyueguang-01-package.png
---

## 一、购买 VPN

## 01 首选：白月光
优势：网络稳定、IP 干净

注册、登录 [白月光](https://www.sibker.com/register?invite_code=pen2jYoo)
完成之后，点击左侧栏目中 「套餐商店」
选择 66/季 这个套餐，折合成每个月 22 元

> 不嫌麻烦的，先注册一个 A 账户，在 A 账户的「邀请返利」栏目下生成一个邀请链接，再通过这个邀请链接注册 B 账户，通过 B 账户购买套餐，A 账户可以获得 20% 的返佣，即 8 折购买

![image.png](/articles/scientific-networking/vpn-baiyueguang-01-package.png)

购买完成之后，回到「订阅管理」页面，点击「复制通用订阅链接」

![image.png](/articles/scientific-networking/vpn-baiyueguang-02-subscription.png)

## 02 备选：SakuraCat
优势：流量较多，高性价比
劣势：网络最近不稳定

注册、登录 [SakuraCat](https://sakuracat-003.com/register?code=CzGXThKV)

来到购买页面，点击「不限时套餐」，购买「中量不限时流量包」

![image.png](/articles/scientific-networking/vpn-01-package.png)

购买完成之后，回到主页，点击「复制订阅链接」

![image.png](/articles/scientific-networking/vpn-02-subscription-link.png)

## 二、安装代理客户端

下载 [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/release) 最新版本（若无法访问，可通过下方链接，直接下载对应安装包）

[https://my.feishu.cn/docx/GoOSdzlAhoCuiWxDTTAcJnQhnGc?from=from_copylink](https://my.feishu.cn/docx/GoOSdzlAhoCuiWxDTTAcJnQhnGc?from=from_copylink)

「订阅页面」：管理订阅

![image.png](/articles/scientific-networking/vpn-03-subscriptions-page.png)

「代理页面」：测试延迟、选择节点（数值越低，延迟越低，网速越快）

![image.png](/articles/scientific-networking/vpn-04-proxy-page.png)

「设置页面」

1. 使用过程，打开「系统代理」即可
2. 「虚拟网卡模式」一般默认关闭就行
    1. 默认是灰色状态，需要安装

Tip：电脑关机前需要关闭「系统代理」，否则有概率开机后，无线网失效（必须开着系统代理才能使用）

![image.png](/articles/scientific-networking/vpn-05-settings-page.png)
