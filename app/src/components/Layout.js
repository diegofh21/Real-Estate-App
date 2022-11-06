import React, { useState, useEffect } from 'react'

import { AsideNavButton } from './AsideNavButton'
import { SideNavbar } from './SideNavbar'

const Layout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <>
            <div className={`app ${toggled ? 'toggled' : ''}`}>
                <AsideNavButton
                    toggled={toggled}
                    collapsed={collapsed}
                    handleToggleSidebar={handleToggleSidebar}
                    handleCollapsedChange={handleCollapsedChange}
                />
                <SideNavbar
                    collapsed={collapsed}
                    toggled={toggled}
                    handleToggleSidebar={handleToggleSidebar}
                />
                <main>{children}</main>
            </div>
        </>
    )
}

export default Layout;