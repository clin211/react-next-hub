// SearchBar 是一个客户端组件
import SearchBar from '@/components/client-components/searchbar'
// Logo 是一个服务端组件
import Logo from '@/components/server-components/logo';

// 布局组件默认为服务端组件
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav>
                <Logo />
                <SearchBar />
            </nav>
            <main>{children}</main>
        </>
    )
}