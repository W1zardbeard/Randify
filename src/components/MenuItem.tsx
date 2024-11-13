import { useNavigate } from "react-router-dom";





export default function MenuItem(props: any) {
    const navigate = useNavigate();

    const handleNav = () => {
        navigate(`/${props.name.toLowerCase()}`);
    }

    return (
        <div className="menuItem"
            onClick={handleNav}
            style={{
                color: props.currentPage === props.name ? '#FF7E3A' : '#99938F'
            }}
        >
          <p>{props.name}</p>
        </div>
    )
}