'use client';

import { useState } from 'react';
import { Volume2, Heart, X, Check, Award, ArrowRight, BookOpen, Music, PenTool, Brain, CheckCircle, Coins } from 'lucide-react';
import Link from 'next/link';
import Flashcard from '@/components/Flashcard';
import DrawingCanvas from '@/components/DrawingCanvas';
import { HiraganaCharacter } from '@/data/hiraganaData';
import { playJapaneseAudio, playFeedbackSound } from '@/utils/audio';

interface QuizEngineProps {
  groupName: string;
  characters: HiraganaCharacter[];
}

type Mode = 'PRESENTATION' | 'SOUND_TEST' | 'IDEOGRAM_TEST' | 'WRITING_TEST' | 'COMPLETED';

export default function QuizEngine({ groupName, characters }: QuizEngineProps) {
  const [mode, setMode] = useState<Mode>('PRESENTATION');
  const [presentationIndex, setPresentationIndex] = useState(0);
  const [testIndex, setTestIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [ryo, setRyo] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Character list shuffling helper for multiple choices
  const getMultipleChoices = (correctChar: HiraganaCharacter, key: 'hiragana' | 'romaji') => {
    const choices = [correctChar[key]];
    const otherChars = characters.filter((c) => c.id !== correctChar.id);
    
    // Shuffle and pick 3 wrong options
    const shuffled = [...otherChars].sort(() => 0.5 - Math.random());
    shuffled.slice(0, 3).forEach((c) => choices.push(c[key]));
    
    return choices.sort(() => 0.5 - Math.random());
  };

  const currentCharacter = characters[testIndex % characters.length];

  // Presentation Mode handler
  const handleNextPresentation = () => {
    if (presentationIndex < characters.length - 1) {
      setPresentationIndex(presentationIndex + 1);
    } else {
      setMode('SOUND_TEST');
      setTestIndex(0);
      playJapaneseAudio(characters[0].hiragana);
    }
  };

  // Choice Validation handler for Sound & Ideogram tests
  const handleSelectChoice = (choice: string, correctValue: string) => {
    if (feedback !== null) return;
    setSelectedOption(choice);

    if (choice === correctValue) {
      setFeedback('correct');
      setScore((s) => s + 10);
      setRyo((r) => r + 5); // Ganha 5 moedas de ouro por acerto
      playFeedbackSound('correct');
    } else {
      setFeedback('wrong');
      setHearts((h) => Math.max(0, h - 1));
      playFeedbackSound('wrong');
    }
  };

  const handleNextQuizStep = () => {
    setSelectedOption(null);
    setFeedback(null);

    if (testIndex < characters.length - 1) {
      setTestIndex(testIndex + 1);
      if (mode === 'SOUND_TEST') {
        playJapaneseAudio(characters[testIndex + 1].hiragana);
      }
    } else {
      // Advance to next test mode phase
      if (mode === 'SOUND_TEST') {
        setMode('IDEOGRAM_TEST');
        setTestIndex(0);
      } else if (mode === 'IDEOGRAM_TEST') {
        setMode('WRITING_TEST');
        setTestIndex(0);
      } else if (mode === 'WRITING_TEST') {
        setMode('COMPLETED');
        playFeedbackSound('complete');
      }
    }
  };

  // Progress Bar Calculation
  const totalStages = characters.length * 3 + characters.length; // Presentation + 3 test modes
  let currentStageProgress = 0;
  if (mode === 'PRESENTATION') {
    currentStageProgress = presentationIndex + 1;
  } else if (mode === 'SOUND_TEST') {
    currentStageProgress = characters.length + testIndex + 1;
  } else if (mode === 'IDEOGRAM_TEST') {
    currentStageProgress = characters.length * 2 + testIndex + 1;
  } else if (mode === 'WRITING_TEST') {
    currentStageProgress = characters.length * 3 + testIndex + 1;
  } else {
    currentStageProgress = totalStages;
  }

  const progressPercent = Math.min(100, (currentStageProgress / totalStages) * 100);

  // Render Completed Summary
  if (mode === 'COMPLETED') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-amber-500/10 border-4 border-amber-500 flex items-center justify-center mb-6 shadow-lg animate-bounce">
          <Award className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-2">Lição Concluída!</h2>
        <p className="text-gray-500 mb-6">Parabéns! Você dominou o conjunto <span className="font-bold text-primary">{groupName}</span>!</p>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-surface border-2 border-border p-4 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Bônus de XP</span>
            <span className="text-2xl font-black text-secondary">+{score} XP</span>
          </div>
          <div className="bg-surface border-2 border-border p-4 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Ouro Saqueado</span>
            <span className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Coins className="w-5 h-5 fill-amber-500" /> +{ryo}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="w-full bg-success hover:bg-success-dark text-white font-bold py-4 px-8 rounded-2xl uppercase tracking-wider text-lg border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all"
        >
          Continuar Jornada
        </Link>
      </div>
    );
  }

  const currentChoices =
    mode === 'SOUND_TEST'
      ? getMultipleChoices(currentCharacter, 'hiragana')
      : mode === 'IDEOGRAM_TEST'
      ? getMultipleChoices(currentCharacter, 'romaji')
      : [];

  return (
    <div className="h-full flex flex-col bg-background p-4 sm:p-8 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link href="/" className="text-gray-400 hover:text-foreground transition-colors">
          <X className="w-8 h-8" />
        </Link>
        <div className="flex-1 bg-border h-4 rounded-full overflow-hidden">
          <div
            className="bg-success h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex items-center text-primary font-bold text-lg">
          <Heart className="w-7 h-7 fill-primary mr-1" /> {hearts}
        </div>
      </div>

      {/* Mode Indicator Tag */}
      <div className="flex justify-center mb-6">
        <span className="px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground flex items-center gap-2 shadow-sm">
          {mode === 'PRESENTATION' && (
            <>
              <BookOpen className="w-4 h-4 text-secondary" /> 1. Estudo dos Cards ({presentationIndex + 1}/{characters.length})
            </>
          )}
          {mode === 'SOUND_TEST' && (
            <>
              <Music className="w-4 h-4 text-purple-500" /> 2. Teste de Som ({testIndex + 1}/{characters.length})
            </>
          )}
          {mode === 'IDEOGRAM_TEST' && (
            <>
              <Brain className="w-4 h-4 text-emerald-500" /> 3. Teste de Ideograma ({testIndex + 1}/{characters.length})
            </>
          )}
          {mode === 'WRITING_TEST' && (
            <>
              <PenTool className="w-4 h-4 text-primary" /> 4. Teste de Escrita ({testIndex + 1}/{characters.length})
            </>
          )}
        </span>
      </div>

      {/* MAIN BODY PER MODE */}
      <div className="flex-1 flex flex-col justify-center items-center py-2 w-full">
        {/* PHASE 1: PRESENTATION FLASHCARDS */}
        {mode === 'PRESENTATION' && (
          <div className="w-full max-w-sm flex flex-col items-center">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">Conheça o caractere</h2>
            <Flashcard key={characters[presentationIndex].id} {...characters[presentationIndex]} />
          </div>
        )}

        {/* PHASE 2: SOUND TEST */}
        {mode === 'SOUND_TEST' && (
          <div className="w-full max-w-md flex flex-col items-center space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
              Ouça e selecione o ideograma correto:
            </h2>

            <button
              onClick={() => playJapaneseAudio(currentCharacter.hiragana)}
              className="p-8 rounded-full bg-secondary/10 hover:bg-secondary/20 border-4 border-secondary text-secondary transition-all hover:scale-105 active:scale-95 shadow-md flex flex-col items-center gap-2 my-4"
            >
              <Volume2 className="w-12 h-12" />
              <span className="text-xs font-bold uppercase tracking-wider">Tocar Áudio</span>
            </button>

            <div className="grid grid-cols-2 gap-4 w-full">
              {currentChoices.map((choice, i) => {
                const isSelected = selectedOption === choice;
                const isCorrect = choice === currentCharacter.hiragana;
                let btnStyle = 'bg-surface border-2 border-border text-foreground hover:border-primary/50';

                if (feedback && isSelected) {
                  btnStyle = isCorrect
                    ? 'bg-success/10 border-success text-success font-bold'
                    : 'bg-red-500/10 border-red-500 text-red-500 font-bold';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectChoice(choice, currentCharacter.hiragana)}
                    className={`py-6 rounded-2xl text-4xl font-bold transition-all shadow-sm ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PHASE 3: IDEOGRAM TEST */}
        {mode === 'IDEOGRAM_TEST' && (
          <div className="w-full max-w-md flex flex-col items-center space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
              Qual é a leitura do ideograma abaixo?
            </h2>

            <div className="p-8 rounded-3xl bg-surface border-2 border-border text-7xl font-black text-foreground shadow-md my-2">
              {currentCharacter.hiragana}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {currentChoices.map((choice, i) => {
                const isSelected = selectedOption === choice;
                const isCorrect = choice === currentCharacter.romaji;
                let btnStyle = 'bg-surface border-2 border-border text-foreground hover:border-primary/50';

                if (feedback && isSelected) {
                  btnStyle = isCorrect
                    ? 'bg-success/10 border-success text-success font-bold'
                    : 'bg-red-500/10 border-red-500 text-red-500 font-bold';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectChoice(choice, currentCharacter.romaji)}
                    className={`py-5 rounded-2xl text-2xl font-bold uppercase transition-all shadow-sm ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PHASE 4: WRITING TEST */}
        {mode === 'WRITING_TEST' && (
          <DrawingCanvas
            hiragana={currentCharacter.hiragana}
            romaji={currentCharacter.romaji}
            onSuccess={handleNextQuizStep}
          />
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-auto pt-4 flex flex-col items-center w-full">
        {mode === 'PRESENTATION' && (
          <button
            onClick={handleNextPresentation}
            className="w-full sm:w-auto min-w-[250px] bg-success hover:bg-success-dark text-white font-bold py-4 px-8 rounded-2xl uppercase tracking-wider text-lg border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            {presentationIndex === characters.length - 1 ? 'Iniciar Testes' : 'Próximo Card'} <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {(mode === 'SOUND_TEST' || mode === 'IDEOGRAM_TEST') && feedback && (
          <div
            className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 ${
              feedback === 'correct' ? 'bg-success/10 border-success text-success' : 'bg-red-500/10 border-red-500 text-red-500'
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-black text-lg uppercase tracking-tight">
                {feedback === 'correct' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                {feedback === 'correct' ? 'Golpe Perfeito, Shinobi!' : `Sua defesa falhou...`}
              </div>
              {feedback === 'wrong' && (
                <span className="text-sm font-semibold opacity-90">
                  O selo correto era {mode === 'SOUND_TEST' ? currentCharacter.hiragana : currentCharacter.romaji}. Você perdeu 1 coração de vida.
                </span>
              )}
            </div>
            <button
              onClick={handleNextQuizStep}
              className="bg-foreground text-background font-bold px-6 py-3 rounded-xl uppercase text-sm"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
