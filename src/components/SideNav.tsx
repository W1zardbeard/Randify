import Logo from './Logo';
import MenuList from './MenuList';


export default function SideNav(){
    return(
        <div className="sideNav">
            <Logo />
            <div className='menuLists'>
                <MenuList 
                    title="MENU"
                    items={[
                        {name: 'Home', icon: 'dashboard'},
                        {name: 'Search', icon: 'users'},
                        {name: 'Genres', icon: 'products'},
                    ]}
                /> 
                <MenuList 
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