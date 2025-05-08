const questions = [
    { question: "Waarom ligt hier een regenboog pad?", options: ["Het Regenboog pad benadrukt dat iedereen het hele jaar door zichzelf moet kunnen zijn.", "Omdat Groningen de LGBTQ gemeenschap accepteren.", "Het ziet er leuk uit."], answer: "Het Regenboog pad benadrukt dat iedereen het hele jaar door zichzelf moet kunnen zijn." },
    { question: "Wanneer is het pride month?", options: ["Januari", "Oktober", "Juni"], answer: "Juni" },
    { question: "In welk attractiepark bevindt zich een attractie die dezelfde naam heeft als de coffee-shop?", options: ["Efteling", "Walibi", "Duinrell"], answer: "Efteling" },
    { question: "Hoe oud moet je zijn om bij deze coffeeshop te werken?", options: ["21", "16", "18"], answer: "18" },
    { question: "Hoeveel McDonald’s in Groningen Stad?", options: ["3", "4", "2"], answer: "4" },
    { question: "Welke McDonald’s was als eerste in Groningen?", options: ["Westerhaven", "Sontplein", "Herestraat"], answer: "Westerhaven" },
    { question: "Hoe hoog is de Martinitoren?", options: ["90 Meter", "97 Meter", "99 Meter"], answer: "97 Meter" },
    { question: "Hoeveel jaar bestaat de Martinitoren?", options: ["912", "543", "302"], answer: "543" },
    { question: "Hoe lang bestaat de Rijksuniversiteit Groningen al?", options: ["401 Jaar", "405 Jaar", "411 Jaar"], answer: "411 Jaar" },
    { question: "Welke plek staat de Rijksuniversiteit Groningen in de ranking van alle universiteiten over de HELE wereld?", options: ["Top 50", "Top 100", "Top 10"], answer: "Top 100" },
    { question: "Op welke dagen is er markt op de Vismarkt en A-Kerkhof?", options: ["Dinsdag, Vrijdag en Zaterdag", "Dinsdag, Donderdag en Zondag", "Maandag, Woensdag en Zaterdag"], answer: "Dinsdag, Vrijdag en Zaterdag" },
    { question: "Wat verkopen mensen voornamelijk op de vismarkt?", options: ["groente", "Kaas", "Vis"], answer: "Vis" },
    { question: "Wat is BlockHouse voor plek?", options: ["Het is een plek waar je in de avond lekker wat kan drinken.", "Een plek waar je studios kan huren om in te wonen.", "Een plek waar je feestjes kan geven voor een laag tarief."], answer: "Een plek waar je studios kan huren om in te wonen." },
    { question: "Kun je hier wonen?", options: ["Ja", "Nee"], answer: "Ja" },
    { question: "Sinds wanneer bestaat de Koninklijke Groninger Roeivereniging De Hunze?", options: ["2010", "1956", "1886"], answer: "1886" },
    { question: "Wie is de koning?", options: ["Koen van Heest", "Willem Alexander", "Rick Pieter Pirius Bootsma"], answer: "Willem Alexander" },
    { question: "Welke opleiding zit NIET op deze Noorderpoort locatie?", options: ["Metaalbewerking", "Software Developer", "ICT", "Elektromonteur"], answer: "Elektromonteur" },
    { question: "Welke huisnummer heeft deze school?", options: ["4", "2", "3"], answer: "3" }
  ];
  
  function shuffleQuestionGroups(questions) {
    let groupedQuestions = [];
    for (let i = 0; i < questions.length; i += 2) {
      groupedQuestions.push(questions.slice(i, i + 2));
    }
    let selectedQuestions = groupedQuestions.map(group => {
      const randomIndex = Math.floor(Math.random() * group.length);
      return group[randomIndex];
    });
    return selectedQuestions;
  }
  
  const shuffledQuestions = shuffleQuestionGroups(questions);
  
  const board = document.querySelector(".grid");
  const template = document.getElementById("bingo-cell-template");
  const modal = document.getElementById("modal");
  const modalQuestion = document.getElementById("modal-question");
  const modalOptions = document.getElementById("modal-options");
  
  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  
  let score = 0;
  
  function openModal(questionData, cell, span) {
    modalQuestion.textContent = questionData.question;
    modalOptions.innerHTML = '';
    questionData.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = "block w-full bg-groningenGray hover:bg-groningenGreen text-black px-4 py-2 rounded";
      btn.textContent = opt;
      btn.onclick = () => {
        if (opt === questionData.answer) {
          cell.classList.add("clicked");
          span.classList.add("line-through");
          score++;
        } else {
            cell.classList.add("border", "border-red-500");
          alert("Helaas, fout antwoord!");
        }
        cell.classList.add("locked");
        closeModal();
      };
      modalOptions.appendChild(btn);
    });
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
  const locations = [
    "Regenboogpad",
    "Vliegende Hollander",
    "McDonald's",
    "Martini Toren",
    "Offerhauszaal",
    "Albert Heijn",
    "BlockHouse",
    "Roeivereniging",
    "Noorderpoort School"
  ];
  
  shuffledQuestions.forEach((item, index) => {
    const clone = template.content.cloneNode(true);
    const cell = clone.querySelector("div");
    const span = clone.querySelector("span");
    const locationNameDiv = clone.querySelector(".location-name");

    locationNameDiv.textContent = locations[index];
  
    span.textContent = item.question;
  
    cell.addEventListener("click", () => {
      if (!cell.classList.contains("locked")) {
        if (item.question === "Gratis vakje") {
          cell.classList.add("clicked");
          span.classList.add("line-through");
          cell.classList.add("locked");
        } else {
          openModal(item, cell, span);
        }
      }
    });
    board.appendChild(clone);
  });
  
  var map = L.map('map').setView([53.2194, 6.5665], 13);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
 var route = [
      { coords: [53.21132940010275, 6.564076378409021], name: "Peerd van Ome Loeks" },
      { coords: [53.21275672408392, 6.565712724577141], name: "Regenboogpad" },
      { coords: [53.214792271423434, 6.566798569778303], name: "Vliegende Hollander" },
      { coords: [53.2165418390912, 6.568010656514603], name: "McDonald's" },
      { coords: [53.21947323098946, 6.568178296433717], name: "Martini Toren" },
      { coords: [53.219226673790935, 6.5630273773546435], name: "Offerhauszaal" },
      { coords: [53.21683003748544, 6.563736169006573], name: "Albert Heijn" },
      { coords: [53.21543193771466, 6.560880155585562], name: "BlockHouse" },
      { coords: [53.213646797530004, 6.559816968067904], name: "Roeivereniging" },
      { coords: [53.20319572205277, 6.562495952358814], name: "Noorderpoort School" }
    ];

    var polyline = L.polyline(route.map(p => p.coords), { color: 'blue', weight: 4 }).addTo(map);
    map.fitBounds(polyline.getBounds());

    route.forEach(point => {
      L.marker(point.coords).addTo(map)
        .bindPopup(point.name);
    });
    async function downloadPDF() {
        const name = document.getElementById("playerName").value.trim() || "Naam onbekend";
        const bingoBoard = document.getElementById("bingo-board");
    
        const canvas = await html2canvas(bingoBoard);
        const imgData = canvas.toDataURL("image/png");
    
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
    
        const pageWidth = pdf.internal.pageSize.getWidth();
    
        pdf.setFontSize(22);
        pdf.setTextColor(34, 139, 34);
        pdf.text("Bingo Resultaten", pageWidth / 2, 25, { align: "center" });

        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Naam: ${name}`, pageWidth / 2, 40, { align: "center" });
        pdf.text(`Score: ${score} van ${shuffledQuestions.length}`, pageWidth / 2, 48, { align: "center" });
    
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgY = 60;
    
        pdf.addImage(imgData, "PNG", 20, imgY, imgWidth, imgHeight);
    
        pdf.save(`bingo_${name}.pdf`);
      }
  
  document.getElementById("downloadBtn").addEventListener("click", downloadPDF);
  
      