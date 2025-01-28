import { NavLink } from "react-router-dom"
import "./404.css"

export default function Err404() {
    return (
            <section class="page_404">
            <div class="container">
                <div class="row"> 
                <div class="col-sm-12 ">
                <div class="col-sm-10 col-sm-offset-  text-center">
                <div class="four_zero_four_bg">
                </div>
                <div class="contant_box_404">
                <h3 class="h2">
                Looks like you're lost
                </h3>
                <p>the page you are looking for not avaible!</p>
                <NavLink to="/" className="link_404">Go to HomePage</NavLink>
            </div>
                </div>
                </div>
                </div>
            </div>
            </section>
    )
}