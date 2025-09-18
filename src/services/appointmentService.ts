import pb from '../lib/pocketbase';
import { Appointment } from '../types/database';

export class AppointmentService {
  private collection = 'appointments';

  async createAppointment(data: Omit<Appointment, 'id' | 'status' | 'created' | 'updated'>): Promise<Appointment> {
    try {
      const record = await pb.collection(this.collection).create({
        ...data,
        status: 'pending'
      });
      return record as Appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('No se pudo crear el turno. Por favor, intenta nuevamente.');
    }
  }

  async getAppointments(filter?: string): Promise<Appointment[]> {
    try {
      const records = await pb.collection(this.collection).getFullList({
        sort: '-created',
        filter: filter
      });
      return records as Appointment[];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw new Error('No se pudieron cargar los turnos.');
    }
  }

  async getAppointmentById(id: string): Promise<Appointment> {
    try {
      const record = await pb.collection(this.collection).getOne(id);
      return record as Appointment;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw new Error('No se pudo encontrar el turno.');
    }
  }

  async updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
    try {
      const record = await pb.collection(this.collection).update(id, data);
      return record as Appointment;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('No se pudo actualizar el turno.');
    }
  }

  async deleteAppointment(id: string): Promise<boolean> {
    try {
      await pb.collection(this.collection).delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('No se pudo eliminar el turno.');
    }
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    try {
      const startDate = `${date} 00:00:00`;
      const endDate = `${date} 23:59:59`;
      const filter = `preferredDate >= "${startDate}" && preferredDate <= "${endDate}"`;
      
      const records = await pb.collection(this.collection).getFullList({
        filter: filter,
        sort: 'preferredTime'
      });
      return records as Appointment[];
    } catch (error) {
      console.error('Error fetching appointments by date:', error);
      throw new Error('No se pudieron cargar los turnos para la fecha seleccionada.');
    }
  }

  async getAvailableTimeSlots(date: string): Promise<string[]> {
    try {
      const appointments = await this.getAppointmentsByDate(date);
      const bookedTimes = appointments
        .filter(apt => apt.status !== 'cancelled')
        .map(apt => apt.preferredTime);

      const allTimeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
      ];

      return allTimeSlots.filter(time => !bookedTimes.includes(time));
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      return [];
    }
  }
}

export const appointmentService = new AppointmentService();
