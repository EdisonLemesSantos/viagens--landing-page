// Modo daltônico
    document.querySelector("#toggle-mode").addEventListener("click", () => {
      document.documentElement.classList.toggle("color-blind-friendly");
    });

    // Utilidades
    const desativarTodas = () => {
      document.querySelectorAll(".navegacao").forEach(li => li.classList.remove("active"));
    };

    const menuMap = new Map();
    document.querySelectorAll(".navegacao a").forEach(a => {
      menuMap.set(a.getAttribute("href"), a.parentElement);
    });

    // Clique nos itens do menu: rolagem suave + ativar item
    document.querySelectorAll(".navegacao a").forEach(anchor => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute("href");
        const target = document.querySelector(targetId);
        if (!target) return;

        desativarTodas();
        anchor.parentElement.classList.add("active");

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", targetId);
      });
    });

    // Clique nos links "Home" dentro das sections: volta ao topo e ativa o item Home
    document.querySelectorAll('a.topo[href="#home"]').forEach(topo => {
      topo.addEventListener("click", (event) => {
        event.preventDefault();
        const target = document.querySelector("#home");
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", "#home");

        desativarTodas();
        menuMap.get("#home")?.classList.add("active");
      });
    });

    // Auto-highlight pelo scroll: ativa o item do menu da seção mais visível
    const sections = document.querySelectorAll("main[id], section[id]");
    const observer = new IntersectionObserver((entries) => {
      // pega a seção mais visível
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const id = `#${visible.target.id}`;

      desativarTodas();
      menuMap.get(id)?.classList.add("active");
    }, {
      root: null,
      threshold: [0.6, 0.7] // só troca quando metade da seção está na viewport
    });

    sections.forEach(sec => observer.observe(sec));