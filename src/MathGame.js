import React, { useState } from 'react';
import { Alert, ArrowLeft, Divide, X } from "lucide-react";

const MathGame = () => {
  const [gameState, setGameState] = useState('character');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [operationType, setOperationType] = useState(null);
  const [selectedTables, setSelectedTables] = useState([]);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 });
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);

  const CharacterSelection = () => (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Kies je rekenheld!</h2>
      <div className="flex justify-center gap-8">
        <div 
          onClick={() => {
            setSelectedCharacter('deela');
            setGameState('operation');
          }}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <div className="w-40 h-40 bg-pink-100 rounded-2xl mb-4 flex items-center justify-center border-4 border-pink-200 hover:border-pink-400">
            <div className="text-4xl">👧</div>
          </div>
          <p className="text-xl font-bold text-pink-500">Deela</p>
        </div>

        <div 
          onClick={() => {
            setSelectedCharacter('maalik');
            setGameState('operation');
          }}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <div className="w-40 h-40 bg-blue-100 rounded-2xl mb-4 flex items-center justify-center border-4 border-blue-200 hover:border-blue-400">
            <div className="text-4xl">👦</div>
          </div>
          <p className="text-xl font-bold text-blue-500">Maalik</p>
        </div>
      </div>
    </div>
  );

  const OperationSelection = () => (
    <div className="text-center">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setGameState('character')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Terug
        </button>
        <h2 className="text-2xl font-bold flex-1">
          {selectedCharacter === 'deela' ? 'Wat wil je oefenen met Deela?' : 'Wat wil je oefenen met Maalik?'}
        </h2>
      </div>

      <div className="flex justify-center gap-8">
        <div 
          onClick={() => {
            setOperationType('multiply');
            setGameState('selection');
          }}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <div className={`w-40 h-40 rounded-2xl mb-4 flex items-center justify-center border-4 ${
            selectedCharacter === 'deela'
              ? 'bg-pink-100 border-pink-200 hover:border-pink-400'
              : 'bg-blue-100 border-blue-200 hover:border-blue-400'
          }`}>
            <X className="w-20 h-20" />
          </div>
          <p className="text-xl font-bold">Vermenigvuldigen</p>
        </div>

        <div 
          onClick={() => {
            setOperationType('divide');
            setGameState('selection');
          }}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <div className={`w-40 h-40 rounded-2xl mb-4 flex items-center justify-center border-4 ${
            selectedCharacter === 'deela'
              ? 'bg-pink-100 border-pink-200 hover:border-pink-400'
              : 'bg-blue-100 border-blue-200 hover:border-blue-400'
          }`}>
            <Divide className="w-20 h-20" />
          </div>
          <p className="text-xl font-bold">Delen</p>
        </div>
      </div>
    </div>
  );

  const TableSelection = () => (
    <div className="text-center">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setGameState('operation')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Terug
        </button>
        <h2 className="text-2xl font-bold flex-1">Kies je tafels!</h2>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
          <button
            key={number}
            onClick={() => {
              if (selectedTables.includes(number)) {
                setSelectedTables(selectedTables.filter(n => n !== number));
              } else {
                setSelectedTables([...selectedTables, number]);
              }
            }}
            className={`p-4 text-xl rounded-lg transition-colors ${
              selectedTables.includes(number)
                ? selectedCharacter === 'deela' 
                  ? 'bg-pink-500 text-white'
                  : 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (selectedTables.length > 0) {
            setGameState('playing');
            generateProblem();
          }
        }}
        className={`w-full py-3 rounded-lg text-white text-lg ${
          selectedTables.length > 0
            ? selectedCharacter === 'deela'
              ? 'bg-pink-500 hover:bg-pink-600'
              : 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-400'
        }`}
      >
        Start met oefenen!
      </button>
    </div>
  );

  const generateProblem = () => {
    const tableNumber = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    if (operationType === 'multiply') {
      const multiplier = Math.floor(Math.random() * 10) + 1;
      setCurrentProblem({ num1: tableNumber, num2: multiplier });
    } else {
      const multiplier = Math.floor(Math.random() * 10) + 1;
      setCurrentProblem({ num1: tableNumber * multiplier, num2: tableNumber });
    }
    setAnswer('');
    setIsCorrect(null);
  };

  const GamePlay = () => (
    <div className="text-center">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-bold">Score: {score}</div>
        <button 
          onClick={() => setGameState('selection')}
          className={`px-4 py-1 rounded-lg ${
            selectedCharacter === 'deela'
              ? 'bg-pink-100 hover:bg-pink-200'
              : 'bg-blue-100 hover:bg-blue-200'
          }`}
        >
          Andere tafels
        </button>
        <div className="text-lg font-bold">Reeks: {streak} ⭐️</div>
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className={`text-4xl font-bold p-6 rounded-xl shadow-lg mx-4 ${
          selectedCharacter === 'deela'
            ? 'bg-pink-50'
            : 'bg-blue-50'
        }`}>
          {operationType === 'multiply' 
            ? `${currentProblem.num1} × ${currentProblem.num2} = ?`
            : `${currentProblem.num1} ÷ ${currentProblem.num2} = ?`
          }
        </div>
      </div>

      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className={`w-32 h-16 text-3xl text-center border-4 rounded-xl mb-6 ${
          selectedCharacter === 'deela'
            ? 'border-pink-200'
            : 'border-blue-200'
        }`}
        placeholder="?"
      />

      <button
        onClick={() => {
          const correct = operationType === 'multiply'
            ? currentProblem.num1 * currentProblem.num2 === parseInt(answer)
            : currentProblem.num1 / currentProblem.num2 === parseInt(answer);
          setIsCorrect(correct);
          if (correct) {
            setScore(score + 1);
            setStreak(streak + 1);
            setTimeout(generateProblem, 1000);
          } else {
            setStreak(0);
            setTimeout(() => {
              setIsCorrect(null);
              generateProblem();
            }, 1000);
          }
        }}
        className={`w-full py-4 rounded-xl text-xl text-white transition-colors ${
          selectedCharacter === 'deela'
            ? 'bg-pink-500 hover:bg-pink-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Controleer
      </button>

      {isCorrect !== null && (
        <div className={`mt-6 text-xl flex items-center justify-center ${
          isCorrect ? 'text-green-500' : 'text-red-500'
        }`}>
          <Alert className="w-6 h-6 mr-2" />
          {isCorrect ? 'Juist!' : 'Fout!'}
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full max-w-xl mx-auto p-6 ${
      selectedCharacter === 'deela'
        ? 'bg-gradient-to-r from-pink-50 to-purple-50'
        : 'bg-gradient-to-r from-blue-50 to-purple-50'
    }`}>
      <div>
        {gameState === 'character' && <CharacterSelection />}
        {gameState === 'operation' && <OperationSelection />}
        {gameState === 'selection' && <TableSelection />}
        {gameState === 'playing' && <GamePlay />}
      </div>
    </div>
  );
};

export default MathGame;
