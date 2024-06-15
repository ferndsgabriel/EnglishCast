import "./start.css";
import Header from "../../components/header";
import Perfil from "../../components/perfil";

export default function Start (){

    return(
        <>  
            <Header/>
                <main className="start-container">
                    <div className="start-all">
                        <section className="start-section1">
                            <Perfil/>
                        </section>
                        <section className="start-section2">
                            testeteteeeeeeeeeeeeeeeee
                        </section>
                    </div>
                </main>
        </>
    )
}