import presentationImage from "../imgs/piletaConDormis.jpg";
import WhatsAppFloatingButton from "../Components/WhatsappButton/WhatsAppFloatingButton";

import WhatsAppIcon from "../icons/whatsappIcon.svg";
import FacebookIcon from "../icons/facebookIcon.svg";
import GmailIcon from "../icons/gmail.svg";

const CONTACTS = [
    { icon: WhatsAppIcon, title: "WhatsApp", name: "Cristian", href: "https://wa.me/5493564507240" },
    { icon: FacebookIcon, title: "Facebook", name: "Lo Nuestro", href: "#" },
    { icon: GmailIcon, title: "Gmail", name: "Lo Nuestro", href: "#" },
];

function ContactPage() {
    return (
        <div className="pt-16.25 bg-[#F1F3EE]">
            <div className="h-135 relative w-full overflow-hidden">
                <img src={presentationImage} alt="Patio de atrás" className="hero-image w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A4530]/25 via-transparent to-transparent" />
            </div>

            <div className="text-center py-10 px-5">
                <h2 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143] fade-down">
                    Contactanos
                </h2>
                <p className="text-[#3E6143]/70 max-w-md mx-auto mt-2 fade-down" style={{ animationDelay: "0.1s" }}>
                    Escribinos por el medio que prefieras, te respondemos a la brevedad.
                </p>

                {/* Mobile: filas horizontales */}
                <div className="flex flex-col md:flex-row md:max-w-3xl md:justify-center gap-3 my-6 max-w-md mx-auto">
                    {CONTACTS.map((contact, index) => (
                        <a key={contact.title} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={`${contact.title} - ${contact.name}`} className="fade-down flex flex-row items-center gap-4 bg-white rounded-2xl p-4 hover:scale-102 shadow-sm border border-[#3E6143]/10 transition-transform duration-200 active:scale-[0.98]" style={{ animationDelay: `${0.2 + index * 0.15}s` }} >
                            <div className="h-12 w-12 rounded-full bg-[#3E6143]/10 flex items-center justify-center flex-shrink-0 ">
                                <img src={contact.icon} alt="" className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <h3 className="titles-and-subtitles font-bold text-[1rem] text-[#3E6143] truncate">
                                    {contact.title}
                                </h3>
                                <h3 className="titles-and-subtitles text-[.9rem] text-[#3E6143]/60 truncate">
                                    {contact.name}
                                </h3>
                            </div>
                            <svg className="w-4 h-4 text-[#3E6143]/40 flex-shrink-0 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </a>
                    ))}
                </div>

            </div>

            <WhatsAppFloatingButton />
        </div>
    );
}

export default ContactPage;