import { useAppSelector } from '../app/hooks';
import { Layout } from 'antd';
import SideBar from '../components/sidebar';
import { menuItemsPage } from '../features/pageControl/pageSlice';

const { Content } = Layout;
const Home = () => {
    const pageControl = useAppSelector( state => state.page);
    const PageComponent = menuItemsPage[pageControl.menuItemKey ];

    return (
        <Layout
        style={{
            minHeight: '100vh',
        }}
        >
        <SideBar />

        <Layout>
            
            <Content
            style={{
                margin: '0 16px',
            }}
            className='content'
            >
                
                {
                    PageComponent && <PageComponent />
                }

            </Content>
        </Layout>
        </Layout>
    );
};

export default Home;