import Perfil from "../../components/perfil";
import "./settings.css";
import icon from "../../assets/icon.svg";
import { Link } from "react-router-dom";
import { MdEdit, MdOutlineNavigateNext, MdOutlineLogout, MdCreateNewFolder } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import ChangePass from "../../components/modals/changePass";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";
import EditProfile from "../../components/modals/editprofile";


export default function Settings(){
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenPass, setIsOpenPass] = useState(false);
    const {signOut} = useContext(AuthContext);

    function closeModalEdit(){
        setIsOpenEdit(false);
    }
    function openModalEdit(){
        setIsOpenEdit(true);
    }

    function closeModalPass(){
        setIsOpenPass(false);
    }
    function openModalPass(){
        setIsOpenPass(true);
    }


    return(
        <main className="settings-container">
            <section className="settings-section1">
                <Link to={'/start'}>
                    <img src={icon} alt="icon"/>
                </Link>
                <Perfil/>
            </section>

            <section className="settings-section2">
                <h1>Configurações</h1>
                <ul className="settings-ul">
                    <li>
                        <button onClick={openModalEdit}> <span className="icon-text"><MdEdit className="icon1"/> Editar perfil</span><MdOutlineNavigateNext className="icon2"/> </button>
                    </li>
                    <li>
                        <button onClick={openModalPass}> <span className="icon-text"><GiPadlock className="icon1"/>Alterar senha</span><MdOutlineNavigateNext className="icon2"/> </button>
                    </li>
                    <EditProfile isOpen={isOpenEdit} closeModal={closeModalEdit}/>
                    <ChangePass isOpen={isOpenPass} closeModal={closeModalPass}/>
                </ul>
            </section>
            <section className="settings-section4">
                <h1>Criar</h1>
                <ul className="settings-ul">
                    <li>
                        <button> <span className="icon-text"><MdCreateNewFolder className="icon1"/>Adicionar áudio</span><MdOutlineNavigateNext className="icon2"/> </button>
                    </li>
                </ul>
            </section>
            <section className="settings-section4">
                <h1>Desconectar</h1>
                <ul className="settings-ul">
                    <li>
                        <button onClick={signOut}> <span className="icon-text"><MdOutlineLogout className="icon1"/>Sair da conta</span><MdOutlineNavigateNext className="icon2"/> </button>
                    </li>
                </ul>
            </section>

        </main>
    )
}