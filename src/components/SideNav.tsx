import Logo from './Logo';
import MenuList from './MenuList';
import useEffect from 'react';



export default function SideNav(){


    const url = window.location.pathname;
    const currentPage = url.split('/')[1];
    const capitalisedPageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1).toLowerCase();
    
    console.log(capitalisedPageName);
    console.log(currentPage);




    
    return(
        <div className="sideNav">
            <Logo />
            <div className='menuLists'>
                <MenuList 
                    currentPage={capitalisedPageName}
                    title="MENU"
                    items={[
                        {name: 'Home', icon: 'dashboard'},
                        {name: 'Search', icon: 'users'},
                        {name: 'Genres', icon: 'products'},
                    ]}
                /> 
                <MenuList 
                    currentPage={capitalisedPageName}
                    title="GENERAL"
                    items={[
                        {name: 'Settings', icon: 'dashboard'},
                        {name: 'Logout', icon: 'users'},
                    ]}
                />  
            </div>

        </div>
    )
}