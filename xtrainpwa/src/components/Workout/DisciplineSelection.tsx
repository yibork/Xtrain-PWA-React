// components/DisciplineSelection.tsx
import React from 'react';
import { Discipline } from '../../types/Workout';

interface Props {
  disciplines: Discipline[];
  onSelect: (disciplineId: number) => void;
}

const DisciplineSelection: React.FC<Props> = ({ disciplines, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 space-y-4 p-4">
      {disciplines.map((discipline) => (
        <div key={discipline.id} className="w-40 h-40 bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-4 cursor-pointer" onClick={() => onSelect(discipline.id)}>
          {discipline.icon}
          <h3 className="text-lg font-bold mt-2">{discipline.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default DisciplineSelection;
