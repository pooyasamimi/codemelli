import { Copy, History, QrCode, RefreshCcw } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Tooltip from "./Tooltip";
import { useCodeMelli } from "@/hooks/useCodeMelli";
import { useRef, type ClipboardEvent } from "react";
import useClipBoard from "@/hooks/useClipBoard";
import { toast } from "@/hooks/use-toast";

import QRCode from "react-qr-code";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Output = () => {
  const { codeMelliGenerator, codeMelli } = useCodeMelli();
  const inputRef = useRef<HTMLInputElement>(null);
  const { copyToClipboard } = useClipBoard();
  const { getCopiedCodes, saveToLocalStorage } = useLocalStorage();

  const copiedCodes: string[] = getCopiedCodes();

  const handleCopy = async () => {
    if (inputRef.current && inputRef.current.value) {
      await copyToClipboard(inputRef.current.value);
    } else {
      toast({
        className: "top-4 left-1/2 -translate-x-1/2",
        description: "There is nothing to copy. Please fill in the fields.",
      });
    }
  };

  const LSHandler = (e: ClipboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    saveToLocalStorage(value);
    toast({ description: "Codemelli copied to clipboard" });
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <div className="relative sm:w-1/2">
          <Tooltip content="Your fake codemelli number">
            <Input
              ref={inputRef}
              readOnly
              placeholder="Select fields"
              value={codeMelli}
              className="rounded-full ring-1 ring-ring h-16 text-base sm:!text-xl placeholder:[word-spacing:-0.25em] placeholder:text-red-500 pl-3 sm:pl-5 "
              onClick={(e) => (e.currentTarget as HTMLInputElement).select()}
              onCopy={(e) => LSHandler(e)}
            ></Input>
          </Tooltip>
          <Dialog>
            <DialogTrigger
              disabled={codeMelli ? false : true}
              className="rounded-full absolute top-0 bottom-0 my-auto w-14 h-14 right-1 bg-[hsla(0,0%,100%,.15)] hover:bg-[hsla(0,0%,100%,.15)] disabled:cursor-not-allowed"
            >
              <QrCode className="!w-6 !h-6 text-white mx-auto" />
            </DialogTrigger>
            <DialogContent className="p-3 absolute z-10 rounded-md bg-foreground top-[120%] left-[calc(100%_-_126px)]">
              <VisuallyHidden>
                <DialogDescription>show QR code</DialogDescription>
                <DialogTitle>QR Code for Codemelli</DialogTitle>
              </VisuallyHidden>
              <QRCode value={codeMelli} size={180} />
            </DialogContent>
          </Dialog>
        </div>

        <Button
          className="rounded-full w-14 h-14 text-white bg-button-green dark:hover:bg-[hsla(0,0%,100%,.15)]"
          onClick={handleCopy}
          type="button"
        >
          <Tooltip content="Copy codemelli">
            <Copy className="!w-6 !h-6" />
          </Tooltip>
        </Button>
      </div>

      <div className="relative flex gap-x-8 justify-center">
        <Tooltip content="Refresh Code">
          <Button
            className="rounded-full hover:bg-button-green"
            onClick={() => codeMelliGenerator()}
            type="button"
            disabled={codeMelli ? false : true}
          >
            <RefreshCcw className="!w-6 !h-6" />
            Refresh
          </Button>
        </Tooltip>

        <Dialog>
          <Tooltip content="History Codes">
            <DialogTrigger
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground shadow h-9 px-4 py-2 rounded-full hover:bg-button-green"
              type="button"
            >
              <History className="!w-6 !h-6" />
              History
            </DialogTrigger>
          </Tooltip>
          <DialogContent className="p-3 absolute top-12 z-10 rounded-md bg-muted-foreground dark:bg-background w-72 text-muted dark:text-foreground">
            <VisuallyHidden>
              aria-describedby="show all codes melli"
              <DialogDescription>fdsfsfsdds</DialogDescription>
              <DialogTitle>History of Copied Codes</DialogTitle>
            </VisuallyHidden>
            <h2 className="text-lg">History of copied codes</h2>
            <div className="mt-3 space-y-2 tracking-widest">
              {copiedCodes.map((code) => (
                <p className="bg-muted/60 rounded-md" key={code}>
                  {code}
                </p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Output;
