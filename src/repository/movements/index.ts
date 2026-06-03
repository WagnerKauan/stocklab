import { Movements } from './movements-repository';
import { SqliteMovementsRepository } from './sqlite-movements-repository';

export const movementsRepository: Movements = new SqliteMovementsRepository();
