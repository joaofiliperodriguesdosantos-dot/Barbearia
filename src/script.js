/* =========================================
   BLACK STYLE - SISTEMA DE AGENDAMENTO
   ========================================= */

// ELEMENTOS DO HTML
const form = document.getElementById("formAgendamento");
const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const servico = document.getElementById("servico");
const barbeiro = document.getElementById("barbeiro");
const data = document.getElementById("data");
const horariosDiv = document.getElementById("horarios");
const horarioInput = document.getElementById("horario");
const mensagem = document.getElementById("mensagem");
const resumo = document.getElementById("resumo");
const lista = document.getElementById("listaAgendamentos");

let horarioSelecionado = "";

// HORÁRIOS DISPONÍVEIS
const horariosDisponiveis = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30"
];

// PREÇOS DOS SERVIÇOS
const precos = {
    "Corte masculino": 30,
    "Barba": 20,
    "Corte + Barba": 45,
    "Sobrancelha": 10,
    "Corte infantil": 25
};

// MENU RESPONSIVO
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("aberto");
});

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
    });
});

// DATA MÍNIMA = DATA ATUAL
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

const dataAtual = `${ano}-${mes}-${dia}`;
data.min = dataAtual;

// BOTÕES "AGENDAR" DOS CARDS
document.querySelectorAll(".btn-servico").forEach(botao => {
    botao.addEventListener("click", () => {
        servico.value = botao.dataset.servico;

        document.getElementById("agendar").scrollIntoView({
            behavior: "smooth"
        });

        atualizarResumo();
    });
});

// FORMATAÇÃO DA DATA
function formatarData(dataTexto) {
    const partes = dataTexto.split("-");

    if (partes.length !== 3) {
        return dataTexto;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// BUSCA AGENDAMENTOS NO NAVEGADOR
function obterAgendamentos() {
    return JSON.parse(
        localStorage.getItem("agendamentosBarbearia") || "[]"
    );
}

// SALVA AGENDAMENTOS NO NAVEGADOR
function salvarAgendamentos(agendamentos) {
    localStorage.setItem(
        "agendamentosBarbearia",
        JSON.stringify(agendamentos)
    );
}

// MOSTRA OS HORÁRIOS DE UMA DATA
function carregarHorarios() {
    const dataEscolhida = data.value;
    horarioSelecionado = "";
    horarioInput.value = "";

    if (!dataEscolhida) {
        horariosDiv.innerHTML =
            '<p class="mensagem-horario">Selecione uma data para ver os horários.</p>';
        atualizarResumo();
        return;
    }

    const agendamentos = obterAgendamentos();

    horariosDiv.innerHTML = "";

    horariosDisponiveis.forEach(horario => {
        const ocupado = agendamentos.some(agendamento =>
            agendamento.data === dataEscolhida &&
            agendamento.horario === horario &&
            agendamento.barbeiro === barbeiro.value
        );

        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = ocupado
            ? `${horario} - Ocupado`
            : horario;

        botao.className = "horario-btn";

        if (ocupado) {
            botao.classList.add("ocupado");
            botao.disabled = true;
        } else {
            botao.addEventListener("click", () => {
                document.querySelectorAll(".horario-btn")
                    .forEach(b => b.classList.remove("selecionado"));

                botao.classList.add("selecionado");
                horarioSelecionado = horario;
                horarioInput.value = horario;

                atualizarResumo();
            });
        }

        horariosDiv.appendChild(botao);
    });

    atualizarResumo();
}

// ATUALIZA O RESUMO DO AGENDAMENTO
function atualizarResumo() {
    if (!servico.value || !data.value || !horarioSelecionado) {
        resumo.textContent =
            "Preencha os dados para visualizar o resumo.";
        return;
    }

    const valor = precos[servico.value];

    resumo.innerHTML = `
        <strong>Resumo:</strong><br>
        Serviço: ${servico.value}<br>
        Barbeiro: ${barbeiro.value || "Não selecionado"}<br>
        Data: ${formatarData(data.value)}<br>
        Horário: ${horarioSelecionado}<br>
        Valor: R$ ${valor.toFixed(2).replace(".", ",")}
    `;
}

// EVENTOS DOS CAMPOS
data.addEventListener("change", carregarHorarios);
barbeiro.addEventListener("change", carregarHorarios);
servico.addEventListener("change", atualizarResumo);

// CONFIRMAR AGENDAMENTO
form.addEventListener("submit", function(event) {
    event.preventDefault();

    mensagem.textContent = "";
    mensagem.className = "mensagem";

    if (!horarioSelecionado) {
        mensagem.textContent = "Escolha um horário disponível.";
        mensagem.classList.add("erro");
        return;
    }

    if (!barbeiro.value) {
        mensagem.textContent = "Selecione um barbeiro.";
        mensagem.classList.add("erro");
        return;
    }

    const agendamentos = obterAgendamentos();

    // VERIFICA SE O HORÁRIO JÁ FOI OCUPADO
    const horarioOcupado = agendamentos.some(agendamento =>
        agendamento.data === data.value &&
        agendamento.horario === horarioSelecionado &&
        agendamento.barbeiro === barbeiro.value
    );

    if (horarioOcupado) {
        mensagem.textContent =
            "Esse horário acabou de ser ocupado. Escolha outro.";
        mensagem.classList.add("erro");
        carregarHorarios();
        return;
    }

    // CRIA UM NOVO AGENDAMENTO
    const novoAgendamento = {
        id: Date.now(),
        nome: nome.value.trim(),
        telefone: telefone.value.trim(),
        servico: servico.value,
        barbeiro: barbeiro.value,
        data: data.value,
        horario: horarioSelecionado,
        valor: precos[servico.value]
    };

    agendamentos.push(novoAgendamento);
    salvarAgendamentos(agendamentos);

    mensagem.textContent =
        "✅ Agendamento realizado com sucesso!";
    mensagem.classList.add("sucesso");

    form.reset();
    horarioSelecionado = "";
    horarioInput.value = "";
    resumo.textContent =
        "Preencha os dados para visualizar o resumo.";

    carregarHorarios();
    mostrarAgendamentos();
});

// MOSTRA OS AGENDAMENTOS NA TELA
function mostrarAgendamentos() {
    const agendamentos = obterAgendamentos();

    lista.innerHTML = "";

    if (agendamentos.length === 0) {
        lista.innerHTML =
            "<p>Nenhum agendamento realizado ainda.</p>";
        return;
    }

    agendamentos.sort((a, b) => {
        return `${a.data}${a.horario}`.localeCompare(
            `${b.data}${b.horario}`
        );
    });

    agendamentos.forEach(agendamento => {
        const card = document.createElement("div");
        card.className = "reserva";

        card.innerHTML = `
            <h3>${agendamento.servico}</h3>
            <p><strong>Cliente:</strong> ${agendamento.nome}</p>
            <p><strong>Telefone:</strong> ${agendamento.telefone}</p>
            <p><strong>Barbeiro:</strong> ${agendamento.barbeiro}</p>
            <p><strong>Data:</strong> ${formatarData(agendamento.data)}</p>
            <p><strong>Horário:</strong> ${agendamento.horario}</p>
            <p><strong>Valor:</strong> R$ ${agendamento.valor.toFixed(2).replace(".", ",")}</p>
            <div class="reserva-acoes">
                <button class="btn-cancelar"
                        data-id="${agendamento.id}">
                    Cancelar agendamento
                </button>
            </div>
        `;

        lista.appendChild(card);
    });
}

// CANCELAR AGENDAMENTO
lista.addEventListener("click", function(event) {
    if (!event.target.classList.contains("btn-cancelar")) {
        return;
    }

    const id = Number(event.target.dataset.id);

    const confirmar = confirm(
        "Deseja cancelar este agendamento?"
    );

    if (!confirmar) {
        return;
    }

    const agendamentos = obterAgendamentos();

    const atualizados = agendamentos.filter(
        agendamento => agendamento.id !== id
    );

    salvarAgendamentos(atualizados);

    mostrarAgendamentos();
    carregarHorarios();
});

// FORMULÁRIO DE CONTATO
document.getElementById("formContato")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("respostaContato").textContent =
            "Mensagem registrada para demonstração!";

        document.getElementById("respostaContato")
            .className = "sucesso";

        this.reset();
    });

// INICIALIZAÇÃO
mostrarAgendamentos();
carregarHorarios();
