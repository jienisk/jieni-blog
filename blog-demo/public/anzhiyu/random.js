var posts=["article/Cloudflare pages 搭建免费图床!/","article/视频去水印/","article/AI答题-react/","article/搭建无尽免费代理节点/","article/常用快捷键/","article/前端知识点心得/","article/Web式云端电脑？/","article/为啥会焦虑？/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };