import { Upload,Shield,Zap,Download } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
  {
    icon: Upload,
    title: 'Upload Your Files',
    description: 'Drag and drop or select files to upload. We support all major file formats.',
    num:1
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your files are encrypted and stored securely in our cloud infrastructure.',
    num:2
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Access your files from anywhere, on any device, at lightning speed.',
   num:3
  },
  {
    icon: Download,
    title: 'Share & Download',
    description: 'Share files with anyone or download them whenever you need.',
    num:4
  },
];
  return (
    <div className="w-full py-20 bg-gray-100 h-auto ">
      <h2 className="w-full text-2xl font-bold text-center text-indigo-400">How It Works</h2><br/>
      <h1 className="text-6xl font-bold text-center"> Simple & <span className="text-indigo-600">Secure</span></h1>
      <p className="w-full text-2xl text-center text-neutral-600 mt-4">Upload, store, and share your files securely with our platform.</p>
      <div className=" w-full  flex gap-2 flex-wrap items-center sm:justify-center md:justify-center lg:justify-center space-x-4 mt-8 ">
        {steps.map((step, index) => (
          <div key={index} className="relative rounded-3xl w-85 h-50 border border-black bg-white overflow-hidden rounded-md shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
              
            <step.icon size={30} className="text-indigo-600 ml-4 mt-4" />
            <h3 className="w-full text-4xl font-bold  ml-4">{step.title}</h3>
            <p className="text-1xl mt-2 text-neutral-600 ml-4">{step.description}</p>
          </div>
        
        ))}
      </div>
    </div>
  );
};
