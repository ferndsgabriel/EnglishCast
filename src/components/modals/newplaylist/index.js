import { useState, useRef, useEffect } from "react";
import {db} from "../../../services/firebase";
import Modal from "../default";
import { FaSpinner } from "react-icons/fa";
import { collection, query, where, getDocs, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContexts";


export default function NewPlayList({isOpen, closeModal}) {

    const [loading, setLoading] = useState (false);
    const [error, setError] = useState ("");
    const [sucess, setSucess] = useState ("");
    const input = useRef();
    const {userDetails} = useContext(AuthContext);
    const uid = userDetails.Uid;



    async function handleCreatePlayList (e){
        e.preventDefault();

        const namePlaylist = input.current?.value;
        if (namePlaylist === ''){
            setSucess('');
            setError('Digite o nome da playlist.');
            return;
        }
        if (namePlaylist.includes(' ')){
            setSucess('');
            setError('O nome da playlist não pode conter espaços em branco.');
            return;
        }

        setLoading(true);
        const userDocRef = doc(db, 'Users', uid);

        const qtd = query(collection(db, "Playlist"),where('UserId', '==', userDocRef));
        const querySnapshotQtd = await getDocs(qtd);
        
        if (querySnapshotQtd.size > 4){
            setSucess('');
            setError('Limite máximo de 5 playlists excedido.');
            setLoading(false);
            return
        }

        const q = query(
            collection(db, 'Playlist'),
            where('UserId', '==', userDocRef),
            where ('Name', '==', namePlaylist)
        );
            
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            setSucess('');
            setError('Já existe uma playlist com esse nome.');
            setLoading(false);
            return;
        }else{
            await addDoc(collection(db, 'Playlist'),{
                UserId:userDocRef,
                Name:namePlaylist
            }).then(()=>{
                setError('');
                setSucess('Playlist criada.');
                setTimeout(()=>{
                    closeModal();
                },[])
                
            }).catch((error)=>{
                setSucess('');
                setError('Erro ao criar playlist.');
            }).finally(()=>{
                setLoading(false);
            })
        }
    }
    
    useEffect(()=>{
        if (!isOpen){
            setError('');
            setSucess('');
        }
    },[closeModal]);

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <>
                <form className="modal-default" onSubmit={handleCreatePlayList}>
                    <h1 className="modal-title">Criar playlist</h1>
                    <div className="modal-after-title">
                        <label className="modal-label">
                            <span>Nome da playlist:</span>
                            <input type="text" placeholder="Digite o nome da playlist" ref={input} autoFocus={true}/>
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
                                <button onClick={closeModal} type="reset">Cancelar</button>
                                <button type="submit">Criar</button>
                            </>
                        ):(
                            <FaSpinner className="spinner" />
                        )}
                        
                    </div>
                </form>
            </>
        </Modal>
    );
}