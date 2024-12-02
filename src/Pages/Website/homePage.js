import TopBar from "../../Components/Dashboard/topbar";

export default function HomePage() {
    return(
        <div className="App">
            <TopBar bar={false}/>
            <h1 style={{marginBlock: "70px"}}>HomePage</h1>
        </div>
    ) 
}