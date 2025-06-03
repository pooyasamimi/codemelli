import CheckCodeSection from "./CheckCodeSection";
import GenerationCodeSection from "./GenerationCodeSection";

const Main = () => {
  return (
    <div className="container w-3/5 space-y-12">
      <GenerationCodeSection />
      <CheckCodeSection />

      {/* 
      <p className="w-3/4 text-center mx-auto mt-5">
        Forget about spam, advertising mailings, hacking and attacking robots.
        Keep your real mailbox clean and secure. Temp Mail provides temporary,
        secure, anonymous, free, disposable email address.
      </p> */}
    </div>
  );
};

export default Main;
