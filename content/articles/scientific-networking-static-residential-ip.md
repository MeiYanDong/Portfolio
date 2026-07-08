---
title: 科学上网进阶：静态住宅
summary: Claude 对 IP 管控很严，一般的节点不行，得配上静态住宅 IP。
date: 2026-07-07
topics: 科学上网, 代理配置, AI 工具
tags: Claude, 静态住宅 IP, Clash Verge, FlClash, 智能分流
series: scientific-networking
seriesOrder: 2
cover: /articles/scientific-networking/static-ip-01-purchase.png
---

# 科学上网进阶：静态住宅（应对 ChatGPT、Claude 等 AI 软件封号）

阅读前，先完成 [科学上网：节点配置](https://www.notion.so/32bad7f2aeaa80fca694ee0d36a79892?pvs=24)

### 客户端

Claude 对 IP 管控很严，一般的节点不行，得配上静态住宅 IP

先通过节点将网络从国内翻到国外，再借助 静态住宅 IP 将网络落在某个居民 IP，模拟真实居民的使用。

注册、登录 [Kookeey](https://www.kookeey.net/clientarea/#/dashboard)

「静态住宅（ISP）代理」页面，选择美国，洛杉矶，确认购买即可

![Image 1: image.png](/articles/scientific-networking/static-ip-01-purchase.png)

购买成功之后，获取四个数据，

1. 服务器地址
2. 端口号
3. 账号
4. 密码

![Image 2: image.png](/articles/scientific-networking/static-ip-02-credentials.png)

有了静态还不够，由于静态住宅的网速有限，且除了 ChatGPT、Gemini、Claude 等对 IP 严格，需要用上静态住宅 IP，其余的像 YouTube、一般的国外网页都不需要静态，普通的节点就行了。

所以将两者分开，一是普通节点延迟低，速度更快，体验更好；二是不要和 AI 工具去挤静态住宅的宽带，影响速度。

所以，通过一个「智能分流」的脚本，将两者分开

> 转自知识星球内部分享

将「[Clash Verge增强脚本_分享版.js](https://drive.google.com/file/d/1Cc21srqD1K0Xa88FnWWGzmlagsbGztSL/view?usp=sharing)」文件中的两处地方替换成你「静态住宅」真实数值，修改好后 Ctrl + A 全选复制

![Image 3: image.png](/articles/scientific-networking/static-ip-03-routing-script.png)

打开 Clash Verge → 订阅页面 → 选中订阅 → 右键 → 点击拓展脚本 → 粘贴进去（覆盖掉原有的代码）

![Image 4: image.png](/articles/scientific-networking/static-ip-04-clash-script-entry.png)

### 手机端

下载 [FlClash](https://github.com/chen08209/flclash/releases) 最新版本（无法访问，可通过下方链接，直接下载对应安装包）

[https://my.feishu.cn/docx/GoOSdzlAhoCuiWxDTTAcJnQhnGc?from=from_copylink](https://my.feishu.cn/docx/GoOSdzlAhoCuiWxDTTAcJnQhnGc?from=from_copylink)

将「[Clash通用增强配置_分享版本.yaml](https://drive.google.com/file/d/1VsGNXrQqc_7IHmMSVgWcrQwn0q6HR-pK/view?usp=sharing)」文件中的三处地方替换成你的真实数据，修改好后保存文件，发到手机上

![Image 5: image.png](/articles/scientific-networking/static-ip-05-flclash-download.png)

手机上打开 FlClash → 底部导航栏来到「配置」页面 → 点击右下角的「添加配置」 → 点击 文件（直接上传配置文件） → 找到我们刚才配置好发送到手机上的文件 → 成功
