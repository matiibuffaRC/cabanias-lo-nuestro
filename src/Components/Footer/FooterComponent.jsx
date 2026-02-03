import GithubIcon from "../../icons/Github.svg";

function FooterComponent() {
    return (
        <div className="pt-20 bg-[#F1F3EE]">
            <div className="bg-[#3E6143] w-full h-30 flex flex-col justify-center items-center text-white md:flex-row md:justify-around md:h-20">
                <h3 className="titles text-[.9rem]">Complejo lo nuestro</h3>
                <h4 className="titles text-[.9rem]">Mina Clavero - Traslasierras</h4>
                <a href="https://github.com/matiibuffaRC" className="flex flex-row items-center justify-center gap-1" target="__blank">
                    <img src={GithubIcon} alt="Github"  className="h-5 w-5 invert" />
                    <span className="titles text-[.9rem]">Desarrollado por Matías Buffa</span>
                </a>
            </div>
        </div>
        
    )
}

export default FooterComponent