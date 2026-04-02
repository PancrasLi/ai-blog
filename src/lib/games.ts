import fs from 'fs';
import path from 'path';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  file: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  rating?: number;
  plays?: number;
  tags: string[];
}

// 游戏元数据文件
const gamesIndexPath = path.join(process.cwd(), 'content', 'entertainment', 'games', 'games-index.json');

export function getGames(): Game[] {
  try {
    console.log('[getGames] Reading from:', gamesIndexPath);
    
    if (!fs.existsSync(gamesIndexPath)) {
      console.log('[getGames] File does not exist, returning empty array');
      return [];
    }

    const fileContent = fs.readFileSync(gamesIndexPath, 'utf-8');
    const games = JSON.parse(fileContent) as Game[];
    
    // 按热度排序
    const sorted = games.sort((a, b) => (b.plays || 0) - (a.plays || 0));
    
    console.log('[getGames] Loaded', sorted.length, 'games');
    return sorted;
  } catch (error) {
    console.error('[getGames] Error reading games:', error);
    return [];
  }
}

export function getGameById(id: string): Game | null {
  try {
    console.log('[getGameById] Looking for game:', id);
    
    const games = getGames();
    const game = games.find((g) => g.id === id);
    
    console.log('[getGameById] Found:', game ? 'yes' : 'no');
    return game || null;
  } catch (error) {
    console.error('[getGameById] Error:', error);
    return null;
  }
}

export function getGamesByCategory(category: string): Game[] {
  try {
    const games = getGames();
    return games.filter((g) => g.category === category);
  } catch (error) {
    console.error('[getGamesByCategory] Error:', error);
    return [];
  }
}

export function getGameCategories(): string[] {
  try {
    const games = getGames();
    const categories = Array.from(new Set(games.map((g) => g.category)));
    return categories.sort();
  } catch (error) {
    console.error('[getGameCategories] Error:', error);
    return [];
  }
}

export function getGameIds(): string[] {
  try {
    const games = getGames();
    return games.map((g) => g.id);
  } catch (error) {
    console.error('[getGameIds] Error:', error);
    return [];
  }
}
