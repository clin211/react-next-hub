// template 相比于 layout, template 会保留状态, 使用场景如: 依赖 useEffect和 useState 的功能(记录页面访问数  用户反馈表单)
export default function Template({children}){
    return <div>{children}</div>
}
