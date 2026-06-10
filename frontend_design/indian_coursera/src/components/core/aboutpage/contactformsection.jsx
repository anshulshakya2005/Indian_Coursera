
import Contactusform from "../../contactpage/contactus";
function Contactformsection(){
    return (
        <div className="mx-auto">
            <h1 className="mx-auto text-white text-2xl font-bold flex items-center  justify-center">Get in Touch</h1>
            <p className="text-white p-2 justify-center flex mb-2">We'd love to here for you, please fill out this form.</p>
            <div>
                <Contactusform/>
            </div>
        </div>
    )
}
export default Contactformsection;