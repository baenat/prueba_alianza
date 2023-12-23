export interface ProductModel {
  id: number;
  logo: string;
  nombreProducto: string;
  descripcion: string;
  fechaLiberacion: string;
  fechaReestructuracion?: string | null;
}
