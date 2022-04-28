export interface Note {
  id: number;
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  sentiment: string;
  date: string;
  isActive: boolean;
  backgroundColor: string;
  header: string;
  body: string;
}
