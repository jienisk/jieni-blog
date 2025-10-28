---
title: AI 答题平台（前端）
cover: https://telegraph-image-dp7.pages.dev/file/AgACAgUAAyEGAASgAAGGzAADFmkBFilJ_KRy_pQPhvP6wf2CdbaCAAIyDWsbkrQIVJaZqeqUIDinAQADAgADeAADNgQ.jpg
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-09-23 05:29:04
updated:
tags:
categories:
keywords:
description:
top:
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


# 从0到1建造AI答题平台（前端）

利用 vite 创建前端工程
```
npm create vite@latest my-app
```

引入arco-design框架
```
npm i @arco-design/web-react
```

引入reaact=router
```
npm i react-router-dom
```

先在`main.tsx`里面用严格模式+BrowserRouter包裹
```
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

先创建GlobalHeader.ts，在arco-design组件库里找到合适组件，然后修改，这里需要引入routes.ts，我们需要对routes里面设置的路由信息做解析，可以用map方法遍历渲染到导航栏上，然后去定义方法，先定义useLocation，再用里面的pathname去获取url，然后把location.pathname赋值给一个变量，然后在return里面用selectedKeys = {你定义的变量}去让组件显示出被选中的状态高亮，这里在map遍历时的routes属性要注意ts的类型转换，还要做一些条件判断，避免/和/home出现选中出错问题，最后导出组件即可。

然后创建BasicLayout.tsx组件，作为基础布局，在arco-design组件库里找到合适组件，然后修改，可以使用`useRoutes(routes)`方法渲染出路由。可以创建index.css除了userLayout布局之外的全局的css来应用样式。

然后创建UserLayout.tsx组件，作为用户布局，在arco-design组件库里找到合适组件，然后修改，用<Outlet />渲染内容，可以创建UserLayout.module.css来应用用户布局的样式。

routes.ts配置，用ts的写法，所以不能写element（这是tsx的语法）,注意ts的类型检测
```
 {
        path: '/user',
        name: '用户',
        layout: UserLayout,
        meta: {
            hideInMenu: true,
        },
        children: [
            {
                path: 'login',
                name: '用户登录',
                Component: UserLoginPage,
            },
            {
                path: 'register',
                name: '用户注册',
                Component: UserRegisterPage,
            }
        ]
    },
```
在定义路由时，因为需要定义类型，但是原有的类型可能不足，这个时候可以自定义interface，或者使用类型交叉，比如：
```
    type CustomRouteObject = RouteObject & {
    name?: string;  // 类型交叉只能使用type，不能使用interface
}
```

App.tsx入口文件，可以使用useLocation()，再用location.pathname.startsWith('/user')来匹配用户布局，在通过三元表达式`{isUserRoute ? <UserLayout /> : <BasicLayout /> }`来切换不同的布局。

定义全局状态管理，使用useContext+useState来进行全局状态管理，首先创建一个contexts文件夹，里面创建userContext.tsx,先createContext()定义一个自定义变量，然后useState()定义状态管理，之后定义UserContext()组件（这里一定要注意开头要大写），里面写自己要用的方法，参数中传递{children}，然后用return导出
```
return (
        <UserContext.Provider value={{loginUser, setLoginUser, fetchLoginUser}}>
            {children}
        </UserContext.Provider>
    )
```

现在我们就定义好了一个全局状态管理，想用的时候，在所需页面使用useContext()导入，然后解构你要用的方法，直接调用即可。

现在我们做全局权限管理，定义三个文件 accexxEnum.ts  checkAccess.ts  index.ts,
accexxEnum.ts 定义权限枚举，checkAccess.ts 写权限校验逻辑，index.ts 定义在进入页面之前的权限校验和结果处理。

登录页面（UserLoginPage.tsx）：首先去框架官网找一个适合的登录组件，然后修改，记住这个框架的特点是react都用首字母大写的驼峰写法，vue都用a-连接的写法。

然后在定义登录页面的逻辑，先用useState(参数是一个对象，对象里面定义两个默认值都为'')定义form、setForm，在定义useContext(UserContext)，定义useNavigate()，然后在定义handleSubmit()，用异步等待写法，里面调用接口定义好的userLoginUsingPost(form)，传入form变量作为参数，然后做判断，如果成功，就navigate('/',{replace: true})跳转到首页，如果失败，就提示错误信息。之后定义handleInputChange()，用来获取输入框输入的内容，从而更新列表。注册界面同理。

用户管理页面（AdminUserPage.tsx）:首先去框架官网找一个适合的table组件做表单，找一个适合form组件做搜索框，然后去routes.ts里面配置路由，主要用户管理只有管理员能看见，需要给管理员权限，然后写方法，用useState()定义formSearchParams、searchParams、dataList、total状态和它们的set，定义loadData()来获取数据（调用listUserByPageUsingPost(searchParams)接口，做成功和失败的判断，成功就给表单赋值），可以用useEffect()来监听searchParams变化，只要变化就调用loadData(),然后我们可以定义删除方法，搜索方法，onPageChange方法，都差不多，大同小异，然后在配置columns，里面对应的都是数据库的字段，这里主要你要想做一些转换可以使用render：() => 转化的组件或方法，然后在return里面配置对应的变量，就可以实现这个页面的展示和全部功能。
```
return (
    <div>
        <Form onSubmit={doSearch} style={{ marginBottom: '20px' }} layout='inline' autoComplete="off">
            <FormItem label='用户名'>
                <Input allowClear value={formSearchParams.userName} placeholder='请输入用户名' onChange={(value) =>
                    setFormSearchParams(prev => ({...prev, userName: value}))
                }/>
            </FormItem>
            <FormItem label='用户名'>
                <Input allowClear value={formSearchParams.userProfile} placeholder='请输入用户简介' onChange={(value) =>
                    setFormSearchParams(prev => ({...prev, userProfile: value}))
                }/>
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                <Button size='large' type='primary' htmlType='submit'>搜索</Button>
            </FormItem>
        </Form>

        <Table columns={columns} data={dataList} pagination={{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
        }}
          onChange={onPageChange} />
    </div>
  )
```










<div class="video-container">
[up主专用，视频内嵌代码贴在这]
</div>

<style>
.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio (height/width = 9/16 * 100%) */
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
