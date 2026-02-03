import "./ContactComponent.css";
import whatsappIcon from "../../icons/whatsappIcon.svg";
import GmailIcon from "../../icons/gmail.svg";
import FacebookIcon from "../../icons/icons8-facebook.svg";
import Mapa from "../Mapa/MapaComponent.jsx";


function ContactComponent() {
    const contacts = [
        {
            id:1,
            icon: FacebookIcon,
            url: "https://www.facebook.com/p/Lo-Nuestro-100054220102040/",
            name: "Lo Nuestro"
        },
        {
            id:3,
            icon: GmailIcon,
            url: "mailto:complejoLoNuestro@gmail.com",
            name: "Gmail - Lo Nuestro"
        },
        {
            id:2,
            icon: whatsappIcon,
            url: "https://wa.me/5493564628870",
            name: "Cristian - (+54) 3564 628870"
        }
    ];
    
    const printContacts = contacts.map((contact)=>{
        return(
            <div key={contact.id} className="text-white px-1 my-1">
                <a href={contact.url} className="flex flex-row items-center justify-center md:justify-start gap-2 py-1 text-[1rem]" target="_blank">
                    <img src={contact.icon} alt="" className={`w-6 h-6 ${contact.id < 3 ? "invert" : ""}`}/>
                    <span className="titles text-[1.2rem] md:text-[1.3em]">{contact.name}</span>
                </a>
            </div>
        )
    })

    return (
        <div className="min-h-[calc(60vh-65px)] bg-[#F1F3EE] m-0 ">
            <div className="bg-white mx-4 md:p-2 py-3 rounded-[25px]">
                <div className="bg-[#3E6143] m-2 md:flex md:flex-row-reverse justify-center items-center md:rounded-[25px] rounded-b-[25px] md:m-5">
                    <div className="mapa md:pr-3">
                        <div className=" bg-white p-1">
                            <Mapa></Mapa>
                        </div>
                    </div>
                    
                    <div className="contacto w-50% h-full text-white text-center md:text-left m-2 rounded-b-[25px] py-5 md:py-18 md:px-2 lg:px-8">
                        <h2 className="titles text-[1.6rem] md:text-[1.8rem] md:py-2 border-white border-b pb-1">Contacto</h2>
                        <div className="flex flex-col">
                            {printContacts}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ContactComponent