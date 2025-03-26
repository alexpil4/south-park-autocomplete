interface Character {
  id: number;
  name: string;
  age: number | null;
  sex: string;
  hair_color: string;
  occupation: string;
  grade: number | null;
  religion: string;
  voiced_by: string | null;
  created_at: string;
  updated_at: string;
  url: string;
  family: string;
  relatives: Relative[];
  episodes: string[];
}
interface Relative {
  url: string;
  relation: string;
}
