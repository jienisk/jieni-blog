var posts=["article/Cloudflare pages 搭建免费图床!/","article/常用快捷键/","article/用户中心管理系统/","article/前端知识点心得/","article/Web式云端电脑？/","article/hello-world copy/","article/博客配置/","article/为啥会焦虑？/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };