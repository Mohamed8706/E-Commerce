import { Container } from "react-bootstrap";
import TopBar from "../../Components/Dashboard/topbar";
import "./home.css"

export default function HomePage() {
    return(
        <div className="h-screen">
            <TopBar/>
            <div className="hand flex justify-between items-center flex-wrap h-full">
                <Container>

                </Container>
            </div>
        </div>
    ) 
}