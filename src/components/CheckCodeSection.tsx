import { Check, HelpCircle, X } from "lucide-react";
import Tooltip from "./Tooltip";
import { Input } from "./ui/input";
import { useCallback, useRef, useState, type ChangeEvent } from "react";

const CheckCodeSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkCode, setCheckCode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const validateCode = (value: string): string => {
    if (value.length > 10) return "Code must be 10 digits";
    if (!/^[0-9]*$/.test(value)) return "Just allowed numbers";
    if (value.length === 10 && /^(\d)\1{9}$/.test(value)) return "invalid code";
    return "";
  };

  const checkCodeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCode(value);

    const errorMsg = validateCode(value);
    setError(errorMsg);
    if (errorMsg) {
      setCheckCode(false);
      return;
    }

    if (value.length === 10 && !errorMsg) {
      // Calculate check digit
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        const digit = Number(value[i]);
        const weight = 10 - i;
        sum += digit * weight;
      }

      const remainder = sum % 11;
      const checkDigit = Number(value[9]);

      // check digit validation
      setCheckCode(
        remainder < 2 ? checkDigit === remainder : checkDigit === 11 - remainder
      );
    } else {
      setCheckCode(false);
    }
  }, []);
  return (
    <div className='space-y-8 text-center py-10 border-[6px] border-dashed border-[#383b44] [border-image:url("/border-dash.png")_4]'>
      <h1 className="text-xl font-bold"> Check Code Melli</h1>

      <div className="flex justify-center items-center gap-3">
        <Tooltip content="Your fake codemelli number">
          <Input
            ref={inputRef}
            placeholder="Enter Code Melli"
            className="rounded-full ring-1 ring-ring h-16 !text-xl placeholder:text-red-500 pl-5 mx-auto"
            onClick={(e) => (e.currentTarget as HTMLInputElement).select()}
            onChange={checkCodeHandler}
            value={code}
          ></Input>
        </Tooltip>

        {checkCode && (
          <Check
            className="bg-foreground text-green-500 p-2 rounded-full w-12 h-12"
            aria-label="valid code"
          />
        )}
        {!checkCode && code.length > 0 && (
          <X
            className="bg-foreground text-red-600 p-2 rounded-full w-12 h-12"
            aria-label="invalid code"
          />
        )}
        {code.length === 0 && (
          <HelpCircle
            className="bg-foreground text-muted p-2 rounded-full w-12 h-12"
            aria-label="enter code"
          />
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CheckCodeSection;
