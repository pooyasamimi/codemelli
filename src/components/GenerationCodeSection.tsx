import GenerateCodeForm from "./GenerateCodeForm";

const GenerationCodeSection = () => {
  return (
    <div className='space-y-10 text-center py-10 px-4 border-[6px] border-dashed border-[#383b44] [border-image:url("/border-dash.png")_4]'>
      <h1 className="text-xl font-bold"> Fake CodeMell Generator</h1>

      <GenerateCodeForm />
    </div>
  );
};

export default GenerationCodeSection;
