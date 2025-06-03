import { useCallback, useEffect, useState } from "react";
import useData from "./useData";

export const useCodeMelli = (): {
  codeMelliGenerator: () => void;
  codeMelli: string;
} => {
  const [codeMelli, setCodeMelli] = useState<string>('');
  const { activeCity, activeProvince, data } = useData();
  const activeCityCode = data
    .find((item) => item.name === activeProvince)
    ?.cities.find((item) => item.name === activeCity)?.code;

  function controllDigitGenerator(code: string): number | undefined {
    let controlDigit = 0;
    for (let index = 0; index < code.length; index++) {
      const digit = +code[index];
      const weight = 10 - index;
      controlDigit += digit * weight;
    }
    controlDigit = controlDigit % 11;
    controlDigit = controlDigit < 2 ? controlDigit : 11 - controlDigit;
    return controlDigit;
  }
  const codeMelliGenerator = useCallback((): void => {
    if (!activeCityCode || activeCityCode.toString().length !== 3) return;
    const randomCode: number = Math.floor(100000 + Math.random() * 900000);
    const baseCode = `${activeCityCode}${randomCode}`;
    const controlDigit = controllDigitGenerator(baseCode);
    setCodeMelli(`${baseCode}${controlDigit}`);
  }, [activeCityCode]);

  useEffect(() => codeMelliGenerator(), [activeCity, codeMelliGenerator]);

  return { codeMelliGenerator, codeMelli };
};
