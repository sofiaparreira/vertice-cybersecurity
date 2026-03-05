const Footer = () => {
    return (
        
<footer id="contato" className="bg-zinc-900 border-t border-zinc-800 py-12 sm:py-16 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 sm:gap-12">

    {/* Branding */}
    <div className="space-y-4 sm:space-y-6 col-span-2">
      <img
        src="./logo-vertice.png"
        alt="Logo Vértice"
        className="w-32 sm:w-40"
      />
      <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
        Soluções avançadas em cibersegurança para proteger
        infraestruturas digitais, dados sensíveis e operações críticas.
      </p>
    </div>

    {/* Navegação */}
    <div className="flex flex-col sm:flex-row gap-10 sm:gap-24">
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
          Navegação
        </h3>
        <ul className="mt-6 space-y-3 text-sm text-zinc-400">
          <li className="hover:text-[var(--primary)] transition cursor-pointer">
            Início
          </li>
          <li className="hover:text-[var(--primary)] transition cursor-pointer">
            Serviços
          </li>
          <li className="hover:text-[var(--primary)] transition cursor-pointer">
            Quem Somos
          </li>
          <li className="hover:text-[var(--primary)] transition cursor-pointer">
            Contato
          </li>
        </ul>
      </div>
      {/* Contato */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
          Contato
        </h3>
        <ul className="mt-6 space-y-3 text-sm text-zinc-400">
          <li>contato@verticecybersecurity.com</li>
          <li>Belo Horizonte - MG</li>
          <li className="hover:text-[var(--primary)] transition cursor-pointer">
            Política de Privacidade
          </li>
        </ul>
      </div>
    </div>

  </div>

  {/* Linha inferior */}
  <div className="mt-10 sm:mt-16 border-t border-zinc-800 pt-6 sm:pt-8 text-center text-xs text-zinc-500">
    © {new Date().getFullYear()} Vértice Todos os direitos reservados.
  </div>
</footer>
    )
}   

export default Footer;