import fs from 'fs';
import path from 'path';

export interface EducationGame {
  id: string;
  title: string;
  description: string;
  file: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
  plays: number;
  tags: string[];
  benefits: string;
}

let gamesCache: EducationGame[] | null = null;

export function getEducationGames(): EducationGame[] {
  if (gamesCache) {
    return gamesCache;
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'content/education/games/games-index.json'
    );
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    gamesCache = JSON.parse(fileContent) as EducationGame[];
    return gamesCache;
  } catch (error) {
    console.error('Error reading education games:', error);
    return [];
  }
}

export function getEducationGameById(id: string): EducationGame | null {
  const games = getEducationGames();
  return games.find((game) => game.id === id) || null;
}
