/*jshint esversion: 6 */ 

const input = document.getElementById("commandInput");
let currentPath = "/MrWindowsD/MrWindowsD.github.io/tree/main";

const currentDate = new Date();
let files = [];
let userNickname = ''; // Переменная для хранения никнейма пользователя

// Функция для запуска анимации загрузки
function startLoadingAnimation() {
  const outputElement = document.getElementById("output");
  

  // Скрываем поле ввода команды
  input.style.visibility = "hidden";
  
  const loadingText = [
    "",
    "Deployed. 200 OK.",
	"",
	"POST / HTTP/2.1",
    "Host: 192.168.0.12",
	"",
    "User-Agent: Go-http-client/1.1",
    "Content-Length: 360",
    "Content-Type: application/x-ww-form-urlencoded",
	"",
    "Date: " + currentDate,
	"",
    "X-Call-Id: fed471ef-0aea-463a-Bef3-716014140024",
    "X-Duration-Seconds: 0.002162",
    "X-Function-Status: 200",
    "X-Start-Time: 1580041451539247092",
	"",
    "Accept-Encoding: gzip",
	"",
    "Connection: close",
    "",
    "",
    "┌─────────────────────────────────────────────────────────────────────────────────────┐",
    "│.##.....##.########..##......##.####.##....##.########...#######..##......##..######.│",
    "│.###...###.##.....##.##..##..##..##..###...##.##.....##.##.....##.##..##..##.##....##│",
	"│.####.####.##.....##.##..##..##..##..####..##.##.....##.##.....##.##..##..##.##......│",
	"│.##.###.##.########..##..##..##..##..##.##.##.##.....##.##.....##.##..##..##..######.│",
	"│.##.....##.##...##...##..##..##..##..##..####.##.....##.##.....##.##..##..##.......##│",
	"│.##.....##.##....##..##..##..##..##..##...###.##.....##.##.....##.##..##..##.##....##│",
	"│.##.....##.##.....##..###..###..####.##....##.########...#######...###..###...######.│",
	"└─────────────────────────────────────────────────────────────────────────────────────┘",
	"^C",
	""
  ];
  let i = 0;

  const interval = setInterval(function() {
    output(loadingText[i], false);
    i++;
    if (i === loadingText.length) {
      clearInterval(interval);
    }
  }, 100);

  // Через 5 секунд останавливаем анимацию
  setTimeout(function() {
    clearInterval(interval);

    // Показываем поле ввода команды
    input.style.visibility = "visible";

    // Очищаем вывод консоли
    outputElement.innerHTML = "Console v0.1" + "<br>";
	
	// Прокручиваем элемент вниз
    outputElement.scrollTop = outputElement.scrollHeight;
    
    // Фокусируемся на поле ввода команды
    input.focus();
  }, 5000);
}


// Запускаем анимацию загрузки при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
  startLoadingAnimation();
});

// Остальной код...
function output(text, update) {
    if (update) {
    const outputElement = document.getElementById("output");
	outputElement.classList.add("loading"); // Добавляем класс "loading"
    outputElement.textContent = text; // Заменяем содержимое на новое сообщение
    // Прокручиваем до конца
    outputElement.scrollTop = outputElement.scrollHeight;
    }
  else{
    const outputElement = document.getElementById("output");
    outputElement.innerHTML += text + "<br>";
    // Прокручиваем до конца
    outputElement.scrollTop = outputElement.scrollHeight;
  }
}

input.addEventListener("keyup", onEnterRelease);
function onEnterRelease(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    const command = input.value;
    executeCommand(command);
    input.value = "";
  }
}


function executeCommand(command) {
	const args = command.split(" ");

  switch (args[0]) {
	case "help":
    case "h":
      output("Available commands:");
      output("pwd - Show current directory");
      output("cd [directory] - Change current directory");
      output("ls - List files in current directory");
      output("cp [file] [destination] - Copy file to destination");
      output("touch [file] - Create a new file");
      output("mkdir [directory] - Create a new directory");
      output("rm [file] - Delete a file");
      output("find [name/format] - Search for files by name or format");
	  output("** ** *** [Game?] - [*************]");
      break;
    case "pwd":
	if (currentPath == "tree&") {
		output("/MrWindowsD/MrWindowsD.github.io/tree/");
		}
	  else if (currentPath == "main&") {
		currentPath = "/MrWindowsD/MrWindowsD.github.io/tree/main/";
        output(currentPath); // Выведет "/MrWindowsD/MrWindowsD.github.io/tree/"
	  }
	  else if (currentPath == "MrWindowsD.github.io&") {
		currentPath = "/MrWindowsD/MrWindowsD.github.io/";
        output(currentPath); // Выведет "/MrWindowsD/MrWindowsD.github.io/"
	  }
	  else if (currentPath == "MrWindowsD&") {
		currentPath = "/MrWindowsD/";
        output(currentPath); // Выведет "/MrWindowsD/"
	  }
      else {
		output("Current directory: " + currentPath);  
	  }
      break;
    case "cd":
  if (args[1] === "..") {
    const splitPath = currentPath.split("/");
    // Удаляем последний каталог
    splitPath.pop();
    // Обновляем текущий путь
    currentPath = splitPath.join("/");
    output (currentPath);
  }
	else if (args[1] === "~/MrWindowsD/MrWindowsD.github.io/tree/main") {
    currentPath = "main&";
    output(currentPath);
  } else if (args[1] === "~/MrWindowsD/MrWindowsD.github.io/") {
    currentPath = "MrWindowsD.github.io&";
    output(currentPath);
  } else if (args[1] === "~/MrWindowsD/") {
    currentPath = "MrWindowsD&";
    output(currentPath);
  } else if (args[1] === "~/MrWindowsD/MrWindowsD.github.io/tree/") {
	currentPath = "tree&";
    output(currentPath);
  } else {
    output("Command not found: " + args[0]);
  }
  break;
    case "ls":
	  output("File list:");
	  // Генерация случайного числа от 2 до 16
	  const numFiles = Math.floor(Math.random() * 15) + 2;
	  // Массив с возможными форматами файлов
	  const fileFormats = ['.png', '.txt', '.word', '.js', '.mp3', '.doc', '.jpeg', '.csv','.css','.html','.fbx','.mp4'];
	  // Генерация случайных файлов
	  for (let i = 0; i < numFiles; i++) {
		// Генерация случайного названия файла
		const fileName = generateRandomFileName(fileFormats);
		files.push(fileName); // Добавляем fileName в массив files
		output(fileName);
	  }
	  // Вывод созданных файлов
	  for (let i = 0; i < files.length; i++) {
		output(files[i]);
	  }
	  break;
    case "cp":
      output("Copying " + args[1] + " to " + args[2] + "...");
	  output("please help me");
      break;
    case "pc":
      if (args[1] === "of" && args[2] === "god") {
        launchGame("Cod 7");
      } else {
        output("Command not found");
      }
      break;
	case "touch":
      if (args.length < 2) {
        output("Please provide a file name");
      } else {
        const fileName = args.slice(1).join(" ");
        if (fileName.trim().length === 0 || fileName.includes(" ")) {
          output("Please specify the file name without spaces");
        } else {
          files.push(fileName);
          output("Created file: " + fileName);
        }
      }
      break;
	 case "mkdir":
	  output("I'm sorry, but I'm lazy. 😜");
      break;
	case "rm":
	  const fileNameToDelete = args.slice(1).join(" ");
	  if (args.length < 2) {
		output("Please provide a file name");
	  } else if (fileNameToDelete.trim().length === 0 || fileNameToDelete.includes(" ")) {
		output("Please specify the file name without spaces");
	  } else {
		const index = files.indexOf(fileNameToDelete);
		if (index !== -1) {
		  files.splice(index, 1);
		  output("Deleted file: " + fileNameToDelete);
		} else {
		  output("File not found: " + fileNameToDelete);
		}
	  }
	  break;
	case "find":
      if (args.length < 2) {
        output("Please provide a file name or format to search");
      } else {
        const searchTerm = args.slice(1).join(" ");
        const foundFiles = searchFiles(searchTerm);
        if (foundFiles.length === 0) {
          output("No files found");
        } else {
          output("Found files:");
          for (let i = 0; i < foundFiles.length; i++) {
            output(foundFiles[i]);
          }
        }
      }
      break;
    case "exit":
      reloadPage();
      break;
    default:
      output("Command not found: " + args[0]);
	  output("Use 'help' command for available commands");
      break;
  }
}

// Game PC Of God
//Star Game
function launchGame(game) {
  output("Launching " + game + "...", false);
  const animation = [
    "Loading core Game: [11%]  |",
    "Loading core Game: [11%]  /",
    "Loading core Game: [24%]  —",
    "Loading core Game: [25%]  \\ ",
    "Loading core Game: [28%]  |",
    "Loading core Game: [28%]  /",
    "Loading core Game: [36%]  —",
    "Loading core Game: [51%]  \\ ",
    "Loading core Game: [52%]  |",
    "Loading core Game: [52%]  /",
    "Loading core Game: [52%]  —",
    "Loading core Game: [54%]  \\ ",
    "Loading core Game: [54%]  |",
    "Loading core Game: [63%]  /",
    "Loading core Game: [63%]  —",
    "Loading core Game: [87%]  \\ ",
    "Loading core Game: [99%]  |",
    "Loading core Game: [99%]  /",
    "Loading core Game: [99%]  —",
    "Loading core Game: [99%]  \\ ",
    "Loading core Game: Install.",
    "Loading core Game: Install..",
    "Loading core Game: Install...",
    "Loading Game: 0% [=>]",
    "Loading Game: 24% [===>]",
    "Loading Game: 25% [====>]",
    "Loading Game: 47% [=======>]",
    "Loading Game: 58% [=========>]",
    "Loading Game: 69% [===========>]",
    "Loading Game: 81% [===============>]",
    "Loading Game: 100% [==================>]"
  ];

function startAnimation() {
	input.removeEventListener("keyup", onEnterRelease); // Отвязываем первоначальный обработчик
	let i = 0;
	const interval = setInterval(function() {
		 output(animation[i], true);
		 i++;
		 if (i === animation.length) {
		clearInterval(interval);
		requestNickname();
		 }
	}, 250);
}
  
  function onUserRespond(event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    userNickname = input.value.trim(); // Считываем имя
    if (userNickname) { // Если имя не пустое...
      input.value = ''; // Очистить поле ввода
      input.removeEventListener('keyup', onUserRespond); // Отвязываем обработчик
      startGame(userNickname); // Поехали в игру!
      // Если все еще не работает, проверить есть ли сторонние скрипты или эл-ты, которые 
      // обрабатывают те же события ('Enter' или keyCode === 13)
    } else {
      output('Not a valid name', true);
    }
  }
}
  
  function requestNickname() {
	  output('User Name:', true); // Здороваемся и спрашиваем имя
	  input.addEventListener('keyup', onUserRespond); // Теперь вешаем обработчик
}

function setPcChanAvatar() {
  const pcChanAvatar = 'https://i.postimg.cc/jqz2gD5F/PC_Love.png'; // Ссылка на картинку
  const pcChanAvatarSyely = 'width: 200px;height: auto;margin-right: 5px auto;border: 5px inset rgba(238, 192, 118, 0.7);border-radius: 25px 25px 25px 0px;box-shadow: rgba(0, 0, 0, 0.6) 10px 6px 6px 0px;padding-left: 10px;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;margin-left: 400px;';
  const avatarElement = document.getElementById('avatar'); // Находим элемент с id "avatar"
  avatarElement.src = pcChanAvatar; // Устанавливаем ссылку на картинку
  avatarElement.style = pcChanAvatarSyely; // Устанавливаем ссылку на картинку
}

// Game
  function startGame(nickname) {
	  output("Start...", true);
	  output("Game launched!", true);
	  output('Эй...Ты кто? Судя по логам...ты... ' + nickname + ', какое убожество...', true);
	  setTimeout(function () {
		// Тут начинается основная игра, код игры будет следовать...
		// Сценарий диалога
	  const dialog = {
	  "question1": {
		"question": "Ладно, я ПК тян, можно Харука, так и зачем ты меня вызвал?",
		"answers": {
		  "1": "Я избранный",
		  "2": "Тебе какое дело?",
		  "3": "А почему бы и нет?",
		  "4": "Без понятие, ты мне не нужна, Харука... Что за имя такое, дурацкое?"
		},
		"next": "platform" // Добавляем значение next для шага question 1
	  },
	  "platform": {
		"question": "Так...Ладно, будем собирать свой ПК Богов, почему бы и нет? На какой платформе хочешь делать ПК? Intel или AMD?",
		"answers": {
		  "1": "Intel LGA 1700",
		  "2": "AMD AM5",
		  "3": "Intel 4677",
		  "4": "AMD TR4",
		  "5": "AMD AM4",
		  "6": "Intel LGA 1151",
		  "7": "Intel LGA 2011-3",
		  "8": "Intel LGA 2066"
		},
		"next": "cpu" // Добавляем значение next для шага platform
	  },
	  "cpu": {
		"question": "Теперь нужно выбрать CPU:",
		"answers": {
		  "1": "Intel LGA 1700 Core i7-14700K",
		  "2": "Intel LGA 1700 Core i9-13900F",
		  "3": "Intel LGA 1700 i9-14900K",
		  "4": "AMD AM5 Ryzen 9 7950X",
		  "5": "AMD AM5 Ryzen 7 7800X3D",
		  "6": "AMD AM5 Ryzen 9 7950X3D",
		  "7": "Intel 4677 Xeon Gold 5420+",
		  "8": "AMD TR4 Threadripper 1920X",
		  "9": "AMD TR4 EPYC 7742",
		  "10": "AMD AM4 Ryzen 7 5800X",
		  "11": "AMD AM4 Ryzen 9 5950X",
		  "12": "Intel LGA 1151 Xeon E3-1270 v6",
		  "13": "Intel LGA 2011-3 Xeon e3-2696 v3",
		  "14": "Intel LGA 2066 i9-9940X"
		},
		"next": "motherboard" // Добавляем значение next для шага cpu
	  },
	  "motherboard": {
		"question": "Список маленький да? Может потом добавлю, сейчас лень. Ну а мать какая будет?",
		"answers": {
		  "1": "Intel LGA 1700 MSI PRO Z690-A DDR4",
		  "2": "Intel LGA 1700 MSI MAG Z690 TOMAHAWK WIFI DDR4",
		  "3": "Intel LGA 1700 Gigabyte Z790 AORUS ELITE AX DDR5",
		  "4": "Intel LGA 1700 MSI MAG Z790 TOMAHAWK WIFI (MS-7D91 DDR5",
		  "5": "AMD AM5 MAG B650 TOMAHAWK WIFI (MS-7D75)DDR5",
		  "6": "AMD AM5 MAG TUF GAMING B650-PLUS WIFI DDR5",
		  "7": "AMD AM5 MSI MPG X670E CARBON WIFI DDR5",
		  "8": "AMD AM5 GIGABYTE X670E AORUS XTREME DDR5",
		  "9": "Intel 4677 ASRock W790 WS ECC DDR5",
		  "10": "AMD TR4 ASRock X399M Taichi DDR4",
		  "11": "AMD TR4 ASUS X399-A DDR4",
		  "12": "AMD AM4 Asus PRIME B550-PLUS DDR4",
		  "13": "AMD AM4 MSI MPG B550 GAMING PLUS (MS-7C56) DDR4",
		  "14": "AMD AM4 ДРУГАЯ",
		  "15": "Intel LGA 1151 ASUS PRIME H310M-K R2.0 DDR4",
		  "16": "Intel LGA 1151 Asus PRIME Z370-P DDR4",
		  "17": "Intel LGA 1151 ASRock Z170 DDR4",
		  "18": "Intel LGA 2011-3 ASUS X99-A II DDR4",
		  "19": "Intel LGA 2011-3 ASUS X99-E-10G WS DDR4",
		  "20": "Intel LGA 2011-3 ASUS X99-M WS DDR4",
		  "21": "Intel LGA 2011-3 ДРУГАЯ",
		  "22": "Intel LGA 2066 ASUS PRIME X299-A II DDR4",
		  "23": "Intel LGA 2066 ROG Rampage VI Apex X299 DDR4",
		  "24": "Intel LGA 2066 TUF X299 Mark 1 DDR4"
		},
		"next": "gpu" // Добавляем значение next для шага motherboard
	  },
	  "gpu": {
		"question": "Теперь нужно подобрать графику, смотри внимательно на выбор:",
		"answers": {
		  "1": "4090 Rog Strix 24GB",
		  "2": "RX 7900 XTX 24GB",
		  "3": "ASUS GeForce RTX 4070 Ti TUF Gaming",
		  "4": "XFX AMD Radeon RX 6700 XT Speedster MERC",
		  "5": "RTX A5000",
		  "6": "RTX 4070 FE 12GB + RTX A2000 12GB",
		  "7": "Radeon RX 6800 XT + Radeon Pro VII",
		  "8": "Radeon PRO W7800",
		  "9": "RTX 4070 FE 12GB",
		  "10": "Radeon RX 6800 XT"
		},
		"next": "bp" // Добавляем значение next для шага gpu
	  },
	  "bp": {
		"question": "Тут ситуация сложная, нужно выбрать БП, вот только это не просто... Вот короче список, надеюсь наш ПК не сгорит 😇",
		"answers": {
		  "1": "be quiet! System Power 9 700W",
		  "2": "Super Flower Leadex II Gold 750W",
		  "3": "MONTECH GAMMA II 750 W",
		  "4": "Chieftec PowerPlay 850W",
		  "5": "Deepcool PQ850M 850W",
		  "6": "Phanteks AMP 850W",
		  "7": "MONTECH CENTURY 850W",
		  "8": "Super Flower Leadex II Gold 750W",
		  "9": "MSI MEG Ai1000P PCIe 5 1000W",
		  "10": "Thermaltake Toughpower GF3 1350W"
		},
		"next": "ssd" // Добавляем значение next для шага bp
	  },
	  "ssd": {
		"question": "Дальше скучно (っ- ‸ - ς)... Ну давай, хоть покажу список SSD:",
		"answers": {
		  "1": "WD Black SN850X NVMe PCIe M.2 2TB",
		  "2": "Samsung 980 Pro NVMe PCIe M.2 1TB",
		  "3": "Samsung 970 Evo Plus NVMe PCIe M.2 500GB",
		  "4": "Adata XPG SX8200 Pro NVMe PCIe M.2 512GB",
		  "5": "Crucial P1 3D NVMe PCIe M.2 1TB",
		  "6": "Samsung 860 Evo 2TB",
		  "7": "Crucial MX500 1TB",
		  "8": "Samsung 970 Evo NVMe PCIe M.2 500GB",
		  "9": "Samsung 860 Evo 500GB",
		  "10": "SanDisk Extreme II 240GB",
		  "11": "Выберу несколько"
		},
		"next": "hdd" // Добавляем значение next для шага sdd
	  },
	  "hdd": {
		"question": "Кто-то ещё пользуется ими? (・ω・｀ ) Если только файлопомойка:",
		"answers": {
		  "1": "Seagate Barracuda 1TB (2016)",
		  "2": "WD Black 1TB (2013)",
		  "3": "Seagate Barracuda 4TB (2016)",
		  "4": "Toshiba DT01ACA300 3TB",
		  "5": "Samsung Spinpoint F3 1TB",
		  "6": "Нафиг нужен"
		},
		"next": "ram" // Добавляем значение next для шага hdd
	  },
	  "ram": {
		"question": "Ой, совсем забыла... RAM же ещё нужна... (｡·  v  ·｡) А какая нам нужна, DRR4 или DDR5? Ты и вспоминай 😘",
		"answers": {
		  "1": "ECC NEMIX 32GB DDR4-3200 (2x16)",
		  "2": "ECC SAMSUNG DDR4-2666 (2x32)",
		  "3": "DRR5 Kingston Fury Beast 5600 CL40 (4x32)",
		  "4": "DDR5 G.SKILL Ripjaws S5 CL36 5600 (4x32)",
		  "5": "DRR5 G.SKILL Trident Z5 RGB CL30 5600 (2x32)",
		  "6": "DRR5 Kingston Fury Beast Black AMD CL36 5600 (2x16)",
		  "7": "DDR4 G.SKILL Trident Z 3200 C14 (4x16)",
		  "8": "DDR4 G.SKILL Flare X3200 C14 (4x8)",
		  "9": "DDR4 ADATA XPG Lancer Blade RGB CL30 (4x8)",
		  "10": "DDR4 G.SKILL RIPJAWS V CL16 3600МГц (4x8)",
		  "11": "DDR4 2666 Sumsung CL19 (8x4)",
		  "12": "DDR4 ADATA XPG GAMMIX D35 CL16 (4x32)"
		},
		"next": null // Добавляем значение next для шага hdd
	  },
	};

	  
	  let results = { "question1": "", "platform": "", "cpu": "", "motherboard": "", "gpu": "", "bp": "", "ssd": "", "hdd": "", "ram": ""}; // Результаты ответов

	function askQuestion(step) {
		const currentStep = dialog[step];
		
		if (step === "cpu") {
		const platform = results.platform;
		const filteredAnswers = {};
		for (const key in currentStep.answers) {
		  const answer = currentStep.answers[key];
		  if (answer.toLowerCase().includes(platform.toLowerCase())) {
			filteredAnswers[key] = answer;
		  }
		}
		currentStep.answers = filteredAnswers;
	  }
	  
	  if (step === "motherboard") {
		const platform = results.platform;
		const filteredAnswers = {};
		for (const key in currentStep.answers) {
		  const answer = currentStep.answers[key];
		  if (answer.toLowerCase().includes(platform.toLowerCase())) {
			filteredAnswers[key] = answer;
		  }
		}
		currentStep.answers = filteredAnswers;
	  }
		
		let question = currentStep.question;
		let answerText = "";
		for (const key in currentStep.answers) {
		  answerText += "<br>" + key + ". " + currentStep.answers[key];
		}
		setPcChanAvatar(); // Устанавливаем аватарку
		output(question, true); // Вопрос
		output(answerText, false); // Выводим список ответов
		
	// Вешаем событие на input для ввода ответа
    input.addEventListener('keyup', function onAnswer(event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        const userAnswer = input.value.trim();
        input.value = ''; // Очистить поле ввода
        
        if (userAnswer in currentStep.answers) {
            results[step] = currentStep.answers[userAnswer]; // Сохраняем выбранный ответ
            input.removeEventListener('keyup', onAnswer); // Отвязываем событие

            const nextStep = dialog[step].next;
            if (nextStep !== null) {
                if ((userAnswer === '4' || userAnswer === '2') && step === 'question1') { // Проверяем ответ на первый вопрос
                    finishGame(results);
                } else {
                    askQuestion(nextStep);
                }
            } else {
                finishGame(results);
            }
        } else {
            output('Выбери вариант из списка. Сам вспоминай какие они были ( ｡ •̀ ᴖ •́ ｡)', true);
        }
      }
    });
  }
  
  function getResult(choices) {
  let result = 'наш ПК Богов имеет такую конфигурацию:<br>';
  let components = [];

  if (choices.platform !== '') {
    components.push('База: ' + choices.platform);
  }
  if (choices.cpu !== "") {
    components.push("Камень: " + choices.cpu);
  }
  if (choices.motherboard !== "") {
    components.push("Материнка, мать не трогай: " + choices.motherboard);
  }
  if (choices.ram !== "") {
    components.push("Оператива: " + choices.ram);
  }
  if (choices.gpu !== "") {
    components.push("Графика: " + choices.gpu);
  }
  if (choices.ssd !== "") {
    components.push("SSD: " + choices.ssd);
  }
  if (choices.hdd !== "") {
    components.push("Винт: " + choices.hdd);
  }
  if (choices.bp !== "") {
    components.push("БП: " + choices.bp);
  }

  if (components.length > 0) {
    result += components.join('<br>');
  } else {
    result += " ничего не выбрано.";
  }

  if (
    (choices.platform === "Intel LGA 1700" || choices.platform === "AMD AM5") &&
    (choices.cpu === "Intel LGA 1700 Core i7-14700K" || choices.cpu === "AMD AM5 Ryzen 7 7800X3D" || choices.cpu === "AMD AM5 Ryzen 9 7950X") &&
    (choices.gpu === "4090 Rog Strix 24GB" || choices.gpu === "RX 7900 XTX 24GB" || choices.gpu === "ASUS GeForce RTX 4070 Ti TUF Gaming" || choices.gpu === "XFX AMD Radeon RX 6700 XT Speedster MERC")
  ) {
    result += "<br>" + " Такой ПК отлично подходит для игр. Он имеет отличную производительнось на ядро и супер производительную графику. Если ты подобрал удачную ОЗУ, тогда это будет очень быстрый игровой ПК Богов. И помни, хороший игровой ПК — хороший только тогда, когда у него минимальные задержки 🎮🔥";
  } else if (
    (choices.platform === "Intel 4677" || choices.platform === "Intel LGA 1700" || choices.platform === "AMD AM5" || choices.platform === "AMD TR4") &&
    (choices.cpu === "Intel 4677 Xeon Gold 5420+" || choices.cpu === "Intel LGA 1700 Core i9-13900F" || choices.cpu === "AMD TR4 EPYC 7742" || choices.cpu === "AMD AM5 Ryzen 9 7950X3D") &&
    (choices.gpu === "Radeon RX 6800 XT" || choices.gpu === "Radeon PRO W7800" || choices.gpu === "Radeon RX 6800 XT + Radeon Pro VII" || choices.gpu === "RTX 4070 FE 12GB + RTX A2000 12GB" || choices.gpu === "RTX A5000") &&
	(choices.ram === "ECC NEMIX 32GB DDR4-3200 (2x16)" || choices.ram === "ECC SAMSUNG DDR4-2666 (2x32)" || choices.ram === "DRR5 Kingston Fury Beast 5600 CL40 (4x32)" || choices.ram === "DDR5 G.SKILL Ripjaws S5 CL36 5600 (4x32)" || choices.ram === "DRR5 G.SKILL Trident Z5 RGB CL30 5600 (2x32)")
  ) {
    result += "<br>" + " Ооо, вот это я понимаю, да мы знатоки? ^^ Этот ПК Богов настоящая рабочая станция и отлично себя покажет в работе с 3D/2D графикой, монтажём, рендером, симуляциями и т.д. А ещё тут можно собраться ПК Богов с ECC памятью или AVX-512 инструкцями, изучи списочек комплектующих 🖥️ ⚡💀";
  } else if (
    (choices.platform === "Intel LGA 1151" || choices.platform === "Intel LGA 2011-3" || choices.platform === "Intel LGA 2066" || choices.platform === "AMD AM4" || choices.platform === "AMD TR4" || choices.platform === "AMD TR4") &&
    (choices.cpu === "Intel LGA 1151 Xeon E3-1270 v6" || choices.cpu === "Intel LGA 2011-3 Xeon e3-2696 v3" || choices.cpu === "Intel LGA 2066 i9-9940X" || choices.cpu === "AMD TR4 Threadripper 1920X" || choices.cpu === "AMD AM4 Ryzen 9 5950X") &&
    (choices.gpu === "4090 Rog Strix 24GB" || choices.gpu === "RX 7900 XTX 24GB" || choices.gpu === "ASUS GeForce RTX 4070 Ti TUF Gaming" || choices.gpu === "XFX AMD Radeon RX 6700 XT Speedster MERC" || choices.gpu === "RTX 4070 FE 12GB + RTX A2000 12GB" || choices.gpu === "Radeon RX 6800 XT + Radeon Pro VII")
  ) {
    result += "<br>" + " Ну ты даёшь, у тебя получился унивирсальный ПК Богов. Если ты правильно ОЗУ подобрал конечно 😏 Такой ПК отлично подойдёт для разных задач, будь то игры или профессиональная работа с рендром, графикой и т.п. Я сама такой ПК 💖🔥😈";
  } else {
    result += "<br>" + " Хм... ( •̀ - • ). Либо ты сделал какой-то особый ПК, которого у меня нету в списках, либо ты сделал что-то не рабочие. Проверь правильно ли подобрана ОЗУ 🙃. Если всё ок, то в будущем добавлю такой ПК Богов, после своих проверок 😌🕶";
  }

  return result;
}

  
  function finishGame(choices) {
  if (choices.question1 === 'Без понятие, ты мне не нужна, Харука... Что за имя такое, дурацкое?' || choices.question1 === 'Тебе какое дело?') {
    const summary = nickname + ", ну... как скажешь, пока неудачник 😝";
    output("", true);
    output(summary, false);
	// Удаление HTML
    setTimeout(function() {
	  document.querySelector('#console').innerHTML = "";
	  setTimeout(function() {
		document.querySelector('#avatar').src = "";
		setTimeout(function() {
		  document.querySelector('head').innerHTML = "";
		  setTimeout(function() {
			document.querySelector('body').innerHTML = "";
			setTimeout(function() {
			  document.documentElement.innerHTML = "";
			}, 5000);
		  }, 6000);
		}, 5000);
	  }, 4000);
	}, 3000);
  } else {
	input.removeEventListener("keyup", onEnterRelease); 
    const info = "<br><br>" + "Если хочешь собрать например унивирсальный ПК Бгов или для профи, тогда можешь попробовать ещё раз";
    const summary = nickname + "! Смотри, смертный, " + getResult(choices);
    output("", true);
    output(summary, false);
    output(info, false);

    // Запрашиваем у пользователя, хочет ли он начать игру заново
    output("Restart? (Yes/No)", false);
	input.addEventListener('keyup', function restart(event) {
	  if (event.key === 'Enter' || event.keyCode === 13) {
		const userAnswer = input.value.trim().toLowerCase();
		input.value = '';

		if (userAnswer.includes('yes')) {
		  input.removeEventListener('keyup', restart);
		  input.removeEventListener("keyup", onEnterRelease);
		  startGame(nickname); // Запускаем игру заново
		} else if (userAnswer.includes('no')) {
		  input.removeEventListener('keyup', restart); // Отвязываем событие
		  reloadPage();
		} else {
		  output('There is no such command. "Yes" or "No":', false);
        }
      }
    });
  }
}

  // Начнем диалог с первым вопросом
  askQuestion("question1");
	  
  }, 5500);
}
  input.addEventListener("keyup", onEnterRelease);
  startAnimation();
}

// Функции --->
function reloadPage() {
  location.reload();
}

function searchFiles(searchTerm) {
  const foundFiles = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].includes(searchTerm) || files[i].endsWith(searchTerm)) {
      foundFiles.push(files[i]);
    }
  }
  return foundFiles;
}

function generateRandomFileName(fileFormats) {
  // Рандомное слово или словосочетание
  const words = ["put", "god_job", "awesome", "random", "code", "creative", "cool", "amazing", "funny", "fantastic", "pineapple","Marmalade","Piglet","Wallet","Caramel","Oscar","Rainbow","Waterfall","Macaroni","Miracle","Coral","Fairy","Galaxy","Diamond","Pink","Chocolate","Bicycle","Smile","Pajamas","Air","Raspberry","Coconut","Carousel","Dragon","Moon","Cherry","Mint","Amethyst","Rainbow","Sparkle","Ice cream","Brownie","Jazz","Alpaca","Candy","Fairy","Starfall","Coffee","Princess","Dainty", 'pc_of_god'];
  // Выбираем случайное слово или словосочетание
  const randomWord = words[Math.floor(Math.random() * words.length)];
  // Выбираем случайный формат файла
  const randomFormat = fileFormats[Math.floor(Math.random() * fileFormats.length)];
  // Соединяем слово и формат, чтобы получить название файла
  const fileName = randomWord + randomFormat;
  return fileName;
}