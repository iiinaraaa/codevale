import type { Lesson } from "./types";

/**
 * Trilha de React (iniciante).
 * Regra de ouro: uma ideia nova por lição.
 * Para adicionar um vídeo, preencha o campo `video` (veja CONTRIBUTING.md e CREDITS.md).
 */
export const REACT_LESSONS: Lesson[] = [
  {
    slug: "o-que-e-react",
    title: "O que é React e por que existe",
    phase: 1,
    minutes: 8,
    coins: 20,
    why: [
      "React é uma biblioteca JavaScript para montar interfaces. Em vez de mexer na tela passo a passo, você descreve como ela deve ficar e o React atualiza só o que for preciso.",
      "Ele existe porque, em telas grandes, controlar tudo na mão vira bagunça: um dado muda e você precisa lembrar de atualizar dez lugares diferentes.",
    ],
    reading: { label: "react.dev: Quick Start", url: "https://react.dev/learn" },
    code: {
      code: `// Sem React: você manda em cada detalhe
const el = document.querySelector("#contador");
el.textContent = "Cliques: " + n;

// Com React: você descreve o resultado
<p>Cliques: {n}</p>`,
      notes: [
        "No primeiro bloco, você diz como mudar a tela, passo a passo.",
        "No segundo, você diz como ela deve ficar para cada valor de n. O React descobre o que mudar.",
      ],
    },
    pitfall:
      "React não é um framework completo: ele cuida da interface. Rotas, dados do servidor e deploy vêm de ferramentas em volta, como o Next.js.",
    activity: {
      question: "O que o React faz por você?",
      options: [
        "Descobre o que precisa mudar na tela quando os dados mudam",
        "Escreve o CSS do site",
        "Substitui o JavaScript",
      ],
      answer: 0,
      explain: "Você descreve a tela e o React cuida de atualizá-la quando os dados mudam.",
    },
  },
  {
    slug: "como-o-react-pensa",
    title: "Como o React pensa",
    phase: 1,
    minutes: 8,
    coins: 20,
    why: [
      "No React, a tela é o resultado dos dados. Mudou o dado, o React desenha a tela de novo.",
      "Pensar assim evita o erro mais comum de quem começa: tentar mexer na tela diretamente.",
    ],
    analogy: [
      { label: "Dados", text: "os ingredientes" },
      { label: "Componente", text: "a receita" },
      { label: "Tela", text: "o prato pronto" },
    ],
    reading: { label: "react.dev: Thinking in React", url: "https://react.dev/learn/thinking-in-react" },
    code: {
      code: `function Saudacao() {
  const nome = "Ana";
  return <h1>Olá, {nome}!</h1>;
}`,
      notes: [
        "Saudacao é uma função que devolve o que aparece na tela.",
        "O valor de nome decide o texto. Trocando o dado, a tela muda.",
      ],
    },
    pitfall: 'Você não "atualiza o h1". Você muda o dado e deixa o React redesenhar.',
    activity: {
      question: "Se um dado muda, o que você faz no React?",
      options: [
        "Muda o dado e deixa o React redesenhar a tela",
        "Procura o elemento e troca o texto na mão",
        "Recarrega a página",
      ],
      answer: 0,
      explain: "A tela é consequência dos dados. Você cuida dos dados, o React cuida da tela.",
    },
  },
  {
    slug: "primeiro-componente",
    title: "Seu primeiro componente",
    phase: 1,
    minutes: 10,
    coins: 20,
    why: [
      "Um componente é um pedaço reutilizável da interface: um botão, um cartão, uma página inteira. No React, ele é uma função que devolve o que deve aparecer.",
      "Dividir a tela em componentes deixa tudo mais fácil de entender, testar e reaproveitar.",
    ],
    reading: { label: "react.dev: Your First Component", url: "https://react.dev/learn/your-first-component" },
    code: {
      code: `function Cartao() {
  return <div>Meu primeiro componente</div>;
}

export default function App() {
  return <Cartao />;
}`,
      notes: [
        "Componente é uma função que devolve JSX.",
        "O nome começa com letra maiúscula. É assim que o React diferencia de uma tag HTML.",
        "<Cartao /> usa o componente, como se fosse uma tag nova.",
      ],
    },
    pitfall: "Escrever cartao em minúscula não funciona: o React acha que é uma tag HTML.",
    activity: {
      question: "Qual nome é válido para um componente?",
      options: ["cartao", "Cartao", "<cartao>"],
      answer: 1,
      explain: "Componentes começam com letra maiúscula.",
    },
  },
  {
    slug: "jsx",
    title: "JSX: HTML dentro do JavaScript",
    phase: 1,
    minutes: 10,
    coins: 20,
    why: [
      'JSX é uma sintaxe que deixa você escrever "HTML" dentro do JavaScript. Parece HTML, mas é JavaScript por baixo.',
      "Com ele, a aparência e a lógica do componente ficam juntas no mesmo lugar.",
    ],
    reading: { label: "react.dev: Writing Markup with JSX", url: "https://react.dev/learn/writing-markup-with-jsx" },
    code: {
      code: `function Perfil() {
  const nome = "Ana";
  return (
    <div className="card">
      <h2>{nome}</h2>
      <img src="/ana.png" alt="Foto da Ana" />
    </div>
  );
}`,
      notes: [
        "className no lugar de class, porque class já é palavra reservada do JavaScript.",
        'Chaves {} abrem um "buraco" para colocar JavaScript no meio do JSX.',
        "Todas as tags precisam fechar, inclusive <img />.",
      ],
    },
    pitfall:
      "Um componente devolve um único elemento raiz. Se precisar de vários, envolva com uma div ou com <>...</>.",
    activity: {
      question: "Como se coloca uma classe CSS em JSX?",
      options: ['class="card"', 'className="card"', 'style="card"'],
      answer: 1,
      explain: "No JSX o atributo se chama className.",
    },
  },
  {
    slug: "props",
    title: "Props: passando dados",
    phase: 2,
    minutes: 12,
    coins: 20,
    why: [
      "Props são os dados que um componente recebe de fora. Elas deixam o mesmo componente servir para casos diferentes.",
      "Sem props, você teria que copiar e colar o componente para cada texto diferente.",
    ],
    analogy: [
      { label: "Componente", text: "a receita" },
      { label: "Props", text: "os ingredientes que chegam de fora" },
    ],
    reading: { label: "react.dev: Passing Props", url: "https://react.dev/learn/passing-props-to-a-component" },
    code: {
      code: `function Cartao({ titulo, texto }) {
  return (
    <div>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}

<Cartao titulo="React" texto="Biblioteca de UI" />`,
      notes: [
        "Entre chaves na assinatura usamos destructuring para pegar titulo e texto.",
        "Quem usa o componente passa os valores como se fossem atributos.",
        "Props são somente leitura: o componente não pode alterá-las.",
      ],
    },
    pitfall: 'Para passar algo que não é texto, use chaves: idade={30}, não idade="30".',
    activity: {
      question: "Props servem para...",
      options: [
        "Passar dados de um componente para outro",
        "Guardar valores que mudam",
        "Estilizar o componente",
      ],
      answer: 0,
      explain: "Props chegam de fora, vindas do componente pai.",
    },
  },
  {
    slug: "renderizacao-condicional",
    title: "Mostrando coisas só às vezes",
    phase: 2,
    minutes: 10,
    coins: 20,
    why: [
      "Às vezes um pedaço da tela só deve aparecer em certas situações: pessoa logada ou não, lista vazia ou cheia.",
      "No React isso é só JavaScript comum: if, && e o operador ternário.",
    ],
    reading: { label: "react.dev: Conditional Rendering", url: "https://react.dev/learn/conditional-rendering" },
    code: {
      code: `function Aviso({ logado }) {
  if (!logado) return <p>Entre para continuar</p>;
  return <p>Bem-vinda de volta!</p>;
}

// Ou direto no JSX:
{logado && <Menu />}
{logado ? <Sair /> : <Entrar />}`,
      notes: [
        "Dá para usar if comum antes do return.",
        "&& mostra algo só se a condição for verdadeira.",
        "O ternário ? : escolhe entre duas opções.",
      ],
    },
    pitfall:
      "Cuidado com {lista.length && <Lista />}: se length for 0, o React mostra o número 0 na tela. Use lista.length > 0 &&.",
    activity: {
      question: "O que {logado && <Menu />} faz?",
      options: [
        "Mostra o Menu só quando logado é verdadeiro",
        "Sempre mostra o Menu",
        "Esconde o Menu quando logado é verdadeiro",
      ],
      answer: 0,
      explain: "O && só continua para o Menu se o valor da esquerda for verdadeiro.",
    },
  },
  {
    slug: "listas-e-key",
    title: "Listas e a prop key",
    phase: 2,
    minutes: 12,
    coins: 20,
    why: [
      "Para mostrar vários itens, você transforma um array em uma lista de elementos com map.",
      "A prop key ajuda o React a saber qual item é qual quando a lista muda.",
    ],
    reading: { label: "react.dev: Rendering Lists", url: "https://react.dev/learn/rendering-lists" },
    code: {
      code: `const frutas = ["maçã", "pera", "uva"];

<ul>
  {frutas.map((fruta) => (
    <li key={fruta}>{fruta}</li>
  ))}
</ul>`,
      notes: [
        "map percorre o array e devolve um elemento para cada item.",
        "key identifica cada item quando a lista muda.",
        "A key precisa ser única entre os irmãos, como um id.",
      ],
    },
    pitfall:
      "Evite usar o índice do array como key quando a lista pode mudar de ordem: o React pode misturar os itens.",
    activity: {
      question: "Para que serve a key?",
      options: ["Identificar cada item da lista", "Estilizar o item", "Ordenar a lista"],
      answer: 0,
      explain: "Com a key, o React acompanha cada item mesmo quando a lista muda.",
    },
  },
  {
    slug: "eventos",
    title: "Eventos: reagindo a cliques",
    phase: 3,
    minutes: 10,
    coins: 20,
    why: [
      "Eventos são ações da pessoa: clique, digitação, envio de formulário. Você diz ao React qual função chamar quando acontecem.",
    ],
    reading: { label: "react.dev: Responding to Events", url: "https://react.dev/learn/responding-to-events" },
    code: {
      code: `function Botao() {
  function aoClicar() {
    alert("Clicou!");
  }
  return <button onClick={aoClicar}>Clique</button>;
}`,
      notes: [
        "onClick recebe uma função.",
        "Passamos aoClicar sem parênteses: queremos que o React chame depois, no clique.",
        "Outros eventos seguem o mesmo padrão: onChange, onSubmit, onMouseEnter.",
      ],
    },
    pitfall:
      "onClick={aoClicar()} chama a função na hora de desenhar, não no clique. Passe a função, não o resultado dela.",
    activity: {
      question: "Qual forma está certa?",
      options: ["onClick={aoClicar()}", "onClick={aoClicar}", 'onclick="aoClicar"'],
      answer: 1,
      explain: "Você passa a função. O React a chama quando o clique acontece.",
    },
  },
  {
    slug: "usestate",
    title: "useState: a memória do componente",
    phase: 3,
    minutes: 12,
    coins: 20,
    why: [
      "Uma função comum esquece tudo quando termina. Um componente precisa lembrar coisas entre uma renderização e outra: quantos cliques, o que foi digitado, se o menu está aberto. É isso que o useState faz.",
    ],
    analogy: [
      { label: "Componente", text: "a receita" },
      { label: "Props", text: "os ingredientes que chegam de fora" },
      { label: "State", text: "o que está na panela agora" },
    ],
    reading: { label: "react.dev: State, a component's memory", url: "https://react.dev/learn/state-a-components-memory" },
    code: {
      code: `function Contador() {
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      Cliques: {n}
    </button>
  );
}`,
      notes: [
        "n é o valor de agora. setN é o único jeito de mudá-lo. O 0 é o valor inicial.",
        "Ao clicar, chamamos setN com o novo valor. O React guarda e desenha o componente de novo.",
        "Chaves {} mostram o valor de n na tela.",
      ],
    },
    pitfall: "Fazer n = n + 1 não funciona: o React não percebe a mudança. Sempre use a função setN.",
    activity: {
      question: "O state começa em 5 e o botão faz setN(n + 1). Você clica 3 vezes. O que o botão mostra?",
      options: ["5", "8", "3"],
      answer: 1,
      explain: "5 + 1 + 1 + 1 = 8. Cada clique pede um novo valor e o React redesenha.",
    },
  },
];

export const REACT_PHASES = [
  { id: 1, title: "Primeiros passos" },
  { id: 2, title: "Componentes e dados" },
  { id: 3, title: "Interatividade" },
];
