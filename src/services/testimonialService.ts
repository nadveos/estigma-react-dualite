import pb from '../lib/pocketbase';
import { Testimonial } from '../types/database';

export class TestimonialService {
  private collection = 'testimonials';

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    try {
      const records = await pb.collection(this.collection).getFullList({
        filter: 'isApproved = true',
        sort: '-created'
      });
      return records as Testimonial[];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw new Error('No se pudieron cargar los testimonios.');
    }
  }

  async createTestimonial(data: Omit<Testimonial, 'id' | 'isApproved' | 'created' | 'updated'>): Promise<Testimonial> {
    try {
      const record = await pb.collection(this.collection).create({
        ...data,
        isApproved: false // Requires admin approval
      });
      return record as Testimonial;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw new Error('No se pudo enviar el testimonio.');
    }
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const records = await pb.collection(this.collection).getFullList({
        sort: '-created'
      });
      return records as Testimonial[];
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
      throw new Error('No se pudieron cargar los testimonios.');
    }
  }

  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    try {
      const record = await pb.collection(this.collection).update(id, data);
      return record as Testimonial;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw new Error('No se pudo actualizar el testimonio.');
    }
  }

  async approveTestimonial(id: string): Promise<Testimonial> {
    return this.updateTestimonial(id, { isApproved: true });
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      await pb.collection(this.collection).delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw new Error('No se pudo eliminar el testimonio.');
    }
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Create a temporary record to store the image
      const record = await pb.collection('images').create(formData);
      return pb.files.getUrl(record, record.image);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('No se pudo subir la imagen.');
    }
  }
}

export const testimonialService = new TestimonialService();
