import { useEffect, useState } from "react";
import Modal from "../default";
import { FaSpinner } from "react-icons/fa";
import {query, getDocs, collection, where} from "firebase/firestore";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db} from "../../../services/firebase";
import { AuthContext } from "../../../contexts/AuthContexts";
import { useContext } from "react";
import {isEmail} from "validator";
import { formatName } from "../../../services/format";

export default function EditProfile({isOpen, closeModal}){


    const [loading, setLoading] = useState (false);
    const [error, setError] = useState ("");
    const [sucess, setSucess] = useState ("");
    const {userDetails} = useContext(AuthContext);

    const [emailInput, setEmailInput] = useState (userDetails.Email);
    const [nameInput, setNameInput] = useState (userDetails.Name);
    const [lastNameInput, setLastNameInput] = useState (userDetails.LastName);

    async function handleEdit(e) {
        e.preventDefault();
        if (!emailInput || !nameInput || !lastNameInput){
            setSucess('');
            setError('Digite todos os campos.');
            return;
        }
        if (emailInput.includes(' ') || nameInput.includes(' ') || lastNameInput.includes(' ')){
            setSucess('');
            setError('Os campos não devem conter espaços.');
            return;
        }
        if (!isEmail(emailInput)){
            setSucess('');
            setError('Digite um email válido.');
            return;
        }
        //setLoading(true);
    
        const q = query(collection(db, "Users"), where("email", "==", 'Gab'));

        getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc)
            });
        })
        .catch((error) => {
            console.error("Erro ao buscar documentos: ", error);
        });
        

        
    }

    useEffect(()=>{
        if (!isOpen){
            setError('');
            setSucess('');
            setEmailInput(userDetails.Email);
            setNameInput(userDetails.Name);
            setLastNameInput(userDetails.LastName);
        }
    },[closeModal]);

    return(
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <form className="modal-default" onSubmit={handleEdit} >
                <h1 className="modal-title">Editar informações</h1>
                <div className="modal-after-title">
                    <label className="modal-label">
                        <span>Primeiro nome:</span>
                        <input type="text" placeholder="Digite seu primeiro nome" 
                        autoFocus={true}
                        value={nameInput}
                        onChange={(e)=>setNameInput(e.target.value)}/>
                    </label>

                    <label className="modal-label">
                        <span>Último nome:</span>
                        <input type="text" placeholder="Digite seu último nome" 
                        value={lastNameInput}
                        onChange={(e)=>setLastNameInput(e.target.value)}/>
                    </label>

                    <label className="modal-label">
                        <span>Email</span>
                        <input type="text" placeholder="Digite seu email:" 
                        value={emailInput}
                        onChange={(e)=>setEmailInput(e.target.value)}/>
                    </label>
                </div>
                {error !== '' && (
                    <span className="card-error">{error}</span>
                    )}
                    {sucess !== '' && (
                    <span className="card-sucess">{sucess}</span>
                )}
                <div className="modal-buttons">
                    {!loading?(
                        <>
                            <button onClick={closeModal}type="reset">Cancelar</button>
                            <button type="submit">Editar</button>
                        </>
                    ):(
                        <FaSpinner className="spinner" />
                    )}
                </div>
            </form>

        </Modal>
    )
}