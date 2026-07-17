const STORAGE_KEY = "ascensao-save-v3";
const SLOT_COUNT = 3;
const ACTIVE_SLOT_KEY = "ascensao-active-slot";

function slotKey(slotId) {
  return `ascensao-slot-${slotId}`;
}

// =====================================================================
// DADOS DO JOGO: lendas, arquetipos e trilhas de desenvolvimento
// =====================================================================
const legends = [
  { name: "Pele", specialty: "Finalizacao", bonus: { finishing: 6, flair: 4, vision: 2 } },
  { name: "Maradona", specialty: "Drible", bonus: { dribbling: 6, flair: 5, composure: 2 } },
  { name: "Zidane", specialty: "Controle", bonus: { vision: 5, composure: 5, passing: 3 } },
  { name: "Ronaldo Fenomeno", specialty: "Arranque", bonus: { pace: 5, finishing: 5, strength: 2 } },
  { name: "Ronaldinho", specialty: "Magia", bonus: { dribbling: 5, flair: 6, passing: 2 } },
  { name: "Cristiano Ronaldo", specialty: "Mentalidade", bonus: { finishing: 5, aerial: 4, professionalism: 4 } },
  { name: "Messi", specialty: "Genio", bonus: { dribbling: 5, vision: 5, finishing: 3 } },
  { name: "Xavi", specialty: "Passe", bonus: { passing: 6, vision: 4, composure: 3 } },
  { name: "Maldini", specialty: "Leitura", bonus: { tackling: 6, positioning: 5, leadership: 3 } },
  { name: "Buffon", specialty: "Frieza", bonus: { reflexes: 7, composure: 5, leadership: 3 } }
];

const archetypes = [
  "Artilheiro",
  "Camisa 10",
  "Motorzinho",
  "Ponta Driblador",
  "Volante Cacador",
  "Zagueiro Libero",
  "Lateral de Apoio",
  "Goleiro Moderno"
];

const developmentTracks = {
  "Artilheiro": ["Finalizacao", "Movimento", "Frieza"],
  "Camisa 10": ["Passe", "Visao", "Controle"],
  "Motorzinho": ["Resistencia", "Cobertura", "Passe"],
  "Ponta Driblador": ["Drible", "Explosao", "Um contra um"],
  "Volante Cacador": ["Desarme", "Leitura", "Forca"],
  "Zagueiro Libero": ["Posicionamento", "Saida de bola", "Cobertura"],
  "Lateral de Apoio": ["Cruzamento", "Folego", "Arranque"],
  "Goleiro Moderno": ["Reflexo", "Jogo com os pes", "Comando de area"]
};

// =====================================================================
// COMPETICOES: enciclopedia de torneios (ligas, copas, selecoes)
// =====================================================================
const competitionLibrary = [
  {
    id: "brasileirao-a",
    name: "Brasileirao Serie A",
    region: "Brasil",
    format: "20 clubes, 38 rodadas, pontos corridos e ida e volta.",
    currentTopScorer: "Pedro",
    allTimeTopScorer: "Roberto Dinamite",
    topAssist: "Arrascaeta",
    recordChampion: "Palmeiras",
    rivalryNotes: "Classicos aumentam pressao, moral e exigencia da diretoria.",
    source: "CBF"
  },
  {
    id: "brasileirao-b",
    name: "Brasileirao Serie B",
    region: "Brasil",
    format: "38 rodadas; em 2026, 1 e 2 sobem direto e outras 2 vagas vao para playoffs entre 3 e 6.",
    currentTopScorer: "Cauan Barros",
    allTimeTopScorer: "Oseas",
    topAssist: "Giovanny",
    recordChampion: "Coritiba",
    rivalryNotes: "A briga pelo acesso muda humor do clube e seguranca do tecnico.",
    source: "CBF"
  },
  {
    id: "copa-do-brasil",
    name: "Copa do Brasil",
    region: "Brasil",
    format: "126 clubes em 2026, nove fases e final em jogo unico.",
    currentTopScorer: "Matheus Lagoa",
    allTimeTopScorer: "Fred",
    topAssist: "Lucas Lima",
    recordChampion: "Cruzeiro",
    rivalryNotes: "Mata-mata e penalti mexem com confianca e narrativa da carreira.",
    source: "CBF"
  },
  {
    id: "libertadores",
    name: "CONMEBOL Libertadores",
    region: "America do Sul",
    format: "Pre-libertadores, grupos e mata-mata ate final unica.",
    currentTopScorer: "Miguel Borja",
    allTimeTopScorer: "Alberto Spencer",
    topAssist: "Nicolas De La Cruz",
    recordChampion: "Independiente",
    rivalryNotes: "Altitude, viagens e rivalidades continentais pesam no desgaste.",
    source: "CONMEBOL"
  },
  {
    id: "sudamericana",
    name: "CONMEBOL Sudamericana",
    region: "America do Sul",
    format: "Primeira fase, grupos e mata-mata ate final unica.",
    currentTopScorer: "Luciano",
    allTimeTopScorer: "Hernan Barcos",
    topAssist: "Matias Rojas",
    recordChampion: "Independiente del Valle",
    rivalryNotes: "Torneio ideal para crescer reputacao internacional.",
    source: "CONMEBOL"
  },
  {
    id: "champions",
    name: "UEFA Champions League",
    region: "Europa",
    format: "36 clubes em fase de liga, oito jogos, playoffs e mata-mata.",
    currentTopScorer: "Kylian Mbappe",
    allTimeTopScorer: "Cristiano Ronaldo",
    topAssist: "Kevin De Bruyne",
    recordChampion: "Real Madrid",
    rivalryNotes: "Jogo grande aumenta valor de mercado, premios e idolatria.",
    source: "UEFA"
  },
  {
    id: "europa",
    name: "UEFA Europa League",
    region: "Europa",
    format: "Fase de liga com 36 clubes, seguida por playoffs e mata-mata.",
    currentTopScorer: "Ayoub El Kaabi",
    allTimeTopScorer: "Pierre-Emerick Aubameyang",
    topAssist: "Bruno Fernandes",
    recordChampion: "Sevilla",
    rivalryNotes: "Otima competicao para virar protagonista europeu.",
    source: "UEFA"
  },
  {
    id: "conference",
    name: "UEFA Conference League",
    region: "Europa",
    format: "Fase de liga e mata-mata em calendario proprio da UEFA.",
    currentTopScorer: "Afimico Pululu",
    allTimeTopScorer: "Tammy Abraham",
    topAssist: "Jarrod Bowen",
    recordChampion: "Chelsea",
    rivalryNotes: "Escala ideal para revelar craques em ascensao.",
    source: "UEFA"
  },
  {
    id: "world-cup",
    name: "Copa do Mundo",
    region: "Selecoes",
    format: "Grupos e mata-mata em jogo unico.",
    currentTopScorer: "Kylian Mbappe",
    allTimeTopScorer: "Miroslav Klose",
    topAssist: "Lionel Messi",
    recordChampion: "Brasil",
    rivalryNotes: "Seu auge na selecao define legado e peso historico.",
    source: "FIFA"
  }
];

// =====================================================================
// SELECAO NACIONAL: forca das selecoes, sorteio de grupo e progressao
// de torneio (fase de grupos -> quartas -> semifinal -> final)
// =====================================================================
const nationalTeamStrength = {
  "Brasil": 88, "Argentina": 87, "Franca": 86, "Espanha": 85, "Alemanha": 85,
  "Inglaterra": 84, "Portugal": 84, "Italia": 82, "Holanda": 81, "Belgica": 80,
  "Uruguai": 79, "Croacia": 79, "Colombia": 77, "Marrocos": 76, "Senegal": 75,
  "Estados Unidos": 75, "Mexico": 74, "Japao": 74, "Suica": 76, "Dinamarca": 77
};

const nationalTeamPool = Object.keys(nationalTeamStrength);

function nationalTeamRating(name) {
  return nationalTeamStrength[name] ?? 72;
}

function pickNationalOpponents(ownNationality, count, exclude = []) {
  const pool = nationalTeamPool.filter((name) => name !== ownNationality && !exclude.includes(name));
  const picks = [];
  while (picks.length < count && pool.length) {
    const index = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(index, 1)[0]);
  }
  return picks;
}

function fixtureWasWon(fixture) {
  const score = parseResultScore(fixture.result);
  if (!score) return false;
  if (score.teamGoals !== score.oppGoals) return score.teamGoals > score.oppGoals;
  if (fixture.penalty) return fixture.penalty.teamPens > fixture.penalty.oppPens;
  return false;
}

function buildNationalGroupFixtures(nationality, torneioName) {
  const opponents = pickNationalOpponents(nationality, 3);
  return opponents.map((opponent, index) => ({
    ...createFixture({
      roundLabel: `${torneioName} - Grupo (Jogo ${index + 1})`,
      competition: torneioName,
      opponent,
      importance: 78 + Math.round(nationalTeamRating(opponent) / 10),
      live: true
    }),
    tournament: "national",
    tournamentName: torneioName,
    stage: "grupos",
    isNational: true
  }));
}

// =====================================================================
// LOGOS: imagens de clubes e competicoes (com fallback de iniciais)
// =====================================================================
const clubLogos = {
  "Flamengo": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/flamengo.png",
  "Palmeiras": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/palmeiras.png",
  "Corinthians": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/corinthians.png",
  "Sao Paulo": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/saopaulo.png",
  "Santos": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/santossp.png",
  "Fluminense": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/fluminense.png",
  "Botafogo": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/botafogo.png",
  "Vasco": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/vascodagama.png",
  "Atletico-MG": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/atleticomg.png",
  "Cruzeiro": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/cruzeiro.png",
  "Gremio": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/gremio.png",
  "Internacional": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/interrs.png",
  "Bahia": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/bahia.png",
  "Vitoria": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/vitoria.png",
  "Athletico-PR": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/atleticopr.png",
  "Coritiba": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/coritiba.png",
  "Sport": "https://sportlogos.github.io/football.db.logos/south-america/br-brazil/sportrecife.png",
  "Real Madrid": "https://sportlogos.github.io/football.db.logos/europe/es-espana/madrid.png",
  "Barcelona": "https://sportlogos.github.io/football.db.logos/europe/es-espana/barcelona.png",
  "Manchester City": "https://sportlogos.github.io/football.db.logos/europe/en-england/mancity.png",
  "Liverpool": "https://sportlogos.github.io/football.db.logos/europe/en-england/liverpool.png",
  "Arsenal": "https://sportlogos.github.io/football.db.logos/europe/en-england/arsenal.png",
  "Chelsea": "https://sportlogos.github.io/football.db.logos/europe/en-england/chelsea.png",
  "Manchester United": "https://sportlogos.github.io/football.db.logos/europe/en-england/manutd.png",
  "Bayern de Munique": "https://sportlogos.github.io/football.db.logos/europe/de-deutschland/i-bayern.png",
  "Borussia Dortmund": "https://sportlogos.github.io/football.db.logos/europe/de-deutschland/i-dortmund.png",
  "Bayer Leverkusen": "https://sportlogos.github.io/football.db.logos/europe/de-deutschland/i-leverkusen.png",
  "PSG": "https://sportlogos.github.io/football.db.logos/europe/fr-france/paris.png",
  "Marseille": "https://sportlogos.github.io/football.db.logos/europe/fr-france/marseille.png",
  "Lyon": "https://sportlogos.github.io/football.db.logos/europe/fr-france/lyon.png",
  "Benfica": "https://sportlogos.github.io/football.db.logos/europe/pt-portugal/benfica.png",
  "Porto": "https://sportlogos.github.io/football.db.logos/europe/pt-portugal/porto.png",
  "Sporting": "https://sportlogos.github.io/football.db.logos/europe/pt-portugal/sporting.png",
  "Atletico de Madrid": "https://sportlogos.github.io/football.db.logos/europe/es-espana/atletico.png",
  "Sevilla": "https://sportlogos.github.io/football.db.logos/europe/es-espana/sevilla.png",
  "Juventus": "https://sportlogos.github.io/football.db.logos/europe/it-italia/juventus.png",
  "Inter": "https://sportlogos.github.io/football.db.logos/europe/it-italia/inter.png",
  "Milan": "https://sportlogos.github.io/football.db.logos/europe/it-italia/milan.png",
  "Napoli": "https://sportlogos.github.io/football.db.logos/europe/it-italia/napoli.png",
  "River Plate": "https://sportlogos.github.io/football.db.logos/south-america/ar-argentina/riverplate.png",
  "Boca Juniors": "https://sportlogos.github.io/football.db.logos/south-america/ar-argentina/bocajuniors.png",
  "Ajax": "https://sportlogos.github.io/football.db.logos/europe/nl-nederland/ajax.png"
};

const competitionLogos = {
  "Brasileirao Serie A": "https://images.seeklogo.com/logo-png/38/1/campeonato-brasileiro-serie-a-logo-png_seeklogo-387045.png",
  "Brasileirao Serie B": "https://images.seeklogo.com/logo-png/38/1/campeonato-brasileiro-serie-b-logo-png_seeklogo-387046.png",
  "Copa do Brasil": "https://images.seeklogo.com/logo-png/38/1/copa-do-brasil-logo-png_seeklogo-387048.png",
  "CONMEBOL Libertadores": "https://images.seeklogo.com/logo-png/30/2/copa-libertadores-logo-png_seeklogo-302507.png",
  "CONMEBOL Sudamericana": "https://images.seeklogo.com/logo-png/30/2/copa-sudamericana-logo-png_seeklogo-302506.png",
  "UEFA Champions League": "https://images.seeklogo.com/logo-png/30/1/uefa-champions-league-logo-png_seeklogo-303417.png",
  "UEFA Europa League": "https://images.seeklogo.com/logo-png/30/1/uefa-europa-league-logo-png_seeklogo-303431.png",
  "UEFA Conference League": "https://images.seeklogo.com/logo-png/45/1/uefa-europa-conference-league-logo-png_seeklogo-456226.png",
  "Copa do Mundo": "https://images.seeklogo.com/logo-png/43/1/fifa-world-cup-logo-png_seeklogo-438141.png",
  "La Liga": "https://images.seeklogo.com/logo-png/13/1/la-liga-logo-png_seeklogo-139024.png",
  "Premier League": "https://images.seeklogo.com/logo-png/27/1/premier-league-logo-png_seeklogo-274369.png",
  "Bundesliga": "https://images.seeklogo.com/logo-png/12/1/bundesliga-logo-png_seeklogo-124278.png",
  "Ligue 1": "https://images.seeklogo.com/logo-png/37/1/ligue-1-logo-png_seeklogo-374912.png",
  "Liga Portugal": "https://images.seeklogo.com/logo-png/40/1/liga-portugal-logo-png_seeklogo-400226.png",
  "MLS": "https://images.seeklogo.com/logo-png/28/1/major-league-soccer-logo-png_seeklogo-283502.png"
};

// =====================================================================
// ELENCO: pools de nomes para gerar companheiros de time
// (ficam ANTES do array "clubs" de proposito: o array chama
// generateSquad() na hora que carrega, entao esses nomes precisam
// existir primeiro para evitar erro de referencia)
// =====================================================================
const teammateFirstNames = [
  "Carlos", "Rafael", "Joao", "Marcos", "Lucas", "Pedro", "Gabriel", "Mateus", "Thiago", "Bruno",
  "Andre", "Alan", "Diego", "Matheus", "Henrique", "Vitor", "Guilherme", "Caio", "Yuri", "Igor",
  "Felipe", "Renato", "Daniel", "Leonardo", "Rodrigo", "Fabio", "Wesley", "Erick", "Otavio", "Samuel"
];

const teammateLastNames = [
  "Almeida", "Ferreira", "Souza", "Costa", "Pereira", "Rocha", "Lima", "Barbosa", "Nascimento", "Araujo",
  "Ribeiro", "Carvalho", "Gomes", "Martins", "Teixeira", "Moura", "Cardoso", "Vieira", "Dias", "Correia",
  "Duarte", "Freitas", "Monteiro", "Batista", "Pinto", "Machado", "Nunes", "Castro", "Fonseca", "Azevedo"
];

// =====================================================================
// BANCO DE CLUBES E LIGAS: Brasil, Europa, America do Sul, MLS, Liga MX
// =====================================================================
const clubs = [
  ["Flamengo", "Brasil", "Brasileirao Serie A", 84, "Rio de Janeiro", ["Vasco", "Fluminense", "Botafogo"]],
  ["Palmeiras", "Brasil", "Brasileirao Serie A", 85, "Sao Paulo", ["Corinthians", "Sao Paulo", "Santos"]],
  ["Corinthians", "Brasil", "Brasileirao Serie A", 80, "Sao Paulo", ["Palmeiras", "Sao Paulo", "Santos"]],
  ["Sao Paulo", "Brasil", "Brasileirao Serie A", 79, "Sao Paulo", ["Palmeiras", "Corinthians", "Santos"]],
  ["Santos", "Brasil", "Brasileirao Serie A", 77, "Sao Paulo", ["Palmeiras", "Corinthians", "Sao Paulo"]],
  ["Fluminense", "Brasil", "Brasileirao Serie A", 81, "Rio de Janeiro", ["Flamengo", "Botafogo", "Vasco"]],
  ["Botafogo", "Brasil", "Brasileirao Serie A", 80, "Rio de Janeiro", ["Flamengo", "Fluminense", "Vasco"]],
  ["Vasco", "Brasil", "Brasileirao Serie A", 76, "Rio de Janeiro", ["Flamengo", "Fluminense", "Botafogo"]],
  ["Atletico-MG", "Brasil", "Brasileirao Serie A", 80, "Minas Gerais", ["Cruzeiro"]],
  ["Cruzeiro", "Brasil", "Brasileirao Serie A", 79, "Minas Gerais", ["Atletico-MG"]],
  ["Gremio", "Brasil", "Brasileirao Serie A", 79, "Rio Grande do Sul", ["Internacional"]],
  ["Internacional", "Brasil", "Brasileirao Serie A", 80, "Rio Grande do Sul", ["Gremio"]],
  ["Bahia", "Brasil", "Brasileirao Serie A", 77, "Bahia", ["Vitoria"]],
  ["Vitoria", "Brasil", "Brasileirao Serie A", 74, "Bahia", ["Bahia"]],
  ["Athletico-PR", "Brasil", "Brasileirao Serie A", 78, "Parana", ["Coritiba"]],
  ["Coritiba", "Brasil", "Brasileirao Serie A", 73, "Parana", ["Athletico-PR"]],
  ["Fortaleza", "Brasil", "Brasileirao Serie A", 77, "Ceara", ["Ceara"]],
  ["Ceara", "Brasil", "Brasileirao Serie A", 74, "Ceara", ["Fortaleza"]],
  ["Bragantino", "Brasil", "Brasileirao Serie A", 76, "Sao Paulo", []],
  ["Sport", "Brasil", "Brasileirao Serie A", 75, "Pernambuco", ["Santa Cruz", "Nautico"]],
  ["Real Madrid", "Espanha", "La Liga", 90, "Madrid", ["Barcelona", "Atletico de Madrid"]],
  ["Barcelona", "Espanha", "La Liga", 88, "Catalunha", ["Real Madrid", "Espanyol"]],
  ["Atletico de Madrid", "Espanha", "La Liga", 86, "Madrid", ["Real Madrid", "Barcelona"]],
  ["Sevilla", "Espanha", "La Liga", 80, "Andaluzia", ["Real Betis"]],
  ["Real Betis", "Espanha", "La Liga", 78, "Andaluzia", ["Sevilla"]],
  ["Real Sociedad", "Espanha", "La Liga", 79, "Pais Basco", ["Athletic Bilbao"]],
  ["Athletic Bilbao", "Espanha", "La Liga", 80, "Pais Basco", ["Real Sociedad"]],
  ["Villarreal", "Espanha", "La Liga", 79, "Valencia", []],
  ["Manchester City", "Inglaterra", "Premier League", 89, "Manchester", ["Manchester United", "Liverpool"]],
  ["Liverpool", "Inglaterra", "Premier League", 88, "Liverpool", ["Manchester United", "Everton"]],
  ["Arsenal", "Inglaterra", "Premier League", 87, "Londres", ["Chelsea", "Tottenham"]],
  ["Chelsea", "Inglaterra", "Premier League", 84, "Londres", ["Arsenal", "Tottenham"]],
  ["Manchester United", "Inglaterra", "Premier League", 85, "Manchester", ["Manchester City", "Liverpool"]],
  ["Tottenham", "Inglaterra", "Premier League", 83, "Londres", ["Arsenal", "Chelsea"]],
  ["Newcastle", "Inglaterra", "Premier League", 81, "Newcastle", []],
  ["Aston Villa", "Inglaterra", "Premier League", 80, "Birmingham", []],
  ["West Ham", "Inglaterra", "Premier League", 77, "Londres", []],
  ["Bayern de Munique", "Alemanha", "Bundesliga", 88, "Baviera", ["Borussia Dortmund"]],
  ["Borussia Dortmund", "Alemanha", "Bundesliga", 84, "Renania", ["Bayern de Munique"]],
  ["Bayer Leverkusen", "Alemanha", "Bundesliga", 86, "Renania", ["Koln"]],
  ["RB Leipzig", "Alemanha", "Bundesliga", 82, "Saxonia", []],
  ["Eintracht Frankfurt", "Alemanha", "Bundesliga", 79, "Frankfurt", []],
  ["Stuttgart", "Alemanha", "Bundesliga", 78, "Stuttgart", []],
  ["PSG", "Franca", "Ligue 1", 87, "Paris", ["Marseille"]],
  ["Marseille", "Franca", "Ligue 1", 81, "Marselha", ["PSG"]],
  ["Lyon", "Franca", "Ligue 1", 79, "Lyon", ["Saint-Etienne"]],
  ["Monaco", "Franca", "Ligue 1", 80, "Monaco", []],
  ["Lille", "Franca", "Ligue 1", 78, "Lille", []],
  ["Nice", "Franca", "Ligue 1", 76, "Nice", []],
  ["Benfica", "Portugal", "Liga Portugal", 83, "Lisboa", ["Sporting", "Porto"]],
  ["Porto", "Portugal", "Liga Portugal", 84, "Porto", ["Benfica", "Sporting"]],
  ["Sporting", "Portugal", "Liga Portugal", 83, "Lisboa", ["Benfica", "Porto"]],
  ["Braga", "Portugal", "Liga Portugal", 78, "Braga", []],
  ["Vitoria Guimaraes", "Portugal", "Liga Portugal", 75, "Guimaraes", []],
  ["Juventus", "Italia", "Serie A", 86, "Turim", ["Inter", "Milan"]],
  ["Inter", "Italia", "Serie A", 87, "Milao", ["Milan", "Juventus"]],
  ["Milan", "Italia", "Serie A", 84, "Milao", ["Inter", "Juventus"]],
  ["Napoli", "Italia", "Serie A", 83, "Napoles", ["Roma"]],
  ["Roma", "Italia", "Serie A", 81, "Roma", ["Lazio", "Napoli"]],
  ["Lazio", "Italia", "Serie A", 79, "Roma", ["Roma"]],
  ["Atalanta", "Italia", "Serie A", 80, "Bergamo", []],
  ["Ajax", "Holanda", "Eredivisie", 81, "Amsterda", ["Feyenoord", "PSV"]],
  ["PSV", "Holanda", "Eredivisie", 82, "Eindhoven", ["Ajax"]],
  ["Feyenoord", "Holanda", "Eredivisie", 80, "Roterda", ["Ajax"]],
  ["Inter Miami", "Estados Unidos", "MLS", 76, "Florida", ["Orlando City"]],
  ["Orlando City", "Estados Unidos", "MLS", 73, "Florida", ["Inter Miami"]],
  ["LA Galaxy", "Estados Unidos", "MLS", 75, "California", []],
  ["Seattle Sounders", "Estados Unidos", "MLS", 74, "Washington", []],
  ["River Plate", "Argentina", "Liga Argentina", 83, "Buenos Aires", ["Boca Juniors"]],
  ["Boca Juniors", "Argentina", "Liga Argentina", 82, "Buenos Aires", ["River Plate"]],
  ["Racing", "Argentina", "Liga Argentina", 78, "Buenos Aires", ["Independiente"]],
  ["Independiente", "Argentina", "Liga Argentina", 76, "Buenos Aires", ["Racing"]],
  ["Club America", "Mexico", "Liga MX", 80, "Cidade do Mexico", ["Chivas Guadalajara"]],
  ["Chivas Guadalajara", "Mexico", "Liga MX", 76, "Guadalajara", ["Club America"]]
].map(([name, country, competition, strength, state, rivals]) => ({
  name,
  country,
  competition,
  strength,
  state,
  rivals,
  squad: generateSquad(name)
}));

// =====================================================================
// FEED SOCIAL: templates de noticias e posts
// =====================================================================
const newsTemplates = [
  "Torcida do {club} pede mais minutos para {player}.",
  "Comentaristas elogiam a evolucao de {player} no {club}.",
  "Ex-jogador afirma que {player} pode virar idolo do {club}.",
  "Influenciadores debatem se {player} merece a faixa de capitao.",
  "Jornal local diz que {player} pode assumir bolas paradas em breve."
];

const teammateNewsTemplates = [
  "Nos treinos, {player} e {teammate} formam a dupla mais comentada do {club} no momento.",
  "{teammate}, capitao do {club}, elogia publicamente a entrega de {player} nos ultimos jogos.",
  "Bastidores: {teammate} tem puxado {player} para o protagonismo dentro de campo.",
  "Torcida do {club} ja aposta na parceria entre {player} e {teammate} para a sequencia da temporada."
];


// =====================================================================
// GERACAO DE ELENCO: nomes, overall, astro do time e capitao
// =====================================================================
function generateSquad(clubName) {
  const positions = ["GOL", "LD", "ZAG", "ZAG", "LE", "VOL", "MC", "MEI", "PD", "ATA", "PE"];
  const usedNames = new Set();

  const squad = Array.from({ length: 22 }, (_, index) => {
    let name;
    do {
      name = `${randomFrom(teammateFirstNames)} ${randomFrom(teammateLastNames)}`;
    } while (usedNames.has(name) && usedNames.size < teammateFirstNames.length * teammateLastNames.length);
    usedNames.add(name);

    return {
      name,
      overall: 64 + Math.floor(Math.random() * 18),
      position: positions[index % positions.length],
      age: 18 + Math.floor(Math.random() * 15),
      number: index + 1,
      isStar: false,
      isCaptain: false
    };
  });

  const outfielders = squad.filter((athlete) => athlete.position !== "GOL");
  const star = outfielders.reduce((best, athlete) => (athlete.overall > best.overall ? athlete : best), outfielders[0]);
  if (star) star.isStar = true;

  const captainCandidates = outfielders.filter((athlete) => athlete !== star);
  const captain = captainCandidates.length ? randomFrom(captainCandidates) : star;
  if (captain) captain.isCaptain = true;

  return squad;
}

function getStarTeammate(club) {
  return club?.squad?.find((athlete) => athlete.isStar) ?? null;
}

function getRandomTeammate(club, excludeStar = false) {
  const pool = (club?.squad ?? []).filter((athlete) => athlete.position !== "GOL" && (!excludeStar || !athlete.isStar));
  return pool.length ? randomFrom(pool) : null;
}

// =====================================================================
// ESTADO DA APLICACAO: criacao inicial, save/load e setters de estado
// =====================================================================
function createInitialState() {
  return {
    tab: "carreira",
    competitionView: competitionLibrary[0].id,
    selectedFixtureId: null,
    transition: null,
    penaltyPrompt: null,
    matchFocus: null,
    activeSlot: null,
    pendingSlot: null,
    game: null
  };
}

let state = loadState();
render();

function migrateLegacySave() {
  const legacy = localStorage.getItem(STORAGE_KEY);
  if (legacy && !localStorage.getItem(slotKey(1))) {
    localStorage.setItem(slotKey(1), legacy);
    localStorage.setItem(ACTIVE_SLOT_KEY, "1");
  }
}

function loadState() {
  migrateLegacySave();
  const activeSlotRaw = localStorage.getItem(ACTIVE_SLOT_KEY);
  const activeSlot = activeSlotRaw ? Number(activeSlotRaw) : null;

  if (activeSlot) {
    const raw = localStorage.getItem(slotKey(activeSlot));
    if (raw) {
      try {
        return { ...createInitialState(), ...JSON.parse(raw), activeSlot };
      } catch {
        return createInitialState();
      }
    }
  }

  return createInitialState();
}

function saveState() {
  if (state.game && state.activeSlot) {
    localStorage.setItem(slotKey(state.activeSlot), JSON.stringify(state));
    localStorage.setItem(ACTIVE_SLOT_KEY, String(state.activeSlot));
  }
}

function getSlotSummaries() {
  const slots = [];
  for (let slotId = 1; slotId <= SLOT_COUNT; slotId += 1) {
    const raw = localStorage.getItem(slotKey(slotId));
    if (!raw) {
      slots.push({ id: slotId, empty: true });
      continue;
    }
    try {
      const parsed = JSON.parse(raw);
      const g = parsed.game;
      slots.push({
        id: slotId,
        empty: !g,
        playerName: g?.player?.name ?? "Carreira",
        club: g?.player?.club ?? "-",
        overall: g?.player?.overall ?? "-",
        season: g?.season ?? "-",
        retired: !!g?.retired
      });
    } catch {
      slots.push({ id: slotId, empty: true });
    }
  }
  return slots;
}

function continueSlot(slotId) {
  const raw = localStorage.getItem(slotKey(slotId));
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    localStorage.setItem(ACTIVE_SLOT_KEY, String(slotId));
    state = { ...createInitialState(), ...parsed, activeSlot: slotId, pendingSlot: null };
    render();
  } catch {
    // slot corrompido, ignora
  }
}

function startNewInSlot(slotId) {
  state = { ...createInitialState(), pendingSlot: slotId };
  render();
}

function deleteSlot(slotId) {
  localStorage.removeItem(slotKey(slotId));
  if (state.activeSlot === slotId) {
    localStorage.removeItem(ACTIVE_SLOT_KEY);
    state = createInitialState();
  }
  render();
}

function goToSlotMenu() {
  state = { ...createInitialState() };
  render();
}

function setState(patch) {
  state = { ...state, ...patch };
  saveState();
  render();
}

function setTransition(transition) {
  state = { ...state, transition };
  render();
}

function setPenaltyPrompt(penaltyPrompt) {
  state = { ...state, penaltyPrompt };
  render();
}

function setMatchFocus(matchFocus) {
  state = { ...state, matchFocus };
  render();
}

function createPlaybackState(events = []) {
  return {
    timelineIndex: 0,
    revealedEvents: events.length ? [events[0]] : [],
    score: { team: 0, opponent: 0 },
    finished: events.length <= 1
  };
}

// =====================================================================
// UTILITARIOS GERAIS: sorteio, clamp, iniciais, logos
// =====================================================================
function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function poissonSample(lambda) {
  const boundedLambda = clamp(lambda, 0.05, 4.5);
  const limit = Math.exp(-boundedLambda);
  let k = 0;
  let p = 1;
  do {
    k += 1;
    p *= Math.random();
  } while (p > limit);
  return k - 1;
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function logoMarkup(name, type = "club", large = false) {
  const src = type === "club" ? clubLogos[name] : competitionLogos[name];
  const className = type === "club" ? "team-logo" : "comp-logo";
  const sizeClass = large ? " lg" : "";

  if (src) {
    return `<div class="${className}${sizeClass}"><img src="${src}" alt="${name}"></div>`;
  }

  return `
    <div class="${className}${sizeClass}">
      <span class="logo-fallback">${initials(name)}</span>
    </div>
  `;
}

// =====================================================================
// INICIO DE CARREIRA: cria jogador, clube e o objeto "game" completo
// =====================================================================
function startCareer(formData) {
  const legend = legends.find((item) => item.name === formData.legend);
  const club = formData.club === "Aleatorio"
    ? randomFrom(clubs.filter((item) => item.country === "Brasil"))
    : clubs.find((item) => item.name === formData.club);

  const overall = clamp(
    60 + Math.floor(Math.random() * 5) + Math.floor(Object.keys(legend.bonus).length / 2),
    60,
    70
  );

  const player = {
    ...formData,
    club: club.name,
    league: club.competition,
    overall,
    startingOverall: overall,
    age: Number(formData.age),
    morale: 70,
    form: 68,
    energy: 84,
    happiness: 65,
    reputation: 12,
    influence: 18,
    goals: 0,
    assists: 0,
    matches: 0,
    trophies: [],
    seasonAwards: [],
    isCaptain: false,
    setPieces: [],
    competitionStats: {},
    injury: null,
    development: {
      xp: 0,
      level: 1,
      focus: developmentTracks[formData.archetype]?.[0] ?? "Finalizacao",
      peaks: []
    }
  };

  const game = {
    player,
    season: 2026,
    round: 1,
    socialFeed: buildSocialFeed(player, club),
    inbox: [
      `${club.name} oficializou seu contrato ate dezembro de 2028.`,
      "Seu empresario acredita que um bom estadual vai aumentar sua valorizacao.",
      "O tecnico pediu simplicidade: primeiro ganhe confianca, depois cobre protagonismo."
    ],
    contract: {
      club: club.name,
      salary: Math.round(18000 + overall * 900),
      yearsLeft: 2,
      releaseClause: Math.round(2500000 + overall * 45000)
    },
    coach: {
      trust: 54,
      rotationRisk: 30,
      allowsCaptaincy: false,
      allowsPenalties: false,
      allowsFreeKicks: false
    },
    agent: {
      level: "Promissor",
      network: 52,
      marketBuzz: 22,
      offers: []
    },
    body: {
      fitness: 81,
      freshness: 79,
      injuryRisk: 11
    },
    club: {
      ...club,
      difficulty: club.strength,
      boardConfidence: 58,
      fanLove: 50
    },
    milestones: [],
    careerHistory: [],
    fixtures: generateSeasonFixtures(club, player),
    decision: null,
    seasonLog: [],
    seasonSummary: null
  };

  const slotId = state.pendingSlot ?? 1;
  localStorage.setItem(ACTIVE_SLOT_KEY, String(slotId));
  state = { ...state, activeSlot: slotId, pendingSlot: null };
  setState({ game, tab: "carreira" });
}

// =====================================================================
// CALENDARIO DA TEMPORADA: fixtures de estadual, liga, copas e selecao
// =====================================================================
function generateSeasonFixtures(club, player, convoked = false, season = 2026) {
  const list = [];
  const stateCupTeams = clubs.filter((item) => item.state === club.state).slice(0, 8);
  const stateOpponents = stateCupTeams.filter((item) => item.name !== club.name);

  stateOpponents.forEach((opponent, index) => {
    list.push(createFixture({
      roundLabel: `Estadual ${index + 1}`,
      competition: `${club.state} Championship`,
      opponent: opponent.name,
      importance: opponent.rivals.includes(club.name) ? 85 : 55,
      live: index >= stateOpponents.length - 2
    }));
  });

  const leagueTeams = clubs.filter((item) => item.competition === club.competition);
  if (leagueTeams.length > 1) {
    const schedule = roundRobin(leagueTeams.map((item) => item.name));
    schedule.forEach((round, index) => {
      round.forEach((pairing) => {
        if (pairing.includes(club.name)) {
          const opponent = pairing[0] === club.name ? pairing[1] : pairing[0];
          list.push(createFixture({
            roundLabel: `${club.competition} ${index + 1}`,
            competition: club.competition,
            opponent,
            importance: getImportance(club.name, opponent),
            live: index >= schedule.length - 2
          }));
        }
      });
    });
  }

  list.push(
    createFixture({ roundLabel: "Copa Nacional", competition: "Copa do Brasil", opponent: "Sorteio nacional", importance: 72, live: true }),
    createFixture({ roundLabel: "Continental", competition: "CONMEBOL Libertadores", opponent: "Adversario continental", importance: 88, live: true })
  );

  if (convoked && player.nationality) {
    const torneioName = season % 4 === 0 ? "Copa do Mundo" : "Torneio Continental";
    list.push(...buildNationalGroupFixtures(player.nationality, torneioName));
  }

  return list;
}

function createFixture({ roundLabel, competition, opponent, importance, live }) {
  return {
    id: crypto.randomUUID(),
    roundLabel,
    competition,
    opponent,
    importance,
    live,
    played: false,
    result: null,
    playerGoals: 0,
    playerAssists: 0,
    rating: null,
    events: []
  };
}

function roundRobin(teamNames) {
  const teams = [...teamNames];
  if (teams.length % 2 !== 0) teams.push("Folga");

  const rounds = [];
  const totalRounds = teams.length - 1;
  const half = teams.length / 2;

  for (let round = 0; round < totalRounds; round += 1) {
    const matches = [];
    for (let i = 0; i < half; i += 1) {
      const home = teams[i];
      const away = teams[teams.length - 1 - i];
      if (home !== "Folga" && away !== "Folga") {
        matches.push(round % 2 === 0 ? [home, away] : [away, home]);
      }
    }
    rounds.push(matches);
    teams.splice(1, 0, teams.pop());
  }

  const returnRounds = rounds.map((matches) => matches.map(([home, away]) => [away, home]));
  return [...rounds, ...returnRounds];
}

function getImportance(clubName, opponentName) {
  const club = clubs.find((item) => item.name === clubName);
  if (!club) return 60;
  if (club.rivals.includes(opponentName)) return 92;
  const opponent = clubs.find((item) => item.name === opponentName);
  return clamp(50 + Math.round((opponent?.strength ?? 72) / 4), 52, 86);
}

// =====================================================================
// NARRATIVA: feed social e decisoes pre-jogo
// =====================================================================
function buildSocialFeed(player, club) {
  return Array.from({ length: 5 }, () => {
    const useTeammate = Math.random() < 0.4;
    const teammate = useTeammate ? (getStarTeammate(club) ?? getRandomTeammate(club)) : null;
    const template = teammate ? randomFrom(teammateNewsTemplates) : randomFrom(newsTemplates);
    return {
      id: crypto.randomUUID(),
      author: randomFrom(["Jornal da Bola", "Torcida 24h", "Mesa Tatica", "Influencer da Resenha", "Canal Arquibancada"]),
      text: template
        .replaceAll("{club}", club.name)
        .replaceAll("{player}", player.name)
        .replaceAll("{teammate}", teammate?.name ?? ""),
      impact: randomFrom(["popularidade", "pressao", "moral"])
    };
  });
}

function createDecision(game, fixture) {
  const options = [
    { label: "Pedir liberdade total", effect: { trust: -4, morale: 4 } },
      { label: "Seguir o plano do tecnico", effect: { trust: 5, morale: 1 } },
      { label: "Chamar responsabilidade", effect: { trust: 3, morale: 3 } }
    ];

  return {
    fixtureId: fixture.id,
    title: `Decisao pre-jogo: ${fixture.competition} contra ${fixture.opponent}`,
    description: "Jogo grande. Sua postura antes da partida mexe com confianca, moral e espaco no time.",
    options,
    inGameOptions: [
      { label: "Atacar a ultima linha", effect: "Mais agressividade e mais risco no contra-ataque." },
      { label: "Controlar o ritmo", effect: "Time tenta esfriar o jogo e reduzir erros." },
      { label: "Incendiar a torcida", effect: "Aumenta a atmosfera emocional do confronto." }
    ]
  };
}

function chooseDecision(index) {
  const game = structuredClone(state.game);
  if (!game.decision) return;
  const option = game.decision.options[index];
  game.decision.choice = option;
  game.inbox.unshift(`Voce escolheu: ${option.label}. O elenco reagiu imediatamente.`);
  setState({ game });
}

// =====================================================================
// SIMULACAO DE PARTIDA: eventos, placar e efeitos no jogador/clube
// =====================================================================
function buildLiveEvents(playerName, opponent, teamGoals, oppGoals, goals, assists, penShootout, decisiveMoment, club = null) {
  const buildupPartner = getRandomTeammate(club);
  const assistTarget = getRandomTeammate(club);
  const buildupText = buildupPartner
    ? `${playerName} troca passes com ${buildupPartner.name} e acelera o ataque.`
    : `${playerName} aparece entrelinhas e acelera o ataque.`;

  const events = [
    { minute: 8 + Math.floor(Math.random() * 8), text: "A torcida transforma o clima do estadio.", type: "ambiente" },
    { minute: 16 + Math.floor(Math.random() * 10), text: "Jogo muito fisico no meio-campo.", type: "ritmo" },
    { minute: 28 + Math.floor(Math.random() * 10), text: buildupText, type: "jogada" }
  ];

  if (goals > 0) {
    events.push({ minute: 38 + Math.floor(Math.random() * 18), text: `Gol de ${playerName}. Explosao total nas arquibancadas.`, type: "gol" });
  }
  if (assists > 0) {
    const assistText = assistTarget
      ? `Assistencia de ${playerName} para ${assistTarget.name}, que nao desperdica.`
      : `Assistencia de ${playerName} quebrando a linha rival.`;
    events.push({ minute: 54 + Math.floor(Math.random() * 18), text: assistText, type: "assistencia" });
  }
  if (decisiveMoment) {
    events.push({ minute: 82 + Math.floor(Math.random() * 8), text: decisiveMoment, type: "decisivo" });
  }
  events.push({ minute: 90, text: `Fim de jogo: ${teamGoals} x ${oppGoals} contra ${opponent}.`, type: "final" });
  if (penShootout) {
    events.push({ minute: 91, text: "Tudo igual. A decisao vai para os penaltis.", type: "penaltis" });
  }

  return events.sort((a, b) => a.minute - b.minute);
}

function deriveScoreFromEvents(events) {
  return events.reduce((score, event) => {
    if (event.type === "gol") {
      return { ...score, team: score.team + 1 };
    }
    if (event.type === "final") {
      const match = event.text.match(/Fim de jogo: (\d+) x (\d+)/);
      if (match) {
        return { team: Number(match[1]), opponent: Number(match[2]) };
      }
    }
    return score;
  }, { team: 0, opponent: 0 });
}

function simulateFixture(game, fixture, decisionChoice, penaltyOrder = null) {
  const clubStrength = fixture.isNational ? nationalTeamRating(game.player.nationality) : game.club.difficulty;
  const playerImpact = Math.round((game.player.overall + game.player.form + game.player.morale) / 3);
  const opponentClub = clubs.find((item) => item.name === fixture.opponent);
  const opponentStrength = fixture.isNational
    ? nationalTeamRating(fixture.opponent)
    : opponentClub?.strength ?? clamp(clubStrength - 4 + Math.floor(Math.random() * 8), 68, 90);
  const decisionBoost = decisionChoice?.effect?.morale ?? 0;

  // Forca relativa do time (com um leve empurrao do protagonismo do jogador)
  // define o numero esperado de gols (lambda) de cada lado, sorteado via Poisson
  // para gerar placares realistas (a maioria 0-2 gols por time) em vez de sempre 3+.
  const strengthGap = (clubStrength + (playerImpact - 72) * 0.3) - opponentStrength;
  const teamLambda = 1.35 + strengthGap / 22 + decisionBoost / 20;
  const oppLambda = 1.25 - strengthGap / 26;

  const teamGoals = clamp(poissonSample(teamLambda), 0, 7);
  const oppGoals = clamp(poissonSample(oppLambda), 0, 6);

  // O jogador so marca/da assistencia numa fracao dos gols do time, ponderada
  // pelo overall dele: um craque participa de mais gols, mas nao de todos.
  const playerGoalChance = clamp((game.player.overall - 55) / 85, 0.05, 0.55);
  let playerGoals = 0;
  for (let i = 0; i < teamGoals; i += 1) {
    if (Math.random() < playerGoalChance) playerGoals += 1;
  }

  const playerAssistChance = clamp((game.player.overall - 50) / 110, 0.04, 0.4);
  let playerAssists = 0;
  for (let i = 0; i < teamGoals - playerGoals; i += 1) {
    if (Math.random() < playerAssistChance) playerAssists += 1;
  }

  const rating = clamp(6 + (playerGoals * 0.9) + (playerAssists * 0.55) + (teamGoals > oppGoals ? 0.4 : teamGoals === oppGoals ? 0 : -0.35), 4.8, 10);
  const penShootout = teamGoals === oppGoals && fixture.importance >= 84 && Math.random() > 0.68;
  const penaltyResolved = penShootout
    ? resolvePenaltyShootout(game, penaltyOrder)
    : null;
  const decisiveMoment = fixture.importance >= 85
    ? `${playerGoals > 0 ? `${playerNameOrFallback(game.player.name)} resolveu o jogo no momento chave.` : "A partida ficou em detalhes e nervosismo ate o fim."}`
    : "";

  fixture.played = true;
  fixture.playerGoals = playerGoals;
  fixture.playerAssists = playerAssists;
  fixture.rating = rating.toFixed(1);
  fixture.result = penShootout
    ? `${teamGoals}-${oppGoals} (${penaltyResolved.teamPens}-${penaltyResolved.oppPens} pen)`
    : `${teamGoals}-${oppGoals}`;
  fixture.penalty = penaltyResolved;
  fixture.events = buildLiveEvents(game.player.name, fixture.opponent, teamGoals, oppGoals, playerGoals, playerAssists, penShootout, decisiveMoment, fixture.isNational ? null : game.club);

  game.player.goals += playerGoals;
  game.player.assists += playerAssists;
  game.player.matches += 1;

  if (!game.player.competitionStats) game.player.competitionStats = {};
  if (!game.player.competitionStats[fixture.competition]) {
    game.player.competitionStats[fixture.competition] = { goals: 0, assists: 0, matches: 0 };
  }
  game.player.competitionStats[fixture.competition].goals += playerGoals;
  game.player.competitionStats[fixture.competition].assists += playerAssists;
  game.player.competitionStats[fixture.competition].matches += 1;

  game.player.form = clamp(game.player.form + (rating >= 8 ? 4 : rating >= 7 ? 2 : -2), 50, 99);
  game.player.morale = clamp(game.player.morale + (teamGoals > oppGoals ? 3 : oppGoals > teamGoals ? -4 : 0) + decisionBoost, 35, 99);
  game.player.energy = clamp(game.player.energy - 7 + Math.floor(Math.random() * 5), 32, 99);
  game.player.happiness = clamp(game.player.happiness + (rating >= 8 ? 3 : 1), 20, 99);
  game.player.reputation = clamp(game.player.reputation + (fixture.importance > 80 ? 3 : 1), 0, 100);
  game.player.influence = clamp(game.player.influence + (fixture.importance > 85 ? 2 : 1), 0, 100);
  game.player.development.xp += 10 + (fixture.importance >= 85 ? 6 : 0) + (playerGoals * 4) + (playerAssists * 3);

  if (!fixture.isNational) {
    game.club.boardConfidence = clamp(game.club.boardConfidence + (teamGoals > oppGoals ? 3 : -1), 20, 100);
    game.club.fanLove = clamp(game.club.fanLove + (playerGoals > 0 ? 4 : 1), 0, 100);
    game.coach.trust = clamp(game.coach.trust + (rating >= 7.5 ? 4 : -1), 0, 100);
  }
  game.body.fitness = clamp(game.body.fitness - 3 + Math.floor(Math.random() * 4), 40, 100);
  game.body.freshness = clamp(game.body.freshness - 5 + Math.floor(Math.random() * 4), 35, 100);
  game.body.injuryRisk = clamp(game.body.injuryRisk + (game.player.energy < 50 ? 4 : 1), 0, 100);

  if (fixture.importance >= 90 && rating >= 8.5) {
    game.player.seasonAwards.push(`Homem da partida em ${fixture.competition}`);
  }

  if (game.coach.trust >= 70) game.coach.allowsPenalties = true;
  if (game.player.influence >= 55) game.coach.allowsCaptaincy = true;
  if (game.player.influence >= 45) game.coach.allowsFreeKicks = true;
  if (penShootout && game.coach.allowsPenalties) {
    game.player.setPieces = Array.from(new Set([...game.player.setPieces, "Penaltis"]));
  }
  if (penaltyResolved?.playerScored) {
    game.player.morale = clamp(game.player.morale + 2, 35, 99);
  }

  game.socialFeed.unshift({
    id: crypto.randomUUID(),
    author: randomFrom(["Reporter do Lance", "Futebol em Debate", "Central do Torcedor"]),
    text: `${game.player.name} saiu de ${fixture.competition} contra ${fixture.opponent} com nota ${fixture.rating}, ${playerGoals} gol(s) e ${playerAssists} assistencia(s).`,
    impact: "moral"
  });

  game.seasonLog.unshift({
    competition: fixture.competition,
    opponent: fixture.opponent,
    result: fixture.result,
    goals: playerGoals,
    assists: playerAssists
  });

  if (game.player.matches % 12 === 0) {
    game.player.age += 1;
    if (game.player.age >= 34) {
      game.player.overall = clamp(game.player.overall - 1, 58, 95);
    }
  }

  applyDevelopmentProgress(game);
  maybeGenerateTransferOffer(game, fixture);

  return fixture;
}

function maybeTriggerInjury(game) {
  if (game.player.injury) return false;

  const injuryChance = clamp(game.body.injuryRisk / 500, 0.01, 0.12);
  if (Math.random() > injuryChance) return false;

  const roll = Math.random();
  const severity = roll < 0.55 ? "leve" : roll < 0.87 ? "moderada" : "grave";
  const matchesOut = severity === "leve" ? 1 + Math.floor(Math.random() * 2) : severity === "moderada" ? 3 + Math.floor(Math.random() * 3) : 6 + Math.floor(Math.random() * 5);

  game.player.injury = { severity, matchesOut, totalMatches: matchesOut };
  game.body.injuryRisk = clamp(game.body.injuryRisk - 35, 5, 100);
  game.body.fitness = clamp(game.body.fitness - 25, 15, 100);
  game.player.morale = clamp(game.player.morale - 6, 25, 99);

  game.inbox.unshift(`Lesao ${severity}! Voce vai desfalcar o ${game.player.club} por ${matchesOut} jogo(s) enquanto se recupera.`);
  game.socialFeed.unshift({
    id: crypto.randomUUID(),
    author: randomFrom(["Reporter do Lance", "Central do Torcedor", "Departamento Medico"]),
    text: `Boletim medico: ${game.player.name} sofreu uma lesao ${severity} e desfalca o ${game.player.club} pelas proximas rodadas.`,
    impact: "moral"
  });

  return true;
}

function simulateMissedFixture(game, fixture) {
  const clubStrength = fixture.isNational ? nationalTeamRating(game.player.nationality) : game.club.difficulty;
  const opponentClub = clubs.find((item) => item.name === fixture.opponent);
  const opponentStrength = fixture.isNational
    ? nationalTeamRating(fixture.opponent)
    : opponentClub?.strength ?? clamp(clubStrength - 4 + Math.floor(Math.random() * 8), 68, 90);

  const strengthGap = clubStrength - opponentStrength - 8;
  const teamLambda = 1.2 + strengthGap / 24;
  const oppLambda = 1.3 - strengthGap / 26;
  const teamGoals = clamp(poissonSample(teamLambda), 0, 6);
  const oppGoals = clamp(poissonSample(oppLambda), 0, 6);

  fixture.played = true;
  fixture.playerGoals = 0;
  fixture.playerAssists = 0;
  fixture.rating = "-";
  fixture.result = `${teamGoals}-${oppGoals}`;
  fixture.missedByInjury = true;
  fixture.events = [
    { minute: 1, text: `${game.player.name} fica de fora, lesionado.`, type: "ambiente" },
    { minute: 90, text: `Fim de jogo: ${teamGoals} x ${oppGoals} contra ${fixture.opponent}.`, type: "final" }
  ];

  game.seasonLog.unshift({
    competition: fixture.competition,
    opponent: fixture.opponent,
    result: fixture.result,
    goals: 0,
    assists: 0
  });

  if (!game.player.competitionStats) game.player.competitionStats = {};
  game.body.fitness = clamp(game.body.fitness + 4, 0, 100);
  game.body.freshness = clamp(game.body.freshness + 6, 0, 100);

  game.player.injury.matchesOut -= 1;
  if (game.player.injury.matchesOut <= 0) {
    const recoveredSeverity = game.player.injury.severity;
    game.player.injury = null;
    game.inbox.unshift(`Recuperado! Voce esta liberado apos a lesao ${recoveredSeverity} e volta a disputar posicao no ${game.player.club}.`);
  }

  return fixture;
}

function applyDevelopmentProgress(game) {
  const thresholds = [0, 40, 90, 150, 230, 320];
  const currentXp = game.player.development.xp;
  let derivedLevel = 1;
  thresholds.forEach((value, index) => {
    if (currentXp >= value) derivedLevel = index + 1;
  });

  if (derivedLevel > game.player.development.level) {
    const gain = derivedLevel - game.player.development.level;
    game.player.overall = clamp(game.player.overall + gain, 60, 95);
    game.player.development.level = derivedLevel;
    game.player.development.peaks.unshift(`${game.player.development.focus} evoluiu e empurrou seu overall para ${game.player.overall}.`);
    game.inbox.unshift(`Evolucao: seu foco em ${game.player.development.focus} elevou seu nivel de desenvolvimento.`);
  }
}

function maybeGenerateTransferOffer(game, fixture) {
  const offerChance = fixture.importance >= 84 ? 0.55 : 0.22;
  if (Math.random() > offerChance) return;

  const candidates = clubs.filter((club) => club.name !== game.player.club && club.strength >= Math.max(74, game.player.overall + 4));
  if (!candidates.length) return;
  const club = randomFrom(candidates);
  const salary = Math.round(game.contract.salary * (1.08 + (club.strength - game.club.difficulty) / 100));
  const years = randomFrom([2, 3, 4]);
  const offer = {
    id: crypto.randomUUID(),
    club: club.name,
    competition: club.competition,
    country: club.country,
    salary,
    years,
    role: club.strength > game.club.difficulty ? "Projeto ambicioso" : "Titular imediato"
  };
  game.agent.offers.unshift(offer);
  game.agent.marketBuzz = clamp(game.agent.marketBuzz + 8, 0, 100);
  game.inbox.unshift(`Oferta recebida: ${offer.club} quer negociar um contrato de ${offer.years} anos com voce.`);
}

function playerNameOrFallback(name) {
  return name || "Seu jogador";
}

function resolvePenaltyShootout(game, penaltyOrder) {
  const order = penaltyOrder ?? 5;
  const confidenceBoost = Math.max(0, 6 - order);
  const baseChance = clamp(0.56 + (game.player.overall / 220) + (game.player.influence / 500) + (confidenceBoost / 100), 0.55, 0.92);
  const playerScored = Math.random() < baseChance;
  const teamPens = clamp(3 + Math.floor(Math.random() * 3) + (playerScored ? 1 : 0), 3, 6);
  const oppPens = clamp(teamPens - 1 + Math.floor(Math.random() * 2), 2, 5);
  const text = playerScored
    ? `Voce cobrou o ${order}o penalti e converteu sob pressao maxima.`
    : `Voce assumiu o ${order}o penalti e parou no goleiro rival.`;
  return { order, playerScored, teamPens, oppPens, text };
}

// =====================================================================
// VIRADA DE TEMPORADA E CARREIRA: fechamento de ano, renovacao,
// transferencias e treino
// =====================================================================
function finishSeason(game, forcedRetirement = false) {
  const awardPool = [];
  const seasonalTrophies = [];
  const previousOverall = game.player.startingOverall ?? game.player.overall;
  const overallDelta = game.player.overall - previousOverall;

  if (game.player.goals >= 20) awardPool.push("Chuteira de Ouro do clube");
  if (game.player.assists >= 12) awardPool.push("Maior garcom da temporada");
  if (game.player.age <= 19 && game.player.overall >= 72) awardPool.push("Melhor Jogador Jovem");
  if (game.player.reputation >= 40) awardPool.push("Melhor jogador do clube");
  if (game.player.overall >= 80) awardPool.push("Melhor jogador do ano");
  if (game.club.boardConfidence >= 72) seasonalTrophies.push(`${game.club.competition} - campanha de destaque`);
  if (game.club.fanLove >= 78) seasonalTrophies.push("Idolo em ascensao");
  if (game.player.goals >= 12 && game.player.assists >= 8) seasonalTrophies.push("Temporada completa");

  game.player.seasonAwards = Array.from(new Set([...game.player.seasonAwards, ...awardPool]));
  game.player.trophies = Array.from(new Set([...(game.player.trophies ?? []), ...seasonalTrophies]));
  game.seasonSummary = {
    year: game.season,
    goals: game.player.goals,
    assists: game.player.assists,
    matches: game.player.matches,
    overall: game.player.overall,
    previousOverall,
    overallDelta,
    fanLove: game.club.fanLove,
    boardConfidence: game.club.boardConfidence,
    biggestVictim: game.seasonLog[0]?.opponent ?? "Sem destaque",
    awards: game.player.seasonAwards,
    trophies: game.player.trophies,
    happiness: game.player.happiness,
    reputation: game.player.reputation,
    nextStep: game.agent.offers.length ? "Mercado aquecido para a proxima janela." : game.contract.yearsLeft <= 1 ? "Renovacao virou prioridade." : "Base pronta para atacar uma temporada maior.",
    forcedRetirement
  };

  game.player.startingOverall = game.player.overall;

  if (!game.careerHistory) game.careerHistory = [];
  game.careerHistory.push({
    year: game.season,
    club: game.player.club,
    competition: game.club.competition,
    goals: game.player.goals,
    assists: game.player.assists,
    matches: game.player.matches,
    overall: game.player.overall,
    trophies: [...seasonalTrophies],
    awards: [...awardPool],
    forcedRetirement
  });
}

function advanceToNextSeason() {
  const game = structuredClone(state.game);
  if (!game?.seasonSummary) return;

  game.season += 1;
  game.round = 1;
  game.contract.yearsLeft = Math.max(0, game.contract.yearsLeft - 1);
  game.player.goals = 0;
  game.player.assists = 0;
  game.player.matches = 0;
  game.player.seasonAwards = [];
  game.player.form = clamp(Math.round((game.player.form + 66) / 2), 58, 95);
  game.player.energy = clamp(Math.round((game.player.energy + 84) / 2), 62, 96);
  game.player.morale = clamp(Math.round((game.player.morale + 70) / 2), 55, 95);
  game.player.happiness = clamp(Math.round((game.player.happiness + 68) / 2), 45, 96);
  game.player.startingOverall = game.player.overall;
  game.club.boardConfidence = clamp(Math.round((game.club.boardConfidence + 58) / 2), 40, 95);
  game.club.fanLove = clamp(Math.round((game.club.fanLove + 52) / 2), 35, 98);
  game.body.fitness = 82;
  game.body.freshness = 80;
  game.body.injuryRisk = clamp(Math.round(game.body.injuryRisk * 0.7), 6, 35);
  game.agent.offers = [];
  game.decision = null;
  game.fixtures = generateSeasonFixtures(game.club, game.player, game.milestones.includes("convocado"), game.season);
  game.seasonLog = [];
  game.seasonSummary = null;
  game.inbox.unshift(`Nova temporada iniciada: ${game.season}. Novo calendario liberado para ${game.player.club}.`);
  game.socialFeed.unshift({
    id: crypto.randomUUID(),
    author: "Central Ascensao",
    text: `${game.player.name} iniciou a temporada ${game.season} com foco renovado em ${game.player.club}.`,
    impact: "popularidade"
  });

  if (game.contract.yearsLeft === 0) {
    game.inbox.unshift("Seu contrato entrou no ultimo limite. Renovacao ou novo clube viram prioridade imediata.");
  }

  if (game.milestones.includes("convocado")) {
    const torneioName = game.season % 4 === 0 ? "Copa do Mundo" : "Torneio Continental";
    const groupOpponents = game.fixtures.filter((item) => item.tournament === "national" && item.stage === "grupos").map((item) => item.opponent);
    const prep = torneioName === "Copa do Mundo" ? "na" : "no";
    if (groupOpponents.length) {
      game.inbox.unshift(`Convocacao confirmada para ${game.season}: ${game.player.nationality} cai em grupo com ${groupOpponents.join(", ")} ${prep} ${torneioName}.`);
    }
  }

  setState({
    game,
    tab: "carreira",
    selectedFixtureId: game.fixtures[0]?.id ?? null,
    matchFocus: null,
    penaltyPrompt: null,
    transition: null
  });
}

function renewContract() {
  const game = structuredClone(state.game);
  const leverage = game.player.reputation + game.club.fanLove + game.club.boardConfidence;
  const raise = leverage >= 160 ? 1.22 : leverage >= 130 ? 1.14 : 1.08;
  game.contract.salary = Math.round(game.contract.salary * raise);
  game.contract.yearsLeft += 2;
  game.player.happiness = clamp(game.player.happiness + 6, 0, 100);
  game.club.boardConfidence = clamp(game.club.boardConfidence + 4, 0, 100);
  game.inbox.unshift(`Renovacao fechada com ${game.player.club}. Seu novo salario subiu para R$ ${game.contract.salary.toLocaleString("pt-BR")}.`);
  setState({ game });
}

function setTrainingFocus(focus) {
  const game = structuredClone(state.game);
  game.player.development.focus = focus;
  game.inbox.unshift(`Novo foco de desenvolvimento definido: ${focus}.`);
  setState({ game });
}

function acceptTransferOffer(offerId) {
  const game = structuredClone(state.game);
  const offer = game.agent.offers.find((item) => item.id === offerId);
  if (!offer) return;
  const club = clubs.find((item) => item.name === offer.club);
  if (!club) return;

  game.player.club = club.name;
  game.player.league = club.competition;
  game.club = {
    ...club,
    difficulty: club.strength,
    boardConfidence: 58,
    fanLove: 45
  };
  game.contract = {
    club: club.name,
    salary: offer.salary,
    yearsLeft: offer.years,
    releaseClause: Math.round(offer.salary * 150)
  };
  game.agent.offers = [];
  game.player.happiness = clamp(game.player.happiness + 8, 0, 100);
  game.inbox.unshift(`Transferencia concluida: voce acertou com ${club.name} para disputar ${club.competition}.`);
  setState({ game, tab: "contrato" });
}

function rejectTransferOffer(offerId) {
  const game = structuredClone(state.game);
  const offer = game.agent.offers.find((item) => item.id === offerId);
  game.agent.offers = game.agent.offers.filter((item) => item.id !== offerId);
  if (offer) {
    game.inbox.unshift(`Oferta recusada: voce decidiu nao seguir para ${offer.club} neste momento.`);
  }
  setState({ game });
}

// =====================================================================
// PROGRESSAO DO TORNEIO DE SELECOES: avanco/eliminacao de fase de
// grupos e mata-mata (chamado depois de cada jogo de selecao)
// =====================================================================
function processNationalTournament(game, playedFixture) {
  if (!playedFixture?.tournament || playedFixture.tournament !== "national") return;

  const torneioName = playedFixture.tournamentName;
  const facedOpponents = game.fixtures
    .filter((item) => item.tournament === "national" && item.tournamentName === torneioName)
    .map((item) => item.opponent);

  if (playedFixture.stage === "grupos") {
    const groupGames = game.fixtures.filter((item) => item.tournament === "national" && item.stage === "grupos" && item.tournamentName === torneioName);
    if (!groupGames.every((item) => item.played)) return;

    const points = groupGames.reduce((total, item) => {
      const score = parseResultScore(item.result);
      if (!score) return total;
      if (score.teamGoals > score.oppGoals) return total + 3;
      if (score.teamGoals === score.oppGoals) return total + 1;
      return total;
    }, 0);

    const prep = torneioName === "Copa do Mundo" ? "da" : "do";
    const prepContracted = torneioName === "Copa do Mundo" ? "na" : "no";

    if (points >= 4) {
      const [nextOpponent] = pickNationalOpponents(game.player.nationality, 1, facedOpponents);
      game.fixtures.push({
        ...createFixture({
          roundLabel: `${torneioName} - Quartas de final`,
          competition: torneioName,
          opponent: nextOpponent ?? "Adversario surpresa",
          importance: 90,
          live: true
        }),
        tournament: "national",
        tournamentName: torneioName,
        stage: "quartas",
        isNational: true
      });
      game.inbox.unshift(`${game.player.nationality} avancou em ${points} pontos na fase de grupos ${prep} ${torneioName} e garantiu vaga nas quartas de final.`);
    } else {
      game.inbox.unshift(`Eliminacao: ${game.player.nationality} somou ${points} pontos e caiu na fase de grupos ${prep} ${torneioName}.`);
      game.socialFeed.unshift({
        id: crypto.randomUUID(),
        author: "Central Ascensao",
        text: `Fase de grupos decepcionante: ${game.player.nationality} esta fora ${prep === "da" ? "da" : "do"} ${torneioName} ainda na primeira fase.`,
        impact: "moral"
      });
    }
    return;
  }

  const prep = torneioName === "Copa do Mundo" ? "da" : "do";
  const knockoutOrder = { quartas: "semifinal", semifinal: "final" };
  const won = fixtureWasWon(playedFixture);

  if (playedFixture.stage === "final") {
    if (won) {
      game.player.trophies = Array.from(new Set([...(game.player.trophies ?? []), `${torneioName} ${game.season}`]));
      game.player.seasonAwards.push(`Campeao ${prep} ${torneioName} por ${game.player.nationality}`);
      game.player.reputation = clamp(game.player.reputation + 12, 0, 100);
      game.player.happiness = clamp(game.player.happiness + 10, 0, 100);
      game.inbox.unshift(`CAMPEAO! ${game.player.nationality} conquistou o titulo ${prep} ${torneioName} com voce em campo na final.`);
    } else {
      game.player.trophies = Array.from(new Set([...(game.player.trophies ?? []), `Vice-campeao ${torneioName} ${game.season}`]));
      game.player.reputation = clamp(game.player.reputation + 6, 0, 100);
      game.inbox.unshift(`Final perdida: ${game.player.nationality} terminou ${prep === "da" ? "a" : "o"} ${torneioName} como vice-campeao.`);
    }
    return;
  }

  if (!won) {
    const stageLabel = playedFixture.stage === "quartas" ? "quartas de final" : "semifinal";
    game.inbox.unshift(`Eliminacao: ${game.player.nationality} caiu na ${stageLabel} ${prep} ${torneioName}.`);
    return;
  }

  const nextStage = knockoutOrder[playedFixture.stage];
  const [nextOpponent] = pickNationalOpponents(game.player.nationality, 1, facedOpponents);
  game.fixtures.push({
    ...createFixture({
      roundLabel: `${torneioName} - ${nextStage === "semifinal" ? "Semifinal" : "Final"}`,
      competition: torneioName,
      opponent: nextOpponent ?? "Adversario surpresa",
      importance: nextStage === "final" ? 96 : 92,
      live: true
    }),
    tournament: "national",
    tournamentName: torneioName,
    stage: nextStage,
    isNational: true
  });
  game.inbox.unshift(`Classificado! ${game.player.nationality} avancou para a ${nextStage === "semifinal" ? "semifinal" : "final"} ${prep} ${torneioName}.`);
}

// =====================================================================
// LOOP PRINCIPAL: avancar rodada e demais acoes do jogador
// (treinar, descansar, pedir funcoes, reagir a posts)
// =====================================================================
function advanceRound() {
  const game = structuredClone(state.game);
  const nextFixture = game.fixtures.find((item) => !item.played);

  if (!nextFixture) {
    finishSeason(game);
    setState({ game, tab: "carreira" });
    return;
  }

  if (game.player.injury?.matchesOut > 0) {
    setTransition({
      title: `${nextFixture.competition}`,
      subtitle: `${game.player.club} x ${nextFixture.opponent} • voce esta fora, lesionado`,
      kicker: "Rodada em andamento"
    });
    const missedFixture = simulateMissedFixture(game, nextFixture);
    processNationalTournament(game, missedFixture);
    game.round += 1;
    window.setTimeout(() => {
      setState({ game, transition: null });
    }, 700);
    return;
  }

  if (nextFixture.importance >= 85 && !game.decision) {
    game.decision = createDecision(game, nextFixture);
    setState({ game });
    return;
  }

  if (nextFixture.importance >= 88 && !state.matchFocus) {
    setMatchFocus({
      fixtureId: nextFixture.id,
      competition: nextFixture.competition,
      opponent: nextFixture.opponent,
      stage: "pregame",
      selectedBoost: null,
      playback: null
    });
    return;
  }

  if (nextFixture.importance >= 84 && !state.penaltyPrompt) {
    setPenaltyPrompt({
      fixtureId: nextFixture.id,
      opponent: nextFixture.opponent,
      competition: nextFixture.competition
    });
    return;
  }

  setTransition({
      title: `${nextFixture.competition}`,
      subtitle: `${game.player.club} x ${nextFixture.opponent}`,
      kicker: "Rodada em andamento"
    });

  const playedFixture = simulateFixture(game, nextFixture, game.decision?.choice, state.penaltyPrompt?.order ?? null);
  processNationalTournament(game, playedFixture);
  game.decision = null;
  game.round += 1;
  maybeTriggerInjury(game);

  if (game.player.overall >= 76 && !game.milestones.includes("convocado")) {
    game.milestones.push("convocado");
    game.inbox.unshift(`Convocacao! ${game.player.name} foi chamado para defender ${game.player.nationality}.`);
  }

  if (game.player.age >= 34 && game.player.overall <= 62) {
    game.inbox.unshift(`Fim de carreira: aos ${game.player.age} anos, seu overall caiu abaixo do minimo para seguir jogando.`);
    finishSeason(game, true);
  }

  window.setTimeout(() => {
    setState({
      game,
      transition: null,
      penaltyPrompt: null,
      matchFocus: state.matchFocus
        ? {
            ...state.matchFocus,
            stage: "live",
            result: playedFixture.result,
            rating: playedFixture.rating,
            goals: playedFixture.playerGoals,
            assists: playedFixture.playerAssists,
            events: playedFixture.events,
            penalty: playedFixture.penalty ?? null,
            playback: createPlaybackState(playedFixture.events)
          }
        : null
    });
  }, 1100);
}

function chooseMatchFocusOption(optionIndex) {
  const focus = state.matchFocus;
  const game = structuredClone(state.game);
  if (!focus || !game?.decision) return;
  const option = game.decision.inGameOptions?.[optionIndex];
  if (!option) return;
  game.inbox.unshift(`Plano do jogo grande: ${option.label}. ${option.effect}`);
  setState({
    game,
    matchFocus: {
      ...focus,
      stage: "armed",
      selectedBoost: option
    }
  });
}

function closeMatchFocus() {
  if (!state.matchFocus) return;
  setMatchFocus(null);
}

function continueFromPostMatch() {
  setMatchFocus(null);
}

function advanceMatchPlayback() {
  const focus = state.matchFocus;
  if (!focus?.events?.length || !focus.playback) return;

  const nextIndex = clamp(focus.playback.timelineIndex + 1, 0, focus.events.length - 1);
  const revealedEvents = focus.events.slice(0, nextIndex + 1);
  const score = deriveScoreFromEvents(revealedEvents);
  const finished = nextIndex >= focus.events.length - 1;

  setMatchFocus({
    ...focus,
    stage: finished ? "postmatch" : "live",
    playback: {
      timelineIndex: nextIndex,
      revealedEvents,
      score,
      finished
    }
  });
}

function choosePenaltyOrder(order) {
  const prompt = state.penaltyPrompt;
  if (!prompt) return;
  setPenaltyPrompt({ ...prompt, order });
}

function trainPlayer() {
  const game = structuredClone(state.game);
  if (game.player.injury?.matchesOut > 0) return;
  game.player.overall = clamp(game.player.overall + 1, 60, 95);
  game.player.form = clamp(game.player.form + 3, 50, 99);
  game.player.energy = clamp(game.player.energy - 6, 20, 99);
  game.body.injuryRisk = clamp(game.body.injuryRisk + 2, 0, 100);
  game.player.development.xp += 14;
  applyDevelopmentProgress(game);
  game.inbox.unshift(`Treino intenso concluido com foco em ${game.player.development.focus}. Voce evoluiu, mas sentiu o desgaste.`);
  setState({ game });
}

function restPlayer() {
  const game = structuredClone(state.game);
  game.player.energy = clamp(game.player.energy + 10, 20, 99);
  game.body.freshness = clamp(game.body.freshness + 8, 20, 100);
  game.body.injuryRisk = clamp(game.body.injuryRisk - 4, 0, 100);
  game.inbox.unshift("Recuperacao concluida. Seu corpo responde melhor para o proximo jogo.");
  setState({ game });
}

function askForRole(role) {
  const game = structuredClone(state.game);
  const gate = role === "Capitao" ? game.coach.allowsCaptaincy : game.coach.allowsPenalties;

  if (gate || game.player.influence >= 60) {
    if (role === "Capitao") game.player.isCaptain = true;
    game.player.setPieces = Array.from(new Set([...game.player.setPieces, role]));
    game.inbox.unshift(`Pedido aceito: o treinador liberou voce para assumir ${role.toLowerCase()}.`);
  } else {
    game.inbox.unshift(`Pedido negado: o treinador quer ver mais lideranca antes de liberar ${role.toLowerCase()}.`);
    game.coach.trust = clamp(game.coach.trust - 1, 0, 100);
  }

  setState({ game });
}

function reactToPost(kind) {
  const game = structuredClone(state.game);
  const delta = kind === "apoiar" ? 3 : kind === "provocar" ? -2 : 1;
  game.player.happiness = clamp(game.player.happiness + delta, 0, 100);
  game.club.fanLove = clamp(game.club.fanLove + delta, 0, 100);
  game.inbox.unshift("Sua reacao na rede social mexeu com a torcida e com a imprensa.");
  setState({ game });
}

function resetCareer() {
  if (state.activeSlot) {
    localStorage.removeItem(slotKey(state.activeSlot));
    if (localStorage.getItem(ACTIVE_SLOT_KEY) === String(state.activeSlot)) {
      localStorage.removeItem(ACTIVE_SLOT_KEY);
    }
  }
  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  render();
}

function retireCareer() {
  const game = structuredClone(state.game);
  finishSeason(game, true);
  game.retired = true;
  setState({ game });
}

// =====================================================================
// COMPONENTES DE UI: campos de formulario, cards de estatistica e
// medidores (gauges)
// =====================================================================
function field(label, name, type, value) {
  return `<label>${label}<input required name="${name}" type="${type}" value="${value}"></label>`;
}

function selectField(label, name, values) {
  return `<label>${label}<select name="${name}">${values.map((value) => `<option value="${value}">${value}</option>`).join("")}</select></label>`;
}

function metricCard(label, value, copy = "") {
  return `
    <div class="stat-card">
      <span class="mini-label">${label}</span>
      <strong>${value}</strong>
      ${copy ? `<span class="small-copy">${copy}</span>` : ""}
    </div>
  `;
}

function gaugeCard(label, value, options = {}) {
  const max = options.max ?? 100;
  const invert = options.invert ?? false;
  const copy = options.copy ?? "";
  const pct = clamp(Math.round((value / max) * 100), 0, 100);
  const level = invert ? 100 - pct : pct;
  const tone = level >= 67 ? "good" : level >= 34 ? "warn" : "danger";

  return `
    <div class="stat-card gauge-card">
      <span class="mini-label">${label}</span>
      <strong>${value}</strong>
      <div class="gauge-track">
        <div class="gauge-fill gauge-${tone}" style="width: ${pct}%;"></div>
      </div>
      ${copy ? `<span class="small-copy">${copy}</span>` : ""}
    </div>
  `;
}

// =====================================================================
// COMPONENTES DE RENDERIZACAO: partida ao vivo, penaltis e "jogo grande"
// =====================================================================
function renderLiveHud(fixture, playerName, clubName) {
  if (!fixture || !fixture.played || !fixture.live) return "";

  const [rawScore] = fixture.result.split(" ");
  const [clubGoals, oppGoals] = rawScore.split("-");

  return `
    <div class="live-hud enter-up">
      <div class="live-hud-top">
        <span class="live-badge">Tempo real</span>
        <span class="small-copy">${fixture.competition} • ${fixture.roundLabel}</span>
      </div>
      <div class="live-scoreboard">
        <div class="live-team">
          ${logoMarkup(clubName, "club")}
          <strong>${clubName}</strong>
        </div>
        <div class="live-score">${clubGoals} : ${oppGoals}</div>
        <div class="live-team">
          ${logoMarkup(fixture.opponent, "club")}
          <strong>${fixture.opponent}</strong>
        </div>
      </div>
      <div class="timeline">
        ${fixture.events.map((event) => `<div class="timeline-item"><strong>${event.minute}'</strong> ${event.text}</div>`).join("")}
      </div>
      ${fixture.penalty ? `<div class="small-copy">${fixture.penalty.text}</div>` : ""}
      <span class="small-copy">${playerName} saiu com ${fixture.playerGoals} gol(s), ${fixture.playerAssists} assistencia(s) e nota ${fixture.rating}.</span>
    </div>
  `;
}

function renderPenaltyPrompt(prompt) {
  return `
    <div class="decision-card enter-up">
      <span class="section-label">Disputa de penaltis</span>
      <h3 style="margin-top: 8px;">Escolha sua ordem de cobranca</h3>
      <p class="small-copy" style="margin-top: 8px;">Em ${prompt.competition} contra ${prompt.opponent}, voce pode pedir para bater o 1o, 2o, 3o, 4o ou 5o penalti. Isso influencia a confianca do grupo.</p>
      <div class="button-row" style="margin-top: 16px;">
        ${[1, 2, 3, 4, 5].map((order) => `<button class="secondary decision-option" type="button" data-penalty-order="${order}">${order}o penalti</button>`).join("")}
      </div>
    </div>
  `;
}

function renderMatchFocus(focus, game, nextFixture) {
  if (!focus || !nextFixture) return "";
  const options = game.decision?.inGameOptions ?? [];
  const ready = focus.stage === "armed" && focus.selectedBoost;
  return `
    <div class="display-panel panel-highlight enter-up">
      <div class="section-hero-copy">
        <span class="section-label">Partida especial</span>
        <h2>${focus.competition} contra ${focus.opponent}</h2>
        <p class="small-copy">Clima de jogo grande. Antes da rodada andar, voce define o tom emocional e tatico da partida.</p>
      </div>
      <div class="live-hud" style="margin-top: 18px;">
        <div class="live-hud-top">
          <span class="live-badge">Evento decisivo</span>
          <span class="small-copy">${nextFixture.roundLabel} • importancia ${nextFixture.importance}</span>
        </div>
        <div class="live-scoreboard">
          <div class="live-team">
            ${logoMarkup(game.player.club, "club")}
            <strong>${game.player.club}</strong>
          </div>
          <div class="live-score">VS</div>
          <div class="live-team">
            ${logoMarkup(nextFixture.opponent, "club")}
            <strong>${nextFixture.opponent}</strong>
          </div>
        </div>
        ${ready ? `
          <div class="timeline">
            <div class="timeline-item"><strong>Plano escolhido:</strong> ${focus.selectedBoost.label}</div>
            <div class="timeline-item">${focus.selectedBoost.effect}</div>
          </div>
        ` : `
          <div class="button-row">
            ${options.map((option, index) => `<button class="secondary decision-option" type="button" data-match-focus="${index}">${option.label}</button>`).join("")}
          </div>
        `}
      </div>
    </div>
  `;
}

function renderMatchFocusOverlay(focus, game) {
  if (!focus) return "";
  const fixture = game.fixtures.find((item) => item.id === focus.fixtureId) || game.fixtures.find((item) => !item.played);
  if (!fixture) return "";
  const options = game.decision?.inGameOptions ?? [];
  const ready = focus.stage === "armed" && focus.selectedBoost;
  const liveMode = focus.stage === "live";
  const postMatch = focus.stage === "postmatch";
  const playback = focus.playback ?? createPlaybackState(focus.events ?? []);
  const visibleEvents = postMatch ? (focus.events ?? []) : playback.revealedEvents;
  const scoreline = postMatch
    ? (focus.result?.split(" ")[0] ?? "VS")
    : `${playback.score.team} x ${playback.score.opponent}`;
  return `
    <div class="match-focus-overlay">
      <div class="match-focus-shell enter-up">
        <button class="secondary match-focus-close" type="button" data-close-match-focus>Voltar</button>
        <div class="match-focus-top">
          <div class="match-focus-copy">
            <span class="section-label">Modo transmissao</span>
            <div class="match-focus-title">${focus.competition}</div>
            <p class="match-focus-desc">${postMatch ? "O confronto terminou. Aqui fica o resumo do jogo grande com leitura de desempenho e impacto imediato." : liveMode ? "A partida esta sendo revelada lance por lance, com placar vivo e ritmo de transmissao." : "Confronto de peso. Aqui o jogo para e a partida ganha um tratamento especial, com atmosfera, escolha de plano e leitura de momento."}</p>
          </div>
          <div class="match-focus-side">
            <div class="live-badge">${postMatch ? "Apito final" : liveMode ? "Ao vivo" : "Confronto especial"}</div>
            <div class="match-focus-scoreboard" style="margin-top: 18px;">
              <div class="match-focus-team">
                ${logoMarkup(game.player.club, "club", true)}
                <strong>${game.player.club}</strong>
              </div>
              <div class="match-focus-vs">${scoreline}</div>
              <div class="match-focus-team">
                ${logoMarkup(fixture.opponent, "club", true)}
                <strong>${fixture.opponent}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="match-focus-bottom">
          <div class="match-focus-grid">
            <div class="match-focus-card">
              <span class="section-label">${postMatch ? "Resumo do jogo" : liveMode ? "Linha da partida" : "Contexto"}</span>
              <h3>${postMatch ? "Noite decisiva concluida" : liveMode ? "Transmissao em andamento" : fixture.roundLabel}</h3>
              ${postMatch ? `
                <p class="small-copy" style="margin-top: 10px;">Nota ${focus.rating}. Voce terminou com ${focus.goals} gol(s) e ${focus.assists} assistencia(s).</p>
                <div class="timeline match-event-timeline" style="margin-top: 14px;">
                  ${visibleEvents.map((event) => `<div class="timeline-item match-event-item ${event.type}"><strong>${event.minute}'</strong> ${event.text}</div>`).join("")}
                </div>
                ${focus.penalty ? `<p class="small-copy" style="margin-top: 12px;">${focus.penalty.text}</p>` : ""}
              ` : liveMode ? `
                <p class="small-copy" style="margin-top: 10px;">A narrativa da partida aparece em etapas, como um corte especial de jogo grande.</p>
                <div class="timeline match-event-timeline" style="margin-top: 14px;">
                  ${visibleEvents.map((event) => `<div class="timeline-item match-event-item ${event.type}"><strong>${event.minute}'</strong> ${event.text}</div>`).join("")}
                </div>
              ` : `
                <p class="small-copy" style="margin-top: 10px;">Importancia ${fixture.importance}. Seu tecnico e o grupo esperam postura grande em um jogo que pode mudar moral, diretoria e torcida.</p>
                <div class="timeline" style="margin-top: 14px;">
                  <div class="timeline-item">Forma atual: ${game.player.form}</div>
                  <div class="timeline-item">Influencia no elenco: ${game.player.influence}</div>
                  <div class="timeline-item">Confianca do tecnico: ${game.coach.trust}</div>
                </div>
              `}
            </div>
            <div class="match-focus-card">
              <span class="section-label">${postMatch ? "Impacto imediato" : liveMode ? "Central da transmissao" : "Plano de jogo"}</span>
              ${postMatch ? `
                <h3>${focus.selectedBoost?.label ?? "Sem plano registrado"}</h3>
                <p class="small-copy" style="margin-top: 10px;">${focus.selectedBoost?.effect ?? "A partida seguiu sem ajuste adicional registrado."}</p>
                <div class="button-row" style="margin-top: 16px;">
                  <button type="button" data-continue-postmatch>Voltar para a carreira</button>
                </div>
              ` : liveMode ? `
                <h3>Pulse do confronto</h3>
                <div class="grid two" style="margin-top: 14px;">
                  ${metricCard("Placar", scoreline)}
                  ${metricCard("Lances vistos", `${visibleEvents.length}/${focus.events?.length ?? 0}`)}
                  ${metricCard("Gols seus", focus.goals)}
                  ${metricCard("Assistencias", focus.assists)}
                </div>
                <p class="small-copy" style="margin-top: 14px;">${playback.finished ? "A transmissao especial terminou. Agora voce pode fechar e voltar ao painel." : "Clique para revelar o proximo momento importante da partida."}</p>
                <div class="button-row" style="margin-top: 16px;">
                  <button type="button" data-step-match-focus>${playback.finished ? "Fechar partida" : "Avancar lance"}</button>
                </div>
              ` : ready ? `
                <h3>${focus.selectedBoost.label}</h3>
                <p class="small-copy" style="margin-top: 10px;">${focus.selectedBoost.effect}</p>
                <div class="button-row" style="margin-top: 16px;">
                  <button type="button" data-advance-from-focus>Entrar na partida</button>
                </div>
              ` : `
                <h3>Escolha a abordagem</h3>
                <div class="match-focus-actions">
                  ${options.map((option, index) => `<button class="secondary decision-option" type="button" data-match-focus="${index}">${option.label}</button>`).join("")}
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderClubPickerCard(club, isActive = false) {
  return `
    <button class="club-select-card ${isActive ? "active" : ""}" type="button" data-club-choice="${club.name}" data-country="${club.country}" data-competition="${club.competition}">
      <div class="club-card-top">
        ${logoMarkup(club.name, "club")}
        <div>
          <strong>${club.name}</strong>
          <span class="small-copy">${club.country} • ${club.competition}</span>
        </div>
      </div>
      <div class="club-select-meta" style="margin-top: 12px;">
        <span class="pill">Nivel ${club.strength}</span>
        <span class="pill">${club.state}</span>
        <span class="pill">${club.rivals.length ? `${club.rivals.length} rivalidade(s)` : "sem rivalidade"}</span>
      </div>
    </button>
  `;
}


function renderSourcePanel() {
  const panel = document.createElement("div");
  panel.className = "source-card";
  panel.innerHTML = `
    <span class="section-label">Fontes e logos</span>
    <div class="timeline" style="margin-top: 12px;">
      <div class="timeline-item"><a href="https://www.cbf.com.br/futebol-brasileiro/noticias/copa-mundo-sub17/selecao-brasileira-sub-17-e-convocada-para-a-copa-do-mundo/cbf-divulga-tabela-detalhada-das-primeiras-rodadas-do-brasileirao-2026" target="_blank" rel="noreferrer">CBF - Serie A 2026</a></div>
      <div class="timeline-item"><a href="https://www.cbf.com.br/futebol-brasileiro/noticias/competicoes-campeonato-brasileiro-serie-b/a/cbf-divulga-documentos-tecnicos-do-brasileirao-da-serie-b-de-2026" target="_blank" rel="noreferrer">CBF - Serie B 2026</a></div>
      <div class="timeline-item"><a href="https://www.cbf.com.br/futebol-brasileiro/noticias/jogos/a/cbf-divulga-tabela-basica-plano-geral-de-acoes-e-regulamento-especifico-da-copa-do-brasil-2026" target="_blank" rel="noreferrer">CBF - Copa do Brasil 2026</a></div>
      <div class="timeline-item"><a href="https://www.cbf.com.br/futebol-brasileiro/noticias/campeonato-brasileiro/serie-b/cbf-publica-documentos-tecnicos-da-serie-c-de-2026" target="_blank" rel="noreferrer">CBF - Serie C 2026</a></div>
      <div class="timeline-item"><a href="https://www.cbf.com.br/futebol-brasileiro/noticias/noticias-campeonato-brasileiro-serie-d/a/cbf-publica-documentos-tecnicos-da-nova-serie-d" target="_blank" rel="noreferrer">CBF - Serie D 2026</a></div>
      <div class="timeline-item"><a href="https://www.uefa.com/uefachampionsleague/news/0268-12157d69ce2d-9f011c70f6fa-1000--new-format-fo/" target="_blank" rel="noreferrer">UEFA - formato europeu</a></div>
      <div class="timeline-item"><a href="https://www.fifa.com/en/articles/fifa-club-world-cup-2025-dates-format-and-qualifiers" target="_blank" rel="noreferrer">FIFA - Mundial de Clubes 32 times</a></div>
      <div class="timeline-item"><a href="https://sportlogos.github.io/index.html" target="_blank" rel="noreferrer">Sportlogos - base de logos de clubes em PNG</a></div>
      <div class="timeline-item"><a href="https://www.footylogos.com/pt-br/country/brasil" target="_blank" rel="noreferrer">FootyLogos - catalogo de clubes e competicoes do Brasil</a></div>
      <div class="timeline-item"><a href="https://football-logos.cc/collections/" target="_blank" rel="noreferrer">football-logos.cc - colecoes de ligas e torneios</a></div>
    </div>
    <p class="footer-note" style="margin-top: 14px;">Usei essas fontes para estruturar competicoes e integrar uma camada inicial de logos reais. Para cobrir literalmente todos os clubes e ligas do mundo, o proximo passo ideal e montar um pipeline dedicado de assets por temporada.</p>
  `;
  return panel;
}

// =====================================================================
// TELA DE ONBOARDING: criacao de personagem e escolha de clube
// =====================================================================
function renderOnboarding() {
  const container = document.createElement("section");
  container.className = "screen";

  const clubOptions = clubs.slice().sort((a, b) => a.name.localeCompare(b.name));
  const countryOptions = ["Todos", ...Array.from(new Set(clubOptions.map((club) => club.country))).sort()];
  const featuredClubs = ["Flamengo", "Palmeiras", "Corinthians", "Sao Paulo", "Real Madrid", "Barcelona", "Liverpool", "Bayern de Munique"];
  const slots = getSlotSummaries();
  const showBuilder = state.pendingSlot !== null;

  container.innerHTML = `
    <div class="landing-shell">
      <div class="landing-copy">
        <div>
          <div class="landing-topbar">
            <div class="landing-brand">
              <div class="landing-brand-mark">A</div>
              <div class="landing-brand-name">Ascensao</div>
            </div>
            <div class="landing-mini">Modo carreira • futebol</div>
          </div>
        </div>

        <div>
          <div class="landing-tagline">Sua historia comeca aqui</div>
          <div class="landing-headline">Do primeiro treino a <em>gloria.</em></div>
          <p class="landing-description">Crie seu jogador. Escolha uma base. Enfrente decisoes, pressao, rivalidades e propostas em uma carreira que muda a cada temporada.</p>

          <div class="slot-picker" style="margin-top: 24px;">
            <span class="section-label">Suas carreiras</span>
            <div class="slot-grid" style="margin-top: 12px;">
              ${slots.map((slot) => `
                <div class="slot-card ${slot.empty ? "empty" : ""}">
                  ${slot.empty ? `
                    <span class="mini-label">Slot ${slot.id}</span>
                    <strong>Vazio</strong>
                    <button class="secondary" type="button" data-new-slot="${slot.id}">+ Nova carreira</button>
                  ` : `
                    <span class="mini-label">Slot ${slot.id}</span>
                    <strong>${slot.playerName}</strong>
                    <span class="small-copy">${slot.club} • overall ${slot.overall} • ${slot.season}${slot.retired ? " • aposentado" : ""}</span>
                    <div class="button-row" style="margin-top: 10px;">
                      <button type="button" data-continue-slot="${slot.id}">Continuar</button>
                      <button class="secondary" type="button" data-delete-slot="${slot.id}">Apagar</button>
                    </div>
                  `}
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <div id="builder-panel" class="display-panel" style="display:${showBuilder ? "block" : "none"};">
          <span class="section-label">Criar jogador</span>
          <h2 style="margin-top: 10px;">Monte o inicio da sua carreira</h2>
          <p class="small-copy" style="margin-top: 10px;">Idade entre 16 e 18, pe dominante, numero, nacionalidade, posicao, arquetipo, craque-base e clube inicial.</p>
          <form id="career-form" class="form-grid" style="margin-top: 20px;">
            ${field("Nome", "name", "text", "Matheus")}
            ${selectField("Idade", "age", ["16", "17", "18"])}
            ${selectField("Pe", "foot", ["Direito", "Esquerdo", "Ambidestro"])}
            ${field("Numero preferido", "number", "number", "10")}
            ${field("Nacionalidade", "nationality", "text", "Brasil")}
            ${selectField("Posicao", "position", ["ATA", "PE", "PD", "MEI", "VOL", "LE", "LD", "ZAG", "GOL"])}
            ${selectField("Arquetipo", "archetype", archetypes)}
            ${selectField("Craque-base", "legend", legends.map((item) => item.name))}
            <div class="hidden-select">${selectField("Clube inicial", "club", ["Aleatorio", ...clubOptions.map((item) => item.name)])}</div>
            <div class="button-row" style="grid-column: 1 / -1; margin-top: 8px;">
              <button type="submit">Entrar no jogo</button>
            </div>
          </form>
        </div>
      </div>

      <div class="landing-right">
        <div class="landing-right-top">
          <div></div>
          <div>Modo carreira • futebol</div>
        </div>
        <div class="landing-circle"></div>
        <div class="jersey-visual">
          <div class="jersey-shirt"></div>
          <div class="jersey-number">10</div>
        </div>
      </div>
    </div>

    <div class="app-stage" style="display:${showBuilder ? "block" : "none"};">
      <div class="content-stack">
        <div class="logo-wall">
          <span class="section-label">Escolha seu clube inicial</span>
          <div class="club-picker-toolbar" style="margin-top: 14px;">
            <input id="club-search" type="text" placeholder="Buscar clube">
            <select id="club-country-filter">
              ${countryOptions.map((country) => `<option value="${country}">${country}</option>`).join("")}
            </select>
            <button id="club-random" class="secondary" type="button">Sortear</button>
          </div>
          <div id="club-picker-grid" class="club-picker-grid" style="margin-top: 14px;">
            ${clubOptions.map((club, index) => renderClubPickerCard(club, index === 0)).join("")}
          </div>
        </div>
        <div class="logo-wall">
          <span class="section-label">Clubes em destaque</span>
          <div class="logo-grid" style="margin-top: 14px;">
            ${featuredClubs.map((club) => `
              <div class="logo-chip">
                ${logoMarkup(club, "club")}
                <span>${club}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  queueMicrotask(() => {
    document.querySelectorAll("[data-continue-slot]").forEach((button) => {
      button.addEventListener("click", () => continueSlot(Number(button.dataset.continueSlot)));
    });
    document.querySelectorAll("[data-new-slot]").forEach((button) => {
      button.addEventListener("click", () => startNewInSlot(Number(button.dataset.newSlot)));
    });
    document.querySelectorAll("[data-delete-slot]").forEach((button) => {
      button.addEventListener("click", () => {
        if (confirm("Apagar esta carreira salva? Essa acao nao pode ser desfeita.")) {
          deleteSlot(Number(button.dataset.deleteSlot));
        }
      });
    });

    const form = document.getElementById("career-form");
    const builderPanel = document.getElementById("builder-panel");
    const clubField = form?.querySelector('select[name="club"]');
    const clubSearch = document.getElementById("club-search");
    const countryFilter = document.getElementById("club-country-filter");
    const clubButtons = Array.from(document.querySelectorAll("[data-club-choice]"));

    const syncActiveClub = (clubName) => {
      if (clubField) clubField.value = clubName;
      clubButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.clubChoice === clubName);
      });
    };

    const applyClubFilter = () => {
      const searchValue = (clubSearch?.value ?? "").trim().toLowerCase();
      const countryValue = countryFilter?.value ?? "Todos";

      clubButtons.forEach((button) => {
        const matchesSearch = button.dataset.clubChoice.toLowerCase().includes(searchValue);
        const matchesCountry = countryValue === "Todos" || button.dataset.country === countryValue;
        button.style.display = matchesSearch && matchesCountry ? "" : "none";
      });
    };

    clubButtons.forEach((button) => {
      button.addEventListener("click", () => syncActiveClub(button.dataset.clubChoice));
    });

    clubSearch?.addEventListener("input", applyClubFilter);
    countryFilter?.addEventListener("change", applyClubFilter);
    document.getElementById("club-random")?.addEventListener("click", () => {
      const randomClub = randomFrom(clubOptions);
      syncActiveClub(randomClub.name);
    });

    syncActiveClub(clubField?.value && clubField.value !== "Aleatorio" ? clubField.value : clubOptions[0].name);

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(form).entries());
      startCareer(formData);
    });
  });

  container.appendChild(renderSourcePanel());
  return container;
}

// =====================================================================
// RESUMO DE TEMPORADA E OBJETIVOS: fechamento de ano e metas do atleta
// =====================================================================
function renderDecisionMarkup(decision) {
    if (decision.choice) {
      return `
        <div class="decision-card">
          <span class="section-label">Decisao registrada</span>
          <h3 style="margin-top: 8px;">${decision.title}</h3>
          <p class="small-copy" style="margin-top: 8px;">Voce escolheu: <strong>${decision.choice.label}</strong>. Clique em "Avancar rodada" de novo para entrar na partida.</p>
        </div>
      `;
    }
    return `
      <div class="decision-card">
        <span class="section-label">Pop-up de decisao</span>
        <h3 style="margin-top: 8px;">${decision.title}</h3>
        <p class="small-copy" style="margin-top: 8px;">${decision.description}</p>
        <div class="button-row" style="margin-top: 16px;">
          ${decision.options.map((option, index) => `<button class="secondary decision-option" type="button" data-decision="${index}">${option.label}</button>`).join("")}
        </div>
      </div>
    `;
  }

function renderSeasonSummaryShowcase(summary) {
  const deltaLabel = summary.overallDelta > 0 ? `+${summary.overallDelta}` : `${summary.overallDelta}`;
  return `
    <div class="season-summary-shell">
      <div class="season-summary-hero">
        <div>
          <span class="section-label">Resumo da temporada ${summary.year}</span>
          <h2 style="margin-top: 10px;">Seu fechamento de ano em Ascensao</h2>
          <p class="small-copy" style="margin-top: 10px;">Maior vitima: ${summary.biggestVictim}. Diretoria em ${summary.boardConfidence} e torcida em ${summary.fanLove}.</p>
        </div>
        <div class="season-summary-overall">
          <span class="mini-label">Overall</span>
          <strong>${summary.previousOverall} -> ${summary.overall}</strong>
          <span class="pill">${deltaLabel}</span>
        </div>
      </div>
      <div class="grid four" style="margin-top: 18px;">
        ${metricCard("Jogos", summary.matches)}
        ${metricCard("Gols", summary.goals)}
        ${metricCard("Assistencias", summary.assists)}
        ${metricCard("Reputacao", summary.reputation)}
      </div>
      <div class="season-summary-grid" style="margin-top: 18px;">
        <div class="season-summary-card">
          <span class="section-label">Premiacoes</span>
          <div class="timeline" style="margin-top: 14px;">
            ${summary.awards.length ? summary.awards.map((award) => `<div class="timeline-item">${award}</div>`).join("") : `<div class="timeline-item">Sem premios individuais marcantes nesta temporada.</div>`}
          </div>
        </div>
        <div class="season-summary-card">
          <span class="section-label">Trofeus e legado</span>
          <div class="timeline" style="margin-top: 14px;">
            ${summary.trophies?.length ? summary.trophies.map((trophy) => `<div class="timeline-item">${trophy}</div>`).join("") : `<div class="timeline-item">A temporada elevou mais seu nome do que a sala de trofeus.</div>`}
          </div>
        </div>
      </div>
      <div class="season-summary-footer" style="margin-top: 18px;">
        <div class="grid three">
          ${metricCard("Felicidade", summary.happiness)}
          ${metricCard("Torcida", summary.fanLove)}
          ${metricCard("Diretoria", summary.boardConfidence)}
        </div>
        <p class="small-copy" style="margin-top: 16px;">${summary.nextStep}</p>
        ${summary.forcedRetirement ? `<p class="small-copy" style="margin-top: 10px;">Aposentadoria automatica ativada por idade e desempenho nesta reta final da carreira.</p>` : ""}
      </div>
    </div>
  `;
}

function buildCareerObjectives(game, nextFixture) {
  const goalsTarget = Math.max(6, Math.ceil(game.player.matches * 0.32) + 3);
  const assistsTarget = Math.max(4, Math.ceil(game.player.matches * 0.2) + 2);
  const influenceTarget = Math.max(35, Math.min(80, game.player.influence + 8));
  const energyFloor = 68;

  return [
    {
      label: "Meta de gols",
      progress: game.player.goals,
      target: goalsTarget,
      copy: "Empurre sua temporada com peso de decisao na area."
    },
    {
      label: "Criacao",
      progress: game.player.assists,
      target: assistsTarget,
      copy: "Assistencias aumentam moral e leitura de protagonismo."
    },
    {
      label: "Influencia no elenco",
      progress: game.player.influence,
      target: influenceTarget,
      copy: "Ganhe espaco para pedir faixa e bolas paradas."
    },
    {
      label: "Condicao fisica",
      progress: game.player.energy,
      target: energyFloor,
      invert: true,
      copy: nextFixture ? "Chegue inteiro ao proximo compromisso." : "Feche a temporada sem queda brusca de energia."
    }
  ];
}

function renderObjectiveCard(objective) {
  const ratioBase = objective.invert
    ? objective.progress / Math.max(objective.target, 1)
    : objective.progress / Math.max(objective.target, 1);
  const ratio = clamp(ratioBase, 0, 1);
  const status = ratio >= 1 ? "Concluida" : ratio >= 0.7 ? "Muito perto" : "Em curso";

  return `
    <div class="objective-card">
      <div class="header-row">
        <span class="section-label">${objective.label}</span>
        <span class="pill">${status}</span>
      </div>
      <strong>${objective.progress}<span class="objective-divider">/</span>${objective.target}</strong>
      <div class="objective-track">
        <div class="objective-fill" style="width:${Math.round(ratio * 100)}%"></div>
      </div>
    </div>
  `;
}

function renderSeasonCalendar(game) {
  const focusFixtures = game.fixtures.slice(0, 10);
  return `
    <div class="season-calendar-grid">
      ${focusFixtures.map((fixture) => `
        <button class="season-calendar-card ${fixture.played ? "played" : fixture.importance >= 88 ? "spotlight" : ""} ${state.selectedFixtureId === fixture.id ? "active" : ""}" type="button" data-fixture-detail="${fixture.id}">
          <div class="season-calendar-top">
            <span class="section-label">${fixture.roundLabel}</span>
            <span class="pill">${fixture.importance}</span>
          </div>
          <strong>${fixture.opponent}</strong>
          <span class="small-copy">${fixture.competition}</span>
          <div class="season-calendar-meta">
            <span>${fixture.played ? fixture.result : "Por jogar"}</span>
            <span>${fixture.played ? `${fixture.playerGoals}G / ${fixture.playerAssists}A` : fixture.live ? "tempo real" : "simulado"}</span>
          </div>
        </button>
      `).join("")}
    </div>
  `;
}

function renderFixtureDetailCard(game, fixture) {
  if (!fixture) {
    return `
      <div class="fixture-detail-card">
        <span class="section-label">Detalhe da rodada</span>
        <h3>Selecione uma rodada</h3>
        <p class="small-copy">Clique em um card do calendario para abrir a leitura completa do confronto e do peso dele na sua carreira.</p>
      </div>
    `;
  }

  const competitionInfo = competitionLibrary.find((item) => item.name === fixture.competition);
  const rivalry = game.club.rivals.includes(fixture.opponent);
  const statusCopy = fixture.played
    ? `${fixture.result} com nota ${fixture.rating}.`
    : `Jogo ainda nao disputado. Importancia ${fixture.importance}.`;

  return `
    <div class="fixture-detail-card">
      <div class="fixture-detail-top">
        <div>
          <span class="section-label">Detalhe da rodada</span>
          <h3>${fixture.competition} contra ${fixture.opponent}</h3>
        </div>
        <span class="pill">${fixture.roundLabel}</span>
      </div>
      <div class="fixture-detail-scoreboard">
        <div class="live-team">
          ${logoMarkup(game.player.club, "club")}
          <strong>${game.player.club}</strong>
        </div>
        <div class="live-score">${fixture.played ? fixture.result : "VS"}</div>
        <div class="live-team">
          ${logoMarkup(fixture.opponent, "club")}
          <strong>${fixture.opponent}</strong>
        </div>
      </div>
      <p class="small-copy">${statusCopy}</p>
      <div class="grid two" style="margin-top: 14px;">
        ${metricCard("Competicao", fixture.competition)}
        ${metricCard("Impacto", fixture.importance)}
        ${metricCard("Rivalidade", rivalry ? "Classico" : "Normal")}
        ${metricCard("Status", fixture.played ? "Concluido" : "Agendado")}
      </div>
      <div class="timeline" style="margin-top: 14px;">
        <div class="timeline-item">${competitionInfo?.format ?? "Competicao em base inicial do modo carreira."}</div>
        <div class="timeline-item">${rivalry ? "Esse duelo tem carga de rivalidade e tende a mexer mais com torcida, tecnico e moral." : "Esse confronto pesa mais pelo momento da campanha do que por rivalidade historica."}</div>
        <div class="timeline-item">${fixture.played ? `${fixture.playerGoals} gol(s), ${fixture.playerAssists} assistencia(s) e leitura direta no seu protagonismo.` : "Uma boa atuacao aqui pode empurrar reputacao, diretoria e espaco no elenco."}</div>
      </div>
      ${fixture.events?.length ? `<div class="timeline match-event-timeline" style="margin-top: 14px;">${fixture.events.map((event) => `<div class="timeline-item match-event-item ${event.type}"><strong>${event.minute}'</strong> ${event.text}</div>`).join("")}</div>` : ""}
    </div>
  `;
}

// =====================================================================
// CLASSIFICACOES E CHAVEAMENTO: tabela de liga, artilharia e mata-mata
// =====================================================================
function parseResultScore(result) {
  if (!result) return null;
  const match = result.match(/(\d+)-(\d+)/);
  if (!match) return null;
  return {
    teamGoals: Number(match[1]),
    oppGoals: Number(match[2])
  };
}

function buildCompetitionStandings(game, competitionName) {
  const leagueClubs = clubs.filter((club) => club.competition === competitionName);
  if (!leagueClubs.length) return null;

  const playedCompetitionFixtures = game.fixtures.filter((fixture) => fixture.competition === competitionName && fixture.played);
  const roundsPlayed = playedCompetitionFixtures.length;
  const table = leagueClubs.map((club) => {
    const strengthBias = club.name === game.player.club ? 0 : Math.round((club.strength - 70) / 2);
    const wins = clamp(Math.floor(roundsPlayed * (0.24 + (club.strength - 70) / 100)), 0, roundsPlayed);
    const draws = clamp(Math.floor(roundsPlayed * 0.22), 0, Math.max(roundsPlayed - wins, 0));
    const losses = Math.max(roundsPlayed - wins - draws, 0);
    const goalsFor = wins * 2 + draws + Math.floor(roundsPlayed * 0.6) + strengthBias;
    const goalsAgainst = losses * 2 + Math.floor(roundsPlayed * 0.5) + clamp(82 - club.strength, 0, 15);
    return {
      club: club.name,
      points: wins * 3 + draws,
      played: roundsPlayed,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDiff: goalsFor - goalsAgainst
    };
  });

  playedCompetitionFixtures.forEach((fixture) => {
    const score = parseResultScore(fixture.result);
    if (!score) return;
    const row = table.find((item) => item.club === game.player.club);
    if (!row) return;
    row.goalsFor += score.teamGoals;
    row.goalsAgainst += score.oppGoals;
    row.goalDiff = row.goalsFor - row.goalsAgainst;
  });

  table.sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor || a.club.localeCompare(b.club));
  table.forEach((row, index) => {
    row.position = index + 1;
    row.zone = index < 4 ? "title" : index >= table.length - 4 ? "relegation" : index < 6 ? "continental" : "mid";
  });

  return table;
}

function buildCompetitionTopScorers(game, competitionName) {
  const leagueClubs = clubs.filter((club) => club.competition === competitionName);
  if (!leagueClubs.length) return [];

  const scorers = leagueClubs.slice(0, 8).map((club, index) => ({
    name: `${randomFrom(["Pedro", "Luis", "Rafael", "Andre", "Pablo", "Victor", "Enzo", "Caio"])} ${club.name.split(" ")[0]}`,
    club: club.name,
    goals: clamp(5 + Math.floor((club.strength - 70) / 3) + (7 - index), 4, 23)
  }));

  const existing = scorers.find((item) => item.club === game.player.club);
  if (existing) {
    existing.name = game.player.name;
    existing.goals = Math.max(existing.goals, game.player.goals);
  } else {
    scorers.push({ name: game.player.name, club: game.player.club, goals: game.player.goals });
  }

  return scorers.sort((a, b) => b.goals - a.goals).slice(0, 6);
}

function renderStandingsTable(game, competitionName) {
  const table = buildCompetitionStandings(game, competitionName);
  if (!table) {
    return `<div class="timeline-item">Classificacao detalhada entra primeiro nas ligas de pontos corridos desta fase inicial.</div>`;
  }

  return `
    <div class="standings-table">
      ${table.map((row) => `
        <div class="standings-row ${row.club === game.player.club ? "club-focus" : ""} ${row.zone}">
          <span class="standings-pos">${row.position}</span>
          <span class="standings-club">${row.club}</span>
          <span>${row.points} pts</span>
          <span>${row.played} J</span>
          <span>${row.wins} V</span>
          <span>${row.draws} E</span>
          <span>${row.losses} D</span>
          <span>${row.goalDiff >= 0 ? "+" : ""}${row.goalDiff}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderScorersTable(game, competitionName) {
  const scorers = buildCompetitionTopScorers(game, competitionName);
  return `
    <div class="timeline">
      ${scorers.map((item, index) => `
        <div class="timeline-item">
          <strong>${index + 1}. ${item.name}</strong><br>
          <span class="small-copy">${item.club} • ${item.goals} gol(s)</span>
        </div>
      `).join("")}
    </div>
  `;
}

function buildKnockoutBracket(game, competitionName) {
  const nationalFixtures = game.fixtures.filter((item) => item.tournament === "national" && item.tournamentName === competitionName);

  if (nationalFixtures.length) {
    const groupGames = nationalFixtures.filter((item) => item.stage === "grupos");
    const knockoutStages = ["quartas", "semifinal", "final"];
    const stageLabels = { quartas: "Quartas", semifinal: "Semifinal", final: "Final" };
    const rounds = [];

    if (groupGames.length) {
      rounds.push({
        stage: "Fase de grupos",
        matches: groupGames.map((item) => ({
          home: game.player.nationality,
          away: item.opponent,
          score: item.played ? item.result : "a jogar",
          highlight: true
        }))
      });
    }

    knockoutStages.forEach((stageKey) => {
      const stageFixture = nationalFixtures.find((item) => item.stage === stageKey);
      if (!stageFixture) return;
      rounds.push({
        stage: stageLabels[stageKey],
        matches: [{
          home: game.player.nationality,
          away: stageFixture.opponent,
          score: stageFixture.played ? stageFixture.result : "a jogar",
          highlight: true,
          penalty: stageFixture.penalty ? `${stageFixture.penalty.teamPens}-${stageFixture.penalty.oppPens} pen` : null
        }]
      });
    });

    return rounds;
  }

  const isCup = ["Copa do Brasil", "CONMEBOL Libertadores", "CONMEBOL Sudamericana"].includes(competitionName);
  if (!isCup) return null;

  const fixture = game.fixtures.find((item) => item.competition === competitionName);
  const playerClub = game.player.club;
  const rival = fixture?.opponent ?? "Adversario";
  const playerScore = parseResultScore(fixture?.result)?.teamGoals ?? Math.max(0, Math.floor(game.player.goals / 2));
  const rivalScore = parseResultScore(fixture?.result)?.oppGoals ?? Math.max(0, Math.floor(Math.random() * 2));
  const penaltyText = fixture?.penalty ? `${fixture.penalty.teamPens}-${fixture.penalty.oppPens} pen` : null;

  return [
    {
      stage: "Quartas",
      matches: [
        { home: "Palmeiras", away: "River Plate", score: "2-1", highlight: false },
        { home: playerClub, away: rival, score: fixture?.played ? fixture.result : "ida a jogar", highlight: true, penalty: penaltyText },
        { home: "Flamengo", away: "Boca Juniors", score: "1-1", highlight: false },
        { home: "Benfica", away: "PSG", score: "0-2", highlight: false }
      ]
    },
    {
      stage: "Semifinal",
      matches: [
        { home: playerClub, away: playerScore >= rivalScore ? "Palmeiras" : "River Plate", score: fixture?.played ? `${Math.max(playerScore, 1)}-${Math.max(rivalScore - 1, 0)}` : "aguardando", highlight: true },
        { home: "Flamengo", away: "PSG", score: "aguardando", highlight: false }
      ]
    },
    {
      stage: "Final",
      matches: [
        { home: playerClub, away: "Flamengo", score: fixture?.played && playerScore >= rivalScore ? "projetada" : "em aberto", highlight: true }
      ]
    }
  ];
}

function renderKnockoutBracket(game, competitionName) {
  const bracket = buildKnockoutBracket(game, competitionName);
  if (!bracket) return "";

  return `
    <div class="knockout-bracket">
      ${bracket.map((round) => `
        <div class="knockout-column">
          <div class="knockout-stage">${round.stage}</div>
          <div class="knockout-match-stack">
            ${round.matches.map((match) => `
              <div class="knockout-match ${match.highlight ? "highlight" : ""}">
                <div class="knockout-team-line">
                  <span>${match.home}</span>
                  <strong>${match.score}</strong>
                </div>
                <div class="knockout-team-line">
                  <span>${match.away}</span>
                  <span class="small-copy">${match.penalty ?? " "}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// =====================================================================
// ABAS DA CARREIRA: as telas principais (carreira, contrato,
// empresario, tecnico, corpo, clube, competicoes, rede social)
// =====================================================================
function renderCareerTab(game) {
  const panel = document.createElement("div");
  panel.className = "content-stack";
  const nextFixture = game.fixtures.find((item) => !item.played);
  const recent = game.fixtures.filter((item) => item.played).slice(-3).reverse();
  const latestLive = game.fixtures.filter((item) => item.played && item.live).slice(-1)[0];
  const objectives = buildCareerObjectives(game, nextFixture);
  const selectedFixture = game.fixtures.find((item) => item.id === state.selectedFixtureId) ?? nextFixture ?? game.fixtures[0];

  panel.innerHTML = `
    <div class="display-panel player-stage">
      <div class="player-stage-grid">
        <div class="player-stage-copy">
          <div class="stage-kicker">Minha carreira • ascensao</div>
          <div class="stage-name">${game.player.name}</div>
          <div class="stage-chip-row">
            <span class="stage-chip">Overall ${game.player.overall}</span>
            <span class="stage-chip">Moral ${game.player.morale}</span>
            <span class="stage-chip">Forma ${game.player.form}</span>
            <span class="stage-chip">Energia ${game.player.energy}</span>
          </div>
        </div>
        <div class="player-stage-visual">
          <div class="stage-stat-grid">
            <div class="stage-stat"><span class="mini-label">Gols</span><strong>${game.player.goals}</strong></div>
            <div class="stage-stat"><span class="mini-label">Assist.</span><strong>${game.player.assists}</strong></div>
            <div class="stage-stat"><span class="mini-label">Jogos</span><strong>${game.player.matches}</strong></div>
            <div class="stage-stat"><span class="mini-label">Felicidade</span><strong>${game.player.happiness}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="display-panel panel-highlight">
      <div class="section-hero">
        <div class="section-hero-copy">
          <span class="section-label">Painel do atleta</span>
        </div>
        <div class="section-actions">
          <button id="advance-btn" type="button">${game.seasonSummary ? (game.seasonSummary.forcedRetirement ? "Encerrar carreira" : "Iniciar nova temporada") : game.player.injury?.matchesOut > 0 ? "Avancar rodada (lesionado)" : game.decision?.choice ? "Entrar em campo" : nextFixture ? "Avancar rodada" : "Fechar temporada"}</button>
          <button id="train-btn" class="secondary" type="button" ${game.seasonSummary || game.player.injury?.matchesOut > 0 ? "disabled" : ""}>Treinar</button>
          <button id="rest-btn" class="secondary" type="button" ${game.seasonSummary ? "disabled" : ""}>Descansar</button>
        </div>
      </div>
        ${game.player.injury?.matchesOut > 0 ? `<div style="margin-top: 18px;" class="decision-card"><span class="section-label">Departamento medico</span><h3 style="margin-top: 8px;">Lesao ${game.player.injury.severity}</h3><p class="small-copy" style="margin-top: 8px;">Faltam ${game.player.injury.matchesOut} de ${game.player.injury.totalMatches} jogo(s) para voltar a atuar. Treino bloqueado; avance as rodadas para o tempo passar.</p></div>` : ""}
        ${game.decision ? `<div style="margin-top: 18px;">${renderDecisionMarkup(game.decision)}</div>` : ""}
        ${state.matchFocus ? `<div style="margin-top: 18px;">${renderMatchFocus(state.matchFocus, game, nextFixture)}</div>` : ""}
        ${state.penaltyPrompt ? `<div style="margin-top: 18px;">${renderPenaltyPrompt(state.penaltyPrompt)}</div>` : ""}
        ${game.seasonSummary ? `<div style="margin-top: 18px;">${renderSeasonSummaryShowcase(game.seasonSummary)}</div>` : ""}
      </div>

    <div class="career-hub-grid">
      <div class="display-panel panel-highlight">
        <span class="section-label">Calendario</span>
        <div style="margin-top: 14px;">
          ${renderSeasonCalendar(game)}
        </div>
      </div>
      <div class="display-panel">
        <div style="margin-top: 0;">
          ${renderFixtureDetailCard(game, selectedFixture)}
        </div>
      </div>
    </div>

    <div class="display-panel">
      <span class="section-label">Objetivos</span>
      <div class="objective-grid" style="margin-top: 14px;">
        ${objectives.map(renderObjectiveCard).join("")}
      </div>
    </div>

    ${latestLive ? renderLiveHud(latestLive, game.player.name, game.player.club) : ""}

    <div class="display-panel section-band">
      <span class="section-label">Rastro da temporada</span>
      <div class="timeline" style="margin-top: 14px;">
        ${recent.length ? recent.map((item) => `
          <div class="timeline-item">
            <strong>${item.competition}</strong> vs ${item.opponent} • ${item.result} • ${item.playerGoals}G/${item.playerAssists}A • nota ${item.rating}
          </div>
        `).join("") : `<div class="timeline-item">Seu historico de partidas vai aparecer aqui.</div>`}
      </div>
    </div>
  `;

  queueMicrotask(() => {
      document.getElementById("advance-btn")?.addEventListener("click", () => {
        if (game.seasonSummary) {
          if (game.seasonSummary.forcedRetirement) {
            const updatedGame = structuredClone(game);
            updatedGame.retired = true;
            setState({ game: updatedGame });
          } else {
            advanceToNextSeason();
          }
          return;
        }
        advanceRound();
      });
      document.getElementById("train-btn")?.addEventListener("click", trainPlayer);
      document.getElementById("rest-btn")?.addEventListener("click", restPlayer);
      document.querySelectorAll("[data-decision]").forEach((button) => {
        button.addEventListener("click", () => chooseDecision(Number(button.dataset.decision)));
      });
      document.querySelectorAll("[data-penalty-order]").forEach((button) => {
        button.addEventListener("click", () => choosePenaltyOrder(Number(button.dataset.penaltyOrder)));
      });
      document.querySelectorAll("[data-match-focus]").forEach((button) => {
        button.addEventListener("click", () => chooseMatchFocusOption(Number(button.dataset.matchFocus)));
      });
      document.querySelectorAll("[data-close-match-focus]").forEach((button) => {
        button.addEventListener("click", closeMatchFocus);
      });
      document.querySelectorAll("[data-advance-from-focus]").forEach((button) => {
        button.addEventListener("click", advanceRound);
      });
      document.querySelectorAll("[data-step-match-focus]").forEach((button) => {
        button.addEventListener("click", () => {
          if (state.matchFocus?.playback?.finished) {
            continueFromPostMatch();
            return;
          }
          advanceMatchPlayback();
        });
      });
      document.querySelectorAll("[data-continue-postmatch]").forEach((button) => {
        button.addEventListener("click", continueFromPostMatch);
      });
      document.querySelectorAll("[data-fixture-detail]").forEach((button) => {
        button.addEventListener("click", () => setState({ selectedFixtureId: button.dataset.fixtureDetail }));
      });
    });

  return panel;
}

function renderContractTab(game) {
  const panel = document.createElement("div");
  panel.className = "fixture-split";
  const leverage = game.player.reputation + game.club.fanLove + game.club.boardConfidence;
  const leverageLabel = leverage >= 160 ? "Alta (aumento forte)" : leverage >= 130 ? "Media (aumento moderado)" : "Baixa (aumento pequeno)";
  panel.innerHTML = `
    <div class="display-panel panel-highlight">
      <span class="section-label">Contrato</span>
      <div class="grid three" style="margin-top: 14px;">
        ${metricCard("Salario", `R$ ${game.contract.salary.toLocaleString("pt-BR")}`)}
        ${gaugeCard("Anos restantes", game.contract.yearsLeft, { max: 5, copy: game.contract.yearsLeft <= 1 ? "Renovacao urgente" : "" })}
        ${metricCard("Multa", `R$ ${game.contract.releaseClause.toLocaleString("pt-BR")}`)}
      </div>
      <div class="grid three" style="margin-top: 14px;">
        ${gaugeCard("Reputacao", game.player.reputation)}
        ${gaugeCard("Torcida", game.club.fanLove)}
        ${gaugeCard("Diretoria", game.club.boardConfidence)}
      </div>
      <p class="small-copy" style="margin-top: 14px;">Poder de negociacao: <strong>${leverageLabel}</strong>.</p>
      <div class="button-row" style="margin-top: 16px;">
        <button id="renew-btn" type="button">Tentar renovar</button>
      </div>
    </div>
    <div class="display-panel">
      <span class="section-label">Caixa de entrada</span>
      <div class="timeline" style="margin-top: 14px;">
        ${game.inbox.slice(0, 8).map((message) => `<div class="timeline-item">${message}</div>`).join("")}
      </div>
    </div>
  `;
  queueMicrotask(() => {
    document.getElementById("renew-btn")?.addEventListener("click", renewContract);
  });
  return panel;
}

function renderAgentTab(game) {
  const panel = document.createElement("div");
  panel.className = "content-stack";
  panel.innerHTML = `
    <div class="fixture-split">
      <div class="display-panel panel-highlight">
        <span class="section-label">Empresario</span>
        <div class="grid three" style="margin-top: 14px;">
          ${metricCard("Nivel", game.agent.level)}
          ${gaugeCard("Rede", game.agent.network)}
          ${gaugeCard("Buzz", game.agent.marketBuzz)}
        </div>
      </div>
      <div class="display-panel">
        <span class="section-label">Mercado</span>
        <p style="margin-top: 10px;">${game.player.reputation >= 35 ? "Seu nome ja circula fora do pais." : "Ainda e cedo, mas boas atuacoes podem abrir o mercado."}</p>
      </div>
    </div>
    <div class="display-panel">
      <span class="section-label">Ofertas em maos</span>
      <div class="timeline" style="margin-top: 14px;">
        ${game.agent.offers.length ? game.agent.offers.slice(0, 4).map((offer) => `
          <div class="timeline-item">
            <strong>${offer.club}</strong> • ${offer.country} • ${offer.competition}<br>
            <span class="small-copy">R$ ${offer.salary.toLocaleString("pt-BR")} • ${offer.years} anos • ${offer.role}</span>
            <div class="button-row" style="margin-top: 10px;">
              <button type="button" data-accept-offer="${offer.id}">Aceitar</button>
              <button class="secondary" type="button" data-reject-offer="${offer.id}">Recusar</button>
            </div>
          </div>
        `).join("") : `<div class="timeline-item">Ainda nao ha propostas concretas.</div>`}
      </div>
    </div>
  `;
  queueMicrotask(() => {
    document.querySelectorAll("[data-accept-offer]").forEach((button) => {
      button.addEventListener("click", () => acceptTransferOffer(button.dataset.acceptOffer));
    });
    document.querySelectorAll("[data-reject-offer]").forEach((button) => {
      button.addEventListener("click", () => rejectTransferOffer(button.dataset.rejectOffer));
    });
  });
  return panel;
}

function renderCoachTab(game) {
  const panel = document.createElement("div");
  panel.className = "fixture-split";
  panel.innerHTML = `
    <div class="display-panel panel-highlight">
      <span class="section-label">Tecnico</span>
      <div class="grid three" style="margin-top: 14px;">
        ${gaugeCard("Confianca", game.coach.trust)}
        ${gaugeCard("Risco de banco", game.coach.rotationRisk, { invert: true })}
        ${gaugeCard("Hierarquia", game.player.influence)}
      </div>
      <div class="button-row" style="margin-top: 18px;">
        <button id="captain-btn" class="secondary" type="button">Pedir faixa de capitao</button>
        <button id="pen-btn" class="secondary" type="button">Pedir penaltis</button>
        <button id="fk-btn" class="secondary" type="button">Pedir faltas</button>
      </div>
    </div>
    <div class="display-panel">
      <span class="section-label">Funcoes atuais</span>
      <p style="margin-top: 10px;">${game.player.isCaptain ? "Voce ja e capitao." : "Voce ainda busca mais lideranca dentro do elenco."} ${game.player.setPieces.length ? `Bolas paradas liberadas: ${game.player.setPieces.join(", ")}.` : "Ainda sem bolas paradas."}</p>
    </div>
  `;

  queueMicrotask(() => {
    document.getElementById("captain-btn")?.addEventListener("click", () => askForRole("Capitao"));
    document.getElementById("pen-btn")?.addEventListener("click", () => askForRole("Penaltis"));
    document.getElementById("fk-btn")?.addEventListener("click", () => askForRole("Faltas"));
  });

  return panel;
}

function renderBodyTab(game) {
  const panel = document.createElement("div");
  panel.className = "content-stack";
  panel.innerHTML = `
    <div class="fixture-split">
      <div class="display-panel panel-highlight">
        <span class="section-label">Corpo e recuperacao</span>
        <div class="grid three" style="margin-top: 14px;">
          ${gaugeCard("Condicao", game.body.fitness)}
          ${gaugeCard("Frescor", game.body.freshness)}
          ${gaugeCard("Risco de lesao", game.body.injuryRisk, { invert: true })}
        </div>
        ${game.player.injury?.matchesOut > 0 ? `<p class="small-copy" style="margin-top: 12px; color: var(--danger);">Lesao ${game.player.injury.severity}: ${game.player.injury.matchesOut} jogo(s) restante(s) fora dos gramados.</p>` : ""}
      </div>
      <div class="display-panel">
        <span class="section-label">Longevidade</span>
        <div style="margin-top: 10px;">
          ${gaugeCard("Idade", game.player.age, { max: 34, invert: true, copy: game.player.age >= 34 ? "Fase de declinio ativa" : `${34 - game.player.age} anos ate o declinio` })}
        </div>
        <p class="small-copy" style="margin-top: 14px;">Overall cai a partir dos 34 anos; aposentadoria automatica se cair a 62 (ou aos 45, no limite).</p>
      </div>
    </div>
    <div class="display-panel">
      <span class="section-label">Evolucao do jogador</span>
      <div class="grid three" style="margin-top: 14px;">
        ${metricCard("Nivel de desenvolvimento", game.player.development.level)}
        ${(() => {
          const thresholds = [0, 40, 90, 150, 230, 320];
          const nextThreshold = thresholds[game.player.development.level] ?? thresholds[thresholds.length - 1];
          const prevThreshold = thresholds[game.player.development.level - 1] ?? 0;
          const span = Math.max(nextThreshold - prevThreshold, 1);
          const progressInLevel = clamp(game.player.development.xp - prevThreshold, 0, span);
          return gaugeCard("XP acumulado", game.player.development.xp, { max: nextThreshold || game.player.development.xp || 1, copy: game.player.development.level >= thresholds.length ? "Nivel maximo" : `${progressInLevel}/${span} para o proximo nivel` });
        })()}
        ${metricCard("Foco atual", game.player.development.focus)}
      </div>
      <div class="button-row" style="margin-top: 16px;">
        ${(developmentTracks[game.player.archetype] ?? []).map((focus) => `<button class="secondary" type="button" data-dev-focus="${focus}">${focus}</button>`).join("")}
      </div>
      <div class="timeline" style="margin-top: 14px;">
        ${game.player.development.peaks.length ? game.player.development.peaks.slice(0, 4).map((item) => `<div class="timeline-item">${item}</div>`).join("") : `<div class="timeline-item">Seus marcos de evolucao vao aparecer aqui.</div>`}
      </div>
    </div>
  `;
  queueMicrotask(() => {
    document.querySelectorAll("[data-dev-focus]").forEach((button) => {
      button.addEventListener("click", () => setTrainingFocus(button.dataset.devFocus));
    });
  });
  return panel;
}

function renderClubTab(game) {
  const panel = document.createElement("div");
  panel.className = "content-stack";
  panel.innerHTML = `
    <div class="fixture-split">
      <div class="display-panel panel-highlight">
        <span class="section-label">Clube</span>
        <div class="club-card" style="margin-top: 14px;">
          <div class="club-hero">
            ${logoMarkup(game.club.name, "club", true)}
            <div>
              <strong>${game.club.name}</strong>
              <span class="small-copy">${game.club.country} • ${game.club.competition}</span>
            </div>
          </div>
          <div class="grid three">
            ${gaugeCard("Nivel", game.club.difficulty)}
            ${gaugeCard("Diretoria", game.club.boardConfidence)}
            ${gaugeCard("Torcida", game.club.fanLove)}
          </div>
          <p class="small-copy">${game.club.rivals.length ? `Rivais mapeados: ${game.club.rivals.join(", ")}.` : "Sem rivalidades destacadas nesta base inicial."}</p>
        </div>
      </div>
      <div class="display-panel">
        <span class="section-label">Elenco</span>
        <div class="timeline" style="margin-top: 14px;">
          ${game.club.squad.slice(0, 11).map((athlete) => `<div class="timeline-item">#${athlete.number} ${athlete.position} • ${athlete.name} • ${athlete.age} anos • overall ${athlete.overall}${athlete.isStar ? " • ⭐ Astro do elenco" : athlete.isCaptain ? " • 🎗️ Capitao" : ""}</div>`).join("")}
        </div>
      </div>
    </div>
    ${getStarTeammate(game.club) ? `
    <div class="display-panel panel-highlight">
      <span class="section-label">Parceiro em alta</span>
      <h2 style="margin-top: 8px;">${getStarTeammate(game.club).name}</h2>
      <p class="small-copy" style="margin-top: 6px;">${getStarTeammate(game.club).position} • ${getStarTeammate(game.club).age} anos • overall ${getStarTeammate(game.club).overall}</p>
    </div>
    ` : ""}
    <div class="display-panel">
      <span class="section-label">Galeria de logos do universo atual</span>
      <div class="reel" style="margin-top: 14px;">
        ${clubs.slice(0, 18).map((club) => `
          <div class="club-card mini-club">
            <div class="club-card-top">
              ${logoMarkup(club.name, "club")}
              <div>
                <strong>${club.name}</strong>
                <span class="small-copy">${club.competition}</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  return panel;
}

function renderCompetitionsTab() {
  const container = document.createElement("div");
  container.className = "content-stack";
  const selected = competitionLibrary.find((item) => item.id === state.competitionView) ?? competitionLibrary[0];
  const game = state.game;
  const currentTable = game ? buildCompetitionStandings(game, selected.name) : null;
  const playerRow = currentTable?.find((row) => row.club === game?.player.club);
  const bracketMarkup = game ? renderKnockoutBracket(game, selected.name) : "";
  const HOF_GOALS_THRESHOLD = 25;
  const playerCompStats = game?.player?.competitionStats?.[selected.name] ?? { goals: 0, assists: 0, matches: 0 };
  const isNewRecord = playerCompStats.goals >= HOF_GOALS_THRESHOLD;
  const allTimeScorerDisplay = isNewRecord
    ? `${game.player.name} (${playerCompStats.goals})`
    : selected.allTimeTopScorer;

  container.innerHTML = `
    <div class="display-panel panel-highlight">
      <span class="section-label">Competicoes</span>
      <div class="catalog-grid" style="margin-top: 14px;">
        ${competitionLibrary.map((competition) => `
          <button class="competition-card ${competition.id === selected.id ? "active" : ""}" type="button" data-competition="${competition.id}">
            ${logoMarkup(competition.name, "competition")}
            <strong>${competition.name}</strong>
            <span class="small-copy">${competition.region}</span>
            <span class="small-copy">${competition.format}</span>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="fixture-split">
      <div class="display-panel">
        <span class="section-label">${selected.name}</span>
        <div class="grid two" style="margin-top: 16px;">
          ${metricCard("Artilheiro atual", selected.currentTopScorer)}
          ${metricCard("Artilheiro historico", allTimeScorerDisplay)}
          ${metricCard("Maior garcom", selected.topAssist)}
          ${metricCard("Maior campeao", selected.recordChampion)}
        </div>
        ${isNewRecord ? `<p class="small-copy" style="margin-top: 10px; color: var(--accent, #d9ff35);">NOVO RECORDE: sua carreira ja superou a marca historica.</p>` : ""}
        <p class="small-copy" style="margin-top: 16px;">${selected.rivalryNotes}</p>
      </div>
      <div class="display-panel">
        <span class="section-label">Sua marca nessa competicao</span>
        <div class="grid two" style="margin-top: 16px;">
          ${metricCard("Seus gols", playerCompStats.goals)}
          ${metricCard("Suas assistencias", playerCompStats.assists)}
          ${metricCard("Seus jogos", playerCompStats.matches)}
          ${metricCard("Media por jogo", playerCompStats.matches ? (playerCompStats.goals / playerCompStats.matches).toFixed(2) : "0.00")}
        </div>
        ${!game ? `<p class="small-copy" style="margin-top: 12px;">Comece uma carreira para construir seu proprio historico aqui.</p>` : ""}
      </div>
    </div>
    <div class="fixture-split">
      <div class="display-panel panel-highlight">
        <span class="section-label">${bracketMarkup ? "Chaveamento" : "Classificacao ao vivo"}</span>
        ${bracketMarkup ? `
          <div style="margin-top: 16px;">
            ${bracketMarkup}
          </div>
        ` : currentTable ? `
          <div class="grid four" style="margin-top: 14px;">
            ${metricCard("Seu lugar", playerRow ? `${playerRow.position}o` : "-")}
            ${metricCard("Pontos", playerRow?.points ?? "-")}
            ${metricCard("Jogos", playerRow?.played ?? "-")}
            ${metricCard("Saldo", playerRow ? `${playerRow.goalDiff >= 0 ? "+" : ""}${playerRow.goalDiff}` : "-")}
          </div>
          <div style="margin-top: 16px;">
            ${renderStandingsTable(game, selected.name)}
          </div>
        ` : `
          <div class="timeline" style="margin-top: 14px;">
            <div class="timeline-item">Essa competicao entra na classificacao viva quando voce disputar o modo de liga na carreira.</div>
          </div>
        `}
      </div>
      <div class="display-panel">
        <span class="section-label">Artilharia</span>
        <div style="margin-top: 14px;">
          ${game ? renderScorersTable(game, selected.name) : `<div class="timeline-item">Comece uma carreira para ver a corrida de gols.</div>`}
        </div>
      </div>
    </div>
    <div class="display-panel section-band">
      <span class="section-label">Historico: sua carreira, temporada a temporada</span>
      <div style="margin-top: 14px;">
        ${renderCareerHistoryTable(game)}
      </div>
    </div>
  `;

  queueMicrotask(() => {
    document.querySelectorAll("[data-competition]").forEach((button) => {
      button.addEventListener("click", () => setState({ competitionView: button.dataset.competition }));
    });
  });

  return container;
}

function renderCareerHistoryTable(game) {
  const history = game?.careerHistory ?? [];
  if (!history.length) {
    return `<div class="timeline-item">Feche sua primeira temporada para comecar a construir seu historico de carreira.</div>`;
  }

  return `
    <div class="standings-table">
      ${[...history].reverse().map((entry) => `
        <div class="standings-row">
          <span class="standings-pos">${entry.year}</span>
          <span class="standings-club">${entry.club}</span>
          <span>${entry.overall} OVR</span>
          <span>${entry.goals} G</span>
          <span>${entry.assists} A</span>
          <span>${entry.matches} J</span>
          <span>${entry.trophies?.length ? entry.trophies.join(", ") : "Sem titulos"}</span>
        </div>
      `).join("")}
    </div>
  `;
}

// =====================================================================
// TELA DE LEGADO: resumo final quando a carreira e encerrada
// =====================================================================
function renderLegacyScreen(game) {
  const container = document.createElement("section");
  container.className = "screen";

  const history = game.careerHistory ?? [];
  const totalGoals = history.reduce((sum, entry) => sum + entry.goals, 0);
  const totalAssists = history.reduce((sum, entry) => sum + entry.assists, 0);
  const totalMatches = history.reduce((sum, entry) => sum + entry.matches, 0);
  const clubsPlayed = Array.from(new Set(history.map((entry) => entry.club)));
  const peakSeason = history.reduce((best, entry) => (!best || entry.goals > best.goals ? entry : best), null);
  const allTrophies = Array.from(new Set([
    ...history.flatMap((entry) => entry.trophies ?? []),
    ...(game.player.trophies ?? [])
  ]));
  const peakOverall = history.reduce((max, entry) => Math.max(max, entry.overall), game.player.overall);

  container.innerHTML = `
    <div class="landing-shell">
      <div class="landing-copy">
        <div class="landing-topbar">
          <div class="landing-brand">
            <div class="landing-brand-mark">A</div>
            <div class="landing-brand-name">Ascensao</div>
          </div>
          <div class="landing-mini">Carreira encerrada</div>
        </div>
        <div>
          <div class="landing-tagline">Fim de carreira</div>
          <div class="landing-headline">${game.player.name}, <em>legado registrado.</em></div>
          <p class="landing-description">${history.length} temporada(s) disputada(s), passando por ${clubsPlayed.length} clube(s), do overall inicial ate o pico de ${peakOverall}. Aqui esta o resumo do que voce construiu.</p>
        </div>
      </div>
      <div class="landing-right">
        <div class="landing-right-top">
          <div></div>
          <div>Modo carreira • futebol</div>
        </div>
        <div class="landing-circle"></div>
        <div class="jersey-visual">
          <div class="jersey-shirt"></div>
          <div class="jersey-number">${game.player.number ?? "10"}</div>
        </div>
      </div>
    </div>

    <div class="app-stage">
      <div class="content-stack">
        <div class="display-panel panel-highlight">
          <span class="section-label">Numeros da carreira</span>
          <div class="grid four" style="margin-top: 14px;">
            ${metricCard("Temporadas", history.length)}
            ${metricCard("Gols", totalGoals)}
            ${metricCard("Assistencias", totalAssists)}
            ${metricCard("Jogos", totalMatches)}
          </div>
        </div>
        <div class="fixture-split">
          <div class="display-panel">
            <span class="section-label">Clubes que voce defendeu</span>
            <div class="timeline" style="margin-top: 14px;">
              ${clubsPlayed.length ? clubsPlayed.map((club) => `<div class="timeline-item">${club}</div>`).join("") : `<div class="timeline-item">Nenhuma temporada completa registrada.</div>`}
            </div>
          </div>
          <div class="display-panel">
            <span class="section-label">Titulos conquistados</span>
            <div class="timeline" style="margin-top: 14px;">
              ${allTrophies.length ? allTrophies.map((trophy) => `<div class="timeline-item">${trophy}</div>`).join("") : `<div class="timeline-item">Nenhum titulo levantado nesta carreira.</div>`}
            </div>
          </div>
        </div>
        ${peakSeason ? `
        <div class="display-panel">
          <span class="section-label">Temporada de destaque</span>
          <p style="margin-top: 10px;">${peakSeason.year} pelo ${peakSeason.club}: ${peakSeason.goals} gols e ${peakSeason.assists} assistencias em ${peakSeason.matches} jogos.</p>
        </div>
        ` : ""}
        <div class="display-panel section-band">
          <span class="section-label">Temporada a temporada</span>
          <div style="margin-top: 14px;">
            ${renderCareerHistoryTable(game)}
          </div>
        </div>
        <div class="button-row">
          <button id="legacy-menu-btn" type="button">Ver minhas carreiras</button>
          <button id="legacy-delete-btn" class="secondary" type="button">Apagar esta carreira</button>
        </div>
      </div>
    </div>
  `;

  queueMicrotask(() => {
    document.getElementById("legacy-menu-btn")?.addEventListener("click", goToSlotMenu);
    document.getElementById("legacy-delete-btn")?.addEventListener("click", () => {
      if (confirm("Apagar esta carreira encerrada? Essa acao nao pode ser desfeita.") && state.activeSlot) {
        deleteSlot(state.activeSlot);
      }
    });
  });

  return container;
}

function renderSocialTab(game) {
  const panel = document.createElement("div");
  panel.className = "fixture-split";
  panel.innerHTML = `
    <div class="display-panel panel-highlight">
      <span class="section-label">Rede social</span>
      <div class="button-row" style="margin-top: 14px;">
        <button id="react-support" class="secondary" type="button">Reagir apoiando</button>
        <button id="react-neutral" class="secondary" type="button">Reagir com cautela</button>
        <button id="react-taunt" class="warn" type="button">Provocar</button>
      </div>
      <div class="timeline" style="margin-top: 16px;">
        ${game.socialFeed.slice(0, 8).map((post) => `
          <div class="feed-post">
            <strong>${post.author}</strong>
            <p>${post.text}</p>
            <span class="pill">Impacto: ${post.impact}</span>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="display-panel">
      <span class="section-label">Personalidade publica</span>
      <p style="margin-top: 10px;">${game.player.happiness >= 75 ? "Sua imagem e muito positiva." : game.player.happiness >= 55 ? "Voce esta construindo uma boa relacao com publico e imprensa." : "Sua imagem publica precisa de mais cuidado."}</p>
      <div class="button-row" style="margin-top: 18px;">
        <button id="reset-btn" class="secondary" type="button">Reiniciar carreira</button>
      </div>
    </div>
  `;

  queueMicrotask(() => {
    document.getElementById("react-support")?.addEventListener("click", () => reactToPost("apoiar"));
    document.getElementById("react-neutral")?.addEventListener("click", () => reactToPost("neutro"));
    document.getElementById("react-taunt")?.addEventListener("click", () => reactToPost("provocar"));
    document.getElementById("reset-btn")?.addEventListener("click", resetCareer);
  });

  return panel;
}

// =====================================================================
// ROTEAMENTO DE ABAS E RENDER PRINCIPAL: ponto de entrada da aplicacao
// =====================================================================
function renderActiveTab(game) {
  switch (state.tab) {
    case "contrato": return renderContractTab(game);
    case "empresario": return renderAgentTab(game);
    case "tecnico": return renderCoachTab(game);
    case "corpo": return renderBodyTab(game);
    case "clube": return renderClubTab(game);
    case "competicoes": return renderCompetitionsTab();
    case "rede-social": return renderSocialTab(game);
    default: return renderCareerTab(game);
  }
}

function renderDashboard() {
  const game = state.game;
  const wrapper = document.createElement("section");
  wrapper.className = "dashboard-layout";

  const tabs = [
    ["carreira", "Minha carreira"],
    ["contrato", "Contrato"],
    ["empresario", "Empresario"],
    ["tecnico", "Tecnico"],
    ["corpo", "Corpo"],
    ["clube", "Clube"],
    ["competicoes", "Competicões"],
    ["rede-social", "Rede social"]
  ];

  wrapper.innerHTML = `
    <aside class="sidebar">
      <div class="display-panel sidebar-card">
        <div class="club-card-top">
          ${logoMarkup(game.player.club, "club", true)}
          <div>
            <span class="section-label">Seu clube</span>
            <strong>${game.player.club}</strong>
            <span class="small-copy">${game.player.league}</span>
          </div>
        </div>
        <div class="grid two" style="margin-top: 16px;">
          ${metricCard("Overall", game.player.overall)}
          ${metricCard("Idade", game.player.age)}
        </div>
      </div>
      <div class="display-panel sidebar-nav sidebar-card">
        ${tabs.map(([id, label]) => `<button class="nav-button ${state.tab === id ? "active" : ""}" type="button" data-tab="${id}">${label}</button>`).join("")}
      </div>
      <div class="display-panel sidebar-card">
        <button id="switch-career-btn" class="secondary" type="button" style="width: 100%;">Trocar de carreira</button>
        <button id="retire-btn" class="secondary" type="button" style="width: 100%; margin-top: 8px;">Encerrar carreira</button>
      </div>
    </aside>

    <div class="content-stack">
      <div class="display-panel player-stage">
        <div class="player-stage-grid">
          <div class="player-stage-copy">
            <div class="stage-kicker">${game.season} • ${game.player.nationality}</div>
            <div class="stage-name">${game.player.name}</div>
            <div class="stage-subline">${game.player.position} • ${game.player.archetype} • camisa ${game.player.number}. Um painel vivo da sua ascensao no futebol.</div>
            <div class="stage-chip-row">
              <span class="stage-chip">${game.player.foot}</span>
              <span class="stage-chip">${game.player.club}</span>
              <span class="stage-chip">${game.player.league}</span>
            </div>
          </div>
          <div class="player-stage-visual">
            <div class="stage-stat-grid">
              <div class="stage-stat">
                <span class="mini-label">Overall</span>
                <strong>${game.player.overall}</strong>
                <span class="small-copy">nivel atual</span>
              </div>
              <div class="stage-stat">
                <span class="mini-label">G/A</span>
                <strong>${game.player.goals}/${game.player.assists}</strong>
                <span class="small-copy">producao ofensiva</span>
              </div>
              <div class="stage-stat">
                <span class="mini-label">Jogos</span>
                <strong>${game.player.matches}</strong>
                <span class="small-copy">na campanha</span>
              </div>
              <div class="stage-stat">
                <span class="mini-label">Influencia</span>
                <strong>${game.player.influence}</strong>
                <span class="small-copy">peso no elenco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${renderActiveTab(game).outerHTML}
    </div>
  `;

  queueMicrotask(() => {
    document.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => setState({ tab: button.dataset.tab }));
    });
    document.getElementById("switch-career-btn")?.addEventListener("click", () => {
      if (confirm("Voltar para a lista de carreiras? Seu progresso atual continua salvo.")) {
        goToSlotMenu();
      }
    });
    document.getElementById("retire-btn")?.addEventListener("click", () => {
      if (confirm("Encerrar essa carreira agora e pendurar as chuteiras? Voce vera um resumo do seu legado.")) {
        retireCareer();
      }
    });
  });

  return wrapper;
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (!state.game) {
    app.appendChild(renderOnboarding());
  } else if (state.game.retired) {
    app.appendChild(renderLegacyScreen(state.game));
  } else {
    app.appendChild(renderDashboard());
  }

  if (state.transition) {
    const overlay = document.createElement("div");
    overlay.className = "match-transition";
    overlay.innerHTML = `
      <div class="match-transition-card">
        <div class="transition-kicker">${state.transition.kicker}</div>
        <div class="transition-title">${state.transition.title}</div>
        <p class="small-copy" style="margin-top: 12px;">${state.transition.subtitle}</p>
        <div class="transition-bar">
          <div class="transition-bar-fill"></div>
        </div>
      </div>
    `;
      app.appendChild(overlay);
    }

  if (state.game && state.matchFocus) {
    const overlay = document.createElement("div");
    overlay.innerHTML = renderMatchFocusOverlay(state.matchFocus, state.game);
    app.appendChild(overlay.firstElementChild);
  }
}
