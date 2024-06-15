import "./perfil.css";
import { AuthContext } from "../../contexts/AuthContexts";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Perfil (){
    const {userDetails, signOut} = useContext(AuthContext);
    const [openSettings, setOpenSettings] = useState(false);
    const settingsRef = useRef();

    function handleSettings(){
        setOpenSettings(!openSettings);
    }

    useEffect(()=>{
        function closeWithEsc(e){
            if (e.key === 'Escape'){
                setOpenSettings(false);
            }
        }
        function closeWithClick(e){
            if (settingsRef.current && !settingsRef.current.contains(e.target)) {
                setOpenSettings(false);
            }
        }

        function accessibilitySettings(){
            if (openSettings === true){
                document.addEventListener("keydown", closeWithEsc);          
                document.addEventListener("click", closeWithClick);          
            }else{
                return document.removeEventListener("keydown", closeWithEsc), 
                document.removeEventListener("click",  closeWithClick); 
            }
        }
        accessibilitySettings();

    },[openSettings, setOpenSettings]);


    return(
        <div onClick={handleSettings} className="openSettings" ref={settingsRef}>
            {userDetails.Avatar?(
                <img src={userDetails.Avatar} alt="Foto de perfil" className='Photo-user'/>
            ):(
                <span className='Photo-user'>{userDetails.Name[0]}{userDetails.LastName[0]}</span>
            )}
            {openSettings ?(
                <article className="settingsPefil">
                    <Link className="options" to={'/settings'}>Configurações</Link>
                    <Link  className="options" to={'/perfi'}>Perfil</Link>
                    <button className="options" onClick={signOut}>Sair</button>
                </article>
            ):null}
        </div>
    )
}