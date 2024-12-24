import { promises as fs } from 'fs';

export async function lerJSON<T>(caminho: string): Promise<T> {
  const conteudo = await fs.readFile(caminho, 'utf-8');
  return JSON.parse(conteudo);
}

export async function salvarJSON<T>(caminho: string, dados: T): Promise<void> {
  const conteudo = JSON.stringify(dados, null, 2);
  await fs.writeFile(caminho, conteudo, 'utf-8');
}
