import React, {useState} from "react";

import {Link} from "react-router-dom";
import {Layout, Menu, Typography} from "antd";
import {useSelector} from "react-redux";
import {selectCurrentAdmin} from "@/redux/auth/selectors";
import {
    SettingOutlined,
    UserOutlined,
    FileTextOutlined,
    DashboardOutlined,
    TeamOutlined,
} from "@ant-design/icons";

const {Text} = Typography;
const {Sider} = Layout;

const whiteText = {
    color: '#ffffff',
    fontSize: '20px'
};
const colorWhite = {
    color: '#ffffff',
    fontSize: '13px'
};
const logoContainer = {
    display: 'flex',
    justifyContent: 'center'
};

function Navigation() {
    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector(selectCurrentAdmin);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                style={{
                    zIndex: 1000,
                }}
            >
                <div className="logo" style={logoContainer}>
                    <Text style={whiteText}>TravelFish</Text>
                </div>
                <div style={{...logoContainer, marginBottom: '10px'}}>
                    <Text style={colorWhite}>Welcome {user.name}</Text>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<DashboardOutlined/>}>
                        <Link to="/"/>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined/>}>
                        <Link to="/profiles">Profiles</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileTextOutlined/>}>
                        <Link to="/posts">Posts</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileTextOutlined/>}>
                        <Link to="/articles">Articles</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<FileTextOutlined/>}>
                        <Link to="/travelplans">Travelplans</Link>
                    </Menu.Item>
                    {user?.isSuperAdmin && <React.Fragment>
                        <Menu.Item key="6" icon={<TeamOutlined/>}>
                            <Link to="/roles"/>
                            Roles
                        </Menu.Item>
                        <Menu.Item key="7" icon={<TeamOutlined/>}>
                            <Link to="/admins"/>
                            Admins
                        </Menu.Item>
                    </React.Fragment>}
                    <Menu.Item key="8" icon={<SettingOutlined/>}>
                        <Link to="/settings"/>
                        Settings
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    );
}

export default Navigation;
