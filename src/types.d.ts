interface City {
  name: string;
  code: number | null;
}

interface Province {
  name: string;
  cities: City[];
}
