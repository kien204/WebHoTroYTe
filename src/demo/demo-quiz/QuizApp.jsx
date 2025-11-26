import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

const quizData = [
  {
    id: 1,
    skill: null,
    level: null,
    topic: null,
    title: "Choose the correct answer",
    type: 0,
    imageUrl: "",
    audioUrl: null,
    ordering: 0,
    groupOptionList: null,
    subQuestionNodes: [
      {
        id: 1,
        questionText: "My ______ is my mother's brother.",
        ordering: 0,
        options: [
          {
            id: 1,
            optionText: "uncle",
            correct: null,
            isCorrect: true,
          },
          {
            id: 2,
            optionText: "aunt",
            correct: null,
            isCorrect: false,
          },
          {
            id: 3,
            optionText: "brother",
            correct: null,
            isCorrect: false,
          },
          {
            id: 4,
            optionText: "cousin",
            correct: null,
            isCorrect: false,
          },
        ],
      },
      {
        id: 2,
        questionText: "A ______ is a child of your aunt or uncle.",
        ordering: 0,
        options: [
          {
            id: 5,
            optionText: "cousin",
            correct: null,
            isCorrect: true,
          },
          {
            id: 6,
            optionText: "nephew",
            correct: null,
            isCorrect: false,
          },
          {
            id: 7,
            optionText: "niece",
            correct: null,
            isCorrect: false,
          },
          {
            id: 8,
            optionText: "brother",
            correct: null,
            isCorrect: false,
          },
        ],
      },
      {
        id: 3,
        questionText: "My mother's mother is my ______.",
        ordering: 0,
        options: [
          {
            id: 9,
            optionText: "grandmother",
            correct: null,
            isCorrect: true,
          },
          {
            id: 10,
            optionText: "aunt",
            correct: null,
            isCorrect: false,
          },
          {
            id: 11,
            optionText: "sister",
            correct: null,
            isCorrect: false,
          },
          {
            id: 12,
            optionText: "cousin",
            correct: null,
            isCorrect: false,
          },
        ],
      },
      {
        id: 4,
        questionText: "My father's father is my ______.",
        ordering: 0,
        options: [
          {
            id: 13,
            optionText: "grandfather",
            correct: null,
            isCorrect: true,
          },
          {
            id: 14,
            optionText: "uncle",
            correct: null,
            isCorrect: false,
          },
          {
            id: 15,
            optionText: "brother",
            correct: null,
            isCorrect: false,
          },
          {
            id: 16,
            optionText: "cousin",
            correct: null,
            isCorrect: false,
          },
        ],
      },
      {
        id: 5,
        questionText: "The daughter of my brother is my ______.",
        ordering: 0,
        options: [
          {
            id: 17,
            optionText: "niece",
            correct: null,
            isCorrect: true,
          },
          {
            id: 18,
            optionText: "nephew",
            correct: null,
            isCorrect: false,
          },
          {
            id: 19,
            optionText: "cousin",
            correct: null,
            isCorrect: false,
          },
          {
            id: 20,
            optionText: "sister",
            correct: null,
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    skill: null,
    level: null,
    topic: null,
    title:
      "Look at the family tree picture and choose the correct options to complete the sentences.",
    type: 1,
    imageUrl:
      "https://test-english.com/staging11/wp-content/uploads/The-family-a1-vocabulary-exercise.png",
    audioUrl: null,
    ordering: 0,
    groupOptionList: [
      "grandfather",
      "cousin",
      "sister",
      "daughter",
      "nephew",
      "aunt",
      "niece",
      "wife",
      "husband",
      "son",
    ],
    subQuestionNodes: [
      {
        id: 7,
        questionText: "My _____ `s name is Robert.",
        ordering: 0,
        options: [
          {
            id: 21,
            optionText: null,
            correct: "grandfather",
            isCorrect: null,
          },
        ],
      },
      {
        id: 8,
        questionText: "My _____ `s name is Willian.",
        ordering: 0,
        options: [
          {
            id: 22,
            optionText: null,
            correct: "cousin",
            isCorrect: null,
          },
        ],
      },
      {
        id: 9,
        questionText: "My _____ `s name is Emily.",
        ordering: 0,
        options: [
          {
            id: 23,
            optionText: null,
            correct: "sister",
            isCorrect: null,
          },
        ],
      },
      {
        id: 10,
        questionText: "My _____ `s name is Olivia.",
        ordering: 0,
        options: [
          {
            id: 24,
            optionText: null,
            correct: "daughter",
            isCorrect: null,
          },
        ],
      },
      {
        id: 11,
        questionText: "My _____ `s name is Lucas.",
        ordering: 0,
        options: [
          {
            id: 25,
            optionText: null,
            correct: "nephew",
            isCorrect: null,
          },
        ],
      },
      {
        id: 12,
        questionText: "My _____ `s name is Susan.",
        ordering: 0,
        options: [
          {
            id: 26,
            optionText: null,
            correct: "aunt",
            isCorrect: null,
          },
        ],
      },
      {
        id: 13,
        questionText: "My _____ `s name is Chloe.",
        ordering: 0,
        options: [
          {
            id: 27,
            optionText: null,
            correct: "niece",
            isCorrect: null,
          },
        ],
      },
      {
        id: 14,
        questionText: "My _____ `s name is Sarah.",
        ordering: 0,
        options: [
          {
            id: 28,
            optionText: null,
            correct: "wife",
            isCorrect: null,
          },
        ],
      },
      {
        id: 15,
        questionText: "I am Sarah's _____.",
        ordering: 0,
        options: [
          {
            id: 29,
            optionText: null,
            correct: "husband",
            isCorrect: null,
          },
        ],
      },
      {
        id: 16,
        questionText: "My _____ `s name is Ethan.",
        ordering: 0,
        options: [
          {
            id: 30,
            optionText: null,
            correct: "son",
            isCorrect: null,
          },
        ],
      },
    ],
  },
];
function QuizApp() {
  const [answers, setAnswers] = useState({});

  const handleOptionSelect = (exerciseId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [questionId]: value,
      },
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Demo</h1>

      {quizData.map((exercise) => (
        <Card key={exercise.id} title={exercise.title} className="mb-4">
          {exercise.type === 0 &&
            exercise.subQuestionNodes.map((q) => (
              <div key={q.id} className="mb-3">
                <p>{q.questionText}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((o) => (
                    <Button
                      key={o.id}
                      label={o.optionText}
                      className={`p-button-sm ${
                        answers[exercise.id]?.[q.id] === o.optionText
                          ? "p-button-success"
                          : "p-button-secondary"
                      }`}
                      onClick={() =>
                        handleOptionSelect(exercise.id, q.id, o.optionText)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

          {exercise.type === 1 && (
            <div>
              {exercise.imageUrl && (
                <img
                  src={exercise.imageUrl}
                  alt="exercise"
                  className="mb-3 w-full max-w-md"
                />
              )}
              {exercise.subQuestionNodes.map((q) => (
                <div key={q.id} className="mb-3">
                  <p>{q.questionText}</p>
                  <Dropdown
                    value={answers[exercise.id]?.[q.id] || null}
                    options={exercise.groupOptionList}
                    onChange={(e) =>
                      handleOptionSelect(exercise.id, q.id, e.value)
                    }
                    placeholder="Select an option"
                    className="w-64"
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      <Card title="Current Answers">
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </Card>
    </div>
  );
}

export default QuizApp;
