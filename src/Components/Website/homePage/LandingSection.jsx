import { Container } from "react-bootstrap";
import { ReactComponent as MyICon } from "../../../Assets/Ecommerce web page-amico.svg";
import { Link } from "react-router-dom";


export default function LandingSection() {
    return (
            <section className="hand flex justify-between items-center flex-wrap">
                <Container className="flex flex-row justify-between gap-7">
                    <div className="flex align-items-center align-items-md-start gap-2 flex-col justify-center">
                        <h1 className="font-bold">Shampoo Nice</h1>
                        <h5>Another nice thing which is used by someone I don't Know.</h5>
                        <Link to={"/"} className="bt p-3 rounded-full  text-black 
                        bg-light font-bold">
                            Shop Now
                        </Link>
                    </div>

                    <MyICon className="pag animate__animated animate__bounceIn" />

                
                </Container>
            </section>
        
    );
}
