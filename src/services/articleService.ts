import pb from '../lib/pocketbase';
import { Article } from '../types/database';

export class ArticleService {
  private collection = 'articles';

  async getPublishedArticles(): Promise<Article[]> {
    try {
      const records = await pb.collection(this.collection).getFullList({
        filter: 'isPublished = true',
        sort: '-created'
      });
      return records as Article[];
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('No se pudieron cargar los artículos.');
    }
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    try {
      const filter = category === 'Todos' 
        ? 'isPublished = true' 
        : `isPublished = true && category = "${category}"`;
        
      const records = await pb.collection(this.collection).getFullList({
        filter: filter,
        sort: '-created'
      });
      return records as Article[];
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      throw new Error('No se pudieron cargar los artículos.');
    }
  }

  async searchArticles(query: string): Promise<Article[]> {
    try {
      const filter = `isPublished = true && (title ~ "${query}" || excerpt ~ "${query}" || content ~ "${query}")`;
      const records = await pb.collection(this.collection).getFullList({
        filter: filter,
        sort: '-created'
      });
      return records as Article[];
    } catch (error) {
      console.error('Error searching articles:', error);
      throw new Error('No se pudieron buscar los artículos.');
    }
  }

  async getArticleById(id: string): Promise<Article> {
    try {
      const record = await pb.collection(this.collection).getOne(id);
      return record as Article;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw new Error('No se pudo encontrar el artículo.');
    }
  }

  async createArticle(data: Omit<Article, 'id' | 'created' | 'updated'>): Promise<Article> {
    try {
      const record = await pb.collection(this.collection).create(data);
      return record as Article;
    } catch (error) {
      console.error('Error creating article:', error);
      throw new Error('No se pudo crear el artículo.');
    }
  }

  async updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    try {
      const record = await pb.collection(this.collection).update(id, data);
      return record as Article;
    } catch (error) {
      console.error('Error updating article:', error);
      throw new Error('No se pudo actualizar el artículo.');
    }
  }

  async deleteArticle(id: string): Promise<boolean> {
    try {
      await pb.collection(this.collection).delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw new Error('No se pudo eliminar el artículo.');
    }
  }

  async getFeaturedArticles(limit: number = 3): Promise<Article[]> {
    try {
      const records = await pb.collection(this.collection).getList(1, limit, {
        filter: 'isPublished = true',
        sort: '-created'
      });
      return records.items as Article[];
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return [];
    }
  }
}

export const articleService = new ArticleService();
