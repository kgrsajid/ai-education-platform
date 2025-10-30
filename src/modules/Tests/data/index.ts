export const quizzes = [
  {
    id: 1,
    title: "Frontend Basics",
    category: "Programming",
    description:
      "Check your knowledge of HTML, CSS, and JavaScript fundamentals.",
    questions: [
      {
        title: "Which of the following are JavaScript data types?",
        type: "multiple",
        options: ["Number", "Boolean", "Selector", "Undefined"],
        correct: ["Number", "Boolean", "Undefined"],
      },
      {
        title: "Which HTML tag is used for the largest heading?",
        type: "single",
        options: ["<h1>", "<h3>", "<h5>", "<header>"],
        correct: "<h1>",
      },
      {
        title: "Which CSS property changes the text color?",
        type: "single",
        options: ["font-color", "text-style", "color", "font"],
        correct: "color",
      },
      {
        title: "Which of the following are valid JavaScript frameworks?",
        type: "multiple",
        options: ["React", "Django", "Vue", "Flask"],
        correct: ["React", "Vue"],
      },
    ],
  },
  {
    id: 2,
    title: "Networking Fundamentals",
    category: "IT Infrastructure",
    description:
      "Test your understanding of basic computer networks, TCP/IP, and protocols.",
    questions: [
      {
        title: "Which of the following are layers of the OSI model?",
        type: "multiple",
        options: [
          "Application",
          "Transport",
          "Network",
          "Encryption",
          "Interface",
        ],
        correct: ["Application", "Transport", "Network"],
      },
      {
        title: "Which protocol is used for file transfer?",
        type: "single",
        options: ["HTTP", "FTP", "DNS", "SMTP"],
        correct: "FTP",
      },
      {
        title: "Which of these use TCP?",
        type: "multiple",
        options: ["HTTP", "DNS", "SMTP", "SNMP"],
        correct: ["HTTP", "SMTP"],
      },
      {
        title: "What does IP stand for?",
        type: "single",
        options: [
          "Internet Protocol",
          "Internal Program",
          "Interface Path",
          "Interconnected Process",
        ],
        correct: "Internet Protocol",
      },
    ],
  },
  {
    id: 3,
    title: "English Vocabulary Quiz",
    category: "Language",
    description:
      "Improve your English vocabulary — test synonyms, antonyms, and idioms.",
    questions: [
      {
        title: "Which of the following words are synonyms of 'happy'?",
        type: "multiple",
        options: ["Glad", "Sad", "Joyful", "Angry"],
        correct: ["Glad", "Joyful"],
      },
      {
        title: "What is the opposite of 'ancient'?",
        type: "single",
        options: ["Old", "New", "Historic", "Classic"],
        correct: "New",
      },
      {
        title: "Select the idioms that mean 'to stop trying'.",
        type: "multiple",
        options: [
          "Give up",
          "Break down",
          "Carry on",
          "Throw in the towel",
        ],
        correct: ["Give up", "Throw in the towel"],
      },
      {
        title: "Which word best fits: 'He spoke in a very ____ voice'?",
        type: "single",
        options: ["Loud", "Noisy", "Silent", "Soft"],
        correct: "Soft",
      },
    ],
  },
  {
    id: 4,
    title: "History of the World",
    category: "History",
    description:
      "Explore the key events and figures that shaped human civilization.",
    questions: [
      {
        title: "Which of the following were ancient civilizations?",
        type: "multiple",
        options: ["Egypt", "Rome", "Atlantis", "China"],
        correct: ["Egypt", "Rome", "China"],
      },
      {
        title: "Who was the first President of the United States?",
        type: "single",
        options: [
          "George Washington",
          "Abraham Lincoln",
          "Thomas Jefferson",
          "John Adams",
        ],
        correct: "George Washington",
      },
      {
        title: "Which wars occurred in the 20th century?",
        type: "multiple",
        options: [
          "World War I",
          "World War II",
          "Napoleonic Wars",
          "Cold War",
        ],
        correct: ["World War I", "World War II", "Cold War"],
      },
      {
        title: "In what year did World War II end?",
        type: "single",
        options: ["1939", "1945", "1948", "1950"],
        correct: "1945",
      },
    ],
  },
];
