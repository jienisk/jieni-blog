---
layout: cloudflare
title: Cloudflare pages 搭建免费图床!
date: 2025-07-27 00:24:17
cover:
updated:
tags: 
  - 技术
categories: 技术类别
keywords:
description:
top: 1
top_img:
comments:
toc: 
toc_number: 
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
ai:
---

# Cloudflare pages 搭建免费图床! 享受 Telegram 的无限空间

由于原有的Telegraph API接口被官方关闭，需要将上传渠道切换至Telegram Channel，请按照文档中的部署要求设置<mark>TG_Bot_Token</mark>和<mark>TG_Chat_ID</mark>，否则将无法正常使用上传功能。

## 如何获取`Telegram`的<mark>Bot_Token</mark>和<mark>Chat_ID</mark>

如果您还没有Telegram账户，请先创建一个。接着，按照以下步骤操作以获取<mark>BOT_TOKEN</mark>和<mark>CHAT_ID</mark>：

1.获取<mark>BOT_TOKEN</mark>

  - 在Telegram中，向@BotFather发送命令/newbot，根据提示依次输入您的机器人名称和用户名。成功创建机器人后，您将会收到一个BOT_TOKEN，用于与Telegram API进行交互。

  ![图片](https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADBmiFGIPZ2Jixr2ymRH0ROMyB1UvVAALHwjEb6w8pVHJprcjeFTihAQADAgADeAADNgQ.png)  

2.设置机器人为频道管理员
  - 创建一个新的频道（Channel），进入该频道后，选择频道设置。将刚刚创建的机器人添加为频道管理员，这样机器人才能发送消息。

  ![图片](https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADB2iFGS5aSynp5fbOw2F6mtWQNNn8AALIwjEb6w8pVAgpIMkU3tygAQADAgADeAADNgQ.png)  

  ![图片](https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADCGiFGXnfPjyc_Y2o94mu_vPaQTHaAALJwjEb6w8pVI07mTPn881tAQADAgADeQADNgQ.png) 

  3.获取 <mark>chat_ID</mark>
    - 通过<mark>@VersaToolsBot</mark>获取您的频道ID。向该机器人发送消息，按照指示操作，最后您将得到<mark>CHAT_ID</mark>（即频道的ID）。
    - 或者通过@GetTheirIDBot获取您的频道ID。向该机器人发送消息，按照指示操作，最后您将得到CHAT_ID（即频道的ID）。

  ![图片](https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADCWiQ2LDIjYergFSk97ZpLUKrE0EdAAJ1yTEbMbKIVN_1cAnqIHVKAQADAgADeAADNgQ.png)

  最后去Cloudflare Pages后台设置相关的环境变量（注：修改环境变量后，需要重新部署才能生效）

  | 环境变量 | 示例值 | 说明 |
  |:-------:|:-------:|:-------:|
  | TG_Bot_Token  | 123468:AAxxxGKrn5   | 从@BotFather获取的Telegram Bot Token。  |
  | TG_Chat_ID  | -1234567  | 频道的ID，确保TG Bot是该频道或群组的管理员。  |

## 如何部署
### 提前准备

  你唯一需要提前准备的就是一个<mark>Cloudflare</mark>账户，如果你还没有，请先注册一个。

  ### 部署教程：
  简单3步，即可部署本项目，拥有自己的图床

  1.下载或Fork本仓库 (注意：目前请使用fork) [【仓库链接】](https://github.com/cf-pages/Telegraph-Image)
  
  2.打开Cloudflare Dashboard，进入Pages管理页面，选择创建项目，如果在第一步中选择的是fork本仓库，则选择`连接到 Git 提供程序`，如果第一步中选择的是下载本仓库则选择`直接上传` 

  ![图片](https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADCmiQ33qFa_AzNIGUVZ7WrSp7WFnBAAKGyTEbMbKIVGNcpNiiFTBMAQADAgADeQADNgQ.png)

  3.按照页面提示输入项目名称，选择需要连接的git仓库（第一步选择的是fork）或是上传刚刚下载的仓库文件（第一步选择的是下载本仓库），点击`部署站点`即可完成部署
  
  ### 特性

  1.无限图片储存数量，你可以上传不限数量的图片

  2.无需购买服务器，托管于Cloudflare的网络上，当使用量不超过Cloudflare的免费额度时，完全免费

  3.无需购买域名，可以使用Cloudflare Pages提供的`*.pages.dev`的免费二级域名，同时也支持绑定自定义域名

  4.支持图片审查API，可根据需要开启，开启后不良图片将自动屏蔽，不再加载

  5.支持后台图片管理，可以对上传的图片进行在线预览，添加白名单，黑名单等操作

  ### 绑定自定义域名

  在pages的自定义域里面，绑定cloudflare中存在的域名，在cloudflare托管的域名，自动会修改dns记录 

  ![图片](https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADC2iQ4JplNukEqbHiF0wn8sacV9JrAAKHyTEbMbKIVLwGKUtYn9UYAQADAgADeQADNgQ.png)

  ### 限制

  1.由于图片文件实际存储于Telegraph，Telegraph限制上传的图片大小最大为5MB

  2.由于使用Cloudflare的网络，图片的加载速度在某些地区可能得不到保证

  3.Cloudflare Function免费版每日限制100,000个请求（即上传或是加载图片的总次数不能超过100,000次）, 正常使用已经足够！

  ---
  
  ✧･ﾟ: *✧･ﾟ:*  **END**    *:･ﾟ✧*:･ﾟ✧
  


