import MenuItem from './MenuItem';

export default function MenuList(props:any){
    return(
        <div className="menuList">
            <p className="menuTitle">
                {props.title}
            </p>

            {props.items.map((item:any, index:number) => (
                <MenuItem
                    key={index}
                    name={item.name}
                    icon={item.icon}
                />
            ))}
        </div>
    )
}