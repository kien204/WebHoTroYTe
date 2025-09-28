import React, { useState } from "react";
import "primeflex/primeflex.css";
import "./QuizApp.css"; // Assuming a separate CSS file for custom styles

const questionsData = [
  // Simple Present (10 questions)
  {
    topic: "Simple Present",
    question: "She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    answer: "goes",
    explanation:
      "Simple Present uses 'subject + base verb' (add 's' for third person singular subjects like 'she').",
  },
  {
    topic: "Simple Present",
    question: "They ___ in a big city.",
    options: ["live", "lives", "living", "lived"],
    answer: "live",
    explanation:
      "For plural subjects like 'they', Simple Present uses the base verb without 's'.",
  },
  {
    topic: "Simple Present",
    question: "___ you play tennis?",
    options: ["Do", "Does", "Did", "Doing"],
    answer: "Do",
    explanation:
      "'Do' is used for questions in Simple Present with plural subjects or 'you'.",
  },
  {
    topic: "Simple Present",
    question: "He ___ TV every evening.",
    options: ["watch", "watches", "watching", "watched"],
    answer: "watches",
    explanation:
      "Third person singular ('he') takes verb + 's' in Simple Present.",
  },
  {
    topic: "Simple Present",
    question: "We ___ to the park on weekends.",
    options: ["go", "goes", "going", "gone"],
    answer: "go",
    explanation:
      "Plural subjects like 'we' use the base verb in Simple Present.",
  },
  {
    topic: "Simple Present",
    question: "The sun ___ in the east.",
    options: ["rise", "rises", "rising", "rose"],
    answer: "rises",
    explanation:
      "General facts in Simple Present use verb + 's' for singular subjects like 'the sun'.",
  },
  {
    topic: "Simple Present",
    question: "She ___ like spicy food.",
    options: ["don’t", "doesn’t", "didn’t", "not"],
    answer: "doesn’t",
    explanation:
      "Negative form for third person singular uses 'doesn’t + base verb'.",
  },
  {
    topic: "Simple Present",
    question: "They ___ English fluently.",
    options: ["speak", "speaks", "speaking", "spoken"],
    answer: "speak",
    explanation: "Plural subjects use the base verb in Simple Present.",
  },
  {
    topic: "Simple Present",
    question: "___ he work in an office?",
    options: ["Do", "Does", "Did", "Doing"],
    answer: "Does",
    explanation:
      "'Does' is used for questions with third person singular subjects like 'he'.",
  },
  {
    topic: "Simple Present",
    question: "I ___ coffee every morning.",
    options: ["drink", "drinks", "drinking", "drank"],
    answer: "drink",
    explanation:
      "First person singular ('I') uses the base verb in Simple Present.",
  },

  // Simple Past (10 questions)
  {
    topic: "Simple Past",
    question: "She ___ to Paris last year.",
    options: ["go", "goes", "went", "gone"],
    answer: "went",
    explanation:
      "Simple Past uses the past form of the verb (irregular verb 'go' becomes 'went').",
  },
  {
    topic: "Simple Past",
    question: "They ___ a movie yesterday.",
    options: ["watch", "watched", "watching", "watches"],
    answer: "watched",
    explanation: "Regular verbs in Simple Past add '-ed' or use past form.",
  },
  {
    topic: "Simple Past",
    question: "___ you see the concert?",
    options: ["Do", "Does", "Did", "Doing"],
    answer: "Did",
    explanation: "'Did' is used for questions in Simple Past for all subjects.",
  },
  {
    topic: "Simple Past",
    question: "He ___ not come to the party.",
    options: ["do", "does", "did", "done"],
    answer: "did",
    explanation: "Negative Simple Past uses 'did not + base verb'.",
  },
  {
    topic: "Simple Past",
    question: "We ___ in London two years ago.",
    options: ["live", "lived", "living", "lives"],
    answer: "lived",
    explanation: "Regular verbs in Simple Past add '-ed'.",
  },
  {
    topic: "Simple Past",
    question: "She ___ a new phone last month.",
    options: ["buy", "buys", "bought", "buying"],
    answer: "bought",
    explanation:
      "Irregular verbs like 'buy' have unique past forms ('bought').",
  },
  {
    topic: "Simple Past",
    question: "They ___ to the beach last summer.",
    options: ["go", "goes", "went", "gone"],
    answer: "went",
    explanation: "Irregular verb 'go' becomes 'went' in Simple Past.",
  },
  {
    topic: "Simple Past",
    question: "I ___ a book yesterday.",
    options: ["read", "reads", "reading", "readed"],
    answer: "read",
    explanation:
      "Irregular verb 'read' has the past form 'read' (pronounced /red/).",
  },
  {
    topic: "Simple Past",
    question: "He ___ his homework.",
    options: ["do", "does", "did", "doing"],
    answer: "did",
    explanation: "Simple Past uses the past form 'did' for the verb 'do'.",
  },
  {
    topic: "Simple Past",
    question: "We ___ not travel last year.",
    options: ["do", "does", "did", "done"],
    answer: "did",
    explanation: "Negative Simple Past uses 'did not + base verb'.",
  },

  // Simple Future (10 questions)
  {
    topic: "Simple Future",
    question: "She ___ to the party tomorrow.",
    options: ["go", "goes", "will go", "going"],
    answer: "will go",
    explanation: "Simple Future uses 'will + base verb'.",
  },
  {
    topic: "Simple Future",
    question: "They ___ a new car next month.",
    options: ["buy", "buys", "will buy", "buying"],
    answer: "will buy",
    explanation: "Simple Future uses 'will + base verb' for all subjects.",
  },
  {
    topic: "Simple Future",
    question: "___ you join us later?",
    options: ["Do", "Does", "Will", "Did"],
    answer: "Will",
    explanation: "'Will' is used for questions in Simple Future.",
  },
  {
    topic: "Simple Future",
    question: "He ___ not come tomorrow.",
    options: ["will", "won’t", "does", "did"],
    answer: "won’t",
    explanation: "Negative Simple Future uses 'will not (won’t) + base verb'.",
  },
  {
    topic: "Simple Future",
    question: "We ___ travel to Japan next year.",
    options: ["go", "goes", "will go", "going"],
    answer: "will go",
    explanation: "Simple Future uses 'will + base verb'.",
  },
  {
    topic: "Simple Future",
    question: "I ___ finish my homework later.",
    options: ["will", "do", "does", "did"],
    answer: "will",
    explanation: "Simple Future uses 'will + base verb'.",
  },
  {
    topic: "Simple Future",
    question: "She ___ call you tonight.",
    options: ["call", "calls", "will call", "calling"],
    answer: "will call",
    explanation: "Simple Future uses 'will + base verb'.",
  },
  {
    topic: "Simple Future",
    question: "They ___ not attend the meeting.",
    options: ["will", "won’t", "do", "does"],
    answer: "won’t",
    explanation: "Negative Simple Future uses 'will not (won’t) + base verb'.",
  },
  {
    topic: "Simple Future",
    question: "___ he help us tomorrow?",
    options: ["Do", "Does", "Will", "Did"],
    answer: "Will",
    explanation: "'Will' is used for questions in Simple Future.",
  },
  {
    topic: "Simple Future",
    question: "We ___ visit our grandparents soon.",
    options: ["visit", "visits", "will visit", "visiting"],
    answer: "will visit",
    explanation: "Simple Future uses 'will + base verb'.",
  },

  // Present Continuous (10 questions)
  {
    topic: "Present Continuous",
    question: "She ___ a book right now.",
    options: ["read", "reads", "is reading", "reading"],
    answer: "is reading",
    explanation:
      "Present Continuous uses 'is/are/am + verb-ing' for actions happening now.",
  },
  {
    topic: "Present Continuous",
    question: "They ___ football in the park.",
    options: ["play", "plays", "are playing", "played"],
    answer: "are playing",
    explanation: "Plural subjects use 'are + verb-ing' in Present Continuous.",
  },
  {
    topic: "Present Continuous",
    question: "___ you studying now?",
    options: ["Do", "Does", "Are", "Is"],
    answer: "Are",
    explanation:
      "'Are' is used for questions with 'you' in Present Continuous.",
  },
  {
    topic: "Present Continuous",
    question: "He ___ not working today.",
    options: ["is", "are", "is not", "not"],
    answer: "is not",
    explanation: "Negative Present Continuous uses 'is not + verb-ing'.",
  },
  {
    topic: "Present Continuous",
    question: "We ___ a movie at the moment.",
    options: ["watch", "watches", "are watching", "watched"],
    answer: "are watching",
    explanation: "Plural subjects use 'are + verb-ing' in Present Continuous.",
  },
  {
    topic: "Present Continuous",
    question: "I ___ cooking dinner now.",
    options: ["am", "is", "are", "be"],
    answer: "am",
    explanation:
      "First person singular uses 'am + verb-ing' in Present Continuous.",
  },
  {
    topic: "Present Continuous",
    question: "She ___ dancing in the room.",
    options: ["dance", "dances", "is dancing", "danced"],
    answer: "is dancing",
    explanation:
      "Third person singular uses 'is + verb-ing' in Present Continuous.",
  },
  {
    topic: "Present Continuous",
    question: "They ___ not running now.",
    options: ["are", "is", "are not", "not"],
    answer: "are not",
    explanation:
      "Negative Present Continuous for plural subjects uses 'are not + verb-ing'.",
  },
  {
    topic: "Present Continuous",
    question: "___ he sleeping now?",
    options: ["Is", "Are", "Do", "Does"],
    answer: "Is",
    explanation:
      "'Is' is used for questions with third person singular in Present Continuous.",
  },
  {
    topic: "Present Continuous",
    question: "We ___ learning English now.",
    options: ["learn", "learns", "are learning", "learned"],
    answer: "are learning",
    explanation: "Plural subjects use 'are + verb-ing' in Present Continuous.",
  },

  // Present Perfect (10 questions)
  {
    topic: "Present Perfect",
    question: "She ___ just finished her homework.",
    options: ["has", "have", "had", "having"],
    answer: "has",
    explanation:
      "Present Perfect uses 'has/have + past participle' for recent actions.",
  },
  {
    topic: "Present Perfect",
    question: "They ___ never been to Paris.",
    options: ["has", "have", "had", "having"],
    answer: "have",
    explanation:
      "Plural subjects use 'have + past participle' in Present Perfect.",
  },
  {
    topic: "Present Perfect",
    question: "___ you ever eaten sushi?",
    options: ["Has", "Have", "Had", "Did"],
    answer: "Have",
    explanation: "'Have' is used for questions with 'you' in Present Perfect.",
  },
  {
    topic: "Present Perfect",
    question: "He ___ not seen that movie.",
    options: ["has", "have", "has not", "not"],
    answer: "has not",
    explanation:
      "Negative Present Perfect uses 'has not + past participle' for singular subjects.",
  },
  {
    topic: "Present Perfect",
    question: "We ___ just arrived.",
    options: ["has", "have", "had", "having"],
    answer: "have",
    explanation:
      "Plural subjects use 'have + past participle' in Present Perfect.",
  },
  {
    topic: "Present Perfect",
    question: "I ___ lived here for five years.",
    options: ["has", "have", "had", "having"],
    answer: "have",
    explanation:
      "First person singular uses 'have + past participle' in Present Perfect.",
  },
  {
    topic: "Present Perfect",
    question: "She ___ already left.",
    options: ["has", "have", "had", "having"],
    answer: "has",
    explanation:
      "Third person singular uses 'has + past participle' in Present Perfect.",
  },
  {
    topic: "Present Perfect",
    question: "They ___ not finished yet.",
    options: ["has", "have", "have not", "not"],
    answer: "have not",
    explanation:
      "Negative Present Perfect for plural subjects uses 'have not + past participle'.",
  },
  {
    topic: "Present Perfect",
    question: "___ he ever visited London?",
    options: ["Has", "Have", "Had", "Did"],
    answer: "Has",
    explanation:
      "'Has' is used for questions with third person singular in Present Perfect.",
  },
  {
    topic: "Present Perfect",
    question: "We ___ seen that movie twice.",
    options: ["has", "have", "had", "having"],
    answer: "have",
    explanation:
      "Plural subjects use 'have + past participle' in Present Perfect.",
  },

  // Comparisons (10 questions)
  {
    topic: "Comparisons",
    question: "This book is ___ than that one.",
    options: ["good", "better", "best", "more good"],
    answer: "better",
    explanation: "Comparative form of 'good' is 'better'.",
  },
  {
    topic: "Comparisons",
    question: "She is the ___ student in the class.",
    options: ["smart", "smarter", "smartest", "more smart"],
    answer: "smartest",
    explanation: "Superlative form of 'smart' is 'smartest'.",
  },
  {
    topic: "Comparisons",
    question: "This car is ___ than mine.",
    options: ["fast", "faster", "fastest", "more fast"],
    answer: "faster",
    explanation: "Comparative form of 'fast' is 'faster'.",
  },
  {
    topic: "Comparisons",
    question: "He runs ___ than his brother.",
    options: ["quick", "quicker", "quickest", "more quick"],
    answer: "quicker",
    explanation: "Comparative form of 'quick' is 'quicker'.",
  },
  {
    topic: "Comparisons",
    question: "This is the ___ city I’ve ever visited.",
    options: ["beautiful", "more beautiful", "most beautiful", "beautifullest"],
    answer: "most beautiful",
    explanation: "Superlative form of 'beautiful' is 'most beautiful'.",
  },
  {
    topic: "Comparisons",
    question: "Her house is ___ than ours.",
    options: ["big", "bigger", "biggest", "more big"],
    answer: "bigger",
    explanation: "Comparative form of 'big' is 'bigger'.",
  },
  {
    topic: "Comparisons",
    question: "This test is ___ than the last one.",
    options: ["easy", "easier", "easiest", "more easy"],
    answer: "easier",
    explanation: "Comparative form of 'easy' is 'easier'.",
  },
  {
    topic: "Comparisons",
    question: "He is the ___ player on the team.",
    options: ["good", "better", "best", "more good"],
    answer: "best",
    explanation: "Superlative form of 'good' is 'best'.",
  },
  {
    topic: "Comparisons",
    question: "This road is ___ than that one.",
    options: ["wide", "wider", "widest", "more wide"],
    answer: "wider",
    explanation: "Comparative form of 'wide' is 'wider'.",
  },
  {
    topic: "Comparisons",
    question: "She is ___ than her sister.",
    options: ["tall", "taller", "tallest", "more tall"],
    answer: "taller",
    explanation: "Comparative form of 'tall' is 'taller'.",
  },

  // Passive Voice (10 questions)
  {
    topic: "Passive Voice",
    question: "The book ___ by John.",
    options: ["wrote", "was written", "is writing", "writes"],
    answer: "was written",
    explanation:
      "Passive Voice in Simple Past uses 'was/were + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The room ___ every day.",
    options: ["clean", "cleans", "is cleaned", "cleaned"],
    answer: "is cleaned",
    explanation:
      "Passive Voice in Simple Present uses 'is/are + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The cake ___ by her yesterday.",
    options: ["bake", "baked", "was baked", "is baking"],
    answer: "was baked",
    explanation: "Passive Voice in Simple Past uses 'was + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The car ___ now.",
    options: ["is repairing", "is repaired", "repairs", "repaired"],
    answer: "is repaired",
    explanation:
      "Passive Voice in Present Continuous uses 'is/are + being + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The house ___ last year.",
    options: ["build", "built", "was built", "is building"],
    answer: "was built",
    explanation:
      "Passive Voice in Simple Past uses 'was/were + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The letter ___ by Tom.",
    options: ["write", "writes", "was written", "writing"],
    answer: "was written",
    explanation: "Passive Voice in Simple Past uses 'was + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The movie ___ by millions.",
    options: ["watch", "watches", "is watched", "watched"],
    answer: "is watched",
    explanation:
      "Passive Voice in Simple Present uses 'is/are + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The homework ___ by the students.",
    options: ["do", "does", "is done", "did"],
    answer: "is done",
    explanation:
      "Passive Voice in Simple Present uses 'is/are + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The song ___ tomorrow.",
    options: ["sing", "sings", "will be sung", "sung"],
    answer: "will be sung",
    explanation:
      "Passive Voice in Simple Future uses 'will be + past participle'.",
  },
  {
    topic: "Passive Voice",
    question: "The door ___ just opened.",
    options: ["is", "was", "has been", "be"],
    answer: "has been",
    explanation:
      "Passive Voice in Present Perfect uses 'has/have been + past participle'.",
  },

  // Conditionals (10 questions)
  {
    topic: "Conditionals",
    question: "If it ___ , we will stay home.",
    options: ["rain", "rains", "rained", "raining"],
    answer: "rains",
    explanation:
      "First Conditional uses 'if + Simple Present, will + base verb' for real future possibilities.",
  },
  {
    topic: "Conditionals",
    question: "If I ___ you, I would apologize.",
    options: ["am", "was", "were", "be"],
    answer: "were",
    explanation:
      "Second Conditional uses 'if + were, would + base verb' for unreal situations.",
  },
  {
    topic: "Conditionals",
    question: "If he ___ harder, he would have passed.",
    options: ["study", "studies", "studied", "had studied"],
    answer: "had studied",
    explanation:
      "Third Conditional uses 'if + had + past participle, would have + past participle' for past hypotheticals.",
  },
  {
    topic: "Conditionals",
    question: "If you ___ now, you’ll miss the bus.",
    options: ["don’t leave", "didn’t leave", "leave", "left"],
    answer: "don’t leave",
    explanation:
      "First Conditional uses 'if + Simple Present, will + base verb'.",
  },
  {
    topic: "Conditionals",
    question: "If I ___ rich, I would travel the world.",
    options: ["am", "was", "were", "be"],
    answer: "were",
    explanation:
      "Second Conditional uses 'if + were, would + base verb' for unreal situations.",
  },
  {
    topic: "Conditionals",
    question: "If she ___ earlier, she wouldn’t have been late.",
    options: ["leave", "leaves", "left", "had left"],
    answer: "had left",
    explanation:
      "Third Conditional uses 'if + had + past participle, would have + past participle'.",
  },
  {
    topic: "Conditionals",
    question: "If we ___ now, we can catch the train.",
    options: ["hurry", "hurries", "hurried", "had hurried"],
    answer: "hurry",
    explanation:
      "First Conditional uses 'if + Simple Present, will + base verb'.",
  },
  {
    topic: "Conditionals",
    question: "If I ___ you, I wouldn’t do that.",
    options: ["am", "was", "were", "be"],
    answer: "were",
    explanation: "Second Conditional uses 'if + were, would + base verb'.",
  },
  {
    topic: "Conditionals",
    question: "If they ___ the map, they wouldn’t have gotten lost.",
    options: ["take", "takes", "took", "had taken"],
    answer: "had taken",
    explanation:
      "Third Conditional uses 'if + had + past participle, would have + past participle'.",
  },
  {
    topic: "Conditionals",
    question: "If it ___ sunny, we’ll go to the park.",
    options: ["is", "was", "were", "be"],
    answer: "is",
    explanation:
      "First Conditional uses 'if + Simple Present, will + base verb'.",
  },

  // Relative Pronouns (10 questions)
  {
    topic: "Relative Pronouns",
    question: "The man ___ lives next door is a doctor.",
    options: ["who", "which", "that", "whose"],
    answer: "who",
    explanation:
      "'Who' is used for people as the subject of the relative clause.",
  },
  {
    topic: "Relative Pronouns",
    question: "The book ___ I read was amazing.",
    options: ["who", "which", "whose", "whom"],
    answer: "which",
    explanation: "'Which' is used for things or animals in relative clauses.",
  },
  {
    topic: "Relative Pronouns",
    question: "The woman ___ car is red is my friend.",
    options: ["who", "which", "whose", "whom"],
    answer: "whose",
    explanation: "'Whose' is used to show possession for people or things.",
  },
  {
    topic: "Relative Pronouns",
    question: "The dog ___ is barking is mine.",
    options: ["who", "which", "whose", "whom"],
    answer: "which",
    explanation:
      "'Which' is used for animals or things as the subject of the clause.",
  },
  {
    topic: "Relative Pronouns",
    question: "The person ___ I called is busy.",
    options: ["who", "which", "whose", "whom"],
    answer: "whom",
    explanation:
      "'Whom' is used for people as the object of the relative clause.",
  },
  {
    topic: "Relative Pronouns",
    question: "The house ___ we bought is old.",
    options: ["who", "which", "whose", "whom"],
    answer: "which",
    explanation: "'Which' is used for things in relative clauses.",
  },
  {
    topic: "Relative Pronouns",
    question: "The teacher ___ I admire is retiring.",
    options: ["who", "which", "whose", "whom"],
    answer: "whom",
    explanation:
      "'Whom' is used for people as the object of the relative clause.",
  },
  {
    topic: "Relative Pronouns",
    question: "The car ___ engine broke down is new.",
    options: ["who", "which", "whose", "whom"],
    answer: "whose",
    explanation: "'Whose' shows possession for things or people.",
  },
  {
    topic: "Relative Pronouns",
    question: "The boy ___ is playing is my cousin.",
    options: ["who", "which", "whose", "whom"],
    answer: "who",
    explanation:
      "'Who' is used for people as the subject of the relative clause.",
  },
  {
    topic: "Relative Pronouns",
    question: "The movie ___ we watched was great.",
    options: ["who", "which", "whose", "whom"],
    answer: "which",
    explanation: "'Which' is used for things in relative clauses.",
  },

  // Modal Verbs (10 questions)
  {
    topic: "Modal Verbs",
    question: "You ___ wear a helmet when cycling.",
    options: ["can", "must", "may", "might"],
    answer: "must",
    explanation: "'Must' is used for obligation or necessity.",
  },
  {
    topic: "Modal Verbs",
    question: "She ___ speak French fluently.",
    options: ["can", "must", "should", "might"],
    answer: "can",
    explanation: "'Can' is used to express ability.",
  },
  {
    topic: "Modal Verbs",
    question: "You ___ be tired after that long trip.",
    options: ["can", "must", "should", "may"],
    answer: "must",
    explanation: "'Must' can indicate logical conclusion based on evidence.",
  },
  {
    topic: "Modal Verbs",
    question: "___ I borrow your pen?",
    options: ["Can", "Must", "Should", "Will"],
    answer: "Can",
    explanation: "'Can' is used for requesting permission.",
  },
  {
    topic: "Modal Verbs",
    question: "We ___ visit them tomorrow.",
    options: ["can", "must", "may", "should"],
    answer: "may",
    explanation: "'May' expresses possibility or permission.",
  },
  {
    topic: "Modal Verbs",
    question: "You ___ study harder to pass.",
    options: ["can", "must", "should", "may"],
    answer: "should",
    explanation: "'Should' is used for advice or recommendation.",
  },
  {
    topic: "Modal Verbs",
    question: "It ___ rain this afternoon.",
    options: ["can", "must", "should", "might"],
    answer: "might",
    explanation: "'Might' expresses a possibility.",
  },
  {
    topic: "Modal Verbs",
    question: "He ___ not enter without permission.",
    options: ["can", "must", "should", "may"],
    answer: "must",
    explanation: "'Must not' is used for prohibition.",
  },
  {
    topic: "Modal Verbs",
    question: "They ___ be at the airport now.",
    options: ["can", "must", "should", "might"],
    answer: "might",
    explanation: "'Might' indicates a possibility.",
  },
  {
    topic: "Modal Verbs",
    question: "You ___ call her to confirm.",
    options: ["can", "must", "should", "may"],
    answer: "should",
    explanation: "'Should' is used for advice or recommendation.",
  },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffleArray([...questionsData])
  );

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setShuffledQuestions(shuffleArray([...questionsData]));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        English Grammar Quiz
      </h1>
      {currentQuestionIndex < shuffledQuestions.length ? (
        <div className="question-card p-4 bg-white shadow-md rounded-lg">
          {/* <h2 className="text-xl font-semibold mb-2">
            {currentQuestion.topic}
          </h2> */}
          <p className="text-lg mb-4">{currentQuestion.question}</p>
          <div className="p-d-flex p-flex-column">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`p-2 m-1 border rounded-lg text-left ${
                  selectedOption
                    ? option === currentQuestion.answer
                      ? "bg-green-100 border-green-500"
                      : option === selectedOption
                      ? "bg-red-100 border-red-500"
                      : "border-gray-300"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className="explanation mt-4 p-3 bg-gray-100 rounded-lg">
              <p>
                <strong>Correct Answer:</strong> {currentQuestion.answer}
              </p>
              <p>
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}
          {selectedOption && (
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      ) : (
        <div className="result-card p-4 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-4">
            Your Score: {score} / {shuffledQuestions.length}
          </p>
          <button
            className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
